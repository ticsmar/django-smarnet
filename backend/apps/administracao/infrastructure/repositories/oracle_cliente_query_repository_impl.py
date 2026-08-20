"""Oracle query repository for SIAOS.CLIENTE and the catalogs used by the form."""

from __future__ import annotations

from dataclasses import replace
from datetime import datetime

import oracledb
from django.db import DatabaseError, connections

from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
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
from apps.administracao.domain.services.cliente_bloqueado import (
    DEFAULT_BLOQUEADO,
    HIDDEN_BLOQUEADO_CODIGOS,
    normalize_bloqueado,
    resolve_risco_desc,
    resolve_risco_letra,
    sql_effective_bloqueado,
)
from apps.administracao.domain.services.cnpj_receita import CNPJ_LENGTH, is_cnpj_key
from apps.administracao.domain.services.empresa_ownership import (
    normalize_emp_codigo,
    sql_emp_filter_clause,
)
from apps.users.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"

_LIST_COLUMNS = (
    "c.CODIGO",
    "c.CLIENTE",
    "c.REDUZIDO",
    "c.CGC",
    "c.CIDADE",
    "c.ESTADO",
    "NVL(c.EMP_CODIGO,1) AS EMP_CODIGO",
    f"{sql_effective_bloqueado('c.BLOQUEADO')} AS BLOQUEADO",
    "c.TIPO",
    "NVL(TRIM(r.CRS_COD_LETRA), 'A') AS CRS_COD_LETRA",
    "NVL(TRIM(r.CRS_DESC_LONGA), 'Nota A   : Sem restrições') AS CRS_DESC_LONGA",
    "r.CRS_RESTRICAO",
    "r.CRS_CORES",
)

_BLOQUEADO_JOIN = (
    "LEFT JOIN INTEGRACAO.CLIENTE_RISCO r "
    f"ON r.CRS_CODIGO = {sql_effective_bloqueado('c.BLOQUEADO')}"
)

_DETAIL_COLUMNS = (
    "CODIGO",
    "ORIGEM",
    "CLIENTE",
    "REDUZIDO",
    "ENDERECO1",
    "ENDERECO2",
    "ENDERECO3",
    "CLI_BAIRRO",
    "CIDADE",
    "ESTADO",
    "CEP",
    "PAIS",
    "PAI_CODIGO",
    "EST_CODIGO",
    "TELEFONE1",
    "TELEFONE2",
    "FAX",
    "EMAIL",
    "HOMEPAGE",
    "CGC",
    "INSCR_EST",
    "CLI_INSCR_MUN",
    "TIPO",
    "CLI_TIPO",
    "CLI_PES_TIPO",
    "CLI_CONTRIBUINTE",
    "CLI_IE_ISENTO",
    "CLI_CNAE",
    "CLI_COD_MUN_IBGE",
    "CLI_INSCR_SUFRAMA",
    "CLI_NIF",
    "CONTATO",
    "CONTATOTEC",
    "CONTATOFIN",
    "OBSERVA",
    "NVL(EMP_CODIGO,1) AS EMP_CODIGO",
    f"NVL(BLOQUEADO,{DEFAULT_BLOQUEADO}) AS BLOQUEADO",
    "DT_ATUAL",
    "CLI_DT_CAD",
)


def _as_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


def _require_int(value: object | None) -> int:
    return int(float(str(value)))


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value)
    stripped = text.strip()
    return stripped or None


def _emp_from_row(value: object | None) -> int:
    return normalize_emp_codigo(_as_int(value))


def _match_from_row(row: tuple[object, ...]) -> ClienteDocumentoMatch:
    return ClienteDocumentoMatch(
        codigo=_require_int(row[0]),
        cliente=_as_str(row[1]),
        cgc=_as_str(row[2]),
        cidade=_as_str(row[3]),
        estado=_as_str(row[4]),
        emp_codigo=_emp_from_row(row[5]),
    )


class OracleClienteQueryRepositoryImpl:
    def list_clientes(
        self,
        *,
        actor_owner: int,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedClientesResult:
        ensure_smar_client_identifier()
        where_sql, params = _build_list_where(actor_owner=actor_owner, search=search)
        offset = (page - 1) * page_size

        count_sql = f"SELECT COUNT(*) FROM SIAOS.CLIENTE c {where_sql}"
        # Oracle 12c+ OFFSET/FETCH: sort the filtered set, then slice.
        list_sql = (
            f"SELECT {', '.join(_LIST_COLUMNS)} "
            "FROM SIAOS.CLIENTE c "
            f"{_BLOQUEADO_JOIN} "
            f"{where_sql} "
            "ORDER BY c.CLIENTE, c.CIDADE "
            "OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
        )

        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(count_sql, params)
                total_row = cursor.fetchone()
                total = int(total_row[0]) if total_row else 0
                cursor.execute(list_sql, [*params, offset, page_size])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        items = _fill_cadastro_checagem([_row_to_list_record(row) for row in rows])
        return PaginatedClientesResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
        )

    def get_cliente(
        self,
        *,
        actor_owner: int,
        codigo: int,
    ) -> ClienteRecord | None:
        ensure_smar_client_identifier()
        where_sql, emp_params = _build_get_where(actor_owner=actor_owner)
        sql = f"SELECT {', '.join(_DETAIL_COLUMNS)} FROM SIAOS.CLIENTE {where_sql}"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*emp_params, codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        if row is None:
            return None
        return _row_to_detail_record(row)

    def get_cliente_emp_codigo(self, codigo: int) -> int | None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT EMP_CODIGO FROM SIAOS.CLIENTE WHERE CODIGO = %s",
                    [codigo],
                )
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return _as_int(row[0])

    def find_by_documento(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        ensure_smar_client_identifier()
        emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
        if is_cnpj_key(digits):
            document_sql = (
                "LPAD(UPPER(TRANSLATE(TRIM(CGC), '#./- ', '#')), "
                f"{CNPJ_LENGTH}, '0') = LPAD(UPPER(%s), {CNPJ_LENGTH}, '0')"
            )
            document_param: str = digits
        else:
            document_sql = "TRANSLATE(CGC, '0123456789./-', '0123456789') LIKE %s"
            document_param = f"%{digits}%"
        sql = (
            "SELECT CODIGO, CLIENTE, CGC, CIDADE, ESTADO, "
            "NVL(EMP_CODIGO,1) AS EMP_CODIGO "
            "FROM SIAOS.CLIENTE "
            "WHERE SIAOS.SF_VALIDA_CONS_CLIENTE(CODIGO) = 1 "
            f"  AND {_sql_bloqueado_visible_clause()} "
            f"  AND {emp_sql} "
            f"  AND {document_sql} "
            "ORDER BY CLIENTE"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*emp_params, document_param])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [_match_from_row(row) for row in rows]

    def find_by_cnpj(
        self,
        *,
        actor_owner: int,
        cnpj: str,
    ) -> list[ClienteDocumentoMatch]:
        ensure_smar_client_identifier()
        emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
        sql = (
            "SELECT CODIGO, CLIENTE, CGC, CIDADE, ESTADO, "
            "NVL(EMP_CODIGO,1) AS EMP_CODIGO "
            "FROM SIAOS.CLIENTE "
            f"WHERE {emp_sql} "
            "  AND LPAD(UPPER(TRANSLATE(TRIM(CGC), '#./- ', '#')), "
            f"{CNPJ_LENGTH}, '0') = LPAD(UPPER(%s), {CNPJ_LENGTH}, '0') "
            "ORDER BY CLIENTE"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*emp_params, cnpj])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [_match_from_row(row) for row in rows]

    def find_by_cpf(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        ensure_smar_client_identifier()
        emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
        sql = (
            "SELECT CODIGO, CLIENTE, CGC, CIDADE, ESTADO, "
            "NVL(EMP_CODIGO,1) AS EMP_CODIGO "
            "FROM SIAOS.CLIENTE "
            f"WHERE {emp_sql} "
            "  AND REGEXP_REPLACE(NVL(CGC, ' '), '[^0-9]', '') = %s "
            "ORDER BY CLIENTE"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [*emp_params, digits])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [_match_from_row(row) for row in rows]

    def find_funcionario_rh(self, *, digits: str) -> FuncionarioRhRecord | None:
        ensure_smar_client_identifier()
        sql = (
            "SELECT R.RA_NOMECMP, R.RA_MAT, "
            "LOWER(DECODE(TRIM(R.RA_EMAIL), NULL, "
            "DECODE(TRIM(R.RA_EMAIL2), NULL, 'rh@smar.com.br', R.RA_EMAIL2), "
            "R.RA_EMAIL)) AS EMAIL, "
            "TRIM(R.RA_CIC), R.RA_RG, R.RA_ENDEREC, R.RA_MUNICIP, "
            "R.RA_BAIRRO, R.RA_ESTADO, R.RA_CEP, R.RA_TELEFON "
            "FROM PROTPROD.SRA010 R "
            "WHERE REGEXP_REPLACE(NVL(R.RA_CIC, ' '), '[^0-9]', '') = %s "
            "  AND R.D_E_L_E_T_ = ' ' "
            "ORDER BY R.RA_MAT "
            "FETCH FIRST 1 ROW ONLY"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [digits])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        chapa = _as_str(row[1])
        return FuncionarioRhRecord(
            nome=_as_str(row[0]),
            chapa=chapa,
            cpf=_as_str(row[3]),
            rg=_as_str(row[4]),
            endereco=_as_str(row[5]),
            municipio=_as_str(row[6]),
            bairro=_as_str(row[7]),
            uf=_as_str(row[8]),
            cep=_as_str(row[9]),
            telefone=_as_str(row[10]),
            email=_as_str(row[2]),
        )

    def list_paises(self) -> list[ClientePaisRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT PAI_CODIGO, PAI_NOME FROM GERAL.PAIS ORDER BY PAI_NOME"
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClientePaisRecord(pai_codigo=_require_int(row[0]), pai_nome=_as_str(row[1]))
            for row in rows
        ]

    def list_estados(self, *, pai_codigo: int | None) -> list[ClienteEstadoRecord]:
        ensure_smar_client_identifier()
        base = "SELECT EST_CODIGO, PAI_CODIGO, EST_NOME FROM GERAL.ESTADO"
        params: list[int] = []
        if pai_codigo is not None:
            base += " WHERE PAI_CODIGO = %s"
            params.append(pai_codigo)
        base += " ORDER BY EST_NOME"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(base, params)
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClienteEstadoRecord(
                est_codigo=_require_int(row[0]),
                pai_codigo=_require_int(row[1]),
                est_nome=_as_str(row[2]),
            )
            for row in rows
        ]

    def find_estado_by_sigla(
        self, *, sigla: str, pai_codigo: int = 76
    ) -> ClienteEstadoRecord | None:
        token = (sigla or "").strip().upper()
        if not token:
            return None
        ensure_smar_client_identifier()
        sql = (
            "SELECT EST_CODIGO, PAI_CODIGO, EST_NOME FROM GERAL.ESTADO "
            "WHERE PAI_CODIGO = %s AND UPPER(TRIM(EST_SIGLA)) = %s"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [pai_codigo, token])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return ClienteEstadoRecord(
            est_codigo=_require_int(row[0]),
            pai_codigo=_require_int(row[1]),
            est_nome=_as_str(row[2]),
        )

    def list_origens(self) -> list[ClienteOrigemRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT ORIGEM, DESCRICAO FROM SIAOS.ORIGEM ORDER BY ORIGEM"
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClienteOrigemRecord(
                origem=str(row[0]).strip(),
                descricao=_as_str(row[1]),
            )
            for row in rows
        ]


def _fill_cadastro_checagem(
    items: list[ClienteListRecord],
) -> list[ClienteListRecord]:
    """Call SF_CHECA_CADASTRO per page; skip if the package function is missing."""
    if not items:
        return items
    placeholders = ", ".join(["%s"] * len(items))
    sql = (
        "SELECT CODIGO, SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO(CODIGO) "
        f"FROM SIAOS.CLIENTE WHERE CODIGO IN ({placeholders})"
    )
    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            cursor.execute(sql, [item.codigo for item in items])
            by_codigo = {
                _require_int(row[0]): _as_int(row[1]) for row in cursor.fetchall()
            }
    except (DatabaseError, oracledb.Error):
        return items
    return [
        replace(item, cadastro_checagem=by_codigo.get(item.codigo)) for item in items
    ]


def _sql_bloqueado_visible_clause(*, column: str = "BLOQUEADO") -> str:
    """Exclude hidden risk codes; NULL is treated as DEFAULT_BLOQUEADO."""
    hidden = ", ".join(str(code) for code in sorted(HIDDEN_BLOQUEADO_CODIGOS))
    return f"{sql_effective_bloqueado(column)} NOT IN ({hidden})"


def _build_get_where(*, actor_owner: int) -> tuple[str, list[int]]:
    """Detail-by-code: empresa scope only.

    Does not hide ``BLOQUEADO=7`` and does not call ``SF_VALIDA_CONS_CLIENTE``
    (same as the CNPJ wizard). Duplicates stay off the list; opening by
    codigo must still work.
    """
    emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
    where = f"WHERE {emp_sql} AND CODIGO = %s"
    return where, emp_params


def _build_list_where(*, actor_owner: int, search: str) -> tuple[str, list[int | str]]:
    emp_sql, emp_params = sql_emp_filter_clause(actor_owner)
    # Qualify EMP_CODIGO for aliased FROM (c.).
    emp_sql = emp_sql.replace("EMP_CODIGO", "c.EMP_CODIGO")
    clauses = [
        _sql_bloqueado_visible_clause(column="c.BLOQUEADO"),
        emp_sql,
    ]
    params: list[int | str] = [*emp_params]
    term = (search or "").strip()
    if term:
        clauses.append(
            "(UPPER(c.CLIENTE) LIKE UPPER(%s) OR UPPER(c.REDUZIDO) LIKE UPPER(%s) "
            "OR UPPER(c.CIDADE) LIKE UPPER(%s) "
            "OR TRANSLATE(NVL(c.CGC,' '), '0123456789./-', '0123456789') LIKE %s "
            "OR TO_CHAR(c.CODIGO) LIKE %s)"
        )
        like = f"%{term}%"
        digits = "".join(ch for ch in term if ch.isdigit()) or term
        params.extend([like, like, like, f"%{digits}%", like])
    where = "WHERE " + " AND ".join(clauses)
    return where, params


def _row_to_list_record(row: tuple[object, ...]) -> ClienteListRecord:
    return ClienteListRecord(
        codigo=_require_int(row[0]),
        cliente=_as_str(row[1]),
        reduzido=_as_str(row[2]),
        cgc=_as_str(row[3]),
        cidade=_as_str(row[4]),
        estado=_as_str(row[5]),
        emp_codigo=_emp_from_row(row[6]),
        bloqueado=normalize_bloqueado(_as_int(row[7])),
        tipo=_as_str(row[8]),
        crs_cod_letra=resolve_risco_letra(_as_int(row[7]), _as_str(row[9])),
        crs_desc_longa=resolve_risco_desc(_as_int(row[7]), _as_str(row[10])),
        crs_restricao=_as_int(row[11]),
        crs_cores=_as_str(row[12]),
    )


def _row_to_detail_record(row: tuple[object, ...]) -> ClienteRecord:
    return ClienteRecord(
        codigo=_require_int(row[0]),
        origem=_as_str(row[1]),
        cliente=_as_str(row[2]),
        reduzido=_as_str(row[3]),
        endereco1=_as_str(row[4]),
        endereco2=_as_str(row[5]),
        endereco3=_as_str(row[6]),
        cli_bairro=_as_str(row[7]),
        cidade=_as_str(row[8]),
        estado=_as_str(row[9]),
        cep=_as_str(row[10]),
        pais=_as_str(row[11]),
        pai_codigo=_as_int(row[12]),
        est_codigo=_as_int(row[13]),
        telefone1=_as_str(row[14]),
        telefone2=_as_str(row[15]),
        fax=_as_str(row[16]),
        email=_as_str(row[17]),
        homepage=_as_str(row[18]),
        cgc=_as_str(row[19]),
        inscr_est=_as_str(row[20]),
        cli_inscr_mun=_as_str(row[21]),
        tipo=_as_str(row[22]),
        cli_tipo=_as_str(row[23]),
        cli_pes_tipo=_as_str(row[24]),
        cli_contribuinte=_as_int(row[25]),
        cli_ie_isento=_as_int(row[26]),
        cli_cnae=_as_str(row[27]),
        cli_cod_mun_ibge=_as_str(row[28]),
        cli_inscr_suframa=_as_str(row[29]),
        cli_nif=_as_str(row[30]),
        contato=_as_str(row[31]),
        contatotec=_as_str(row[32]),
        contatofin=_as_str(row[33]),
        observa=_as_str(row[34]),
        emp_codigo=_emp_from_row(row[35]),
        bloqueado=normalize_bloqueado(_as_int(row[36])),
        dt_atual=_as_datetime(row[37]),
        dt_cad=_as_datetime(row[38]),
    )


def _as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    return None


def build_oracle_cliente_query_repository() -> OracleClienteQueryRepositoryImpl:
    return OracleClienteQueryRepositoryImpl()
