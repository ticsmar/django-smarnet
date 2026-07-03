"""Tests for create user admin use case."""

from datetime import UTC, datetime
from unittest.mock import MagicMock

import pytest

from users.application.dtos.admin_user_input_dto import CreateUserAdminInputDTO
from users.application.use_cases.create_user_admin_use_case import (
    CreateUserAdminUseCase,
)
from users.domain.exceptions.auth_exceptions import UserAlreadyExistsError
from users.domain.repositories.user_admin_repository import AdminUserRecord


def test_create_user_admin_success() -> None:
    repository = MagicMock()
    user_repository = MagicMock()
    security_repository = MagicMock()
    user_repository.user_exists.return_value = False
    repository.create_user.return_value = AdminUserRecord(
        id=2,
        username="new_user",
        email="",
        first_name="",
        last_name="",
        is_active=True,
        is_superuser=False,
        groups=[],
        last_login=None,
        date_joined=datetime(2025, 1, 1, tzinfo=UTC),
    )

    result = CreateUserAdminUseCase(
        repository, user_repository, security_repository
    ).execute(
        CreateUserAdminInputDTO(username="new_user", password="secret", groups=[])
    )

    assert result.username == "new_user"
    repository.create_user.assert_called_once()
    security_repository.set_must_change_password.assert_called_once_with(
        "new_user", True
    )


def test_create_user_admin_skips_password_change_flag_when_disabled() -> None:
    repository = MagicMock()
    user_repository = MagicMock()
    security_repository = MagicMock()
    user_repository.user_exists.return_value = False
    repository.create_user.return_value = AdminUserRecord(
        id=2,
        username="new_user",
        email="",
        first_name="",
        last_name="",
        is_active=True,
        is_superuser=False,
        groups=[],
        last_login=None,
        date_joined=datetime(2025, 1, 1, tzinfo=UTC),
    )

    CreateUserAdminUseCase(
        repository, user_repository, security_repository
    ).execute(
        CreateUserAdminInputDTO(
            username="new_user",
            password="secret",
            groups=[],
            require_password_change=False,
        )
    )

    security_repository.set_must_change_password.assert_not_called()


def test_create_user_admin_rejects_existing_user() -> None:
    repository = MagicMock()
    user_repository = MagicMock()
    user_repository.user_exists.return_value = True

    with pytest.raises(UserAlreadyExistsError):
        CreateUserAdminUseCase(repository, user_repository, MagicMock()).execute(
            CreateUserAdminInputDTO(username="existing", password="secret", groups=[])
        )
