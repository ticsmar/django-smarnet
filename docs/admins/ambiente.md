# Ambiente e deploy

Inventário completo de plataformas, bibliotecas e versões:  
**[developers/stack-e-infraestrutura.md](../developers/stack-e-infraestrutura.md)**  
(Python/Django/Oracle, Node/React/Vite/Tailwind/shadcn — **sem Bootstrap**, Docker, portas, `.env`).

## Desenvolvimento local

1. Backend: venv, `pip install -r requirements/development.txt`, copiar `backend/.env.example` → `.env` (Oracle).
2. `python manage.py runserver` (porta típica `8000`).
3. Frontend: `frontend/.env` a partir do example; `npm install` && `npm run dev`.
4. CORS: incluir origens do Vite em `CORS_ALLOWED_ORIGINS` no `.env` do backend.

Guia completo: [`README.md`](../../README.md) na raiz.

## Variáveis úteis

| Onde | Variável | Uso |
|------|----------|-----|
| Backend | credenciais Oracle, `CORS_ALLOWED_ORIGINS`, `ALLOW_PUBLIC_REGISTER` | DB, CORS, registro público |
| Frontend | `VITE_DJANGO_API_URL` | Base da API (default `http://localhost:8000/api`) |

## OpenAPI

Com o backend no ar: schema em `/api/schema/`, Swagger em `/api/docs/`.

## Docker

- API: `Dockerfile` raiz (Python + Instant Client 19.25 + Gunicorn `:8000`).
- Frontend prod: `frontend/Dockerfile` (Node 20 → `serve` `:8080`, host Compose `:3000`).
- Frontend dev (HMR): `docker compose -f docker-compose.yml -f docker-compose.dev.yml up frontend`.

Detalhes e tabela de versões: [stack-e-infraestrutura](../developers/stack-e-infraestrutura.md).

## Checklist rápido

- [ ] Oracle acessível com as credenciais do `.env`
- [ ] Sessão cookie funciona (login → `/api/users/me/` com cookie)
- [ ] Frontend aponta para a mesma origem/proxy esperada
- [ ] Grupos `access_admins` / `branch_managers` criados (migrações) e atribuídos
- [ ] Python alinhado ao projeto (≥ 3.13 local; revisar imagem Docker se ainda em 3.12)
