"""Tests for Oracle session permission classes."""

from unittest.mock import MagicMock

import pytest
from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView

from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser


class _ViewWithPermissions(APIView):
    required_permissions: list[str] = []


@pytest.fixture
def permission() -> IsOracleAuthenticated:
    return IsOracleAuthenticated()


@pytest.fixture
def view() -> APIView:
    return APIView()


def test_permission_allows_authenticated_user(
    permission: IsOracleAuthenticated,
    view: APIView,
) -> None:
    factory = APIRequestFactory()
    django_request = factory.get("/")
    request = Request(django_request)
    request.user = OracleSessionUser(username="oracle_user")

    assert permission.has_permission(request, view) is True


def test_permission_raises_not_authenticated_for_anonymous_user(
    permission: IsOracleAuthenticated,
    view: APIView,
) -> None:
    factory = APIRequestFactory()
    django_request = factory.get("/")
    request = Request(django_request)
    request.user = object()

    with pytest.raises(NotAuthenticated, match=r"Not authenticated\."):
        permission.has_permission(request, view)


def test_has_django_permission_allows_superuser(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    django_user = MagicMock(is_superuser=True)
    monkeypatch.setattr(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        lambda _request: django_user,
    )
    factory = APIRequestFactory()
    request = Request(factory.get("/"))
    view = _ViewWithPermissions()
    view.required_permissions = ["compras_infrastructure.view_fornecedor"]

    assert HasDjangoPermission().has_permission(request, view) is True


def test_has_django_permission_checks_required_perm(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    django_user = MagicMock(is_superuser=False)
    django_user.has_perm.return_value = True
    monkeypatch.setattr(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        lambda _request: django_user,
    )
    factory = APIRequestFactory()
    request = Request(factory.get("/"))
    view = _ViewWithPermissions()
    view.required_permissions = ["compras_infrastructure.view_fornecedor"]

    assert HasDjangoPermission().has_permission(request, view) is True
    django_user.has_perm.assert_called_with("compras_infrastructure.view_fornecedor")


def test_has_django_permission_denies_missing_perm(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    django_user = MagicMock(is_superuser=False)
    django_user.has_perm.return_value = False
    monkeypatch.setattr(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        lambda _request: django_user,
    )
    factory = APIRequestFactory()
    request = Request(factory.get("/"))
    view = _ViewWithPermissions()
    view.required_permissions = ["compras_infrastructure.view_fornecedor"]

    assert HasDjangoPermission().has_permission(request, view) is False
