"""Tests for unmanaged/native follow-up models."""

from apps.followup.infrastructure.models import FollowupSistema, Recado


def test_sistema_meta() -> None:
    assert FollowupSistema._meta.managed is True
    assert FollowupSistema._meta.db_table == "FOLLOWUP_SISTEMA"
    assert FollowupSistema._meta.pk.name == "codigo"


def test_recado_meta() -> None:
    assert Recado._meta.managed is False
    assert Recado._meta.db_table == '"SIAOS"."PROP_RECADO"'
    assert Recado._meta.pk.name == "pre_codigo"
