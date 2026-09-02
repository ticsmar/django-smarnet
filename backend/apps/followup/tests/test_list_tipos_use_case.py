"""Use-case tests for listing follow-up tipos."""

from unittest.mock import MagicMock

from apps.followup.application.use_cases.list_tipos_use_case import ListTiposUseCase
from apps.followup.domain.repositories.recado_repository import TipoRecadoRecord
from apps.followup.domain.services.sistema_catalog import TRE_CODIGO_OUTROS


def test_list_tipos_returns_sistema_rows() -> None:
    query = MagicMock()
    query.list_tipos.return_value = [
        TipoRecadoRecord(
            tre_codigo=20, tre_descricao="Comercial", tre_tipo_canc=0, tre_global=1
        )
    ]
    result = ListTiposUseCase(query).execute(117)
    assert len(result) == 1
    assert result[0].tre_codigo == 20
    query.get_tipo.assert_not_called()


def test_list_tipos_falls_back_to_outros_when_empty() -> None:
    query = MagicMock()
    query.list_tipos.return_value = []
    query.get_tipo.return_value = TipoRecadoRecord(
        tre_codigo=TRE_CODIGO_OUTROS,
        tre_descricao="Outros",
        tre_tipo_canc=0,
        tre_global=1,
    )
    result = ListTiposUseCase(query).execute(117)
    assert len(result) == 1
    assert result[0].tre_codigo == TRE_CODIGO_OUTROS
    query.get_tipo.assert_called_once_with(TRE_CODIGO_OUTROS)
