"""Get user use case."""

from users.application.dtos.admin_user_output_dto import AdminUserOutputDTO
from users.application.mappers.admin_user_mapper import to_admin_user_dto
from users.domain.repositories.user_admin_repository import UserAdminRepository


class GetUserUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self, user_id: int) -> AdminUserOutputDTO:
        return to_admin_user_dto(self._repository.get_user(user_id))
