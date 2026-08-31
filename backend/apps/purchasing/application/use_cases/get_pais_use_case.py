"""Get pais by code use case."""

from apps.purchasing.application.dtos.recebimento_dtos import PaisOutputDTO
from apps.purchasing.application.mappers.recebimento_query_mapper import to_pais_dto
from apps.purchasing.domain.exceptions.recebimento_exceptions import PaisNotFoundError
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class GetPaisUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(self, pai_codigo: int) -> PaisOutputDTO:
        record = self._repository.get_pais(pai_codigo)
        if record is None:
            raise PaisNotFoundError(f"Pais '{pai_codigo}' not found.")
        return to_pais_dto(record)
