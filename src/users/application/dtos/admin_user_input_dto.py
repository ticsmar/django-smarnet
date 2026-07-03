"""Admin user input DTOs."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class ListUsersInputDTO:
    search: str
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class CreateUserAdminInputDTO:
    username: str
    password: str
    groups: list[str]
    email: str = ""
    require_password_change: bool = True


@dataclass(frozen=True, slots=True)
class UpdateUserInputDTO:
    user_id: int
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    is_active: bool | None = None
    is_superuser: bool | None = None


@dataclass(frozen=True, slots=True)
class SetUserGroupsInputDTO:
    user_id: int
    groups: list[str]


@dataclass(frozen=True, slots=True)
class SetUserPasswordInputDTO:
    user_id: int
    password: str | None = None


@dataclass(frozen=True, slots=True)
class ResetUserPasswordInputDTO:
    user_id: int
    password: str | None = None
