# ERP

Modular monolith ERP backend built with Django, Clean Architecture, and Oracle Database.

## Stack

- Python 3.13
- Django + Django REST Framework + drf-spectacular
- Oracle Database (oracledb)

## Project layout

```
backend/            # Django API (see backend/README.md)
frontend/           # Minimal React SPA (Vite + TypeScript + Tailwind)
smar-nova-vision/   # Full ERP UI shell integrated with Django API
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for layer rules and [AI_DEVELOPMENT_RULES.md](AI_DEVELOPMENT_RULES.md) for coding standards.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements/development.txt
cp .env.example .env              # then fill in Oracle credentials
```

## Run

```bash
cd backend
python manage.py runserver
```

API routes are under `/api/users/` (login, logout, me). New users are created by access admins via `POST /api/admin/users/` (self-registration is disabled by default).

OpenAPI schema: `/api/schema/` — Swagger UI: `/api/docs/`.

## Frontend

Two React frontends share the same Django session API (`credentials: 'include'`).

### Minimal SPA (`frontend/`)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:3000`.

### Smar Nova Vision (`smar-nova-vision/`)

Full ERP UI shell with Django session auth and branch-auth token management at `/app/devices`.

```bash
cd smar-nova-vision
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:8080`. Vite proxies `/api` to Django in development.

Ensure `backend/.env` includes CORS for both frontends:

```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:8080,http://127.0.0.1:8080
```

Run backend and frontend in parallel (`python manage.py runserver` + `npm run dev`).

### Branch-auth token management

Branch managers (Django group `branch_managers`) can list, create, and revoke access tokens via `/api/branch-auth/tokens/`. In smar-nova-vision the UI is at `/app/devices`; manager access is detected by probing that endpoint.

`POST /api/branch-auth/verify-token/` is for the Go desktop client, not the SPA.

## Quality checks

```bash
cd backend
ruff check .
ruff format --check .
mypy .
lint-imports
pytest
```

CI runs the same checks on every push/PR to `master`.

## Docker

```bash
docker compose up --build
```

The API runs from `backend/` inside the container.
