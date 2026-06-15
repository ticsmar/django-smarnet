"""Session port for authentication use cases."""

from typing import Protocol


class AuthSessionPort(Protocol):
    def create_session(self, username: str) -> None:
        """Persist an authenticated session for the given username."""

    def clear_session(self) -> None:
        """Remove authentication data from the session."""

    def get_username(self) -> str | None:
        """Return the authenticated Oracle username, if any."""

    def is_authenticated(self) -> bool:
        """Return whether the current session is authenticated."""
