"""Shared translation of GERAL.PRE_PESSOA rows into the domain read model."""

from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.infrastructure.models import PrePessoa


def as_text(value: object | None) -> str:
    if value is None:
        return ""
    return str(value).strip()


def to_pending_snapshot(row: PrePessoa) -> PendingRequestSnapshot:
    return PendingRequestSnapshot(
        ppe_codigo=int(row.ppe_codigo),
        tep_codigo=as_text(row.tep_codigo).upper(),
        nome=as_text(row.ppe_nome),
        email=as_text(row.ppe_email),
        pes_numero=None if row.pes_numero is None else int(row.pes_numero),
        emp_codigo=None if row.emp_codigo is None else int(row.emp_codigo),
        fun_chapa=None if row.fun_chapa is None else int(row.fun_chapa),
        lin_cod=None if row.lin_cod is None else int(row.lin_cod),
        closed=row.ppe_dt_baixa is not None,
    )
