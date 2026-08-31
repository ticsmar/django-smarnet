"""Query repository contract for SIAOS.CLIENTE and its lookup catalogs."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class ClienteListRecord:
    codigo: int
    cliente: str | None
    reduzido: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int
    bloqueado: int
    tipo: str | None
    crs_cod_letra: str | None = None
    crs_desc_longa: str | None = None
    crs_restricao: int | None = None
    crs_cores: str | None = None
    cadastro_checagem: int | None = None


@dataclass(frozen=True, slots=True)
class ClienteRecord:
    codigo: int
    origem: str | None
    cliente: str | None
    reduzido: str | None
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
    tipo: str | None
    cli_tipo: str | None
    cli_pes_tipo: str | None
    cli_contribuinte: int | None
    cli_ie_isento: int | None
    cli_cnae: str | None
    cli_cod_mun_ibge: str | None
    cli_inscr_suframa: str | None
    cli_nif: str | None
    contato: str | None
    contatotec: str | None
    contatofin: str | None
    observa: str | None
    emp_codigo: int
    bloqueado: int
    dt_atual: datetime | None
    dt_cad: datetime | None
    cli_grupo_trib: str | None = None
    aos_codigo_com: int | None = None
    aos_codigo_tec: int | None = None
    classe: str | None = None
    territorio: str | None = None
    vendedor: str | None = None
    cli_email_nfse: str | None = None
    limitecr: int | None = None
    cli_limite_crv: int | None = None
    ccontabil: str | None = None
    cli_fome_zero: int | None = None
    cli_montador: int | None = None
    flagmulta: int | None = None
    flagsuspen: int | None = None
    flagcobra: int | None = None
    vencprog: int | None = None
    zona_franca: int | None = None
    iss: int | None = None
    exportacao: int | None = None
    taxamulta: int | None = None
    desc_max: int | None = None
    obsvenc: str | None = None
    cli_reccof: str | None = None
    cli_reccsll: str | None = None
    cli_recpis: str | None = None
    mpg_codigo: int | None = None
    cli_mod_pagt: str | None = None
    cobranca: str | None = None
    entrega: str | None = None
    con_codigo_com: int | None = None
    con_codigo_tec: int | None = None
    con_codigo_fin: int | None = None
    crs_cod_protheus: str | None = None
    crs_cod_letra: str | None = None
    crs_desc: str | None = None
    crs_desc_longa: str | None = None
    crs_restricao: int | None = None
    mensagem_bloqueio: str | None = None


@dataclass(frozen=True, slots=True)
class PaginatedClientesResult:
    items: list[ClienteListRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class ClienteDocumentoMatch:
    codigo: int
    cliente: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int


@dataclass(frozen=True, slots=True)
class FuncionarioRhRecord:
    """PROTPROD.SRA010 row used by verificaFunc.php."""

    nome: str | None
    chapa: str | None
    cpf: str | None
    rg: str | None
    endereco: str | None
    municipio: str | None
    bairro: str | None
    uf: str | None
    cep: str | None
    telefone: str | None
    email: str | None


@dataclass(frozen=True, slots=True)
class ClientePaisRecord:
    pai_codigo: int
    pai_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteEstadoRecord:
    est_codigo: int
    pai_codigo: int
    est_nome: str | None
    est_sigla: str | None = None


@dataclass(frozen=True, slots=True)
class ClienteCidadeRecord:
    codigo: str
    descricao: str | None
    uf: str | None


@dataclass(frozen=True, slots=True)
class ClienteGrupoTributarioRecord:
    codigo: str
    descricao: str | None
    uf: str | None


@dataclass(frozen=True, slots=True)
class ClienteAreaOsRecord:
    aos_codigo: int
    aos_nome: str | None
    usu_chapa: int | None
    usu_nome: str | None
    qtd: int = 0
    is_default: bool = False


@dataclass(frozen=True, slots=True)
class ClienteModeloPagtRecord:
    mpg_codigo: int
    descricao: str | None
    mpg_area: str | None
    mpg_status: int | None


@dataclass(frozen=True, slots=True)
class ClienteContatoRecord:
    con_codigo: int
    codcliente: int
    nome: str | None
    depto: str | None
    cargo: str | None
    telefone: str | None
    fax: str | None
    celular: str | None
    email: str | None
    con_ativo: int | None


@dataclass(frozen=True, slots=True)
class ClienteCobrancaRecord:
    codigo: int
    chavecobra: str
    nome: str | None
    endereco1: str | None
    endereco2: str | None
    endereco3: str | None
    cob_bairro: str | None
    cidade: str | None
    estado: str | None
    est_nome: str | None
    cep: str | None
    pais: str | None
    pais_nome: str | None
    contato: str | None
    telefone1: str | None
    telefone2: str | None
    e_mail: str | None
    ativo: int | None
    cli_codigo_ref: int | None
    is_padrao: bool = False


@dataclass(frozen=True, slots=True)
class ClienteEmbarqueRecord:
    codigo: int
    chave_emb: str
    nome: str | None
    endereco1: str | None
    endereco2: str | None
    endereco3: str | None
    emb_bairro: str | None
    cidade: str | None
    estado: str | None
    est_nome: str | None
    cep: str | None
    pais: str | None
    pais_nome: str | None
    contato: str | None
    telefone1: str | None
    telefone2: str | None
    e_mail: str | None
    ativo: int | None
    cli_codigo_ref: int | None
    is_padrao: bool = False


@dataclass(frozen=True, slots=True)
class ClienteLogRecord:
    codigo: int
    lcl_data: datetime | None
    data_txt: str | None
    usu_chapa: int | None
    usu_nome: str | None
    lcl_texto: str | None


@dataclass(frozen=True, slots=True)
class ClienteOrigemRecord:
    origem: str
    descricao: str | None


@dataclass(frozen=True, slots=True)
class ClienteArclassRecord:
    class_key: str
    descr: str | None


@dataclass(frozen=True, slots=True)
class ClienteArlevelRecord:
    terr_key: str
    description: str | None


@dataclass(frozen=True, slots=True)
class ClienteArsalespRecord:
    salesp_key: str
    nome: str | None
    emp_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteRiscoRecord:
    codigo: int  # CRS_COD_SIAOS (= CLIENTE.BLOQUEADO)
    letra: str | None
    desc: str | None
    desc_longa: str | None
    restricao: int | None


class ClienteQueryRepository(Protocol):
    def list_clientes(
        self,
        *,
        actor_owner: int,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedClientesResult:
        """Return a paginated list of clientes in the actor's empresa scope."""

    def get_cliente(
        self,
        *,
        actor_owner: int,
        codigo: int,
    ) -> ClienteRecord | None:
        """Return a cliente by code within the actor's empresa scope.

        Includes ``BLOQUEADO=2`` (duplicate/invalid) so a CNPJ hit can open
        the existing cadastro. Does not call ``SF_VALIDA_CONS_CLIENTE``.
        Listagem still hides those rows.
        """

    def get_cliente_emp_codigo(self, codigo: int) -> int | None:
        """Return the raw EMP_CODIGO of a cliente without applying the scope filter."""

    def find_by_documento(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        """Search CLIENTE.CGC within the actor's scope.

        ``digits`` is the mask-stripped document (CPF digits or 14-char CNPJ,
        letters allowed). CNPJ matches the legado LPAD/TRANSLATE equality so a
        leading zero in ``02.596.588/0001-13`` still finds ``2596588000113``.
        """

    def find_by_cnpj(
        self,
        *,
        actor_owner: int,
        cnpj: str,
    ) -> list[ClienteDocumentoMatch]:
        """Find SIAOS.CLIENTE by CNPJ (mask-stripped), scoped by empresa.

        Used by the new-customer wizard before any ReceitaWS call. Does not
        apply ``SF_VALIDA_CONS_CLIENTE`` or hide ``BLOQUEADO=2``.
        """

    def find_by_cpf(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        """Find SIAOS.CLIENTE by CPF digits, scoped by empresa.

        Used by the funcionário wizard (verificaFunc.php). Does not apply
        ``SF_VALIDA_CONS_CLIENTE`` or hide ``BLOQUEADO=2``.
        """

    def find_funcionario_rh(self, *, digits: str) -> FuncionarioRhRecord | None:
        """Return the first PROTPROD.SRA010 row for the CPF, or None."""

    def list_paises(self) -> list[ClientePaisRecord]:
        """Return countries used by the customer form."""

    def list_estados(self, *, pai_codigo: int | None) -> list[ClienteEstadoRecord]:
        """Return states, optionally scoped to a country."""

    def find_estado_by_sigla(
        self, *, sigla: str, pai_codigo: int = 76
    ) -> ClienteEstadoRecord | None:
        """Resolve GERAL.ESTADO by EST_SIGLA (getCEP.php)."""

    def list_origens(self) -> list[ClienteOrigemRecord]:
        """Return active SIAOS.ORIGEM rows (ORI_STATUS = 1)."""

    def list_arclasses(self) -> list[ClienteArclassRecord]:
        """Return active SIAOS.ARCLASS rows (Segmento / CLIENTE.CLASSE)."""

    def list_arlevels(self) -> list[ClienteArlevelRecord]:
        """Return active SIAOS.ARLEVEL rows (Vendedor Área / CLIENTE.TERRITORIO)."""

    def list_arsalesps(self) -> list[ClienteArsalespRecord]:
        """Return active SIAOS.ARSALESP rows (Vendedor / CLIENTE.VENDEDOR).

        Nome: ``USUARIO.USU_NOME`` when present, else ``SALESPERSON``.
        Empresa: ``GERAL.EMPRESA.EMP_NOME``, fallback ``NOVA SMAR S/A``.
        """

    def list_riscos(self) -> list[ClienteRiscoRecord]:
        """Return INTEGRACAO.CLIENTE_RISCO rows ordered by CRS_DESC."""

    def get_risco(self, codigo: int) -> ClienteRiscoRecord | None:
        """Return INTEGRACAO.CLIENTE_RISCO by CRS_COD_SIAOS (= BLOQUEADO), or None."""

    def get_empresa_tipo(self, emp_codigo: int | None) -> str | None:
        """Return GERAL.EMPRESA.EMP_TIPO for the actor's company (hide finan if C)."""

    def list_cidades(
        self, *, pai_codigo: int | None, est_codigo: int | None
    ) -> list[ClienteCidadeRecord]:
        """IBGE cities (PROTPROD.CC2010) for a Brazilian UF."""

    def list_grupos_tributarios(
        self, *, est_codigo: int | None, cli_tipo: str | None
    ) -> list[ClienteGrupoTributarioRecord]:
        """PROTPROD.SF7010 groups for UF + CLI_TIPO."""

    def list_areas_os(
        self,
        *,
        tipo_area: str,
        mun_ibge: str | None,
        est_codigo: int | None,
        pai_codigo: int | None,
        current_codigo: int | None,
    ) -> list[ClienteAreaOsRecord]:
        """SIAOS.AREA_OS (C comercial / E técnica) with areaOSDefaul counts."""

    def list_modelos_pagto(
        self,
        *,
        origem: str | None,
        mpg_codigo: int | None,
        risco_protheus: str | None,
        unrestricted: bool,
    ) -> list[ClienteModeloPagtRecord]:
        """SIAOS.MODELO_PAGT filtered like modeloPagPorRisco()."""

    def list_contatos(self, *, codigo: int, search: str) -> list[ClienteContatoRecord]:
        """SIAOS.CONTATOS for a cliente."""

    def list_cobrancas(self, *, codigo: int) -> list[ClienteCobrancaRecord]:
        """SIAOS.COBRANCA rows for a cliente."""

    def list_embarques(self, *, codigo: int) -> list[ClienteEmbarqueRecord]:
        """SIAOS.EMBARQUE rows for a cliente."""

    def list_logs(self, *, codigo: int) -> list[ClienteLogRecord]:
        """SIAOS.LOG_CLIENTE + USUARIO.USU_NOME, newest first."""
