"""DTOs for the native follow-up system catalog."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class SistemaOutputDTO:
    codigo: int
    nome: str
    descricao: str
    ativo: bool


@dataclass(frozen=True, slots=True)
class CreateSistemaInputDTO:
    nome: str
    descricao: str = ""
    ativo: bool = True
    codigo: int | None = None


@dataclass(frozen=True, slots=True)
class UpdateSistemaInputDTO:
    codigo: int
    nome: str
    descricao: str
    ativo: bool
