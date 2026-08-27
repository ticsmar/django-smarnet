"""Unit tests for GravaClienteBloqueioUseCase."""

from unittest.mock import MagicMock, patch

import pytest

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case import (
    GravaClienteBloqueioInputDTO,
    GravaClienteBloqueioUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteRiscoInvalidError,
)


def _actor() -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=99,
        link_emp_codigo=1,
        owner_emp_codigo=1,
    )


@patch(
    "apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case.can_edit_customer",
    return_value=True,
)
def test_grava_bloqueio_persists_crs_cod_siaos(_can_edit: MagicMock) -> None:
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    query.get_risco.return_value = MagicMock()
    GravaClienteBloqueioUseCase(repository, query).execute(
        GravaClienteBloqueioInputDTO(
            actor=_actor(),
            codigo=10,
            bloqueado=4,
            mensagem_bloqueio="Pendência financeira",
        )
    )
    repository.grava_bloqueio.assert_called_once_with(
        codigo=10,
        bloqueado=4,
        mensagem_bloqueio="Pendência financeira",
    )


@patch(
    "apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case.can_edit_customer",
    return_value=True,
)
def test_grava_bloqueio_rejects_unknown_crs(_can_edit: MagicMock) -> None:
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    query.get_risco.return_value = None
    with pytest.raises(ClienteRiscoInvalidError):
        GravaClienteBloqueioUseCase(repository, query).execute(
            GravaClienteBloqueioInputDTO(
                actor=_actor(),
                codigo=10,
                bloqueado=99,
            )
        )
    repository.grava_bloqueio.assert_not_called()


@patch(
    "apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case.can_edit_customer",
    return_value=True,
)
def test_grava_bloqueio_fills_default_mensagem(_can_edit: MagicMock) -> None:
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    query.get_risco.return_value = MagicMock()
    GravaClienteBloqueioUseCase(repository, query).execute(
        GravaClienteBloqueioInputDTO(
            actor=_actor(),
            codigo=10,
            bloqueado=5,
            mensagem_bloqueio="",
        )
    )
    kwargs = repository.grava_bloqueio.call_args.kwargs
    assert kwargs["bloqueado"] == 5
    assert kwargs["mensagem_bloqueio"] == "BLOQUEIO JUDICIAL"
