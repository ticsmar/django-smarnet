"""Tests for OracleClienteRepositoryImpl tab stored-procedure binds."""

from unittest.mock import MagicMock, patch

from apps.commercial.domain.repositories.cliente_repository import (
    GravaClienteCobrancaParams,
    GravaClienteContatoParams,
    GravaClienteDadosFinanParams,
    GravaClienteEmbarqueParams,
    GravaClienteObsParams,
    SetClienteContatoPadraoParams,
    SetClienteEnderecoPadraoParams,
)
from apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl import (
    OracleClienteRepositoryImpl,
)


def _mock_raw_cursor(mock_connections: MagicMock) -> tuple[MagicMock, MagicMock]:
    django_cursor = MagicMock()
    raw_cursor = MagicMock()
    django_cursor.cursor.cursor = raw_cursor
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = (
        django_cursor
    )
    return django_cursor, raw_cursor


def _finan(**overrides: object) -> GravaClienteDadosFinanParams:
    data: dict[str, object] = {
        "codigo": 10,
        "flagsuspen": 0,
        "flagcobra": 1,
        "flagmulta": 0,
        "vencprog": 0,
        "zona_franca": 0,
        "iss": 0,
        "exportacao": 0,
        "limitecr": 900,
        "taxamulta": None,
        "desc_max": None,
        "ccontabil": "1.1.1",
        "obsvenc": None,
        "cli_limite_crv": 100,
        "cli_fome_zero": 0,
        "cli_montador": 0,
        "cli_reccof": "N",
        "cli_reccsll": "N",
        "cli_recpis": "N",
        "mpg_codigo": 7,
        "cli_mod_pagt": "T",
        "cli_inscr_suframa": None,
        "cli_cnae": None,
        "cli_nif": None,
        "cli_pes_tipo": None,
        "cli_grupo_trib": "077",
        "apply_limites": True,
    }
    data.update(overrides)
    return GravaClienteDadosFinanParams(**data)  # type: ignore[arg-type]


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_finan_calls_sp_with_pck_names(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    django_cursor, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_dados_finan(_finan())
    proc = raw.callproc.call_args.args[0]
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_FINAN"
    assert binds["n_codigo_cliente"] == 10
    assert binds["n_limite_cr"] == 900
    assert binds["n_flag_cobra"] == 1
    sql = django_cursor.execute.call_args.args[0]
    assert "CLI_GRUPO_TRIB" in sql
    assert "CLI_LIMITE_CRV" in sql


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_finan_omits_limite_when_not_applied(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    django_cursor, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_dados_finan(_finan(apply_limites=False))
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert binds["n_limite_cr"] is None
    sql = django_cursor.execute.call_args.args[0]
    assert "CLI_LIMITE_CRV" not in sql


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_contato_calls_sp_atualiza_contato(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    n_con = MagicMock()
    n_con.getvalue.return_value = 44
    raw.var.return_value = n_con
    OracleClienteRepositoryImpl().grava_contato(
        GravaClienteContatoParams(
            codigo=10,
            con_codigo=None,
            nome="Ana",
            nome_old=None,
            depto="Vendas",
            cargo=None,
            telefone=None,
            fax=None,
            celular=None,
            email="ana@x.com",
            con_ativo=1,
            tipo_cadastro="I",
        )
    )
    proc = raw.callproc.call_args.args[0]
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_CONTATO"
    assert binds["c_nome_new"] == "Ana"
    assert binds["vc2_tipo_cadastro"] == "I"
    assert binds["n_con_codigo"] is n_con


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_set_contato_padrao_calls_sp(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().set_contato_padrao(
        SetClienteContatoPadraoParams(
            codigo=10, con_codigo_com=1, con_codigo_tec=2, con_codigo_fin=3
        )
    )
    proc = raw.callproc.call_args.args[0]
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_UPDATE_CONTATO_CLIENTE"
    assert binds["n_contato_com"] == 1
    assert binds["n_contato_tec"] == 2
    assert binds["n_contato_fin"] == 3


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_cobranca_calls_sp_atualiza_cobranca2(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_cobranca(
        GravaClienteCobrancaParams(
            codigo=10,
            chavecobra=None,
            ativo=1,
            cli_codigo_ref=20,
            tipo_cadastro="I",
        )
    )
    proc = raw.callproc.call_args.args[0]
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_COBRANCA2"
    assert binds["n_cli_codigo_ref"] == 20
    assert binds["vc2_tipo_cadastro"] == "I"


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_embarque_calls_sp_atualiza_embarque2(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_embarque(
        GravaClienteEmbarqueParams(
            codigo=10,
            chave_emb="000000002",
            ativo=1,
            cli_codigo_ref=21,
            tipo_cadastro="A",
        )
    )
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert raw.callproc.call_args.args[0] == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_EMBARQUE2"
    assert binds["c_cod_emb"] == "000000002"


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_obs_calls_sp_atualiza_obs(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    _django, raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_obs(
        GravaClienteObsParams(codigo=10, observa="VIP")
    )
    proc = raw.callproc.call_args.args[0]
    binds = raw.callproc.call_args.kwargs["keyword_parameters"]
    assert proc == "SIAOS.PCK_CLIENTE.SP_ATUALIZA_OBS"
    assert binds["n_obs"] == "VIP"


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.transaction.atomic"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_set_cobranca_padrao_updates_cobranca_column(
    mock_connections: MagicMock, _ident: MagicMock, mock_atomic: MagicMock
) -> None:
    mock_atomic.return_value.__enter__.return_value = None
    django_cursor, _raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().set_cobranca_padrao(
        SetClienteEnderecoPadraoParams(codigo=10, chave="000000001")
    )
    sql, binds = django_cursor.execute.call_args.args
    assert "SET COBRANCA" in sql
    assert binds == ["000000001", 10]


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.transaction.atomic"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_set_embarque_padrao_updates_entrega_column(
    mock_connections: MagicMock, _ident: MagicMock, mock_atomic: MagicMock
) -> None:
    mock_atomic.return_value.__enter__.return_value = None
    django_cursor, _raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().set_embarque_padrao(
        SetClienteEnderecoPadraoParams(codigo=10, chave="000000002")
    )
    sql, binds = django_cursor.execute.call_args.args
    assert "SET ENTREGA" in sql
    assert binds == ["000000002", 10]


@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.transaction.atomic"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_cliente_repository_impl.connections"
)
def test_grava_bloqueio_updates_bloqueado_and_mensagem(
    mock_connections: MagicMock, _ident: MagicMock, mock_atomic: MagicMock
) -> None:
    mock_atomic.return_value.__enter__.return_value = None
    django_cursor, _raw = _mock_raw_cursor(mock_connections)
    OracleClienteRepositoryImpl().grava_bloqueio(
        codigo=10, bloqueado=4, mensagem_bloqueio="Pendência financeira"
    )
    sql, binds = django_cursor.execute.call_args.args
    assert "SET BLOQUEADO" in sql
    assert "MENSAGEM_BLOQUEIO" in sql
    assert "CRS_COD_SIAOS" not in sql
    assert binds == [4, "Pendência financeira", 10]
