"""Tests for SIAOS.PCK_DQANET.SP_IN_PESSOA helper."""

from unittest.mock import MagicMock, patch

import pytest

from apps.users.infrastructure.oracle_dqanet import DqanetDatabaseError, sp_in_pessoa


@patch("apps.users.infrastructure.oracle_dqanet.connections")
def test_sp_in_pessoa_callproc(mock_connections: MagicMock) -> None:
    raw = MagicMock()
    n_id = MagicMock()
    n_id.getvalue.return_value = 42
    raw.var.return_value = n_id

    django_cursor = MagicMock()
    django_cursor.cursor.cursor = raw
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = django_cursor

    pes_numero = sp_in_pessoa(
        nome="Maria Silva",
        email="maria@example.com",
        cidade="Sertaozinho",
        est_codigo=26,
        estado="SP",
        cep="14160000",
        pai_codigo=1,
        sexo="F",
        endereco="Rua A",
        bairro="Centro",
    )

    assert pes_numero == 42
    raw.callproc.assert_called_once()
    args = raw.callproc.call_args[0]
    assert args[0] == "SIAOS.PCK_DQANET.SP_IN_PESSOA"
    assert args[1][1] == "Maria Silva"
    assert args[1][2] == "maria@example.com"
    n_id.setvalue.assert_not_called()


@patch("apps.users.infrastructure.oracle_dqanet.connections")
def test_sp_in_pessoa_rejects_blank_nome(mock_connections: MagicMock) -> None:
    with pytest.raises(DqanetDatabaseError, match="obrigatorio"):
        sp_in_pessoa(nome="   ")
    mock_connections.__getitem__.assert_not_called()


@patch("apps.users.infrastructure.oracle_dqanet.connections")
def test_sp_in_pessoa_surfaces_ora_20010(mock_connections: MagicMock) -> None:
    import oracledb

    raw = MagicMock()
    raw.var.return_value = MagicMock()
    raw.callproc.side_effect = oracledb.DatabaseError(
        'ORA-20010: Email "maria@example.com" já cadastrado!\nORA-06512: at line 1'
    )

    django_cursor = MagicMock()
    django_cursor.cursor.cursor = raw
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = django_cursor

    with pytest.raises(DqanetDatabaseError, match="já cadastrado"):
        sp_in_pessoa(nome="Maria", email="maria@example.com")
