"""Pure helpers mirroring getCNPJ.php / getCEP.php field shaping."""

from __future__ import annotations

import unicodedata

CNPJ_LENGTH = 14
CPF_LENGTH = 11
CEP_LENGTH = 8
FANTASIA_SHORT_WORD = 3
IBGE_FULL_LENGTH = 7
IBGE_UF_PREFIX = 2
IBGE_MUNICIPIO_LENGTH = 5


def digits_only(value: str | None) -> str:
    return "".join(ch for ch in (value or "") if ch.isdigit())


def normalize_cnpj(value: str | None) -> str:
    """Strip ``. / -`` and spaces; keep letters and digits (alphanumeric CNPJ)."""
    stripped = []
    for ch in value or "":
        if ch in {".", "/", "-", " ", "\t"}:
            continue
        if ch.isalnum():
            stripped.append(ch.upper())
    return "".join(stripped)


def is_cnpj_key(value: str | None) -> bool:
    key = normalize_cnpj(value)
    return len(key) == CNPJ_LENGTH and key.isalnum()


def is_cpf_key(value: str | None) -> bool:
    return len(digits_only(value)) == CPF_LENGTH


def strip_accents(value: str | None) -> str | None:
    if value is None:
        return None
    text = str(value)
    if not text:
        return text
    normalized = unicodedata.normalize("NFKD", text)
    stripped = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return stripped


def fantasia_from_nome(nome: str | None, fantasia: str | None) -> str | None:
    if fantasia and fantasia.strip():
        return fantasia.strip()
    if not nome or not nome.strip():
        return None
    first = nome.strip().split()[0]
    if len(first) > FANTASIA_SHORT_WORD:
        return first
    return f"{first} {first}"


def split_telefones(telefone: str | None) -> tuple[str | None, str | None]:
    if not telefone or not telefone.strip():
        return None, None
    parts = [part.strip() for part in telefone.split("/") if part.strip()]
    first = parts[0] if parts else None
    second = parts[1] if len(parts) > 1 else None
    return first, second


def municipio_ibge(ibge: str | None) -> str | None:
    """PHP ``substr(ibge, 2, 5)`` — município without the UF prefix."""
    digits = digits_only(ibge)
    if len(digits) < IBGE_FULL_LENGTH:
        return digits or None
    return digits[IBGE_UF_PREFIX : IBGE_UF_PREFIX + IBGE_MUNICIPIO_LENGTH]


def endereco_logradouro(logradouro: str | None, numero: str | None) -> str | None:
    street = (logradouro or "").strip()
    if not street:
        return None
    number = (numero or "").strip()
    if number:
        return f"{street}, {number}"
    return street
