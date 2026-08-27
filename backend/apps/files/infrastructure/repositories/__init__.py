"""Arquivos infrastructure repository builders."""

from .django_sistema_repository_impl import build_django_sistema_repository
from .oracle_arquivo_query_repository_impl import (
    build_oracle_arquivo_query_repository,
)
from .oracle_arquivo_repository_impl import build_oracle_arquivo_repository

__all__ = [
    "build_django_sistema_repository",
    "build_oracle_arquivo_query_repository",
    "build_oracle_arquivo_repository",
]
