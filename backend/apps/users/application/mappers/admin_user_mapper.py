"""Map admin repository records to output DTOs."""

from apps.users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminProductPermissionOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)
from apps.users.domain.repositories.user_admin_repository import (
    AdminGroupRecord,
    AdminProductPermissionRecord,
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
        product_permissions=record.product_permissions,
        last_login=record.last_login,
        date_joined=record.date_joined,
        usu_chapa=record.usu_chapa,
        emp_codigo=record.emp_codigo,
        pes_numero=record.pes_numero,
        pais_nome=record.pais_nome,
        emp_nome=record.emp_nome,
        emp_endereco=record.emp_endereco,
        emp_bairro=record.emp_bairro,
        emp_cidade=record.emp_cidade,
        emp_estado=record.emp_estado,
        emp_cep=record.emp_cep,
        emp_pais_nome=record.emp_pais_nome,
        emp_homepage=record.emp_homepage,
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


def to_admin_product_permission_dto(
    record: AdminProductPermissionRecord,
) -> AdminProductPermissionOutputDTO:
    return AdminProductPermissionOutputDTO(
        value=record.value,
        app_label=record.app_label,
        model=record.model,
        codename=record.codename,
        name=record.name,
    )
