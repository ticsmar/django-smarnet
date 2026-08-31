"""Tests for unmanaged/native arquivos models."""

from apps.files.infrastructure.models import Arquivo, FileManagerSistema


def test_sistema_meta() -> None:
    assert FileManagerSistema._meta.managed is True
    assert FileManagerSistema._meta.db_table == "ARQUIVOS_SISTEMA"
    assert FileManagerSistema._meta.pk.name == "codigo"


def test_arquivo_meta() -> None:
    assert Arquivo._meta.managed is False
    assert Arquivo._meta.db_table == '"SIAOS"."PROP_ARQUIVO"'
    assert Arquivo._meta.pk.name == "par_codigo"
