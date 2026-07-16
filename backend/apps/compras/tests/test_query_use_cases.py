"""Tests for query use cases."""

from unittest.mock import MagicMock

import pytest

from apps.compras.application.dtos.recebimento_dtos import (
    ListFornecContatosInputDTO,
    ListFornecedoresInputDTO,
    ListMsgErrosInputDTO,
    ListPaisesInputDTO,
)
from apps.compras.application.use_cases.get_fornec_contato_use_case import (
    GetFornecContatoUseCase,
)
from apps.compras.application.use_cases.get_fornecedor_use_case import (
    GetFornecedorUseCase,
)
from apps.compras.application.use_cases.get_pais_use_case import GetPaisUseCase
from apps.compras.application.use_cases.list_fornec_contatos_use_case import (
    ListFornecContatosUseCase,
)
from apps.compras.application.use_cases.list_fornecedores_use_case import (
    ListFornecedoresUseCase,
)
from apps.compras.application.use_cases.list_msg_erros_use_case import (
    ListMsgErrosUseCase,
)
from apps.compras.application.use_cases.list_paises_use_case import ListPaisesUseCase
from apps.compras.domain.exceptions.recebimento_exceptions import (
    FornecContatoNotFoundError,
    FornecedorNotFoundError,
    PaisNotFoundError,
)
from apps.compras.domain.repositories.recebimento_query_repository import (
    FornecContatoRecord,
    FornecedorRecord,
    MsgErroRecord,
    PaginatedFornecContatosResult,
    PaginatedFornecedoresResult,
    PaginatedMsgErrosResult,
    PaisRecord,
)


def _fornecedor(cod: int = 1) -> FornecedorRecord:
    return FornecedorRecord(
        for_codigo=cod,
        emp_codigo=None,
        for_razao_soc="ACME",
        for_nome_reduz="ACME",
        for_endereco=None,
        for_bairro=None,
        for_munic=None,
        for_cep=None,
        for_estado=None,
        pai_codigo=None,
        pai_nome=None,
        for_dt_cad=None,
        for_dt_atual=None,
        for_ativo=1,
    )


def test_list_fornecedores_clamps_pagination() -> None:
    repository = MagicMock()
    repository.list_fornecedores.return_value = PaginatedFornecedoresResult(
        items=[_fornecedor()],
        total=1,
        page=1,
        page_size=100,
    )

    result = ListFornecedoresUseCase(repository).execute(
        ListFornecedoresInputDTO(page=0, page_size=500, search="acme", ativo=1)
    )

    repository.list_fornecedores.assert_called_once_with(
        search="acme",
        ativo=1,
        page=1,
        page_size=100,
    )
    assert result.total == 1
    assert result.items[0].for_codigo == 1


def test_get_fornecedor_not_found() -> None:
    repository = MagicMock()
    repository.get_fornecedor.return_value = None

    with pytest.raises(FornecedorNotFoundError):
        GetFornecedorUseCase(repository).execute(99)


def test_get_fornecedor_happy() -> None:
    repository = MagicMock()
    repository.get_fornecedor.return_value = _fornecedor(10)

    result = GetFornecedorUseCase(repository).execute(10)

    assert result.for_codigo == 10


def test_list_fornec_contatos() -> None:
    repository = MagicMock()
    repository.list_fornec_contatos.return_value = PaginatedFornecContatosResult(
        items=[
            FornecContatoRecord(
                fco_codigo=5,
                for_codigo=1,
                fco_nome="Joao",
                fco_cargo=None,
                fco_email=None,
                fco_telefone=None,
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )

    result = ListFornecContatosUseCase(repository).execute(
        ListFornecContatosInputDTO(for_codigo=1)
    )

    assert result.items[0].fco_codigo == 5


def test_get_fornec_contato_not_found() -> None:
    repository = MagicMock()
    repository.get_fornec_contato.return_value = None

    with pytest.raises(FornecContatoNotFoundError):
        GetFornecContatoUseCase(repository).execute(3)


def test_get_fornec_contato_happy() -> None:
    repository = MagicMock()
    repository.get_fornec_contato.return_value = FornecContatoRecord(
        fco_codigo=3,
        for_codigo=1,
        fco_nome="Joao",
        fco_cargo=None,
        fco_email=None,
        fco_telefone=None,
    )

    result = GetFornecContatoUseCase(repository).execute(3)

    assert result.fco_codigo == 3


def test_list_msg_erros() -> None:
    repository = MagicMock()
    repository.list_msg_erros.return_value = PaginatedMsgErrosResult(
        items=[
            MsgErroRecord(
                msg_erro_bd="ORA-1",
                msg_usu_port="Erro",
                msg_acao_port=None,
                msg_usu_ing=None,
                msg_acao_ing=None,
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )

    result = ListMsgErrosUseCase(repository).execute(ListMsgErrosInputDTO(search="ORA"))

    assert result.items[0].msg_erro_bd == "ORA-1"


def test_list_paises() -> None:
    repository = MagicMock()
    repository.list_paises.return_value = [
        PaisRecord(pai_codigo=76, pai_nome="Brasil", eti_codigo=1),
    ]

    result = ListPaisesUseCase(repository).execute(ListPaisesInputDTO(search="Bras"))

    repository.list_paises.assert_called_once_with(search="Bras")
    assert result[0].pai_codigo == 76
    assert result[0].pai_nome == "Brasil"


def test_get_pais() -> None:
    repository = MagicMock()
    repository.get_pais.return_value = PaisRecord(
        pai_codigo=76, pai_nome="Brasil", eti_codigo=1
    )

    result = GetPaisUseCase(repository).execute(76)

    assert result.pai_nome == "Brasil"


def test_get_pais_not_found() -> None:
    repository = MagicMock()
    repository.get_pais.return_value = None

    with pytest.raises(PaisNotFoundError):
        GetPaisUseCase(repository).execute(999)
