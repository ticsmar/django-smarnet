"""Upload a file BLOB (PAR_TIPO=1) into PROP_ARQUIVO."""

from apps.files.application.dtos.arquivo_dtos import UploadFileInputDTO
from apps.files.domain.exceptions.arquivo_exceptions import ArquivoValidationError
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoRepository,
    CreateFileParams,
)
from apps.files.domain.services.arquivo_rules import (
    require_descricao,
    require_filtro,
    require_nome,
)


class UploadFileUseCase:
    def __init__(self, repository: ArquivoRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: UploadFileInputDTO) -> int:
        if not input_dto.content:
            raise ArquivoValidationError("Arquivo vazio.")
        return self._repository.create_file(
            CreateFileParams(
                sistema=input_dto.sistema,
                filtro=require_filtro(input_dto.filtro),
                nome=require_nome(input_dto.nome),
                descricao=require_descricao(input_dto.descricao),
                par_codigo_pai=input_dto.par_codigo_pai,
                ace_codigo=input_dto.ace_codigo,
                usu_chapa=input_dto.usu_chapa,
                content=input_dto.content,
                tamanho=input_dto.tamanho,
            )
        )
