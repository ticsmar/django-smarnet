"""Map cliente query records to application output DTOs."""

from collections.abc import Callable, Sequence

from apps.administracao.application.dtos.cliente_dtos import (
    ClienteDetailOutputDTO,
    ClienteDocumentoCopyPayloadDTO,
    ClienteDocumentoMatchOutputDTO,
    ClienteEstadoOutputDTO,
    ClienteListItemOutputDTO,
    ClienteOrigemOutputDTO,
    ClientePaisOutputDTO,
    CnpjReceitaOutputDTO,
    FuncionarioRhOutputDTO,
    PaginatedClientesOutputDTO,
)
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteDocumentoMatch,
    ClienteEstadoRecord,
    ClienteListRecord,
    ClienteOrigemRecord,
    ClientePaisRecord,
    ClienteRecord,
    FuncionarioRhRecord,
    PaginatedClientesResult,
)
from apps.administracao.domain.repositories.cnpj_consulta_gateway import (
    CnpjAtividade,
    CnpjSocio,
    CnpjWsRecord,
)
from apps.administracao.domain.services.cnpj_receita import (
    endereco_logradouro,
    fantasia_from_nome,
    split_telefones,
    strip_accents,
)
from apps.administracao.domain.services.empresa_ownership import can_edit_customer


def to_list_item_dto(
    record: ClienteListRecord,
    *,
    actor_link_emp: int | None,
) -> ClienteListItemOutputDTO:
    return ClienteListItemOutputDTO(
        codigo=record.codigo,
        cliente=record.cliente,
        reduzido=record.reduzido,
        cgc=record.cgc,
        cidade=record.cidade,
        estado=record.estado,
        emp_codigo=record.emp_codigo,
        bloqueado=record.bloqueado,
        tipo=record.tipo,
        can_edit=can_edit_customer(
            actor_link_emp=actor_link_emp,
            cliente_emp=record.emp_codigo,
        ),
        crs_cod_letra=record.crs_cod_letra,
        crs_desc_longa=record.crs_desc_longa,
        crs_restricao=record.crs_restricao,
        crs_cores=record.crs_cores,
        cadastro_checagem=record.cadastro_checagem,
    )


def to_paginated_dto(
    result: PaginatedClientesResult,
    *,
    actor_link_emp: int | None,
) -> PaginatedClientesOutputDTO:
    return PaginatedClientesOutputDTO(
        items=[
            to_list_item_dto(item, actor_link_emp=actor_link_emp)
            for item in result.items
        ],
        total=result.total,
        page=result.page,
        page_size=result.page_size,
    )


def to_detail_dto(
    record: ClienteRecord,
    *,
    actor_link_emp: int | None,
) -> ClienteDetailOutputDTO:
    return ClienteDetailOutputDTO(
        codigo=record.codigo,
        origem=record.origem,
        cliente=record.cliente,
        reduzido=record.reduzido,
        tipo=record.tipo,
        endereco1=record.endereco1,
        endereco2=record.endereco2,
        endereco3=record.endereco3,
        cli_bairro=record.cli_bairro,
        cidade=record.cidade,
        estado=record.estado,
        cep=record.cep,
        pais=record.pais,
        pai_codigo=record.pai_codigo,
        est_codigo=record.est_codigo,
        telefone1=record.telefone1,
        telefone2=record.telefone2,
        fax=record.fax,
        email=record.email,
        homepage=record.homepage,
        cgc=record.cgc,
        inscr_est=record.inscr_est,
        cli_inscr_mun=record.cli_inscr_mun,
        cli_tipo=record.cli_tipo,
        cli_pes_tipo=record.cli_pes_tipo,
        cli_contribuinte=record.cli_contribuinte,
        cli_ie_isento=record.cli_ie_isento,
        cli_cnae=record.cli_cnae,
        cli_cod_mun_ibge=record.cli_cod_mun_ibge,
        cli_inscr_suframa=record.cli_inscr_suframa,
        cli_nif=record.cli_nif,
        contato=record.contato,
        contatotec=record.contatotec,
        contatofin=record.contatofin,
        observa=record.observa,
        emp_codigo=record.emp_codigo,
        bloqueado=record.bloqueado,
        dt_atual=record.dt_atual,
        dt_cad=record.dt_cad,
        can_edit=can_edit_customer(
            actor_link_emp=actor_link_emp,
            cliente_emp=record.emp_codigo,
        ),
    )


def to_documento_match_dto(
    record: ClienteDocumentoMatch,
) -> ClienteDocumentoMatchOutputDTO:
    return ClienteDocumentoMatchOutputDTO(
        codigo=record.codigo,
        cliente=record.cliente,
        cgc=record.cgc,
        cidade=record.cidade,
        estado=record.estado,
        emp_codigo=record.emp_codigo,
    )


def _rh_display(value: str | None) -> str | None:
    stripped = strip_accents(value)
    if stripped is None:
        return None
    text = stripped.strip()
    return text.upper() if text else None


def to_funcionario_rh_dto(record: FuncionarioRhRecord) -> FuncionarioRhOutputDTO:
    return FuncionarioRhOutputDTO(
        nome=_rh_display(record.nome),
        chapa=_rh_display(record.chapa),
        cpf=(record.cpf or "").strip() or None,
        rg=_rh_display(record.rg),
        endereco=_rh_display(record.endereco),
        municipio=_rh_display(record.municipio),
        bairro=_rh_display(record.bairro),
        uf=_rh_display(record.uf),
        cep=(record.cep or "").strip() or None,
        telefone=(record.telefone or "").strip() or None,
        email=(record.email or "").strip() or None,
    )


def to_copy_fields_dto(record: ClienteRecord) -> ClienteDocumentoCopyPayloadDTO:
    """Never expose codigo, emp_codigo, bloqueado, limits or financial fields."""
    return ClienteDocumentoCopyPayloadDTO(
        cliente=record.cliente,
        reduzido=record.reduzido,
        endereco1=record.endereco1,
        endereco2=record.endereco2,
        endereco3=record.endereco3,
        cli_bairro=record.cli_bairro,
        cidade=record.cidade,
        estado=record.estado,
        cep=record.cep,
        pais=record.pais,
        pai_codigo=record.pai_codigo,
        est_codigo=record.est_codigo,
        telefone1=record.telefone1,
        telefone2=record.telefone2,
        fax=record.fax,
        email=record.email,
        homepage=record.homepage,
        cgc=record.cgc,
        inscr_est=record.inscr_est,
        cli_inscr_mun=record.cli_inscr_mun,
        cli_ie_isento=record.cli_ie_isento,
        cli_contribuinte=record.cli_contribuinte,
        cli_cnae=record.cli_cnae,
        cli_cod_mun_ibge=record.cli_cod_mun_ibge,
        cli_inscr_suframa=record.cli_inscr_suframa,
        cli_nif=record.cli_nif,
        cli_pes_tipo=record.cli_pes_tipo,
        tipo=record.tipo,
        origem=record.origem,
    )


def to_pais_dto(record: ClientePaisRecord) -> ClientePaisOutputDTO:
    return ClientePaisOutputDTO(
        pai_codigo=record.pai_codigo,
        pai_nome=record.pai_nome,
    )


def to_estado_dto(record: ClienteEstadoRecord) -> ClienteEstadoOutputDTO:
    return ClienteEstadoOutputDTO(
        est_codigo=record.est_codigo,
        pai_codigo=record.pai_codigo,
        est_nome=record.est_nome,
    )


def to_origem_dto(record: ClienteOrigemRecord) -> ClienteOrigemOutputDTO:
    return ClienteOrigemOutputDTO(
        origem=record.origem,
        descricao=record.descricao,
    )


def _format_atividade(item: CnpjAtividade) -> str | None:
    text = (item.text or "").strip()
    code = (item.code or "").strip()
    if text and code:
        return f"{text}({code})"
    return text or code or None


def _format_socio(item: CnpjSocio) -> str | None:
    qual = (item.qual or "").strip()
    nome = (item.nome or "").strip()
    if qual and nome:
        return f"{qual} - {nome}"
    return nome or qual or None


def _format_list[T](
    items: Sequence[T],
    formatter: Callable[[T], str | None],
) -> list[str]:
    return [formatted for item in items if (formatted := formatter(item))]


def to_receita_dto(
    record: CnpjWsRecord,
    *,
    est_codigo: int | None,
    mun_ibge: str | None,
    logradouro: str | None,
    uf: str | None,
) -> CnpjReceitaOutputDTO:
    telefone1, telefone2 = split_telefones(record.telefone)
    return CnpjReceitaOutputDTO(
        nome=record.nome,
        fantasia=fantasia_from_nome(record.nome, record.fantasia),
        cnpj=record.cnpj,
        logradouro=logradouro or record.logradouro,
        numero=record.numero,
        complemento=record.complemento,
        bairro=record.bairro,
        uf=uf or record.uf,
        est_codigo=est_codigo,
        municipio=record.municipio,
        municipio_ibge=mun_ibge,
        cep=record.cep,
        situacao=record.situacao,
        data_situacao=record.data_situacao,
        telefone=telefone1,
        telefone2=telefone2,
        email=record.email,
        natureza_juridica=record.natureza_juridica,
        abertura=record.abertura,
        ultima_atualizacao=record.ultima_atualizacao,
        tipo=record.tipo,
        status=record.status,
        efr=record.efr,
        motivo_situacao=record.motivo_situacao,
        situacao_especial=record.situacao_especial,
        data_situacao_especial=record.data_situacao_especial,
        capital_social=record.capital_social,
        atividade_principal=_format_list(record.atividade_principal, _format_atividade),
        atividades_secundarias=_format_list(
            record.atividades_secundarias, _format_atividade
        ),
        qsa=_format_list(record.qsa, _format_socio),
        fonte="https://receitaws.com.br/",
    )


def to_copy_fields_from_receita(
    receita: CnpjReceitaOutputDTO,
) -> ClienteDocumentoCopyPayloadDTO:
    return ClienteDocumentoCopyPayloadDTO(
        cliente=receita.nome,
        reduzido=receita.fantasia,
        endereco1=endereco_logradouro(receita.logradouro, receita.numero),
        endereco2=None,
        endereco3=receita.complemento,
        cli_bairro=receita.bairro,
        cidade=receita.municipio,
        estado=receita.uf,
        cep=receita.cep,
        pais="BRA",
        pai_codigo=76,
        est_codigo=receita.est_codigo,
        telefone1=receita.telefone,
        telefone2=receita.telefone2,
        fax=None,
        email=receita.email,
        homepage=None,
        cgc=receita.cnpj,
        inscr_est=None,
        cli_inscr_mun=None,
        cli_ie_isento=0,
        cli_contribuinte=2,
        cli_cnae=None,
        cli_cod_mun_ibge=receita.municipio_ibge,
        cli_inscr_suframa=None,
        cli_nif=None,
        cli_pes_tipo=None,
        tipo="J",
        origem="BR",
    )
