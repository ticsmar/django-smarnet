# ERP Backend

Django REST API for the modular monolith ERP.

## Layout

```
backend/
├── manage.py
├── pyproject.toml
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   ├── production.py
│   │   └── testing.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── users/
│   ├── branch_auth/
│   └── shared/
├── common/
├── infrastructure/
├── static/
├── media/
├── templates/
├── scripts/
├── docs/
└── tests/
```

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements/development.txt
cp .env.example .env
```

## Run

```bash
python manage.py runserver
```

Settings modules:

- `config.settings.development` (default for `manage.py`)
- `config.settings.production` (WSGI/ASGI)
- `config.settings.testing` (pytest)

## Quality checks

```bash
ruff check .
ruff format --check .
mypy .
lint-imports
pytest
```

See [../ARCHITECTURE.md](../ARCHITECTURE.md) for layer rules.
