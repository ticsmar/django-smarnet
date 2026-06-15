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

Human rules above are enforced by CI tooling. Run locally before pushing:

```bash
pip install -r requirements.txt -r requirements-dev.txt
$env:PYTHONPATH = "src"   # PowerShell; use export PYTHONPATH=src on Linux/macOS
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

Configuration lives in `pyproject.toml` (Ruff, MyPy, Pytest/coverage) and `.importlinter` (layer contracts).

### Adding a New Domain

When creating a domain (e.g. `src/sales/`):

1. Create the folder structure under `src/{domain}/`: `domain/`, `application/`, `infrastructure/`, `presentation/`, `tests/`.
2. Copy the four Import-Linter contracts from `shared` in `.importlinter`, replacing the `shared` prefix with the new domain name:
   - `{domain}-layers` (type: `layers`) — `presentation` → `application` → `domain`
   - `{domain}-domain-isolation` (type: `forbidden`) — `domain` cannot import other layers
   - `{domain}-app-no-presentation` (type: `forbidden`) — `application` cannot import `presentation`
   - `{domain}-infra-boundary` (type: `forbidden`) — `infrastructure` cannot import `application` or `presentation`
3. Add the domain to the `domain-independence` module list in `.importlinter`.
4. Add the domain to `[tool.coverage.run].source` in `pyproject.toml`.
5. Update `root_packages` in `.importlinter` if using multiple root packages.
