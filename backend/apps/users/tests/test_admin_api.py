"""API tests for admin endpoints."""

from collections.abc import Generator
from datetime import UTC, datetime
from unittest.mock import MagicMock, patch

import pytest
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient

from apps.shared.presentation.auth.session_user import OracleSessionUser
from apps.users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)


def _admin_user() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True
    return user


def _regular_user() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = False
    return user


def _superuser() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = True
    return user


@pytest.fixture
def admin_user_dto() -> AdminUserOutputDTO:
    return AdminUserOutputDTO(
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


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_users_use_case")
def test_access_admin_can_list_users(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = PaginatedUsersOutputDTO(
        items=[admin_user_dto],
        total=1,
        page=1,
        page_size=20,
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["total"] == 1


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_users_use_case")
def test_superuser_can_list_users(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = PaginatedUsersOutputDTO(
        items=[admin_user_dto],
        total=1,
        page=1,
        page_size=20,
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_200_OK


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
def test_regular_user_denied(mock_resolve: MagicMock, api_client: APIClient) -> None:
    mock_resolve.return_value = _regular_user()
    api_client.force_authenticate(user=OracleSessionUser(username="regular"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_403_FORBIDDEN


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_create_user_admin_use_case")
def test_access_admin_can_create_user(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    created = AdminUserOutputDTO(
        id=2,
        username="new_admin_user",
        email="",
        first_name="",
        last_name="",
        is_active=True,
        is_superuser=False,
        groups=["branch_managers"],
        last_login=None,
        date_joined=datetime(2025, 1, 1, tzinfo=UTC),
    )
    mock_build.return_value.execute.return_value = created
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/users/",
        {
            "username": "new_admin_user",
            "password": "secret123",
            "groups": ["branch_managers"],
        },
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["username"] == "new_admin_user"


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_set_user_groups_use_case")
def test_access_admin_can_set_groups(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    updated = AdminUserOutputDTO(
        id=admin_user_dto.id,
        username=admin_user_dto.username,
        email=admin_user_dto.email,
        first_name=admin_user_dto.first_name,
        last_name=admin_user_dto.last_name,
        is_active=admin_user_dto.is_active,
        is_superuser=admin_user_dto.is_superuser,
        groups=["branch_managers"],
        last_login=admin_user_dto.last_login,
        date_joined=admin_user_dto.date_joined,
    )
    mock_build.return_value.execute.return_value = updated
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.put(
        "/api/admin/users/1/groups/",
        {"groups": ["branch_managers"]},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["groups"] == ["branch_managers"]


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_groups_use_case")
def test_access_admin_can_list_groups(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = [
        AdminGroupOutputDTO(name="access_admins")
    ]
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/groups/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["name"] == "access_admins"


@pytest.fixture
def me_access_mocks() -> Generator[MagicMock]:
    with (
        patch(
            "apps.users.presentation.dependencies.build_oracle_auth_repository"
        ) as auth,
        patch(
            "apps.users.presentation.dependencies.build_oracle_user_repository"
        ) as user,
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_branch_manager_for_username",
            return_value=False,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_access_admin_for_username",
            return_value=True,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.get_groups_for_username",
            return_value=["access_admins"],
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.resolve_django_user_by_username",
            return_value=MagicMock(is_superuser=False),
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.build_user_security_repository",
        ) as mock_security,
    ):
        mock_security.return_value.must_change_password.return_value = False
        auth.return_value.authenticate.return_value = True
        user.return_value = MagicMock()
        yield auth


def test_me_includes_access_fields(
    me_access_mocks: MagicMock,
    api_client: APIClient,
) -> None:
    login = api_client.post(
        "/api/users/login/",
        {"username": "access_admin", "password": "secret"},
        format="json",
    )
    assert login.status_code == status.HTTP_200_OK

    response = api_client.get("/api/users/me/")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["can_manage_access"] is True
    assert data["is_superuser"] is False
    assert data["must_change_password"] is False
    assert data["groups"] == ["access_admins"]
