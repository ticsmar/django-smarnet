"""Oracle read repository for PROP_RECADO / TIPO_RECADO / MOTIVO / FOLLOW_CLIENTE."""

from datetime import datetime

from django.db import DatabaseError, connections

from apps.followup.domain.repositories.recado_repository import (
    ClienteNotesRecord,
    MotivoRecord,
    RecadoRecord,
    RecadoStatusRecord,
    TipoRecadoRecord,
)
from apps.followup.domain.services.sistema_catalog import (
    EMP_HQ,
    HIDDEN_TRE_CODIGOS,
    MOTIVO_EXCLUIDOS_EMP_HQ,
    MOTIVO_EXCLUIDOS_PADRAO,
)
from apps.followup.infrastructure.repositories.oracle_helpers import (
    as_datetime,
    as_optional_int,
    as_str,
    read_clob,
    tre_sistema_sql_predicate,
    wrap_database_error,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"
_HIDDEN = ",".join(str(code) for code in HIDDEN_TRE_CODIGOS)

_LIST_SQL = f"""
SELECT PR.PRE_CODIGO,
       PR.TRE_CODIGO,
       TR.TRE_DESCRICAO,
       NVL(TR.TRE_TIPO_CANC, 0) AS TRE_TIPO_CANC,
       NVL(TR.TRE_GLOBAL, 1) AS TRE_GLOBAL,
       PR.USU_CHAPA,
       U.USU_NOME,
       PR.PRE_MENSAGEM,
       PR.PRE_DATA,
       PR.PRE_DT_ALARM,
       PR.PRE_DT_BAIXA,
       PR.MOT_CODIGO,
       M.MOT_DESCRICAO
  FROM SIAOS.PROP_RECADO PR
  LEFT JOIN SIAOS.USUARIO U ON U.USU_CHAPA = PR.USU_CHAPA
  LEFT JOIN SIAOS.TIPO_RECADO TR ON TR.TRE_CODIGO = PR.TRE_CODIGO
  LEFT JOIN SIAOS.MOTIVO M ON M.MOT_CODIGO = PR.MOT_CODIGO
 WHERE PR.PRE_SISTEMA = %s
   AND PR.PRE_FILTRO = %s
   AND NVL(PR.TRE_CODIGO, 0) NOT IN ({_HIDDEN})
"""

_ORDER_SQL = """
 ORDER BY DECODE(PR.TRE_CODIGO, 9, 'A', 'B'),
          PR.PRE_DATA DESC,
          TR.TRE_DESCRICAO
"""

_GET_SQL = _LIST_SQL + " AND PR.PRE_CODIGO = %s" + _ORDER_SQL

_TIPOS_SQL_HEAD = """
SELECT TR.TRE_CODIGO,
       TR.TRE_DESCRICAO,
       NVL(TR.TRE_TIPO_CANC, 0) AS TRE_TIPO_CANC,
       NVL(TR.TRE_GLOBAL, 1) AS TRE_GLOBAL
  FROM SIAOS.TIPO_RECADO TR
 WHERE TR.TRE_ATIVO = 1
   AND {tre_sistema_predicate}
 ORDER BY TR.TRE_DESCRICAO
"""


def _tipos_sql(sistema: int) -> tuple[str, list[str]]:
    predicate, params = tre_sistema_sql_predicate("TR.TRE_SISTEMA", sistema)
    return _TIPOS_SQL_HEAD.format(tre_sistema_predicate=predicate), params


_TIPO_SQL = """
SELECT TR.TRE_CODIGO,
       TR.TRE_DESCRICAO,
       NVL(TR.TRE_TIPO_CANC, 0),
       NVL(TR.TRE_GLOBAL, 1)
  FROM SIAOS.TIPO_RECADO TR
 WHERE TR.TRE_CODIGO = %s
   AND TR.TRE_ATIVO = 1
"""

_MOTIVOS_SQL = """
SELECT M.MOT_CODIGO,
       M.MOT_DESCRICAO
  FROM SIAOS.MOTIVO M
 WHERE M.MOT_CODIGO NOT IN ({excl})
 ORDER BY M.MOT_ORDEM, M.MOT_CODIGO
"""

_STATUS_SQL = """
SELECT MIN(R.PRE_DT_ALARM) AS PRE_DT_ALARM,
       MAX(T.TRE_DESCRICAO) AS TRE_DESCRICAO
  FROM SIAOS.PROP_RECADO R
 INNER JOIN SIAOS.TIPO_RECADO T ON T.TRE_CODIGO = R.TRE_CODIGO
 WHERE R.PRE_SISTEMA = %s
   AND R.PRE_FILTRO = %s
   AND R.PRE_DT_BAIXA IS NULL
   AND (TRUNC(R.PRE_DT_ALARM) <= TRUNC(SYSDATE + 3)
        OR R.PRE_DT_ALARM IS NULL)
"""

_NOTES_SQL = """
SELECT CODIGO, FCL_DESCRICAO
  FROM SIAOS.FOLLOW_CLIENTE
 WHERE CODIGO = %s
"""


def _recado_from_row(row: tuple[object, ...]) -> RecadoRecord:
    return RecadoRecord(
        pre_codigo=int(as_optional_int(row[0]) or 0),
        tre_codigo=as_optional_int(row[1]),
        tre_descricao=as_str(row[2]) or "Mensagem",
        tre_tipo_canc=int(as_optional_int(row[3]) or 0),
        tre_global=int(as_optional_int(row[4]) or 1),
        usu_chapa=int(as_optional_int(row[5]) or 0),
        usu_nome=as_str(row[6]),
        pre_mensagem=read_clob(row[7]),
        pre_data=as_datetime(row[8]),
        pre_dt_alarm=as_datetime(row[9]),
        pre_dt_baixa=as_datetime(row[10]),
        mot_codigo=as_optional_int(row[11]),
        mot_descricao=as_str(row[12]),
    )


class OracleRecadoQueryRepositoryImpl:
    def list_recados(
        self, sistema: int, filtro: str, tre_codigo: int | None
    ) -> list[RecadoRecord]:
        ensure_smar_client_identifier()
        sql = _LIST_SQL
        params: list[int] = [sistema, int(filtro)]
        if tre_codigo:
            sql += " AND PR.TRE_CODIGO = %s"
            params.append(tre_codigo)
        sql += _ORDER_SQL
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, params)
                return [_recado_from_row(row) for row in cursor.fetchall()]
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def get_recado(
        self, pre_codigo: int, sistema: int, filtro: str
    ) -> RecadoRecord | None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_GET_SQL, [sistema, int(filtro), pre_codigo])
                row = cursor.fetchone()
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc
        if row is None:
            return None
        return _recado_from_row(row)

    def list_tipos(self, sistema: int) -> list[TipoRecadoRecord]:
        ensure_smar_client_identifier()
        sql, params = _tipos_sql(sistema)
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql, params)
                return [
                    TipoRecadoRecord(
                        tre_codigo=int(as_optional_int(row[0]) or 0),
                        tre_descricao=as_str(row[1]) or "",
                        tre_tipo_canc=int(as_optional_int(row[2]) or 0),
                        tre_global=int(as_optional_int(row[3]) or 1),
                    )
                    for row in cursor.fetchall()
                ]
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def get_tipo(self, tre_codigo: int) -> TipoRecadoRecord | None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_TIPO_SQL, [tre_codigo])
                row = cursor.fetchone()
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc
        if row is None:
            return None
        return TipoRecadoRecord(
            tre_codigo=int(as_optional_int(row[0]) or 0),
            tre_descricao=as_str(row[1]) or "",
            tre_tipo_canc=int(as_optional_int(row[2]) or 0),
            tre_global=int(as_optional_int(row[3]) or 1),
        )

    def list_motivos(self, emp_codigo: int | None) -> list[MotivoRecord]:
        ensure_smar_client_identifier()
        excluded = (
            MOTIVO_EXCLUIDOS_EMP_HQ if emp_codigo in EMP_HQ else MOTIVO_EXCLUIDOS_PADRAO
        )
        sql = _MOTIVOS_SQL.format(excl=",".join(str(code) for code in excluded))
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(sql)
                return [
                    MotivoRecord(
                        mot_codigo=int(as_optional_int(row[0]) or 0),
                        mot_descricao=as_str(row[1]) or "",
                    )
                    for row in cursor.fetchall()
                ]
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def status(self, sistema: int, filtro: str) -> RecadoStatusRecord:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_STATUS_SQL, [sistema, int(filtro)])
                row = cursor.fetchone()
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc
        if row is None:
            return RecadoStatusRecord(
                nivel="none", proximo_alarme=None, tre_descricao=None
            )
        alarm = as_datetime(row[0])
        descricao = as_str(row[1])
        if alarm is None and descricao is None:
            return RecadoStatusRecord(
                nivel="none", proximo_alarme=None, tre_descricao=None
            )
        nivel = "warning" if alarm is not None and alarm > datetime.now() else "ok"
        return RecadoStatusRecord(
            nivel=nivel, proximo_alarme=alarm, tre_descricao=descricao
        )

    def get_cliente_notes(self, codigo: int) -> ClienteNotesRecord:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_NOTES_SQL, [codigo])
                row = cursor.fetchone()
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc
        if row is None:
            return ClienteNotesRecord(codigo=codigo, descricao="", has_notes=False)
        text = read_clob(row[1])
        return ClienteNotesRecord(
            codigo=int(as_optional_int(row[0]) or codigo),
            descricao=text,
            has_notes=bool(text.strip()),
        )


def build_oracle_recado_query_repository() -> OracleRecadoQueryRepositoryImpl:
    return OracleRecadoQueryRepositoryImpl()
