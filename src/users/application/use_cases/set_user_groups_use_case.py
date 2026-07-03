"""Set user groups use case."""

from users.application.dtos.admin_user_input_dto import SetUserGroupsInputDTO
from users.application.dtos.admin_user_output_dto import AdminUserOutputDTO
from users.application.mappers.admin_user_mapper import to_admin_user_dto
from users.domain.repositories.user_admin_repository import UserAdminRepository


class SetUserGroupsUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: SetUserGroupsInputDTO) -> AdminUserOutputDTO:
        record = self._repository.set_user_groups(
            input_dto.user_id,
            input_dto.groups,
        )
        return to_admin_user_dto(record)
