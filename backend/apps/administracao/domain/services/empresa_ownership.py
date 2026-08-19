"""Empresa ownership rules for SIAOS.CLIENTE.

The legacy dataset stores clients under different ``EMP_CODIGO`` values but
factories 5, 7, 15 and 116 are the only owners that keep their own pool.
Every other value (including NULL) collapses onto empresa 1 — the shared pool
where SmarNet ERP users operate.

The helpers below encode that rule so use cases and repositories share a single
source of truth, and can be tested without touching Oracle.
"""

from __future__ import annotations

FACTORY_EMP_CODIGOS: frozenset[int] = frozenset({5, 7, 15, 116})
DEFAULT_OWNER_EMP_CODIGO: int = 1


def normalize_emp_codigo(value: int | None) -> int:
    """Return ``DEFAULT_OWNER_EMP_CODIGO`` when ``value`` is missing."""
    if value is None:
        return DEFAULT_OWNER_EMP_CODIGO
    return int(value)


def effective_owner_emp_codigo(link_emp_codigo: int | None) -> int:
    """Actor-facing owner: factories own themselves; everyone else owns 1."""
    code = normalize_emp_codigo(link_emp_codigo)
    if code in FACTORY_EMP_CODIGOS:
        return code
    return DEFAULT_OWNER_EMP_CODIGO


def customer_effective_owner(cliente_emp_codigo: int | None) -> int:
    """Historical non-factory rows belong to the shared company-1 pool."""
    code = normalize_emp_codigo(cliente_emp_codigo)
    if code in FACTORY_EMP_CODIGOS:
        return code
    return DEFAULT_OWNER_EMP_CODIGO


def can_view_customer(
    *,
    actor_link_emp: int | None,
    cliente_emp: int | None,
) -> bool:
    """True when the actor's effective owner matches the cliente pool."""
    return effective_owner_emp_codigo(actor_link_emp) == customer_effective_owner(
        cliente_emp
    )


def can_edit_customer(
    *,
    actor_link_emp: int | None,
    cliente_emp: int | None,
) -> bool:
    """Same rule as view for this delivery — see ADR notes in the plan."""
    return can_view_customer(
        actor_link_emp=actor_link_emp,
        cliente_emp=cliente_emp,
    )


def sql_emp_filter_clause(actor_owner: int) -> tuple[str, list[int]]:
    """Return (SQL fragment, bind params) applied to CLIENTE.EMP_CODIGO.

    Factory actors see only their own EMP_CODIGO.
    Company-1 pool actors see every row whose effective owner is 1
    (i.e. NVL(EMP_CODIGO,1) is not in the factory set).
    """
    if actor_owner in FACTORY_EMP_CODIGOS:
        return ("EMP_CODIGO = %s", [actor_owner])
    factories = sorted(FACTORY_EMP_CODIGOS)
    placeholders = ", ".join(["%s"] * len(factories))
    return (
        f"NVL(EMP_CODIGO, 1) NOT IN ({placeholders})",
        [*factories],
    )
