"""Tests for RegisterUseCase."""

from unittest.mock import Mock

import pytest

from apps.users.application.dtos.register_input_dto import RegisterInputDTO
from apps.users.application.use_cases.register_use_case import RegisterUseCase
from apps.users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidUsernameError,
    UserAlreadyExistsError,
)
from apps.users.infrastructure.session.django_auth_session_store import (
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


def test_register_success(session_store: DjangoAuthSessionStore) -> None:
    user_repository = Mock()
    user_repository.user_exists.return_value = False
    use_case = RegisterUseCase(user_repository, session_store)

    result = use_case.execute(RegisterInputDTO(username="new_user", password="secret"))

    assert result.username == "new_user"
    assert session_store.is_authenticated()
    assert session_store.get_username() == "new_user"
    user_repository.create_user.assert_called_once_with("new_user", "secret")


def test_register_user_already_exists(session_store: DjangoAuthSessionStore) -> None:
    user_repository = Mock()
    user_repository.user_exists.return_value = True
    use_case = RegisterUseCase(user_repository, session_store)

    with pytest.raises(UserAlreadyExistsError):
        use_case.execute(RegisterInputDTO(username="existing", password="secret"))

    user_repository.create_user.assert_not_called()
    assert not session_store.is_authenticated()


@pytest.mark.parametrize(
    ("username", "password"),
    [
        ("", "secret"),
        ("   ", "secret"),
        ("user", ""),
    ],
)
def test_register_empty_credentials(
    session_store: DjangoAuthSessionStore,
    username: str,
    password: str,
) -> None:
    user_repository = Mock()
    use_case = RegisterUseCase(user_repository, session_store)

    with pytest.raises(EmptyCredentialsError):
        use_case.execute(RegisterInputDTO(username=username, password=password))

    user_repository.user_exists.assert_not_called()


def test_register_invalid_username(session_store: DjangoAuthSessionStore) -> None:
    user_repository = Mock()
    use_case = RegisterUseCase(user_repository, session_store)

    with pytest.raises(InvalidUsernameError):
        use_case.execute(RegisterInputDTO(username="9bad", password="secret"))

    user_repository.user_exists.assert_not_called()
