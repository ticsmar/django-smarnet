"""Composition helpers for administracao presentation layer."""

from django.conf import settings

from apps.administracao.application.use_cases.consulta_cnpj_use_case import (
    ConsultaCnpjUseCase,
)
from apps.administracao.application.use_cases.consulta_funcionario_use_case import (
    ConsultaFuncionarioUseCase,
)
from apps.administracao.application.use_cases.create_cliente_from_funcionario_use_case import (  # noqa: E501
    CreateClienteFromFuncionarioUseCase,
)
from apps.administracao.application.use_cases.get_cliente_use_case import (
    GetClienteUseCase,
)
from apps.administracao.application.use_cases.grava_cliente_dados_gerais_use_case import (  # noqa: E501
    GravaClienteDadosGeraisUseCase,
)
from apps.administracao.application.use_cases.list_cliente_catalogs_use_case import (
    ListClienteCatalogsUseCase,
)
from apps.administracao.application.use_cases.list_clientes_use_case import (
    ListClientesUseCase,
)
from apps.administracao.application.use_cases.lookup_cliente_documento_use_case import (
    LookupClienteDocumentoUseCase,
)
from apps.administracao.infrastructure.cnpj_consulta import (
    ReceitaWsClient,
    ViaCepClient,
)
from apps.administracao.infrastructure.repositories import (
    build_oracle_cliente_query_repository,
    build_oracle_cliente_repository,
)


def build_list_clientes_use_case() -> ListClientesUseCase:
    return ListClientesUseCase(build_oracle_cliente_query_repository())


def build_get_cliente_use_case() -> GetClienteUseCase:
    return GetClienteUseCase(build_oracle_cliente_query_repository())


def build_grava_cliente_dados_gerais_use_case() -> GravaClienteDadosGeraisUseCase:
    return GravaClienteDadosGeraisUseCase(
        build_oracle_cliente_repository(),
        build_oracle_cliente_query_repository(),
    )


def build_lookup_cliente_documento_use_case() -> LookupClienteDocumentoUseCase:
    return LookupClienteDocumentoUseCase(build_oracle_cliente_query_repository())


def build_consulta_cnpj_use_case() -> ConsultaCnpjUseCase:
    return ConsultaCnpjUseCase(
        build_oracle_cliente_query_repository(),
        ReceitaWsClient(
            base_url=settings.RECEITAWS_URL,
            token=settings.RECEITAWS_TOKEN,
        ),
        ViaCepClient(base_url=settings.VIACEP_URL),
    )


def build_consulta_funcionario_use_case() -> ConsultaFuncionarioUseCase:
    return ConsultaFuncionarioUseCase(build_oracle_cliente_query_repository())


def build_create_cliente_from_funcionario_use_case() -> (
    CreateClienteFromFuncionarioUseCase
):
    return CreateClienteFromFuncionarioUseCase(build_oracle_cliente_repository())


def build_list_cliente_catalogs_use_case() -> ListClienteCatalogsUseCase:
    return ListClienteCatalogsUseCase(build_oracle_cliente_query_repository())
