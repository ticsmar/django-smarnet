"""Oracle user management repository contract."""

from typing import Protocol


class OracleUserRepository(Protocol):
    def user_exists(self, username: str) -> bool:
        """Return True when the Oracle user already exists."""

    def create_user(self, username: str, password: str) -> None:
        """Create a new Oracle user with the given credentials."""
