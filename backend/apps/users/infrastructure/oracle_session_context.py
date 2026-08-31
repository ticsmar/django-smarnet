"""Compatibility re-export; implementation lives in the shared kernel."""

from apps.shared.infrastructure.oracle_session_context import (  # noqa: F401
    clear_smar_client_identifier,
    ensure_smar_client_identifier,
    get_oracle_username,
    reset_oracle_username,
    set_oracle_username,
)
