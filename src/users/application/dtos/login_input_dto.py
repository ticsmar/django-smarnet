"""Login input DTO."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class LoginInputDTO:
    username: str
    password: str
