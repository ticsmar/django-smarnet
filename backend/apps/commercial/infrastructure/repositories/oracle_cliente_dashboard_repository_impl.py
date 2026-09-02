"""Cliente dashboard read repository (Oracle)."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal
from typing import TypedDict

import oracledb
from django.db import DatabaseError, connections

from apps.commercial.domain.exceptions.cliente_exceptions import ClienteDatabaseError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardCreditoRecord,
    ClienteDashboardOsPendenteRecord,
    ClienteDashboardOsRecord,
    ClienteDashboardPropostaPontoRecord,
    ClienteDashboardSeriePontoRecord,
    ClienteDashboardTituloPendenteRecord,
    ClienteDashboardTituloRecord,
    PaginatedDashboardOsResult,
    PaginatedDashboardTitulosResult,
)
from apps.commercial.domain.services.cliente_bloqueado import (
    sql_effective_bloqueado,
)
from apps.commercial.domain.services.cliente_dashboard_scope import (
    SCOPE_GRUPO,
    ClienteDashboardScopeKind,
    grupo_cabeca,
    in_placeholders,
    lpad_cli_codes,
)
from apps.commercial.domain.services.empresa_ownership import sql_emp_filter_clause
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

from . import oracle_dashboard_credito_queries as credito_sql

_DB_ALIAS = "smar"
_RISCO_JOIN = (
    "LEFT JOIN INTEGRACAO.CLIENTE_RISCO r "
    f"ON r.CRS_COD_SIAOS = {sql_effective_bloqueado('c.BLOQUEADO')}"
)


@dataclass(frozen=True, slots=True)
class _AnchorRow:
    codigo: int
    nome: str
    cli_grupo: int | None
    limitecr: Decimal | None
    cli_limite_crv: Decimal | None
    bloqueado: int
    origem: str | None


class OracleClienteDashboardRepositoryImpl:
    def get_anchor(
        self, *, actor_owner: int, anchor_codigo: int
    ) -> ClienteDashboardCreditoRecord | None:
        return self._record_from_anchor(
            actor_owner=actor_owner, anchor_codigo=anchor_codigo, scope="cliente"
        )

    def get_credito(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
    ) -> ClienteDashboardCreditoRecord | None:
        return self._record_from_anchor(
            actor_owner=actor_owner,
            anchor_codigo=anchor_codigo,
            scope=scope,
            load_detail=True,
        )

    def list_os(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
        page: int,
        page_size: int,
    ) -> PaginatedDashboardOsResult:
        ensure_smar_client_identifier()
        anchor = self._fetch_anchor(
            actor_owner=actor_owner, anchor_codigo=anchor_codigo
        )
        if anchor is None:
            return PaginatedDashboardOsResult(
                items=[], total=0, page=page, page_size=page_size
            )

        cabeca = grupo_cabeca(codigo=anchor.codigo, cli_grupo=anchor.cli_grupo)
        codes = self._list_scope_codigos(
            cabeca=cabeca, anchor_codigo=anchor.codigo, scope=scope
        )
        cust_sql, cust_params = in_placeholders(codes)

        total = self._count_os(cust_sql=cust_sql, cust_params=cust_params)[0]
        if total == 0:
            return PaginatedDashboardOsResult(
                items=[], total=0, page=page, page_size=page_size
            )

        start = (page - 1) * page_size + 1
        end = page * page_size
        sql = f"""
            SELECT ORDER_NO, CUST_KEY, CLIENTE, ORDER_DATE, ORIGEM, ORIGEM_DESC,
                   ORDER_STATUS, OS_ENCERRADA
              FROM (
                SELECT h.ORDER_NO,
                       h.CUST_KEY,
                       c.CLIENTE,
                       h.ORDER_DATE,
                       h.ORIGEM,
                       o.DESCRICAO AS ORIGEM_DESC,
                       h.ORDER_STATUS,
                       NVL(h.OS_ENCERRADA, 0) AS OS_ENCERRADA,
                       ROW_NUMBER() OVER (
                         ORDER BY h.ORDER_DATE DESC NULLS LAST, h.ORDER_NO DESC
                       ) AS RN
                  FROM SIAOS.OEHDR h
                  INNER JOIN SIAOS.CLIENTE c ON c.CODIGO = h.CUST_KEY
                  LEFT JOIN SIAOS.ORIGEM o ON o.ORIGEM = h.ORIGEM
                 WHERE h.CUST_KEY IN ({cust_sql})
              )
             WHERE RN BETWEEN %s AND %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*cust_params, start, end])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        items = [
            ClienteDashboardOsRecord(
                order_no=_as_int(row[0]) or 0,
                cust_key=_as_int(row[1]) or 0,
                cliente_nome=_as_str(row[2]) or "",
                order_date=_as_datetime(row[3]),
                origem=_as_str(row[4]),
                origem_descricao=_as_str(row[5]),
                order_status=_as_str(row[6]),
                os_encerrada=_as_int(row[7]),
            )
            for row in rows
        ]
        return PaginatedDashboardOsResult(
            items=items, total=total, page=page, page_size=page_size
        )

    def list_titulos(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
        page: int,
        page_size: int,
    ) -> PaginatedDashboardTitulosResult:
        ensure_smar_client_identifier()
        anchor = self._fetch_anchor(
            actor_owner=actor_owner, anchor_codigo=anchor_codigo
        )
        if anchor is None:
            return PaginatedDashboardTitulosResult(
                items=[],
                total=0,
                page=page,
                page_size=page_size,
                titulos_disponivel=False,
            )

        cabeca = grupo_cabeca(codigo=anchor.codigo, cli_grupo=anchor.cli_grupo)
        codes = self._list_scope_codigos(
            cabeca=cabeca, anchor_codigo=anchor.codigo, scope=scope
        )
        lpad_sql, lpad_params = in_placeholders(lpad_cli_codes(codes))

        count_sql = f"""
            SELECT COUNT(*)
              FROM PROTPROD.SE1010 t
             WHERE NVL(t.D_E_L_E_T_, ' ') <> '*'
               AND LPAD(TRIM(t.E1_CLIENTE), 6, '0') IN ({lpad_sql})
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(count_sql, lpad_params)
                total_row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            if _is_missing_table(exc):
                return PaginatedDashboardTitulosResult(
                    items=[],
                    total=0,
                    page=page,
                    page_size=page_size,
                    titulos_disponivel=False,
                )
            raise ClienteDatabaseError(str(exc)) from exc

        total = _as_int(total_row[0] if total_row else None) or 0
        if total == 0:
            return PaginatedDashboardTitulosResult(
                items=[],
                total=0,
                page=page,
                page_size=page_size,
                titulos_disponivel=True,
            )

        start = (page - 1) * page_size + 1
        end = page * page_size
        list_sql = f"""
            SELECT NUMERO, PARCELA, VALOR, SALDO, VENCIMENTO, EMISSAO,
                   STATUS, CLIENTE_CODIGO
              FROM (
                SELECT TRIM(t.E1_NUM) AS NUMERO,
                       TRIM(t.E1_PARCELA) AS PARCELA,
                       t.E1_VALOR AS VALOR,
                       t.E1_SALDO AS SALDO,
                       t.E1_VENCREA AS VENCIMENTO,
                       t.E1_EMISSAO AS EMISSAO,
                       TRIM(t.E1_STATUS) AS STATUS,
                       TO_NUMBER(LPAD(TRIM(t.E1_CLIENTE), 6, '0')) AS CLIENTE_CODIGO,
                       ROW_NUMBER() OVER (
                         ORDER BY t.E1_VENCREA DESC NULLS LAST, t.E1_NUM
                       ) AS RN
                  FROM PROTPROD.SE1010 t
                 WHERE NVL(t.D_E_L_E_T_, ' ') <> '*'
                   AND LPAD(TRIM(t.E1_CLIENTE), 6, '0') IN ({lpad_sql})
              )
             WHERE RN BETWEEN %s AND %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(list_sql, [*lpad_params, start, end])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            if _is_missing_table(exc):
                return PaginatedDashboardTitulosResult(
                    items=[],
                    total=0,
                    page=page,
                    page_size=page_size,
                    titulos_disponivel=False,
                )
            raise ClienteDatabaseError(str(exc)) from exc

        items = [
            ClienteDashboardTituloRecord(
                numero=_as_str(row[0]) or "",
                parcela=_as_str(row[1]),
                valor=_as_decimal(row[2]),
                saldo=_as_decimal(row[3]),
                vencimento=_as_datetime(row[4]),
                emissao=_as_datetime(row[5]),
                status=_as_str(row[6]),
                cliente_codigo=_as_int(row[7]) or 0,
            )
            for row in rows
        ]
        return PaginatedDashboardTitulosResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            titulos_disponivel=True,
        )

    def _record_from_anchor(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
        load_detail: bool = False,
    ) -> ClienteDashboardCreditoRecord | None:
        ensure_smar_client_identifier()
        anchor = self._fetch_anchor(
            actor_owner=actor_owner, anchor_codigo=anchor_codigo
        )
        if anchor is None:
            return None
        cabeca = grupo_cabeca(codigo=anchor.codigo, cli_grupo=anchor.cli_grupo)
        codes = self._list_scope_codigos(
            cabeca=cabeca, anchor_codigo=anchor.codigo, scope=scope
        )
        cust_sql, cust_params = in_placeholders(codes)
        lpad_sql, lpad_params = in_placeholders(lpad_cli_codes(codes))
        risco = self._fetch_risco(bloqueado=anchor.bloqueado)
        total_os, os_abertas = self._count_os(
            cust_sql=cust_sql, cust_params=cust_params
        )
        membros = self._count_grupo_members(grupo_cabeca_codigo=cabeca)
        detail = _empty_credit_detail()
        if load_detail:
            detail = _load_credit_detail(
                cust_sql=cust_sql,
                cust_params=cust_params,
                lpad_sql=lpad_sql,
                lpad_params=lpad_params,
                origem=anchor.origem,
            )
        return ClienteDashboardCreditoRecord(
            codigo=anchor.codigo,
            nome=anchor.nome,
            grupo_cabeca=cabeca,
            origem=anchor.origem,
            limitecr=anchor.limitecr,
            cli_limite_crv=anchor.cli_limite_crv,
            bloqueado=anchor.bloqueado,
            risco_letra=risco[0] if risco else None,
            risco_descricao=risco[1] if risco else None,
            risco_restricao=risco[2] if risco else None,
            mensagem_bloqueio=self._fetch_mensagem_bloqueio(anchor.codigo),
            total_os=total_os,
            os_abertas=os_abertas,
            membros_grupo=membros,
            **detail,
        )

    def _fetch_anchor(
        self, *, actor_owner: int, anchor_codigo: int
    ) -> _AnchorRow | None:
        emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
        sql = f"""
            SELECT c.CODIGO,
                   TRIM(c.CLIENTE),
                   c.CLI_GRUPO,
                   c.LIMITECR,
                   c.CLI_LIMITE_CRV,
                   {sql_effective_bloqueado("c.BLOQUEADO")},
                   TRIM(c.ORIGEM)
              FROM SIAOS.CLIENTE c
             WHERE {emp_sql}
               AND c.CODIGO = %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*emp_params, anchor_codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return _AnchorRow(
            codigo=_as_int(row[0]) or 0,
            nome=_as_str(row[1]) or "",
            cli_grupo=_as_int(row[2]),
            limitecr=_as_decimal(row[3]),
            cli_limite_crv=_as_decimal(row[4]),
            bloqueado=_as_int(row[5]) or 0,
            origem=_as_str(row[6]),
        )

    def _fetch_risco(self, *, bloqueado: int) -> tuple[str, str, str] | None:
        sql = """
            SELECT TRIM(CRS_COD_LETRA), TRIM(CRS_DESC_LONGA), TRIM(CRS_RESTRICAO)
              FROM INTEGRACAO.CLIENTE_RISCO
             WHERE CRS_COD_SIAOS = %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [bloqueado])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return (_as_str(row[0]) or "", _as_str(row[1]) or "", _as_str(row[2]) or "")

    def _fetch_mensagem_bloqueio(self, codigo: int) -> str | None:
        sql = "SELECT TRIM(MENSAGEM_BLOQUEIO) FROM SIAOS.CLIENTE WHERE CODIGO = %s"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return _as_str(row[0]) if row else None

    def _count_os(self, *, cust_sql: str, cust_params: list[int]) -> tuple[int, int]:
        sql = f"""
            SELECT COUNT(*),
                   SUM(CASE WHEN NVL(h.OS_ENCERRADA, 0) = 0 THEN 1 ELSE 0 END)
              FROM SIAOS.OEHDR h
             WHERE h.CUST_KEY IN ({cust_sql})
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, cust_params)
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        total = _as_int(row[0]) if row else 0
        abertas = _as_int(row[1]) if row and row[1] is not None else 0
        return total or 0, abertas or 0

    def _count_grupo_members(self, *, grupo_cabeca_codigo: int) -> int:
        sql = """
            SELECT COUNT(*)
              FROM SIAOS.CLIENTE
             WHERE CODIGO = %s OR CLI_GRUPO = %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [grupo_cabeca_codigo, grupo_cabeca_codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return _as_int(row[0] if row else None) or 0

    def _list_scope_codigos(
        self,
        *,
        cabeca: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
    ) -> list[int]:
        if scope != SCOPE_GRUPO:
            return [anchor_codigo]
        sql = """
            SELECT CODIGO
              FROM SIAOS.CLIENTE
             WHERE CODIGO = %s OR CLI_GRUPO = %s
        """
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [cabeca, cabeca])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [_as_int(row[0]) or 0 for row in rows if row[0] is not None]


class _CreditDetail(TypedDict):
    media_atraso_dias: int | None
    media_antecipacao_dias: int | None
    titulos_pendentes_disponivel: bool
    oss_pendentes_disponivel: bool
    series_disponivel: bool
    titulos_pendentes: list[ClienteDashboardTituloPendenteRecord]
    oss_pendentes: list[ClienteDashboardOsPendenteRecord]
    faturamento_mes: list[ClienteDashboardSeriePontoRecord]
    faturamento_ano: list[ClienteDashboardSeriePontoRecord]
    proposta_ano: list[ClienteDashboardPropostaPontoRecord]


def _empty_credit_detail() -> _CreditDetail:
    return {
        "media_atraso_dias": None,
        "media_antecipacao_dias": None,
        "titulos_pendentes_disponivel": False,
        "oss_pendentes_disponivel": False,
        "series_disponivel": False,
        "titulos_pendentes": [],
        "oss_pendentes": [],
        "faturamento_mes": [],
        "faturamento_ano": [],
        "proposta_ano": [],
    }


def _load_credit_detail(
    *,
    cust_sql: str,
    cust_params: list[int],
    lpad_sql: str,
    lpad_params: list[str],
    origem: str | None,
) -> _CreditDetail:
    titulos, titulos_ok = credito_sql.fetch_titulos_pendentes(lpad_sql, lpad_params)
    oss, oss_ok = credito_sql.fetch_oss_pendentes(cust_sql, cust_params)
    atraso, antecipacao = credito_sql.fetch_pagamento_medias(
        lpad_sql, lpad_params, origem
    )
    fat_mes, mes_ok = credito_sql.fetch_faturamento_mes(cust_sql, cust_params)
    fat_ano, ano_ok = credito_sql.fetch_faturamento_ano(cust_sql, cust_params)
    proposta, prop_ok = credito_sql.fetch_proposta_ano(cust_sql, cust_params)
    return {
        "media_atraso_dias": atraso,
        "media_antecipacao_dias": antecipacao,
        "titulos_pendentes_disponivel": titulos_ok,
        "oss_pendentes_disponivel": oss_ok,
        "series_disponivel": mes_ok or ano_ok or prop_ok,
        "titulos_pendentes": titulos,
        "oss_pendentes": oss,
        "faturamento_mes": fat_mes,
        "faturamento_ano": fat_ano,
        "proposta_ano": proposta,
    }


def _is_missing_table(exc: Exception) -> bool:
    message = str(exc).upper()
    return "ORA-00942" in message or "ORA-01031" in message


def _as_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _as_decimal(value: object | None) -> Decimal | None:
    if value is None:
        return None
    return Decimal(str(value))


def _as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    return None


def build_oracle_cliente_dashboard_repository() -> OracleClienteDashboardRepositoryImpl:
    return OracleClienteDashboardRepositoryImpl()
