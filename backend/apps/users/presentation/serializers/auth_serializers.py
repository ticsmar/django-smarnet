"""Authentication serializers."""

from rest_framework import serializers

from apps.shared.presentation.auth.django_user_resolver import (
    get_groups_for_username,
    is_access_admin_for_username,
    is_branch_manager_for_username,
    resolve_django_user_by_username,
)
from apps.users.infrastructure.repositories.user_security_repository_impl import (
    build_user_security_repository,
)


class LoginRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class RegisterRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class AuthenticatedUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    is_branch_manager = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    can_manage_access = serializers.BooleanField()
    must_change_password = serializers.BooleanField()
    groups = serializers.ListField(child=serializers.CharField())


class ChangePasswordRequestSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=False, allow_blank=True)
    new_password = serializers.CharField()


def build_authenticated_user_payload(
    username: str,
) -> dict[str, str | bool | list[str]]:
    django_user = resolve_django_user_by_username(username)
    return {
        "username": username,
        "is_branch_manager": is_branch_manager_for_username(username),
        "is_superuser": django_user.is_superuser if django_user else False,
        "can_manage_access": is_access_admin_for_username(username),
        "must_change_password": build_user_security_repository().must_change_password(
            username
        ),
        "groups": get_groups_for_username(username),
    }
