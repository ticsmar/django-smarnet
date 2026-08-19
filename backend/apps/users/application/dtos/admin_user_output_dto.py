"""Admin user output DTO."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class AdminUserOutputDTO:
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    is_active: bool
    is_superuser: bool
    groups: list[str]
    product_permissions: list[str]
    last_login: datetime | None
    date_joined: datetime
    usu_chapa: int | None = None
    emp_codigo: int | None = None
    pes_numero: int | None = None
    pais_nome: str = ""
    emp_nome: str = ""
    emp_endereco: str = ""
    emp_bairro: str = ""
    emp_cidade: str = ""
    emp_estado: str = ""
    emp_cep: str = ""
    emp_pais_nome: str = ""
    emp_homepage: str = ""


@dataclass(frozen=True, slots=True)
class AdminGroupOutputDTO:
    name: str


@dataclass(frozen=True, slots=True)
class AdminProductPermissionOutputDTO:
    value: str
    app_label: str
    model: str
    codename: str
    name: str


@dataclass(frozen=True, slots=True)
class PaginatedUsersOutputDTO:
    items: list[AdminUserOutputDTO]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class ResetPasswordOutputDTO:
    temporary_password: str
