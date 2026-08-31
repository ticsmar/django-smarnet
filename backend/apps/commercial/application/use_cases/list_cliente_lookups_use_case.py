"""Catalog lookups for the cliente form (ajax.php op 2–4 + modeloPagPorRisco)."""

from apps.commercial.application.dtos.cliente_dtos import (
    ClienteAreaOsOutputDTO,
    ClienteArclassOutputDTO,
    ClienteArlevelOutputDTO,
    ClienteArsalespOutputDTO,
    ClienteCidadeOutputDTO,
    ClienteGrupoTributarioOutputDTO,
    ClienteModeloPagtOutputDTO,
    ClienteRiscoOutputDTO,
)
from apps.commercial.application.mappers.cliente_mapper import (
    to_area_os_dto,
    to_arclass_dto,
    to_arlevel_dto,
    to_arsalesp_dto,
    to_cidade_dto,
    to_grupo_tributario_dto,
    to_modelo_pagt_dto,
    to_risco_dto,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.services.cliente_catalogos import (
    default_grupo_tributario,
)


class ListClienteArclassesUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self) -> list[ClienteArclassOutputDTO]:
        return [to_arclass_dto(item) for item in self._repository.list_arclasses()]


class ListClienteArlevelsUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self) -> list[ClienteArlevelOutputDTO]:
        return [to_arlevel_dto(item) for item in self._repository.list_arlevels()]


class ListClienteArsalespsUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self) -> list[ClienteArsalespOutputDTO]:
        return [to_arsalesp_dto(item) for item in self._repository.list_arsalesps()]


class ListClienteCidadesUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, pai_codigo: int | None, est_codigo: int | None
    ) -> list[ClienteCidadeOutputDTO]:
        return [
            to_cidade_dto(item)
            for item in self._repository.list_cidades(
                pai_codigo=pai_codigo, est_codigo=est_codigo
            )
        ]


class ListClienteGruposTributariosUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, *, est_codigo: int | None, cli_tipo: str | None
    ) -> list[ClienteGrupoTributarioOutputDTO]:
        items = self._repository.list_grupos_tributarios(
            est_codigo=est_codigo, cli_tipo=cli_tipo
        )
        first = items[0].codigo if items else None
        chosen = default_grupo_tributario(
            est_codigo=est_codigo, first_codigo=first
        )
        return [
            to_grupo_tributario_dto(item, is_default=item.codigo == chosen)
            for item in items
        ]


class ListClienteAreasOsUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self,
        *,
        tipo_area: str,
        mun_ibge: str | None,
        est_codigo: int | None,
        pai_codigo: int | None,
        current_codigo: int | None,
    ) -> list[ClienteAreaOsOutputDTO]:
        return [
            to_area_os_dto(item)
            for item in self._repository.list_areas_os(
                tipo_area=tipo_area,
                mun_ibge=mun_ibge,
                est_codigo=est_codigo,
                pai_codigo=pai_codigo,
                current_codigo=current_codigo,
            )
        ]


class ListClienteModelosPagtoUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self,
        *,
        origem: str | None,
        mpg_codigo: int | None,
        risco_protheus: str | None,
        unrestricted: bool,
    ) -> list[ClienteModeloPagtOutputDTO]:
        return [
            to_modelo_pagt_dto(item)
            for item in self._repository.list_modelos_pagto(
                origem=origem,
                mpg_codigo=mpg_codigo,
                risco_protheus=risco_protheus,
                unrestricted=unrestricted,
            )
        ]


class ListClienteRiscosUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(self) -> list[ClienteRiscoOutputDTO]:
        return [to_risco_dto(item) for item in self._repository.list_riscos()]
