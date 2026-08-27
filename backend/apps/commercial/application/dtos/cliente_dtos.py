"""Input/output DTOs for cliente use cases."""

from dataclasses import dataclass
from datetime import datetime
from typing import Literal

from apps.commercial.domain.actor_context import ActorContext

TipoCadastroOp = Literal["J", "F", "FUNC", "I"]


@dataclass(frozen=True, slots=True)
class ActorContextDTO:
    """Actor context resolved from the Django username."""

    username: str
    usu_chapa: int | None
    link_emp_codigo: int | None
    owner_emp_codigo: int


def actor_dto_from_domain(actor: ActorContext) -> ActorContextDTO:
    """Map domain ActorContext to application DTO (chapa 0 → None)."""
    return ActorContextDTO(
        username=actor.username,
        usu_chapa=actor.usu_chapa if actor.usu_chapa else None,
        link_emp_codigo=actor.link_emp_codigo,
        owner_emp_codigo=actor.owner_emp_codigo,
    )


@dataclass(frozen=True, slots=True)
class ListClientesInputDTO:
    actor: ActorContextDTO
    search: str = ""
    page: int = 1
    page_size: int = 20


@dataclass(frozen=True, slots=True)
class ClienteListItemOutputDTO:
    codigo: int
    cliente: str | None
    reduzido: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int
    bloqueado: int
    tipo: str | None
    can_edit: bool
    crs_cod_letra: str | None = None
    crs_desc_longa: str | None = None
    crs_restricao: int | None = None
    crs_cores: str | None = None
    cadastro_checagem: int | None = None


@dataclass(frozen=True, slots=True)
class PaginatedClientesOutputDTO:
    items: list[ClienteListItemOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class GetClienteInputDTO:
    actor: ActorContextDTO
    codigo: int


@dataclass(frozen=True, slots=True)
class ClienteDetailOutputDTO:
    codigo: int
    origem: str | None
    cliente: str | None
    reduzido: str | None
    tipo: str | None
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
    can_edit: bool
    show_financeiro: bool = True
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
class GravaClienteDadosGeraisInputDTO:
    actor: ActorContextDTO
    codigo: int | None
    tipo_cadastro: TipoCadastroOp
    cliente: str
    reduzido: str | None = None
    endereco1: str | None = None
    endereco2: str | None = None
    endereco3: str | None = None
    cli_bairro: str | None = None
    cidade: str | None = None
    estado: str | None = None
    cep: str | None = None
    pais: str | None = None
    pai_codigo: int | None = None
    est_codigo: int | None = None
    telefone1: str | None = None
    telefone2: str | None = None
    fax: str | None = None
    email: str | None = None
    homepage: str | None = None
    cgc: str | None = None
    inscr_est: str | None = None
    cli_inscr_mun: str | None = None
    cli_ie_isento: int = 0
    cli_contribuinte: int = 2
    cli_cnae: str | None = None
    cli_cod_mun_ibge: str | None = None
    cli_inscr_suframa: str | None = None
    cli_nif: str | None = None
    cli_pes_tipo: str | None = None
    origem: str | None = None
    contato: str | None = None
    contatotec: str | None = None
    contatofin: str | None = None
    observa: str | None = None
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
class GravaClienteDadosGeraisOutputDTO:
    codigo: int
    tipo_msg: str | None
    msg: str | None
    acao: str | None


@dataclass(frozen=True, slots=True)
class CreateClienteFromFuncionarioInputDTO:
    actor: ActorContextDTO
    cnpj_or_cpf: str


@dataclass(frozen=True, slots=True)
class CreateClienteFromFuncionarioOutputDTO:
    codigo: int


@dataclass(frozen=True, slots=True)
class LookupClienteDocumentoInputDTO:
    actor: ActorContextDTO
    documento: str


@dataclass(frozen=True, slots=True)
class ClienteDocumentoMatchOutputDTO:
    codigo: int
    cliente: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int


@dataclass(frozen=True, slots=True)
class ClienteDocumentoCopyPayloadDTO:
    """Safe copy payload — never carries codigo, emp_codigo, bloqueado or financials."""

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
    cli_ie_isento: int | None
    cli_contribuinte: int | None
    cli_cnae: str | None
    cli_cod_mun_ibge: str | None
    cli_inscr_suframa: str | None
    cli_nif: str | None
    cli_pes_tipo: str | None
    tipo: str | None
    origem: str | None


@dataclass(frozen=True, slots=True)
class LookupClienteDocumentoOutputDTO:
    matches: list[ClienteDocumentoMatchOutputDTO]
    copy_fields: ClienteDocumentoCopyPayloadDTO | None


@dataclass(frozen=True, slots=True)
class ConsultaCnpjInputDTO:
    actor: ActorContextDTO
    cnpj: str


@dataclass(frozen=True, slots=True)
class CnpjReceitaOutputDTO:
    """Display payload for the CNPJ wizard (verificaCNPJ.php)."""

    nome: str | None
    fantasia: str | None
    cnpj: str | None
    logradouro: str | None
    numero: str | None
    complemento: str | None
    bairro: str | None
    uf: str | None
    est_codigo: int | None
    municipio: str | None
    municipio_ibge: str | None
    cep: str | None
    situacao: str | None
    data_situacao: str | None
    telefone: str | None
    telefone2: str | None
    email: str | None
    natureza_juridica: str | None
    abertura: str | None
    ultima_atualizacao: str | None
    tipo: str | None
    status: str | None
    efr: str | None
    motivo_situacao: str | None
    situacao_especial: str | None
    data_situacao_especial: str | None
    capital_social: str | None
    atividade_principal: list[str]
    atividades_secundarias: list[str]
    qsa: list[str]
    fonte: str


@dataclass(frozen=True, slots=True)
class ConsultaCnpjOutputDTO:
    cnpj: str
    already_registered: bool
    can_discard: bool
    can_copy: bool
    matches: list[ClienteDocumentoMatchOutputDTO]
    copy_fields: ClienteDocumentoCopyPayloadDTO | None
    receita: CnpjReceitaOutputDTO | None
    message: str | None


@dataclass(frozen=True, slots=True)
class ConsultaFuncionarioInputDTO:
    actor: ActorContextDTO
    cpf: str


@dataclass(frozen=True, slots=True)
class FuncionarioRhOutputDTO:
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
class ConsultaFuncionarioOutputDTO:
    cpf: str
    already_registered: bool
    can_copy: bool
    matches: list[ClienteDocumentoMatchOutputDTO]
    funcionario: FuncionarioRhOutputDTO | None
    message: str | None


@dataclass(frozen=True, slots=True)
class ClientePaisOutputDTO:
    pai_codigo: int
    pai_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteEstadoOutputDTO:
    est_codigo: int
    pai_codigo: int
    est_nome: str | None
    est_sigla: str | None = None


@dataclass(frozen=True, slots=True)
class ClienteCidadeOutputDTO:
    codigo: str
    descricao: str | None
    uf: str | None


@dataclass(frozen=True, slots=True)
class ClienteGrupoTributarioOutputDTO:
    codigo: str
    descricao: str | None
    uf: str | None
    is_default: bool = False


@dataclass(frozen=True, slots=True)
class ClienteAreaOsOutputDTO:
    aos_codigo: int
    aos_nome: str | None
    usu_chapa: int | None
    usu_nome: str | None
    qtd: int
    is_default: bool


@dataclass(frozen=True, slots=True)
class ClienteModeloPagtOutputDTO:
    mpg_codigo: int
    descricao: str | None
    mpg_area: str | None
    mpg_status: int | None


@dataclass(frozen=True, slots=True)
class ClienteContatoOutputDTO:
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
    is_comercial: bool = False
    is_tecnico: bool = False
    is_financeiro: bool = False


@dataclass(frozen=True, slots=True)
class ClienteCobrancaOutputDTO:
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
class ClienteEmbarqueOutputDTO:
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
class ClienteLogOutputDTO:
    codigo: int
    lcl_data: datetime | None
    data_txt: str | None
    usu_chapa: int | None
    usu_nome: str | None
    lcl_texto: str | None


@dataclass(frozen=True, slots=True)
class ClienteOrigemOutputDTO:
    origem: str
    descricao: str | None


@dataclass(frozen=True, slots=True)
class ClienteArclassOutputDTO:
    class_key: str
    descr: str | None


@dataclass(frozen=True, slots=True)
class ClienteArlevelOutputDTO:
    terr_key: str
    description: str | None


@dataclass(frozen=True, slots=True)
class ClienteArsalespOutputDTO:
    salesp_key: str
    nome: str | None
    emp_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteRiscoOutputDTO:
    codigo: int  # CRS_COD_SIAOS (= CLIENTE.BLOQUEADO)
    letra: str | None
    desc: str | None
    desc_longa: str | None
    restricao: int | None


@dataclass(frozen=True, slots=True)
class ListClienteCatalogsInputDTO:
    actor: ActorContextDTO
    pai_codigo: int | None = None


@dataclass(frozen=True, slots=True)
class ListClienteCatalogsOutputDTO:
    paises: list[ClientePaisOutputDTO]
    estados: list[ClienteEstadoOutputDTO]
    origens: list[ClienteOrigemOutputDTO]
