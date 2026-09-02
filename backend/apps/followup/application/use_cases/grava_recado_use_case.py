"""Create or update a recado via SP_GRAVA_FOLLOWUP."""

from apps.followup.application.dtos.recado_dtos import GravaRecadoInputDTO
from apps.followup.domain.exceptions.followup_exceptions import (
    RecadoForbiddenError,
    RecadoNotFoundError,
    RecadoValidationError,
)
from apps.followup.domain.repositories.recado_repository import (
    RecadoQueryRepository,
    RecadoWriteRepository,
)
from apps.followup.domain.services.recado_rules import (
    html_mensagem,
    require_filtro,
    require_sistema,
    require_tre_codigo,
)


def _alarm_bind(data: str, hora: str) -> str:
    day = data.strip()
    if not day:
        return ""
    clock = hora.strip() or "08:00"
    return f"{day} {clock}"


class GravaRecadoUseCase:
    def __init__(
        self,
        write_repository: RecadoWriteRepository,
        query_repository: RecadoQueryRepository,
    ) -> None:
        self._write = write_repository
        self._query = query_repository

    def execute(self, input_dto: GravaRecadoInputDTO) -> None:
        require_sistema(input_dto.sistema)
        filtro = require_filtro(input_dto.filtro)
        tre_codigo = require_tre_codigo(input_dto.tre_codigo)
        mensagem = html_mensagem(input_dto.mensagem)
        tipo = self._query.get_tipo(tre_codigo)
        if tipo is None:
            raise RecadoValidationError("Referência inválida ou inativa.")
        mot_codigo = input_dto.mot_codigo
        if tipo.tre_tipo_canc == 1 and (mot_codigo is None or mot_codigo < 1):
            raise RecadoValidationError("Selecione um motivo.")
        if tipo.tre_tipo_canc != 1:
            mot_codigo = None

        pre_codigo = input_dto.pre_codigo
        if pre_codigo:
            existing = self._query.get_recado(
                pre_codigo,
                input_dto.sistema,
                filtro,
            )
            if existing is None:
                raise RecadoNotFoundError("Follow-up não encontrado.")
            if existing.usu_chapa != input_dto.usu_chapa:
                raise RecadoForbiddenError("Só o autor pode alterar este follow-up.")
            opcao = 2
        else:
            opcao = 1
            pre_codigo = None

        self._write.grava_followup(
            opcao=opcao,
            pre_codigo=pre_codigo,
            filtro=filtro,
            tre_codigo=tre_codigo,
            mot_codigo=mot_codigo,
            mensagem=mensagem,
            alarm=_alarm_bind(input_dto.alarm_data, input_dto.alarm_hora),
        )
