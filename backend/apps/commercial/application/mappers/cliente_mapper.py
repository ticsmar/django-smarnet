"""Map cliente query records to application output DTOs."""

from collections.abc import Callable, Sequence

from apps.commercial.application.dtos.cliente_dtos import (
    ClienteAreaOsOutputDTO,
    ClienteArclassOutputDTO,
    ClienteArlevelOutputDTO,
    ClienteArsalespOutputDTO,
    ClienteCidadeOutputDTO,
    ClienteCobrancaOutputDTO,
    ClienteContatoOutputDTO,
    ClienteDetailOutputDTO,
    ClienteDocumentoCopyPayloadDTO,
    ClienteDocumentoMatchOutputDTO,
    ClienteEmbarqueOutputDTO,
    ClienteEstadoOutputDTO,
    ClienteGrupoTributarioOutputDTO,
    ClienteListItemOutputDTO,
    ClienteLogOutputDTO,
    ClienteModeloPagtOutputDTO,
    ClienteOrigemOutputDTO,
    ClientePaisOutputDTO,
    ClienteRiscoOutputDTO,
    CnpjReceitaOutputDTO,
    FuncionarioRhOutputDTO,
    PaginatedClientesOutputDTO,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteAreaOsRecord,
    ClienteArclassRecord,
    ClienteArlevelRecord,
    ClienteArsalespRecord,
    ClienteCidadeRecord,
    ClienteCobrancaRecord,
    ClienteContatoRecord,
    ClienteDocumentoMatch,
    ClienteEmbarqueRecord,
    ClienteEstadoRecord,
    ClienteGrupoTributarioRecord,
    ClienteListRecord,
    ClienteLogRecord,
    ClienteModeloPagtRecord,
    ClienteOrigemRecord,
    ClientePaisRecord,
    ClienteRecord,
    ClienteRiscoRecord,
    FuncionarioRhRecord,
    PaginatedClientesResult,
)
from apps.commercial.domain.repositories.cnpj_consulta_gateway import (
    CnpjAtividade,
    CnpjSocio,
    CnpjWsRecord,
)
from apps.commercial.domain.services.cnpj_receita import (
    endereco_logradouro,
    fantasia_from_nome,
    split_telefones,
    strip_accents,
)
from apps.commercial.domain.services.empresa_ownership import can_edit_customer


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
    show_financeiro: bool = True,
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
        show_financeiro=show_financeiro,
        cli_grupo_trib=record.cli_grupo_trib,
        aos_codigo_com=record.aos_codigo_com,
        aos_codigo_tec=record.aos_codigo_tec,
        classe=record.classe,
        territorio=record.territorio,
        vendedor=record.vendedor,
        cli_email_nfse=record.cli_email_nfse,
        limitecr=record.limitecr,
        cli_limite_crv=record.cli_limite_crv,
        ccontabil=record.ccontabil,
        cli_fome_zero=record.cli_fome_zero,
        cli_montador=record.cli_montador,
        flagmulta=record.flagmulta,
        flagsuspen=record.flagsuspen,
        flagcobra=record.flagcobra,
        vencprog=record.vencprog,
        zona_franca=record.zona_franca,
        iss=record.iss,
        exportacao=record.exportacao,
        taxamulta=record.taxamulta,
        desc_max=record.desc_max,
        obsvenc=record.obsvenc,
        cli_reccof=record.cli_reccof,
        cli_reccsll=record.cli_reccsll,
        cli_recpis=record.cli_recpis,
        mpg_codigo=record.mpg_codigo,
        cli_mod_pagt=record.cli_mod_pagt,
        cobranca=record.cobranca,
        entrega=record.entrega,
        con_codigo_com=record.con_codigo_com,
        con_codigo_tec=record.con_codigo_tec,
        con_codigo_fin=record.con_codigo_fin,
        crs_cod_protheus=record.crs_cod_protheus,
        crs_cod_letra=record.crs_cod_letra,
        crs_desc=record.crs_desc,
        crs_desc_longa=record.crs_desc_longa,
        crs_restricao=record.crs_restricao,
        mensagem_bloqueio=record.mensagem_bloqueio,
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
        est_sigla=record.est_sigla,
    )


def to_origem_dto(record: ClienteOrigemRecord) -> ClienteOrigemOutputDTO:
    return ClienteOrigemOutputDTO(
        origem=record.origem,
        descricao=record.descricao,
    )


def to_arclass_dto(record: ClienteArclassRecord) -> ClienteArclassOutputDTO:
    return ClienteArclassOutputDTO(
        class_key=record.class_key,
        descr=record.descr,
    )


def to_arlevel_dto(record: ClienteArlevelRecord) -> ClienteArlevelOutputDTO:
    return ClienteArlevelOutputDTO(
        terr_key=record.terr_key,
        description=record.description,
    )


def to_arsalesp_dto(record: ClienteArsalespRecord) -> ClienteArsalespOutputDTO:
    return ClienteArsalespOutputDTO(
        salesp_key=record.salesp_key,
        nome=record.nome,
        emp_nome=record.emp_nome,
    )


def to_risco_dto(record: ClienteRiscoRecord) -> ClienteRiscoOutputDTO:
    return ClienteRiscoOutputDTO(
        codigo=record.codigo,
        letra=record.letra,
        desc=record.desc,
        desc_longa=record.desc_longa,
        restricao=record.restricao,
    )


def to_cidade_dto(record: ClienteCidadeRecord) -> ClienteCidadeOutputDTO:
    return ClienteCidadeOutputDTO(
        codigo=record.codigo,
        descricao=record.descricao,
        uf=record.uf,
    )


def to_grupo_tributario_dto(
    record: ClienteGrupoTributarioRecord, *, is_default: bool = False
) -> ClienteGrupoTributarioOutputDTO:
    return ClienteGrupoTributarioOutputDTO(
        codigo=record.codigo,
        descricao=record.descricao,
        uf=record.uf,
        is_default=is_default,
    )


def to_area_os_dto(record: ClienteAreaOsRecord) -> ClienteAreaOsOutputDTO:
    return ClienteAreaOsOutputDTO(
        aos_codigo=record.aos_codigo,
        aos_nome=record.aos_nome,
        usu_chapa=record.usu_chapa,
        usu_nome=record.usu_nome,
        qtd=record.qtd,
        is_default=record.is_default,
    )


def to_modelo_pagt_dto(
    record: ClienteModeloPagtRecord,
) -> ClienteModeloPagtOutputDTO:
    return ClienteModeloPagtOutputDTO(
        mpg_codigo=record.mpg_codigo,
        descricao=record.descricao,
        mpg_area=record.mpg_area,
        mpg_status=record.mpg_status,
    )


def to_contato_dto(
    record: ClienteContatoRecord,
    *,
    con_codigo_com: int | None = None,
    con_codigo_tec: int | None = None,
    con_codigo_fin: int | None = None,
) -> ClienteContatoOutputDTO:
    return ClienteContatoOutputDTO(
        con_codigo=record.con_codigo,
        codcliente=record.codcliente,
        nome=record.nome,
        depto=record.depto,
        cargo=record.cargo,
        telefone=record.telefone,
        fax=record.fax,
        celular=record.celular,
        email=record.email,
        con_ativo=record.con_ativo,
        is_comercial=record.con_codigo == con_codigo_com,
        is_tecnico=record.con_codigo == con_codigo_tec,
        is_financeiro=record.con_codigo == con_codigo_fin,
    )


def to_cobranca_dto(record: ClienteCobrancaRecord) -> ClienteCobrancaOutputDTO:
    return ClienteCobrancaOutputDTO(
        codigo=record.codigo,
        chavecobra=record.chavecobra,
        nome=record.nome,
        endereco1=record.endereco1,
        endereco2=record.endereco2,
        endereco3=record.endereco3,
        cob_bairro=record.cob_bairro,
        cidade=record.cidade,
        estado=record.estado,
        est_nome=record.est_nome,
        cep=record.cep,
        pais=record.pais,
        pais_nome=record.pais_nome,
        contato=record.contato,
        telefone1=record.telefone1,
        telefone2=record.telefone2,
        e_mail=record.e_mail,
        ativo=record.ativo,
        cli_codigo_ref=record.cli_codigo_ref,
        is_padrao=record.is_padrao,
    )


def to_embarque_dto(record: ClienteEmbarqueRecord) -> ClienteEmbarqueOutputDTO:
    return ClienteEmbarqueOutputDTO(
        codigo=record.codigo,
        chave_emb=record.chave_emb,
        nome=record.nome,
        endereco1=record.endereco1,
        endereco2=record.endereco2,
        endereco3=record.endereco3,
        emb_bairro=record.emb_bairro,
        cidade=record.cidade,
        estado=record.estado,
        est_nome=record.est_nome,
        cep=record.cep,
        pais=record.pais,
        pais_nome=record.pais_nome,
        contato=record.contato,
        telefone1=record.telefone1,
        telefone2=record.telefone2,
        e_mail=record.e_mail,
        ativo=record.ativo,
        cli_codigo_ref=record.cli_codigo_ref,
        is_padrao=record.is_padrao,
    )


def to_log_dto(record: ClienteLogRecord) -> ClienteLogOutputDTO:
    return ClienteLogOutputDTO(
        codigo=record.codigo,
        lcl_data=record.lcl_data,
        data_txt=record.data_txt,
        usu_chapa=record.usu_chapa,
        usu_nome=record.usu_nome,
        lcl_texto=record.lcl_texto,
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
