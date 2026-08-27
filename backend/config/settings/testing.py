"""Testing settings."""

import sys
import types

try:
    import oracledb as _oracledb
except ImportError:
    _oracledb = types.ModuleType("oracledb")
    sys.modules["oracledb"] = _oracledb

if not hasattr(_oracledb, "init_oracle_client"):
    _oracledb.init_oracle_client = lambda **kwargs: None  # type: ignore[attr-defined]
if not hasattr(_oracledb, "Cursor"):
    _oracledb.Cursor = type("Cursor", (), {})  # type: ignore[attr-defined]
if not hasattr(_oracledb, "DatabaseError"):
    _oracledb.DatabaseError = type("DatabaseError", (Exception,), {})  # type: ignore[attr-defined]
if not hasattr(_oracledb, "Error"):
    _oracledb.Error = getattr(_oracledb, "DatabaseError", Exception)  # type: ignore[attr-defined]
for _oracle_type in (
    "DB_TYPE_BLOB",
    "DB_TYPE_NUMBER",
    "DB_TYPE_CHAR",
    "DB_TYPE_VARCHAR",
):
    if not hasattr(_oracledb, _oracle_type):
        setattr(_oracledb, _oracle_type, object())

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
