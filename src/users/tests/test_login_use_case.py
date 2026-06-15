"""Tests for LoginUseCase."""

from unittest.mock import Mock

import pytest

from users.application.dtos.login_input_dto import LoginInputDTO
from users.application.use_cases.login_use_case import LoginUseCase
from users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidCredentialsError,
)
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


def test_login_success(session_store: DjangoAuthSessionStore) -> None:
    auth_repository = Mock()
    auth_repository.authenticate.return_value = True
    use_case = LoginUseCase(auth_repository, session_store)

    result = use_case.execute(LoginInputDTO(username="oracle_user", password="secret"))

    assert result.username == "oracle_user"
    assert session_store.is_authenticated()
    assert session_store.get_username() == "oracle_user"
    auth_repository.authenticate.assert_called_once_with("oracle_user", "secret")


def test_login_invalid_credentials(session_store: DjangoAuthSessionStore) -> None:
    auth_repository = Mock()
    auth_repository.authenticate.return_value = False
    use_case = LoginUseCase(auth_repository, session_store)

    with pytest.raises(InvalidCredentialsError):
        use_case.execute(LoginInputDTO(username="bad", password="wrong"))

    assert not session_store.is_authenticated()


@pytest.mark.parametrize(
    ("username", "password"),
    [
        ("", "secret"),
        ("   ", "secret"),
        ("user", ""),
    ],
)
def test_login_empty_credentials(
    session_store: DjangoAuthSessionStore,
    username: str,
    password: str,
) -> None:
    auth_repository = Mock()
    use_case = LoginUseCase(auth_repository, session_store)

    with pytest.raises(EmptyCredentialsError):
        use_case.execute(LoginInputDTO(username=username, password=password))

    auth_repository.authenticate.assert_not_called()
