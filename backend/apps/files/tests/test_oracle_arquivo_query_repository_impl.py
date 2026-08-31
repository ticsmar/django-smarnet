"""Tests for Oracle file-manager query repository (cursor mocked)."""

from datetime import datetime
from unittest.mock import MagicMock, patch

from apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl import (
    OracleArquivoQueryRepositoryImpl,
)


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.connections"
)
def test_list_nodes_maps_lixeira(
    mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    cursor = MagicMock()
    cursor.fetchall.return_value = [
        (1, None, 0, "Pasta", "Desc", None, None, None, 0, None),
        (
            2,
            1,
            1,
            "a.pdf",
            None,
            1024,
            datetime(2026, 1, 1),
            9,
            0,
            datetime(2026, 2, 1),
        ),
    ]
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    nodes = OracleArquivoQueryRepositoryImpl().list_nodes(7, "15114", 1)
    assert nodes[0].in_lixeira is False
    assert nodes[1].in_lixeira is True
    assert nodes[1].ace_codigo == 9
    assert nodes[1].tamanho == 1024


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.connections"
)
def test_get_blob_none(mock_connections: MagicMock, _ensure: MagicMock) -> None:
    cursor = MagicMock()
    cursor.fetchone.return_value = None
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    assert OracleArquivoQueryRepositoryImpl().get_blob(7, "1", 3) is None


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.connections"
)
def test_get_blob_bytes(mock_connections: MagicMock, _ensure: MagicMock) -> None:
    cursor = MagicMock()
    cursor.fetchone.return_value = ("a.pdf", b"pdf", 1)
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    blob = OracleArquivoQueryRepositoryImpl().get_blob(7, "1", 3)
    assert blob is not None
    assert blob.content == b"pdf"
    assert blob.tipo == 1


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_query_repository_impl.connections"
)
def test_list_historico(mock_connections: MagicMock, _ensure: MagicMock) -> None:
    cursor = MagicMock()
    cursor.fetchall.return_value = [("a.pdf", "INSERT", datetime(2026, 1, 1), "Ana")]
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    rows = OracleArquivoQueryRepositoryImpl().list_historico(7, "15114")
    assert rows[0].acao == "INSERT"
    assert rows[0].usuario_nome == "Ana"
