"""Shared pre-pessoa read model (GERAL.PRE_PESSOA)."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class PendingRequestSnapshot:
    ppe_codigo: int
    tep_codigo: str
    nome: str
    email: str
    pes_numero: int | None
    emp_codigo: int | None
    fun_chapa: int | None
    lin_cod: int | None
    closed: bool
