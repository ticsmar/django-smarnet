"""Interpret ``SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO``.

The legacy list shows a yellow ``!`` (``tagRisco tagRAm``) when the
function returns a non-zero code.

Return codes (VARCHAR in Oracle, numeric in practice):

- ``0`` — cadastro completo
- ``1`` — cadastro incompleto (title: ``Cadastro Incompleto!!``)
- ``2`` — CNPJ inválido (pessoa jurídica)
- ``999`` — cliente não encontrado
"""

from __future__ import annotations

CADASTRO_OK: int = 0
CADASTRO_INCOMPLETO: int = 1
CADASTRO_CNPJ_INVALIDO: int = 2
CADASTRO_NAO_ENCONTRADO: int = 999

CADASTRO_ALERT_CODES: frozenset[int] = frozenset(
    {CADASTRO_INCOMPLETO, CADASTRO_CNPJ_INVALIDO}
)


def normalize_cadastro_checagem(value: int | None) -> int | None:
    if value is None:
        return None
    return int(value)


def is_cadastro_alerta(value: int | None) -> bool:
    code = normalize_cadastro_checagem(value)
    return code in CADASTRO_ALERT_CODES
