"""Get fornecedor contato by code use case."""

from apps.purchasing.application.dtos.recebimento_dtos import FornecContatoOutputDTO
from apps.purchasing.application.mappers.recebimento_query_mapper import (
    to_fornec_contato_dto,
)
from apps.purchasing.domain.exceptions.recebimento_exceptions import (
    FornecContatoNotFoundError,
)
from apps.purchasing.domain.repositories.recebimento_query_repository import (
    RecebimentoQueryRepository,
)


class GetFornecContatoUseCase:
    def __init__(self, repository: RecebimentoQueryRepository) -> None:
        self._repository = repository

    def execute(self, cod_contato: int) -> FornecContatoOutputDTO:
        record = self._repository.get_fornec_contato(cod_contato)
        if record is None:
            raise FornecContatoNotFoundError(f"Contato '{cod_contato}' not found.")
        return to_fornec_contato_dto(record)
