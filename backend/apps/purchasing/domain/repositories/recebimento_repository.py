"""Recebimento Oracle procedure repository contract."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class GravaFornecedorResult:
    cod_fornec: int | None
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class GravaFornecContatoResult:
    cod_contato: int | None
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class GravaFornecedorParams:
    cod_fornec: int | None
    razao_soc: str
    nome_reduz: str
    endereco: str
    bairro: str
    munic: str
    cep: str
    estado: str
    cod_pais: int
    idioma_msg: str


@dataclass(frozen=True, slots=True)
class GravaFornecContatoParams:
    cod_contato: int | None
    cod_fornec: int
    nome: str
    cargo: str
    email: str
    telefone: str
    idioma_msg: str


class RecebimentoRepository(Protocol):
    def grava_fornecedor(self, params: GravaFornecedorParams) -> GravaFornecedorResult:
        """Call SP_GRAVA_FORNECEDOR."""

    def ativa_fornecedor(self, cod_fornec: int) -> None:
        """Call SP_ATIVA_FORNECEDOR."""

    def inativa_fornecedor(self, cod_fornec: int) -> None:
        """Call SP_INATIVA_FORNECEDOR."""

    def grava_fornec_contato(
        self, params: GravaFornecContatoParams
    ) -> GravaFornecContatoResult:
        """Call SP_GRAVA_FORNEC_CONTATO."""

    def exclui_fornec_contato(self, cod_contato: int) -> None:
        """Call SP_EXCLUI_FORNEC_CONTATO."""
