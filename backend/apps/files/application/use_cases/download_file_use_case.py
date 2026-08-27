"""Download a file BLOB scoped by sistema + filtro."""

from apps.files.application.dtos.arquivo_dtos import (
    DownloadFileInputDTO,
    DownloadFileOutputDTO,
)
from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoNotFoundError,
    ArquivoValidationError,
)
from apps.files.domain.repositories.arquivo_repository import ArquivoQueryRepository
from apps.files.domain.services.arquivo_rules import require_filtro
from apps.files.domain.services.sistema_catalog import PAR_TIPO_ARQUIVO


class DownloadFileUseCase:
    def __init__(self, query_repository: ArquivoQueryRepository) -> None:
        self._query = query_repository

    def execute(self, input_dto: DownloadFileInputDTO) -> DownloadFileOutputDTO:
        filtro = require_filtro(input_dto.filtro)
        blob = self._query.get_blob(input_dto.sistema, filtro, input_dto.par_codigo)
        if blob is None:
            raise ArquivoNotFoundError("Arquivo não encontrado neste repositório.")
        if blob.tipo != PAR_TIPO_ARQUIVO:
            raise ArquivoValidationError("Pastas não podem ser baixadas.")
        return DownloadFileOutputDTO(nome=blob.nome, content=blob.content)
