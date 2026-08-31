"""Composition helpers for arquivos presentation layer."""

from apps.files.application.use_cases.create_folder_use_case import (
    CreateFolderUseCase,
)
from apps.files.application.use_cases.create_sistema_use_case import (
    CreateSistemaUseCase,
)
from apps.files.application.use_cases.download_file_use_case import (
    DownloadFileUseCase,
)
from apps.files.application.use_cases.get_sistema_use_case import GetSistemaUseCase
from apps.files.application.use_cases.list_arquivo_tree_use_case import (
    ListArquivoTreeUseCase,
)
from apps.files.application.use_cases.list_historico_use_case import (
    ListHistoricoUseCase,
)
from apps.files.application.use_cases.list_sistemas_use_case import (
    ListSistemasUseCase,
)
from apps.files.application.use_cases.move_node_use_case import MoveNodeUseCase
from apps.files.application.use_cases.trash_nodes_use_case import TrashNodesUseCase
from apps.files.application.use_cases.update_sistema_use_case import (
    UpdateSistemaUseCase,
)
from apps.files.application.use_cases.upload_file_use_case import UploadFileUseCase
from apps.files.infrastructure.repositories import (
    build_django_sistema_repository,
    build_oracle_arquivo_query_repository,
    build_oracle_arquivo_repository,
)


def build_list_sistemas_use_case() -> ListSistemasUseCase:
    return ListSistemasUseCase(build_django_sistema_repository())


def build_get_sistema_use_case() -> GetSistemaUseCase:
    return GetSistemaUseCase(build_django_sistema_repository())


def build_create_sistema_use_case() -> CreateSistemaUseCase:
    return CreateSistemaUseCase(build_django_sistema_repository())


def build_update_sistema_use_case() -> UpdateSistemaUseCase:
    return UpdateSistemaUseCase(build_django_sistema_repository())


def build_list_arquivo_tree_use_case() -> ListArquivoTreeUseCase:
    return ListArquivoTreeUseCase(
        build_oracle_arquivo_query_repository(),
        build_django_sistema_repository(),
    )


def build_create_folder_use_case() -> CreateFolderUseCase:
    return CreateFolderUseCase(build_oracle_arquivo_repository())


def build_upload_file_use_case() -> UploadFileUseCase:
    return UploadFileUseCase(build_oracle_arquivo_repository())


def build_move_node_use_case() -> MoveNodeUseCase:
    return MoveNodeUseCase(build_oracle_arquivo_repository())


def build_trash_nodes_use_case() -> TrashNodesUseCase:
    return TrashNodesUseCase(build_oracle_arquivo_repository())


def build_download_file_use_case() -> DownloadFileUseCase:
    return DownloadFileUseCase(build_oracle_arquivo_query_repository())


def build_list_historico_use_case() -> ListHistoricoUseCase:
    return ListHistoricoUseCase(build_oracle_arquivo_query_repository())
