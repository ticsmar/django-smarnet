"""Tests for LogoutUseCase."""

import pytest

from users.application.use_cases.logout_use_case import LogoutUseCase
from users.domain.exceptions.auth_exceptions import NotAuthenticatedError
from users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)


class FakeSession(dict[str, object]):
    def get(self, key: str, default: object = None) -> object:
        return super().get(key, default)

    def pop(self, key: str, default: object = None) -> object:
        return super().pop(key, default)


@pytest.fixture
def session_store() -> DjangoAuthSessionStore:
    return DjangoAuthSessionStore(FakeSession())


def test_logout_success(session_store: DjangoAuthSessionStore) -> None:
    session_store.create_session("oracle_user")
    use_case = LogoutUseCase(session_store)

    use_case.execute()

    assert not session_store.is_authenticated()
    assert session_store.get_username() is None


def test_logout_without_session(session_store: DjangoAuthSessionStore) -> None:
    use_case = LogoutUseCase(session_store)

    with pytest.raises(NotAuthenticatedError):
        use_case.execute()
