#!/usr/bin/env python3
"""Drop orphan branch_auth Oracle objects and migration rows.

Usage:
    python tools/oracle/cleanup_branch_auth.py          # dry-run
    python tools/oracle/cleanup_branch_auth.py --apply  # execute drops
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT / "src"))

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from django.db import connection

DROP_TABLES_ORDER: tuple[str, ...] = ()  # resolved dynamically from Oracle


def fetch_branch_auth_tables() -> list[str]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT table_name
            FROM user_tables
            WHERE table_name LIKE 'BRANCH_AUTH%'
            ORDER BY table_name
            """
        )
        return [row[0] for row in cursor.fetchall()]


def fetch_branch_auth_objects() -> list[tuple[str, str]]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT object_name, object_type
            FROM user_objects
            WHERE object_name LIKE 'BRANCH_AUTH%'
            ORDER BY object_type, object_name
            """
        )
        return [(name, obj_type) for name, obj_type in cursor.fetchall()]


def _print_planned_actions(
    planned_tables: list[str],
    objects: list[tuple[str, str]],
) -> None:
    print("\nPlanned actions:")
    if planned_tables:
        for table in planned_tables:
            print(f"  DROP TABLE {table} CASCADE CONSTRAINTS PURGE")
    for name, obj_type in objects:
        if obj_type == "SEQUENCE":
            print(f"  DROP SEQUENCE {name}")
        elif obj_type == "INDEX" and name not in {t for t in planned_tables}:
            print(f"  DROP INDEX {name}")
    print("  DELETE FROM django_migrations WHERE app = 'branch_auth_infrastructure'")


def _apply_drops(
    planned_tables: list[str],
    objects: list[tuple[str, str]],
) -> None:
    with connection.cursor() as cursor:
        for table in planned_tables:
            sql = f"DROP TABLE {table} CASCADE CONSTRAINTS PURGE"
            print(f"Executing: {sql}")
            cursor.execute(sql)

        for name, obj_type in objects:
            if obj_type == "SEQUENCE":
                sql = f"DROP SEQUENCE {name}"
                print(f"Executing: {sql}")
                cursor.execute(sql)
            elif obj_type == "INDEX":
                try:
                    sql = f"DROP INDEX {name}"
                    print(f"Executing: {sql}")
                    cursor.execute(sql)
                except Exception as exc:
                    print(f"  Skip {name}: {exc}")

        cursor.execute(
            "DELETE FROM django_migrations WHERE app = %s",
            ["branch_auth_infrastructure"],
        )
        print("Deleted django_migrations rows for branch_auth_infrastructure")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Cleanup orphan branch_auth schema objects",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Execute DROP statements (default is dry-run)",
    )
    args = parser.parse_args()

    objects = fetch_branch_auth_objects()
    print("Found objects:")
    if not objects:
        print("  (none)")
    for name, obj_type in objects:
        print(f"  {obj_type:12} {name}")

    existing_tables = fetch_branch_auth_tables()
    # Drop in reverse alpha; FKs use CASCADE.
    planned_tables = list(reversed(existing_tables))

    if not planned_tables and not objects:
        print("\nNothing to clean. Run: python manage.py migrate")
        return 0

    _print_planned_actions(planned_tables, objects)

    if not args.apply:
        print("\nDry-run only. Re-run with --apply to execute.")
        return 0

    _apply_drops(planned_tables, objects)

    print("\nDone. Now run: python manage.py migrate")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
