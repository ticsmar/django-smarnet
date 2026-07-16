"""Activate fornecedor via Oracle procedure."""

from apps.compras.domain.repositories.recebimento_repository import RecebimentoRepository


class AtivaFornecedorUseCase:
    def __init__(self, repository: RecebimentoRepository) -> None:
        self._repository = repository

    def execute(self, cod_fornec: int) -> None:
        self._repository.ativa_fornecedor(cod_fornec)
