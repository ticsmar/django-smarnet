"""Tests for compras presentation dependencies."""

from apps.compras.application.use_cases.ativa_fornecedor_use_case import (
    AtivaFornecedorUseCase,
)
from apps.compras.application.use_cases.exclui_fornec_contato_use_case import (
    ExcluiFornecContatoUseCase,
)
from apps.compras.application.use_cases.get_fornec_contato_use_case import (
    GetFornecContatoUseCase,
)
from apps.compras.application.use_cases.get_fornecedor_use_case import (
    GetFornecedorUseCase,
)
from apps.compras.application.use_cases.get_pais_use_case import GetPaisUseCase
from apps.compras.application.use_cases.grava_fornec_contato_use_case import (
    GravaFornecContatoUseCase,
)
from apps.compras.application.use_cases.grava_fornecedor_use_case import (
    GravaFornecedorUseCase,
)
from apps.compras.application.use_cases.inativa_fornecedor_use_case import (
    InativaFornecedorUseCase,
)
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
from apps.compras.presentation.dependencies import (
    build_ativa_fornecedor_use_case,
    build_exclui_fornec_contato_use_case,
    build_get_fornec_contato_use_case,
    build_get_fornecedor_use_case,
    build_get_pais_use_case,
    build_grava_fornec_contato_use_case,
    build_grava_fornecedor_use_case,
    build_inativa_fornecedor_use_case,
    build_list_fornec_contatos_use_case,
    build_list_fornecedores_use_case,
    build_list_msg_erros_use_case,
    build_list_paises_use_case,
)


def test_build_use_cases() -> None:
    assert isinstance(build_grava_fornecedor_use_case(), GravaFornecedorUseCase)
    assert isinstance(build_ativa_fornecedor_use_case(), AtivaFornecedorUseCase)
    assert isinstance(build_inativa_fornecedor_use_case(), InativaFornecedorUseCase)
    assert isinstance(build_grava_fornec_contato_use_case(), GravaFornecContatoUseCase)
    assert isinstance(
        build_exclui_fornec_contato_use_case(), ExcluiFornecContatoUseCase
    )
    assert isinstance(build_list_fornecedores_use_case(), ListFornecedoresUseCase)
    assert isinstance(build_get_fornecedor_use_case(), GetFornecedorUseCase)
    assert isinstance(build_list_fornec_contatos_use_case(), ListFornecContatosUseCase)
    assert isinstance(build_get_fornec_contato_use_case(), GetFornecContatoUseCase)
    assert isinstance(build_list_msg_erros_use_case(), ListMsgErrosUseCase)
    assert isinstance(build_list_paises_use_case(), ListPaisesUseCase)
    assert isinstance(build_get_pais_use_case(), GetPaisUseCase)
