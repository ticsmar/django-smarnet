"""List countries/states for public access-request form."""

from apps.users.application.dtos.access_request_dto import (
    CountryOutputDTO,
    StateOutputDTO,
)
from apps.users.domain.repositories.access_request_repository import (
    AccessRequestRepository,
)


class ListAccessRequestCountriesUseCase:
    def __init__(self, repository: AccessRequestRepository) -> None:
        self._repository = repository

    def execute(self, *, language: int = 1) -> list[CountryOutputDTO]:
        return [
            CountryOutputDTO(pai_codigo=row.pai_codigo, nome=row.nome)
            for row in self._repository.list_countries(language=language)
        ]


class ListAccessRequestStatesUseCase:
    def __init__(self, repository: AccessRequestRepository) -> None:
        self._repository = repository

    def execute(self, *, pai_codigo: int) -> list[StateOutputDTO]:
        if pai_codigo <= 0:
            return []
        return [
            StateOutputDTO(
                est_codigo=row.est_codigo,
                pai_codigo=row.pai_codigo,
                nome=row.nome,
            )
            for row in self._repository.list_states(pai_codigo=pai_codigo)
        ]
