"""Get current user use case."""

from apps.users.application.dtos.authenticated_user_output_dto import (
    AuthenticatedUserOutputDTO,
)
from apps.users.application.ports.auth_session_port import AuthSessionPort
from apps.users.domain.exceptions.auth_exceptions import NotAuthenticatedError


class GetCurrentUserUseCase:
    def __init__(self, session_port: AuthSessionPort) -> None:
        self._session_port = session_port

    def execute(self) -> AuthenticatedUserOutputDTO:
        if not self._session_port.is_authenticated():
            raise NotAuthenticatedError("No active session.")

        username = self._session_port.get_username()
        if username is None:
            raise NotAuthenticatedError("No active session.")

        return AuthenticatedUserOutputDTO(username=username)
