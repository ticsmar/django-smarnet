"""List PROP_ARQ_LOG for a sistema + filtro pair."""

from apps.files.application.dtos.arquivo_dtos import (
    ArquivoScopeDTO,
    HistoricoItemOutputDTO,
)
from apps.files.domain.repositories.arquivo_repository import ArquivoQueryRepository
from apps.files.domain.services.arquivo_rules import require_filtro


class ListHistoricoUseCase:
    def __init__(self, query_repository: ArquivoQueryRepository) -> None:
        self._query = query_repository

    def execute(self, scope: ArquivoScopeDTO) -> list[HistoricoItemOutputDTO]:
        filtro = require_filtro(scope.filtro)
        rows = self._query.list_historico(scope.sistema, filtro)
        return [
            HistoricoItemOutputDTO(
                usuario_nome=row.usuario_nome,
                acao=row.acao,
                nome=row.nome,
                data=row.data,
            )
            for row in rows
        ]
