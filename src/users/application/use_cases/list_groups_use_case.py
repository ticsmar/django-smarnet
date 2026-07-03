"""List groups use case."""

from users.application.dtos.admin_user_output_dto import AdminGroupOutputDTO
from users.application.mappers.admin_user_mapper import to_admin_group_dto
from users.domain.repositories.user_admin_repository import UserAdminRepository


class ListGroupsUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self) -> list[AdminGroupOutputDTO]:
        return [to_admin_group_dto(record) for record in self._repository.list_groups()]
