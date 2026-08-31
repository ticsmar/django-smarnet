"""Rules for ``SIAOS.CLIENTE.BLOQUEADO`` (nota de risco).

``BLOQUEADO`` is the FK to ``INTEGRACAO.CLIENTE_RISCO.CRS_COD_SIAOS``
(Oracle comment: CODIGO BLOQUEIO SIAOS). ``CRS_CODIGO`` is only the
catalog PK — do not join or persist it on ``CLIENTE``.

Null is treated as ``0`` (nota A). Code ``2`` (E-, cadastro
duplicado/invalido) is hidden from list/lookup.
"""

from __future__ import annotations

DEFAULT_BLOQUEADO: int = 0
DEFAULT_RISCO_LETRA: str = "A"
DEFAULT_RISCO_DESC: str = "Nota A   : Sem restrições"
DEFAULT_RISCO_DESC_CURTA: str = "Sem restrições"
# CRS_COD_SIAOS 2 = Nota E- : Cadastro Duplicado/Invalido
HIDDEN_BLOQUEADO_CODIGOS: frozenset[int] = frozenset({2})
BLOQUEADO_DUPLICIDADE: int = 2
BLOQUEADO_JUDICIAL: int = 5
MSG_DUPLICIDADE: str = "DUPLICIDADE/INVÁLIDO"
MSG_JUDICIAL: str = "BLOQUEIO JUDICIAL"
MENSAGEM_BLOQUEIO_MAX: int = 2000


def default_mensagem_bloqueio(bloqueado: int, mensagem: str | None) -> str | None:
    """PHP cad_bloqueio.js: fill a stock reason when the message is empty."""
    text = (mensagem or "").strip()
    if text:
        return text[:MENSAGEM_BLOQUEIO_MAX]
    if int(bloqueado) == BLOQUEADO_DUPLICIDADE:
        return MSG_DUPLICIDADE
    if int(bloqueado) == BLOQUEADO_JUDICIAL:
        return MSG_JUDICIAL
    return None


def normalize_bloqueado(value: int | None) -> int:
    """Coerce NULL ``BLOQUEADO`` to ``0`` (nota A). ``0`` is a valid SIAOS code."""
    if value is None:
        return DEFAULT_BLOQUEADO
    return int(value)


def sql_effective_bloqueado(column: str = "BLOQUEADO") -> str:
    """Oracle expression: NULL becomes 0 (CRS_COD_SIAOS da nota A)."""
    return f"NVL({column}, {DEFAULT_BLOQUEADO})"


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


def resolve_risco_desc_curta(
    crs_desc: str | None,
    crs_desc_longa: str | None = None,
) -> str:
    """Short catalog label for the detail header — never empty."""
    desc = (crs_desc or "").strip()
    if desc:
        return desc
    longa = (crs_desc_longa or "").strip()
    if ":" in longa:
        after = longa.split(":", 1)[1].strip()
        if after:
            return after
    if longa:
        return longa
    return DEFAULT_RISCO_DESC_CURTA
