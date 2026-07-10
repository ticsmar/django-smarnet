"""Authentication API views."""

from django.conf import settings
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.shared.presentation.auth.permissions import IsOracleAuthenticated
from apps.users.application.dtos.change_password_input_dto import ChangePasswordInputDTO
from apps.users.application.dtos.login_input_dto import LoginInputDTO
from apps.users.application.dtos.register_input_dto import RegisterInputDTO
from apps.users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)
from apps.users.presentation.dependencies import (
    build_change_password_use_case,
    build_get_current_user_use_case,
    build_login_use_case,
    build_logout_use_case,
    build_register_use_case,
)
from apps.users.presentation.serializers.auth_serializers import (
    AuthenticatedUserSerializer,
    ChangePasswordRequestSerializer,
    LoginRequestSerializer,
    RegisterRequestSerializer,
    build_authenticated_user_payload,
)


def _session_store(request: Request) -> DjangoAuthSessionStore:
    return DjangoAuthSessionStore(request.session)


class LoginView(APIView):
    authentication_classes: list[type] = []
    permission_classes: list[type] = [AllowAny]

    @extend_schema(
        request=LoginRequestSerializer,
        responses={
            200: AuthenticatedUserSerializer,
            400: OpenApiResponse(description="Invalid request."),
            401: OpenApiResponse(description="Invalid credentials."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = LoginRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated: dict[str, str] = serializer.validated_data
        result = build_login_use_case(_session_store(request)).execute(
            LoginInputDTO(
                username=validated["username"],
                password=validated["password"],
            )
        )
        output = AuthenticatedUserSerializer(
            build_authenticated_user_payload(result.username)
        )
        return Response(output.data, status=status.HTTP_200_OK)


SELF_REGISTRATION_FORBIDDEN_DETAIL = (
    "Self-registration is not allowed. New users must be created by an administrator."
)


class RegisterView(APIView):
    authentication_classes: list[type] = []
    permission_classes: list[type] = [AllowAny]

    @extend_schema(
        request=RegisterRequestSerializer,
        responses={
            201: AuthenticatedUserSerializer,
            400: OpenApiResponse(description="Invalid request."),
            403: OpenApiResponse(description="Self-registration is disabled."),
            409: OpenApiResponse(description="User already exists."),
            500: OpenApiResponse(description="Registration failed."),
        },
    )
    def post(self, request: Request) -> Response:
        if not settings.ALLOW_PUBLIC_REGISTER:
            return Response(
                {"detail": SELF_REGISTRATION_FORBIDDEN_DETAIL},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = RegisterRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated: dict[str, str] = serializer.validated_data
        result = build_register_use_case(_session_store(request)).execute(
            RegisterInputDTO(
                username=validated["username"],
                password=validated["password"],
            )
        )
        output = AuthenticatedUserSerializer(
            build_authenticated_user_payload(result.username)
        )
        return Response(output.data, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    permission_classes: list[type] = [IsOracleAuthenticated]

    @extend_schema(
        request=None,
        responses={
            204: OpenApiResponse(description="Logged out."),
            401: OpenApiResponse(description="Not authenticated."),
        },
    )
    def post(self, request: Request) -> Response:
        build_logout_use_case(_session_store(request)).execute()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrentUserView(APIView):
    permission_classes: list[type] = [IsOracleAuthenticated]

    @extend_schema(
        responses={
            200: AuthenticatedUserSerializer,
            401: OpenApiResponse(description="Not authenticated."),
        },
    )
    def get(self, request: Request) -> Response:
        result = build_get_current_user_use_case(_session_store(request)).execute()
        output = AuthenticatedUserSerializer(
            build_authenticated_user_payload(result.username)
        )
        return Response(output.data, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes: list[type] = [IsOracleAuthenticated]

    @extend_schema(
        request=ChangePasswordRequestSerializer,
        responses={
            204: OpenApiResponse(description="Password changed."),
            400: OpenApiResponse(description="Invalid request."),
            401: OpenApiResponse(description="Invalid current password."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = ChangePasswordRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        current_user = build_get_current_user_use_case(
            _session_store(request)
        ).execute()
        username = current_user.username
        current_password = validated.get("current_password") or None
        if current_password == "":
            current_password = None
        build_change_password_use_case().execute(
            ChangePasswordInputDTO(
                username=username,
                new_password=validated["new_password"],
                current_password=current_password,
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
