"""API tests for authentication endpoints."""

from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient


@pytest.fixture
def mock_build() -> Generator[MagicMock]:
    target = "apps.users.presentation.dependencies.build_oracle_auth_repository"
    with patch(target) as mocked:
        yield mocked


@pytest.fixture
def mock_user_build() -> Generator[MagicMock]:
    target = "apps.users.presentation.dependencies.build_oracle_user_repository"
    with patch(target) as mocked:
        yield mocked


@pytest.fixture
def mock_auth_payload() -> Generator[None]:
    with (
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_branch_manager_for_username",
            return_value=False,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_access_admin_for_username",
            return_value=False,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.get_groups_for_username",
            return_value=[],
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.resolve_django_user_by_username",
            return_value=None,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.build_user_security_repository",
        ) as mock_security,
    ):
        mock_security.return_value.must_change_password.return_value = False
        yield


@pytest.fixture
def authenticated_client(
    api_client: APIClient,
    mock_build: MagicMock,
    mock_user_build: MagicMock,
    mock_auth_payload: None,
) -> APIClient:
    mock_auth_repo = MagicMock()
    mock_auth_repo.authenticate.return_value = True
    mock_build.return_value = mock_auth_repo
    mock_user_build.return_value = MagicMock()
    response = api_client.post(
        "/api/users/login/",
        {"username": "oracle_user", "password": "secret"},
        format="json",
    )
    assert response.status_code == 200
    return api_client


def test_login_success(
    mock_build: MagicMock,
    mock_user_build: MagicMock,
    mock_auth_payload: None,
    api_client: APIClient,
) -> None:
    mock_auth_repo = MagicMock()
    mock_auth_repo.authenticate.return_value = True
    mock_build.return_value = mock_auth_repo
    mock_user_build.return_value = MagicMock()

    response = api_client.post(
        "/api/users/login/",
        {"username": "oracle_user", "password": "secret"},
        format="json",
    )

    assert response.status_code == 200
    assert response.json() == {
        "username": "oracle_user",
        "is_branch_manager": False,
        "is_superuser": False,
        "can_manage_access": False,
        "must_change_password": False,
        "groups": [],
    }


def test_login_invalid_credentials(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_repo = MagicMock()
    mock_repo.authenticate.return_value = False
    mock_build.return_value = mock_repo

    response = api_client.post(
        "/api/users/login/",
        {"username": "bad", "password": "wrong"},
        format="json",
    )

    assert response.status_code == 401


def test_login_empty_credentials(api_client: APIClient) -> None:
    response = api_client.post(
        "/api/users/login/",
        {"username": "", "password": "secret"},
        format="json",
    )

    assert response.status_code == 400


def test_logout_success(authenticated_client: APIClient) -> None:
    response = authenticated_client.post("/api/users/logout/")

    assert response.status_code == 204


def test_logout_unauthenticated(api_client: APIClient) -> None:
    response = api_client.post("/api/users/logout/")

    assert response.status_code == 401


def test_me_authenticated(authenticated_client: APIClient) -> None:
    response = authenticated_client.get("/api/users/me/")

    assert response.status_code == 200
    assert response.json() == {
        "username": "oracle_user",
        "is_branch_manager": False,
        "is_superuser": False,
        "can_manage_access": False,
        "must_change_password": False,
        "groups": [],
    }


def test_me_unauthenticated(api_client: APIClient) -> None:
    response = api_client.get("/api/users/me/")

    assert response.status_code == 401


def test_register_forbidden_by_default(api_client: APIClient) -> None:
    response = api_client.post(
        "/api/users/register/",
        {"username": "new_user", "password": "secret"},
        format="json",
    )

    assert response.status_code == 403
    assert "Self-registration is not allowed" in response.json()["detail"]


def test_register_success_when_public_enabled(
    mock_user_build: MagicMock,
    mock_auth_payload: None,
    api_client: APIClient,
    settings,
) -> None:
    settings.ALLOW_PUBLIC_REGISTER = True
    mock_repo = MagicMock()
    mock_repo.user_exists.return_value = False
    mock_user_build.return_value = mock_repo

    response = api_client.post(
        "/api/users/register/",
        {"username": "new_user", "password": "secret"},
        format="json",
    )

    assert response.status_code == 201
    assert response.json() == {
        "username": "new_user",
        "is_branch_manager": False,
        "is_superuser": False,
        "can_manage_access": False,
        "must_change_password": False,
        "groups": [],
    }
    mock_repo.create_user.assert_called_once_with("new_user", "secret")


def test_register_user_exists_when_public_enabled(
    mock_user_build: MagicMock,
    api_client: APIClient,
    settings,
) -> None:
    settings.ALLOW_PUBLIC_REGISTER = True
    mock_repo = MagicMock()
    mock_repo.user_exists.return_value = True
    mock_user_build.return_value = mock_repo

    response = api_client.post(
        "/api/users/register/",
        {"username": "existing", "password": "secret"},
        format="json",
    )

    assert response.status_code == 409
    mock_repo.create_user.assert_not_called()


def test_register_empty_credentials_when_public_enabled(
    api_client: APIClient,
    settings,
) -> None:
    settings.ALLOW_PUBLIC_REGISTER = True
    response = api_client.post(
        "/api/users/register/",
        {"username": "", "password": "secret"},
        format="json",
    )

    assert response.status_code == 400
