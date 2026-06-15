"""Tests for OracleAuthRepositoryImpl."""

from unittest.mock import MagicMock, patch

from users.infrastructure.repositories.oracle_auth_repository_impl import (
    OracleAuthRepositoryImpl,
)


@patch(
    "users.infrastructure.repositories.oracle_auth_repository_impl.django_authenticate"
)
def test_authenticate_success(mock_authenticate: MagicMock) -> None:
    mock_authenticate.return_value = MagicMock()
    repository = OracleAuthRepositoryImpl()

    result = repository.authenticate("user", "pass")

    assert result is True
    mock_authenticate.assert_called_once_with(username="user", password="pass")


@patch(
    "users.infrastructure.repositories.oracle_auth_repository_impl.django_authenticate"
)
def test_authenticate_failure(mock_authenticate: MagicMock) -> None:
    mock_authenticate.return_value = None
    repository = OracleAuthRepositoryImpl()

    result = repository.authenticate("user", "wrong")

    assert result is False
