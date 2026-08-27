"""Tests for OracleClienteRepositoryImpl SP_ATUALIZA_DADOS_GERAIS binds."""

from unittest.mock import MagicMock, patch

import pytest
from django.db import DatabaseError

from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
)
from apps.commercial.domain.repositories.cliente_repository import (
    GravaClienteDadosGeraisParams,
)
from apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl import (
    OracleClienteRepositoryImpl,
)

_FAKE_ARGS = {
    "c_tipo_msg",
    "vc2_msg",
    "vc2_acao",
    "vc2_cliente",
    "c_tipo_cadastro",
    "c_idioma_msg",
}

_REQUIRED_ARGS = {
    "n_codigo",
    "c_nome_cliente",
    "c_nome_reduzido",
    "c_cgc",
    "c_origem",
    "c_segmento",
    "c_area",
    "c_inscr_estadual",
    "c_tipo_cliente",
    "c_endereco1",
    "c_endereco2",
    "c_endereco3",
    "c_cidade",
    "c_estado",
    "n_est_codigo",
    "c_telefone1",
    "c_telefone2",
    "c_homepage",
    "c_email",
    "c_cli_email_nfse",
    "c_coment_fatura",
    "c_coment_cobranca",
    "n_transportadora",
    "c_vendedor",
    "n_pai_codigo",
    "c_cep",
    "c_fax",
    "c_usuario",
    "vc2_tipo_cadastro",
    "n_tipo_emp",
    "n_cli_grupo",
    "n_cli_montador",
    "n_cli_vendedor2",
    "n_aos_codigo_tec",
    "n_aos_codigo_com",
    "n_cli_tipo",
    "n_cli_cod_mun_ibge",
    "n_cli_bairro",
    "n_cli_ie_isento",
    "c_cli_inscr_mun",
    "c_cli_cnae",
    "n_cli_fome_zero",
    "c_cli_insc_suframa",
    "n_cli_contribuinte",
    "c_ccontabil",
    "n_limitecr",
    "n_cli_limite_crv",
    "c_cli_nif",
    "c_cli_pes_tipo",
    "c_cli_reccof",
    "c_cli_reccsll",
    "c_cli_recpis",
    "n_mpg_codigo",
    "c_cli_mod_pagt",
    "n_erro",
}


def _params(**overrides: object) -> GravaClienteDadosGeraisParams:
    data: dict[str, object] = {
        "codigo": None,
        "tipo_cadastro": "I",
        "cliente": "ARGOM MAQUINAS",
        "reduzido": "ARGOM EQUIPAMENTOS",
        "tipo": "J",
        "origem": "BR",
        "endereco1": "TRAVESSA MARECHAL AGUIAR, 00020",
        "endereco2": "",
        "endereco3": None,
        "cli_bairro": "BENFICA",
        "cidade": "RIO DE JANEIRO",
        "estado": "RJ",
        "cep": "20920290",
        "pais": "BRA",
        "pai_codigo": 76,
        "est_codigo": 19,
        "telefone1": "(21) 3950-0134",
        "telefone2": "(21) 9579-6648",
        "fax": "",
        "email": "contato@argom-equipamentos.com",
        "homepage": "",
        "cgc": "32287721000110",
        "inscr_est": "",
        "cli_inscr_mun": None,
        "cli_ie_isento": 0,
        "cli_contribuinte": 2,
        "cli_cnae": None,
        "cli_cod_mun_ibge": None,
        "cli_inscr_suframa": None,
        "cli_nif": "",
        "cli_pes_tipo": "",
        "contato": None,
        "contatotec": None,
        "contatofin": None,
        "observa": None,
        "usu_chapa": 2623,
        "idioma_msg": "P",
    }
    data.update(overrides)
    return GravaClienteDadosGeraisParams(**data)  # type: ignore[arg-type]


def _mock_raw_cursor(mock_connections: MagicMock) -> tuple[MagicMock, MagicMock]:
    django_cursor = MagicMock()
    raw_cursor = MagicMock()
    django_cursor.cursor.cursor = raw_cursor
    django_cursor.fetchone.return_value = None
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = django_cursor
    return django_cursor, raw_cursor


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_calls_sp_with_pck_argument_names(
    mock_connections: MagicMock, _mock_ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    n_cod = MagicMock()
    n_cod.getvalue.return_value = 88
    n_erro = MagicMock()
    n_erro.getvalue.return_value = 0
    raw.var.side_effect = [n_cod, n_erro]

    result = OracleClienteRepositoryImpl().grava_dados_gerais(_params())

    raw.callproc.assert_called_once()
    proc, kwargs = raw.callproc.call_args[0][0], raw.callproc.call_args.kwargs
    binds = kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS"
    assert set(binds) == _REQUIRED_ARGS
    assert set(binds) & _FAKE_ARGS == set()
    assert binds["c_nome_cliente"] == "ARGOM MAQUINAS"
    assert binds["c_cgc"] == "32287721000110"
    assert binds["c_tipo_cliente"] == "J"
    assert binds["vc2_tipo_cadastro"] == "I"
    assert binds["n_cli_bairro"] == "BENFICA"
    assert binds["c_usuario"] == "2623"
    assert binds["n_erro"] is n_erro
    assert binds["n_codigo"] is n_cod
    assert result.codigo == 88
    assert result.tipo_msg is None


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_maps_n_erro_to_procedure_error(
    mock_connections: MagicMock, _mock_ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    n_cod = MagicMock()
    n_cod.getvalue.return_value = 10
    n_erro = MagicMock()
    n_erro.getvalue.return_value = 1
    raw.var.side_effect = [n_cod, n_erro]

    result = OracleClienteRepositoryImpl().grava_dados_gerais(_params())

    assert result.tipo_msg == "E"
    assert result.msg is not None
    assert "CNPJ" in result.msg


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_update_preserves_sp_only_columns(
    mock_connections: MagicMock, _mock_ident: MagicMock
) -> None:
    django_cursor, raw = _mock_raw_cursor(mock_connections)
    django_cursor.fetchone.return_value = (
        "SEG",
        "AR",
        "nfse@x.com",
        "FT",
        "CB",
        3,
        "VEND1",
        1,
        99,
        1,
        "V2",
        10,
        20,
        "R",
        0,
        "1.1.1",
        1000,
        200,
        "S",
        "N",
        "N",
        7,
        "B",
    )
    n_cod = MagicMock()
    n_cod.getvalue.return_value = 42
    n_erro = MagicMock()
    n_erro.getvalue.return_value = 0
    raw.var.side_effect = [n_cod, n_erro]

    OracleClienteRepositoryImpl().grava_dados_gerais(_params(codigo=42, tipo_cadastro="A"))

    django_cursor.execute.assert_called()
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert binds["vc2_tipo_cadastro"] == "A"
    assert binds["c_segmento"] == "SEG"
    assert binds["c_vendedor"] == "VEND1"
    assert binds["n_cli_grupo"] == 99
    assert binds["c_cli_mod_pagt"] == "B"
    n_cod.setvalue.assert_called_once_with(0, 42)


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_wraps_oracle_error(
    mock_connections: MagicMock, _mock_ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    raw.var.side_effect = [MagicMock(), MagicMock()]
    raw.callproc.side_effect = DatabaseError("PLS-00306")

    with pytest.raises(ClienteDatabaseError, match="PLS-00306"):
        OracleClienteRepositoryImpl().grava_dados_gerais(_params())


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_maps_cobranca_no_data_found(
    mock_connections: MagicMock, _mock_ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    raw.var.side_effect = [MagicMock(), MagicMock()]
    raw.callproc.side_effect = DatabaseError(
        "ORA-01403: no data found ORA-06512: at "
        '"SIAOS.TG_B_IU_COBRANCA", line 90'
    )

    with pytest.raises(ClienteDatabaseError, match="SF_USU_CHAPA_USER"):
        OracleClienteRepositoryImpl().grava_dados_gerais(_params())
