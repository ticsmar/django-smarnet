"""Resolve dashboard filter scope (cliente vs grupo econômico)."""

from typing import Final, Literal

ClienteDashboardScopeKind = Literal["cliente", "grupo"]

SCOPE_CLIENTE: Final[ClienteDashboardScopeKind] = "cliente"
SCOPE_GRUPO: Final[ClienteDashboardScopeKind] = "grupo"


def normalize_scope(value: str | None) -> ClienteDashboardScopeKind:
    if (value or "").strip().lower() == SCOPE_GRUPO:
        return SCOPE_GRUPO
    return SCOPE_CLIENTE


def grupo_cabeca(*, codigo: int, cli_grupo: int | None) -> int:
    return int(cli_grupo or codigo)


def cust_keys_sql(
    *, anchor_codigo: int, grupo_cabeca_codigo: int, scope: ClienteDashboardScopeKind
) -> tuple[str, list[int]]:
    if scope == SCOPE_GRUPO:
        sql = "(CODIGO = %s OR CLI_GRUPO = %s)"
        params = [grupo_cabeca_codigo, grupo_cabeca_codigo]
    else:
        sql = "CODIGO = %s"
        params = [anchor_codigo]
    return sql, params


def in_placeholders[T](values: list[T]) -> tuple[str, list[T]]:
    """Bind list for `IN (%s, %s, ...)`. Empty set matches nothing."""
    if not values:
        return "SELECT NULL FROM DUAL WHERE 1=0", []
    return ", ".join(["%s"] * len(values)), list(values)


def lpad_cli_codes(codes: list[int]) -> list[str]:
    return [str(code).zfill(6) for code in codes]
