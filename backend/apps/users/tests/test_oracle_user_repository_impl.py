"""Tests for OracleUserRepositoryImpl."""

from unittest.mock import MagicMock, patch

import pytest
from django.db import IntegrityError

from apps.users.domain.exceptions.auth_exceptions import RegistrationFailedError
from apps.users.infrastructure.repositories.oracle_user_repository_impl import (
    OracleUserRepositoryImpl,
    build_oracle_user_repository,
)


def _build_repository() -> OracleUserRepositoryImpl:
    return OracleUserRepositoryImpl()


@patch("apps.users.infrastructure.repositories.oracle_user_repository_impl.User")
def test_user_exists_true(mock_user: MagicMock) -> None:
    mock_user.objects.filter.return_value.exists.return_value = True
    repository = _build_repository()

    result = repository.user_exists("existing")

    assert result is True
    mock_user.objects.filter.assert_called_once_with(username__iexact="existing")


@patch("apps.users.infrastructure.repositories.oracle_user_repository_impl.User")
def test_user_exists_false(mock_user: MagicMock) -> None:
    mock_user.objects.filter.return_value.exists.return_value = False
    repository = _build_repository()

    result = repository.user_exists("new_user")

    assert result is False


@patch("apps.users.infrastructure.repositories.oracle_user_repository_impl.User")
def test_create_user_persists_auth_user(mock_user: MagicMock) -> None:
    repository = _build_repository()

    repository.create_user("new_user", "secret")

    mock_user.objects.create_user.assert_called_once_with(
        username="new_user",
        password="secret",
    )


@patch("apps.users.infrastructure.repositories.oracle_user_repository_impl.User")
def test_create_user_failure(mock_user: MagicMock) -> None:
    mock_user.objects.create_user.side_effect = IntegrityError("duplicate")
    repository = _build_repository()

    with pytest.raises(RegistrationFailedError):
        repository.create_user("new_user", "secret")


def test_build_oracle_user_repository_returns_impl() -> None:
    repository = build_oracle_user_repository()

    assert isinstance(repository, OracleUserRepositoryImpl)
