"""Register input DTO."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class RegisterInputDTO:
    username: str
    password: str
