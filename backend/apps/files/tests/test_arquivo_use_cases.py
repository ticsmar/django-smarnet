"""Tests for Oracle file-manager use cases."""

from unittest.mock import MagicMock

import pytest

from apps.files.application.dtos.arquivo_dtos import (
    ArquivoScopeDTO,
    CreateFolderInputDTO,
    DownloadFileInputDTO,
    MoveNodeInputDTO,
    TrashNodesInputDTO,
    UploadFileInputDTO,
)
from apps.files.application.use_cases.create_folder_use_case import (
    CreateFolderUseCase,
)
from apps.files.application.use_cases.download_file_use_case import (
    DownloadFileUseCase,
)
from apps.files.application.use_cases.list_arquivo_tree_use_case import (
    ListArquivoTreeUseCase,
)
from apps.files.application.use_cases.list_historico_use_case import (
    ListHistoricoUseCase,
)
from apps.files.application.use_cases.move_node_use_case import MoveNodeUseCase
from apps.files.application.use_cases.trash_nodes_use_case import TrashNodesUseCase
from apps.files.application.use_cases.upload_file_use_case import UploadFileUseCase
from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoNotFoundError,
    ArquivoPastaFixaError,
    ArquivoValidationError,
)
from apps.files.domain.repositories.arquivo_repository import (
    ArquivoBlobRecord,
    ArquivoHistoricoRecord,
    ArquivoNodeRecord,
)
from apps.files.domain.repositories.sistema_repository import SistemaRecord


def _node(**overrides: object) -> ArquivoNodeRecord:
    base = {
        "par_codigo": 10,
        "par_codigo_pai": None,
        "tipo": 0,
        "nome": "Pasta",
        "descricao": "Docs",
        "tamanho": None,
        "data": None,
        "ace_codigo": None,
        "pasta_fixa": False,
        "in_lixeira": False,
    }
    base.update(overrides)
    return ArquivoNodeRecord(**base)  # type: ignore[arg-type]


def test_list_tree_uses_sistema_name() -> None:
    query = MagicMock()
    query.list_nodes.return_value = [_node()]
    sistemas = MagicMock()
    sistemas.get_by_codigo.return_value = SistemaRecord(7, "Cliente", "", True)
    result = ListArquivoTreeUseCase(query, sistemas).execute(
        ArquivoScopeDTO(sistema=7, filtro="15114")
    )
    assert result.root_label == "Cliente: 15114"
    assert result.nodes[0].nome == "Pasta"


def test_list_tree_empty_filtro() -> None:
    with pytest.raises(ArquivoValidationError):
        ListArquivoTreeUseCase(MagicMock(), MagicMock()).execute(
            ArquivoScopeDTO(sistema=7, filtro="  ")
        )


def test_create_folder_validates_descricao() -> None:
    with pytest.raises(ArquivoValidationError):
        CreateFolderUseCase(MagicMock()).execute(
            CreateFolderInputDTO(
                sistema=7,
                filtro="1",
                nome="X",
                descricao="x" * 61,
                par_codigo_pai=None,
                ace_codigo=None,
                usu_chapa=1,
            )
        )


def test_create_folder_nome_too_long() -> None:
    with pytest.raises(ArquivoValidationError):
        CreateFolderUseCase(MagicMock()).execute(
            CreateFolderInputDTO(
                sistema=7,
                filtro="1",
                nome="x" * 301,
                descricao="",
                par_codigo_pai=None,
                ace_codigo=None,
                usu_chapa=1,
            )
        )


def test_create_folder_filtro_too_long() -> None:
    with pytest.raises(ArquivoValidationError):
        CreateFolderUseCase(MagicMock()).execute(
            CreateFolderInputDTO(
                sistema=7,
                filtro="x" * 101,
                nome="X",
                descricao="",
                par_codigo_pai=None,
                ace_codigo=None,
                usu_chapa=1,
            )
        )


def test_create_folder_happy_path() -> None:
    repository = MagicMock()
    repository.create_folder.return_value = 99
    result = CreateFolderUseCase(repository).execute(
        CreateFolderInputDTO(
            sistema=7,
            filtro="15114",
            nome="Entrada",
            descricao="Docs",
            par_codigo_pai=None,
            ace_codigo=None,
            usu_chapa=10,
        )
    )
    assert result == 99


def test_upload_rejects_empty() -> None:
    with pytest.raises(ArquivoValidationError):
        UploadFileUseCase(MagicMock()).execute(
            UploadFileInputDTO(
                sistema=7,
                filtro="1",
                nome="a.pdf",
                descricao="",
                par_codigo_pai=None,
                ace_codigo=None,
                usu_chapa=1,
                content=b"",
                tamanho=0,
            )
        )


def test_download_folder_rejected() -> None:
    query = MagicMock()
    query.get_blob.return_value = ArquivoBlobRecord(1, "pasta", b"", 0)
    with pytest.raises(ArquivoValidationError):
        DownloadFileUseCase(query).execute(
            DownloadFileInputDTO(sistema=7, filtro="1", par_codigo=1)
        )


def test_download_missing() -> None:
    query = MagicMock()
    query.get_blob.return_value = None
    with pytest.raises(ArquivoNotFoundError):
        DownloadFileUseCase(query).execute(
            DownloadFileInputDTO(sistema=7, filtro="1", par_codigo=1)
        )


def test_download_happy_path() -> None:
    query = MagicMock()
    query.get_blob.return_value = ArquivoBlobRecord(2, "a.pdf", b"pdf", 1)
    result = DownloadFileUseCase(query).execute(
        DownloadFileInputDTO(sistema=7, filtro="1", par_codigo=2)
    )
    assert result.nome == "a.pdf"
    assert result.content == b"pdf"


def test_trash_empty_selection() -> None:
    with pytest.raises(ArquivoValidationError):
        TrashNodesUseCase(MagicMock()).execute(
            TrashNodesInputDTO(sistema=7, filtro="1", par_codigos=(), usu_chapa=1)
        )


def test_trash_propagates_pasta_fixa() -> None:
    repository = MagicMock()
    repository.trash_nodes.side_effect = ArquivoPastaFixaError("fixa")
    with pytest.raises(ArquivoPastaFixaError):
        TrashNodesUseCase(repository).execute(
            TrashNodesInputDTO(sistema=7, filtro="1", par_codigos=(3,), usu_chapa=1)
        )


def test_move_happy_path() -> None:
    repository = MagicMock()
    MoveNodeUseCase(repository).execute(
        MoveNodeInputDTO(
            sistema=7,
            filtro="1",
            par_codigo=4,
            par_codigo_pai=2,
            nome="novo",
            usu_chapa=1,
        )
    )
    repository.move_node.assert_called_once()


def test_list_historico() -> None:
    query = MagicMock()
    query.list_historico.return_value = [
        ArquivoHistoricoRecord("a.pdf", "INSERT", None, "Ana")
    ]
    items = ListHistoricoUseCase(query).execute(ArquivoScopeDTO(sistema=7, filtro="1"))
    assert items[0].acao == "INSERT"
    assert items[0].usuario_nome == "Ana"
