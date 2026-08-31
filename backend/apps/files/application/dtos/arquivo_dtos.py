"""DTOs for Oracle file-manager operations."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class ArquivoScopeDTO:
    sistema: int
    filtro: str
    lin_cod: int = 1
    usu_chapa: int = 0


@dataclass(frozen=True, slots=True)
class ArquivoNodeOutputDTO:
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
class ArquivoTreeOutputDTO:
    sistema: int
    filtro: str
    root_label: str
    nodes: list[ArquivoNodeOutputDTO]


@dataclass(frozen=True, slots=True)
class CreateFolderInputDTO:
    sistema: int
    filtro: str
    nome: str
    descricao: str
    par_codigo_pai: int | None
    ace_codigo: int | None
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class UploadFileInputDTO:
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
class MoveNodeInputDTO:
    sistema: int
    filtro: str
    par_codigo: int
    par_codigo_pai: int | None
    nome: str | None
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class TrashNodesInputDTO:
    sistema: int
    filtro: str
    par_codigos: tuple[int, ...]
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class DownloadFileInputDTO:
    sistema: int
    filtro: str
    par_codigo: int


@dataclass(frozen=True, slots=True)
class DownloadFileOutputDTO:
    nome: str
    content: bytes


@dataclass(frozen=True, slots=True)
class HistoricoItemOutputDTO:
    usuario_nome: str | None
    acao: str
    nome: str
    data: datetime | None
