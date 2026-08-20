"""DTOs for public access-request creation."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class CreateAccessRequestInputDTO:
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
    emp_homepage: str = ""


@dataclass(frozen=True, slots=True)
class AccessRequestOutputDTO:
    ppe_codigo: int
    tep_codigo: str
    email: str


@dataclass(frozen=True, slots=True)
class CountryOutputDTO:
    pai_codigo: int
    nome: str


@dataclass(frozen=True, slots=True)
class StateOutputDTO:
    est_codigo: int
    pai_codigo: int
    nome: str
