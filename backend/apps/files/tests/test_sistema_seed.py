"""ORM tests for the native system catalog seed."""

import pytest

from apps.files.domain.services.sistema_catalog import SEED_SISTEMAS, SISTEMA_CLIENTE
from apps.files.infrastructure.models import FileManagerSistema


@pytest.mark.django_db
def test_seed_includes_cliente() -> None:
    row = FileManagerSistema.objects.get(pk=SISTEMA_CLIENTE)
    assert row.nome == "Cliente"
    assert FileManagerSistema.objects.count() >= len(SEED_SISTEMAS)
