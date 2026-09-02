"""Clear a recado alarm (SP_GRAVA_FOLLOWUP op 3)."""

from apps.followup.application.dtos.recado_dtos import BaixaRecadoInputDTO
from apps.followup.domain.exceptions.followup_exceptions import RecadoNotFoundError
from apps.followup.domain.repositories.recado_repository import (
    RecadoQueryRepository,
    RecadoWriteRepository,
)
from apps.followup.domain.services.recado_rules import require_filtro, require_sistema


class BaixaRecadoUseCase:
    def __init__(
        self,
        write_repository: RecadoWriteRepository,
        query_repository: RecadoQueryRepository,
    ) -> None:
        self._write = write_repository
        self._query = query_repository

    def execute(self, input_dto: BaixaRecadoInputDTO) -> None:
        require_sistema(input_dto.sistema)
        filtro = require_filtro(input_dto.filtro)
        existing = self._query.get_recado(
            input_dto.pre_codigo,
            input_dto.sistema,
            filtro,
        )
        if existing is None:
            raise RecadoNotFoundError("Follow-up não encontrado.")
        tre_codigo = existing.tre_codigo or 0
        self._write.grava_followup(
            opcao=3,
            pre_codigo=input_dto.pre_codigo,
            filtro=filtro,
            tre_codigo=tre_codigo,
            mot_codigo=None,
            mensagem=" ",
            alarm="",
        )
