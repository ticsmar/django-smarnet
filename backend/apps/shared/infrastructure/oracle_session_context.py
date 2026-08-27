"""Request-scoped Oracle session context for the smar alias.

Propagates the application username via CLIENT_IDENTIFIER so legacy PL/SQL
and auditing can identify the operator while the DB connection remains the
technical account (ORACLE_SMAR_USER).

CLIENT_IDENTIFIER is context, not authorization: Django permissions and
explicit empresa filters remain mandatory.
"""

from __future__ import annotations

import logging
from contextvars import ContextVar

from django.db import connections

_SMAR_DB_ALIAS = "smar"
_logger = logging.getLogger(__name__)

_oracle_username: ContextVar[str | None] = ContextVar(
    "oracle_client_username",
    default=None,
)
_identifier_applied: ContextVar[bool] = ContextVar(
    "oracle_client_identifier_applied",
    default=False,
)


def get_oracle_username() -> str | None:
    return _oracle_username.get()


def set_oracle_username(username: str | None) -> None:
    _oracle_username.set(username)


def reset_oracle_username() -> None:
    _oracle_username.set(None)
    _identifier_applied.set(False)


def ensure_smar_client_identifier() -> None:
    """Stamp CLIENT_IDENTIFIER on the smar connection if not yet applied."""
    if _identifier_applied.get():
        return
    username = _oracle_username.get()
    if not username:
        return

    connection = connections[_SMAR_DB_ALIAS]
    connection.ensure_connection()
    raw = connection.connection
    if raw is None:
        return

    try:
        if hasattr(raw, "client_identifier"):
            raw.client_identifier = username[:64]
        with connection.cursor() as cursor:
            cursor.execute(
                "BEGIN DBMS_SESSION.SET_IDENTIFIER(%s); END;",
                [username[:64]],
            )
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "BEGIN DBMS_APPLICATION_INFO.SET_MODULE(:m, :a); END;",
                    {"m": "smarnet", "a": username[:32]},
                )
        except Exception:
            _logger.debug("DBMS_APPLICATION_INFO unavailable", exc_info=True)
        _identifier_applied.set(True)
    except Exception:
        _logger.warning(
            "Failed to set Oracle CLIENT_IDENTIFIER for %s",
            username,
            exc_info=True,
        )


def clear_smar_client_identifier() -> None:
    """Clear CLIENT_IDENTIFIER and close smar connection to avoid reuse leaks."""
    applied = _identifier_applied.get()
    try:
        if applied and _SMAR_DB_ALIAS in connections:
            connection = connections[_SMAR_DB_ALIAS]
            if connection.connection is not None:
                try:
                    with connection.cursor() as cursor:
                        cursor.execute("BEGIN DBMS_SESSION.CLEAR_IDENTIFIER; END;")
                except Exception:
                    _logger.debug(
                        "Failed to CLEAR_IDENTIFIER on smar",
                        exc_info=True,
                    )
                try:
                    with connection.cursor() as cursor:
                        cursor.execute(
                            "BEGIN DBMS_APPLICATION_INFO.SET_MODULE(NULL, NULL); END;"
                        )
                except Exception:
                    _logger.debug(
                        "Failed to clear DBMS_APPLICATION_INFO on smar",
                        exc_info=True,
                    )
    finally:
        if _SMAR_DB_ALIAS in connections:
            try:
                connections[_SMAR_DB_ALIAS].close()
            except Exception:
                _logger.debug("Failed to close smar connection", exc_info=True)
        _identifier_applied.set(False)
