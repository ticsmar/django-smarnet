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

Application code lives under `src/`:

```
src/
├── config/          # Django settings, URLs, WSGI/ASGI
├── shared/          # Shared kernel (cross-domain primitives)
│   └── presentation/  # DRF auth, permissions, exception handler
└── users/           # Users bounded context
    ├── domain/
    ├── application/
    ├── infrastructure/
    ├── presentation/
    └── tests/
```

New domains are added as siblings under `src/` (e.g. `src/sales/`).

## Domain Structure

Each domain must follow:

domain/
application/
infrastructure/
presentation/
tests/

Example:

src/sales/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── tests/

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

Business rules are forbidden in this layer. Domain exceptions are mapped to HTTP status codes in `{domain}/presentation/exception_mappings.py` and handled globally via `config.drf.exception_handler`. Session-protected routes use `IsOracleAuthenticated` from `shared.presentation`.
