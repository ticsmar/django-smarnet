"""Port for loading the unified user profile."""

from typing import Protocol

from apps.users.domain.repositories.user_profile import UserProfileSnapshot


class UserProfileRepository(Protocol):
    def get_by_username(self, username: str) -> UserProfileSnapshot:
        """Return profile for the given login (Django + SIAOS.USUARIO + FUNCIONARIO)."""
