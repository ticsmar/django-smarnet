"""Shared validation for follow-up recados."""

from apps.followup.domain.exceptions.followup_exceptions import RecadoValidationError
from apps.followup.domain.services.sistema_catalog import FILTRO_MAX, MENSAGEM_MAX


def require_sistema(sistema: int) -> int:
    if sistema < 1:
        raise RecadoValidationError("Sistema é obrigatório.")
    return sistema


def require_filtro(filtro: str) -> str:
    text = str(filtro).strip()
    if not text:
        raise RecadoValidationError("Filtro (PK do registro) é obrigatório.")
    if len(text) > FILTRO_MAX:
        raise RecadoValidationError(f"Filtro excede {FILTRO_MAX} caracteres.")
    try:
        int(text)
    except ValueError as exc:
        raise RecadoValidationError("Filtro deve ser numérico.") from exc
    return text


def require_mensagem(mensagem: str) -> str:
    text = mensagem.strip()
    if not text:
        raise RecadoValidationError("Mensagem é obrigatória.")
    if len(text) > MENSAGEM_MAX:
        raise RecadoValidationError(f"Mensagem excede {MENSAGEM_MAX} caracteres.")
    return text


def require_tre_codigo(tre_codigo: int | None) -> int:
    if tre_codigo is None or tre_codigo < 1:
        raise RecadoValidationError("Selecione uma referência.")
    return tre_codigo


def html_mensagem(mensagem: str) -> str:
    return require_mensagem(mensagem).replace("\r\n", "\n").replace("\n", "<br />")
