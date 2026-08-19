"""Contracts for importing an existing Oracle user into Django."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class LegacyUserProfile:
    usu_chapa: int
    usu_login: str
    usu_loginweb: str
    usu_nome: str
    usu_email: str


class OracleUserImportRepository(Protocol):
    def find_active_legacy_user(self, usu_chapa: int) -> LegacyUserProfile | None:
        """Return the active SIAOS.USUARIO row for the chapa."""

    def chapa_already_imported(self, usu_chapa: int) -> bool:
        """Return True when a UserSecurityProfile already points at the chapa."""

    def django_username_taken(self, username: str) -> bool:
        """Return True when an auth.User already uses that username."""

    def create_django_user(
        self,
        *,
        username: str,
        password: str,
        email: str,
        first_name: str,
        usu_chapa: int,
    ) -> int:
        """Create the auth.User plus its security profile and return the user id."""


class AccessNotificationPort(Protocol):
    def send_temporary_password(
        self, *, email: str, name: str, username: str, password: str
    ) -> None:
        """Queue the credentials e-mail. Raises NotificationFailedError on failure."""
