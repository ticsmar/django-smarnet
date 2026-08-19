"""Tests for GERAL.PCK_USUARIO.SP_IN_PRE_PESSOA helper."""

from unittest.mock import MagicMock, patch

import pytest

from apps.users.infrastructure.oracle_pck_usuario import (
    PckUsuarioDatabaseError,
    sp_in_pre_pessoa,
)


@patch("apps.users.infrastructure.oracle_pck_usuario.connections")
def test_sp_in_pre_pessoa_callproc(mock_connections: MagicMock) -> None:
    raw = MagicMock()
    n_id = MagicMock()
    n_id.getvalue.return_value = 777
    raw.var.return_value = n_id

    django_cursor = MagicMock()
    django_cursor.cursor.cursor = raw
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = django_cursor

    ppe_codigo = sp_in_pre_pessoa(
        nome="Ana Silva",
        email="ana@cliente.com",
        fus_codigo=18,
        sexo=None,
        lin_cod=1,
        endereco=None,
        bairro=None,
        cidade=None,
        est_codigo=None,
        estado=None,
        cep=None,
        pai_codigo=76,
        tep_codigo="C",
        emp_nome="Cliente SA",
        emp_endereco="Rua A",
        emp_bairro="Centro",
        emp_cidade="Sertaozinho",
        emp_est_codigo=25,
        emp_estado="Sao Paulo",
        emp_cep="14160000",
        emp_pai_codigo=76,
        emp_homepage=None,
        motivo="Acesso ao portal",
    )

    assert ppe_codigo == 777
    raw.callproc.assert_called_once()
    args = raw.callproc.call_args[0]
    assert args[0] == "GERAL.PCK_USUARIO.SP_IN_PRE_PESSOA"
    assert args[1][0] == "Ana Silva"
    assert args[1][12] == "C"
    assert args[1][13] == "Cliente SA"


@patch("apps.users.infrastructure.oracle_pck_usuario.connections")
def test_sp_in_pre_pessoa_rejects_blank_nome(mock_connections: MagicMock) -> None:
    with pytest.raises(PckUsuarioDatabaseError, match="obrigatorio"):
        sp_in_pre_pessoa(
            nome="  ",
            email="a@b.com",
            fus_codigo=18,
            sexo=None,
            lin_cod=1,
            endereco=None,
            bairro=None,
            cidade=None,
            est_codigo=None,
            estado=None,
            cep=None,
            pai_codigo=76,
            tep_codigo="F",
            emp_nome="Emp",
            emp_endereco=None,
            emp_bairro=None,
            emp_cidade=None,
            emp_est_codigo=None,
            emp_estado=None,
            emp_cep=None,
            emp_pai_codigo=None,
            emp_homepage=None,
            motivo=None,
        )
    mock_connections.__getitem__.assert_not_called()
