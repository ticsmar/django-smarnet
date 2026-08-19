"""Access token repository contract."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class TokenOwnerSnapshot:
    user_id: int
    name: str
    email: str


@dataclass(frozen=True, slots=True)
class AccessTokenSnapshot:
    token_id: int
    owner: TokenOwnerSnapshot
    label: str
    token_prefix: str
    status: str
    is_active: bool
    created_at: datetime
    revoked_at: datetime | None


class AccessTokenRepository(Protocol):
    def lock_by_raw_token(self, raw_token: str) -> AccessTokenSnapshot | None:
        """Return the token for the presented value, locked for update.

        Must be called inside a transaction: the lock is what stops two concurrent
        verifications from binding the same token to different devices.
        """

    def find_for_owner(
        self, *, token_id: int, owner_id: int
    ) -> AccessTokenSnapshot | None:
        """Return the token only when it belongs to that owner."""

    def list_for_owner(self, owner_id: int) -> list[AccessTokenSnapshot]:
        """Return the owner's tokens, newest first."""

    def create(self, *, owner_id: int, label: str) -> tuple[AccessTokenSnapshot, str]:
        """Create a token and return it with the raw value, shown only once."""

    def revoke(self, *, token_id: int, revoked_by_id: int) -> AccessTokenSnapshot:
        """Revoke the token and its bound machine."""
