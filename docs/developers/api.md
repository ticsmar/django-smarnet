# API / OpenAPI

## Montagens (`backend/config/urls.py`)

| Prefixo | Conteúdo |
|---------|----------|
| `/api/schema/` | Schema OpenAPI (drf-spectacular) |
| `/api/docs/` | Swagger UI |
| `/api/users/` | Login, sessão, senha |
| `/api/admin/` | Gestão de usuários/grupos (access admin) |
| `/api/branch-auth/` | Tokens de device |
| `/api/compras/` | Fornecedores, contatos, países |
| `/api/administracao/` | Clientes, catálogos (países, estados, origens) |
| `/admin/` | Django Admin |

## Spectacular

Em `backend/config/settings/base.py` (`SPECTACULAR_SETTINGS`): título `"ERP API"`, versão `0.1.0`, `SERVE_INCLUDE_SCHEMA: False`.

Esquema de autenticação documentado: cookie de sessão `sessionid` (`oracleSessionAuth`) — `backend/apps/shared/presentation/schema.py`.

Testes de fumaça: `backend/config/tests/test_openapi_schema.py`.

## Cliente frontend

Base URL: `VITE_DJANGO_API_URL` ou fallback `http://localhost:8000/api` (`frontend/src/api/client.ts`). Todas as chamadas autenticadas usam cookies de sessão.

## Por contexto

- Usuários: [auth.md](./auth.md)
- Administração — Clientes: [administracao-clientes.md](./administracao-clientes.md)
- Compras: [compras.md](./compras.md)
- Devices: [producao-devices.md](./producao-devices.md)
