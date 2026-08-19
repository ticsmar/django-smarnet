"""Access request repository contract (GERAL.PRE_PESSOA)."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class AccessRequestCreateData:
    tep_codigo: str
    nome: str
    email: str
    pai_codigo: int
    motivo: str
    emp_nome: str
    emp_endereco: str
    emp_bairro: str
    emp_cidade: str
    emp_pai_codigo: int
    emp_est_codigo: int
    emp_estado: str
    emp_cep: str
    emp_homepage: str


@dataclass(frozen=True, slots=True)
class AccessRequestRecord:
    ppe_codigo: int
    tep_codigo: str
    email: str


@dataclass(frozen=True, slots=True)
class CountryRecord:
    pai_codigo: int
    nome: str


@dataclass(frozen=True, slots=True)
class StateRecord:
    est_codigo: int
    pai_codigo: int
    nome: str


class AccessRequestRepository(Protocol):
    def has_pending_by_email(self, email: str) -> bool:
        """Return True when an open PRE_PESSOA exists for the email."""

    def create(self, data: AccessRequestCreateData) -> AccessRequestRecord:
        """Insert a pending PRE_PESSOA row and return identifiers."""

    def list_countries(self, *, language: int) -> list[CountryRecord]:
        """Return country labels for the given language."""

    def list_states(self, *, pai_codigo: int) -> list[StateRecord]:
        """Return states for a country."""
