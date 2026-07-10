"""List users use case."""

from apps.users.application.dtos.admin_user_input_dto import ListUsersInputDTO
from apps.users.application.dtos.admin_user_output_dto import PaginatedUsersOutputDTO
from apps.users.application.mappers.admin_user_mapper import to_paginated_users_dto
from apps.users.domain.repositories.user_admin_repository import UserAdminRepository


class ListUsersUseCase:
    def __init__(self, repository: UserAdminRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: ListUsersInputDTO) -> PaginatedUsersOutputDTO:
        page = max(input_dto.page, 1)
        page_size = min(max(input_dto.page_size, 1), 100)
        result = self._repository.list_users(
            search=input_dto.search,
            page=page,
            page_size=page_size,
        )
        return to_paginated_users_dto(result)
