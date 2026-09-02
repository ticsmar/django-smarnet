"""Sistema catalog repository contract (native Django)."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class SistemaRecord:
    codigo: int
    nome: str
    descricao: str
    ativo: bool


class SistemaRepository(Protocol):
    def list_all(self) -> list[SistemaRecord]: ...

    def get_by_codigo(self, codigo: int) -> SistemaRecord | None: ...

    def exists_codigo(self, codigo: int) -> bool: ...

    def max_codigo(self) -> int: ...

    def create(
        self, codigo: int, nome: str, descricao: str, ativo: bool
    ) -> SistemaRecord: ...

    def update(
        self, codigo: int, nome: str, descricao: str, ativo: bool
    ) -> SistemaRecord: ...
