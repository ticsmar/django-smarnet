"""Create a follow-up system. New codes start at 300 if omitted."""

from apps.followup.application.dtos.sistema_dtos import (
    CreateSistemaInputDTO,
    SistemaOutputDTO,
)
from apps.followup.domain.exceptions.followup_exceptions import (
    RecadoValidationError,
    SistemaCodigoConflictError,
)
from apps.followup.domain.repositories.sistema_repository import SistemaRepository
from apps.followup.domain.services.sistema_catalog import MIN_CUSTOM_CODIGO


def _next_codigo(repository: SistemaRepository) -> int:
    return max(MIN_CUSTOM_CODIGO - 1, repository.max_codigo()) + 1


class CreateSistemaUseCase:
    def __init__(self, repository: SistemaRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: CreateSistemaInputDTO) -> SistemaOutputDTO:
        nome = input_dto.nome.strip()
        if not nome:
            raise RecadoValidationError("Nome do sistema é obrigatório.")
        codigo = input_dto.codigo
        if codigo is None:
            codigo = _next_codigo(self._repository)
        elif self._repository.exists_codigo(codigo):
            raise SistemaCodigoConflictError(f"Já existe sistema com código {codigo}.")
        row = self._repository.create(
            codigo=codigo,
            nome=nome,
            descricao=input_dto.descricao.strip(),
            ativo=input_dto.ativo,
        )
        return SistemaOutputDTO(
            codigo=row.codigo,
            nome=row.nome,
            descricao=row.descricao,
            ativo=row.ativo,
        )
