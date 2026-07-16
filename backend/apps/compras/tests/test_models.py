"""Tests for unmanaged compras Oracle models."""

from apps.compras.infrastructure.models import FornecContato, Fornecedor, MsgErro, Pais


def test_fornecedor_meta() -> None:
    assert Fornecedor._meta.managed is False
    assert Fornecedor._meta.db_table == '"NOVASMAR"."FORNECEDOR"'
    assert Fornecedor._meta.pk.name == "for_codigo"


def test_fornec_contato_meta() -> None:
    assert FornecContato._meta.managed is False
    assert FornecContato._meta.db_table == '"NOVASMAR"."FORNEC_CONTATO"'
    assert FornecContato._meta.pk.name == "fco_codigo"


def test_msg_erro_meta() -> None:
    assert MsgErro._meta.managed is False
    assert MsgErro._meta.db_table == '"NOVASMAR"."MSG_ERRO"'
    assert MsgErro._meta.pk.name == "msg_erro_bd"


def test_pais_meta() -> None:
    assert Pais._meta.managed is False
    assert Pais._meta.db_table == '"GERAL"."PAIS"'
    assert Pais._meta.pk.name == "pai_codigo"
