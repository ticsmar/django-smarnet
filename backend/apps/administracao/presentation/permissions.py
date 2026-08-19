"""Django permission codenames for administracao Cliente."""

from rest_framework.request import Request

APP = "administracao_infrastructure"

VIEW_CLIENTE = f"{APP}.view_cliente"
ADD_CLIENTE = f"{APP}.add_cliente"
CHANGE_CLIENTE = f"{APP}.change_cliente"


def cliente_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_CLIENTE]
    return [ADD_CLIENTE]


def cliente_get_or_update_perms(request: Request) -> list[str]:
    if request.method == "PUT":
        return [CHANGE_CLIENTE]
    return [VIEW_CLIENTE]
