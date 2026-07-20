"""Composition helpers for compras presentation layer."""

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
from apps.compras.infrastructure.repositories import (
    build_oracle_recebimento_query_repository,
    build_oracle_recebimento_repository,
)


def build_grava_fornecedor_use_case() -> GravaFornecedorUseCase:
    return GravaFornecedorUseCase(build_oracle_recebimento_repository())


def build_ativa_fornecedor_use_case() -> AtivaFornecedorUseCase:
    return AtivaFornecedorUseCase(build_oracle_recebimento_repository())


def build_inativa_fornecedor_use_case() -> InativaFornecedorUseCase:
    return InativaFornecedorUseCase(build_oracle_recebimento_repository())


def build_grava_fornec_contato_use_case() -> GravaFornecContatoUseCase:
    return GravaFornecContatoUseCase(build_oracle_recebimento_repository())


def build_exclui_fornec_contato_use_case() -> ExcluiFornecContatoUseCase:
    return ExcluiFornecContatoUseCase(build_oracle_recebimento_repository())


def build_list_fornecedores_use_case() -> ListFornecedoresUseCase:
    return ListFornecedoresUseCase(build_oracle_recebimento_query_repository())


def build_get_fornecedor_use_case() -> GetFornecedorUseCase:
    return GetFornecedorUseCase(build_oracle_recebimento_query_repository())


def build_list_fornec_contatos_use_case() -> ListFornecContatosUseCase:
    return ListFornecContatosUseCase(build_oracle_recebimento_query_repository())


def build_get_fornec_contato_use_case() -> GetFornecContatoUseCase:
    return GetFornecContatoUseCase(build_oracle_recebimento_query_repository())


def build_list_msg_erros_use_case() -> ListMsgErrosUseCase:
    return ListMsgErrosUseCase(build_oracle_recebimento_query_repository())


def build_list_paises_use_case() -> ListPaisesUseCase:
    return ListPaisesUseCase(build_oracle_recebimento_query_repository())


def build_get_pais_use_case() -> GetPaisUseCase:
    return GetPaisUseCase(build_oracle_recebimento_query_repository())
