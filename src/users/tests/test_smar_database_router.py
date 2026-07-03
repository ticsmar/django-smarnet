"""Tests for SMAR database routing."""

import pytest
from django.contrib.auth.models import User
from django.db import models

from users.infrastructure.db_router import SmarDatabaseRouter


class SampleModel(models.Model):
    class Meta:
        app_label = "users_presentation"


def test_router_uses_default_when_unauthenticated() -> None:
    router = SmarDatabaseRouter()

    assert router.db_for_read(SampleModel) == "default"
    assert router.db_for_write(SampleModel) == "default"


def test_router_uses_smar_when_authenticated(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        "users.infrastructure.db_router.get_use_smar",
        lambda: True,
    )
    router = SmarDatabaseRouter()

    assert router.db_for_read(SampleModel) == "smar"
    assert router.db_for_write(SampleModel) == "smar"


def test_router_keeps_auth_models_on_default_when_authenticated(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "users.infrastructure.db_router.get_use_smar",
        lambda: True,
    )
    router = SmarDatabaseRouter()

    assert router.db_for_read(User) == "default"
    assert router.db_for_write(User) == "default"


def test_router_keeps_branch_auth_on_default_when_authenticated(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from branch_auth.infrastructure.models import AccessToken

    monkeypatch.setattr(
        "users.infrastructure.db_router.get_use_smar",
        lambda: True,
    )
    router = SmarDatabaseRouter()

    assert router.db_for_read(AccessToken) == "default"
    assert router.db_for_write(AccessToken) == "default"
