"""Tests for OracleRecebimentoRepositoryImpl."""

from unittest.mock import MagicMock, patch

import pytest
from django.db import DatabaseError

from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoDatabaseError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecContatoParams,
    GravaFornecedorParams,
)
from apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl import (
    OracleRecebimentoRepositoryImpl,
    build_oracle_recebimento_repository,
)

_FORNEC_PARAMS = GravaFornecedorParams(
    cod_fornec=None,
    razao_soc="ACME LTDA",
    nome_reduz="ACME",
    endereco="Rua A",
    bairro="Centro",
    munic="Sao Paulo",
    cep="01000-000",
    estado="SP",
    cod_pais=55,
    idioma_msg="P",
)


def _mock_raw_cursor(mock_connections: MagicMock) -> MagicMock:
    django_cursor = MagicMock()
    raw_cursor = MagicMock()
    django_cursor.cursor.cursor = raw_cursor
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = (
        django_cursor
    )
    return raw_cursor


def _vars_returning(*values: object) -> list[MagicMock]:
    vars_list: list[MagicMock] = []
    for value in values:
        var = MagicMock()
        var.getvalue.return_value = value
        vars_list.append(var)
    return vars_list


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornecedor_callproc(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    vars_list = _vars_returning(42, "A", "ok", "acao")
    raw.var.side_effect = vars_list

    result = OracleRecebimentoRepositoryImpl().grava_fornecedor(_FORNEC_PARAMS)

    raw.callproc.assert_called_once()
    args = raw.callproc.call_args[0]
    assert args[0] == "NOVASMAR.PCK_PLASMA_RECEBIMENTO.SP_GRAVA_FORNECEDOR"
    assert result.cod_fornec == 42
    assert result.tipo_msg == "A"
    assert result.msg == "ok"
    assert result.acao == "acao"


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornecedor_sets_existing_code(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    vars_list = _vars_returning(99, None, None, None)
    raw.var.side_effect = vars_list

    params = GravaFornecedorParams(
        cod_fornec=99,
        razao_soc="ACME LTDA",
        nome_reduz="ACME",
        endereco="Rua A",
        bairro="Centro",
        munic="Sao Paulo",
        cep="01000-000",
        estado="SP",
        cod_pais=55,
        idioma_msg="P",
    )
    OracleRecebimentoRepositoryImpl().grava_fornecedor(params)

    vars_list[0].setvalue.assert_called_once_with(0, 99)


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_ativa_fornecedor_callproc(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    OracleRecebimentoRepositoryImpl().ativa_fornecedor(7)
    raw.callproc.assert_called_once_with(
        "NOVASMAR.PCK_PLASMA_RECEBIMENTO.SP_ATIVA_FORNECEDOR", [7]
    )


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_inativa_fornecedor_callproc(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    OracleRecebimentoRepositoryImpl().inativa_fornecedor(7)
    raw.callproc.assert_called_once_with(
        "NOVASMAR.PCK_PLASMA_RECEBIMENTO.SP_INATIVA_FORNECEDOR", [7]
    )


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_exclui_fornec_contato_callproc(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    OracleRecebimentoRepositoryImpl().exclui_fornec_contato(3)
    raw.callproc.assert_called_once_with(
        "NOVASMAR.PCK_PLASMA_RECEBIMENTO.SP_EXCLUI_FORNEC_CONTATO", [3]
    )


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornec_contato_callproc(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    raw.var.side_effect = _vars_returning(5, None, None, None)

    result = OracleRecebimentoRepositoryImpl().grava_fornec_contato(
        GravaFornecContatoParams(
            cod_contato=None,
            cod_fornec=1,
            nome="Joao",
            cargo="Gerente",
            email="a@b.com",
            telefone="11999999999",
            idioma_msg="P",
        )
    )

    args = raw.callproc.call_args[0]
    assert args[0] == "NOVASMAR.PCK_PLASMA_RECEBIMENTO.SP_GRAVA_FORNEC_CONTATO"
    assert result.cod_contato == 5


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornecedor_database_error(mock_connections: MagicMock) -> None:
    mock_connections.__getitem__.return_value.cursor.side_effect = DatabaseError(
        "ORA-00942"
    )

    with pytest.raises(RecebimentoDatabaseError):
        OracleRecebimentoRepositoryImpl().grava_fornecedor(_FORNEC_PARAMS)


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornec_contato_database_error(mock_connections: MagicMock) -> None:
    mock_connections.__getitem__.return_value.cursor.side_effect = DatabaseError(
        "ORA-00942"
    )

    with pytest.raises(RecebimentoDatabaseError):
        OracleRecebimentoRepositoryImpl().grava_fornec_contato(
            GravaFornecContatoParams(
                cod_contato=None,
                cod_fornec=1,
                nome="Joao",
                cargo="Gerente",
                email="a@b.com",
                telefone="11999999999",
                idioma_msg="P",
            )
        )


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_ativa_fornecedor_database_error(mock_connections: MagicMock) -> None:
    mock_connections.__getitem__.return_value.cursor.side_effect = DatabaseError(
        "ORA-00942"
    )

    with pytest.raises(RecebimentoDatabaseError):
        OracleRecebimentoRepositoryImpl().ativa_fornecedor(1)


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornecedor_missing_code(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    raw.var.side_effect = _vars_returning(None, None, None, None)

    result = OracleRecebimentoRepositoryImpl().grava_fornecedor(_FORNEC_PARAMS)

    assert result.cod_fornec is None
    assert result.tipo_msg is None
    assert result.msg is None


@patch(
    "apps.compras.infrastructure.repositories.oracle_recebimento_repository_impl.connections"
)
def test_grava_fornec_contato_sets_existing_code(mock_connections: MagicMock) -> None:
    raw = _mock_raw_cursor(mock_connections)
    vars_list = _vars_returning(8, None, None, None)
    raw.var.side_effect = vars_list

    OracleRecebimentoRepositoryImpl().grava_fornec_contato(
        GravaFornecContatoParams(
            cod_contato=8,
            cod_fornec=1,
            nome="Joao",
            cargo="Gerente",
            email="a@b.com",
            telefone="11999999999",
            idioma_msg="P",
        )
    )

    vars_list[0].setvalue.assert_called_once_with(0, 8)


def test_build_oracle_recebimento_repository() -> None:
    assert isinstance(
        build_oracle_recebimento_repository(), OracleRecebimentoRepositoryImpl
    )
