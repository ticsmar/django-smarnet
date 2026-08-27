"""Request flag: authenticated ERP calls use the smar Oracle alias."""

from contextvars import ContextVar, Token

_use_smar: ContextVar[bool] = ContextVar("use_smar", default=False)


def get_use_smar() -> bool:
    return _use_smar.get()


def set_use_smar(value: bool) -> Token[bool]:
    return _use_smar.set(value)


def reset_use_smar(token: Token[bool]) -> None:
    _use_smar.reset(token)
