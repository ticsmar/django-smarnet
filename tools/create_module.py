#!/usr/bin/env python3
"""Scaffold a new Django bounded-context module under backend/apps/.

Usage:
    python tools/create_module.py sales
    python tools/create_module.py sales --integrate
    python tools/create_module.py sales --dry-run

Mirrors the hexagonal layout of the users module (domain / application /
infrastructure / presentation / tests) without Oracle-specific infrastructure.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = PROJECT_ROOT / "backend"
DEFAULT_SRC_DIR = BACKEND_DIR / "apps"

DOMAIN_INDEPENDENCE_MARKER = "[importlinter:contract:domain-independence]"
USERS_EXCEPTION_IMPORT = (
    "from apps.users.presentation.exception_mappings import "
    "AUTH_EXCEPTION_STATUS_MAP\n"
)
SINGLE_EXCEPTION_HANDLER = (
    "exception_handler = build_exception_handler(AUTH_EXCEPTION_STATUS_MAP)\n"
)

RESERVED_NAMES = frozenset(
    {
        "apps",
        "backend",
        "common",
        "config",
        "infrastructure",
        "shared",
        "django",
        "test",
        "tests",
        "tools",
        "frontend",
        "manage",
    }
)

INIT_PY = ""

RELATIVE_PATHS: tuple[str, ...] = (
    "__init__.py",
    "domain/__init__.py",
    "domain/entities/__init__.py",
    "domain/exceptions/__init__.py",
    "domain/repositories/__init__.py",
    "domain/validation/__init__.py",
    "application/__init__.py",
    "application/dtos/__init__.py",
    "application/ports/__init__.py",
    "application/use_cases/__init__.py",
    "infrastructure/__init__.py",
    "infrastructure/repositories/__init__.py",
    "presentation/__init__.py",
    "presentation/api/__init__.py",
    "presentation/serializers/__init__.py",
    "presentation/views/__init__.py",
    "tests/__init__.py",
)


def to_pascal_case(name: str) -> str:
    return "".join(part.capitalize() for part in name.split("_"))


def to_upper_snake_case(name: str) -> str:
    return name.upper()


def validate_module_name(name: str) -> None:
    if not re.fullmatch(r"[a-z][a-z0-9_]*", name):
        msg = (
            f"Invalid module name '{name}': use snake_case "
            "(lowercase letters, digits, underscores; must start with a letter)."
        )
        raise ValueError(msg)
    if name in RESERVED_NAMES:
        raise ValueError(f"Module name '{name}' is reserved.")
    if name.endswith("_"):
        raise ValueError(f"Module name '{name}' must not end with an underscore.")


def template_apps_py(module: str, pascal: str) -> str:
    return f'''"""Django app configuration for {module} presentation layer."""

from django.apps import AppConfig


class {pascal}PresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.{module}.presentation"
    label = "{module}_presentation"
'''


def template_dependencies_py(module: str) -> str:
    return f'''"""Composition helpers for {module} presentation layer."""

# Wire infrastructure implementations into use cases here.
# Example:
# def build_example_use_case() -> ExampleUseCase:
#     return ExampleUseCase(repository=build_example_repository())
'''


def template_exception_mappings_py(module: str, upper: str) -> str:
    return f'''"""Domain exception to HTTP status mappings for {module} API."""

{upper}_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {{}}
'''


def template_urls_py(module: str) -> str:
    return f'''"""{to_pascal_case(module)} API URL configuration."""

from django.urls import path

urlpatterns: list = []
'''


def template_exceptions_py(module: str, pascal: str) -> str:
    return f'''"""{pascal} domain exceptions."""


class {pascal}Error(Exception):
    """Base error for the {module} bounded context."""
'''


def template_conftest_py() -> str:
    return '''"""Pytest fixtures for domain tests."""

import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()
'''


def build_template_files(module: str) -> dict[str, str]:
    pascal = to_pascal_case(module)
    upper = to_upper_snake_case(module)

    files: dict[str, str] = {rel: INIT_PY for rel in RELATIVE_PATHS}
    files["presentation/apps.py"] = template_apps_py(module, pascal)
    files["presentation/dependencies.py"] = template_dependencies_py(module)
    files["presentation/exception_mappings.py"] = template_exception_mappings_py(
        module, upper
    )
    files["presentation/api/urls.py"] = template_urls_py(module)
    files[f"domain/exceptions/{module}_exceptions.py"] = template_exceptions_py(
        module, pascal
    )
    files["tests/conftest.py"] = template_conftest_py()
    return files


def create_module(
    name: str,
    *,
    src_dir: Path,
    dry_run: bool = False,
) -> list[Path]:
    validate_module_name(name)
    module_root = src_dir / name
    if module_root.exists():
        raise FileExistsError(f"Module already exists: {module_root}")

    templates = build_template_files(name)
    created: list[Path] = []

    for relative_path, content in sorted(templates.items()):
        file_path = module_root / relative_path
        if dry_run:
            print(f"  would create {file_path.relative_to(PROJECT_ROOT)}")
        else:
            file_path.parent.mkdir(parents=True, exist_ok=True)
            file_path.write_text(content, encoding="utf-8", newline="\n")
            created.append(file_path)

    return created


def integrate_importlinter(module: str, *, dry_run: bool) -> list[str]:
    path = BACKEND_DIR / ".importlinter"
    text = path.read_text(encoding="utf-8")
    messages: list[str] = []
    changed = False

    pascal = to_pascal_case(module)
    contracts = f"""
[importlinter:contract:{module}-layers]
name = {pascal} layer dependencies
type = layers
layers =
    apps.{module}.presentation
    apps.{module}.application
    apps.{module}.domain

[importlinter:contract:{module}-domain-isolation]
name = {pascal} domain layer isolation
type = forbidden
source_modules =
    apps.{module}.domain
forbidden_modules =
    apps.{module}.application
    apps.{module}.infrastructure
    apps.{module}.presentation

[importlinter:contract:{module}-app-no-presentation]
name = {pascal} application cannot import presentation
type = forbidden
source_modules =
    apps.{module}.application
forbidden_modules =
    apps.{module}.presentation

[importlinter:contract:{module}-infra-boundary]
name = {pascal} infrastructure boundary
type = forbidden
source_modules =
    apps.{module}.infrastructure
forbidden_modules =
    apps.{module}.application
    apps.{module}.presentation
"""
    if f"[importlinter:contract:{module}-layers]" not in text:
        independence_marker = DOMAIN_INDEPENDENCE_MARKER
        idx = text.index(independence_marker)
        text = text[:idx] + contracts + text[idx:]
        changed = True
        messages.append(f"added Import-Linter contracts for {module!r}")

    module_line = f"    apps.{module}\n"
    independence_section = text.split(DOMAIN_INDEPENDENCE_MARKER, 1)[1]
    if module_line not in independence_section:
        modules_marker = "modules =\n"
        idx = text.rindex(modules_marker) + len(modules_marker)
        text = text[:idx] + module_line + text[idx:]
        changed = True
        messages.append(f"added apps.{module!r} to domain-independence modules")

    if changed:
        if dry_run:
            messages.insert(0, f"would patch {path.relative_to(PROJECT_ROOT)}")
        else:
            path.write_text(text, encoding="utf-8", newline="\n")
            messages.insert(0, f"patched {path.relative_to(PROJECT_ROOT)}")
    else:
        rel = path.relative_to(PROJECT_ROOT)
        messages.append(f"skipped {rel} (already integrated)")

    return messages


def integrate_pyproject(module: str, *, dry_run: bool) -> list[str]:
    path = BACKEND_DIR / "pyproject.toml"
    text = path.read_text(encoding="utf-8")
    coverage_section = text.split("[tool.coverage.run]", 1)[1].split(
        "[tool.coverage.report]", 1
    )[0]
    if f'"{module}"' in coverage_section:
        return [f"skipped {path.relative_to(PROJECT_ROOT)} (already integrated)"]

    match = re.search(r"^source = \[(.*?)\]", text, re.MULTILINE | re.DOTALL)
    if not match:
        return [
            "TODO: manually add "
            f"{module!r} to [tool.coverage.run].source in pyproject.toml"
        ]

    updated = (
        text[: match.start()]
        + f'source = [{match.group(1)}, "{module}"]'
        + text[match.end() :]
    )
    if dry_run:
        return [f"would patch {path.relative_to(PROJECT_ROOT)} (coverage source)"]
    path.write_text(updated, encoding="utf-8", newline="\n")
    return [f"patched {path.relative_to(PROJECT_ROOT)} (coverage source)"]


def integrate_settings(module: str, *, dry_run: bool) -> list[str]:
    path = BACKEND_DIR / "config" / "settings" / "base.py"
    text = path.read_text(encoding="utf-8")
    app_entry = f'    "apps.{module}.presentation",\n'
    if app_entry.strip() in text:
        return [f"skipped {path.relative_to(PROJECT_ROOT)} (already integrated)"]

    marker = '    "apps.users.presentation",\n'
    if marker not in text:
        return [
            "TODO: manually add "
            f"{module!r}.presentation to INSTALLED_APPS in settings.py"
        ]

    updated = text.replace(marker, marker + app_entry, 1)
    if dry_run:
        return [f"would patch {path.relative_to(PROJECT_ROOT)} (INSTALLED_APPS)"]
    path.write_text(updated, encoding="utf-8", newline="\n")
    return [f"patched {path.relative_to(PROJECT_ROOT)} (INSTALLED_APPS)"]


def integrate_urls(module: str, *, dry_run: bool) -> list[str]:
    path = BACKEND_DIR / "config" / "urls.py"
    text = path.read_text(encoding="utf-8")
    route = (
        f'    path("api/{module}/", include("apps.{module}.presentation.api.urls")),\n'
    )
    if route.strip() in text:
        return [f"skipped {path.relative_to(PROJECT_ROOT)} (already integrated)"]

    marker = '    path("api/users/", include("apps.users.presentation.api.urls")),\n'
    if marker not in text:
        return [f"TODO: manually add api/{module}/ route to backend/config/urls.py"]

    updated = text.replace(marker, marker + route, 1)
    if dry_run:
        return [f"would patch {path.relative_to(PROJECT_ROOT)} (urlpatterns)"]
    path.write_text(updated, encoding="utf-8", newline="\n")
    return [f"patched {path.relative_to(PROJECT_ROOT)} (urlpatterns)"]


def integrate_drf(module: str, *, dry_run: bool) -> list[str]:
    path = BACKEND_DIR / "config" / "drf.py"
    text = path.read_text(encoding="utf-8")
    upper = to_upper_snake_case(module)
    import_line = (
        f"from apps.{module}.presentation.exception_mappings import "
        f"{upper}_EXCEPTION_STATUS_MAP\n"
    )
    if import_line in text:
        return [f"skipped {path.relative_to(PROJECT_ROOT)} (already integrated)"]

    multi_match = re.search(
        r"exception_handler = build_exception_handler\(\n((?:.|\n)*?)\)\n",
        text,
    )

    if SINGLE_EXCEPTION_HANDLER in text:
        updated = text.replace(
            USERS_EXCEPTION_IMPORT,
            USERS_EXCEPTION_IMPORT + import_line,
            1,
        )
        updated = updated.replace(
            SINGLE_EXCEPTION_HANDLER,
            "exception_handler = build_exception_handler(\n"
            "    AUTH_EXCEPTION_STATUS_MAP,\n"
            f"    {upper}_EXCEPTION_STATUS_MAP,\n"
            ")\n",
            1,
        )
    elif multi_match and f"{upper}_EXCEPTION_STATUS_MAP" not in multi_match.group(1):
        args_block = multi_match.group(1).rstrip()
        updated = text.replace(
            USERS_EXCEPTION_IMPORT,
            USERS_EXCEPTION_IMPORT + import_line,
            1,
        )
        updated = updated.replace(
            multi_match.group(0),
            "exception_handler = build_exception_handler(\n"
            f"{args_block},\n"
            f"    {upper}_EXCEPTION_STATUS_MAP,\n"
            ")\n",
            1,
        )
    else:
        return [
            f"TODO: manually wire {upper}_EXCEPTION_STATUS_MAP in backend/config/drf.py"
        ]

    if dry_run:
        return [f"would patch {path.relative_to(PROJECT_ROOT)} (exception_handler)"]
    path.write_text(updated, encoding="utf-8", newline="\n")
    return [f"patched {path.relative_to(PROJECT_ROOT)} (exception_handler)"]


def integrate_project(module: str, *, dry_run: bool) -> list[str]:
    messages: list[str] = []
    messages.extend(integrate_importlinter(module, dry_run=dry_run))
    messages.extend(integrate_pyproject(module, dry_run=dry_run))
    messages.extend(integrate_settings(module, dry_run=dry_run))
    messages.extend(integrate_urls(module, dry_run=dry_run))
    messages.extend(integrate_drf(module, dry_run=dry_run))
    return messages


def print_manual_steps(module: str) -> None:
    upper = to_upper_snake_case(module)
    print("\nNext steps (if not using --integrate):")
    print(f"  1. Add Import-Linter contracts for apps.{module!r} in backend/.importlinter")
    print(f"  2. Add apps.{module!r} to [tool.coverage.run].source in backend/pyproject.toml")
    print(
        f'  3. Add "apps.{module}.presentation" to INSTALLED_APPS in '
        "backend/config/settings/base.py"
    )
    print(
        f'  4. Add path("api/{module}/", '
        f'include("apps.{module}.presentation.api.urls")) '
        "to backend/config/urls.py"
    )
    print(
        f"  5. Import {upper}_EXCEPTION_STATUS_MAP in backend/config/drf.py "
        "and pass it to build_exception_handler()"
    )


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scaffold a new Django bounded-context module under backend/apps/.",
        epilog="Example: python tools/create_module.py sales --integrate",
    )
    parser.add_argument(
        "name",
        help="Module name in snake_case (e.g. sales, order_items)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned changes without writing files",
    )
    parser.add_argument(
        "--integrate",
        action="store_true",
        help=(
            "Patch project config (.importlinter, pyproject.toml, settings, urls, drf)"
        ),
    )
    parser.add_argument(
        "--src-dir",
        type=Path,
        default=DEFAULT_SRC_DIR,
        help=f"Source root directory (default: {DEFAULT_SRC_DIR})",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    name = args.name.strip().lower()
    src_dir = args.src_dir.resolve()

    try:
        print(f"Scaffolding module {name!r} under {src_dir}...")
        created = create_module(name, src_dir=src_dir, dry_run=args.dry_run)
    except (ValueError, FileExistsError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    if args.dry_run:
        print(f"\nDry run: {len(build_template_files(name))} files planned.")
    else:
        print(f"\nCreated {len(created)} files under backend/apps/{name}/")

    if args.integrate:
        print("\nIntegrating into project config...")
        for message in integrate_project(name, dry_run=args.dry_run):
            print(f"  {message}")
    elif not args.dry_run:
        print_manual_steps(name)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
