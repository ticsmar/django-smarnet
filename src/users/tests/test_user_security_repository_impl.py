"""Tests for user security repository."""

from unittest.mock import MagicMock, patch

import pytest

from users.domain.exceptions.admin_exceptions import UserNotFoundError
from users.infrastructure.repositories.user_security_repository_impl import (
    UserSecurityRepositoryImpl,
)


def test_reset_password_sets_must_change_flag() -> None:
    repository = UserSecurityRepositoryImpl()
    user = MagicMock()
    profile = MagicMock()
    with (
        patch(
            "users.infrastructure.repositories.user_security_repository_impl._get_user",
            return_value=user,
        ),
        patch(
            "users.infrastructure.repositories.user_security_repository_impl._ensure_profile",
            return_value=profile,
        ),
        patch(
            "users.infrastructure.repositories.user_security_repository_impl.get_random_string",
            return_value="temp-abc-123",
        ),
    ):
        result = repository.reset_password(1)

    assert result == "temp-abc-123"
    user.set_password.assert_called_once_with("temp-abc-123")
    assert profile.must_change_password is True


def test_change_password_clears_must_change_flag() -> None:
    repository = UserSecurityRepositoryImpl()
    user = MagicMock()
    profile = MagicMock()
    with (
        patch(
            "users.infrastructure.repositories.user_security_repository_impl._get_user_by_username",
            return_value=user,
        ),
        patch(
            "users.infrastructure.repositories.user_security_repository_impl._ensure_profile",
            return_value=profile,
        ),
    ):
        repository.change_password("alice", "new-secret")

    user.set_password.assert_called_once_with("new-secret")
    assert profile.must_change_password is False


def test_change_password_unknown_user_raises() -> None:
    repository = UserSecurityRepositoryImpl()
    with patch(
        "users.infrastructure.repositories.user_security_repository_impl._get_user_by_username",
        return_value=None,
    ):
        with pytest.raises(UserNotFoundError):
            repository.change_password("missing", "new-secret")
