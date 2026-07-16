"""Read/query repository contract for NOVASMAR recebimento tables."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class FornecedorRecord:
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
class PaisRecord:
    pai_codigo: int
    pai_nome: str | None
    eti_codigo: int | None


@dataclass(frozen=True, slots=True)
class FornecContatoRecord:
    fco_codigo: int
    for_codigo: int | None
    fco_nome: str | None
    fco_cargo: str | None
    fco_email: str | None
    fco_telefone: str | None


@dataclass(frozen=True, slots=True)
class MsgErroRecord:
    msg_erro_bd: str
    msg_usu_port: str | None
    msg_acao_port: str | None
    msg_usu_ing: str | None
    msg_acao_ing: str | None


@dataclass(frozen=True, slots=True)
class PaginatedFornecedoresResult:
    items: list[FornecedorRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class PaginatedFornecContatosResult:
    items: list[FornecContatoRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class PaginatedMsgErrosResult:
    items: list[MsgErroRecord]
    total: int
    page: int
    page_size: int


class RecebimentoQueryRepository(Protocol):
    def get_fornecedor(self, cod_fornec: int) -> FornecedorRecord | None:
        """Return a fornecedor by code, or None."""

    def list_fornecedores(
        self,
        *,
        search: str,
        ativo: int | None,
        page: int,
        page_size: int,
    ) -> PaginatedFornecedoresResult:
        """Return a paginated list of fornecedores."""

    def get_fornec_contato(self, cod_contato: int) -> FornecContatoRecord | None:
        """Return a contato by code, or None."""

    def list_fornec_contatos(
        self,
        *,
        for_codigo: int | None,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedFornecContatosResult:
        """Return a paginated list of contatos."""

    def list_msg_erros(
        self,
        *,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedMsgErrosResult:
        """Return a paginated list of msg_erro rows."""

    def get_pais(self, pai_codigo: int) -> PaisRecord | None:
        """Return a pais by code, or None."""

    def list_paises(self, *, search: str) -> list[PaisRecord]:
        """Return all paises, optionally filtered by name."""
