"""User security repository contract."""

from typing import Protocol


class UserSecurityRepository(Protocol):
    def must_change_password(self, username: str) -> bool:
        """Return True when the user must change password on next login."""

    def set_must_change_password(self, username: str, required: bool) -> None:
        """Set or clear the must-change-password flag."""

    def verify_password(self, username: str, password: str) -> bool:
        """Verify the user's current password."""

    def change_password(self, username: str, new_password: str) -> None:
        """Set a new password and clear the must-change flag."""

    def reset_password(self, user_id: int, password: str | None = None) -> str:
        """Reset password and require change on next login; returns the new password."""
