"""List clientes use case."""

from apps.administracao.application.dtos.cliente_dtos import (
    ListClientesInputDTO,
    PaginatedClientesOutputDTO,
)
from apps.administracao.application.mappers.cliente_mapper import to_paginated_dto
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)


class ListClientesUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: ListClientesInputDTO) -> PaginatedClientesOutputDTO:
        page = max(input_dto.page, 1)
        page_size = min(max(input_dto.page_size, 1), 100)
        result = self._repository.list_clientes(
            actor_owner=input_dto.actor.owner_emp_codigo,
            search=input_dto.search.strip(),
            page=page,
            page_size=page_size,
        )
        return to_paginated_dto(
            result,
            actor_link_emp=input_dto.actor.link_emp_codigo,
        )
