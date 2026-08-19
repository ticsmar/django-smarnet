"""Lookup cliente by CPF/CNPJ digits (scoped by actor empresa)."""

from apps.administracao.application.dtos.cliente_dtos import (
    LookupClienteDocumentoInputDTO,
    LookupClienteDocumentoOutputDTO,
)
from apps.administracao.application.mappers.cliente_mapper import (
    to_copy_fields_dto,
    to_documento_match_dto,
)
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
)
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)


def _digits_only(value: str) -> str:
    return "".join(ch for ch in (value or "") if ch.isdigit())


class LookupClienteDocumentoUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: LookupClienteDocumentoInputDTO
    ) -> LookupClienteDocumentoOutputDTO:
        digits = _digits_only(input_dto.documento)
        if not digits:
            raise ClienteDocumentoInvalidError(
                "Informe CPF/CNPJ com pelo menos um dígito."
            )

        matches = self._repository.find_by_documento(
            actor_owner=input_dto.actor.owner_emp_codigo,
            digits=digits,
        )
        match_dtos = [to_documento_match_dto(match) for match in matches]

        copy_fields = None
        if matches:
            best = matches[0]
            record = self._repository.get_cliente(
                actor_owner=input_dto.actor.owner_emp_codigo,
                codigo=best.codigo,
            )
            if record is not None:
                copy_fields = to_copy_fields_dto(record)

        return LookupClienteDocumentoOutputDTO(
            matches=match_dtos,
            copy_fields=copy_fields,
        )
