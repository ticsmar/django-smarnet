"""Unit tests for RegisterAccessRequestFieldsUseCase."""

import pytest

from apps.users.application.dtos.pending_request_dto import (
    RegisterAccessRequestFieldsInputDTO,
)
from apps.users.application.use_cases.register_access_request_fields_use_case import (
    RegisterAccessRequestFieldsUseCase,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    NoFieldsToRegisterError,
    PendingRequestTypeChangeError,
)
from apps.users.tests.fakes_pending_request import (
    FakePendingRequestAdminRepository,
    make_pending,
)


def _input(**overrides: object) -> RegisterAccessRequestFieldsInputDTO:
    payload: dict[str, object] = {"ppe_codigo": 501}
    payload.update(overrides)
    return RegisterAccessRequestFieldsInputDTO(**payload)


def test_register_writes_only_the_fields_informed() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending())

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(emp_codigo=99, write_emp_codigo=True)
    )

    changes = repository.applied[0]
    assert changes.write_emp_codigo is True
    assert changes.write_fun_chapa is False
    assert changes.write_pes_numero is False
    assert result.emp_codigo == 99
    assert result.closed is False


def test_register_rejects_empty_payload() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending())

    with pytest.raises(NoFieldsToRegisterError):
        RegisterAccessRequestFieldsUseCase(repository).execute(_input())

    assert repository.applied == []


def test_register_rejects_unknown_or_closed_request() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(closed=True))

    with pytest.raises(PendingRequestNotFoundError):
        RegisterAccessRequestFieldsUseCase(repository).execute(
            _input(emp_codigo=99, write_emp_codigo=True)
        )


def test_register_type_change_clears_the_empresa_link() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(tep_codigo="C"))

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(tep_codigo="f")
    )

    changes = repository.applied[0]
    assert changes.tep_codigo == "F"
    assert changes.write_emp_codigo is True
    assert changes.emp_codigo is None
    assert result.tep_codigo == "F"
    assert result.emp_codigo is None
    assert result.fornecedor is True


def test_register_same_type_is_a_no_op_instead_of_an_error() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(tep_codigo="C"))

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(tep_codigo="C")
    )

    assert repository.applied == []
    assert result.tep_codigo == "C"
    assert result.cliente is True


def test_register_rejects_type_change_for_funcionario() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(tep_codigo="S"))

    with pytest.raises(PendingRequestTypeChangeError):
        RegisterAccessRequestFieldsUseCase(repository).execute(_input(tep_codigo="C"))


def test_register_rejects_type_outside_cliente_fornecedor() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(tep_codigo="C"))

    with pytest.raises(PendingRequestTypeChangeError):
        RegisterAccessRequestFieldsUseCase(repository).execute(_input(tep_codigo="S"))


def test_register_pessoa_activates_and_links_the_funcionario() -> None:
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="S", fun_chapa=555)
    )

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(pes_numero=3001, write_pes_numero=True)
    )

    assert repository.activated == [3001]
    assert repository.linked_funcionarios == [(555, 3001)]
    assert result.closed is False
    assert result.resolved_existing_user is False


def test_register_pessoa_closes_request_when_funcionario_already_has_web_user() -> None:
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="S", fun_chapa=555),
        people_with_web_user={3001},
    )

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(pes_numero=3001, write_pes_numero=True)
    )

    assert repository.applied[0].close_request is True
    assert result.closed is True
    assert result.resolved_existing_user is True


def test_register_pessoa_keeps_partner_request_open() -> None:
    """Cliente/fornecedor sempre precisa de aprovacao, mesmo com usuario web."""
    repository = FakePendingRequestAdminRepository(
        pending=make_pending(tep_codigo="C", fun_chapa=555),
        people_with_web_user={3001},
    )

    result = RegisterAccessRequestFieldsUseCase(repository).execute(
        _input(pes_numero=3001, write_pes_numero=True)
    )

    assert repository.applied[0].close_request is False
    assert result.closed is False
