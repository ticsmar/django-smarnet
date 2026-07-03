"""Admin API serializers."""

from rest_framework import serializers

from users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)


class AdminGroupSerializer(serializers.Serializer):
    name = serializers.CharField()


class AdminUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField(allow_blank=True)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    is_active = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    groups = serializers.ListField(child=serializers.CharField())
    last_login = serializers.DateTimeField(allow_null=True)
    date_joined = serializers.DateTimeField()


class PaginatedUsersSerializer(serializers.Serializer):
    items = AdminUserSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class CreateAdminUserRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField(required=False, allow_blank=True, default="")
    groups = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list,
    )
    require_password_change = serializers.BooleanField(required=False, default=True)


class UpdateAdminUserRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    is_active = serializers.BooleanField(required=False)
    is_superuser = serializers.BooleanField(required=False)


class SetUserGroupsRequestSerializer(serializers.Serializer):
    groups = serializers.ListField(child=serializers.CharField())


class SetUserPasswordRequestSerializer(serializers.Serializer):
    password = serializers.CharField(required=False, allow_blank=True)


class ResetPasswordResponseSerializer(serializers.Serializer):
    temporary_password = serializers.CharField()


def serialize_admin_user(dto: AdminUserOutputDTO) -> dict[str, object]:
    return AdminUserSerializer(
        {
            "id": dto.id,
            "username": dto.username,
            "email": dto.email,
            "first_name": dto.first_name,
            "last_name": dto.last_name,
            "is_active": dto.is_active,
            "is_superuser": dto.is_superuser,
            "groups": dto.groups,
            "last_login": dto.last_login,
            "date_joined": dto.date_joined,
        }
    ).data


def serialize_paginated_users(dto: PaginatedUsersOutputDTO) -> dict[str, object]:
    return PaginatedUsersSerializer(
        {
            "items": [serialize_admin_user(item) for item in dto.items],
            "total": dto.total,
            "page": dto.page,
            "page_size": dto.page_size,
        }
    ).data


def serialize_groups(groups: list[AdminGroupOutputDTO]) -> list[dict[str, str]]:
    return AdminGroupSerializer(
        [{"name": group.name} for group in groups], many=True
    ).data
