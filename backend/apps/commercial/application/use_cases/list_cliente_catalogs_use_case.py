"""List catalogs used by the cliente form (países, estados, origens)."""

from apps.commercial.application.dtos.cliente_dtos import (
    ListClienteCatalogsInputDTO,
    ListClienteCatalogsOutputDTO,
)
from apps.commercial.application.mappers.cliente_mapper import (
    to_estado_dto,
    to_origem_dto,
    to_pais_dto,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)


class ListClienteCatalogsUseCase:
    def __init__(self, repository: ClienteQueryRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ListClienteCatalogsInputDTO
    ) -> ListClienteCatalogsOutputDTO:
        paises = [to_pais_dto(item) for item in self._repository.list_paises()]
        estados = [
            to_estado_dto(item)
            for item in self._repository.list_estados(pai_codigo=input_dto.pai_codigo)
        ]
        origens = [to_origem_dto(item) for item in self._repository.list_origens()]
        return ListClienteCatalogsOutputDTO(
            paises=paises,
            estados=estados,
            origens=origens,
        )
