"""compras infrastructure repository builders."""

from .oracle_recebimento_query_repository_impl import (
    build_oracle_recebimento_query_repository,
)
from .oracle_recebimento_repository_impl import (
    build_oracle_recebimento_repository,
)

__all__ = [
    "build_oracle_recebimento_query_repository",
    "build_oracle_recebimento_repository",
]
