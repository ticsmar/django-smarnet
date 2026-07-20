"""Inactivate fornecedor via Oracle procedure."""

from apps.compras.domain.repositories.recebimento_repository import (
    RecebimentoRepository,
)


class InativaFornecedorUseCase:
    def __init__(self, repository: RecebimentoRepository) -> None:
        self._repository = repository

    def execute(self, cod_fornec: int) -> None:
        self._repository.inativa_fornecedor(cod_fornec)
