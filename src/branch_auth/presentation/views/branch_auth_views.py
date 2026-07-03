from django.db import IntegrityError, transaction
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from branch_auth.infrastructure.models import AccessToken, Machine, TokenAccessAttempt
from branch_auth.presentation.permissions import IsBranchManager
from branch_auth.presentation.serializers.branch_auth_serializers import (
    AccessTokenCreateSerializer,
    AccessTokenSerializer,
    VerifyTokenRequestSerializer,
    VerifyTokenResponseSerializer,
)
from shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
)


def get_client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class VerifyTokenView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "verify-token"

    def post(self, request):
        req = VerifyTokenRequestSerializer(data=request.data)
        req.is_valid(raise_exception=True)
        raw_token = req.validated_data["token"]
        device_uuid = req.validated_data["device_uuid"]
        ip = get_client_ip(request)
        token_hash = AccessToken.hash_raw_token(raw_token)

        def deny(
            message, result, http_status=status.HTTP_401_UNAUTHORIZED, token_obj=None
        ):
            TokenAccessAttempt.objects.create(
                token=token_obj,
                device_uuid_sent=device_uuid,
                result=result,
                ip_address=ip,
            )
            body = VerifyTokenResponseSerializer.error_payload(message)
            return Response(body, status=http_status)

        with transaction.atomic():
            try:
                token = (
                    AccessToken.objects.select_related("owner")
                    .select_for_update()
                    .get(token_hash=token_hash)
                )
            except AccessToken.DoesNotExist:
                return deny("Token inválido.", TokenAccessAttempt.Result.INVALID_TOKEN)

            if token.status != AccessToken.Status.ACTIVE:
                return deny(
                    "Token revogado.",
                    TokenAccessAttempt.Result.REVOKED_TOKEN,
                    token_obj=token,
                )

            machine = getattr(token, "machine", None)
            if machine is None:
                # Bind on first use
                try:
                    machine = Machine.objects.create(
                        token=token, device_uuid=device_uuid
                    )
                except IntegrityError:
                    # Corrida rara: outra requisição já bindou nesse meio tempo
                    token.refresh_from_db()
                    machine = token.machine

            if machine.device_uuid != device_uuid:
                return deny(
                    "Token já vinculado a outra máquina.",
                    TokenAccessAttempt.Result.DEVICE_MISMATCH,
                    token_obj=token,
                )

            if machine.status != Machine.Status.ACTIVE:
                return deny(
                    "Máquina revogada.",
                    TokenAccessAttempt.Result.MACHINE_REVOKED,
                    token_obj=token,
                )

            machine.last_access_at = timezone.now()
            machine.last_access_ip = ip
            machine.save(update_fields=["last_access_at", "last_access_ip"])

            TokenAccessAttempt.objects.create(
                token=token,
                device_uuid_sent=device_uuid,
                result=TokenAccessAttempt.Result.SUCCESS,
                ip_address=ip,
            )

        body = VerifyTokenResponseSerializer.success_payload(token, machine)
        return Response(body, status=status.HTTP_200_OK)


class AccessTokenViewSet(ListModelMixin, GenericViewSet):
    """Cada gerente só vê e gerencia os próprios tokens."""

    permission_classes = [IsBranchManager]
    serializer_class = AccessTokenSerializer

    def _django_user(self):
        return resolve_django_user_from_request(self.request)

    def get_queryset(self):
        owner = self._django_user()
        return (
            AccessToken.objects.filter(owner=owner)
            .select_related("machine")
            .order_by("-created_at")
        )

    def create(self, request, *args, **kwargs):
        owner = self._django_user()
        serializer = AccessTokenCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance, raw_token = AccessToken.generate(
            owner=owner, label=serializer.validated_data.get("label", "")
        )
        data = AccessTokenSerializer(instance).data
        # raw_token só é exposto aqui, nesta resposta, uma única vez
        data["token"] = raw_token
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def revoke(self, request, pk=None):
        token = self.get_object()
        if token.status == AccessToken.Status.REVOKED:
            return Response(
                {"detail": "Token já está revogado."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        token.revoke(by_user=self._django_user())
        return Response(AccessTokenSerializer(token).data)
