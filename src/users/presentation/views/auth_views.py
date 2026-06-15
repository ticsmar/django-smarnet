"""Authentication API views."""

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from users.application.dtos.login_input_dto import LoginInputDTO
from users.application.dtos.register_input_dto import RegisterInputDTO
from users.domain.exceptions.auth_exceptions import (
    AuthError,
    EmptyCredentialsError,
    InvalidCredentialsError,
    InvalidUsernameError,
    NotAuthenticatedError,
    RegistrationFailedError,
    UserAlreadyExistsError,
)
from users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)
from users.presentation.dependencies import (
    build_get_current_user_use_case,
    build_login_use_case,
    build_logout_use_case,
    build_register_use_case,
)
from users.presentation.serializers.auth_serializers import (
    AuthenticatedUserSerializer,
    LoginRequestSerializer,
    RegisterRequestSerializer,
)


def _session_store(request: Request) -> DjangoAuthSessionStore:
    return DjangoAuthSessionStore(request._request.session)


class LoginView(APIView):
    def post(self, request: Request) -> Response:
        serializer = LoginRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated: dict[str, str] = serializer.validated_data
        use_case = build_login_use_case(_session_store(request))

        try:
            result = use_case.execute(
                LoginInputDTO(
                    username=validated["username"],
                    password=validated["password"],
                )
            )
        except EmptyCredentialsError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        except InvalidCredentialsError:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        output = AuthenticatedUserSerializer({"username": result.username})
        return Response(output.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, request: Request) -> Response:
        serializer = RegisterRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated: dict[str, str] = serializer.validated_data
        use_case = build_register_use_case(_session_store(request))

        try:
            result = use_case.execute(
                RegisterInputDTO(
                    username=validated["username"],
                    password=validated["password"],
                )
            )
        except EmptyCredentialsError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        except InvalidUsernameError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        except UserAlreadyExistsError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_409_CONFLICT)
        except RegistrationFailedError:
            return Response(
                {"detail": "Registration failed."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        output = AuthenticatedUserSerializer({"username": result.username})
        return Response(output.data, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    def post(self, request: Request) -> Response:
        use_case = build_logout_use_case(_session_store(request))

        try:
            use_case.execute()
        except NotAuthenticatedError:
            return Response(
                {"detail": "Not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrentUserView(APIView):
    def get(self, request: Request) -> Response:
        use_case = build_get_current_user_use_case(_session_store(request))

        try:
            result = use_case.execute()
        except NotAuthenticatedError:
            return Response(
                {"detail": "Not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except AuthError:
            return Response(
                {"detail": "Not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        output = AuthenticatedUserSerializer({"username": result.username})
        return Response(output.data, status=status.HTTP_200_OK)
