"""Map query records to application output DTOs."""

from apps.compras.application.dtos.recebimento_dtos import (
    FornecContatoOutputDTO,
    FornecedorOutputDTO,
    MsgErroOutputDTO,
    PaginatedFornecContatosOutputDTO,
    PaginatedFornecedoresOutputDTO,
    PaginatedMsgErrosOutputDTO,
    PaisOutputDTO,
)
from apps.compras.domain.repositories.recebimento_query_repository import (
    FornecContatoRecord,
    FornecedorRecord,
    MsgErroRecord,
    PaginatedFornecContatosResult,
    PaginatedFornecedoresResult,
    PaginatedMsgErrosResult,
    PaisRecord,
)


def to_fornecedor_dto(record: FornecedorRecord) -> FornecedorOutputDTO:
    return FornecedorOutputDTO(
        for_codigo=record.for_codigo,
        emp_codigo=record.emp_codigo,
        for_razao_soc=record.for_razao_soc,
        for_nome_reduz=record.for_nome_reduz,
        for_endereco=record.for_endereco,
        for_bairro=record.for_bairro,
        for_munic=record.for_munic,
        for_cep=record.for_cep,
        for_estado=record.for_estado,
        pai_codigo=record.pai_codigo,
        pai_nome=record.pai_nome,
        for_dt_cad=record.for_dt_cad,
        for_dt_atual=record.for_dt_atual,
        for_ativo=record.for_ativo,
    )


def to_paginated_fornecedores_dto(
    result: PaginatedFornecedoresResult,
) -> PaginatedFornecedoresOutputDTO:
    return PaginatedFornecedoresOutputDTO(
        items=[to_fornecedor_dto(item) for item in result.items],
        total=result.total,
        page=result.page,
        page_size=result.page_size,
    )


def to_fornec_contato_dto(record: FornecContatoRecord) -> FornecContatoOutputDTO:
    return FornecContatoOutputDTO(
        fco_codigo=record.fco_codigo,
        for_codigo=record.for_codigo,
        fco_nome=record.fco_nome,
        fco_cargo=record.fco_cargo,
        fco_email=record.fco_email,
        fco_telefone=record.fco_telefone,
    )


def to_paginated_fornec_contatos_dto(
    result: PaginatedFornecContatosResult,
) -> PaginatedFornecContatosOutputDTO:
    return PaginatedFornecContatosOutputDTO(
        items=[to_fornec_contato_dto(item) for item in result.items],
        total=result.total,
        page=result.page,
        page_size=result.page_size,
    )


def to_msg_erro_dto(record: MsgErroRecord) -> MsgErroOutputDTO:
    return MsgErroOutputDTO(
        msg_erro_bd=record.msg_erro_bd,
        msg_usu_port=record.msg_usu_port,
        msg_acao_port=record.msg_acao_port,
        msg_usu_ing=record.msg_usu_ing,
        msg_acao_ing=record.msg_acao_ing,
    )


def to_paginated_msg_erros_dto(
    result: PaginatedMsgErrosResult,
) -> PaginatedMsgErrosOutputDTO:
    return PaginatedMsgErrosOutputDTO(
        items=[to_msg_erro_dto(item) for item in result.items],
        total=result.total,
        page=result.page,
        page_size=result.page_size,
    )


def to_pais_dto(record: PaisRecord) -> PaisOutputDTO:
    return PaisOutputDTO(
        pai_codigo=record.pai_codigo,
        pai_nome=record.pai_nome,
        eti_codigo=record.eti_codigo,
    )
