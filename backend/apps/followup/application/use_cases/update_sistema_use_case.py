"""Update a follow-up system without changing codigo."""

from apps.followup.application.dtos.sistema_dtos import (
    SistemaOutputDTO,
    UpdateSistemaInputDTO,
)
from apps.followup.domain.exceptions.followup_exceptions import (
    RecadoValidationError,
    SistemaNotFoundError,
)
from apps.followup.domain.repositories.sistema_repository import SistemaRepository


class UpdateSistemaUseCase:
    def __init__(self, repository: SistemaRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: UpdateSistemaInputDTO) -> SistemaOutputDTO:
        existing = self._repository.get_by_codigo(input_dto.codigo)
        if existing is None:
            raise SistemaNotFoundError(f"Sistema {input_dto.codigo} não encontrado.")
        nome = input_dto.nome.strip()
        if not nome:
            raise RecadoValidationError("Nome do sistema é obrigatório.")
        row = self._repository.update(
            codigo=input_dto.codigo,
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
