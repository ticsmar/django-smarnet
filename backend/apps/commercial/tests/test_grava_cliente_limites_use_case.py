"""Unit tests for GravaClienteLimitesUseCase."""

from decimal import Decimal
from unittest.mock import MagicMock, patch

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.application.use_cases.grava_cliente_limites_use_case import (
    GravaClienteLimitesInputDTO,
    GravaClienteLimitesUseCase,
)


def _actor() -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=99,
        link_emp_codigo=1,
        owner_emp_codigo=1,
    )


@patch(
    "apps.commercial.application.use_cases.grava_cliente_limites_use_case.can_edit_customer",
    return_value=True,
)
def test_grava_limites_persists_both_fields(_can_edit: MagicMock) -> None:
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    GravaClienteLimitesUseCase(repository, query).execute(
        GravaClienteLimitesInputDTO(
            actor=_actor(),
            codigo=10,
            limitecr=Decimal("1246990"),
            cli_limite_crv=Decimal("200000"),
        )
    )
    repository.grava_limites.assert_called_once_with(
        codigo=10,
        limitecr=Decimal("1246990"),
        cli_limite_crv=Decimal("200000"),
    )
