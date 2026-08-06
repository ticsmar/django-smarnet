# Autenticação e usuários

Sessão baseada em cookies assinados (`SESSION_ENGINE = signed_cookies`). O frontend chama a API com `credentials: "include"`.

## Endpoints (`/api/users/`)

| Método | Rota | Auth | Notas |
|--------|------|------|--------|
| `POST` | `/api/users/login/` | público | Cria sessão; devolve payload do usuário |
| `POST` | `/api/users/logout/` | autenticado | `204` |
| `GET` | `/api/users/me/` | autenticado | Usuário atual |
| `POST` | `/api/users/change-password/` | autenticado | `204` |
| `POST` | `/api/users/register/` | público | **403** se `ALLOW_PUBLIC_REGISTER` for falso (padrão) |

Código: `backend/apps/users/presentation/api/urls.py`.

## Payload autenticado

Campos relevantes: `username`, `is_branch_manager`, `is_superuser`, `can_manage_access`, `must_change_password`, `groups`, `permissions`.

Permissões no frontend são strings `app_label.codename` (ex.: `compras_infrastructure.view_fornecedor`). Superusuário passa em todas as checagens de permissão no cliente.

## Grupos e papéis

| Grupo Django | Flag / efeito |
|--------------|----------------|
| `branch_managers` | `is_branch_manager` — tokens em `/api/branch-auth/` e UI `/app/devices` |
| `access_admins` | `can_manage_access` — `/settings` e `/api/admin/` |
| (flag) `is_superuser` | Bypass dos dois acima + Design System |

Resolver: `backend/apps/shared/presentation/auth/django_user_resolver.py`.

## Troca de senha

- Perfil de segurança: `UserSecurityProfile` (`must_change_password`).
- Se a troca for **obrigatória**, não exige senha atual; caso contrário, exige.
- Login com flag ativa redireciona para `/change-password`.
- Em `/app/profile` há link para troca; a página `/change-password` hoje é pensada sobretudo para o fluxo forçado.

## Admin de usuários (`/api/admin/`)

Requer `IsAccessAdmin` (`can_manage_access` ou superuser):

- `GET|POST /api/admin/users/`
- `GET|PATCH /api/admin/users/<pk>/`
- `POST /api/admin/users/<pk>/set-password/`
- `PUT /api/admin/users/<pk>/groups/`
- `GET /api/admin/groups/`

## Frontend

- Bootstrap: `getCurrentUser()` em `AppContext` no mount.
- Cliente: `frontend/src/api/client.ts` + `frontend/src/api/auth.ts`.
- Layouts protegidos redirecionam para `/change-password` quando `must_change_password`.

Ver também: [admins — Usuários e acessos](../admins/usuarios-acessos.md), glossário em [`CONTEXT.md`](../../CONTEXT.md).
