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

Application code lives under `backend/`. **Package names and API prefixes are English**, matching frontend routes ([ADR 0003](docs/adr/0003-rotas-frontend-em-ingles.md)). Domain language (Cliente, Fornecedor) stays Portuguese.

```
backend/
├── manage.py
├── pyproject.toml
├── requirements/
├── config/              # Django settings, URLs, WSGI/ASGI
│   └── settings/        # Django settings modules — NOT a business app
├── apps/                # Django bounded contexts
│   ├── shared/          # Shared kernel (auth DRF, Oracle session, DB router)
│   ├── users/           # Identity (users, people, companies, access requests)
│   ├── branch_auth/     # Branch auth (devices / tokens)
│   ├── commercial/      # Commercial (clientes) — tela migrada
│   ├── purchasing/      # Purchasing (fornecedores) — tela migrada
│   ├── administration/ # Administration dashboards/reports (no Cliente)
│   ├── production/      # Production (OP)
│   ├── portal/          # Public portal (news / groups / menus)
│   ├── files/           # File manager (sistemas nativos + PROP_ARQUIVO)
│   └── followup/        # Follow-up / recado (sistemas nativos + PROP_RECADO)
├── static/
├── media/
├── templates/
└── scripts/             # Auditoria Oracle (não é deploy de package)
```

`/settings` is a **frontend shell**, not `backend/apps/settings/` (that name collides with `config/settings/`). Settings screens call `users`, `files` and `followup` APIs.

Do not put business code in `config/`. If a bounded context is unclear, **ask which module** before creating folders (see `docs/developers/novas-telas.md`).

Each app under `backend/apps/` keeps the hexagonal layout:

```
apps/users/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── tests/
```

New domains are added as siblings under `backend/apps/` (English folder name).

## Import Namespace

Python imports use the `apps.` prefix:

- `apps.users.*`
- `apps.branch_auth.*`
- `apps.commercial.*`
- `apps.purchasing.*`
- `apps.administration.*`
- `apps.production.*`
- `apps.portal.*`
- `apps.files.*`
- `apps.followup.*`
- `apps.shared.*`
- `config.*` (project configuration, not under `apps/`)

| Context | API | UI | Perm app label |
|---------|-----|----|----------------|
| commercial | `/api/commercial/` | `/app/commercial/customers` | `commercial_infrastructure` |
| purchasing | `/api/purchasing/` | `/app/purchasing/suppliers` | `purchasing_infrastructure` |
| administration | `/api/administration/` | `/app/administration/*` | `administration_infrastructure` |
| production | `/api/production/` | `/app/production/*` | `production_infrastructure` |
| portal | `/api/portal/` | `/portal` | `portal_infrastructure` |
| files | `/api/files/` | FileManager + `/settings/file-manager` | `files_infrastructure` |
| followup | `/api/followup/` | FollowUp + `/settings/follow-up` | `followup_infrastructure` |
| users | `/api/users/`, `/api/admin/` | `/settings/*` | `users_infrastructure` |
| branch_auth | `/api/branch-auth/` | `/app/devices` | `branch_auth_infrastructure` |

Legacy API prefixes (`/api/administracao/`, `/api/compras/`, `/api/arquivos/`, `/api/recados/`) remain as aliases.

## Domain Structure

Each domain must follow:

domain/
application/
infrastructure/
presentation/
tests/

Example:

```
backend/apps/production/
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

Business rules are forbidden in this layer. Application workflows belong in use cases; domain invariants may live in domain services. Domain exceptions are mapped to HTTP status codes in `{domain}/presentation/exception_mappings.py` and handled globally via `config.drf.exception_handler`. Session-protected routes use `IsOracleAuthenticated` from `apps.shared.presentation`.

New screens: decide **tela migrada** vs **aplicação nativa** in `docs/developers/novas-telas.md`.
