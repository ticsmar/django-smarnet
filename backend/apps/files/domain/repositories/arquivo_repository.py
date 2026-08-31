"""Oracle file-manager repository contracts."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class ArquivoNodeRecord:
    par_codigo: int
    par_codigo_pai: int | None
    tipo: int
    nome: str
    descricao: str | None
    tamanho: int | None
    data: datetime | None
    ace_codigo: int | None
    pasta_fixa: bool
    in_lixeira: bool


@dataclass(frozen=True, slots=True)
class ArquivoBlobRecord:
    par_codigo: int
    nome: str
    content: bytes
    tipo: int


@dataclass(frozen=True, slots=True)
class ArquivoHistoricoRecord:
    nome: str
    acao: str
    data: datetime | None
    usuario_nome: str | None


@dataclass(frozen=True, slots=True)
class CreateFolderParams:
    sistema: int
    filtro: str
    nome: str
    descricao: str
    par_codigo_pai: int | None
    ace_codigo: int | None
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class CreateFileParams:
    sistema: int
    filtro: str
    nome: str
    descricao: str
    par_codigo_pai: int | None
    ace_codigo: int | None
    usu_chapa: int
    content: bytes
    tamanho: int


@dataclass(frozen=True, slots=True)
class MoveNodeParams:
    sistema: int
    filtro: str
    par_codigo: int
    par_codigo_pai: int | None
    nome: str | None
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class TrashNodesParams:
    sistema: int
    filtro: str
    par_codigos: tuple[int, ...]
    usu_chapa: int


class ArquivoQueryRepository(Protocol):
    def list_nodes(
        self, sistema: int, filtro: str, lin_cod: int
    ) -> list[ArquivoNodeRecord]: ...

    def get_blob(
        self, sistema: int, filtro: str, par_codigo: int
    ) -> ArquivoBlobRecord | None: ...

    def list_historico(
        self, sistema: int, filtro: str
    ) -> list[ArquivoHistoricoRecord]: ...


class ArquivoRepository(Protocol):
    def create_folder(self, params: CreateFolderParams) -> int: ...

    def create_file(self, params: CreateFileParams) -> int: ...

    def move_node(self, params: MoveNodeParams) -> None: ...

    def trash_nodes(self, params: TrashNodesParams) -> None: ...
