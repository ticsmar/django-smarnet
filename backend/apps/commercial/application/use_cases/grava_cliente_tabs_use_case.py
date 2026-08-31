"""Write use cases for cliente tabs (financeiro, filhos, obs)."""

from dataclasses import dataclass
from typing import Literal

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.repositories.cliente_repository import (
    ClienteRepository,
    GravaClienteCobrancaParams,
    GravaClienteContatoParams,
    GravaClienteContatoResult,
    GravaClienteDadosFinanParams,
    GravaClienteEmbarqueParams,
    GravaClienteObsParams,
    SetClienteContatoPadraoParams,
    SetClienteEnderecoPadraoParams,
)
from apps.commercial.domain.services.empresa_ownership import can_edit_customer

CadastroIEA = Literal["I", "A", "E"]


def _assert_can_edit(
    query: ClienteQueryRepository,
    *,
    actor: ActorContextDTO,
    codigo: int,
) -> None:
    if actor.usu_chapa is None:
        raise ClienteForbiddenError("Actor without USU_CHAPA cannot write clientes.")
    current_emp = query.get_cliente_emp_codigo(codigo)
    if not can_edit_customer(
        actor_link_emp=actor.link_emp_codigo, cliente_emp=current_emp
    ):
        raise ClienteForbiddenError(
            f"Cliente '{codigo}' is out of the actor's empresa scope."
        )


@dataclass(frozen=True, slots=True)
class GravaClienteDadosFinanInputDTO:
    actor: ActorContextDTO
    codigo: int
    flagsuspen: int = 0
    flagcobra: int = 0
    flagmulta: int = 0
    vencprog: int = 0
    zona_franca: int = 0
    iss: int = 0
    exportacao: int = 0
    limitecr: int | None = None
    taxamulta: int | None = None
    desc_max: int | None = None
    ccontabil: str | None = None
    obsvenc: str | None = None
    cli_limite_crv: int | None = None
    cli_fome_zero: int | None = None
    cli_montador: int | None = None
    cli_reccof: str | None = None
    cli_reccsll: str | None = None
    cli_recpis: str | None = None
    mpg_codigo: int | None = None
    cli_mod_pagt: str | None = None
    cli_inscr_suframa: str | None = None
    cli_cnae: str | None = None
    cli_nif: str | None = None
    cli_pes_tipo: str | None = None
    cli_grupo_trib: str | None = None
    apply_limites: bool = False


class GravaClienteDadosFinanUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteDadosFinanInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.grava_dados_finan(
            GravaClienteDadosFinanParams(
                codigo=input_dto.codigo,
                flagsuspen=input_dto.flagsuspen,
                flagcobra=input_dto.flagcobra,
                flagmulta=input_dto.flagmulta,
                vencprog=input_dto.vencprog,
                zona_franca=input_dto.zona_franca,
                iss=input_dto.iss,
                exportacao=input_dto.exportacao,
                limitecr=input_dto.limitecr,
                taxamulta=input_dto.taxamulta,
                desc_max=input_dto.desc_max,
                ccontabil=input_dto.ccontabil,
                obsvenc=input_dto.obsvenc,
                cli_limite_crv=input_dto.cli_limite_crv,
                cli_fome_zero=input_dto.cli_fome_zero,
                cli_montador=input_dto.cli_montador,
                cli_reccof=input_dto.cli_reccof,
                cli_reccsll=input_dto.cli_reccsll,
                cli_recpis=input_dto.cli_recpis,
                mpg_codigo=input_dto.mpg_codigo,
                cli_mod_pagt=input_dto.cli_mod_pagt,
                cli_inscr_suframa=input_dto.cli_inscr_suframa,
                cli_cnae=input_dto.cli_cnae,
                cli_nif=input_dto.cli_nif,
                cli_pes_tipo=input_dto.cli_pes_tipo,
                cli_grupo_trib=input_dto.cli_grupo_trib,
                apply_limites=input_dto.apply_limites,
            )
        )


@dataclass(frozen=True, slots=True)
class GravaClienteContatoInputDTO:
    actor: ActorContextDTO
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
    tipo_cadastro: Literal["I", "A"]


class GravaClienteContatoUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(
        self, input_dto: GravaClienteContatoInputDTO
    ) -> GravaClienteContatoResult:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        return self._repository.grava_contato(
            GravaClienteContatoParams(
                codigo=input_dto.codigo,
                con_codigo=input_dto.con_codigo,
                nome=input_dto.nome,
                nome_old=input_dto.nome_old,
                depto=input_dto.depto,
                cargo=input_dto.cargo,
                telefone=input_dto.telefone,
                fax=input_dto.fax,
                celular=input_dto.celular,
                email=input_dto.email,
                con_ativo=input_dto.con_ativo,
                tipo_cadastro=input_dto.tipo_cadastro,
            )
        )


@dataclass(frozen=True, slots=True)
class SetClienteContatoPadraoInputDTO:
    actor: ActorContextDTO
    codigo: int
    con_codigo_com: int | None
    con_codigo_tec: int | None
    con_codigo_fin: int | None


class SetClienteContatoPadraoUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: SetClienteContatoPadraoInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.set_contato_padrao(
            SetClienteContatoPadraoParams(
                codigo=input_dto.codigo,
                con_codigo_com=input_dto.con_codigo_com,
                con_codigo_tec=input_dto.con_codigo_tec,
                con_codigo_fin=input_dto.con_codigo_fin,
            )
        )


@dataclass(frozen=True, slots=True)
class GravaClienteCobrancaInputDTO:
    actor: ActorContextDTO
    codigo: int
    chavecobra: str | None
    ativo: int
    cli_codigo_ref: int
    tipo_cadastro: CadastroIEA


class GravaClienteCobrancaUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteCobrancaInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.grava_cobranca(
            GravaClienteCobrancaParams(
                codigo=input_dto.codigo,
                chavecobra=input_dto.chavecobra,
                ativo=input_dto.ativo,
                cli_codigo_ref=input_dto.cli_codigo_ref,
                tipo_cadastro=input_dto.tipo_cadastro,
            )
        )


@dataclass(frozen=True, slots=True)
class GravaClienteEmbarqueInputDTO:
    actor: ActorContextDTO
    codigo: int
    chave_emb: str | None
    ativo: int
    cli_codigo_ref: int
    tipo_cadastro: CadastroIEA


class GravaClienteEmbarqueUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteEmbarqueInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.grava_embarque(
            GravaClienteEmbarqueParams(
                codigo=input_dto.codigo,
                chave_emb=input_dto.chave_emb,
                ativo=input_dto.ativo,
                cli_codigo_ref=input_dto.cli_codigo_ref,
                tipo_cadastro=input_dto.tipo_cadastro,
            )
        )


@dataclass(frozen=True, slots=True)
class SetClienteEnderecoPadraoInputDTO:
    actor: ActorContextDTO
    codigo: int
    chave: str
    kind: str


class SetClienteEnderecoPadraoUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: SetClienteEnderecoPadraoInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        params = SetClienteEnderecoPadraoParams(
            codigo=input_dto.codigo, chave=input_dto.chave
        )
        if input_dto.kind == "embarque":
            self._repository.set_embarque_padrao(params)
            return
        self._repository.set_cobranca_padrao(params)


@dataclass(frozen=True, slots=True)
class GravaClienteObsInputDTO:
    actor: ActorContextDTO
    codigo: int
    observa: str | None


class GravaClienteObsUseCase:
    def __init__(
        self, repository: ClienteRepository, query_repository: ClienteQueryRepository
    ) -> None:
        self._repository = repository
        self._query = query_repository

    def execute(self, input_dto: GravaClienteObsInputDTO) -> None:
        _assert_can_edit(self._query, actor=input_dto.actor, codigo=input_dto.codigo)
        self._repository.grava_obs(
            GravaClienteObsParams(codigo=input_dto.codigo, observa=input_dto.observa)
        )
