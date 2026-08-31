"""List fornecedor contatos use case."""

from apps.purchasing.application.dtos.recebimento_dtos import (
    ListFornecContatosInputDTO,
    PaginatedFornecContatosOutputDTO,
)
from apps.purchasing.application.mappers.recebimento_query_mapper import (
    to_paginated_fornec_contatos_dto,
)
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class ListFornecContatosUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ListFornecContatosInputDTO
    ) -> PaginatedFornecContatosOutputDTO:
        page = max(input_dto.page, 1)
        page_size = min(max(input_dto.page_size, 1), 100)
        result = self._repository.list_fornec_contatos(
            for_codigo=input_dto.for_codigo,
            search=input_dto.search,
            page=page,
            page_size=page_size,
        )
        return to_paginated_fornec_contatos_dto(result)
