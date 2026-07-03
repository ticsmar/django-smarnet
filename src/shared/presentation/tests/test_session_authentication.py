"""Tests for Oracle session authentication."""

import pytest
from django.contrib.sessions.middleware import SessionMiddleware
from django.http import HttpRequest, HttpResponse
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from shared.presentation.auth.session_authentication import OracleSessionAuthentication
from shared.presentation.auth.session_keys import (
    SESSION_AUTHENTICATED,
    SESSION_ORACLE_USERNAME,
)
from shared.presentation.auth.session_user import OracleSessionUser


@pytest.fixture
def auth_backend() -> OracleSessionAuthentication:
    return OracleSessionAuthentication()


def _noop_response(request: HttpRequest) -> HttpResponse:
    return HttpResponse()


def _build_request() -> Request:
    factory = APIRequestFactory()
    django_request = factory.get("/")
    middleware = SessionMiddleware(_noop_response)
    middleware.process_request(django_request)
    django_request.session.save()
    return Request(django_request)


def test_authenticate_returns_user_for_valid_session(
    auth_backend: OracleSessionAuthentication,
) -> None:
    request = _build_request()
    request._request.session[SESSION_ORACLE_USERNAME] = "oracle_user"
    request._request.session[SESSION_AUTHENTICATED] = True

    result = auth_backend.authenticate(request)

    assert result is not None
    user, auth = result
    assert isinstance(user, OracleSessionUser)
    assert user.username == "oracle_user"
    assert auth is None


def test_authenticate_returns_none_for_empty_session(
    auth_backend: OracleSessionAuthentication,
) -> None:
    request = _build_request()

    assert auth_backend.authenticate(request) is None


def test_authenticate_returns_none_when_username_missing(
    auth_backend: OracleSessionAuthentication,
) -> None:
    request = _build_request()
    request._request.session[SESSION_AUTHENTICATED] = True

    assert auth_backend.authenticate(request) is None
