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
│   ├── compras/
│   ├── administracao/
│   └── shared/
├── static/
├── media/
├── templates/
└── scripts/
```

Each app under `apps/` uses hexagonal layers (`domain/`, `application/`, `infrastructure/`, `presentation/`, `tests/`). Django registers `*.infrastructure` and `*.presentation` in `INSTALLED_APPS`.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements/development.txt
cp .env.example .env
```

`development.txt` includes ruff, mypy, pytest, pytest-cov, pytest-django and import-linter.

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

See [../ARCHITECTURE.md](../ARCHITECTURE.md) for layer rules and [../docs/developers/novas-telas.md](../docs/developers/novas-telas.md) for migrated vs native persistence.
