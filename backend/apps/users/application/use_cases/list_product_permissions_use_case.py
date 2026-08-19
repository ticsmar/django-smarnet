"""List product permissions use case."""

from apps.users.application.dtos.admin_user_output_dto import (
    AdminProductPermissionOutputDTO,
)
from apps.users.application.mappers.admin_user_mapper import (
    to_admin_product_permission_dto,
)
from apps.users.domain.repositories.user_admin_repository import UserAdminRepository


class ListProductPermissionsUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self) -> list[AdminProductPermissionOutputDTO]:
        return [
            to_admin_product_permission_dto(record)
            for record in self._repository.list_product_permissions()
        ]
