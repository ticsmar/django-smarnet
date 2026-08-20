"""In-memory doubles for the pre-pessoa triage ports."""

from dataclasses import replace

from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaLinkFailedError,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.domain.repositories.pending_request_admin_repository import (
    EmpresaLinkResult,
    PendingRequestFieldChanges,
)


def make_pending(**overrides: object) -> PendingRequestSnapshot:
    payload: dict[str, object] = {
        "ppe_codigo": 501,
        "tep_codigo": "C",
        "nome": "Ana Silva",
        "email": "ana@cliente.com",
        "pes_numero": None,
        "emp_codigo": 88,
        "fun_chapa": None,
        "lin_cod": 1,
        "closed": False,
    }
    payload.update(overrides)
    return PendingRequestSnapshot(**payload)


class FakePendingRequestAdminRepository:
    def __init__(
        self,
        *,
        pending: PendingRequestSnapshot | None = None,
        people_with_web_user: set[int] | None = None,
        empresa_link: EmpresaLinkResult | None = None,
        empresa_link_error: str = "",
    ) -> None:
        self._pending = pending
        self._people_with_web_user = people_with_web_user or set()
        self._empresa_link = empresa_link
        self._empresa_link_error = empresa_link_error
        self.discarded: list[int] = []
        self.applied: list[PendingRequestFieldChanges] = []
        self.activated: list[int] = []
        self.linked_funcionarios: list[tuple[int, int]] = []
        self.empresa_calls: list[tuple[int, str]] = []

    def get_open(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        if self._pending is None or self._pending.ppe_codigo != ppe_codigo:
            return None
        if self._pending.closed:
            return None
        return self._pending

    def discard(self, ppe_codigo: int) -> None:
        self.discarded.append(ppe_codigo)

    def apply_field_changes(
        self, *, ppe_codigo: int, changes: PendingRequestFieldChanges
    ) -> PendingRequestSnapshot:
        self.applied.append(changes)
        assert self._pending is not None
        updated = self._pending
        if changes.write_fun_chapa:
            updated = replace(updated, fun_chapa=changes.fun_chapa)
        if changes.write_pes_numero:
            updated = replace(updated, pes_numero=changes.pes_numero)
        if changes.write_emp_codigo:
            updated = replace(updated, emp_codigo=changes.emp_codigo)
        if changes.write_tep_codigo and changes.tep_codigo is not None:
            updated = replace(updated, tep_codigo=changes.tep_codigo)
        if changes.close_request:
            updated = replace(updated, closed=True)
        self._pending = updated
        return updated

    def person_has_web_user(self, pes_numero: int) -> bool:
        return pes_numero in self._people_with_web_user

    def activate_person(self, pes_numero: int) -> None:
        self.activated.append(pes_numero)

    def link_person_to_funcionario(self, *, fun_chapa: int, pes_numero: int) -> None:
        self.linked_funcionarios.append((fun_chapa, pes_numero))

    def link_empresa_from_partner(
        self, *, ppe_codigo: int, partner_codigo: str
    ) -> EmpresaLinkResult:
        self.empresa_calls.append((ppe_codigo, partner_codigo))
        if self._empresa_link_error:
            raise EmpresaLinkFailedError(self._empresa_link_error)
        assert self._empresa_link is not None
        return self._empresa_link
