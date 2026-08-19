"""Get authenticated user profile use case."""

from apps.users.application.ports.auth_session_port import AuthSessionPort
from apps.users.domain.exceptions.auth_exceptions import NotAuthenticatedError
from apps.users.domain.repositories.user_profile import UserProfileSnapshot
from apps.users.domain.repositories.user_profile_repository import UserProfileRepository


class GetUserProfileUseCase:
    def __init__(
        self,
        session_port: AuthSessionPort,
        profile_repository: UserProfileRepository,
    ) -> None:
        self._session_port = session_port
        self._profile_repository = profile_repository

    def execute(self) -> UserProfileSnapshot:
        if not self._session_port.is_authenticated():
            raise NotAuthenticatedError("No active session.")

        username = self._session_port.get_username()
        if username is None:
            raise NotAuthenticatedError("No active session.")

        return self._profile_repository.get_by_username(username)
