"""Delete fornecedor contato via Oracle procedure."""

from apps.compras.domain.repositories.recebimento_repository import (
    RecebimentoRepository,
)


class ExcluiFornecContatoUseCase:
    def __init__(self, repository: RecebimentoRepository) -> None:
        self._repository = repository

    def execute(self, cod_contato: int) -> None:
        self._repository.exclui_fornec_contato(cod_contato)
