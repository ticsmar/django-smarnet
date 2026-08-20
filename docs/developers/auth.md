# Autenticação e usuários

Sessão baseada em cookies assinados (`SESSION_ENGINE = signed_cookies`). O frontend chama a API com `credentials: "include"`.

## Endpoints (`/api/users/`)

| Método | Rota | Auth | Notas |
|--------|------|------|--------|
| `POST` | `/api/users/login/` | público | Cria sessão; devolve payload do usuário |
| `POST` | `/api/users/logout/` | autenticado | `204` |
| `GET` | `/api/users/me/` | autenticado | Usuário atual (sessão/papéis) |
| `GET` | `/api/users/me/profile/` | autenticado | Perfil unificado (conta + `SIAOS.USUARIO` + empresa + `FUNCIONARIO` quando houver) |
| `POST` | `/api/users/change-password/` | autenticado | `204` |
| `POST` | `/api/users/register/` | público | **403** se `ALLOW_PUBLIC_REGISTER` for falso (padrão) |
| `POST` | `/api/users/access-requests/` | público | Solicitar acesso (pré-pessoa Cliente/Fornecedor) |
| `GET` | `/api/users/catalog/countries/` | público | Catálogo para o formulário de solicitação |
| `GET` | `/api/users/catalog/states/` | público | Catálogo de estados (`pai_codigo`) |

Código: `backend/apps/users/presentation/api/urls.py`.

## Payload autenticado

Campos relevantes em `/me/`: `username`, `is_branch_manager`, `is_superuser`, `can_manage_access`, `must_change_password`, `groups`, `permissions`.

O perfil em `/me/profile/` une:

- conta Django (papéis/grupos);
- vínculo `UserSecurityProfile.usu_chapa` → `SIAOS.USUARIO` (fallback por `usu_loginweb`);
- `GERAL.EMPRESA` via `emp_codigo`;
- `SIAOS.FUNCIONARIO` quando existir registro com a mesma chapa **e** `FUN_ATIVO` ativo;
- centro de custo (`SIAOS.CENTRO_CUSTO`) quando houver `cc_codigo`.

### Escopo por empresa

- Todo usuário operacional deve ter `usu_chapa` no `USER_SECURITY_PROFILE` (e assim `emp_codigo` via `SIAOS.USUARIO`).
- Listagens/detalhes de entidades com `emp_codigo` filtram pelo `emp_codigo` do usuário logado.
- `emp_codigo` nulo no registro é tratado como **`1`**.

Permissões no frontend são strings `app_label.codename` (ex.: `compras_infrastructure.view_fornecedor`). Superusuário passa em todas as checagens de permissão no cliente.

## Grupos e papéis

| Grupo Django | Flag / efeito |
|--------------|----------------|
| `branch_managers` | `is_branch_manager` — tokens em `/api/branch-auth/` e UI `/app/devices` |
| `access_admins` | `can_manage_access` — `/settings` e `/api/admin/` |
| (flag) `is_superuser` | Bypass dos dois acima; Design System e docs internos só em ambiente de desenvolvimento |

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
- `GET /api/admin/product-permissions/`
- `PUT /api/admin/users/<pk>/product-permissions/`
- `GET /api/admin/requests/` (triagem de pré-pessoa) + approve/discard
- Catálogos: companies, people, countries, states, chapas, oracle-users (import)

## Limite com o Django admin

O fluxo em `/settings/*` cobre a administração de usuários do produto e a concessão de acessos por grupos.
Já a tela nativa do Django em `/admin/auth/user/<id>/change/` permanece para o CRUD técnico do modelo `auth.User`,
incluindo permissões nativas do Django, flags internas e relações administrativas que não fazem parte do fluxo de negócio.

Resumo prático:

| Área | Fica em |
|------|---------|
| E-mail, status ativo/inativo, grupos do produto, senha temporária | `/settings` |
| Permissões nativas do Django, campos técnicos do `auth.User`, manutenção excepcional | `/admin` |

## Frontend

- Bootstrap: `getCurrentUser()` em `AppContext` no mount.
- Cliente: `frontend/src/api/client.ts` + `frontend/src/api/auth.ts`.
- Layouts protegidos redirecionam para `/change-password` quando `must_change_password`.
- `/docs` e `/design-system` exigem superusuário e ambiente de desenvolvimento (`import.meta.env.DEV` ou `VITE_APP_RUNTIME_ENV=development`).
- Banner LGPD (`LGPDBanner`) em todas as rotas até haver decisão; consentimento em `localStorage` (`smarnet:lgpd-consent`). Cookies de preferência (tema, idioma, layout) só são gravados se `functional` for verdadeiro. Rota pública `/privacy` descreve o tratamento e reabre as preferências.

Ver também: [admins — Usuários e acessos](../admins/usuarios-acessos.md), glossário em [`CONTEXT.md`](../../CONTEXT.md).
