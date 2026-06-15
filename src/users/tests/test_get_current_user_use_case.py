"""Tests for GetCurrentUserUseCase."""

import pytest

from users.application.use_cases.get_current_user_use_case import GetCurrentUserUseCase
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


def test_get_current_user_success(session_store: DjangoAuthSessionStore) -> None:
    session_store.create_session("oracle_user")
    use_case = GetCurrentUserUseCase(session_store)

    result = use_case.execute()

    assert result.username == "oracle_user"


def test_get_current_user_unauthenticated(
    session_store: DjangoAuthSessionStore,
) -> None:
    use_case = GetCurrentUserUseCase(session_store)

    with pytest.raises(NotAuthenticatedError):
        use_case.execute()
