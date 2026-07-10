"""Map admin repository records to output DTOs."""

from apps.users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)
from apps.users.domain.repositories.user_admin_repository import (
    AdminGroupRecord,
    AdminUserRecord,
    PaginatedUsersResult,
)


def to_admin_user_dto(record: AdminUserRecord) -> AdminUserOutputDTO:
    return AdminUserOutputDTO(
        id=record.id,
        username=record.username,
        email=record.email,
        first_name=record.first_name,
        last_name=record.last_name,
        is_active=record.is_active,
        is_superuser=record.is_superuser,
        groups=record.groups,
        last_login=record.last_login,
        date_joined=record.date_joined,
    )


def to_paginated_users_dto(result: PaginatedUsersResult) -> PaginatedUsersOutputDTO:
    return PaginatedUsersOutputDTO(
        items=[to_admin_user_dto(item) for item in result.items],
        total=result.total,
        page=result.page,
        page_size=result.page_size,
    )


def to_admin_group_dto(record: AdminGroupRecord) -> AdminGroupOutputDTO:
    return AdminGroupOutputDTO(name=record.name)
