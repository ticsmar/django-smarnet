"""Tests for OracleRecebimentoQueryRepositoryImpl."""

from unittest.mock import MagicMock, patch

from apps.compras.infrastructure.repositories.oracle_recebimento_query_repository_impl import (
    OracleRecebimentoQueryRepositoryImpl,
    build_oracle_recebimento_query_repository,
)


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Pais"
)
@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Fornecedor"
)
def test_get_fornecedor_found(
    mock_fornecedor: MagicMock, mock_pais: MagicMock
) -> None:
    row = MagicMock(
        for_codigo=1,
        emp_codigo=None,
        for_razao_soc="ACME",
        for_nome_reduz="ACME",
        for_endereco=None,
        for_bairro=None,
        for_munic=None,
        for_cep=None,
        for_estado=None,
        pai_codigo=76,
        for_dt_cad=None,
        for_dt_atual=None,
        for_ativo=1,
    )
    mock_fornecedor.objects.using.return_value.filter.return_value.first.return_value = (
        row
    )
    mock_pais.objects.using.return_value.filter.return_value.first.return_value = (
        MagicMock(pai_nome="Brasil")
    )

    result = OracleRecebimentoQueryRepositoryImpl().get_fornecedor(1)

    mock_fornecedor.objects.using.assert_called_once_with("smar")
    assert result is not None
    assert result.for_codigo == 1
    assert result.pai_nome == "Brasil"


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Fornecedor"
)
def test_get_fornecedor_missing(mock_model: MagicMock) -> None:
    mock_model.objects.using.return_value.filter.return_value.first.return_value = None

    assert OracleRecebimentoQueryRepositoryImpl().get_fornecedor(1) is None


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Fornecedor"
)
def test_list_fornecedores_filters(mock_model: MagicMock) -> None:
    qs = MagicMock()
    mock_model.objects.using.return_value.order_by.return_value = qs
    qs.filter.return_value = qs
    qs.count.return_value = 0
    qs.__getitem__.return_value = []

    OracleRecebimentoQueryRepositoryImpl().list_fornecedores(
        search="acme",
        ativo=1,
        page=1,
        page_size=20,
    )

    assert qs.filter.call_count == 2


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.FornecContato"
)
def test_get_fornec_contato(mock_model: MagicMock) -> None:
    row = MagicMock(
        fco_codigo=5,
        for_codigo=1,
        fco_nome="Joao",
        fco_cargo=None,
        fco_email=None,
        fco_telefone=None,
    )
    mock_model.objects.using.return_value.filter.return_value.first.return_value = row

    result = OracleRecebimentoQueryRepositoryImpl().get_fornec_contato(5)

    assert result is not None
    assert result.fco_codigo == 5


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.FornecContato"
)
def test_list_fornec_contatos_filters(mock_model: MagicMock) -> None:
    qs = MagicMock()
    mock_model.objects.using.return_value.order_by.return_value = qs
    qs.filter.return_value = qs
    qs.count.return_value = 0
    qs.__getitem__.return_value = []

    OracleRecebimentoQueryRepositoryImpl().list_fornec_contatos(
        for_codigo=1,
        search="Joao",
        page=1,
        page_size=20,
    )

    assert qs.filter.call_count == 2


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Pais"
)
@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Fornecedor"
)
def test_list_fornecedores_maps_decimal_codes(
    mock_fornecedor: MagicMock, mock_pais: MagicMock
) -> None:
    qs = MagicMock()
    mock_fornecedor.objects.using.return_value.order_by.return_value = qs
    qs.count.return_value = 1
    row = MagicMock(
        for_codigo=1,
        emp_codigo=10,
        for_razao_soc="ACME",
        for_nome_reduz="ACME",
        for_endereco=None,
        for_bairro=None,
        for_munic=None,
        for_cep=None,
        for_estado=None,
        pai_codigo=76,
        for_dt_cad=None,
        for_dt_atual=None,
        for_ativo=1,
    )
    qs.__getitem__.return_value = [row]
    mock_pais.objects.using.return_value.filter.return_value = [
        MagicMock(pai_codigo=76, pai_nome="Brasil")
    ]

    result = OracleRecebimentoQueryRepositoryImpl().list_fornecedores(
        search="",
        ativo=None,
        page=1,
        page_size=20,
    )

    assert result.items[0].emp_codigo == 10
    assert result.items[0].pai_codigo == 76
    assert result.items[0].pai_nome == "Brasil"


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.MsgErro"
)
def test_list_msg_erros(mock_model: MagicMock) -> None:
    qs = MagicMock()
    mock_model.objects.using.return_value.order_by.return_value = qs
    qs.filter.return_value = qs
    qs.count.return_value = 0
    qs.__getitem__.return_value = []

    OracleRecebimentoQueryRepositoryImpl().list_msg_erros(
        search="ORA",
        page=1,
        page_size=20,
    )

    qs.filter.assert_called_once()


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Pais"
)
def test_get_pais(mock_model: MagicMock) -> None:
    row = MagicMock(pai_codigo=76, pai_nome="Brasil", eti_codigo=1)
    mock_model.objects.using.return_value.filter.return_value.first.return_value = row

    result = OracleRecebimentoQueryRepositoryImpl().get_pais(76)

    assert result is not None
    assert result.pai_codigo == 76
    assert result.pai_nome == "Brasil"


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Pais"
)
def test_get_pais_missing(mock_model: MagicMock) -> None:
    mock_model.objects.using.return_value.filter.return_value.first.return_value = None

    assert OracleRecebimentoQueryRepositoryImpl().get_pais(999) is None


@patch(
    "apps.compras.infrastructure.repositories."
    "oracle_recebimento_query_repository_impl.Pais"
)
def test_list_paises(mock_model: MagicMock) -> None:
    qs = MagicMock()
    mock_model.objects.using.return_value.order_by.return_value = qs
    qs.filter.return_value = qs
    qs.__iter__.return_value = iter(
        [MagicMock(pai_codigo=76, pai_nome="Brasil", eti_codigo=1)]
    )

    result = OracleRecebimentoQueryRepositoryImpl().list_paises(search="Bras")

    qs.filter.assert_called_once()
    assert len(result) == 1
    assert result[0].pai_nome == "Brasil"


def test_build_query_repository() -> None:
    assert isinstance(
        build_oracle_recebimento_query_repository(),
        OracleRecebimentoQueryRepositoryImpl,
    )
