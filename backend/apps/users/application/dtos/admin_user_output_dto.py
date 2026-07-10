"""Admin user output DTO."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class AdminUserOutputDTO:
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
class AdminGroupOutputDTO:
    name: str


@dataclass(frozen=True, slots=True)
class PaginatedUsersOutputDTO:
    items: list[AdminUserOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class ResetPasswordOutputDTO:
    temporary_password: str
