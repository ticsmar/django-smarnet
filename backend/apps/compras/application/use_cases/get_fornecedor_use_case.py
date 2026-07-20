"""Get fornecedor by code use case."""

from apps.compras.application.dtos.recebimento_dtos import FornecedorOutputDTO
from apps.compras.application.mappers.recebimento_query_mapper import to_fornecedor_dto
from apps.compras.domain.exceptions.recebimento_exceptions import (
    FornecedorNotFoundError,
)
from apps.compras.domain.repositories.recebimento_query_repository import (
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
