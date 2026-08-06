"""Tests for syncing Django auth session with ERP login (App Admin)."""

import pytest
from django.contrib.auth import SESSION_KEY, get_user
from django.contrib.auth.models import User
from django.contrib.sessions.backends.db import SessionStore
from django.test import RequestFactory

from apps.users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)


@pytest.mark.django_db
def test_create_session_logs_into_django_auth_user() -> None:
    user = User.objects.create_user(username="juliano", password="secret")
    request = RequestFactory().post("/api/users/login/")
    session = SessionStore()
    session.create()
    request.session = session

    store = DjangoAuthSessionStore(request.session, request=request)
    store.create_session("juliano")

    assert store.get_username() == "juliano"
    assert store.is_authenticated()
    assert request.session.get(SESSION_KEY) == str(user.pk)
    assert get_user(request).username == "juliano"


@pytest.mark.django_db
def test_clear_session_logs_out_django_auth_user() -> None:
    user = User.objects.create_user(username="juliano", password="secret")
    request = RequestFactory().post("/api/users/logout/")
    session = SessionStore()
    session.create()
    request.session = session

    store = DjangoAuthSessionStore(request.session, request=request)
    store.create_session(user.username)
    store.clear_session()

    assert not store.is_authenticated()
    assert store.get_username() is None
    assert get_user(request).is_anonymous
