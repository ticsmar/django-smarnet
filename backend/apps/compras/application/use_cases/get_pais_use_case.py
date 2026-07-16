"""Get pais by code use case."""

from apps.compras.application.dtos.recebimento_dtos import PaisOutputDTO
from apps.compras.application.mappers.recebimento_query_mapper import to_pais_dto
from apps.compras.domain.exceptions.recebimento_exceptions import PaisNotFoundError
from apps.compras.domain.repositories.recebimento_query_repository import (
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
