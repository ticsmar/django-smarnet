"""Get cliente by codigo use case (scoped by actor empresa)."""

from apps.administracao.application.dtos.cliente_dtos import (
    ClienteDetailOutputDTO,
    GetClienteInputDTO,
)
from apps.administracao.application.mappers.cliente_mapper import to_detail_dto
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteNotFoundError,
)
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)


class GetClienteUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: GetClienteInputDTO) -> ClienteDetailOutputDTO:
        record = self._repository.get_cliente(
            actor_owner=input_dto.actor.owner_emp_codigo,
            codigo=input_dto.codigo,
        )
        if record is None:
            raise ClienteNotFoundError(
                f"Cliente '{input_dto.codigo}' not found or out of scope."
            )
        return to_detail_dto(
            record,
            actor_link_emp=input_dto.actor.link_emp_codigo,
        )
