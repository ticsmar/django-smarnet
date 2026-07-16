"""Tests for django_user_resolver."""

from unittest.mock import MagicMock, patch

from apps.shared.presentation.auth.django_user_resolver import (
    ACCESS_ADMINS_GROUP,
    BRANCH_MANAGERS_GROUP,
    is_access_admin_for_username,
    is_branch_manager_for_username,
    user_has_access_admin_access,
    user_has_branch_manager_access,
)


def test_superuser_has_branch_manager_access() -> None:
    user = MagicMock()
    user.is_superuser = True

    assert user_has_branch_manager_access(user) is True


def test_branch_managers_group_grants_access() -> None:
    user = MagicMock()
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True

    assert user_has_branch_manager_access(user) is True


def test_regular_user_denied() -> None:
    user = MagicMock()
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = False

    assert user_has_branch_manager_access(user) is False


@patch(
    "apps.shared.presentation.auth.django_user_resolver.resolve_django_user_by_username"
)
def test_is_branch_manager_for_username(mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = MagicMock(is_superuser=True)

    assert is_branch_manager_for_username("boss") is True


def test_access_admins_group_grants_access_admin() -> None:
    user = MagicMock()
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True

    assert user_has_access_admin_access(user) is True
    user.groups.filter.assert_called_with(name=ACCESS_ADMINS_GROUP)


@patch(
    "apps.shared.presentation.auth.django_user_resolver.resolve_django_user_by_username"
)
def test_superuser_has_access_admin(mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = MagicMock(is_superuser=True)

    assert is_access_admin_for_username("boss") is True


def test_branch_managers_constant() -> None:
    assert BRANCH_MANAGERS_GROUP == "branch_managers"


@patch(
    "apps.shared.presentation.auth.django_user_resolver.resolve_django_user_by_username"
)
def test_get_permissions_for_username(mock_resolve: MagicMock) -> None:
    from apps.shared.presentation.auth.django_user_resolver import (
        get_permissions_for_username,
    )

    user = MagicMock()
    user.get_all_permissions.return_value = {
        "compras_infrastructure.view_fornecedor",
        "compras_infrastructure.add_forneccontato",
    }
    mock_resolve.return_value = user

    assert get_permissions_for_username("ops") == [
        "compras_infrastructure.add_forneccontato",
        "compras_infrastructure.view_fornecedor",
    ]
