"""List child tabs for a cliente (contatos, cobrança, embarque, log)."""

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ClienteCobrancaOutputDTO,
    ClienteContatoOutputDTO,
    ClienteEmbarqueOutputDTO,
    ClienteLogOutputDTO,
)
from apps.commercial.application.mappers.cliente_mapper import (
    to_cobranca_dto,
    to_contato_dto,
    to_embarque_dto,
    to_log_dto,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
    ClienteNotFoundError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.services.empresa_ownership import can_edit_customer


def _assert_in_scope(
    repository: ClienteQueryRepository,
    *,
    actor: ActorContextDTO,
    codigo: int,
) -> None:
    record = repository.get_cliente(
        actor_owner=actor.owner_emp_codigo, codigo=codigo
    )
    if record is None:
        raise ClienteNotFoundError(
            f"Cliente '{codigo}' not found or out of scope."
        )
    if not can_edit_customer(
        actor_link_emp=actor.link_emp_codigo, cliente_emp=record.emp_codigo
    ) and actor.owner_emp_codigo != record.emp_codigo:
        raise ClienteForbiddenError(
            f"Cliente '{codigo}' is out of the actor's empresa scope."
        )


class ListClienteContatosUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, actor: ActorContextDTO, codigo: int, search: str
    ) -> list[ClienteContatoOutputDTO]:
        record = self._repository.get_cliente(
            actor_owner=actor.owner_emp_codigo, codigo=codigo
        )
        if record is None:
            raise ClienteNotFoundError(
                f"Cliente '{codigo}' not found or out of scope."
            )
        return [
            to_contato_dto(
                item,
                con_codigo_com=record.con_codigo_com,
                con_codigo_tec=record.con_codigo_tec,
                con_codigo_fin=record.con_codigo_fin,
            )
            for item in self._repository.list_contatos(codigo=codigo, search=search)
        ]


class ListClienteCobrancasUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, actor: ActorContextDTO, codigo: int
    ) -> list[ClienteCobrancaOutputDTO]:
        _assert_in_scope(self._repository, actor=actor, codigo=codigo)
        return [
            to_cobranca_dto(item)
            for item in self._repository.list_cobrancas(codigo=codigo)
        ]


class ListClienteEmbarquesUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, actor: ActorContextDTO, codigo: int
    ) -> list[ClienteEmbarqueOutputDTO]:
        _assert_in_scope(self._repository, actor=actor, codigo=codigo)
        return [
            to_embarque_dto(item)
            for item in self._repository.list_embarques(codigo=codigo)
        ]


class ListClienteLogsUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, actor: ActorContextDTO, codigo: int
    ) -> list[ClienteLogOutputDTO]:
        _assert_in_scope(self._repository, actor=actor, codigo=codigo)
        return [to_log_dto(item) for item in self._repository.list_logs(codigo=codigo)]
