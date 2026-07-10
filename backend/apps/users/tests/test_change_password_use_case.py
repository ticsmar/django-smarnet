"""Tests for change password use case."""

from unittest.mock import MagicMock

import pytest

from apps.users.application.dtos.change_password_input_dto import ChangePasswordInputDTO
from apps.users.application.use_cases.change_password_use_case import (
    ChangePasswordUseCase,
)
from apps.users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidCredentialsError,
)


def test_change_password_requires_current_when_not_forced() -> None:
    security = MagicMock()
    security.must_change_password.return_value = False

    with pytest.raises(EmptyCredentialsError):
        ChangePasswordUseCase(security).execute(
            ChangePasswordInputDTO(
                username="alice",
                new_password="new-secret",
            )
        )


def test_change_password_verifies_current_password() -> None:
    security = MagicMock()
    security.must_change_password.return_value = False
    security.verify_password.return_value = False

    with pytest.raises(InvalidCredentialsError):
        ChangePasswordUseCase(security).execute(
            ChangePasswordInputDTO(
                username="alice",
                new_password="new-secret",
                current_password="wrong",
            )
        )


def test_change_password_when_forced_does_not_require_current() -> None:
    security = MagicMock()
    security.must_change_password.return_value = True

    ChangePasswordUseCase(security).execute(
        ChangePasswordInputDTO(username="alice", new_password="new-secret")
    )

    security.change_password.assert_called_once_with("alice", "new-secret")
