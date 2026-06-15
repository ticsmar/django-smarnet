"""API tests for authentication endpoints."""

from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient


@pytest.fixture
def mock_build() -> Generator[MagicMock]:
    target = "users.presentation.dependencies.build_oracle_auth_repository"
    with patch(target) as mocked:
        yield mocked


@pytest.fixture
def mock_user_build() -> Generator[MagicMock]:
    target = "users.presentation.dependencies.build_oracle_user_repository"
    with patch(target) as mocked:
        yield mocked


@pytest.fixture
def authenticated_client(
    api_client: APIClient,
    mock_build: MagicMock,
) -> APIClient:
    mock_repo = MagicMock()
    mock_repo.authenticate.return_value = True
    mock_build.return_value = mock_repo
    response = api_client.post(
        "/api/users/login/",
        {"username": "oracle_user", "password": "secret"},
        format="json",
    )
    assert response.status_code == 200
    return api_client


def test_login_success(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_repo = MagicMock()
    mock_repo.authenticate.return_value = True
    mock_build.return_value = mock_repo

    response = api_client.post(
        "/api/users/login/",
        {"username": "oracle_user", "password": "secret"},
        format="json",
    )

    assert response.status_code == 200
    assert response.json() == {"username": "oracle_user"}


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
    assert response.json() == {"username": "oracle_user"}


def test_me_unauthenticated(api_client: APIClient) -> None:
    response = api_client.get("/api/users/me/")

    assert response.status_code == 401


def test_register_success(
    mock_user_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_repo = MagicMock()
    mock_repo.user_exists.return_value = False
    mock_user_build.return_value = mock_repo

    response = api_client.post(
        "/api/users/register/",
        {"username": "new_user", "password": "secret"},
        format="json",
    )

    assert response.status_code == 201
    assert response.json() == {"username": "new_user"}
    mock_repo.create_user.assert_called_once_with("new_user", "secret")


def test_register_user_exists(
    mock_user_build: MagicMock,
    api_client: APIClient,
) -> None:
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


def test_register_empty_credentials(api_client: APIClient) -> None:
    response = api_client.post(
        "/api/users/register/",
        {"username": "", "password": "secret"},
        format="json",
    )

    assert response.status_code == 400
