"""Compatibility re-export; implementation lives in the shared kernel."""

from apps.shared.infrastructure.db_router import SmarDatabaseRouter

__all__ = ["SmarDatabaseRouter"]
