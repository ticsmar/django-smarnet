# Smarnet ERP (Django)

Ambiente novo (Django + React) para **aplicações nativas** e telas migradas do **Smarnet 3.0** (PHP em produção, mesmo Oracle). Ainda não substitui o 3.0 por completo: no go-live de cada módulo, a tela PHP equivalente é desativada ([ADR 0006](docs/adr/0006-desativacao-legado-por-modulo.md)).

## Stack

- Python 3.13
- Django + Django REST Framework + drf-spectacular
- Oracle Database (oracledb)
- React + TypeScript (Vite)

## Project layout

```
backend/            # Django API (see backend/README.md)
frontend/           # ERP UI (Vite + TypeScript + Tailwind) — porta 8080
docs/               # Documentação do sistema (developers / admins / operators)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for layer rules, [docs/developers/novas-telas.md](docs/developers/novas-telas.md) for migrated vs native screens, and [AI_DEVELOPMENT_RULES.md](AI_DEVELOPMENT_RULES.md) for coding standards.

**Documentação do sistema** (produto, domínio, operação — PT): [docs/README.md](docs/README.md).  
Stack e infraestrutura (versões): [docs/developers/stack-e-infraestrutura.md](docs/developers/stack-e-infraestrutura.md).  
Agentes de IA: [AGENTS.md](AGENTS.md) · glossário: [CONTEXT.md](CONTEXT.md).

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements/development.txt
cp .env.example .env              # then fill in Oracle credentials
```

`requirements/development.txt` instala ruff, pytest, mypy e import-linter (além das deps de runtime).

## Run

```bash
cd backend
python manage.py runserver
```

API prefixes: `/api/users/`, `/api/admin/`, `/api/branch-auth/`, `/api/compras/`, `/api/administracao/`. New users are created by access admins via `POST /api/admin/users/` (self-registration is disabled by default).

OpenAPI schema: `/api/schema/` — Swagger UI: `/api/docs/`.

## Frontend

A single React app (`frontend/`) uses the Django session API (`credentials: 'include'`).

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:8080`. Vite proxies `/api` to Django (`http://localhost:8000`).

Ensure `backend/.env` includes CORS for the Vite origin (and Compose host port 3000 if you use `docker compose`):

```
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000,http://127.0.0.1:3000
```

Run backend and frontend in parallel (`python manage.py runserver` + `npm run dev`).

### Branch-auth token management

Branch managers (Django group `branch_managers`) can list, create, and revoke access tokens via `/api/branch-auth/tokens/`. The UI is at `/app/devices`; manager access is detected by probing that endpoint.

`POST /api/branch-auth/verify-token/` is for the Go desktop client, not the SPA.

## Quality checks

From `backend/` (after `pip install -r requirements/development.txt`):

```bash
ruff check .
ruff format --check .
mypy .
lint-imports
pytest
```

Frontend: `npx tsc --noEmit` and `npm test`.

CI runs the backend checks on every push/PR to `master`.

## Docker

```bash
docker compose up --build
```

The API runs from `backend/` inside the container. Compose maps the frontend image to **http://localhost:3000** (container port 8080).
