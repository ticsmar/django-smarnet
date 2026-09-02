"""Write repository contract for SIAOS.CLIENTE Oracle procedures."""

from dataclasses import dataclass
from decimal import Decimal
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
    cli_tipo: str | None = None
    aos_codigo_com: int | None = None
    aos_codigo_tec: int | None = None
    cli_grupo_trib: str | None = None
    classe: str | None = None
    mpg_codigo: int | None = None
    cli_mod_pagt: str | None = None
    cli_email_nfse: str | None = None
    territorio: str | None = None
    vendedor: str | None = None


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


@dataclass(frozen=True, slots=True)
class GravaClienteDadosFinanParams:
    codigo: int
    flagsuspen: int
    flagcobra: int
    flagmulta: int
    vencprog: int
    zona_franca: int
    iss: int
    exportacao: int
    limitecr: int | None
    taxamulta: int | None
    desc_max: int | None
    ccontabil: str | None
    obsvenc: str | None
    cli_limite_crv: int | None
    cli_fome_zero: int | None
    cli_montador: int | None
    cli_reccof: str | None
    cli_reccsll: str | None
    cli_recpis: str | None
    mpg_codigo: int | None
    cli_mod_pagt: str | None
    cli_inscr_suframa: str | None
    cli_cnae: str | None
    cli_nif: str | None
    cli_pes_tipo: str | None
    cli_grupo_trib: str | None
    apply_limites: bool


@dataclass(frozen=True, slots=True)
class GravaClienteContatoParams:
    codigo: int
    con_codigo: int | None
    nome: str
    nome_old: str | None
    depto: str | None
    cargo: str | None
    telefone: str | None
    fax: str | None
    celular: str | None
    email: str | None
    con_ativo: int
    tipo_cadastro: TipoCadastro


@dataclass(frozen=True, slots=True)
class GravaClienteContatoResult:
    con_codigo: int | None


@dataclass(frozen=True, slots=True)
class SetClienteContatoPadraoParams:
    codigo: int
    con_codigo_com: int | None
    con_codigo_tec: int | None
    con_codigo_fin: int | None


@dataclass(frozen=True, slots=True)
class GravaClienteCobrancaParams:
    codigo: int
    chavecobra: str | None
    ativo: int
    cli_codigo_ref: int
    tipo_cadastro: Literal["I", "A", "E"]


@dataclass(frozen=True, slots=True)
class GravaClienteEmbarqueParams:
    codigo: int
    chave_emb: str | None
    ativo: int
    cli_codigo_ref: int
    tipo_cadastro: Literal["I", "A", "E"]


@dataclass(frozen=True, slots=True)
class SetClienteEnderecoPadraoParams:
    codigo: int
    chave: str


@dataclass(frozen=True, slots=True)
class GravaClienteObsParams:
    codigo: int
    observa: str | None


class ClienteRepository(Protocol):
    def grava_dados_gerais(
        self, params: GravaClienteDadosGeraisParams
    ) -> GravaClienteDadosGeraisResult:
        """Call SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS."""

    def set_cli_grupo_trib(self, *, codigo: int, cli_grupo_trib: str | None) -> None:
        """UPDATE SIAOS.CLIENTE.CLI_GRUPO_TRIB (package does not persist it)."""

    def grava_dados_finan(self, params: GravaClienteDadosFinanParams) -> None:
        """Call SP_ATUALIZA_DADOS_FINAN and overlay extra finan columns."""

    def grava_contato(
        self, params: GravaClienteContatoParams
    ) -> GravaClienteContatoResult:
        """Call SP_ATUALIZA_CONTATO (IN OUT con_codigo)."""

    def set_contato_padrao(self, params: SetClienteContatoPadraoParams) -> None:
        """Call SP_UPDATE_CONTATO_CLIENTE."""

    def grava_cobranca(self, params: GravaClienteCobrancaParams) -> None:
        """Call SP_ATUALIZA_COBRANCA2."""

    def set_cobranca_padrao(self, params: SetClienteEnderecoPadraoParams) -> None:
        """UPDATE SIAOS.CLIENTE.COBRANCA (grava_dados.php cadastro=10)."""

    def grava_embarque(self, params: GravaClienteEmbarqueParams) -> None:
        """Call SP_ATUALIZA_EMBARQUE2."""

    def set_embarque_padrao(self, params: SetClienteEnderecoPadraoParams) -> None:
        """UPDATE SIAOS.CLIENTE.ENTREGA (grava_dados.php cadastro=10)."""

    def grava_obs(self, params: GravaClienteObsParams) -> None:
        """Call SP_ATUALIZA_OBS."""

    def grava_bloqueio(
        self, *, codigo: int, bloqueado: int, mensagem_bloqueio: str | None
    ) -> None:
        """UPDATE SIAOS.CLIENTE BLOQUEADO (= CRS_COD_SIAOS) and MENSAGEM_BLOQUEIO."""

    def grava_limites(
        self,
        *,
        codigo: int,
        limitecr: Decimal | None,
        cli_limite_crv: Decimal | None,
    ) -> None:
        """UPDATE SIAOS.CLIENTE LIMITECR and CLI_LIMITE_CRV (estCli cadastros)."""

    def read_emp_codigo(self, codigo: int) -> int | None:
        """Return the raw EMP_CODIGO of the given cliente (no scope filter)."""

    def set_emp_codigo(self, *, codigo: int, emp_codigo: int) -> None:
        """UPDATE SIAOS.CLIENTE SET EMP_CODIGO = :emp WHERE CODIGO = :codigo."""

    def create_from_funcionario(
        self, params: CreateClienteFromFuncionarioParams
    ) -> CreateClienteFromFuncionarioResult:
        """Call INTEGRACAO.SP_FUNC2CLIENTE(cnpj, :n_codigo)."""
