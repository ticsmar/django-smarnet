"""Write repository contract for SIAOS.CLIENTE Oracle procedures."""

from dataclasses import dataclass
from typing import Literal, Protocol

TipoCadastro = Literal["I", "A"]


@dataclass(frozen=True, slots=True)
class GravaClienteDadosGeraisParams:
    codigo: int | None
    tipo_cadastro: TipoCadastro
    cliente: str
    reduzido: str | None
    tipo: str
    origem: str | None
    endereco1: str | None
    endereco2: str | None
    endereco3: str | None
    cli_bairro: str | None
    cidade: str | None
    estado: str | None
    cep: str | None
    pais: str | None
    pai_codigo: int | None
    est_codigo: int | None
    telefone1: str | None
    telefone2: str | None
    fax: str | None
    email: str | None
    homepage: str | None
    cgc: str | None
    inscr_est: str | None
    cli_inscr_mun: str | None
    cli_ie_isento: int
    cli_contribuinte: int
    cli_cnae: str | None
    cli_cod_mun_ibge: str | None
    cli_inscr_suframa: str | None
    cli_nif: str | None
    cli_pes_tipo: str | None
    contato: str | None
    contatotec: str | None
    contatofin: str | None
    observa: str | None
    usu_chapa: int
    idioma_msg: str = "P"


@dataclass(frozen=True, slots=True)
class GravaClienteDadosGeraisResult:
    codigo: int | None
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class CreateClienteFromFuncionarioParams:
    cnpj_or_cpf: str
    usu_chapa: int


@dataclass(frozen=True, slots=True)
class CreateClienteFromFuncionarioResult:
    codigo: int | None


class ClienteRepository(Protocol):
    def grava_dados_gerais(
        self, params: GravaClienteDadosGeraisParams
    ) -> GravaClienteDadosGeraisResult:
        """Call SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS (cadastro==9)."""

    def read_emp_codigo(self, codigo: int) -> int | None:
        """Return the raw EMP_CODIGO of the given cliente (no scope filter)."""

    def set_emp_codigo(self, *, codigo: int, emp_codigo: int) -> None:
        """UPDATE SIAOS.CLIENTE SET EMP_CODIGO = :emp WHERE CODIGO = :codigo."""

    def create_from_funcionario(
        self, params: CreateClienteFromFuncionarioParams
    ) -> CreateClienteFromFuncionarioResult:
        """Call INTEGRACAO.SP_FUNC2CLIENTE(cnpj, :n_codigo)."""
