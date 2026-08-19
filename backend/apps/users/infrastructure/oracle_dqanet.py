"""Oracle helpers for SIAOS.PCK_DQANET procedures."""

from __future__ import annotations

from typing import Protocol

import oracledb
from django.db import DatabaseError, connections

_PACKAGE = "SIAOS.PCK_DQANET"
_DB_ALIAS = "smar"


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class _DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper


def _raw_oracle_cursor(django_cursor: _DjangoCursorWrapper) -> oracledb.Cursor:
    # CursorWrapper -> FormatStylePlaceholderCursor -> oracledb.Cursor
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


class DqanetDatabaseError(Exception):
    """Raised when a PCK_DQANET call fails."""


def _oracle_user_message(exc: BaseException) -> str:
    text = str(exc).strip() or "Falha ao executar procedimento Oracle."
    marker = "ORA-20010:"
    if marker in text:
        start = text.index(marker) + len(marker)
        end = text.find("\n", start)
        chunk = text[start:] if end < 0 else text[start:end]
        return chunk.strip() or text
    return text


def sp_in_pessoa(  # noqa: PLR0913
    *,
    nome: str,
    email: str | None = None,
    ativo: int = 1,
    cidade: str | None = None,
    est_codigo: int | None = None,
    estado: str | None = None,
    cep: str | None = None,
    pai_codigo: int | None = None,
    sexo: str | None = None,
    endereco: str | None = None,
    bairro: str | None = None,
    pes_numero: int | None = None,
) -> int:
    """
    Call SIAOS.PCK_DQANET.SP_IN_PESSOA.

    Pass pes_numero=None to insert (or reuse by email when already active).
    Returns the PES_NUMERO (IN OUT).
    """
    nome_clean = _as_optional_str(nome, 100)
    if not nome_clean:
        raise DqanetDatabaseError("Nome da pessoa e obrigatorio.")

    sexo_clean = _as_optional_str(sexo, 1)
    if sexo_clean:
        sexo_clean = sexo_clean.upper()

    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            raw = _raw_oracle_cursor(cursor)
            n_pessoa_id = raw.var(oracledb.DB_TYPE_NUMBER)
            if pes_numero is not None:
                n_pessoa_id.setvalue(0, pes_numero)

            raw.callproc(
                f"{_PACKAGE}.SP_IN_PESSOA",
                [
                    n_pessoa_id,
                    nome_clean,
                    _as_optional_str(email, 60),
                    ativo,
                    _as_optional_str(cidade, 60),
                    est_codigo,
                    _as_optional_str(estado, 30),
                    _as_optional_str(cep, 11),
                    pai_codigo,
                    sexo_clean,
                    _as_optional_str(endereco, 100),
                    _as_optional_str(bairro, 60),
                ],
            )
            created_id = _as_optional_int(n_pessoa_id.getvalue(0))
            if created_id is None:
                raise DqanetDatabaseError("SP_IN_PESSOA nao retornou PES_NUMERO.")
            return created_id
    except DqanetDatabaseError:
        raise
    except (DatabaseError, oracledb.Error) as exc:
        raise DqanetDatabaseError(_oracle_user_message(exc)) from exc


def sp_in_email(
    *,
    de: str,
    para: str,
    assunto: str,
    conteudo: str,
) -> None:
    """Call SIAOS.PCK_DQANET.SP_IN_EMAIL (fila legado PASTA_EMAIL)."""
    de_clean = _as_optional_str(de, 100) or "smarnet@smar.com.br"
    para_clean = _as_optional_str(para, 200)
    assunto_clean = _as_optional_str(assunto, 200)
    conteudo_clean = _as_optional_str(conteudo, 4000)
    if not para_clean:
        raise DqanetDatabaseError("Destinatario do e-mail e obrigatorio.")
    if not assunto_clean:
        raise DqanetDatabaseError("Assunto do e-mail e obrigatorio.")
    if not conteudo_clean:
        raise DqanetDatabaseError("Conteudo do e-mail e obrigatorio.")

    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            raw = _raw_oracle_cursor(cursor)
            raw.callproc(
                f"{_PACKAGE}.SP_IN_EMAIL",
                [de_clean, para_clean, assunto_clean, conteudo_clean],
            )
    except DqanetDatabaseError:
        raise
    except (DatabaseError, oracledb.Error) as exc:
        raise DqanetDatabaseError(_oracle_user_message(exc)) from exc
