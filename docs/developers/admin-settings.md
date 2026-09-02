# Admin e settings

Área `/settings/*` para **admin de acesso** (`can_manage_access` / grupo `access_admins` ou superusuário).

**Não** é um bounded context Django. Não criar `backend/apps/settings/` — o nome colide com [`backend/config/settings/`](../../backend/config/settings/) (`base.py`, `development.py`, …) e com `from django.conf import settings`. As telas desta área chamam `users` (`/api/admin/`), `files` (`/api/files/sistemas/`) e `followup` (`/api/followup/sistemas/`). Se o shell precisar de API própria no futuro, o contexto deve se chamar `platform` ou `identity`, não `settings`.

Gate: `ProtectedAdminLayout` + `AccessAdminRoute` (flag ou sonda `GET /api/admin/users/`).

Sidebar: `frontend/src/components/AdminSidebar.tsx`.

## Convenção de rotas

Paths sob `/settings` são em **inglês** (kebab-case). Labels do menu e textos da UI permanecem em português. Paths PT legados redirecionam via `<Navigate replace />` em `App.tsx`. Decisão: [ADR 0003](../adr/0003-rotas-frontend-em-ingles.md).

## Padrão de grids (listagens)

Todas as listagens paginadas de Settings seguem o shell escuro (`AdminLayout` / `admin-shell`) e o contrato abaixo. Alinha-se ao [padrão de cadastro/listagem](./padrao-cadastro-listagem.md), com tokens zinc/amber.

### Toolbar

1. Busca (+ filtros quando houver)
2. `ViewToggle` à direita (`smarnet:view:settings-*`)

### Três modos

| Modo | Layout | Ações |
|------|--------|--------|
| `tabela` | `<table>` nativa (`thead bg-zinc-800/60`) | **1ª coluna** estreita (header vazio); menu ⋮ |
| `lista` | Linhas compactas | Menu ⋮ à esquerda da linha |
| `cards` | Grid 1/2/3 cols | Botões no **rodapé** do card |

### Ações de linha

Componente: `frontend/src/components/admin/SettingsRowActions.tsx`

- `variant="menu"` (padrão) → `ActionsDropdown` com ícone `MoreVertical`
- `variant="buttons"` → botões no rodapé do card
- Ações tipadas: **Visualizar**, **Editar** (ou label custom, ex. Analisar / Importar), **Inativar**, **Ativar**, **Apagar/Excluir**
- Empresa/Pessoa: Visualizar + Inativar. País/Estado: Visualizar + Apagar. Usuários/Importar: Visualizar. Visualizar abre o mesmo formulário em modo somente leitura.
- Só renderizar ações que existirem no caso; soft-inativação confirma com `window.confirm` quando aplicável
- Clique no menu usa `stopPropagation` para não abrir o detalhe/edição da linha

### Paginação

Fora do card da listagem, alinhada à direita: Anterior / página / Próxima.

## Rotas

| Path (canônico) | UI | Estado atual |
|-----------------|-----|--------------|
| `/settings` | SettingsOverview | **Painel Admin** — KPIs (usuários, online, empresas, pessoas), ações rápidas e lista de usuários online (`last_login` atualizado no login e no `GET /api/users/me/`) |
| `/settings/activity` | SettingsOverview | Placeholder |
| `/settings/access-requests` | SolicitacoesAdmin | **Live** — triagem de pré-pessoa / solicitações |
| `/settings/users` | UsersAdmin | **Live** — CRUD via `/api/admin/users/` |
| `/settings/import-users` | ImportUsersAdmin | **Live** — importação de usuários corporativos |
| `/settings/access-profiles` | AccessAdmin | **Live** — abas Grupos/Perfis; seleciona item e adiciona/remove usuários |
| `/settings/masters/companies` | CompaniesAdmin | Pesquisa/listagem conectada a `GERAL.EMPRESA` via `/api/admin/companies/`; formulário composto com bases previstas `SIAOS.CLIENTE` e `NOVASMAR.FORNECEDOR` ainda sem gravação Oracle |
| `/settings/masters/people` | PeopleAdmin | Pesquisa/listagem conectada a `SIAOS.PESSOA` via `/api/admin/people/`; aba de contatos lê `SIAOS.PESSOA_MEIO_CONT` e tipos em `SIAOS.PESSOA_TIPO_CONT`; gravação Oracle ainda não habilitada |
| `/settings/masters/countries` | CountriesAdmin | Listagem e busca conectadas a `GERAL.PAIS_NOME` via `/api/admin/countries/`; modal de edição/criação local (sem gravação Oracle nesta etapa) |
| `/settings/masters/states` | StatesAdmin | Listagem paginada com busca/filtro por país via `/api/admin/states-catalog/`; consulta auxiliar de país em `/api/admin/countries/`; modal de edição/criação local |
| `/settings/file-manager` | FileManagerSistemasAdmin | **Live** — vínculo sistema do Smarnet ↔ código do gerenciador (`PAR_SISTEMA`); seed 1–12; `codigo` imutável; mostra chave `PAR_FILTRO` e tela no Novo (Cliente live, demais reservados) |
| `/settings/follow-up` | FollowUpSistemasAdmin | **Live** — vínculo sistema do Smarnet ↔ código do follow-up (`PRE_SISTEMA`); seed 3/117/121/281/292; custom a partir de 300; mostra chave `PRE_FILTRO` e tela no Novo (Cliente live, Proposta 121 reservada) |
| `/settings/system` | SystemAdmin | **Mock** de formulários |
| `/settings/integrations`, `/settings/notifications` | SystemAdmin | Mock |
| `/settings/logs` | Overview | Placeholder |

### Redirects PT → EN

| Path legado | Destino |
|-------------|---------|
| `/settings/solicitacao` | `/settings/access-requests` |
| `/settings/usuarios` | `/settings/users` |
| `/settings/importar-usuario` | `/settings/import-users` |
| `/settings/acessos` | `/settings/access-profiles` |
| `/settings/empresas`, `/settings/cadastros/empresas` | `/settings/masters/companies` |
| `/settings/cadastros/pessoa` | `/settings/masters/people` |
| `/settings/cadastros/pais` | `/settings/masters/countries` |
| `/settings/cadastros/estado` | `/settings/masters/states` |
| `/settings/sistema` | `/settings/system` |
| `/settings/atividade` | `/settings/activity` |
| `/settings/integracoes` | `/settings/integrations` |
| `/settings/notificacoes` | `/settings/notifications` |
| `/settings/gerenciador-arquivos` | `/settings/file-manager` |
| `/settings/followup` | `/settings/follow-up` |

## API relacionada

Ver [auth.md](./auth.md) seção Admin de usuários. Groups include `branch_managers`, `access_admins`, etc. via `GET /api/admin/groups/` e `PUT .../groups/`.
Permissões diretas de produto usam `GET /api/admin/product-permissions/` e `PUT /api/admin/users/<id>/product-permissions/`.
Cadastros administrativos usam endpoints protegidos por sessão Oracle + admin de acesso: `GET /api/admin/companies/`, `GET /api/admin/people/`, `GET /api/admin/countries/`, `GET /api/admin/states/` e `GET /api/admin/states-catalog/`.

## Relação com o Smarnet 3.01

Quando este ambiente entrar em produção para os cadastros de `/settings`, as telas PHP equivalentes de **Pessoa**, **Empresa** e **Usuário** são desativadas. O cadastro operacional fica aqui: `/settings/masters/people`, `/settings/masters/companies`, `/settings/users`. A mesma regra vale para os demais módulos, conforme forem implantados ([ADR 0006](../adr/0006-desativacao-legado-por-modulo.md)).

Usuário Django não tem equivalente no 3.01; o Django `/admin/` continua só para CRUD técnico de `auth.User`.

## Fronteira com o Django admin

`/settings/users` trata dados operacionais em **Dados**, grupos do produto em **Grupos** e permissões diretas do produto em **Perfil de acesso**; grupos e permissões têm busca local.
`/settings/access-profiles` continua disponível para atribuição direta em lote: em **Grupos**, seleciona-se o grupo e depois os usuários são adicionados ou removidos; em **Perfis**, o mesmo fluxo vale para permissões diretas de produto.
As permissões nativas do Django e a edição técnica completa de `auth.User` permanecem no `/admin/auth/user/<id>/change/`.
Não duplicar no settings o que já é responsabilidade do Django admin.

## Relação com o ERP

- Operadores e gestores de filial usam `/app/*`, não `/settings`.
- Design System (`/design-system`) e docs internos (`/docs`) são outro gate: superusuário em ambiente de desenvolvimento. Não fazem parte de settings.

Doc de TI: [admins/usuarios-acessos](../admins/usuarios-acessos.md).
