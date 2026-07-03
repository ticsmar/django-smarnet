"""Change password input DTO."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class ChangePasswordInputDTO:
    username: str
    new_password: str
    current_password: str | None = None
