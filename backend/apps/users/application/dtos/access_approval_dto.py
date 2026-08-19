"""DTOs for pre-pessoa approval."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class ApproveAccessRequestInputDTO:
    ppe_codigo: int
    username: str
    password: str = ""
    email: str = ""
    fun_chapa: int | None = None
    create_new_chapa: bool = False
    require_password_change: bool = True
    lin_cod: int | None = None
    lpr_codigo: int | None = None


@dataclass(frozen=True, slots=True)
class ApproveAccessRequestOutputDTO:
    ppe_codigo: int
    user_id: int
    username: str
    temporary_password: str
    usu_chapa: int
