"""Tests for list users use case."""

from datetime import UTC, datetime
from unittest.mock import MagicMock

from apps.users.application.dtos.admin_user_input_dto import ListUsersInputDTO
from apps.users.application.use_cases.list_users_use_case import ListUsersUseCase
from apps.users.domain.repositories.user_admin_repository import (
    AdminUserRecord,
    PaginatedUsersResult,
)


def test_list_users_returns_paginated_dto() -> None:
    repository = MagicMock()
    repository.list_users.return_value = PaginatedUsersResult(
        items=[
            AdminUserRecord(
                id=1,
                username="alice",
                email="",
                first_name="",
                last_name="",
                is_active=True,
                is_superuser=False,
                groups=["access_admins"],
                last_login=None,
                date_joined=datetime(2025, 1, 1, tzinfo=UTC),
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )

    result = ListUsersUseCase(repository).execute(
        ListUsersInputDTO(search="", page=1, page_size=20)
    )

    assert result.total == 1
    assert result.items[0].username == "alice"
    repository.list_users.assert_called_once_with(search="", page=1, page_size=20)
