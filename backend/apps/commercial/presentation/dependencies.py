"""Composition helpers for administracao presentation layer."""

from typing import TypeVar

from django.conf import settings

from apps.commercial.application.use_cases.consulta_cnpj_use_case import (
    ConsultaCnpjUseCase,
)
from apps.commercial.application.use_cases.consulta_funcionario_use_case import (
    ConsultaFuncionarioUseCase,
)
from apps.commercial.application.use_cases.create_cliente_from_funcionario_use_case import (  # noqa: E501
    CreateClienteFromFuncionarioUseCase,
)
from apps.commercial.application.use_cases.get_cliente_use_case import (
    GetClienteUseCase,
)
from apps.commercial.application.use_cases.grava_cliente_dados_gerais_use_case import (  # noqa: E501
    GravaClienteDadosGeraisUseCase,
)
from apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case import (
    GravaClienteBloqueioUseCase,
)
from apps.commercial.application.use_cases.grava_cliente_tabs_use_case import (
    GravaClienteCobrancaUseCase,
    GravaClienteContatoUseCase,
    GravaClienteDadosFinanUseCase,
    GravaClienteEmbarqueUseCase,
    GravaClienteObsUseCase,
    SetClienteContatoPadraoUseCase,
    SetClienteEnderecoPadraoUseCase,
)
from apps.commercial.application.use_cases.list_cliente_catalogs_use_case import (
    ListClienteCatalogsUseCase,
)
from apps.commercial.application.use_cases.list_cliente_lookups_use_case import (
    ListClienteAreasOsUseCase,
    ListClienteArclassesUseCase,
    ListClienteArlevelsUseCase,
    ListClienteArsalespsUseCase,
    ListClienteCidadesUseCase,
    ListClienteGruposTributariosUseCase,
    ListClienteModelosPagtoUseCase,
    ListClienteRiscosUseCase,
)
from apps.commercial.application.use_cases.list_cliente_tabs_use_case import (
    ListClienteCobrancasUseCase,
    ListClienteContatosUseCase,
    ListClienteEmbarquesUseCase,
    ListClienteLogsUseCase,
)
from apps.commercial.application.use_cases.list_clientes_use_case import (
    ListClientesUseCase,
)
from apps.commercial.application.use_cases.lookup_cliente_documento_use_case import (
    LookupClienteDocumentoUseCase,
)
from apps.commercial.infrastructure.cnpj_consulta import (
    ReceitaWsClient,
    ViaCepClient,
)
from apps.commercial.infrastructure.repositories import (
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


def build_list_cliente_cidades_use_case() -> ListClienteCidadesUseCase:
    return ListClienteCidadesUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_arclasses_use_case() -> ListClienteArclassesUseCase:
    return ListClienteArclassesUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_riscos_use_case() -> ListClienteRiscosUseCase:
    return ListClienteRiscosUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_arlevels_use_case() -> ListClienteArlevelsUseCase:
    return ListClienteArlevelsUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_arsalesps_use_case() -> ListClienteArsalespsUseCase:
    return ListClienteArsalespsUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_grupos_tributarios_use_case() -> (
    ListClienteGruposTributariosUseCase
):
    return ListClienteGruposTributariosUseCase(
        build_oracle_cliente_query_repository()
    )


def build_list_cliente_areas_os_use_case() -> ListClienteAreasOsUseCase:
    return ListClienteAreasOsUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_modelos_pagto_use_case() -> ListClienteModelosPagtoUseCase:
    return ListClienteModelosPagtoUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_contatos_use_case() -> ListClienteContatosUseCase:
    return ListClienteContatosUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_cobrancas_use_case() -> ListClienteCobrancasUseCase:
    return ListClienteCobrancasUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_embarques_use_case() -> ListClienteEmbarquesUseCase:
    return ListClienteEmbarquesUseCase(build_oracle_cliente_query_repository())


def build_list_cliente_logs_use_case() -> ListClienteLogsUseCase:
    return ListClienteLogsUseCase(build_oracle_cliente_query_repository())


_T = TypeVar("_T")


def _write_use_case(cls: type[_T]) -> _T:
    return cls(
        build_oracle_cliente_repository(),
        build_oracle_cliente_query_repository(),
    )


def build_grava_cliente_dados_finan_use_case() -> GravaClienteDadosFinanUseCase:
    return _write_use_case(GravaClienteDadosFinanUseCase)


def build_grava_cliente_contato_use_case() -> GravaClienteContatoUseCase:
    return _write_use_case(GravaClienteContatoUseCase)


def build_set_cliente_contato_padrao_use_case() -> SetClienteContatoPadraoUseCase:
    return _write_use_case(SetClienteContatoPadraoUseCase)


def build_grava_cliente_cobranca_use_case() -> GravaClienteCobrancaUseCase:
    return _write_use_case(GravaClienteCobrancaUseCase)


def build_grava_cliente_embarque_use_case() -> GravaClienteEmbarqueUseCase:
    return _write_use_case(GravaClienteEmbarqueUseCase)


def build_set_cliente_endereco_padrao_use_case() -> SetClienteEnderecoPadraoUseCase:
    return _write_use_case(SetClienteEnderecoPadraoUseCase)


def build_grava_cliente_obs_use_case() -> GravaClienteObsUseCase:
    return _write_use_case(GravaClienteObsUseCase)


def build_grava_cliente_bloqueio_use_case() -> GravaClienteBloqueioUseCase:
    return _write_use_case(GravaClienteBloqueioUseCase)
