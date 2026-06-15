"""Authenticated user output DTO."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class AuthenticatedUserOutputDTO:
    username: str
