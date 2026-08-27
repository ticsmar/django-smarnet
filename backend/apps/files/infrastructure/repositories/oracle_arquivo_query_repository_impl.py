"""Oracle read repository for PROP_ARQUIVO / PROP_ARQ_LOG."""

from django.db import DatabaseError, connections

from apps.files.domain.repositories.arquivo_repository import (
    ArquivoBlobRecord,
    ArquivoHistoricoRecord,
    ArquivoNodeRecord,
)
from apps.files.infrastructure.repositories.oracle_helpers import (
    as_datetime,
    as_optional_int,
    as_str,
    read_blob,
    wrap_database_error,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"

_TREE_SQL = """
SELECT PA.PAR_CODIGO, PA.PAR_CODIGO_PAI, PA.PAR_TIPO,
       NVL(LN.LTE_DESCRICAO, PA.PAR_NOME) AS NOME,
       NVL(LD.LTE_DESCRICAO, PA.PAR_DESCRICAO) AS DESCRICAO,
       PA.PAR_TAMANHO, PA.PAR_DATA, PA.ACE_CODIGO,
       NVL(PA.PAR_PASTA_FIXA, 0) AS PAR_PASTA_FIXA, PA.PAR_LIXEIRA
FROM SIAOS.PROP_ARQUIVO PA
LEFT JOIN SMARNET.LEGENDA_TEXTO LN
  ON LN.LEG_CODIGO = PA.LEG_CODIGO AND LN.LIN_COD = %s
LEFT JOIN SMARNET.LEGENDA_TEXTO LD
  ON LD.LEG_CODIGO = PA.LEG_CODIGO_DESC AND LD.LIN_COD = %s
WHERE PA.PAR_SISTEMA = %s AND PA.PAR_FILTRO = %s
ORDER BY PA.PAR_TIPO, NVL(LN.LTE_DESCRICAO, PA.PAR_NOME)
"""

_BLOB_SQL = """
SELECT PAR_NOME, PAR_ARQUIVO, PAR_TIPO
FROM SIAOS.PROP_ARQUIVO
WHERE PAR_CODIGO = %s AND PAR_SISTEMA = %s AND PAR_FILTRO = %s
"""

_HIST_SQL = """
SELECT L.PAL_NOME, L.PAL_ACAO, L.PAL_DATA, U.USU_NOME
FROM SIAOS.PROP_ARQ_LOG L
LEFT JOIN SIAOS.USUARIO U ON U.USU_CHAPA = L.USU_CHAPA
WHERE L.PAL_SISTEMA = %s AND L.PAL_FILTRO = %s
ORDER BY L.PAL_DATA DESC
"""


def _node_from_row(row: tuple[object, ...]) -> ArquivoNodeRecord:
    return ArquivoNodeRecord(
        par_codigo=int(as_optional_int(row[0]) or 0),
        par_codigo_pai=as_optional_int(row[1]),
        tipo=int(as_optional_int(row[2]) or 0),
        nome=as_str(row[3]) or "",
        descricao=as_str(row[4]),
        tamanho=as_optional_int(row[5]),
        data=as_datetime(row[6]),
        ace_codigo=as_optional_int(row[7]),
        pasta_fixa=int(as_optional_int(row[8]) or 0) == 1,
        in_lixeira=row[9] is not None,
    )


class OracleArquivoQueryRepositoryImpl:
    def list_nodes(
        self, sistema: int, filtro: str, lin_cod: int
    ) -> list[ArquivoNodeRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_TREE_SQL, [lin_cod, lin_cod, sistema, filtro])
                return [_node_from_row(row) for row in cursor.fetchall()]
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def get_blob(
        self, sistema: int, filtro: str, par_codigo: int
    ) -> ArquivoBlobRecord | None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_BLOB_SQL, [par_codigo, sistema, filtro])
                row = cursor.fetchone()
        except DatabaseError as except_db:
            raise wrap_database_error(except_db) from except_db
        if row is None:
            return None
        return ArquivoBlobRecord(
            par_codigo=par_codigo,
            nome=as_str(row[0]) or "arquivo",
            content=read_blob(row[1]),
            tipo=int(as_optional_int(row[2]) or 0),
        )

    def list_historico(self, sistema: int, filtro: str) -> list[ArquivoHistoricoRecord]:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(_HIST_SQL, [sistema, filtro])
                rows = cursor.fetchall()
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc
        return [
            ArquivoHistoricoRecord(
                nome=as_str(row[0]) or "",
                acao=as_str(row[1]) or "",
                data=as_datetime(row[2]),
                usuario_nome=as_str(row[3]),
            )
            for row in rows
        ]


def build_oracle_arquivo_query_repository() -> OracleArquivoQueryRepositoryImpl:
    return OracleArquivoQueryRepositoryImpl()
