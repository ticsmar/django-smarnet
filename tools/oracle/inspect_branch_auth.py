#!/usr/bin/env python3
"""Inspect branch_auth Oracle objects via Django DB connection."""

from __future__ import annotations

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT / "src"))

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from django.db import connection

EXPECTED_TABLE_PATTERN = "BRANCH_AUTH%"


def main() -> int:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT object_name, object_type, status
            FROM user_objects
            WHERE object_name LIKE 'BRANCH_AUTH%'
            ORDER BY object_type, object_name
            """
        )
        objects = cursor.fetchall()

        cursor.execute(
            """
            SELECT id, app, name, applied
            FROM django_migrations
            WHERE app = 'branch_auth_infrastructure'
            ORDER BY id
            """
        )
        migrations = cursor.fetchall()

    print("=== BRANCH_AUTH objects in Oracle ===")
    if not objects:
        print("(none)")
    for name, obj_type, status in objects:
        print(f"  {obj_type:12} {name:50} {status}")

    print("\n=== django_migrations (branch_auth_infrastructure) ===")
    if not migrations:
        print("(none — migration never recorded)")
    for row in migrations:
        print(f"  {row}")

    existing_tables = [name for name, obj_type, _ in objects if obj_type == "TABLE"]
    print("\n=== Tables matching BRANCH_AUTH% ===")
    if not existing_tables:
        print("  (none)")
    for table in existing_tables:
        print(f"  EXISTS  {table}")

    # Diagnosis
    print("\n=== Diagnosis ===")
    if existing_tables and not migrations:
        print(
            "Orphan state: tables exist but migration 0001 not in django_migrations.\n"
            "Fix: run tools/oracle/cleanup_branch_auth.py then migrate,\n"
            "     OR if all 3 tables exist: python manage.py migrate --fake-initial"
        )
    elif not existing_tables and not migrations:
        print("Clean state. migrate should work unless another object name collides.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
