"""Unit tests for ImportOracleUserUseCase."""

import pytest

from apps.users.application.use_cases.import_oracle_user_use_case import (
    ImportOracleUserUseCase,
)
from apps.users.domain.exceptions.oracle_import_exceptions import (
    NotificationFailedError,
    OracleUserAlreadyImportedError,
    OracleUserMissingEmailError,
    OracleUserMissingLoginError,
    OracleUserNotFoundError,
    OracleUserUsernameTakenError,
)
from apps.users.domain.repositories.oracle_user_import_repository import (
    LegacyUserProfile,
)

_CHAPA = 4242
_CREATED_USER_ID = 91


def _legacy(**overrides: object) -> LegacyUserProfile:
    payload: dict[str, object] = {
        "usu_chapa": _CHAPA,
        "usu_login": "ana",
        "usu_loginweb": "ana.silva",
        "usu_nome": "Ana Silva",
        "usu_email": "ana@smar.com.br",
    }
    payload.update(overrides)
    return LegacyUserProfile(**payload)


class FakeOracleUserImportRepository:
    def __init__(
        self,
        *,
        legacy: LegacyUserProfile | None = None,
        imported_chapas: set[int] | None = None,
        taken_usernames: set[str] | None = None,
    ) -> None:
        self._legacy = legacy
        self._imported_chapas = imported_chapas or set()
        self._taken_usernames = {name.lower() for name in (taken_usernames or set())}
        self.created: list[dict[str, object]] = []

    def find_active_legacy_user(self, usu_chapa: int) -> LegacyUserProfile | None:
        if self._legacy is None or self._legacy.usu_chapa != usu_chapa:
            return None
        return self._legacy

    def chapa_already_imported(self, usu_chapa: int) -> bool:
        return usu_chapa in self._imported_chapas

    def django_username_taken(self, username: str) -> bool:
        return username.lower() in self._taken_usernames

    def create_django_user(
        self,
        *,
        username: str,
        password: str,
        email: str,
        first_name: str,
        usu_chapa: int,
    ) -> int:
        self.created.append(
            {
                "username": username,
                "password": password,
                "email": email,
                "first_name": first_name,
                "usu_chapa": usu_chapa,
            }
        )
        return _CREATED_USER_ID


class FakeNotifications:
    def __init__(self, *, failure: str = "") -> None:
        self._failure = failure
        self.sent: list[dict[str, str]] = []

    def send_temporary_password(
        self, *, email: str, name: str, username: str, password: str
    ) -> None:
        if self._failure:
            raise NotificationFailedError(self._failure)
        self.sent.append(
            {
                "email": email,
                "name": name,
                "username": username,
                "password": password,
            }
        )


def test_import_creates_the_django_user_and_mails_the_password() -> None:
    repository = FakeOracleUserImportRepository(legacy=_legacy())
    notifications = FakeNotifications()

    result = ImportOracleUserUseCase(repository, notifications).execute(
        usu_chapa=_CHAPA
    )

    assert result.username == "ana.silva"
    assert result.django_user_id == _CREATED_USER_ID
    assert result.email_sent is True
    assert result.notification_error == ""
    assert repository.created[0]["usu_chapa"] == _CHAPA
    assert notifications.sent[0]["password"] == result.temporary_password


def test_import_reports_partial_success_when_the_email_fails() -> None:
    """O usuario ja existe; o admin recebe a senha para repassar manualmente."""
    repository = FakeOracleUserImportRepository(legacy=_legacy())
    notifications = FakeNotifications(failure="fila de e-mail indisponivel")

    result = ImportOracleUserUseCase(repository, notifications).execute(
        usu_chapa=_CHAPA
    )

    assert result.email_sent is False
    assert result.notification_error == "fila de e-mail indisponivel"
    assert result.django_user_id == _CREATED_USER_ID


def test_import_falls_back_to_usu_login() -> None:
    repository = FakeOracleUserImportRepository(legacy=_legacy(usu_loginweb=""))

    result = ImportOracleUserUseCase(repository, FakeNotifications()).execute(
        usu_chapa=_CHAPA
    )

    assert result.username == "ana"


def test_import_rejects_unknown_chapa() -> None:
    repository = FakeOracleUserImportRepository(legacy=None)

    with pytest.raises(OracleUserNotFoundError):
        ImportOracleUserUseCase(repository, FakeNotifications()).execute(
            usu_chapa=_CHAPA
        )


def test_import_rejects_chapa_already_imported() -> None:
    repository = FakeOracleUserImportRepository(
        legacy=_legacy(), imported_chapas={_CHAPA}
    )

    with pytest.raises(OracleUserAlreadyImportedError):
        ImportOracleUserUseCase(repository, FakeNotifications()).execute(
            usu_chapa=_CHAPA
        )

    assert repository.created == []


def test_import_rejects_username_already_in_django() -> None:
    repository = FakeOracleUserImportRepository(
        legacy=_legacy(), taken_usernames={"ANA.SILVA"}
    )

    with pytest.raises(OracleUserUsernameTakenError):
        ImportOracleUserUseCase(repository, FakeNotifications()).execute(
            usu_chapa=_CHAPA
        )

    assert repository.created == []


def test_import_requires_a_login() -> None:
    repository = FakeOracleUserImportRepository(
        legacy=_legacy(usu_login="", usu_loginweb="")
    )

    with pytest.raises(OracleUserMissingLoginError):
        ImportOracleUserUseCase(repository, FakeNotifications()).execute(
            usu_chapa=_CHAPA
        )


def test_import_requires_an_email() -> None:
    repository = FakeOracleUserImportRepository(legacy=_legacy(usu_email=""))

    with pytest.raises(OracleUserMissingEmailError):
        ImportOracleUserUseCase(repository, FakeNotifications()).execute(
            usu_chapa=_CHAPA
        )

    assert repository.created == []
