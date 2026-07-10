"""User security profile repository implementation."""

from django.contrib.auth import authenticate as django_authenticate
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string

from apps.users.domain.exceptions.admin_exceptions import UserNotFoundError
from apps.users.infrastructure.models import UserSecurityProfile


def _get_user(user_id: int) -> User:
    user = User.objects.filter(pk=user_id).first()
    if user is None:
        raise UserNotFoundError(f"User '{user_id}' not found.")
    return user


def _get_user_by_username(username: str) -> User | None:
    return User.objects.filter(username__iexact=username).first()


def _ensure_profile(user: User) -> UserSecurityProfile:
    profile, _ = UserSecurityProfile.objects.get_or_create(user=user)
    return profile


class UserSecurityRepositoryImpl:
    def must_change_password(self, username: str) -> bool:
        user = _get_user_by_username(username)
        if user is None:
            return False
        profile = getattr(user, "security_profile", None)
        if profile is None:
            return False
        return profile.must_change_password

    def set_must_change_password(self, username: str, required: bool) -> None:
        user = _get_user_by_username(username)
        if user is None:
            return
        profile = _ensure_profile(user)
        profile.must_change_password = required
        profile.save(update_fields=["must_change_password"])

    def verify_password(self, username: str, password: str) -> bool:
        return django_authenticate(username=username, password=password) is not None

    def change_password(self, username: str, new_password: str) -> None:
        user = _get_user_by_username(username)
        if user is None:
            raise UserNotFoundError(f"User '{username}' not found.")
        user.set_password(new_password)
        user.save(update_fields=["password"])
        profile = _ensure_profile(user)
        profile.must_change_password = False
        profile.save(update_fields=["must_change_password"])

    def reset_password(self, user_id: int, password: str | None = None) -> str:
        user = _get_user(user_id)
        temporary_password = password or get_random_string(12)
        user.set_password(temporary_password)
        user.save(update_fields=["password"])
        profile = _ensure_profile(user)
        profile.must_change_password = True
        profile.save(update_fields=["must_change_password"])
        return temporary_password


def build_user_security_repository() -> UserSecurityRepositoryImpl:
    return UserSecurityRepositoryImpl()
