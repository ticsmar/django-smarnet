"""ORM tests for DjangoSistemaRepositoryImpl."""

from unittest.mock import MagicMock

import pytest
from django.db import DatabaseError

from apps.files.application.use_cases.get_sistema_use_case import GetSistemaUseCase
from apps.files.domain.repositories.sistema_repository import SistemaRecord
from apps.files.infrastructure.models import FileManagerSistema
from apps.files.infrastructure.repositories import (
    django_sistema_repository_impl as impl,
)
from apps.files.infrastructure.repositories.django_sistema_repository_impl import (
    DjangoSistemaRepositoryImpl,
)


@pytest.mark.django_db
def test_django_sistema_repository_crud() -> None:
    repo = DjangoSistemaRepositoryImpl()
    assert repo.get_by_codigo(7) is not None
    assert repo.exists_codigo(7) is True
    assert repo.max_codigo() >= 12

    created = repo.create(codigo=99, nome="Teste", descricao="", ativo=True)
    assert created.codigo == 99
    updated = repo.update(99, "Teste 2", "d", False)
    assert updated.nome == "Teste 2"
    assert updated.ativo is False
    listed = repo.list_all()
    assert any(row.codigo == 99 for row in listed)
    FileManagerSistema.objects.filter(pk=99).delete()


@pytest.mark.django_db
def test_get_by_codigo_returns_none_on_database_error(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    class _Boom:
        def filter(self, **kwargs: object) -> object:
            raise DatabaseError("ORA-00942")

    monkeypatch.setattr(impl, "_qs", lambda: _Boom())
    assert DjangoSistemaRepositoryImpl().get_by_codigo(7) is None


def test_get_sistema_happy_path() -> None:
    repository = MagicMock()
    repository.get_by_codigo.return_value = SistemaRecord(7, "Cliente", "", True)
    result = GetSistemaUseCase(repository).execute(7)
    assert result.codigo == 7
