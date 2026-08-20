"""Oracle helpers for GERAL.PCK_USUARIO procedures (legado acesso/solicitacao)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol

import oracledb
from django.db import DatabaseError, connections

_PACKAGE = "GERAL.PCK_USUARIO"
_DB_ALIAS = "smar"


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class _DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper


def _raw_oracle_cursor(django_cursor: _DjangoCursorWrapper) -> oracledb.Cursor:
    return django_cursor.cursor.cursor


def _as_optional_str(value: object | None, max_len: int | None = None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    if max_len is not None:
        return text[:max_len]
    return text


def _as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


class PckUsuarioDatabaseError(Exception):
    """Raised when a PCK_USUARIO call fails."""


@dataclass(frozen=True)
class SpInEmpresaResult:
    emp_codigo: int
    emp_nome: str | None
    emp_tipo: str | None


def sp_in_pre_pessoa(  # noqa: PLR0913
    *,
    nome: str,
    email: str,
    fus_codigo: int,
    sexo: str | None,
    lin_cod: int,
    endereco: str | None,
    bairro: str | None,
    cidade: str | None,
    est_codigo: int | None,
    estado: str | None,
    cep: str | None,
    pai_codigo: int,
    tep_codigo: str,
    emp_nome: str | None,
    emp_endereco: str | None,
    emp_bairro: str | None,
    emp_cidade: str | None,
    emp_est_codigo: int | None,
    emp_estado: str | None,
    emp_cep: str | None,
    emp_pai_codigo: int | None,
    emp_homepage: str | None,
    motivo: str | None,
) -> int:
    """
    Call GERAL.PCK_USUARIO.SP_IN_PRE_PESSOA (legado extranet/grava.php).

    Returns PPE_CODIGO (OUT).
    """
    nome_clean = _as_optional_str(nome, 100)
    if not nome_clean:
        raise PckUsuarioDatabaseError("Nome da solicitacao e obrigatorio.")
    tep = (_as_optional_str(tep_codigo, 1) or "").upper()
    if tep not in {"C", "F", "S"}:
        raise PckUsuarioDatabaseError("TEP_CODIGO invalido.")

    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            raw = _raw_oracle_cursor(cursor)
            n_ppe_codigo = raw.var(oracledb.DB_TYPE_NUMBER)
            raw.callproc(
                f"{_PACKAGE}.SP_IN_PRE_PESSOA",
                [
                    nome_clean,
                    _as_optional_str(email, 60),
                    int(fus_codigo),
                    _as_optional_str(sexo, 1),
                    int(lin_cod),
                    _as_optional_str(endereco, 100),
                    _as_optional_str(bairro, 60),
                    _as_optional_str(cidade, 60),
                    _as_optional_int(est_codigo),
                    _as_optional_str(estado, 30),
                    _as_optional_str(cep, 11),
                    int(pai_codigo),
                    tep,
                    _as_optional_str(emp_nome, 60),
                    _as_optional_str(emp_endereco, 100),
                    _as_optional_str(emp_bairro, 60),
                    _as_optional_str(emp_cidade, 60),
                    _as_optional_int(emp_est_codigo),
                    _as_optional_str(emp_estado, 30),
                    _as_optional_str(emp_cep, 11),
                    _as_optional_int(emp_pai_codigo),
                    _as_optional_str(emp_homepage, 100),
                    _as_optional_str(motivo),
                    n_ppe_codigo,
                ],
            )
            created = _as_optional_int(n_ppe_codigo.getvalue(0))
            if created is None:
                raise PckUsuarioDatabaseError(
                    "SP_IN_PRE_PESSOA nao retornou PPE_CODIGO."
                )
            return created
    except PckUsuarioDatabaseError:
        raise
    except (DatabaseError, oracledb.Error) as exc:
        raise PckUsuarioDatabaseError(_oracle_user_message(exc)) from exc


def sp_in_empresa(
    *,
    ppe_codigo: int,
    partner_codigo: str,
    partner_extra: str = "",
) -> SpInEmpresaResult:
    """
    Call GERAL.PCK_USUARIO.SP_IN_EMPRESA (legado grava.php op=7).

    partner_codigo is CLIENTE.CODIGO (TEP=C) or FORNECEDOR.FORN_CODIGO (TEP=F).
    """
    codigo = _as_optional_str(partner_codigo, 40)
    if not codigo:
        raise PckUsuarioDatabaseError("Informe o codigo do cliente ou fornecedor.")

    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            raw = _raw_oracle_cursor(cursor)
            emp_codigo = raw.var(oracledb.DB_TYPE_NUMBER)
            e_nome = raw.var(oracledb.DB_TYPE_VARCHAR, 200)
            e_tipo = raw.var(oracledb.DB_TYPE_VARCHAR, 20)
            raw.callproc(
                f"{_PACKAGE}.SP_IN_EMPRESA",
                [
                    int(ppe_codigo),
                    codigo,
                    partner_extra or "",
                    emp_codigo,
                    e_nome,
                    e_tipo,
                ],
            )
            created = _as_optional_int(emp_codigo.getvalue(0))
            if created is None:
                raise PckUsuarioDatabaseError("SP_IN_EMPRESA nao retornou EMP_CODIGO.")
            return SpInEmpresaResult(
                emp_codigo=created,
                emp_nome=_as_optional_str(e_nome.getvalue(0)),
                emp_tipo=_as_optional_str(e_tipo.getvalue(0)),
            )
    except PckUsuarioDatabaseError:
        raise
    except (DatabaseError, oracledb.Error) as exc:
        raise PckUsuarioDatabaseError(_oracle_user_message(exc)) from exc


def _oracle_user_message(exc: BaseException) -> str:
    text = str(exc).strip() or "Falha ao executar GERAL.PCK_USUARIO."
    for marker in ("ORA-20010:", "ORA-20001:", "ORA-06550:"):
        if marker in text:
            start = text.index(marker)
            end = text.find("\n", start)
            chunk = text[start:] if end < 0 else text[start:end]
            return chunk.strip() or text
    return text
