"""Set direct product permissions for a user."""

from apps.users.application.dtos.admin_user_input_dto import (
    SetUserProductPermissionsInputDTO,
)
from apps.users.application.dtos.admin_user_output_dto import AdminUserOutputDTO
from apps.users.application.mappers.admin_user_mapper import to_admin_user_dto
from apps.users.domain.repositories.user_admin_repository import UserAdminRepository


class SetUserProductPermissionsUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: SetUserProductPermissionsInputDTO
    ) -> AdminUserOutputDTO:
        record = self._repository.set_user_product_permissions(
            input_dto.user_id,
            input_dto.permissions,
        )
        return to_admin_user_dto(record)
