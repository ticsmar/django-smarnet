"""Oracle repository for SIAOS.PCK_CLIENTE + INTEGRACAO.SP_FUNC2CLIENTE."""

from __future__ import annotations

from typing import Protocol

import oracledb
from django.db import DatabaseError, connections, transaction

from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
)
from apps.administracao.domain.repositories.cliente_repository import (
    CreateClienteFromFuncionarioParams,
    CreateClienteFromFuncionarioResult,
    GravaClienteDadosGeraisParams,
    GravaClienteDadosGeraisResult,
)
from apps.users.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_PACKAGE_CLIENTE = "SIAOS.PCK_CLIENTE"
_PROC_SP_ATUALIZA = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_DADOS_GERAIS"
_PROC_SP_FUNC2CLIENTE = "INTEGRACAO.SP_FUNC2CLIENTE"
_DB_ALIAS = "smar"


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class _DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper


def _raw_oracle_cursor(django_cursor: _DjangoCursorWrapper) -> oracledb.Cursor:
    return django_cursor.cursor.cursor


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


class OracleClienteRepositoryImpl:
    def grava_dados_gerais(
        self, params: GravaClienteDadosGeraisParams
    ) -> GravaClienteDadosGeraisResult:
        ensure_smar_client_identifier()
        binds = _grava_binds(params)
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_cod = raw.var(oracledb.DB_TYPE_NUMBER)
                if params.codigo is not None:
                    n_cod.setvalue(0, params.codigo)
                c_tipo_msg = raw.var(oracledb.DB_TYPE_CHAR, 1)
                vc2_msg = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                vc2_acao = raw.var(oracledb.DB_TYPE_VARCHAR, 4000)
                raw.callproc(
                    _PROC_SP_ATUALIZA,
                    keyword_parameters={
                        **binds,
                        "n_codigo": n_cod,
                        "c_tipo_msg": c_tipo_msg,
                        "vc2_msg": vc2_msg,
                        "vc2_acao": vc2_acao,
                    },
                )
                return GravaClienteDadosGeraisResult(
                    codigo=_as_optional_int(n_cod.getvalue(0)),
                    tipo_msg=_as_str(c_tipo_msg.getvalue(0)),
                    msg=_as_str(vc2_msg.getvalue(0)),
                    acao=_as_str(vc2_acao.getvalue(0)),
                )
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

    def read_emp_codigo(self, codigo: int) -> int | None:
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
        return _as_optional_int(row[0])

    def set_emp_codigo(self, *, codigo: int, emp_codigo: int) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE SET EMP_CODIGO = %s WHERE CODIGO = %s",
                    [emp_codigo, codigo],
                )
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc

    def create_from_funcionario(
        self, params: CreateClienteFromFuncionarioParams
    ) -> CreateClienteFromFuncionarioResult:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_codigo = raw.var(oracledb.DB_TYPE_NUMBER)
                raw.callproc(
                    _PROC_SP_FUNC2CLIENTE,
                    [params.cnpj_or_cpf, n_codigo],
                )
                return CreateClienteFromFuncionarioResult(
                    codigo=_as_optional_int(n_codigo.getvalue(0)),
                )
        except (DatabaseError, oracledb.Error) as exc:
            raise ClienteDatabaseError(str(exc)) from exc


def _grava_binds(
    params: GravaClienteDadosGeraisParams,
) -> dict[str, object | None]:
    """Named binds for SP_ATUALIZA_DADOS_GERAIS (cadastro==9 / bind version).

    The legacy grava_dados.php calls this procedure with named parameters that
    match the CLIENTE column names in lowercase. Extra bind names required by
    the procedure signature (``n_codigo``, ``c_tipo_msg``, ``vc2_msg``,
    ``vc2_acao``) are added by :meth:`OracleClienteRepositoryImpl.grava_dados_gerais`.
    """
    return {
        "c_tipo_cadastro": params.tipo_cadastro,
        "vc2_cliente": params.cliente,
        "vc2_reduzido": params.reduzido,
        "vc2_tipo": params.tipo,
        "vc2_origem": params.origem,
        "vc2_endereco1": params.endereco1,
        "vc2_endereco2": params.endereco2,
        "vc2_endereco3": params.endereco3,
        "vc2_bairro": params.cli_bairro,
        "vc2_cidade": params.cidade,
        "vc2_estado": params.estado,
        "vc2_cep": params.cep,
        "vc2_pais": params.pais,
        "n_pai_codigo": params.pai_codigo,
        "n_est_codigo": params.est_codigo,
        "vc2_telefone1": params.telefone1,
        "vc2_telefone2": params.telefone2,
        "vc2_fax": params.fax,
        "vc2_email": params.email,
        "vc2_homepage": params.homepage,
        "vc2_cgc": params.cgc,
        "vc2_inscr_est": params.inscr_est,
        "vc2_inscr_mun": params.cli_inscr_mun,
        "n_ie_isento": params.cli_ie_isento,
        "n_contribuinte": params.cli_contribuinte,
        "vc2_cnae": params.cli_cnae,
        "vc2_cod_mun_ibge": params.cli_cod_mun_ibge,
        "vc2_inscr_suframa": params.cli_inscr_suframa,
        "vc2_nif": params.cli_nif,
        "vc2_pes_tipo": params.cli_pes_tipo,
        "vc2_contato": params.contato,
        "vc2_contatotec": params.contatotec,
        "vc2_contatofin": params.contatofin,
        "vc2_observa": params.observa,
        "n_usu_chapa": params.usu_chapa,
        "c_idioma_msg": params.idioma_msg,
    }


def build_oracle_cliente_repository() -> OracleClienteRepositoryImpl:
    return OracleClienteRepositoryImpl()
