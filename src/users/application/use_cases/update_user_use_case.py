"""Update user use case."""

from users.application.dtos.admin_user_input_dto import UpdateUserInputDTO
from users.application.dtos.admin_user_output_dto import AdminUserOutputDTO
from users.application.mappers.admin_user_mapper import to_admin_user_dto
from users.domain.repositories.user_admin_repository import (
    AdminUserUpdate,
    UserAdminRepository,
)


class UpdateUserUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: UpdateUserInputDTO) -> AdminUserOutputDTO:
        record = self._repository.update_user(
            input_dto.user_id,
            AdminUserUpdate(
                email=input_dto.email,
                first_name=input_dto.first_name,
                last_name=input_dto.last_name,
                is_active=input_dto.is_active,
                is_superuser=input_dto.is_superuser,
            ),
        )
        return to_admin_user_dto(record)
