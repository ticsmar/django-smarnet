"""List TIPO_RECADO for a PRE_SISTEMA."""

from apps.followup.application.dtos.recado_dtos import TipoRecadoOutputDTO
from apps.followup.domain.repositories.recado_repository import RecadoQueryRepository
from apps.followup.domain.services.recado_rules import require_sistema
from apps.followup.domain.services.sistema_catalog import TRE_CODIGO_OUTROS


class ListTiposUseCase:
    def __init__(self, repository: RecadoQueryRepository) -> None:
        self._repository = repository

    def execute(self, sistema: int) -> list[TipoRecadoOutputDTO]:
        require_sistema(sistema)
        rows = self._repository.list_tipos(sistema)
        if not rows:
            fallback = self._repository.get_tipo(TRE_CODIGO_OUTROS)
            rows = [fallback] if fallback is not None else []
        return [
            TipoRecadoOutputDTO(
                tre_codigo=row.tre_codigo,
                tre_descricao=row.tre_descricao,
                tre_tipo_canc=row.tre_tipo_canc == 1,
            )
            for row in rows
        ]
