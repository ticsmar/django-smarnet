"""Oracle write repository for PROP_ARQUIVO / PROP_ARQ_LOG."""

from dataclasses import dataclass
from typing import Protocol, cast

import oracledb
from django.db import DatabaseError, connections, transaction

from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoNotFoundError,
    ArquivoPastaFixaError,
)
from apps.files.domain.repositories.arquivo_repository import (
    CreateFileParams,
    CreateFolderParams,
    MoveNodeParams,
    TrashNodesParams,
)
from apps.files.infrastructure.repositories.oracle_helpers import (
    as_optional_int,
    as_str,
    raw_oracle_cursor,
    wrap_database_error,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"


class _SqlCursor(Protocol):
    def execute(self, sql: str, params: list[object] | None = None) -> object: ...

    def fetchone(self) -> tuple[object, ...] | None: ...


_NODE_SQL = """
SELECT PAR_CODIGO, PAR_NOME, NVL(PAR_PASTA_FIXA, 0), PAR_TIPO
FROM SIAOS.PROP_ARQUIVO
WHERE PAR_CODIGO = %s AND PAR_SISTEMA = %s AND PAR_FILTRO = %s
"""

_INSERT_FOLDER_SQL = """
INSERT INTO SIAOS.PROP_ARQUIVO (
  PAR_CODIGO, PAR_NOME, PAR_DESCRICAO, PAR_DATA, PAR_CODIGO_PAI, PAR_TIPO,
  PAR_MODO_ARQUIVO, USU_CHAPA, PAR_SISTEMA, PAR_FILTRO, PAR_PASTA_FIXA, ACE_CODIGO
) VALUES (%s, %s, %s, SYSDATE, %s, 0, 'W', %s, %s, %s, 0, %s)
"""

_INSERT_LOG_SQL = """
INSERT INTO SIAOS.PROP_ARQ_LOG (
  PAR_CODIGO, PAL_DATA, PAL_NOME, USU_CHAPA, PAL_ACAO, PAL_SISTEMA, PAL_FILTRO
) VALUES (%s, SYSDATE, %s, %s, %s, %s, %s)
"""

_MOVE_SQL = """
UPDATE SIAOS.PROP_ARQUIVO
SET PAR_CODIGO_PAI = %s, PAR_NOME = NVL(%s, PAR_NOME)
WHERE PAR_CODIGO = %s AND PAR_SISTEMA = %s AND PAR_FILTRO = %s
"""

_TRASH_SQL = """
UPDATE SIAOS.PROP_ARQUIVO SET PAR_LIXEIRA = SYSDATE
WHERE PAR_CODIGO = %s AND PAR_SISTEMA = %s AND PAR_FILTRO = %s
"""

_INSERT_FILE_SQL = """
INSERT INTO SIAOS.PROP_ARQUIVO (
  PAR_CODIGO, PAR_NOME, PAR_DESCRICAO, PAR_ARQUIVO, PAR_DATA, PAR_TAMANHO,
  PAR_CODIGO_PAI, PAR_TIPO, PAR_MODO_ARQUIVO, USU_CHAPA, PAR_SISTEMA,
  PAR_FILTRO, PAR_PASTA_FIXA, ACE_CODIGO
) VALUES (
  :par_codigo, :par_nome, :par_descricao, :par_arquivo, SYSDATE, :par_tamanho,
  :par_codigo_pai, 1, 'W', :usu_chapa, :par_sistema, :par_filtro, 0, :ace_codigo
)
"""


@dataclass(frozen=True, slots=True)
class _LogLine:
    par_codigo: int
    nome: str
    acao: str
    sistema: int
    filtro: str
    usu_chapa: int


def _chapa(value: int) -> int | None:
    return value if value else None


def _next_par_codigo(cursor: object) -> int:
    typed = cast("_SqlCursor", cursor)
    typed.execute("LOCK TABLE SIAOS.PROP_ARQUIVO IN EXCLUSIVE MODE")
    typed.execute("SELECT NVL(MAX(PAR_CODIGO), 0) FROM SIAOS.PROP_ARQUIVO")
    row = typed.fetchone()
    current = int(str(row[0])) if row and row[0] is not None else 0
    return current + 1


def _insert_log(cursor: object, line: _LogLine) -> None:
    cast("_SqlCursor", cursor).execute(
        _INSERT_LOG_SQL,
        [
            line.par_codigo,
            line.nome,
            _chapa(line.usu_chapa),
            line.acao,
            line.sistema,
            line.filtro,
        ],
    )


def _fetch_node(
    cursor: object, par_codigo: int, sistema: int, filtro: str
) -> tuple[int, str, int, int]:
    typed = cast("_SqlCursor", cursor)
    typed.execute(_NODE_SQL, [par_codigo, sistema, filtro])
    row = typed.fetchone()
    if row is None:
        raise ArquivoNotFoundError("Item não encontrado neste repositório.")
    return (
        int(as_optional_int(row[0]) or 0),
        as_str(row[1]) or "",
        int(as_optional_int(row[2]) or 0),
        int(as_optional_int(row[3]) or 0),
    )


def _refuse_fixa(pasta_fixa: int) -> None:
    if pasta_fixa == 1:
        raise ArquivoPastaFixaError("Pasta fixa não pode ser apagada ou movida.")


class OracleArquivoRepositoryImpl:
    def create_folder(self, params: CreateFolderParams) -> int:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                par_codigo = _next_par_codigo(cursor)
                cursor.execute(
                    _INSERT_FOLDER_SQL,
                    [
                        par_codigo,
                        params.nome,
                        params.descricao or None,
                        params.par_codigo_pai,
                        _chapa(params.usu_chapa),
                        params.sistema,
                        params.filtro,
                        params.ace_codigo,
                    ],
                )
                _insert_log(
                    cursor,
                    _LogLine(
                        par_codigo=par_codigo,
                        nome=params.nome,
                        acao="INSERT",
                        sistema=params.sistema,
                        filtro=params.filtro,
                        usu_chapa=params.usu_chapa,
                    ),
                )
                return par_codigo
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def create_file(self, params: CreateFileParams) -> int:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                par_codigo = _next_par_codigo(cursor)
                raw = raw_oracle_cursor(cursor)
                raw.setinputsizes(par_arquivo=oracledb.DB_TYPE_BLOB)
                raw.execute(
                    _INSERT_FILE_SQL,
                    {
                        "par_codigo": par_codigo,
                        "par_nome": params.nome,
                        "par_descricao": params.descricao or None,
                        "par_arquivo": params.content,
                        "par_tamanho": params.tamanho,
                        "par_codigo_pai": params.par_codigo_pai,
                        "usu_chapa": _chapa(params.usu_chapa),
                        "par_sistema": params.sistema,
                        "par_filtro": params.filtro,
                        "ace_codigo": params.ace_codigo,
                    },
                )
                _insert_log(
                    cursor,
                    _LogLine(
                        par_codigo=par_codigo,
                        nome=params.nome,
                        acao="INSERT",
                        sistema=params.sistema,
                        filtro=params.filtro,
                        usu_chapa=params.usu_chapa,
                    ),
                )
                return par_codigo
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def move_node(self, params: MoveNodeParams) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                _codigo, nome, pasta_fixa, _tipo = _fetch_node(
                    cursor,
                    params.par_codigo,
                    params.sistema,
                    params.filtro,
                )
                _refuse_fixa(pasta_fixa)
                final_nome = params.nome or nome
                cursor.execute(
                    _MOVE_SQL,
                    [
                        params.par_codigo_pai,
                        params.nome,
                        params.par_codigo,
                        params.sistema,
                        params.filtro,
                    ],
                )
                _insert_log(
                    cursor,
                    _LogLine(
                        par_codigo=params.par_codigo,
                        nome=final_nome,
                        acao="MOVE",
                        sistema=params.sistema,
                        filtro=params.filtro,
                        usu_chapa=params.usu_chapa,
                    ),
                )
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc

    def trash_nodes(self, params: TrashNodesParams) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                for par_codigo in params.par_codigos:
                    _trash_one(cursor, par_codigo, params)
        except DatabaseError as exc:
            raise wrap_database_error(exc) from exc


def _trash_one(cursor: object, par_codigo: int, params: TrashNodesParams) -> None:
    _codigo, nome, pasta_fixa, _tipo = _fetch_node(
        cursor, par_codigo, params.sistema, params.filtro
    )
    _refuse_fixa(pasta_fixa)
    cast("_SqlCursor", cursor).execute(
        _TRASH_SQL, [par_codigo, params.sistema, params.filtro]
    )
    _insert_log(
        cursor,
        _LogLine(
            par_codigo=par_codigo,
            nome=nome,
            acao="DELETE",
            sistema=params.sistema,
            filtro=params.filtro,
            usu_chapa=params.usu_chapa,
        ),
    )


def build_oracle_arquivo_repository() -> OracleArquivoRepositoryImpl:
    return OracleArquivoRepositoryImpl()
