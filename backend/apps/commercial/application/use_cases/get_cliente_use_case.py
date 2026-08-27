"""Get cliente by codigo use case (scoped by actor empresa)."""

from apps.commercial.application.dtos.cliente_dtos import (
    ClienteDetailOutputDTO,
    GetClienteInputDTO,
)
from apps.commercial.application.mappers.cliente_mapper import to_detail_dto
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteNotFoundError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
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
        emp_tipo = self._repository.get_empresa_tipo(input_dto.actor.link_emp_codigo)
        return to_detail_dto(
            record,
            actor_link_emp=input_dto.actor.link_emp_codigo,
            show_financeiro=(emp_tipo or "").upper() != "C",
        )
