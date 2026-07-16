"""Oracle repository for NOVASMAR.PCK_PLASMA_RECEBIMENTO procedures."""

from __future__ import annotations

from typing import Any

import oracledb
from django.db import DatabaseError, connections

from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoDatabaseError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecContatoParams,
    GravaFornecContatoResult,
    GravaFornecedorParams,
    GravaFornecedorResult,
)

_PACKAGE = "NOVASMAR.PCK_PLASMA_RECEBIMENTO"
_DB_ALIAS = "smar"


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(value)


def _raw_oracle_cursor(django_cursor: Any) -> Any:
    """Underlying oracledb cursor (Django.var wraps vars in VariableWrapper)."""
    # CursorWrapper -> FormatStylePlaceholderCursor -> oracledb.Cursor
    return django_cursor.cursor.cursor


class OracleRecebimentoRepositoryImpl:
    def grava_fornecedor(self, params: GravaFornecedorParams) -> GravaFornecedorResult:
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_cod = raw.var(oracledb.DB_TYPE_NUMBER)
                if params.cod_fornec is not None:
                    n_cod.setvalue(0, params.cod_fornec)
                c_tipo_msg = raw.var(oracledb.DB_TYPE_CHAR, 1)
                vc2_msg = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                vc2_acao = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                raw.callproc(
                    f"{_PACKAGE}.SP_GRAVA_FORNECEDOR",
                    [
                        n_cod,
                        params.razao_soc,
                        params.nome_reduz,
                        params.endereco,
                        params.bairro,
                        params.munic,
                        params.cep,
                        params.estado,
                        params.cod_pais,
                        params.idioma_msg,
                        c_tipo_msg,
                        vc2_msg,
                        vc2_acao,
                    ],
                )
                return GravaFornecedorResult(
                    cod_fornec=_as_optional_int(n_cod.getvalue(0)),
                    tipo_msg=_as_str(c_tipo_msg.getvalue(0)),
                    msg=_as_str(vc2_msg.getvalue(0)),
                    acao=_as_str(vc2_acao.getvalue(0)),
                )
        except DatabaseError as exc:
            raise RecebimentoDatabaseError(str(exc)) from exc

    def ativa_fornecedor(self, cod_fornec: int) -> None:
        self._call_simple(f"{_PACKAGE}.SP_ATIVA_FORNECEDOR", [cod_fornec])

    def inativa_fornecedor(self, cod_fornec: int) -> None:
        self._call_simple(f"{_PACKAGE}.SP_INATIVA_FORNECEDOR", [cod_fornec])

    def grava_fornec_contato(
        self, params: GravaFornecContatoParams
    ) -> GravaFornecContatoResult:
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_cod = raw.var(oracledb.DB_TYPE_NUMBER)
                if params.cod_contato is not None:
                    n_cod.setvalue(0, params.cod_contato)
                c_tipo_msg = raw.var(oracledb.DB_TYPE_CHAR, 1)
                vc2_msg = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                vc2_acao = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                raw.callproc(
                    f"{_PACKAGE}.SP_GRAVA_FORNEC_CONTATO",
                    [
                        n_cod,
                        params.cod_fornec,
                        params.nome,
                        params.cargo,
                        params.email,
                        params.telefone,
                        params.idioma_msg,
                        c_tipo_msg,
                        vc2_msg,
                        vc2_acao,
                    ],
                )
                return GravaFornecContatoResult(
                    cod_contato=_as_optional_int(n_cod.getvalue(0)),
                    tipo_msg=_as_str(c_tipo_msg.getvalue(0)),
                    msg=_as_str(vc2_msg.getvalue(0)),
                    acao=_as_str(vc2_acao.getvalue(0)),
                )
        except DatabaseError as exc:
            raise RecebimentoDatabaseError(str(exc)) from exc

    def exclui_fornec_contato(self, cod_contato: int) -> None:
        self._call_simple(f"{_PACKAGE}.SP_EXCLUI_FORNEC_CONTATO", [cod_contato])

    def _call_simple(self, procedure: str, args: list[Any]) -> None:
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                _raw_oracle_cursor(cursor).callproc(procedure, args)
        except DatabaseError as exc:
            raise RecebimentoDatabaseError(str(exc)) from exc


def build_oracle_recebimento_repository() -> OracleRecebimentoRepositoryImpl:
    return OracleRecebimentoRepositoryImpl()
