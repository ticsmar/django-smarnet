"""Admin user management repository contract."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class AdminUserRecord:
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    is_active: bool
    is_superuser: bool
    groups: list[str]
    last_login: datetime | None
    date_joined: datetime


@dataclass(frozen=True, slots=True)
class AdminGroupRecord:
    name: str


@dataclass(frozen=True, slots=True)
class PaginatedUsersResult:
    items: list[AdminUserRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class AdminUserUpdate:
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    is_active: bool | None = None
    is_superuser: bool | None = None


class UserAdminRepository(Protocol):
    def list_users(
        self, *, search: str, page: int, page_size: int
    ) -> PaginatedUsersResult:
        """Return a paginated list of users."""

    def get_user(self, user_id: int) -> AdminUserRecord:
        """Return a single user by primary key."""

    def create_user(
        self,
        *,
        username: str,
        password: str,
        groups: list[str],
        email: str = "",
    ) -> AdminUserRecord:
        """Create a user and optionally assign groups."""

    def update_user(self, user_id: int, update: AdminUserUpdate) -> AdminUserRecord:
        """Update mutable user fields."""

    def set_user_groups(self, user_id: int, groups: list[str]) -> AdminUserRecord:
        """Replace the user's group membership."""

    def set_user_password(self, user_id: int, password: str) -> None:
        """Set a new password for the user."""

    def list_groups(self) -> list[AdminGroupRecord]:
        """Return all assignable groups."""
