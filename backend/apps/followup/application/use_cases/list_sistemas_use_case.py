"""List follow-up systems from the native catalog."""

from apps.followup.application.dtos.sistema_dtos import SistemaOutputDTO
from apps.followup.domain.repositories.sistema_repository import SistemaRepository


class ListSistemasUseCase:
    def __init__(self, repository: SistemaRepository) -> None:
        self._repository = repository

    def execute(self) -> list[SistemaOutputDTO]:
        return [
            SistemaOutputDTO(
                codigo=row.codigo,
                nome=row.nome,
                descricao=row.descricao,
                ativo=row.ativo,
            )
            for row in self._repository.list_all()
        ]
