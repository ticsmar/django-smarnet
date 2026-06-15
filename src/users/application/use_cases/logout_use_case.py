"""Logout use case."""

from users.application.ports.auth_session_port import AuthSessionPort
from users.domain.exceptions.auth_exceptions import NotAuthenticatedError


class LogoutUseCase:
    def __init__(self, session_port: AuthSessionPort) -> None:
        self._session_port = session_port

    def execute(self) -> None:
        if not self._session_port.is_authenticated():
            raise NotAuthenticatedError("No active session.")
        self._session_port.clear_session()
