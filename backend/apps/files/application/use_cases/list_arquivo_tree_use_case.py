"""List the file-manager tree for a sistema + filtro pair."""

from apps.files.application.dtos.arquivo_dtos import (
    ArquivoNodeOutputDTO,
    ArquivoScopeDTO,
    ArquivoTreeOutputDTO,
)
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoNodeRecord,
    ArquivoQueryRepository,
)
from apps.files.domain.repositories.sistema_repository import SistemaRepository
from apps.files.domain.services.arquivo_rules import require_filtro
from apps.files.domain.services.sistema_catalog import DEFAULT_LIN_COD


def _node_dto(row: ArquivoNodeRecord) -> ArquivoNodeOutputDTO:
    return ArquivoNodeOutputDTO(
        par_codigo=row.par_codigo,
        par_codigo_pai=row.par_codigo_pai,
        tipo=row.tipo,
        nome=row.nome,
        descricao=row.descricao,
        tamanho=row.tamanho,
        data=row.data,
        ace_codigo=row.ace_codigo,
        pasta_fixa=row.pasta_fixa,
        in_lixeira=row.in_lixeira,
    )


class ListArquivoTreeUseCase:
    def __init__(
        self,
        query_repository: ArquivoQueryRepository,
        sistema_repository: SistemaRepository,
    ) -> None:
        self._query = query_repository
        self._sistemas = sistema_repository

    def execute(self, scope: ArquivoScopeDTO) -> ArquivoTreeOutputDTO:
        filtro = require_filtro(scope.filtro)
        sistema = self._sistemas.get_by_codigo(scope.sistema)
        nome = sistema.nome if sistema is not None else str(scope.sistema)
        lin_cod = scope.lin_cod or DEFAULT_LIN_COD
        nodes = self._query.list_nodes(scope.sistema, filtro, lin_cod)
        return ArquivoTreeOutputDTO(
            sistema=scope.sistema,
            filtro=filtro,
            root_label=f"{nome}: {filtro}",
            nodes=[_node_dto(row) for row in nodes],
        )
