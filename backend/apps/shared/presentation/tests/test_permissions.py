"""Tests for Oracle session permission classes."""

import pytest
from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView

from apps.shared.presentation.auth.permissions import IsOracleAuthenticated
from apps.shared.presentation.auth.session_user import OracleSessionUser


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
