"""DTOs for the pre-pessoa triage flows."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class DiscardAccessRequestOutputDTO:
    ppe_codigo: int


@dataclass(frozen=True, slots=True)
class RegisterAccessRequestFieldsInputDTO:
    """Each write_* flag says the admin sent the column, since None is a real value."""

    ppe_codigo: int
    fun_chapa: int | None = None
    write_fun_chapa: bool = False
    pes_numero: int | None = None
    write_pes_numero: bool = False
    emp_codigo: int | None = None
    write_emp_codigo: bool = False
    # None means the admin did not touch the type.
    tep_codigo: str | None = None


@dataclass(frozen=True, slots=True)
class RegisterAccessRequestFieldsOutputDTO:
    ppe_codigo: int
    fun_chapa: int | None
    pes_numero: int | None
    emp_codigo: int | None
    tep_codigo: str
    tipo: str
    cliente: bool
    fornecedor: bool
    smar: bool
    detail: str
    closed: bool
    resolved_existing_user: bool


@dataclass(frozen=True, slots=True)
class CreateEmpresaFromPartnerInputDTO:
    ppe_codigo: int
    partner_codigo: str


@dataclass(frozen=True, slots=True)
class CreateEmpresaFromPartnerOutputDTO:
    ppe_codigo: int
    emp_codigo: int
    emp_nome: str
    emp_tipo: str


@dataclass(frozen=True, slots=True)
class ImportOracleUserOutputDTO:
    usu_chapa: int
    username: str
    email: str
    django_user_id: int
    temporary_password: str
    email_sent: bool
    notification_error: str = ""
