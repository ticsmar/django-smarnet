"""List msg_erro use case."""

from apps.compras.application.dtos.recebimento_dtos import (
    ListMsgErrosInputDTO,
    PaginatedMsgErrosOutputDTO,
)
from apps.compras.application.mappers.recebimento_query_mapper import (
    to_paginated_msg_erros_dto,
)
from apps.compras.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class ListMsgErrosUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: ListMsgErrosInputDTO) -> PaginatedMsgErrosOutputDTO:
        page = max(input_dto.page, 1)
        page_size = min(max(input_dto.page_size, 1), 100)
        result = self._repository.list_msg_erros(
            search=input_dto.search,
            page=page,
            page_size=page_size,
        )
        return to_paginated_msg_erros_dto(result)
