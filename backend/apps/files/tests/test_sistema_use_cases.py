"""Tests for native file-manager system catalog use cases."""

from unittest.mock import MagicMock

import pytest

from apps.files.application.dtos.sistema_dtos import (
    CreateSistemaInputDTO,
    UpdateSistemaInputDTO,
)
from apps.files.application.use_cases.create_sistema_use_case import (
    CreateSistemaUseCase,
)
from apps.files.application.use_cases.get_sistema_use_case import GetSistemaUseCase
from apps.files.application.use_cases.list_sistemas_use_case import (
    ListSistemasUseCase,
)
from apps.files.application.use_cases.update_sistema_use_case import (
    UpdateSistemaUseCase,
)
from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoValidationError,
    SistemaCodigoConflictError,
    SistemaNotFoundError,
)
from apps.files.domain.repositories.sistema_repository import SistemaRecord


def _record(codigo: int = 7) -> SistemaRecord:
    return SistemaRecord(codigo=codigo, nome="Cliente", descricao="x", ativo=True)


def test_list_sistemas() -> None:
    repository = MagicMock()
    repository.list_all.return_value = [_record()]
    result = ListSistemasUseCase(repository).execute()
    assert result[0].codigo == 7
    assert result[0].nome == "Cliente"


def test_get_sistema_missing() -> None:
    repository = MagicMock()
    repository.get_by_codigo.return_value = None
    with pytest.raises(SistemaNotFoundError):
        GetSistemaUseCase(repository).execute(99)


def test_create_sistema_assigns_codigo_from_13() -> None:
    repository = MagicMock()
    repository.max_codigo.return_value = 12
    repository.create.return_value = _record(13)
    result = CreateSistemaUseCase(repository).execute(
        CreateSistemaInputDTO(nome="Novo")
    )
    assert result.codigo == 13
    repository.create.assert_called_once()
    assert repository.create.call_args.kwargs["codigo"] == 13


def test_create_sistema_conflict() -> None:
    repository = MagicMock()
    repository.exists_codigo.return_value = True
    with pytest.raises(SistemaCodigoConflictError):
        CreateSistemaUseCase(repository).execute(
            CreateSistemaInputDTO(nome="X", codigo=7)
        )


def test_create_sistema_blank_name() -> None:
    with pytest.raises(ArquivoValidationError):
        CreateSistemaUseCase(MagicMock()).execute(CreateSistemaInputDTO(nome="  "))


def test_update_sistema_happy_path() -> None:
    repository = MagicMock()
    repository.get_by_codigo.return_value = _record()
    repository.update.return_value = SistemaRecord(7, "Cliente ERP", "", True)
    result = UpdateSistemaUseCase(repository).execute(
        UpdateSistemaInputDTO(codigo=7, nome="Cliente ERP", descricao="", ativo=True)
    )
    assert result.nome == "Cliente ERP"
    repository.update.assert_called_once()


def test_update_sistema_blank_name() -> None:
    repository = MagicMock()
    repository.get_by_codigo.return_value = _record()
    with pytest.raises(ArquivoValidationError):
        UpdateSistemaUseCase(repository).execute(
            UpdateSistemaInputDTO(codigo=7, nome="  ", descricao="", ativo=True)
        )


def test_update_sistema_not_found() -> None:
    repository = MagicMock()
    repository.get_by_codigo.return_value = None
    with pytest.raises(SistemaNotFoundError):
        UpdateSistemaUseCase(repository).execute(
            UpdateSistemaInputDTO(codigo=99, nome="X", descricao="", ativo=True)
        )
