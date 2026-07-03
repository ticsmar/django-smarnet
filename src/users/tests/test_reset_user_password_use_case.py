"""Tests for reset user password use case."""

from unittest.mock import MagicMock

from users.application.dtos.admin_user_input_dto import ResetUserPasswordInputDTO
from users.application.use_cases.reset_user_password_use_case import (
    ResetUserPasswordUseCase,
)


def test_reset_user_password_returns_temporary_password() -> None:
    security = MagicMock()
    security.reset_password.return_value = "temp-pass-123"

    result = ResetUserPasswordUseCase(security).execute(
        ResetUserPasswordInputDTO(user_id=1)
    )

    assert result.temporary_password == "temp-pass-123"
    security.reset_password.assert_called_once_with(1, None)
