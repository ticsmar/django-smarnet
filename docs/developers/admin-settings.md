# Admin e settings

Área `/settings/*` para **admin de acesso** (`can_manage_access` / grupo `access_admins` ou superusuário).

Gate: `ProtectedAdminLayout` + `AccessAdminRoute` (flag ou sonda `GET /api/admin/users/`).

Sidebar: `frontend/src/components/AdminSidebar.tsx`.

## Rotas

| Path | UI | Estado atual |
|------|-----|--------------|
| `/settings` | Overview | Atalhos + KPIs mock |
| `/settings/atividade` | Overview | Placeholder |
| `/settings/usuarios` | UsersAdmin | **Live** — CRUD via `/api/admin/users/` |
| `/settings/acessos` | AccessAdmin | **Live** — atribuição de grupos |
| `/settings/empresas` | CompaniesAdmin | **Mock** local |
| `/settings/sistema` | SystemAdmin | **Mock** de formulários |
| `/settings/integracoes`, `/settings/notificacoes` | SystemAdmin | Mock |
| `/settings/logs` | Overview | Placeholder |

## API relacionada

Ver [auth.md](./auth.md) seção Admin de usuários. Groups include `branch_managers`, `access_admins`, etc. via `GET /api/admin/groups/` e `PUT .../groups/`.

## Relação com o ERP

- Operadores e gestores de filial usam `/app/*`, não `/settings`.
- Design System (`/design-system`) é outro gate (`is_superuser`), não faz parte de settings.

Doc de TI: [admins/usuarios-acessos](../admins/usuarios-acessos.md).
