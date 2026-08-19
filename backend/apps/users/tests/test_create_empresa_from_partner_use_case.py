"""Unit tests for CreateEmpresaFromPartnerUseCase."""

import pytest

from apps.users.application.dtos.pending_request_dto import (
    CreateEmpresaFromPartnerInputDTO,
)
from apps.users.application.use_cases.create_empresa_from_partner_use_case import (
    CreateEmpresaFromPartnerUseCase,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaFromPartnerNotAllowedError,
    EmpresaLinkFailedError,
)
from apps.users.domain.repositories.pending_request_admin_repository import (
    EmpresaLinkResult,
)
from apps.users.tests.fakes_pending_request import (
    FakePendingRequestAdminRepository,
    make_pending,
)

_INPUT = CreateEmpresaFromPartnerInputDTO(ppe_codigo=501, partner_codigo="1234")


def test_create_empresa_links_the_partner() -> None:
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="C"),
        empresa_link=EmpresaLinkResult(
            emp_codigo=777, emp_nome="Cliente Teste", emp_tipo="C"
        ),
    )

    result = CreateEmpresaFromPartnerUseCase(repository).execute(_INPUT)

    assert repository.empresa_calls == [(501, "1234")]
    assert result.emp_codigo == 777
    assert result.emp_nome == "Cliente Teste"
    assert result.emp_tipo == "C"


def test_create_empresa_falls_back_to_the_request_type() -> None:
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="F"),
        empresa_link=EmpresaLinkResult(emp_codigo=777, emp_nome="", emp_tipo=""),
    )

    result = CreateEmpresaFromPartnerUseCase(repository).execute(_INPUT)

    assert result.emp_tipo == "F"


def test_create_empresa_rejects_funcionario_requests() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(tep_codigo="S"))

    with pytest.raises(EmpresaFromPartnerNotAllowedError):
        CreateEmpresaFromPartnerUseCase(repository).execute(_INPUT)

    assert repository.empresa_calls == []


def test_create_empresa_rejects_unknown_or_closed_request() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(closed=True))

    with pytest.raises(PendingRequestNotFoundError):
        CreateEmpresaFromPartnerUseCase(repository).execute(_INPUT)


def test_create_empresa_surfaces_the_oracle_failure() -> None:
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="C"),
        empresa_link_error="ORA-20010: parceiro sem cadastro",
    )

    with pytest.raises(EmpresaLinkFailedError):
        CreateEmpresaFromPartnerUseCase(repository).execute(_INPUT)
