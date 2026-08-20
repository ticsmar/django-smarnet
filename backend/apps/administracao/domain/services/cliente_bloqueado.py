"""Rules for ``SIAOS.CLIENTE.BLOQUEADO`` (nota de risco).

``BLOQUEADO`` is the FK to ``INTEGRACAO.CLIENTE_RISCO.CRS_CODIGO``.
Null is treated as ``1`` (nota A). Code ``7`` (E-, cadastro
duplicado/invalido) is hidden from list/lookup/detail.
"""

from __future__ import annotations

DEFAULT_BLOQUEADO: int = 1
DEFAULT_RISCO_LETRA: str = "A"
DEFAULT_RISCO_DESC: str = "Nota A   : Sem restrições"
# CRS_CODIGO 7 = Nota E- : Cadastro Duplicado/Invalido
HIDDEN_BLOQUEADO_CODIGOS: frozenset[int] = frozenset({7})


def normalize_bloqueado(value: int | None) -> int:
    """Coerce NULL/0 ``BLOQUEADO`` to ``1`` (nota A)."""
    if value is None or int(value) == 0:
        return DEFAULT_BLOQUEADO
    return int(value)


def sql_effective_bloqueado(column: str = "BLOQUEADO") -> str:
    """Oracle expression: NULL and 0 become 1 (CRS_CODIGO da nota A)."""
    return f"NVL(NULLIF({column}, 0), {DEFAULT_BLOQUEADO})"


def is_cliente_bloqueado_visible(value: int | None) -> bool:
    """Whether the client should appear in list/lookup/detail."""
    return normalize_bloqueado(value) not in HIDDEN_BLOQUEADO_CODIGOS


def resolve_risco_letra(
    bloqueado: int | None,
    crs_cod_letra: str | None,
) -> str:
    """Letter for the list badge — never empty; default ``A``."""
    letra = (crs_cod_letra or "").strip()
    if letra:
        return letra
    return DEFAULT_RISCO_LETRA


def resolve_risco_desc(
    bloqueado: int | None,
    crs_desc_longa: str | None,
) -> str:
    desc = (crs_desc_longa or "").strip()
    if desc:
        return desc
    return DEFAULT_RISCO_DESC
