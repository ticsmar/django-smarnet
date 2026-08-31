"""Tests for Oracle file-manager write repository (cursor mocked)."""

from unittest.mock import MagicMock, patch

import pytest
from django.db import DatabaseError

from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoDatabaseError,
    ArquivoNotFoundError,
    ArquivoPastaFixaError,
)
from apps.files.domain.repositories.arquivo_repository import (
    CreateFileParams,
    CreateFolderParams,
    MoveNodeParams,
    TrashNodesParams,
)
from apps.files.infrastructure.repositories.oracle_arquivo_repository_impl import (
    OracleArquivoRepositoryImpl,
)


def _folder_params() -> CreateFolderParams:
    return CreateFolderParams(
        sistema=7,
        filtro="15114",
        nome="Entrada",
        descricao="Docs",
        par_codigo_pai=None,
        ace_codigo=None,
        usu_chapa=10,
    )


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_create_folder_next_codigo(
    mock_tx: MagicMock, mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    cursor = MagicMock()
    cursor.fetchone.return_value = (41,)
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    result = OracleArquivoRepositoryImpl().create_folder(_folder_params())
    assert result == 42
    assert cursor.execute.call_count >= 3


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_trash_pasta_fixa(
    mock_tx: MagicMock, mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    cursor = MagicMock()
    cursor.fetchone.return_value = (3, "Fixa", 1, 0)
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    with pytest.raises(ArquivoPastaFixaError):
        OracleArquivoRepositoryImpl().trash_nodes(
            TrashNodesParams(sistema=7, filtro="1", par_codigos=(3,), usu_chapa=1)
        )


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_move_not_found(
    mock_tx: MagicMock, mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    cursor = MagicMock()
    cursor.fetchone.return_value = None
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    with pytest.raises(ArquivoNotFoundError):
        OracleArquivoRepositoryImpl().move_node(
            MoveNodeParams(
                sistema=7,
                filtro="1",
                par_codigo=9,
                par_codigo_pai=1,
                nome=None,
                usu_chapa=1,
            )
        )


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_create_folder_database_error(
    mock_tx: MagicMock, mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.side_effect = DatabaseError(
        "fail"
    )
    with pytest.raises(ArquivoDatabaseError):
        OracleArquivoRepositoryImpl().create_folder(_folder_params())


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.raw_oracle_cursor"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_create_file(
    mock_tx: MagicMock,
    mock_connections: MagicMock,
    _ensure: MagicMock,
    mock_raw: MagicMock,
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    cursor = MagicMock()
    cursor.fetchone.return_value = (10,)
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = (
        cursor
    )
    result = OracleArquivoRepositoryImpl().create_file(
        CreateFileParams(
            sistema=7,
            filtro="1",
            nome="a.pdf",
            descricao="",
            par_codigo_pai=None,
            ace_codigo=None,
            usu_chapa=10,
            content=b"pdf",
            tamanho=3,
        )
    )
    assert result == 11
    mock_raw.return_value.setinputsizes.assert_called_once()


@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.ensure_smar_client_identifier"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.connections"
)
@patch(
    "apps.files.infrastructure.repositories.oracle_arquivo_repository_impl.transaction"
)
def test_move_node(
    mock_tx: MagicMock, mock_connections: MagicMock, _ensure: MagicMock
) -> None:
    mock_tx.atomic.return_value.__enter__.return_value = None
    mock_tx.atomic.return_value.__exit__.return_value = False
    cursor = MagicMock()
    cursor.fetchone.return_value = (5, "old", 0, 1)
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = (
        cursor
    )
    OracleArquivoRepositoryImpl().move_node(
        MoveNodeParams(
            sistema=7,
            filtro="1",
            par_codigo=5,
            par_codigo_pai=2,
            nome="new",
            usu_chapa=1,
        )
    )
    assert cursor.execute.call_count >= 2
