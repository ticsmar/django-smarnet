"""Input/output DTOs for recebimento use cases."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class GravaFornecedorInputDTO:
    razao_soc: str
    nome_reduz: str
    endereco: str
    bairro: str
    munic: str
    cep: str
    estado: str
    cod_pais: int
    cod_fornec: int | None = None
    idioma_msg: str = "P"


@dataclass(frozen=True, slots=True)
class GravaFornecedorOutputDTO:
    cod_fornec: int
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class GravaFornecContatoInputDTO:
    cod_fornec: int
    nome: str
    cargo: str
    email: str
    telefone: str
    cod_contato: int | None = None
    idioma_msg: str = "P"


@dataclass(frozen=True, slots=True)
class GravaFornecContatoOutputDTO:
    cod_contato: int
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class FornecedorOutputDTO:
    for_codigo: int
    emp_codigo: int | None
    for_razao_soc: str | None
    for_nome_reduz: str | None
    for_endereco: str | None
    for_bairro: str | None
    for_munic: str | None
    for_cep: str | None
    for_estado: str | None
    pai_codigo: int | None
    pai_nome: str | None
    for_dt_cad: datetime | None
    for_dt_atual: datetime | None
    for_ativo: int | None


@dataclass(frozen=True, slots=True)
class ListFornecedoresInputDTO:
    search: str = ""
    ativo: int | None = None
    page: int = 1
    page_size: int = 20


@dataclass(frozen=True, slots=True)
class PaginatedFornecedoresOutputDTO:
    items: list[FornecedorOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class FornecContatoOutputDTO:
    fco_codigo: int
    for_codigo: int | None
    fco_nome: str | None
    fco_cargo: str | None
    fco_email: str | None
    fco_telefone: str | None


@dataclass(frozen=True, slots=True)
class ListFornecContatosInputDTO:
    for_codigo: int | None = None
    search: str = ""
    page: int = 1
    page_size: int = 20


@dataclass(frozen=True, slots=True)
class PaginatedFornecContatosOutputDTO:
    items: list[FornecContatoOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class MsgErroOutputDTO:
    msg_erro_bd: str
    msg_usu_port: str | None
    msg_acao_port: str | None
    msg_usu_ing: str | None
    msg_acao_ing: str | None


@dataclass(frozen=True, slots=True)
class ListMsgErrosInputDTO:
    search: str = ""
    page: int = 1
    page_size: int = 20


@dataclass(frozen=True, slots=True)
class PaginatedMsgErrosOutputDTO:
    items: list[MsgErroOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class PaisOutputDTO:
    pai_codigo: int
    pai_nome: str | None
    eti_codigo: int | None


@dataclass(frozen=True, slots=True)
class ListPaisesInputDTO:
    search: str = ""
