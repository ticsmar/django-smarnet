"""Register the pessoa / empresa / chapa links on a pre-pessoa request."""

from dataclasses import replace

from apps.users.application.dtos.pending_request_dto import (
    RegisterAccessRequestFieldsInputDTO,
    RegisterAccessRequestFieldsOutputDTO,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    NoFieldsToRegisterError,
    PendingRequestTypeChangeError,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.domain.repositories.pending_request_admin_repository import (
    PendingRequestAdminRepository,
    PendingRequestFieldChanges,
)
from apps.users.domain.services.pending_request_type import (
    resolve_pending_request_type,
)

_NOT_FOUND = "Pending request not found or already closed."
_FUNCIONARIO_TEP = "S"
_SWITCHABLE_TEP = frozenset({"C", "F"})


class RegisterAccessRequestFieldsUseCase:
    def __init__(self, repository: PendingRequestAdminRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: RegisterAccessRequestFieldsInputDTO
    ) -> RegisterAccessRequestFieldsOutputDTO:
        pending = self._repository.get_open(input_dto.ppe_codigo)
        if pending is None:
            raise PendingRequestNotFoundError(_NOT_FOUND)

        changes = PendingRequestFieldChanges(
            fun_chapa=input_dto.fun_chapa,
            write_fun_chapa=input_dto.write_fun_chapa,
            pes_numero=input_dto.pes_numero,
            write_pes_numero=input_dto.write_pes_numero,
            emp_codigo=input_dto.emp_codigo,
            write_emp_codigo=input_dto.write_emp_codigo,
        )
        changes, new_tep = _apply_tep_change(input_dto, pending, changes)

        if not _writes_anything(changes):
            if new_tep is not None:
                # Same type resent: nothing to write, but not an error either.
                return _describe(
                    pending,
                    detail="Tipo da empresa ja estava definido.",
                    closed=False,
                    resolved_existing_user=False,
                )
            raise NoFieldsToRegisterError("Informe ao menos um campo para cadastrar.")

        detail = "Campos cadastrados com sucesso."
        if changes.write_tep_codigo:
            detail = (
                f"Tipo alterado para {changes.tep_codigo}. "
                "Vinculo de empresa removido; selecione novamente."
            )

        closed = False
        resolved_existing_user = False
        if input_dto.write_pes_numero and input_dto.pes_numero:
            linked = self._link_person(pending, input_dto.pes_numero)
            if linked is not None:
                changes = replace(changes, close_request=True)
                closed = True
                resolved_existing_user = True
                detail = linked

        updated = self._repository.apply_field_changes(
            ppe_codigo=pending.ppe_codigo, changes=changes
        )
        return _describe(
            updated,
            detail=detail,
            closed=closed,
            resolved_existing_user=resolved_existing_user,
        )

    def _link_person(
        self, pending: PendingRequestSnapshot, pes_numero: int
    ) -> str | None:
        """Link the person and report why the request closed, when it did."""
        self._repository.activate_person(pes_numero)

        fun_chapa = pending.fun_chapa
        if fun_chapa:
            self._repository.link_person_to_funcionario(
                fun_chapa=fun_chapa, pes_numero=pes_numero
            )

        # Funcionario refeito no RH: a pessoa ja tem usuario web, entao a
        # solicitacao encerra sem criar acesso novo.
        if (
            pending.tep_codigo == _FUNCIONARIO_TEP
            and fun_chapa
            and self._repository.person_has_web_user(pes_numero)
        ):
            return (
                f"Pessoa {pes_numero} vinculada ao funcionario {fun_chapa}. "
                "Usuario web ja existia; solicitacao encerrada sem criar novo acesso."
            )
        return None


def _apply_tep_change(
    input_dto: RegisterAccessRequestFieldsInputDTO,
    pending: PendingRequestSnapshot,
    changes: PendingRequestFieldChanges,
) -> tuple[PendingRequestFieldChanges, str | None]:
    """Return the changes plus the requested type, when one was informed."""
    requested = (input_dto.tep_codigo or "").strip().upper()
    if not requested:
        return changes, None

    if pending.tep_codigo not in _SWITCHABLE_TEP:
        raise PendingRequestTypeChangeError(
            "So e permitido alterar tipo entre Cliente (C) e Fornecedor (F)."
        )
    if requested not in _SWITCHABLE_TEP:
        raise PendingRequestTypeChangeError("tep_codigo deve ser C ou F.")
    if requested == pending.tep_codigo:
        return changes, requested

    # Parceiro/empresa de C nao vale para F (e vice-versa).
    return (
        replace(
            changes,
            tep_codigo=requested,
            write_tep_codigo=True,
            emp_codigo=None,
            write_emp_codigo=True,
        ),
        requested,
    )


def _writes_anything(changes: PendingRequestFieldChanges) -> bool:
    return (
        changes.write_fun_chapa
        or changes.write_pes_numero
        or changes.write_emp_codigo
        or changes.write_tep_codigo
    )


def _describe(
    pending: PendingRequestSnapshot,
    *,
    detail: str,
    closed: bool,
    resolved_existing_user: bool,
) -> RegisterAccessRequestFieldsOutputDTO:
    flags = resolve_pending_request_type(pending.tep_codigo)
    return RegisterAccessRequestFieldsOutputDTO(
        ppe_codigo=pending.ppe_codigo,
        fun_chapa=pending.fun_chapa,
        pes_numero=pending.pes_numero,
        emp_codigo=pending.emp_codigo,
        tep_codigo=pending.tep_codigo,
        tipo=flags.tipo,
        cliente=flags.cliente,
        fornecedor=flags.fornecedor,
        smar=flags.smar,
        detail=detail,
        closed=closed,
        resolved_existing_user=resolved_existing_user,
    )
