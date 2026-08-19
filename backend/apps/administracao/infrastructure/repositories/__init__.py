"""administracao infrastructure repository builders."""

from .oracle_cliente_query_repository_impl import (
    build_oracle_cliente_query_repository,
)
from .oracle_cliente_repository_impl import (
    build_oracle_cliente_repository,
)

__all__ = [
    "build_oracle_cliente_query_repository",
    "build_oracle_cliente_repository",
]
