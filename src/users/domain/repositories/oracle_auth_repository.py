"""Oracle authentication repository contract."""

from typing import Protocol


class OracleAuthRepository(Protocol):
    def authenticate(self, username: str, password: str) -> bool:
        """Return True when Oracle accepts the given credentials."""
