from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from apps.branch_auth.application.dtos.branch_auth_dtos import VerifyTokenInputDTO
from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    TokenNotFoundError,
    VerifyTokenError,
)
from apps.branch_auth.presentation.dependencies import (
    build_create_access_token_use_case,
    build_list_access_tokens_use_case,
    build_revoke_access_token_use_case,
    build_verify_token_use_case,
)
from apps.branch_auth.presentation.permissions import IsBranchManager
from apps.branch_auth.presentation.serializers.branch_auth_serializers import (
    AccessTokenCreateSerializer,
    AccessTokenSerializer,
    CreatedAccessTokenSerializer,
    VerifyTokenRequestSerializer,
    VerifyTokenResponseSerializer,
    serialize_access_token,
)
from apps.shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
)


def get_client_ip(request: Request) -> str | None:
    forwarded = str(request.META.get("HTTP_X_FORWARDED_FOR") or "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    remote = request.META.get("REMOTE_ADDR")
    return None if remote is None else str(remote)


class VerifyTokenView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "verify-token"

    @extend_schema(
        request=VerifyTokenRequestSerializer,
        responses={
            200: OpenApiResponse(description="Token valido e vinculado ao device."),
            401: OpenApiResponse(
                description="Token invalido, revogado ou de outra maquina."
            ),
        },
    )
    def post(self, request: Request) -> Response:
        req = VerifyTokenRequestSerializer(data=request.data)
        req.is_valid(raise_exception=True)

        try:
            result = build_verify_token_use_case().execute(
                VerifyTokenInputDTO(
                    token=req.validated_data["token"],
                    device_uuid=req.validated_data["device_uuid"],
                    ip_address=get_client_ip(request),
                )
            )
        except VerifyTokenError as exc:
            # Contrato Go: a negacao responde 401 com o mesmo envelope do sucesso,
            # por isso nao passa pelo exception handler compartilhado.
            return Response(
                VerifyTokenResponseSerializer.error_payload(str(exc)),
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            VerifyTokenResponseSerializer.success_payload(result),
            status=status.HTTP_200_OK,
        )


class AccessTokenViewSet(ViewSet):
    """Cada gerente só vê e gerencia os próprios tokens."""

    permission_classes = [IsBranchManager]

    def _owner_id(self) -> int:
        owner = resolve_django_user_from_request(self.request)
        if owner is None:
            # IsBranchManager already rejects callers without a Django user.
            raise PermissionDenied()
        return owner.pk

    @extend_schema(responses={200: AccessTokenSerializer(many=True)})
    def list(self, request: Request) -> Response:
        tokens = build_list_access_tokens_use_case().execute(owner_id=self._owner_id())
        output = AccessTokenSerializer(
            [serialize_access_token(token) for token in tokens], many=True
        )
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=AccessTokenCreateSerializer,
        responses={201: CreatedAccessTokenSerializer},
    )
    def create(self, request: Request) -> Response:
        serializer = AccessTokenCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        created = build_create_access_token_use_case().execute(
            owner_id=self._owner_id(),
            label=serializer.validated_data.get("label", ""),
        )
        output = CreatedAccessTokenSerializer(
            {**serialize_access_token(created.token), "token": created.raw_token}
        )
        return Response(output.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        request=None,
        responses={
            200: AccessTokenSerializer,
            400: OpenApiResponse(description="Token ja esta revogado."),
            404: OpenApiResponse(description="Token nao encontrado."),
        },
    )
    @action(detail=True, methods=["post"])
    def revoke(self, request: Request, pk: str | None = None) -> Response:
        if pk is None or not pk.isdecimal():
            raise TokenNotFoundError("Token nao encontrado.")
        token = build_revoke_access_token_use_case().execute(
            token_id=int(pk),
            owner_id=self._owner_id(),
        )
        output = AccessTokenSerializer(serialize_access_token(token))
        return Response(output.data, status=status.HTTP_200_OK)
