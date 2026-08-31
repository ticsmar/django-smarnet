"""Write cliente risk status (cad_bloqueio.php) via Python DML."""

from dataclasses import dataclass

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
    ClienteRiscoInvalidError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.repositories.cliente_repository import ClienteRepository
from apps.commercial.domain.services.cliente_bloqueado import default_mensagem_bloqueio
from apps.commercial.domain.services.empresa_ownership import can_edit_customer


@dataclass(frozen=True, slots=True)
class GravaClienteBloqueioInputDTO:
    actor: ActorContextDTO
    codigo: int
    bloqueado: int
    mensagem_bloqueio: str | None = None


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


class GravaClienteBloqueioUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteBloqueioInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        risco = self._query.get_risco(input_dto.bloqueado)
        if risco is None:
            raise ClienteRiscoInvalidError(
                f"Unknown risco CRS_COD_SIAOS '{input_dto.bloqueado}'."
            )
        mensagem = default_mensagem_bloqueio(
            input_dto.bloqueado, input_dto.mensagem_bloqueio
        )
        self._repository.grava_bloqueio(
            codigo=input_dto.codigo,
            bloqueado=input_dto.bloqueado,
            mensagem_bloqueio=mensagem,
        )
