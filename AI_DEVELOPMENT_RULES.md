# AI Development Rules

All generated code must follow:

## Python

- Use Python 3.13 syntax
- Use type hints everywhere
- No Any unless explicitly justified
- Prefer dataclasses
- Prefer composition over inheritance

## Functions

- Maximum 50 lines
- Single responsibility
- No nested functions

## Classes

- Maximum 300 lines
- Constructor injection only

## Database

- No raw SQL outside repositories
- Oracle access only through repository implementations

## Django

- Business rules never inside models
- Fat use cases, thin views
- No business logic in serializers

## Django REST Framework

- Views delegate to use cases; no `try/except` for domain exceptions in views
- Register domain exception maps in `{domain}/presentation/exception_mappings.py`
- Use `IsOracleAuthenticated` for session-protected routes
- Annotate views with `@extend_schema` for OpenAPI documentation
- Login endpoint uses `authentication_classes = []` and `AllowAny`
- Self-registration is disabled by default (`ALLOW_PUBLIC_REGISTER=false`); user creation goes through `/api/admin/users/`

## Testing

Every public use case must have:

- Unit tests
- Happy path tests
- Failure path tests

Coverage target:

- 80% minimum

## Naming

UseCase suffix:

CreateInvoiceUseCase

Repository suffix:

InvoiceRepository

DTO suffix:

CreateInvoiceInputDTO

Entity suffix:

InvoiceEntity

## Forbidden

- God classes
- Utility classes with unrelated methods
- Circular imports
- Duplicate business rules

## Quality Tooling

Human rules above are enforced by CI tooling. Run locally from `backend/` before pushing:

```bash
pip install -r requirements/development.txt
ruff check .
ruff format --check .
mypy .
lint-imports
pytest
```

| Human Rule | Enforced By |
| --- | --- |
| Python 3.13 syntax | Ruff `UP*`, MyPy `python_version` |
| Type hints everywhere | Ruff `ANN*`, MyPy `strict` |
| No `Any` unless justified | MyPy `disallow_any_explicit` |
| Max 50 lines / single responsibility | Ruff `PLR0915` (+ review) |
| No circular imports | Import-Linter `independence` + `forbidden` |
| Layer dependencies | Import-Linter `layers` + `forbidden` |
| Domain cannot import Django/ORM | Ruff `TID251` banned-api |
| 80% coverage | Pytest-cov `--cov-fail-under=80` |
| Tests in `*/tests/` | Pytest `testpaths` discovery |

Configuration lives in `backend/pyproject.toml` (Ruff, MyPy, Pytest/coverage) and `backend/.importlinter` (layer contracts).

### Adding a New Domain

When creating a domain (e.g. `backend/apps/sales/`):

1. Create the folder structure under `backend/apps/{domain}/`: `domain/`, `application/`, `infrastructure/`, `presentation/`, `tests/`.
2. Decide **tela migrada** vs **aplicação nativa** (`docs/developers/novas-telas.md`).
3. Copy the four Import-Linter contracts from an existing app in `backend/.importlinter`, replacing the prefix with the new domain name:
   - `{domain}-layers` (type: `layers`) — `presentation` → `application` → `domain`
   - `{domain}-domain-isolation` (type: `forbidden`) — `domain` cannot import other layers
   - `{domain}-app-no-presentation` (type: `forbidden`) — `application` cannot import `presentation`
   - `{domain}-infra-boundary` (type: `forbidden`) — `infrastructure` cannot import `application` or `presentation`
4. Add the domain to the `domain-independence` module list in `.importlinter` (business domains only; `shared` is a kernel imported by all domains).
5. Add `*.domain` forbidden imports of `django` / `oracledb` if the shared domain-isolation contract does not already cover the new package.
6. Update `root_packages` in `.importlinter` if using multiple root packages.
