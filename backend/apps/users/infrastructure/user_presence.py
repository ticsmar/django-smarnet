"""Helpers to mark authenticated Django users as recently active."""

from datetime import timedelta

from django.contrib.auth.models import User
from django.utils import timezone

# Avoid rewriting last_login on every authenticated request.
_TOUCH_MIN_INTERVAL = timedelta(minutes=2)


def touch_user_presence(username: str, *, force: bool = False) -> None:
    """Update ``last_login`` so admin presence can use it as an online proxy."""
    normalized = username.strip()
    if not normalized:
        return

    user = (
        User.objects.filter(username__iexact=normalized)
        .only("id", "last_login")
        .first()
    )
    if user is None:
        return

    now = timezone.now()
    if (
        not force
        and user.last_login is not None
        and now - user.last_login < _TOUCH_MIN_INTERVAL
    ):
        return

    User.objects.filter(pk=user.pk).update(last_login=now)
