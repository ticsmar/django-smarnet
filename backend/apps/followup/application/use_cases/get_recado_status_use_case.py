"""Alarm icon status for a host record."""

from apps.followup.application.dtos.recado_dtos import RecadoStatusOutputDTO
from apps.followup.domain.repositories.recado_repository import RecadoQueryRepository
from apps.followup.domain.services.recado_rules import require_filtro, require_sistema
from apps.followup.domain.services.sistema_catalog import SISTEMA_CLIENTE


class GetRecadoStatusUseCase:
    def __init__(self, repository: RecadoQueryRepository) -> None:
        self._repository = repository

    def execute(self, sistema: int, filtro: str) -> RecadoStatusOutputDTO:
        require_sistema(sistema)
        filtro = require_filtro(filtro)
        row = self._repository.status(sistema, filtro)
        has_legacy = False
        if sistema == SISTEMA_CLIENTE:
            notes = self._repository.get_cliente_notes(int(filtro))
            has_legacy = notes.has_notes
        return RecadoStatusOutputDTO(
            nivel=row.nivel,
            proximo_alarme=row.proximo_alarme,
            tre_descricao=row.tre_descricao,
            has_legacy_notes=has_legacy,
        )
