"""Tests for presence helper based on Django last_login."""

from datetime import timedelta

import pytest
from django.contrib.auth.models import User
from django.utils import timezone

from apps.users.infrastructure.user_presence import touch_user_presence


@pytest.mark.django_db
def test_touch_user_presence_sets_last_login() -> None:
    user = User.objects.create_user(username="online_user", password="secret")
    assert user.last_login is None

    touch_user_presence("online_user", force=True)

    user.refresh_from_db()
    assert user.last_login is not None


@pytest.mark.django_db
def test_touch_user_presence_respects_throttle() -> None:
    recent = timezone.now() - timedelta(seconds=30)
    user = User.objects.create_user(username="online_user", password="secret")
    User.objects.filter(pk=user.pk).update(last_login=recent)

    touch_user_presence("online_user")

    user.refresh_from_db()
    assert user.last_login is not None
    assert abs((user.last_login - recent).total_seconds()) < 1
