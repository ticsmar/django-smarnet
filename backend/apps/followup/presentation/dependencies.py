"""Composition helpers for follow-up presentation layer."""

from apps.followup.application.use_cases.baixa_recado_use_case import BaixaRecadoUseCase
from apps.followup.application.use_cases.cliente_notes_use_case import (
    AppendClienteNotesUseCase,
    GetClienteNotesUseCase,
)
from apps.followup.application.use_cases.create_sistema_use_case import (
    CreateSistemaUseCase,
)
from apps.followup.application.use_cases.get_recado_status_use_case import (
    GetRecadoStatusUseCase,
)
from apps.followup.application.use_cases.get_sistema_use_case import GetSistemaUseCase
from apps.followup.application.use_cases.grava_recado_use_case import GravaRecadoUseCase
from apps.followup.application.use_cases.list_motivos_use_case import ListMotivosUseCase
from apps.followup.application.use_cases.list_recados_use_case import ListRecadosUseCase
from apps.followup.application.use_cases.list_sistemas_use_case import (
    ListSistemasUseCase,
)
from apps.followup.application.use_cases.list_tipos_use_case import ListTiposUseCase
from apps.followup.application.use_cases.update_sistema_use_case import (
    UpdateSistemaUseCase,
)
from apps.followup.infrastructure.repositories import (
    build_django_sistema_repository,
    build_oracle_recado_query_repository,
    build_oracle_recado_write_repository,
)


def build_list_sistemas_use_case() -> ListSistemasUseCase:
    return ListSistemasUseCase(build_django_sistema_repository())


def build_get_sistema_use_case() -> GetSistemaUseCase:
    return GetSistemaUseCase(build_django_sistema_repository())


def build_create_sistema_use_case() -> CreateSistemaUseCase:
    return CreateSistemaUseCase(build_django_sistema_repository())


def build_update_sistema_use_case() -> UpdateSistemaUseCase:
    return UpdateSistemaUseCase(build_django_sistema_repository())


def build_list_recados_use_case() -> ListRecadosUseCase:
    return ListRecadosUseCase(build_oracle_recado_query_repository())


def build_list_tipos_use_case() -> ListTiposUseCase:
    return ListTiposUseCase(build_oracle_recado_query_repository())


def build_list_motivos_use_case() -> ListMotivosUseCase:
    return ListMotivosUseCase(build_oracle_recado_query_repository())


def build_get_recado_status_use_case() -> GetRecadoStatusUseCase:
    return GetRecadoStatusUseCase(build_oracle_recado_query_repository())


def build_grava_recado_use_case() -> GravaRecadoUseCase:
    return GravaRecadoUseCase(
        build_oracle_recado_write_repository(),
        build_oracle_recado_query_repository(),
    )


def build_baixa_recado_use_case() -> BaixaRecadoUseCase:
    return BaixaRecadoUseCase(
        build_oracle_recado_write_repository(),
        build_oracle_recado_query_repository(),
    )


def build_get_cliente_notes_use_case() -> GetClienteNotesUseCase:
    return GetClienteNotesUseCase(build_oracle_recado_query_repository())


def build_append_cliente_notes_use_case() -> AppendClienteNotesUseCase:
    return AppendClienteNotesUseCase(build_oracle_recado_write_repository())
