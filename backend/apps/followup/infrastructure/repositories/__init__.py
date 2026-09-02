"""Follow-up infrastructure repository builders."""

from .django_sistema_repository_impl import build_django_sistema_repository
from .oracle_recado_query_repository_impl import (
    build_oracle_recado_query_repository,
)
from .oracle_recado_write_repository_impl import (
    build_oracle_recado_write_repository,
)

__all__ = [
    "build_django_sistema_repository",
    "build_oracle_recado_query_repository",
    "build_oracle_recado_write_repository",
]
