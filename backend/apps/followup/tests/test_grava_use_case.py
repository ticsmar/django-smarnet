"""Use-case tests for follow-up recados."""

from unittest.mock import MagicMock

import pytest

from apps.followup.application.dtos.recado_dtos import GravaRecadoInputDTO
from apps.followup.application.use_cases.grava_recado_use_case import GravaRecadoUseCase
from apps.followup.domain.exceptions.followup_exceptions import RecadoValidationError
from apps.followup.domain.repositories.recado_repository import TipoRecadoRecord


def test_grava_requires_motivo_when_tipo_canc() -> None:
    query = MagicMock()
    query.get_tipo.return_value = TipoRecadoRecord(
        tre_codigo=9, tre_descricao="Canc", tre_tipo_canc=1, tre_global=1
    )
    write = MagicMock()
    with pytest.raises(RecadoValidationError):
        GravaRecadoUseCase(write, query).execute(
            GravaRecadoInputDTO(
                sistema=117,
                filtro="1",
                tre_codigo=9,
                mensagem="x",
                usu_chapa=10,
            )
        )
    write.grava_followup.assert_not_called()


def test_grava_insert_calls_opcao_1() -> None:
    query = MagicMock()
    query.get_tipo.return_value = TipoRecadoRecord(
        tre_codigo=20, tre_descricao="Com", tre_tipo_canc=0, tre_global=1
    )
    write = MagicMock()
    GravaRecadoUseCase(write, query).execute(
        GravaRecadoInputDTO(
            sistema=117,
            filtro="734730",
            tre_codigo=20,
            mensagem="linha\noutra",
            usu_chapa=10,
        )
    )
    args = write.grava_followup.call_args.kwargs
    assert args["opcao"] == 1
    assert "br" in args["mensagem"].lower()
