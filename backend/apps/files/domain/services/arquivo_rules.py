"""Shared validation for folder/file names in the manager."""

from apps.files.domain.exceptions.arquivo_exceptions import ArquivoValidationError
from apps.files.domain.services.sistema_catalog import (
    DESCRICAO_MAX,
    FILTRO_MAX,
    NOME_MAX,
)


def require_filtro(filtro: str) -> str:
    text = filtro.strip()
    if not text:
        raise ArquivoValidationError("Filtro (PK do registro) é obrigatório.")
    if len(text) > FILTRO_MAX:
        raise ArquivoValidationError(f"Filtro excede {FILTRO_MAX} caracteres.")
    return text


def require_nome(nome: str) -> str:
    text = nome.strip()
    if not text:
        raise ArquivoValidationError("Nome é obrigatório.")
    if len(text) > NOME_MAX:
        raise ArquivoValidationError(f"Nome excede {NOME_MAX} caracteres.")
    return text


def require_descricao(descricao: str) -> str:
    text = descricao.strip()
    if len(text) > DESCRICAO_MAX:
        raise ArquivoValidationError(f"Descrição excede {DESCRICAO_MAX} caracteres.")
    return text
