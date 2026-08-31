"""List paises use case."""

from apps.purchasing.application.dtos.recebimento_dtos import (
    ListPaisesInputDTO,
    PaisOutputDTO,
)
from apps.purchasing.application.mappers.recebimento_query_mapper import to_pais_dto
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class ListPaisesUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: ListPaisesInputDTO) -> list[PaisOutputDTO]:
        records = self._repository.list_paises(search=input_dto.search)
        return [to_pais_dto(record) for record in records]
