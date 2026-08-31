"""Get fornecedor by code use case."""

from apps.purchasing.application.dtos.recebimento_dtos import FornecedorOutputDTO
from apps.purchasing.application.mappers.recebimento_query_mapper import (
    to_fornecedor_dto,
)
from apps.purchasing.domain.exceptions.recebimento_exceptions import (
    FornecedorNotFoundError,
)
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class GetFornecedorUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(self, cod_fornec: int) -> FornecedorOutputDTO:
        record = self._repository.get_fornecedor(cod_fornec)
        if record is None:
            raise FornecedorNotFoundError(f"Fornecedor '{cod_fornec}' not found.")
        return to_fornecedor_dto(record)
