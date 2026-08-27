"""Get one file-manager system by codigo."""

from apps.files.application.dtos.sistema_dtos import SistemaOutputDTO
from apps.files.domain.exceptions.arquivo_exceptions import SistemaNotFoundError
from apps.files.domain.repositories.sistema_repository import SistemaRepository


class GetSistemaUseCase:
    def __init__(self, repository: SistemaRepository) -> None:
        self._repository = repository

    def execute(self, codigo: int) -> SistemaOutputDTO:
        row = self._repository.get_by_codigo(codigo)
        if row is None:
            raise SistemaNotFoundError(f"Sistema {codigo} não encontrado.")
        return SistemaOutputDTO(
            codigo=row.codigo,
            nome=row.nome,
            descricao=row.descricao,
            ativo=row.ativo,
        )
