"""Tests for user admin repository."""

from unittest.mock import MagicMock, patch

import pytest

from apps.users.domain.exceptions.admin_exceptions import (
    GroupNotFoundError,
    UserNotFoundError,
)
from apps.users.infrastructure.repositories.user_admin_repository_impl import (
    UserAdminRepositoryImpl,
)


def test_set_user_groups_unknown_group_raises() -> None:
    repository = UserAdminRepositoryImpl()
    user = MagicMock()
    queryset = MagicMock()
    queryset.first.return_value = user
    with (
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl."
            "User.objects.prefetch_related",
            return_value=MagicMock(filter=MagicMock(return_value=queryset)),
        ),
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl._resolve_groups",
            side_effect=GroupNotFoundError("Unknown groups: missing_group"),
        ),
        pytest.raises(GroupNotFoundError),
    ):
        repository.set_user_groups(1, ["missing_group"])


def test_get_user_not_found_raises() -> None:
    repository = UserAdminRepositoryImpl()
    queryset = MagicMock()
    queryset.first.return_value = None
    with (
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl."
            "User.objects.prefetch_related",
            return_value=MagicMock(filter=MagicMock(return_value=queryset)),
        ),
        pytest.raises(UserNotFoundError),
    ):
        repository.get_user(9999)
