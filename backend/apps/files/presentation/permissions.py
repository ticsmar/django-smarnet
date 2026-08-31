"""Django permission codenames for the file manager."""

from rest_framework.request import Request

APP = "files_infrastructure"

VIEW_ARQUIVO = f"{APP}.view_arquivo"
ADD_ARQUIVO = f"{APP}.add_arquivo"
CHANGE_ARQUIVO = f"{APP}.change_arquivo"
DELETE_ARQUIVO = f"{APP}.delete_arquivo"


def tree_or_historico_perms(_request: Request) -> list[str]:
    return [VIEW_ARQUIVO]


def folder_or_upload_perms(_request: Request) -> list[str]:
    return [ADD_ARQUIVO]


def move_perms(_request: Request) -> list[str]:
    return [CHANGE_ARQUIVO]


def trash_perms(_request: Request) -> list[str]:
    return [DELETE_ARQUIVO]
