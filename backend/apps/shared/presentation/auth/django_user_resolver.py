"""Resolve Django User from DRF request principals."""

from __future__ import annotations

from typing import TYPE_CHECKING

from django.contrib.auth.models import User

from apps.shared.presentation.auth.session_user import OracleSessionUser

if TYPE_CHECKING:
    from rest_framework.request import Request

BRANCH_MANAGERS_GROUP = "branch_managers"
ACCESS_ADMINS_GROUP = "access_admins"


def resolve_django_user_by_username(username: str) -> User | None:
    return User.objects.filter(username__iexact=username).first()


def resolve_django_user_from_request(request: Request) -> User | None:
    user = request.user
    if not user.is_authenticated:
        return None
    if isinstance(user, User):
        return user
    if isinstance(user, OracleSessionUser):
        return resolve_django_user_by_username(user.username)
    return None


def is_branch_manager_for_username(username: str) -> bool:
    django_user = resolve_django_user_by_username(username)
    return user_has_branch_manager_access(django_user)


def user_has_branch_manager_access(django_user: User | None) -> bool:
    if django_user is None:
        return False
    if django_user.is_superuser:
        return True
    return django_user.groups.filter(name=BRANCH_MANAGERS_GROUP).exists()


def user_has_access_admin_access(django_user: User | None) -> bool:
    if django_user is None:
        return False
    if django_user.is_superuser:
        return True
    return django_user.groups.filter(name=ACCESS_ADMINS_GROUP).exists()


def is_access_admin_for_username(username: str) -> bool:
    django_user = resolve_django_user_by_username(username)
    return user_has_access_admin_access(django_user)


def get_groups_for_username(username: str) -> list[str]:
    django_user = resolve_django_user_by_username(username)
    if django_user is None:
        return []
    return list(django_user.groups.values_list("name", flat=True))


def get_permissions_for_username(username: str) -> list[str]:
    """Return sorted Django permission strings (`app_label.codename`)."""
    django_user = resolve_django_user_by_username(username)
    if django_user is None:
        return []
    return sorted(django_user.get_all_permissions())
