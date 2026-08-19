"""Unit tests for CreateAccessRequestUseCase."""

from unittest.mock import MagicMock

import pytest

from apps.users.application.dtos.access_request_dto import CreateAccessRequestInputDTO
from apps.users.application.use_cases.create_access_request_use_case import (
    CreateAccessRequestUseCase,
)
from apps.users.domain.exceptions.access_request_exceptions import (
    AccessRequestValidationError,
    PendingAccessRequestExistsError,
)
from apps.users.domain.repositories.access_request_repository import AccessRequestRecord


def _valid_input(**overrides: object) -> CreateAccessRequestInputDTO:
    payload = {
        "tep_codigo": "C",
        "nome": "Ana Silva",
        "email": "ana@cliente.com",
        "pai_codigo": 76,
        "motivo": "Preciso acessar pedidos",
        "emp_nome": "Cliente SA",
        "emp_endereco": "Rua A, 100",
        "emp_bairro": "Centro",
        "emp_cidade": "Sertaozinho",
        "emp_pai_codigo": 76,
        "emp_est_codigo": 25,
        "emp_estado": "Sao Paulo",
        "emp_cep": "14160000",
        "emp_homepage": "",
    }
    payload.update(overrides)
    return CreateAccessRequestInputDTO(**payload)


def test_create_access_request_happy_path() -> None:
    repository = MagicMock()
    repository.has_pending_by_email.return_value = False
    repository.create.return_value = AccessRequestRecord(
        ppe_codigo=501,
        tep_codigo="C",
        email="ana@cliente.com",
    )
    use_case = CreateAccessRequestUseCase(repository)

    result = use_case.execute(_valid_input())

    assert result.ppe_codigo == 501
    assert result.tep_codigo == "C"
    repository.create.assert_called_once()


def test_create_access_request_rejects_invalid_tep() -> None:
    use_case = CreateAccessRequestUseCase(MagicMock())
    with pytest.raises(AccessRequestValidationError):
        use_case.execute(_valid_input(tep_codigo="S"))


def test_create_access_request_rejects_duplicate_pending_email() -> None:
    repository = MagicMock()
    repository.has_pending_by_email.return_value = True
    use_case = CreateAccessRequestUseCase(repository)

    with pytest.raises(PendingAccessRequestExistsError):
        use_case.execute(_valid_input())

    repository.create.assert_not_called()
