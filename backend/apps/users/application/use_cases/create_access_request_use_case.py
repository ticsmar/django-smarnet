"""Create public access request (GERAL.PRE_PESSOA) use case."""

from apps.users.application.dtos.access_request_dto import (
    AccessRequestOutputDTO,
    CreateAccessRequestInputDTO,
)
from apps.users.domain.exceptions.access_request_exceptions import (
    AccessRequestValidationError,
    PendingAccessRequestExistsError,
)
from apps.users.domain.repositories.access_request_repository import (
    AccessRequestCreateData,
    AccessRequestRepository,
)

_ALLOWED_TEP = frozenset({"C", "F"})


def _require(value: str, message: str) -> str:
    cleaned = value.strip()
    if not cleaned:
        raise AccessRequestValidationError(message)
    return cleaned


def _normalize_input(input_dto: CreateAccessRequestInputDTO) -> AccessRequestCreateData:
    tep = input_dto.tep_codigo.strip().upper()
    if tep not in _ALLOWED_TEP:
        raise AccessRequestValidationError("tep_codigo must be C or F.")

    nome = _require(input_dto.nome, "Nome e obrigatorio.")
    email = _require(input_dto.email, "E-mail invalido.").lower()
    if "@" not in email:
        raise AccessRequestValidationError("E-mail invalido.")
    motivo = _require(input_dto.motivo, "Motivo e obrigatorio.")
    if input_dto.pai_codigo <= 0:
        raise AccessRequestValidationError("Pais da pessoa e obrigatorio.")

    emp_nome = _require(input_dto.emp_nome, "Nome da empresa e obrigatorio.")
    emp_endereco = _require(
        input_dto.emp_endereco, "Endereco da empresa e obrigatorio."
    )
    emp_bairro = _require(input_dto.emp_bairro, "Bairro da empresa e obrigatorio.")
    emp_cidade = _require(input_dto.emp_cidade, "Cidade da empresa e obrigatoria.")
    emp_estado = _require(input_dto.emp_estado, "UF/estado da empresa e obrigatorio.")
    emp_cep = _require(input_dto.emp_cep, "CEP da empresa e obrigatorio.")
    if input_dto.emp_pai_codigo <= 0:
        raise AccessRequestValidationError("Pais da empresa e obrigatorio.")
    if input_dto.emp_est_codigo <= 0:
        raise AccessRequestValidationError("Estado da empresa e obrigatorio.")

    return AccessRequestCreateData(
        tep_codigo=tep,
        nome=nome[:100],
        email=email[:60],
        pai_codigo=input_dto.pai_codigo,
        motivo=motivo,
        emp_nome=emp_nome[:60],
        emp_endereco=emp_endereco[:100],
        emp_bairro=emp_bairro[:60],
        emp_cidade=emp_cidade[:60],
        emp_pai_codigo=input_dto.emp_pai_codigo,
        emp_est_codigo=input_dto.emp_est_codigo,
        emp_estado=emp_estado[:30],
        emp_cep=emp_cep[:11],
        emp_homepage=input_dto.emp_homepage.strip()[:100],
    )


class CreateAccessRequestUseCase:
    def __init__(self, repository: AccessRequestRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: CreateAccessRequestInputDTO) -> AccessRequestOutputDTO:
        data = _normalize_input(input_dto)
        if self._repository.has_pending_by_email(data.email):
            raise PendingAccessRequestExistsError(
                "Ja existe uma solicitacao pendente para este e-mail."
            )
        record = self._repository.create(data)
        return AccessRequestOutputDTO(
            ppe_codigo=record.ppe_codigo,
            tep_codigo=record.tep_codigo,
            email=record.email,
        )
