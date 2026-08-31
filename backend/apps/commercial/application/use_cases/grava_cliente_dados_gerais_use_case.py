"""Persist or update Dados Gerais of a cliente via SIAOS.PCK_CLIENTE."""

from apps.commercial.application.dtos.cliente_dtos import (
    GravaClienteDadosGeraisInputDTO,
    GravaClienteDadosGeraisOutputDTO,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
    ClienteForbiddenError,
    ClienteOwnershipError,
    ClienteProcedureError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.repositories.cliente_repository import (
    ClienteRepository,
    GravaClienteDadosGeraisParams,
)
from apps.commercial.domain.services.empresa_ownership import (
    can_edit_customer,
    customer_effective_owner,
)


class GravaClienteDadosGeraisUseCase:
    def __init__(
        self,
        repository: ClienteRepository,
        query_repository: ClienteQueryRepository,
    ) -> None:
        self._repository = repository
        self._query_repository = query_repository

    def execute(
        self, input_dto: GravaClienteDadosGeraisInputDTO
    ) -> GravaClienteDadosGeraisOutputDTO:
        actor = input_dto.actor
        if actor.usu_chapa is None:
            raise ClienteForbiddenError(
                "Actor without USU_CHAPA cannot write clientes."
            )

        if input_dto.codigo is not None:
            self._assert_can_edit_existing(actor.link_emp_codigo, input_dto.codigo)

        result = self._repository.grava_dados_gerais(
            _build_params(input_dto, actor.usu_chapa)
        )

        _raise_if_procedure_error(result.tipo_msg, result.msg, result.acao)
        if result.codigo is None:
            raise ClienteDatabaseError(
                result.msg or "SP_ATUALIZA_DADOS_GERAIS did not return a CODIGO."
            )

        self._enforce_ownership(codigo=result.codigo, owner=actor.owner_emp_codigo)
        if input_dto.cli_grupo_trib is not None:
            self._repository.set_cli_grupo_trib(
                codigo=result.codigo,
                cli_grupo_trib=input_dto.cli_grupo_trib,
            )

        return GravaClienteDadosGeraisOutputDTO(
            codigo=result.codigo,
            tipo_msg=result.tipo_msg,
            msg=result.msg,
            acao=result.acao,
        )

    def _assert_can_edit_existing(
        self,
        actor_link_emp: int | None,
        codigo: int,
    ) -> None:
        current_emp = self._query_repository.get_cliente_emp_codigo(codigo)
        if not can_edit_customer(
            actor_link_emp=actor_link_emp,
            cliente_emp=current_emp,
        ):
            raise ClienteForbiddenError(
                f"Cliente '{codigo}' is out of the actor's empresa scope."
            )

    def _enforce_ownership(self, *, codigo: int, owner: int) -> None:
        current = self._repository.read_emp_codigo(codigo)
        if customer_effective_owner(current) == owner:
            return
        self._repository.set_emp_codigo(codigo=codigo, emp_codigo=owner)
        rechecked = self._repository.read_emp_codigo(codigo)
        if customer_effective_owner(rechecked) != owner:
            raise ClienteOwnershipError(
                f"Failed to enforce EMP_CODIGO={owner} on cliente {codigo}."
            )


def _build_params(
    input_dto: GravaClienteDadosGeraisInputDTO,
    usu_chapa: int,
) -> GravaClienteDadosGeraisParams:
    natureza = _natureza_from_tipo_cadastro(input_dto.tipo_cadastro)
    return GravaClienteDadosGeraisParams(
        codigo=input_dto.codigo,
        tipo_cadastro="A" if input_dto.codigo is not None else "I",
        cliente=input_dto.cliente,
        reduzido=input_dto.reduzido,
        tipo=natureza,
        origem=input_dto.origem,
        endereco1=input_dto.endereco1,
        endereco2=input_dto.endereco2,
        endereco3=input_dto.endereco3,
        cli_bairro=input_dto.cli_bairro,
        cidade=input_dto.cidade,
        estado=input_dto.estado,
        cep=input_dto.cep,
        pais=input_dto.pais,
        pai_codigo=input_dto.pai_codigo,
        est_codigo=input_dto.est_codigo,
        telefone1=input_dto.telefone1,
        telefone2=input_dto.telefone2,
        fax=input_dto.fax,
        email=input_dto.email,
        homepage=input_dto.homepage,
        cgc=input_dto.cgc,
        inscr_est=input_dto.inscr_est,
        cli_inscr_mun=input_dto.cli_inscr_mun,
        cli_ie_isento=input_dto.cli_ie_isento,
        cli_contribuinte=input_dto.cli_contribuinte,
        cli_cnae=input_dto.cli_cnae,
        cli_cod_mun_ibge=input_dto.cli_cod_mun_ibge,
        cli_inscr_suframa=input_dto.cli_inscr_suframa,
        cli_nif=input_dto.cli_nif,
        cli_pes_tipo=input_dto.cli_pes_tipo,
        contato=input_dto.contato,
        contatotec=input_dto.contatotec,
        contatofin=input_dto.contatofin,
        observa=input_dto.observa,
        usu_chapa=usu_chapa,
        idioma_msg=input_dto.idioma_msg,
        cli_tipo=input_dto.cli_tipo,
        aos_codigo_com=input_dto.aos_codigo_com,
        aos_codigo_tec=input_dto.aos_codigo_tec,
        cli_grupo_trib=input_dto.cli_grupo_trib,
        classe=input_dto.classe,
        mpg_codigo=input_dto.mpg_codigo,
        cli_mod_pagt=input_dto.cli_mod_pagt,
        cli_email_nfse=input_dto.cli_email_nfse,
        territorio=input_dto.territorio,
        vendedor=input_dto.vendedor,
    )


def _natureza_from_tipo_cadastro(tipo_cadastro: str) -> str:
    value = (tipo_cadastro or "").strip().upper()
    if value in {"F", "FUNC"}:
        return "F"
    if value == "I":
        return "I"
    return "J"


def _raise_if_procedure_error(
    tipo_msg: str | None,
    msg: str | None,
    acao: str | None,
) -> None:
    if tipo_msg is not None and tipo_msg.strip().upper() == "E":
        raise ClienteProcedureError(msg or "Procedure failed.", acao)
