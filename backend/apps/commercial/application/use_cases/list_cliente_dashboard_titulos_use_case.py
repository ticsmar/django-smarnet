"""List cliente dashboard titulos history use case."""

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardQueryInputDTO,
    ClienteDashboardTituloItemOutputDTO,
    PaginatedClienteDashboardTitulosOutputDTO,
)
from apps.commercial.domain.exceptions.cliente_exceptions import ClienteNotFoundError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardRepository,
)
from apps.commercial.domain.services.cliente_dashboard_scope import normalize_scope


class ListClienteDashboardTitulosUseCase:
    def __init__(self, repository: ClienteDashboardRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ClienteDashboardQueryInputDTO
    ) -> PaginatedClienteDashboardTitulosOutputDTO:
        scope = normalize_scope(input_dto.scope)
        result = self._repository.list_titulos(
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
        return PaginatedClienteDashboardTitulosOutputDTO(
            items=[
                ClienteDashboardTituloItemOutputDTO(
                    numero=item.numero,
                    parcela=item.parcela,
                    valor=item.valor,
                    saldo=item.saldo,
                    vencimento=item.vencimento,
                    emissao=item.emissao,
                    status=item.status,
                    cliente_codigo=item.cliente_codigo,
                )
                for item in result.items
            ],
            total=result.total,
            page=result.page,
            page_size=result.page_size,
            scope=scope,
            titulos_disponivel=result.titulos_disponivel,
        )
