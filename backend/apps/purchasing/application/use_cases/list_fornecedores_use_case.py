"""List fornecedores use case."""

from apps.purchasing.application.dtos.recebimento_dtos import (
    ListFornecedoresInputDTO,
    PaginatedFornecedoresOutputDTO,
)
from apps.purchasing.application.mappers.recebimento_query_mapper import (
    to_paginated_fornecedores_dto,
)
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class ListFornecedoresUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ListFornecedoresInputDTO
    ) -> PaginatedFornecedoresOutputDTO:
        page = max(input_dto.page, 1)
        page_size = min(max(input_dto.page_size, 1), 100)
        result = self._repository.list_fornecedores(
            search=input_dto.search,
            ativo=input_dto.ativo,
            page=page,
            page_size=page_size,
        )
        return to_paginated_fornecedores_dto(result)
