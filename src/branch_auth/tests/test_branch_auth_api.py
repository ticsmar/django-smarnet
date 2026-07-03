"""API tests for branch_auth endpoints."""

import pytest
from django.contrib.auth.models import Group, User
from rest_framework import status
from rest_framework.test import APIClient

from branch_auth.infrastructure.models import AccessToken


@pytest.fixture
def branch_manager(db: None) -> User:
    user = User.objects.create_user(username="manager", password="pass")
    group, _ = Group.objects.get_or_create(name="branch_managers")
    user.groups.add(group)
    return user


@pytest.fixture
def regular_user(db: None) -> User:
    return User.objects.create_user(username="regular", password="pass")


@pytest.mark.django_db
def test_verify_token_invalid_returns_strict_contract(api_client: APIClient) -> None:
    response = api_client.post(
        "/api/branch-auth/verify-token/",
        {"token": "invalid", "device_uuid": "device-1"},
        format="json",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    data = response.json()
    assert data["valid"] is False
    assert data["message"] == "Token inválido."
    assert data["error"] == "Token inválido."
    assert data["machine"]["id"] == ""
    assert data["employer"]["email"] == ""


@pytest.mark.django_db
def test_verify_token_success_and_bind(
    api_client: APIClient, branch_manager: User
) -> None:
    _, raw_token = AccessToken.generate(owner=branch_manager, label="caixa")

    response = api_client.post(
        "/api/branch-auth/verify-token/",
        {"token": raw_token, "device_uuid": "device-abc"},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["valid"] is True
    assert data["machine"]["device_uuid"] == "device-abc"
    assert data["employer"]["id"] == str(branch_manager.id)


@pytest.mark.django_db
def test_manager_can_create_token(api_client: APIClient, branch_manager: User) -> None:
    api_client.force_authenticate(user=branch_manager)

    response = api_client.post(
        "/api/branch-auth/tokens/",
        {"label": "notebook"},
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert "token" in data
    assert data["label"] == "notebook"
    assert data["token_prefix"] == data["token"][:8]


@pytest.mark.django_db
def test_non_manager_denied(api_client: APIClient, regular_user: User) -> None:
    api_client.force_authenticate(user=regular_user)

    response = api_client.get("/api/branch-auth/tokens/")

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_manager_with_oracle_session_can_list_tokens(
    api_client: APIClient,
) -> None:
    from unittest.mock import MagicMock, patch

    django_user = User.objects.create_user(username="oracle_user", password="pass")
    group, _ = Group.objects.get_or_create(name="branch_managers")
    django_user.groups.add(group)

    mock_repo = MagicMock()
    mock_repo.authenticate.return_value = True
    with patch(
        "users.presentation.dependencies.build_oracle_auth_repository",
        return_value=mock_repo,
    ):
        login = api_client.post(
            "/api/users/login/",
            {"username": "oracle_user", "password": "secret"},
            format="json",
        )
        assert login.status_code == status.HTTP_200_OK
        assert login.json()["is_branch_manager"] is True

        response = api_client.get("/api/branch-auth/tokens/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


@pytest.mark.django_db
def test_superuser_with_oracle_session_can_list_tokens(
    api_client: APIClient,
) -> None:
    from unittest.mock import MagicMock, patch

    User.objects.create_superuser(username="luis.barros", password="pass")

    mock_repo = MagicMock()
    mock_repo.authenticate.return_value = True
    with patch(
        "users.presentation.dependencies.build_oracle_auth_repository",
        return_value=mock_repo,
    ):
        login = api_client.post(
            "/api/users/login/",
            {"username": "luis.barros", "password": "secret"},
            format="json",
        )
        assert login.status_code == status.HTTP_200_OK
        assert login.json()["is_branch_manager"] is True

        response = api_client.get("/api/branch-auth/tokens/")

    assert response.status_code == status.HTTP_200_OK
