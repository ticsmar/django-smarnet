"""Oracle query repository for SIAOS.CLIENTE and the catalogs used by the form."""

from __future__ import annotations

from dataclasses import replace
from datetime import datetime

import oracledb
from django.db import DatabaseError, connections

from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteArclassRecord,
    ClienteAreaOsRecord,
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
from apps.commercial.domain.services.cliente_bloqueado import (
    BLOQUEADO_DUPLICIDADE,
    DEFAULT_BLOQUEADO,
    HIDDEN_BLOQUEADO_CODIGOS,
    normalize_bloqueado,
    resolve_risco_desc,
    resolve_risco_desc_curta,
    resolve_risco_letra,
    sql_effective_bloqueado,
)
from apps.commercial.domain.services.cliente_catalogos import BRASIL_PAI_CODIGO
from apps.commercial.domain.services.cnpj_receita import CNPJ_LENGTH, is_cnpj_key
from apps.commercial.domain.services.empresa_ownership import (
    normalize_emp_codigo,
    sql_emp_filter_clause,
)
from apps.shared.infrastructure.oracle_session_context import (
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
    f"ON r.CRS_COD_SIAOS = {sql_effective_bloqueado('c.BLOQUEADO')}"
)

_ENDERECO_REF_CLIENTE_JOIN = "LEFT JOIN SIAOS.CLIENTE C ON C.CODIGO = T.CLI_CODIGO_REF"
_ENDERECO_ESTADO_PAIS_JOINS = (
    " LEFT JOIN GERAL.ESTADO E ON E.EST_CODIGO = NVL("
    "C.EST_CODIGO,"
    " (SELECT MIN(E2.EST_CODIGO) FROM GERAL.ESTADO E2"
    " WHERE UPPER(TRIM(E2.EST_SIGLA)) = UPPER(TRIM(NVL(C.ESTADO, T.ESTADO)))"
    f" AND E2.PAI_CODIGO = NVL(C.PAI_CODIGO, {BRASIL_PAI_CODIGO})))"
    " LEFT JOIN GERAL.PAIS P ON P.PAI_CODIGO = C.PAI_CODIGO"
)
_ENDERECO_ESTADO_PAIS_COLS = ", TRIM(E.EST_NOME), TRIM(P.PAI_NOME)"

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
    "CLI_GRUPO_TRIB",
    "AOS_CODIGO_COM",
    "AOS_CODIGO_TEC",
    "CLASSE",
    "TERRITORIO",
    "VENDEDOR",
    "CLI_EMAIL_NFSE",
    "LIMITECR",
    "CLI_LIMITE_CRV",
    "CCONTABIL",
    "CLI_FOME_ZERO",
    "CLI_MONTADOR",
    "FLAGMULTA",
    "FLAGSUSPEN",
    "FLAGCOBRA",
    "VENCPROG",
    "ZONA_FRANCA",
    "ISS",
    "EXPORTACAO",
    "TAXAMULTA",
    "DESC_MAX",
    "OBSVENC",
    "CLI_RECCOF",
    "CLI_RECCSLL",
    "CLI_RECPIS",
    "MPG_CODIGO",
    "CLI_MOD_PAGT",
    "COBRANCA",
    "ENTREGA",
    "CON_CODIGO_COM",
    "CON_CODIGO_TEC",
    "CON_CODIGO_FIN",
    "MENSAGEM_BLOQUEIO",
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
        record = _row_to_detail_record(row)
        letra, desc, desc_longa, restricao, protheus = _risco_catalog(record.bloqueado)
        return replace(
            record,
            crs_cod_letra=letra,
            crs_desc=desc,
            crs_desc_longa=desc_longa,
            crs_restricao=restricao,
            crs_cod_protheus=protheus,
        )

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
        base = "SELECT EST_CODIGO, PAI_CODIGO, EST_NOME, EST_SIGLA FROM GERAL.ESTADO"
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
                est_sigla=_as_str(row[3]),
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
            "SELECT EST_CODIGO, PAI_CODIGO, EST_NOME, EST_SIGLA FROM GERAL.ESTADO "
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
            est_sigla=_as_str(row[3]),
        )

    def list_origens(self) -> list[ClienteOrigemRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT ORIGEM, DESCRICAO FROM SIAOS.ORIGEM "
                    "WHERE ORI_STATUS = 1 ORDER BY ORIGEM"
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

    def list_arclasses(self) -> list[ClienteArclassRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT CLASS_KEY, DESCR FROM SIAOS.ARCLASS "
                    "WHERE CLASS_ATIVO = 1 ORDER BY DESCR, CLASS_KEY"
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClienteArclassRecord(
                class_key=str(row[0]).strip(),
                descr=_as_str(row[1]),
            )
            for row in rows
        ]

    def list_arlevels(self) -> list[ClienteArlevelRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT TERR_KEY, DESCRIPTION FROM SIAOS.ARLEVEL "
                    "WHERE ARL_ATIVO = 1 ORDER BY DESCRIPTION, TERR_KEY"
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClienteArlevelRecord(
                terr_key=str(row[0]).strip(),
                description=_as_str(row[1]),
            )
            for row in rows
        ]

    def list_arsalesps(self) -> list[ClienteArsalespRecord]:
        ensure_smar_client_identifier()
        sql = (
            "SELECT A.SALESP_KEY CODIGO, "
            "DECODE(U.USU_NOME, NULL, A.SALESPERSON, U.USU_NOME) NOME, "
            "NVL(E.EMP_NOME, 'NOVA SMAR S/A') EMP_NOME "
            "FROM SIAOS.ARSALESP A "
            "LEFT JOIN SIAOS.USUARIO U ON U.USU_CHAPA = A.USU_CHAPA "
            "LEFT JOIN GERAL.EMPRESA E ON E.EMP_CODIGO = U.EMP_CODIGO "
            "WHERE A.ASP_STATUS = 1 "
            "ORDER BY EMP_NOME, NOME"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql)
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

        return [
            ClienteArsalespRecord(
                salesp_key=str(row[0]).strip(),
                nome=_as_str(row[1]),
                emp_nome=_as_str(row[2]),
            )
            for row in rows
        ]

    def list_riscos(self) -> list[ClienteRiscoRecord]:
        ensure_smar_client_identifier()
        sql = (
            "SELECT CRS_COD_SIAOS, TRIM(CRS_COD_LETRA), TRIM(CRS_DESC), "
            "TRIM(CRS_DESC_LONGA), CRS_RESTRICAO "
            "FROM INTEGRACAO.CLIENTE_RISCO ORDER BY CRS_DESC"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql)
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [_risco_record_from_row(row) for row in rows]

    def get_risco(self, codigo: int) -> ClienteRiscoRecord | None:
        ensure_smar_client_identifier()
        sql = (
            "SELECT CRS_COD_SIAOS, TRIM(CRS_COD_LETRA), TRIM(CRS_DESC), "
            "TRIM(CRS_DESC_LONGA), CRS_RESTRICAO "
            "FROM INTEGRACAO.CLIENTE_RISCO WHERE CRS_COD_SIAOS = %s"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return _risco_record_from_row(row)

    def get_empresa_tipo(self, emp_codigo: int | None) -> str | None:
        if emp_codigo is None:
            return None
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT EMP_TIPO FROM GERAL.EMPRESA WHERE EMP_CODIGO = %s",
                    [emp_codigo],
                )
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        if row is None:
            return None
        return _as_str(row[0])

    def list_cidades(
        self, *, pai_codigo: int | None, est_codigo: int | None
    ) -> list[ClienteCidadeRecord]:
        if pai_codigo != BRASIL_PAI_CODIGO or est_codigo is None:
            return []
        estado = self._estado_by_codigo(est_codigo)
        sigla = (estado.est_sigla or "").strip().upper() if estado else ""
        if not sigla:
            return []
        ensure_smar_client_identifier()
        sql = (
            "SELECT TRIM(T.CC2_CODMUN), TRIM(T.CC2_MUN), TRIM(T.CC2_EST) "
            "FROM PROTPROD.CC2010 T "
            "WHERE T.D_E_L_E_T_ = ' ' AND TRIM(T.CC2_EST) = TRIM(%s) "
            "ORDER BY T.CC2_MUN"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [sigla])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [
            ClienteCidadeRecord(
                codigo=str(row[0]).strip(),
                descricao=_as_str(row[1]),
                uf=_as_str(row[2]),
            )
            for row in rows
            if row[0] is not None
        ]

    def list_grupos_tributarios(
        self, *, est_codigo: int | None, cli_tipo: str | None
    ) -> list[ClienteGrupoTributarioRecord]:
        estado = self._estado_by_codigo(est_codigo) if est_codigo else None
        sigla = (estado.est_sigla or "").strip().upper() if estado else ""
        ensure_smar_client_identifier()
        clauses = [
            "T.D_E_L_E_T_ = ' '",
            "TRIM(T.F7_GRPCLI) IS NOT NULL",
            "TRIM(T.F7_DTFIMNT) IS NOT NULL",
        ]
        params: list[str] = []
        if sigla:
            clauses.append("TRIM(T.F7_EST) = TRIM(%s)")
            params.append(sigla)
        tipo = (cli_tipo or "").strip().upper()
        if tipo:
            clauses.append("T.F7_TIPOCLI = %s")
            params.append(tipo)
        sql = (
            "SELECT DISTINCT TRIM(T.F7_GRPCLI), T.F7_EST, T.F7_CNATREC, T.F7_GRUPONC "
            "FROM PROTPROD.SF7010 T "
            f"WHERE {' AND '.join(clauses)} "
            "ORDER BY T.F7_CNATREC, T.F7_EST"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, params)
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        items: list[ClienteGrupoTributarioRecord] = []
        for row in rows:
            codigo = _as_str(row[0])
            if not codigo:
                continue
            uf = _as_str(row[1])
            portaria = _as_str(row[2])
            convenio = _as_str(row[3])
            parts = [f"{uf} ({codigo})" if uf else codigo]
            if convenio:
                parts.append(f"/ CONV.:{convenio}")
            if portaria:
                parts.append(f"/ PORT.:{portaria}")
            items.append(
                ClienteGrupoTributarioRecord(
                    codigo=codigo,
                    descricao=" ".join(parts),
                    uf=uf,
                )
            )
        return items

    def list_areas_os(
        self,
        *,
        tipo_area: str,
        mun_ibge: str | None,
        est_codigo: int | None,
        pai_codigo: int | None,
        current_codigo: int | None,
    ) -> list[ClienteAreaOsRecord]:
        counts = self._area_os_counts(
            mun_ibge=mun_ibge, est_codigo=est_codigo, pai_codigo=pai_codigo
        )
        default_codigo = current_codigo
        if default_codigo is None and counts:
            default_codigo = max(counts, key=lambda key: counts[key])
        ensure_smar_client_identifier()
        sql = (
            "SELECT T.AOS_CODIGO, T.AOS_NOME, T.USU_CHAPA, U.USU_NOME "
            "FROM SIAOS.AREA_OS T "
            "LEFT JOIN SIAOS.USUARIO U ON U.USU_CHAPA = T.USU_CHAPA "
            "WHERE T.AOS_TIPO_AREA = %s "
            "ORDER BY T.AOS_NOME"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [(tipo_area or "C").strip().upper()])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        items: list[ClienteAreaOsRecord] = []
        for row in rows:
            codigo = _require_int(row[0])
            items.append(
                ClienteAreaOsRecord(
                    aos_codigo=codigo,
                    aos_nome=_as_str(row[1]),
                    usu_chapa=_as_int(row[2]),
                    usu_nome=_as_str(row[3]),
                    qtd=counts.get(codigo, 0),
                    is_default=codigo == default_codigo,
                )
            )
        return items

    def list_modelos_pagto(
        self,
        *,
        origem: str | None,
        mpg_codigo: int | None,
        risco_protheus: str | None,
        unrestricted: bool,
    ) -> list[ClienteModeloPagtRecord]:
        ensure_smar_client_identifier()
        allowed: list[int] = []
        if not unrestricted and risco_protheus:
            allowed = self._modelo_risco_codigos(risco_protheus)
        clauses = ["M.MPG_STATUS = 1"]
        params: list[object] = []
        origem_token = (origem or "").strip().upper()
        if origem_token == "CO":
            clauses.append("M.MPG_AREA IN ('I','G')")
        elif origem_token and origem_token != "ALL":
            clauses.append("M.MPG_AREA IN ('N','G')")
        if not unrestricted:
            if allowed:
                placeholders = ", ".join(["%s"] * len(allowed))
                clauses.append(f"M.MPG_CODIGO IN ({placeholders})")
                params.extend(allowed)
            if mpg_codigo != 1:
                clauses.append("M.MPG_CODIGO != 1")
        where = " AND ".join(clauses)
        if mpg_codigo is not None:
            where = f"({where}) OR M.MPG_CODIGO = %s"
            params.append(mpg_codigo)
        sql = (
            "SELECT M.MPG_CODIGO, M.MPG_DESCICAO, M.MPG_AREA, M.MPG_STATUS "
            "FROM SIAOS.MODELO_PAGT M "
            f"WHERE {where} "
            "ORDER BY M.MPG_STATUS DESC, M.MPG_AREA, TO_NUMBER(M.MPG_PRIORIDADE), "
            "M.MPG_DESCICAO"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    sql,
                    params,  # type: ignore[arg-type]
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [
            ClienteModeloPagtRecord(
                mpg_codigo=_require_int(row[0]),
                descricao=_as_str(row[1]),
                mpg_area=_as_str(row[2]),
                mpg_status=_as_int(row[3]),
            )
            for row in rows
        ]

    def list_contatos(self, *, codigo: int, search: str) -> list[ClienteContatoRecord]:
        ensure_smar_client_identifier()
        sql = (
            "SELECT CON_CODIGO, CODCLIENTE, TRIM(NOME), TRIM(DEPTO), TRIM(CARGO), "
            "TRIM(TELEFONE), TRIM(FAX), TRIM(CELULAR), LOWER(TRIM(EMAIL)), CON_ATIVO "
            "FROM SIAOS.CONTATOS WHERE CODCLIENTE = %s"
        )
        params: list[object] = [codigo]
        term = (search or "").strip()
        if term:
            sql += (
                " AND UPPER(TRIM(NOME)||' '||TRIM(DEPTO)||' '||TRIM(CARGO)) "
                "LIKE UPPER(%s)"
            )
            params.append(f"%{term}%")
        sql += " ORDER BY CON_ATIVO DESC, NOME"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    sql,
                    params,  # type: ignore[arg-type]
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc
        return [_contato_from_row(row) for row in rows]

    def list_cobrancas(self, *, codigo: int) -> list[ClienteCobrancaRecord]:
        ensure_smar_client_identifier()
        padrao = self._cliente_chave(codigo, "COBRANCA")
        sql = (
            "SELECT T.CODIGO, TRIM(T.CHAVECOBRA), "
            "TRIM(DECODE(C.CLIENTE, NULL, T.NOME, C.CLIENTE)), "
            "TRIM(DECODE(C.ENDERECO1, NULL, T.ENDERECO1, C.ENDERECO1)), "
            "TRIM(DECODE(C.ENDERECO2, NULL, T.ENDERECO2, C.ENDERECO2)), "
            "TRIM(DECODE(C.ENDERECO3, NULL, T.ENDERECO3, C.ENDERECO3)), "
            "TRIM(T.COB_BAIRRO), "
            "TRIM(DECODE(C.CIDADE, NULL, T.CIDADE, C.CIDADE)), "
            "TRIM(DECODE(C.ESTADO, NULL, T.ESTADO, C.ESTADO)), "
            "TRIM(DECODE(C.CEP, NULL, T.CEP, C.CEP)), "
            "TRIM(DECODE(C.PAIS, NULL, T.PAIS, C.PAIS)), "
            "TRIM(T.CONTATO), "
            "TRIM(DECODE(C.TELEFONE1, NULL, T.TELEFONE1, C.TELEFONE1)), "
            "TRIM(DECODE(C.TELEFONE2, NULL, T.TELEFONE2, C.TELEFONE2)), "
            "LOWER(TRIM(DECODE(C.EMAIL, NULL, T.E_MAIL, C.EMAIL))), "
            "T.ATIVO, T.CLI_CODIGO_REF"
            f"{_ENDERECO_ESTADO_PAIS_COLS} "
            "FROM SIAOS.COBRANCA T "
            f"{_ENDERECO_REF_CLIENTE_JOIN}"
            f"{_ENDERECO_ESTADO_PAIS_JOINS} "
            "WHERE T.CODIGO = %s ORDER BY T.CHAVECOBRA"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        return [_cobranca_from_row(row, padrao) for row in rows]

    def list_embarques(self, *, codigo: int) -> list[ClienteEmbarqueRecord]:
        ensure_smar_client_identifier()
        padrao = self._cliente_chave(codigo, "ENTREGA")
        sql = (
            "SELECT T.CODIGO, TRIM(T.CHAVE_EMB), TRIM(T.NOME), TRIM(T.ENDERECO1), "
            "TRIM(T.ENDERECO2), TRIM(T.ENDERECO3), TRIM(T.EMB_BAIRRO), TRIM(T.CIDADE), "
            "TRIM(T.ESTADO), TRIM(T.CEP), TRIM(T.PAIS), TRIM(T.CONTATO), "
            "TRIM(T.TELEFONE1), TRIM(T.TELEFONE2), LOWER(TRIM(T.E_MAIL)), "
            "T.ATIVO, T.CLI_CODIGO_REF"
            f"{_ENDERECO_ESTADO_PAIS_COLS} "
            "FROM SIAOS.EMBARQUE T "
            f"{_ENDERECO_REF_CLIENTE_JOIN}"
            f"{_ENDERECO_ESTADO_PAIS_JOINS} "
            "WHERE T.CODIGO = %s ORDER BY T.CHAVE_EMB"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        return [_embarque_from_row(row, padrao) for row in rows]

    def list_logs(self, *, codigo: int) -> list[ClienteLogRecord]:
        ensure_smar_client_identifier()
        sql = (
            "SELECT T.CODIGO, T.LCL_DATA, TO_CHAR(T.LCL_DATA,'DD/MM/YYYY'), "
            "T.USU_CHAPA, U.USU_NOME, T.LCL_TEXTO "
            "FROM SIAOS.LOG_CLIENTE T "
            "LEFT JOIN SIAOS.USUARIO U ON U.USU_CHAPA = T.USU_CHAPA "
            "WHERE T.CODIGO = %s ORDER BY T.LCL_DATA DESC"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        return [
            ClienteLogRecord(
                codigo=_require_int(row[0]),
                lcl_data=_as_datetime(row[1]),
                data_txt=_as_str(row[2]),
                usu_chapa=_as_int(row[3]),
                usu_nome=_as_str(row[4]),
                lcl_texto=_as_str(row[5]),
            )
            for row in rows
        ]

    def _estado_by_codigo(self, est_codigo: int) -> ClienteEstadoRecord | None:
        ensure_smar_client_identifier()
        sql = (
            "SELECT EST_CODIGO, PAI_CODIGO, EST_NOME, EST_SIGLA "
            "FROM GERAL.ESTADO WHERE EST_CODIGO = %s"
        )
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [est_codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        if row is None:
            return None
        return ClienteEstadoRecord(
            est_codigo=_require_int(row[0]),
            pai_codigo=_require_int(row[1]),
            est_nome=_as_str(row[2]),
            est_sigla=_as_str(row[3]),
        )

    def _area_os_counts(
        self,
        *,
        mun_ibge: str | None,
        est_codigo: int | None,
        pai_codigo: int | None,
    ) -> dict[int, int]:
        where = ""
        params: list[object] = []
        ibge = (mun_ibge or "").strip()
        if ibge:
            where = "CLI_COD_MUN_IBGE = %s"
            params.append(ibge)
        elif pai_codigo is not None and pai_codigo != BRASIL_PAI_CODIGO:
            where = "PAI_CODIGO = %s"
            params.append(pai_codigo)
        elif est_codigo is not None:
            where = "EST_CODIGO = %s"
            params.append(est_codigo)
        if not where:
            return {}
        sql = (
            "SELECT AOS_CODIGO_COM, COUNT(*) FROM SIAOS.CLIENTE "
            f"WHERE {where} AND BLOQUEADO != {BLOQUEADO_DUPLICIDADE} "
            "AND AOS_CODIGO_COM IS NOT NULL "
            "GROUP BY AOS_CODIGO_COM"
        )
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    sql,
                    params,  # type: ignore[arg-type]
                )
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        return {_require_int(row[0]): int(row[1]) for row in rows if row[0] is not None}

    def _modelo_risco_codigos(self, risco_protheus: str) -> list[int]:
        sql = "SELECT MPG_CODIGO FROM SIAOS.MODELO_RISCO WHERE MRI_RISCO = %s"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [risco_protheus])
                rows = cursor.fetchall()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        return [_require_int(row[0]) for row in rows if row[0] is not None]

    def _cliente_chave(self, codigo: int, column: str) -> str | None:
        sql = f"SELECT {column} FROM SIAOS.CLIENTE WHERE CODIGO = %s"
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, [codigo])
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as extra:
            raise ClienteDatabaseError(str(extra)) from extra
        if row is None:
            return None
        return _as_str(row[0])


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

    Does not hide ``BLOQUEADO=2`` and does not call ``SF_VALIDA_CONS_CLIENTE``
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


_MENSAGEM_BLOQUEIO_COL = 71


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
        cli_grupo_trib=_as_str(row[39]),
        aos_codigo_com=_as_int(row[40]),
        aos_codigo_tec=_as_int(row[41]),
        classe=_as_str(row[42]),
        territorio=_as_str(row[43]),
        vendedor=_as_str(row[44]),
        cli_email_nfse=_as_str(row[45]),
        limitecr=_as_int(row[46]),
        cli_limite_crv=_as_int(row[47]),
        ccontabil=_as_str(row[48]),
        cli_fome_zero=_as_int(row[49]),
        cli_montador=_as_int(row[50]),
        flagmulta=_as_int(row[51]),
        flagsuspen=_as_int(row[52]),
        flagcobra=_as_int(row[53]),
        vencprog=_as_int(row[54]),
        zona_franca=_as_int(row[55]),
        iss=_as_int(row[56]),
        exportacao=_as_int(row[57]),
        taxamulta=_as_int(row[58]),
        desc_max=_as_int(row[59]),
        obsvenc=_as_str(row[60]),
        cli_reccof=_as_str(row[61]),
        cli_reccsll=_as_str(row[62]),
        cli_recpis=_as_str(row[63]),
        mpg_codigo=_as_int(row[64]),
        cli_mod_pagt=_as_str(row[65]),
        cobranca=_as_str(row[66]),
        entrega=_as_str(row[67]),
        con_codigo_com=_as_int(row[68]),
        con_codigo_tec=_as_int(row[69]),
        con_codigo_fin=_as_int(row[70]),
        mensagem_bloqueio=(
            _as_str(row[_MENSAGEM_BLOQUEIO_COL])
            if len(row) > _MENSAGEM_BLOQUEIO_COL
            else None
        ),
    )


def _risco_record_from_row(row: tuple[object, ...]) -> ClienteRiscoRecord:
    return ClienteRiscoRecord(
        codigo=_require_int(row[0]),
        letra=_as_str(row[1]),
        desc=_as_str(row[2]),
        desc_longa=_as_str(row[3]),
        restricao=_as_int(row[4]),
    )


def _risco_catalog(
    bloqueado: int,
) -> tuple[str, str, str, int | None, str | None]:
    codigo = normalize_bloqueado(bloqueado)
    empty = (
        resolve_risco_letra(codigo, None),
        resolve_risco_desc_curta(None, None),
        resolve_risco_desc(codigo, None),
        None,
        None,
    )
    sql = (
        "SELECT TRIM(CRS_COD_LETRA), TRIM(CRS_DESC), TRIM(CRS_DESC_LONGA), "
        "CRS_RESTRICAO, TRIM(CRS_COD_PROTHEUS) "
        "FROM INTEGRACAO.CLIENTE_RISCO WHERE CRS_COD_SIAOS = %s"
    )
    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            cursor.execute(sql, [codigo])
            row = cursor.fetchone()
    except (DatabaseError, oracledb.Error):
        return empty
    if row is None:
        return empty
    letra = resolve_risco_letra(codigo, _as_str(row[0]))
    desc_longa = resolve_risco_desc(codigo, _as_str(row[2]))
    return (
        letra,
        resolve_risco_desc_curta(_as_str(row[1]), desc_longa),
        desc_longa,
        _as_int(row[3]),
        _as_str(row[4]),
    )


def _contato_from_row(row: tuple[object, ...]) -> ClienteContatoRecord:
    return ClienteContatoRecord(
        con_codigo=_require_int(row[0]),
        codcliente=_require_int(row[1]),
        nome=_as_str(row[2]),
        depto=_as_str(row[3]),
        cargo=_as_str(row[4]),
        telefone=_as_str(row[5]),
        fax=_as_str(row[6]),
        celular=_as_str(row[7]),
        email=_as_str(row[8]),
        con_ativo=_as_int(row[9]),
    )


def _cobranca_from_row(
    row: tuple[object, ...], padrao: str | None
) -> ClienteCobrancaRecord:
    chave = str(row[1]).strip() if row[1] is not None else ""
    return ClienteCobrancaRecord(
        codigo=_require_int(row[0]),
        chavecobra=chave,
        nome=_as_str(row[2]),
        endereco1=_as_str(row[3]),
        endereco2=_as_str(row[4]),
        endereco3=_as_str(row[5]),
        cob_bairro=_as_str(row[6]),
        cidade=_as_str(row[7]),
        estado=_as_str(row[8]),
        est_nome=_as_str(row[17]),
        cep=_as_str(row[9]),
        pais=_as_str(row[10]),
        pais_nome=_as_str(row[18]),
        contato=_as_str(row[11]),
        telefone1=_as_str(row[12]),
        telefone2=_as_str(row[13]),
        e_mail=_as_str(row[14]),
        ativo=_as_int(row[15]),
        cli_codigo_ref=_as_int(row[16]),
        is_padrao=bool(padrao) and chave == (padrao or "").strip(),
    )


def _embarque_from_row(
    row: tuple[object, ...], padrao: str | None
) -> ClienteEmbarqueRecord:
    chave = str(row[1]).strip() if row[1] is not None else ""
    return ClienteEmbarqueRecord(
        codigo=_require_int(row[0]),
        chave_emb=chave,
        nome=_as_str(row[2]),
        endereco1=_as_str(row[3]),
        endereco2=_as_str(row[4]),
        endereco3=_as_str(row[5]),
        emb_bairro=_as_str(row[6]),
        cidade=_as_str(row[7]),
        estado=_as_str(row[8]),
        est_nome=_as_str(row[17]),
        cep=_as_str(row[9]),
        pais=_as_str(row[10]),
        pais_nome=_as_str(row[18]),
        contato=_as_str(row[11]),
        telefone1=_as_str(row[12]),
        telefone2=_as_str(row[13]),
        e_mail=_as_str(row[14]),
        ativo=_as_int(row[15]),
        cli_codigo_ref=_as_int(row[16]),
        is_padrao=bool(padrao) and chave == (padrao or "").strip(),
    )


def _as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    return None


def build_oracle_cliente_query_repository() -> OracleClienteQueryRepositoryImpl:
    return OracleClienteQueryRepositoryImpl()
