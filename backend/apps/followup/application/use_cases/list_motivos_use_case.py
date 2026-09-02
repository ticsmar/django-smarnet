"""List MOTIVO for cancellation types."""

from apps.followup.application.dtos.recado_dtos import MotivoOutputDTO
from apps.followup.domain.repositories.recado_repository import RecadoQueryRepository


class ListMotivosUseCase:
    def __init__(self, repository: RecadoQueryRepository) -> None:
        self._repository = repository

    def execute(self, emp_codigo: int | None = None) -> list[MotivoOutputDTO]:
        return [
            MotivoOutputDTO(mot_codigo=row.mot_codigo, mot_descricao=row.mot_descricao)
            for row in self._repository.list_motivos(emp_codigo)
        ]
