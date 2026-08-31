"""Send selected nodes to the trash (PAR_LIXEIRA = SYSDATE)."""

from apps.files.application.dtos.arquivo_dtos import TrashNodesInputDTO
from apps.files.domain.exceptions.arquivo_exceptions import ArquivoValidationError
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoRepository,
    TrashNodesParams,
)
from apps.files.domain.services.arquivo_rules import require_filtro


class TrashNodesUseCase:
    def __init__(self, repository: ArquivoRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: TrashNodesInputDTO) -> None:
        if not input_dto.par_codigos:
            raise ArquivoValidationError("Selecione ao menos um item.")
        self._repository.trash_nodes(
            TrashNodesParams(
                sistema=input_dto.sistema,
                filtro=require_filtro(input_dto.filtro),
                par_codigos=input_dto.par_codigos,
                usu_chapa=input_dto.usu_chapa,
            )
        )
