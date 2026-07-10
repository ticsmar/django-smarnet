# ERP Architecture

## Stack

- Python 3.13
- Django + Django REST Framework + drf-spectacular
- Oracle Database
- React + TypeScript
- Docker

## Architectural Style

Modular Monolith.

## Project Layout

Application code lives under `backend/`:

```
backend/
├── manage.py
├── pyproject.toml
├── requirements/
├── config/              # Django settings, URLs, WSGI/ASGI
│   └── settings/        # base, development, production, testing
├── apps/                # Django bounded contexts
│   ├── shared/          # Shared kernel (cross-domain primitives)
│   ├── users/           # Users bounded context
│   └── branch_auth/     # Branch auth bounded context
├── common/              # Shared utilities (scaffolding for future rewrite)
├── infrastructure/      # Cross-cutting integrations (scaffolding)
├── static/
├── media/
├── templates/
├── scripts/
├── docs/
└── tests/
```

Each app under `backend/apps/` keeps the hexagonal layout:

```
apps/users/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── tests/
```

New domains are added as siblings under `backend/apps/` (e.g. `backend/apps/sales/`).

## Import Namespace

Python imports use the `apps.` prefix:

- `apps.users.*`
- `apps.branch_auth.*`
- `apps.shared.*`
- `config.*` (project configuration, not under `apps/`)

## Domain Structure

Each domain must follow:

domain/
application/
infrastructure/
presentation/
tests/

Example:

```
backend/apps/sales/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── tests/
```

## Dependency Rules

Allowed:

presentation -> application
application -> domain
infrastructure -> domain

Forbidden:

domain -> application
domain -> infrastructure
domain -> presentation

application -> presentation

## Domain Layer

Contains:

- Entities
- Value Objects
- Domain Services
- Repository Contracts

Cannot:

- Import Django ORM
- Import Oracle drivers
- Import infrastructure code

## Application Layer

Contains:

- Use Cases
- DTOs
- Business workflows

## Infrastructure Layer

Contains:

- Django ORM models
- Repository implementations
- External integrations

## Presentation Layer

Contains:

- REST APIs (Django REST Framework `APIView`)
- Serializers (request/response formatting only)
- Controllers
- Domain exception mappings (`exception_mappings.py`)
- OpenAPI annotations (`@extend_schema`)

Business rules are forbidden in this layer. Domain exceptions are mapped to HTTP status codes in `{domain}/presentation/exception_mappings.py` and handled globally via `config.drf.exception_handler`. Session-protected routes use `IsOracleAuthenticated` from `apps.shared.presentation`.
