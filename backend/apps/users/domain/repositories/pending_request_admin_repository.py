"""Pre-pessoa triage repository contract (discard, register fields, link empresa)."""

from dataclasses import dataclass
from typing import Protocol

from apps.users.domain.repositories.pending_request import PendingRequestSnapshot


@dataclass(frozen=True, slots=True)
class PendingRequestFieldChanges:
    """Columns the admin wants written on PRE_PESSOA.

    Absent means "leave as is"; that is why each field is wrapped in a flag
    instead of relying on None, which is a legitimate value for emp_codigo.
    """

    fun_chapa: int | None = None
    write_fun_chapa: bool = False
    pes_numero: int | None = None
    write_pes_numero: bool = False
    emp_codigo: int | None = None
    write_emp_codigo: bool = False
    tep_codigo: str | None = None
    write_tep_codigo: bool = False
    close_request: bool = False


@dataclass(frozen=True, slots=True)
class EmpresaLinkResult:
    emp_codigo: int
    emp_nome: str
    emp_tipo: str


class PendingRequestAdminRepository(Protocol):
    def get_open(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        """Return the request only while PPE_DT_BAIXA is null."""

    def discard(self, ppe_codigo: int) -> None:
        """Close the request without creating any user."""

    def apply_field_changes(
        self, *, ppe_codigo: int, changes: PendingRequestFieldChanges
    ) -> PendingRequestSnapshot:
        """Write the requested columns and return the resulting row."""

    def person_has_web_user(self, pes_numero: int) -> bool:
        """Return True when the person already owns a SIAOS.USUARIO with web login."""

    def activate_person(self, pes_numero: int) -> None:
        """Legado grava.php op=3: reactivate SIAOS.PESSOA when linking it."""

    def link_person_to_funcionario(self, *, fun_chapa: int, pes_numero: int) -> None:
        """Legado grava.php op=3: put PES_NUMERO on the new FUNCIONARIO row."""

    def link_empresa_from_partner(
        self, *, ppe_codigo: int, partner_codigo: str
    ) -> EmpresaLinkResult:
        """Legado grava.php op=7: GERAL.PCK_USUARIO.SP_IN_EMPRESA."""
