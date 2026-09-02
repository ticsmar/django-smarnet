"""Read and append FOLLOW_CLIENTE notes."""

from apps.followup.application.dtos.recado_dtos import (
    AppendClienteNotesInputDTO,
    ClienteNotesOutputDTO,
)
from apps.followup.domain.exceptions.followup_exceptions import RecadoValidationError
from apps.followup.domain.repositories.recado_repository import (
    RecadoQueryRepository,
    RecadoWriteRepository,
)


class GetClienteNotesUseCase:
    def __init__(self, repository: RecadoQueryRepository) -> None:
        self._repository = repository

    def execute(self, codigo: int) -> ClienteNotesOutputDTO:
        if codigo < 1:
            raise RecadoValidationError("Código do cliente é obrigatório.")
        row = self._repository.get_cliente_notes(codigo)
        return ClienteNotesOutputDTO(
            codigo=row.codigo,
            descricao=row.descricao,
            has_notes=row.has_notes,
        )


class AppendClienteNotesUseCase:
    def __init__(self, repository: RecadoWriteRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: AppendClienteNotesInputDTO) -> None:
        if input_dto.codigo < 1:
            raise RecadoValidationError("Código do cliente é obrigatório.")
        texto = input_dto.texto.strip()
        if not texto:
            raise RecadoValidationError("Texto da nota é obrigatório.")
        if input_dto.usu_chapa < 1:
            raise RecadoValidationError("Usuário Oracle (chapa) não encontrado.")
        self._repository.append_cliente_notes(
            input_dto.usu_chapa, input_dto.codigo, texto
        )
