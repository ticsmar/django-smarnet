"""Authenticated user domain entity."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class AuthenticatedUserEntity:
    username: str
