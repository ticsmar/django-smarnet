"""Pre-pessoa approval repository contract (GERAL.PRE_PESSOA + SIAOS.USUARIO)."""

from dataclasses import dataclass
from typing import Protocol

from apps.users.domain.repositories.pending_request import PendingRequestSnapshot


@dataclass(frozen=True, slots=True)
class LegacyUserSnapshot:
    usu_chapa: int
    usu_loginweb: str


@dataclass(frozen=True, slots=True)
class DjangoUserSnapshot:
    user_id: int
    usu_chapa: int | None


@dataclass(frozen=True, slots=True)
class ChapaSelection:
    """Which USU_CHAPA the approval writes.

    With existing_chapa set the approval updates that row. Otherwise it inserts,
    taking preferred_new_chapa when that number is still free.
    """

    existing_chapa: int | None = None
    preferred_new_chapa: int | None = None


@dataclass(frozen=True, slots=True)
class ApproveAccessCommand:
    ppe_codigo: int
    username: str
    password: str
    email: str
    nome: str
    pes_numero: int
    emp_codigo: int
    lin_cod: int
    lpr_codigo: int | None
    chapa: ChapaSelection
    require_password_change: bool
    # TEP != 'S': the approval also stamps PRE_PESSOA.FUN_CHAPA with the new chapa.
    # For funcionario the FUN_CHAPA belongs to RH and must not be overwritten.
    write_pending_fun_chapa: bool
    # Set when a previous attempt left an auth.User without USU_CHAPA.
    reuse_user_id: int | None = None


@dataclass(frozen=True, slots=True)
class ApprovalResult:
    ppe_codigo: int
    user_id: int
    username: str
    usu_chapa: int


class AccessApprovalRepository(Protocol):
    def get_pending_request(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        """Return the PRE_PESSOA row, closed or not, or None when absent."""

    def find_legacy_user(self, usu_chapa: int) -> LegacyUserSnapshot | None:
        """Return the SIAOS.USUARIO row for the chapa, or None when absent."""

    def legacy_login_taken(self, username: str) -> bool:
        """Return True when USU_LOGINWEB already exists in SIAOS.USUARIO."""

    def find_django_user(self, username: str) -> DjangoUserSnapshot | None:
        """Return the auth.User for the username, with its linked chapa."""

    def approve(self, command: ApproveAccessCommand) -> ApprovalResult:
        """Persist the approval across both databases as one unit of work."""
