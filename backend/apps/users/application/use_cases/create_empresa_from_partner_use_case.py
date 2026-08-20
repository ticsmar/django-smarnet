"""Legado grava.php op=7: create/link an empresa from a cliente or fornecedor."""

from apps.users.application.dtos.pending_request_dto import (
    CreateEmpresaFromPartnerInputDTO,
    CreateEmpresaFromPartnerOutputDTO,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaFromPartnerNotAllowedError,
)
from apps.users.domain.repositories.pending_request_admin_repository import (
    PendingRequestAdminRepository,
)

_NOT_FOUND = "Pending request not found or already closed."
_PARTNER_TEP = frozenset({"C", "F"})


class CreateEmpresaFromPartnerUseCase:
    def __init__(self, repository: PendingRequestAdminRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: CreateEmpresaFromPartnerInputDTO
    ) -> CreateEmpresaFromPartnerOutputDTO:
        pending = self._repository.get_open(input_dto.ppe_codigo)
        if pending is None:
            raise PendingRequestNotFoundError(_NOT_FOUND)

        if pending.tep_codigo not in _PARTNER_TEP:
            raise EmpresaFromPartnerNotAllowedError(
                "Criacao de empresa a partir de parceiro so se aplica a TEP C ou F."
            )

        result = self._repository.link_empresa_from_partner(
            ppe_codigo=pending.ppe_codigo,
            partner_codigo=input_dto.partner_codigo,
        )
        return CreateEmpresaFromPartnerOutputDTO(
            ppe_codigo=pending.ppe_codigo,
            emp_codigo=result.emp_codigo,
            emp_nome=result.emp_nome,
            emp_tipo=result.emp_tipo or pending.tep_codigo,
        )
