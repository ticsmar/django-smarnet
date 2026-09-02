"""List cliente dashboard OS history use case."""

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardOsItemOutputDTO,
    ClienteDashboardQueryInputDTO,
    PaginatedClienteDashboardOsOutputDTO,
)
from apps.commercial.domain.exceptions.cliente_exceptions import ClienteNotFoundError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardRepository,
)
from apps.commercial.domain.services.cliente_dashboard_scope import normalize_scope


class ListClienteDashboardOsUseCase:
    def __init__(self, repository: ClienteDashboardRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ClienteDashboardQueryInputDTO
    ) -> PaginatedClienteDashboardOsOutputDTO:
        scope = normalize_scope(input_dto.scope)
        result = self._repository.list_os(
            actor_owner=input_dto.actor.owner_emp_codigo,
            anchor_codigo=input_dto.codigo,
            scope=scope,
            page=input_dto.page,
            page_size=input_dto.page_size,
        )
        if result.total == 0:
            anchor = self._repository.get_anchor(
                actor_owner=input_dto.actor.owner_emp_codigo,
                anchor_codigo=input_dto.codigo,
            )
            if anchor is None:
                raise ClienteNotFoundError(
                    f"Cliente '{input_dto.codigo}' not found or out of scope."
                )
        return PaginatedClienteDashboardOsOutputDTO(
            items=[
                ClienteDashboardOsItemOutputDTO(
                    order_no=item.order_no,
                    cust_key=item.cust_key,
                    cliente_nome=item.cliente_nome,
                    order_date=item.order_date,
                    origem=item.origem,
                    origem_descricao=item.origem_descricao,
                    order_status=item.order_status,
                    os_encerrada=item.os_encerrada,
                )
                for item in result.items
            ],
            total=result.total,
            page=result.page,
            page_size=result.page_size,
            scope=scope,
        )
