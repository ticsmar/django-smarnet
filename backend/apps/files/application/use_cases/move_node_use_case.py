"""Move a folder or file (PAR_CODIGO_PAI / nome)."""

from apps.files.application.dtos.arquivo_dtos import MoveNodeInputDTO
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoRepository,
    MoveNodeParams,
)
from apps.files.domain.services.arquivo_rules import require_filtro, require_nome


class MoveNodeUseCase:
    def __init__(self, repository: ArquivoRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: MoveNodeInputDTO) -> None:
        nome = require_nome(input_dto.nome) if input_dto.nome else None
        self._repository.move_node(
            MoveNodeParams(
                sistema=input_dto.sistema,
                filtro=require_filtro(input_dto.filtro),
                par_codigo=input_dto.par_codigo,
                par_codigo_pai=input_dto.par_codigo_pai,
                nome=nome,
                usu_chapa=input_dto.usu_chapa,
            )
        )
