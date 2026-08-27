"""Django permission codenames for administracao Cliente."""

from rest_framework.request import Request

APP = "commercial_infrastructure"

VIEW_CLIENTE = f"{APP}.view_cliente"
ADD_CLIENTE = f"{APP}.add_cliente"
CHANGE_CLIENTE = f"{APP}.change_cliente"
CHANGE_CLIENTE_LIMITE = f"{APP}.change_clientelimite"
CHANGE_CLIENTE_RISCO = f"{APP}.change_clienterisco"
VIEW_CONTATO = f"{APP}.view_clientecontato"
ADD_CONTATO = f"{APP}.add_clientecontato"
CHANGE_CONTATO = f"{APP}.change_clientecontato"
VIEW_COBRANCA = f"{APP}.view_clientecobranca"
ADD_COBRANCA = f"{APP}.add_clientecobranca"
CHANGE_COBRANCA = f"{APP}.change_clientecobranca"
VIEW_EMBARQUE = f"{APP}.view_clienteembarque"
ADD_EMBARQUE = f"{APP}.add_clienteembarque"
CHANGE_EMBARQUE = f"{APP}.change_clienteembarque"


def cliente_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_CLIENTE]
    return [ADD_CLIENTE]


def cliente_get_or_update_perms(request: Request) -> list[str]:
    if request.method == "PUT":
        return [CHANGE_CLIENTE]
    return [VIEW_CLIENTE]


def contato_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "POST":
        return [ADD_CONTATO]
    return [VIEW_CONTATO]


def cobranca_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "POST":
        return [ADD_COBRANCA]
    return [VIEW_COBRANCA]


def embarque_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "POST":
        return [ADD_EMBARQUE]
    return [VIEW_EMBARQUE]
