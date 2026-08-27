"""Create a folder (PAR_TIPO=0) in PROP_ARQUIVO."""

from apps.files.application.dtos.arquivo_dtos import CreateFolderInputDTO
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoRepository,
    CreateFolderParams,
)
from apps.files.domain.services.arquivo_rules import (
    require_descricao,
    require_filtro,
    require_nome,
)


class CreateFolderUseCase:
    def __init__(self, repository: ArquivoRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: CreateFolderInputDTO) -> int:
        return self._repository.create_folder(
            CreateFolderParams(
                sistema=input_dto.sistema,
                filtro=require_filtro(input_dto.filtro),
                nome=require_nome(input_dto.nome),
                descricao=require_descricao(input_dto.descricao),
                par_codigo_pai=input_dto.par_codigo_pai,
                ace_codigo=input_dto.ace_codigo,
                usu_chapa=input_dto.usu_chapa,
            )
        )
