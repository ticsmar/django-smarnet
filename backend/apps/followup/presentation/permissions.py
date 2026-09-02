"""Django permission codenames for follow-up."""

from rest_framework.request import Request

APP = "followup_infrastructure"

VIEW_RECADO = f"{APP}.view_recado"
ADD_RECADO = f"{APP}.add_recado"
CHANGE_RECADO = f"{APP}.change_recado"
DELETE_RECADO = f"{APP}.delete_recado"


def view_perms(_request: Request) -> list[str]:
    return [VIEW_RECADO]


def add_perms(_request: Request) -> list[str]:
    return [ADD_RECADO]


def change_perms(_request: Request) -> list[str]:
    return [CHANGE_RECADO]
