"""Write cliente credit limits from dashboard Cadastros (estCli)."""

from dataclasses import dataclass
from decimal import Decimal

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.repositories.cliente_repository import ClienteRepository
from apps.commercial.domain.services.empresa_ownership import can_edit_customer


@dataclass(frozen=True, slots=True)
class GravaClienteLimitesInputDTO:
    actor: ActorContextDTO
    codigo: int
    limitecr: Decimal | None
    cli_limite_crv: Decimal | None


def _assert_can_edit(
    query: ClienteQueryRepository,
    *,
    actor: ActorContextDTO,
    codigo: int,
) -> None:
    if actor.usu_chapa is None:
        raise ClienteForbiddenError("Actor without USU_CHAPA cannot write clientes.")
    current_emp = query.get_cliente_emp_codigo(codigo)
    if not can_edit_customer(
        actor_link_emp=actor.link_emp_codigo, cliente_emp=current_emp
    ):
        raise ClienteForbiddenError(
            f"Cliente '{codigo}' is out of the actor's empresa scope."
        )


class GravaClienteLimitesUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteLimitesInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.grava_limites(
            codigo=input_dto.codigo,
            limitecr=input_dto.limitecr,
            cli_limite_crv=input_dto.cli_limite_crv,
        )
