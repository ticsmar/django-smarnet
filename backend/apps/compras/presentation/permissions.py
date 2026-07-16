"""Django permission codenames for compras recebimento models."""

from rest_framework.request import Request

APP = "compras_infrastructure"

VIEW_FORNECEDOR = f"{APP}.view_fornecedor"
ADD_FORNECEDOR = f"{APP}.add_fornecedor"
CHANGE_FORNECEDOR = f"{APP}.change_fornecedor"
DELETE_FORNECEDOR = f"{APP}.delete_fornecedor"

VIEW_FORNEC_CONTATO = f"{APP}.view_forneccontato"
ADD_FORNEC_CONTATO = f"{APP}.add_forneccontato"
CHANGE_FORNEC_CONTATO = f"{APP}.change_forneccontato"
DELETE_FORNEC_CONTATO = f"{APP}.delete_forneccontato"

VIEW_MSG_ERRO = f"{APP}.view_msgerro"

VIEW_PAIS = f"{APP}.view_pais"


def _has_pk(request: Request, field: str) -> bool:
    value = request.data.get(field)
    return value is not None and value != ""


def fornecedor_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_FORNECEDOR]
    if _has_pk(request, "cod_fornec"):
        return [CHANGE_FORNECEDOR]
    return [ADD_FORNECEDOR]


def fornec_contato_list_or_grava_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_FORNEC_CONTATO]
    if _has_pk(request, "cod_contato"):
        return [CHANGE_FORNEC_CONTATO]
    return [ADD_FORNEC_CONTATO]


def fornec_contato_get_or_delete_perms(request: Request) -> list[str]:
    if request.method == "DELETE":
        return [DELETE_FORNEC_CONTATO]
    return [VIEW_FORNEC_CONTATO]
