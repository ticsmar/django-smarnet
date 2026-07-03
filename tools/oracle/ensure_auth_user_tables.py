#!/usr/bin/env python3
"""Create missing auth.User tables when migrations exist but AUTH_USER is absent.

Typical cause: schema migrated earlier with a custom user model (e.g. core.User), then
AUTH_USER_MODEL switched to auth.User without recreating tables.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT / "src"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from django.contrib.auth.models import User
from django.db import connection


def table_exists(name: str) -> bool:
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT 1 FROM user_tables WHERE table_name = %s",
            [name.upper()],
        )
        return cursor.fetchone() is not None


def main() -> int:
    auth_tables = (
        "AUTH_USER",
        "AUTH_USER_GROUPS",
        "AUTH_USER_USER_PERMISSIONS",
    )
    missing = [t for t in auth_tables if not table_exists(t)]
    if not missing:
        print("AUTH_USER tables already exist. Nothing to do.")
        return 0

    print("Missing tables:", ", ".join(missing))
    print("Creating auth.User schema via Django schema_editor...")

    with connection.schema_editor() as editor:
        if not table_exists("AUTH_USER"):
            editor.create_model(User)
            print("  Created AUTH_USER")
        if not table_exists("AUTH_USER_GROUPS"):
            editor.create_model(User.groups.through)
            print("  Created AUTH_USER_GROUPS")
        if not table_exists("AUTH_USER_USER_PERMISSIONS"):
            editor.create_model(User.user_permissions.through)
            print("  Created AUTH_USER_USER_PERMISSIONS")

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
