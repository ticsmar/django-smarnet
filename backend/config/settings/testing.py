"""Testing settings."""

import sys
import types

try:
    import oracledb as _oracledb
except ImportError:
    _oracledb = types.ModuleType("oracledb")
    sys.modules["oracledb"] = _oracledb


def _patch_oracledb_attr(module: object, name: str, value: object) -> None:
    if not hasattr(module, name):
        setattr(module, name, value)


_patch_oracledb_attr(_oracledb, "init_oracle_client", lambda **kwargs: None)
_patch_oracledb_attr(_oracledb, "Cursor", type("Cursor", (), {}))
_patch_oracledb_attr(
    _oracledb,
    "DatabaseError",
    type("DatabaseError", (Exception,), {}),
)
_patch_oracledb_attr(
    _oracledb,
    "Error",
    getattr(_oracledb, "DatabaseError", Exception),
)
for _oracle_type in (
    "DB_TYPE_BLOB",
    "DB_TYPE_NUMBER",
    "DB_TYPE_CHAR",
    "DB_TYPE_VARCHAR",
):
    _patch_oracledb_attr(_oracledb, _oracle_type, object())

from .base import *  # noqa: F403

DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    },
    "smar": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    },
}
