"""Oracle write repository: SP_GRAVA_FOLLOWUP and SP_UPDATE_FOLLOWUP."""

import oracledb
from django.db import DatabaseError, connections

from apps.followup.domain.exceptions.followup_exceptions import RecadoNotFoundError
from apps.followup.infrastructure.repositories.oracle_helpers import (
    raw_oracle_cursor,
    wrap_database_error,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"
_PROC_GRAVA = "SIAOS.PCK_SMART_SALES3.SP_GRAVA_FOLLOWUP"
_PROC_CLIENTE = "SIAOS.SP_UPDATE_FOLLOWUP"


class OracleRecadoWriteRepositoryImpl:
    def grava_followup(
        self,
        opcao: int,
        pre_codigo: int | None,
        filtro: str,
        tre_codigo: int,
        mot_codigo: int | None,
        mensagem: str,
        alarm: str,
    ) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = raw_oracle_cursor(cursor)
                n_erro = raw.var(oracledb.DB_TYPE_NUMBER)
                raw.callproc(
                    _PROC_GRAVA,
                    [
                        opcao,
                        pre_codigo,
                        int(filtro),
                        tre_codigo,
                        mot_codigo,
                        mensagem,
                        alarm or None,
                        None,
                        None,
                        n_erro,
                    ],
                )
                erro = n_erro.getvalue()
                if erro is not None and int(erro) == 1:
                    raise RecadoNotFoundError("Follow-up não encontrado.")
        except RecadoNotFoundError:
            raise
        except (DatabaseError, oracledb.Error) as exc:
            raise wrap_database_error(exc) from exc

    def append_cliente_notes(self, usu_chapa: int, codigo: int, texto: str) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = raw_oracle_cursor(cursor)
                raw.callproc(
                    _PROC_CLIENTE,
                    [usu_chapa, codigo, "", "Clientes", texto, "L"],
                )
        except (DatabaseError, oracledb.Error) as exc:
            raise wrap_database_error(exc) from exc


def build_oracle_recado_write_repository() -> OracleRecadoWriteRepositoryImpl:
    return OracleRecadoWriteRepositoryImpl()
