"""List recados scoped by PRE_SISTEMA + PRE_FILTRO."""

from datetime import datetime

from apps.followup.application.dtos.recado_dtos import (
    RecadoItemOutputDTO,
    RecadoListOutputDTO,
    RecadoScopeDTO,
)
from apps.followup.domain.repositories.recado_repository import RecadoQueryRepository
from apps.followup.domain.services.recado_rules import require_filtro, require_sistema


def _alarm_nivel(dt_alarm: datetime | None, dt_baixa: datetime | None) -> str:
    if dt_baixa is not None or dt_alarm is None:
        return "none"
    if dt_alarm >= datetime.now():
        return "future"
    return "overdue"


class ListRecadosUseCase:
    def __init__(self, repository: RecadoQueryRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: RecadoScopeDTO) -> RecadoListOutputDTO:
        sistema = require_sistema(input_dto.sistema)
        filtro = require_filtro(input_dto.filtro)
        rows = self._repository.list_recados(
            sistema,
            filtro,
            input_dto.tre_codigo,
        )
        items = [
            RecadoItemOutputDTO(
                pre_codigo=row.pre_codigo,
                tre_codigo=row.tre_codigo,
                tre_descricao=row.tre_descricao,
                tre_tipo_canc=row.tre_tipo_canc == 1,
                usu_chapa=row.usu_chapa,
                usu_nome=row.usu_nome,
                mensagem=row.pre_mensagem,
                pre_data=row.pre_data,
                pre_dt_alarm=row.pre_dt_alarm,
                pre_dt_baixa=row.pre_dt_baixa,
                mot_codigo=row.mot_codigo,
                mot_descricao=row.mot_descricao,
                can_edit=row.pre_dt_baixa is None
                and input_dto.usu_chapa > 0
                and row.usu_chapa == input_dto.usu_chapa,
                alarm_nivel=_alarm_nivel(row.pre_dt_alarm, row.pre_dt_baixa),
            )
            for row in rows
        ]
        return RecadoListOutputDTO(sistema=sistema, filtro=filtro, items=items)
