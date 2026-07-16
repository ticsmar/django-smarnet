"""ORM query repository for NOVASMAR recebimento tables."""

from __future__ import annotations

from django.db.models import Q

from apps.compras.domain.repositories.recebimento_query_repository import (
    FornecContatoRecord,
    FornecedorRecord,
    MsgErroRecord,
    PaginatedFornecContatosResult,
    PaginatedFornecedoresResult,
    PaginatedMsgErrosResult,
    PaisRecord,
)
from apps.compras.infrastructure.models import FornecContato, Fornecedor, MsgErro, Pais

_DB_ALIAS = "smar"


def _dec_to_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(value)


def _to_fornecedor(row: Fornecedor, pai_nome: str | None = None) -> FornecedorRecord:
    return FornecedorRecord(
        for_codigo=row.for_codigo,
        emp_codigo=_dec_to_int(row.emp_codigo),
        for_razao_soc=row.for_razao_soc,
        for_nome_reduz=row.for_nome_reduz,
        for_endereco=row.for_endereco,
        for_bairro=row.for_bairro,
        for_munic=row.for_munic,
        for_cep=row.for_cep,
        for_estado=row.for_estado,
        pai_codigo=_dec_to_int(row.pai_codigo),
        pai_nome=pai_nome,
        for_dt_cad=row.for_dt_cad,
        for_dt_atual=row.for_dt_atual,
        for_ativo=row.for_ativo,
    )


def _to_contato(row: FornecContato) -> FornecContatoRecord:
    return FornecContatoRecord(
        fco_codigo=row.fco_codigo,
        for_codigo=row.for_codigo,
        fco_nome=row.fco_nome,
        fco_cargo=row.fco_cargo,
        fco_email=row.fco_email,
        fco_telefone=row.fco_telefone,
    )


def _to_msg_erro(row: MsgErro) -> MsgErroRecord:
    return MsgErroRecord(
        msg_erro_bd=row.msg_erro_bd,
        msg_usu_port=row.msg_usu_port,
        msg_acao_port=row.msg_acao_port,
        msg_usu_ing=row.msg_usu_ing,
        msg_acao_ing=row.msg_acao_ing,
    )


def _to_pais(row: Pais) -> PaisRecord:
    return PaisRecord(
        pai_codigo=row.pai_codigo,
        pai_nome=row.pai_nome,
        eti_codigo=row.eti_codigo,
    )


def _pais_nome_map(codes: set[int]) -> dict[int, str | None]:
    if not codes:
        return {}
    rows = Pais.objects.using(_DB_ALIAS).filter(pai_codigo__in=codes)
    return {row.pai_codigo: row.pai_nome for row in rows}


class OracleRecebimentoQueryRepositoryImpl:
    def get_fornecedor(self, cod_fornec: int) -> FornecedorRecord | None:
        row = Fornecedor.objects.using(_DB_ALIAS).filter(pk=cod_fornec).first()
        if row is None:
            return None
        pai_codigo = _dec_to_int(row.pai_codigo)
        pai_nome = None
        if pai_codigo is not None:
            pais = Pais.objects.using(_DB_ALIAS).filter(pk=pai_codigo).first()
            if pais is not None:
                pai_nome = pais.pai_nome
        return _to_fornecedor(row, pai_nome=pai_nome)

    def list_fornecedores(
        self,
        *,
        search: str,
        ativo: int | None,
        page: int,
        page_size: int,
    ) -> PaginatedFornecedoresResult:
        queryset = Fornecedor.objects.using(_DB_ALIAS).order_by("for_codigo")
        if search:
            term = search.strip()
            queryset = queryset.filter(
                Q(for_razao_soc__icontains=term) | Q(for_nome_reduz__icontains=term)
            )
        if ativo is not None:
            queryset = queryset.filter(for_ativo=ativo)
        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])
        codes = {
            code
            for code in (_dec_to_int(row.pai_codigo) for row in rows)
            if code is not None
        }
        nomes = _pais_nome_map(codes)
        items = []
        for row in rows:
            code = _dec_to_int(row.pai_codigo)
            items.append(
                _to_fornecedor(
                    row,
                    pai_nome=nomes.get(code) if code is not None else None,
                )
            )
        return PaginatedFornecedoresResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
        )

    def get_fornec_contato(self, cod_contato: int) -> FornecContatoRecord | None:
        row = FornecContato.objects.using(_DB_ALIAS).filter(pk=cod_contato).first()
        if row is None:
            return None
        return _to_contato(row)

    def list_fornec_contatos(
        self,
        *,
        for_codigo: int | None,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedFornecContatosResult:
        queryset = FornecContato.objects.using(_DB_ALIAS).order_by("fco_codigo")
        if for_codigo is not None:
            queryset = queryset.filter(for_codigo=for_codigo)
        if search:
            term = search.strip()
            queryset = queryset.filter(fco_nome__icontains=term)
        total = queryset.count()
        offset = (page - 1) * page_size
        items = [_to_contato(row) for row in queryset[offset : offset + page_size]]
        return PaginatedFornecContatosResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
        )

    def list_msg_erros(
        self,
        *,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedMsgErrosResult:
        queryset = MsgErro.objects.using(_DB_ALIAS).order_by("msg_erro_bd")
        if search:
            term = search.strip()
            queryset = queryset.filter(
                Q(msg_erro_bd__icontains=term) | Q(msg_usu_port__icontains=term)
            )
        total = queryset.count()
        offset = (page - 1) * page_size
        items = [_to_msg_erro(row) for row in queryset[offset : offset + page_size]]
        return PaginatedMsgErrosResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
        )

    def get_pais(self, pai_codigo: int) -> PaisRecord | None:
        row = Pais.objects.using(_DB_ALIAS).filter(pk=pai_codigo).first()
        if row is None:
            return None
        return _to_pais(row)

    def list_paises(self, *, search: str) -> list[PaisRecord]:
        queryset = Pais.objects.using(_DB_ALIAS).order_by("pai_nome")
        if search:
            term = search.strip()
            queryset = queryset.filter(pai_nome__icontains=term)
        return [_to_pais(row) for row in queryset]


def build_oracle_recebimento_query_repository() -> OracleRecebimentoQueryRepositoryImpl:
    return OracleRecebimentoQueryRepositoryImpl()
