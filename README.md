# ERP

Modular monolith ERP backend built with Django, Clean Architecture, and Oracle Database.

## Stack

- Python 3.13
- Django + Django REST Framework
- Oracle Database (oracledb)

## Project layout

```
src/
├── config/     # Django settings, URLs, WSGI/ASGI
├── shared/     # Shared kernel
└── users/      # Users bounded context (domain / application / infrastructure / presentation / tests)
manage.py
conftest.py
pyproject.toml
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for layer rules and [AI_DEVELOPMENT_RULES.md](AI_DEVELOPMENT_RULES.md) for coding standards.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt -r requirements-dev.txt
cp .env.example .env              # then fill in Oracle credentials
```

## Run

```bash
python manage.py runserver
```

API routes are under `/api/users/` (login, register, logout, me).

## Quality checks

```bash
$env:PYTHONPATH = "src"   # PowerShell; use export PYTHONPATH=src on Linux/macOS
ruff check .
ruff format --check .
mypy .
lint-imports
pytest
```

CI runs the same checks on every push/PR to `master`.
