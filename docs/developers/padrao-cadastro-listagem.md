# Padrão de cadastro e listagem (ERP)

**Este é o padrão obrigatório** para novas entidades de cadastro no Smarnet (listagem + detalhe + API + permissões).

Agentes de IA e desenvolvedores devem **seguir este documento** ao criar ou estender cadastros. Em dúvida, copie a estrutura da **implementação de referência** em Compras (`frontend/src/modules/compras/` + `backend/apps/compras/`) e adapte nomes — não invente outro layout de listagem nem outro modelo de permissão.

Pré-requisitos: [`ARCHITECTURE.md`](../../ARCHITECTURE.md), [`novas-telas.md`](./novas-telas.md) (migrada vs nativa), [`AI_DEVELOPMENT_RULES.md`](../../AI_DEVELOPMENT_RULES.md), [`OPENSPEC.md`](../../OPENSPEC.md), Design System → Patterns / Table.

---

## 1. Quando usar

Use este padrão quando a feature for:

- Cadastro mestre (CRUD ou CRU + inativação)
- Listagem paginada com busca/filtros
- Detalhe do registro
- Controle por permissões Django (`view` / `add` / `change` / `delete`)

Não use para: dashboards, wizards longos, file managers ou telas só de configuração mock.

---

## 2. Decisões já tomadas (não reabrir sem ADR)

| Tema | Decisão |
|------|--------|
| Visualizações da listagem | Sempre **Tabela**, **Lista** e **Cards** via `ViewToggle` + `useViewMode` (localStorage) |
| Ações na linha | Visualizar / Editar / Excluir (ou Inativar), filtradas por permissão |
| Tabela / Lista | Menu ⋮ **à esquerda** (coluna sem texto de header) |
| Cards | **Sem** avatar/badge de código truncado; mesmas ações como **botões no rodapé** |
| Exclusão de mestre Oracle com flag ativo | Preferir **inativar** (soft), não hard delete, quando o domínio já usa `ativo` / procedures |
| Breadcrumb | Declarar via `usePageBreadcrumb` — a barra fica no `AppLayout`, não na página |
| API | Camadas hexagonais; lógica em use cases; views finas |
| Auth API | Sessão Oracle + permissões Django no payload do usuário |
| UI i18n | Chaves em `pt-BR` / `en` / `es` |

---

## 3. Backend — estrutura

Dentro de `backend/apps/<contexto>/`:

```text
domain/          # entidades, ports de repositório, exceções
application/     # use cases, DTOs, mappers
infrastructure/  # models (Oracle unmanaged se for o caso), repos, migrations de permissões
presentation/    # views DRF, serializers, urls, permissions helpers
tests/
```

### 3.1 Use cases típicos

Para um recurso `Recurso`:

- `ListRecursos` — paginação + `search` + filtros (ex. ativo)
- `GetRecurso`
- `GravaRecurso` (create) / `AtualizaRecurso` (update) — ou um use case com modo create/update se o legado assim exigir
- `AtivaRecurso` / `InativaRecurso` — se houver soft status
- Filhos (contatos, itens): list/grava/exclui conforme o domínio

### 3.2 API REST (convenção)

Montar sob `/api/<contexto>/`:

| Método | Rota | Permissão típica |
|--------|------|------------------|
| `GET` | `/recursos/` | `view_*` |
| `POST` | `/recursos/` | `add_*` |
| `GET` | `/recursos/<id>/` | `view_*` |
| `PUT` | `/recursos/<id>/` | `change_*` |
| `POST` | `/recursos/<id>/ativar/` | `change_*` |
| `POST` | `/recursos/<id>/inativar/` | `change_*` |

Query de listagem (referência): `search`, `ativo` (opcional), `page`, `page_size`.

Resposta de lista: incluir `items` (ou equivalente), `total`, `page`, `page_size` para a UI paginar.

Registrar urls em `backend/config/urls.py` e documentar no OpenAPI (drf-spectacular).

### 3.3 Permissões

1. Modelos (mesmo unmanaged) devem gerar codenames Django padrão: `view_`, `add_`, `change_`, `delete_`.
2. App label estável (ex. `<contexto>_infrastructure`).
3. Helpers em `presentation/permissions.py` escolhem a lista de perms por método HTTP (GET vs POST vs PUT).
4. Views exigem autenticação de sessão + as perms do helper.
5. **Inativar/ativar** costuma exigir `change_*` (não `delete_*`), alinhado ao soft delete.
6. Espelhar as strings no frontend (`app_label.codename`) e checar com `hasPermission` em `frontend/src/lib/userPermissions.ts` (módulos só exportam constantes de perm); **superuser** passa em todas.

Não inventar um sistema de roles paralelo para cadastros mestres.

---

## 4. Frontend — estrutura do módulo

```text
frontend/src/modules/<contexto>/
  api/           # client HTTP tipado
  components/    # form dialog, row actions, etc.
  hooks/         # react-query + useXxxAccess
  pages/         # ListPage, DetailPage, Route guard
  types/
  permissions.ts # constantes COMPRAS_PERMS-like
  index.ts
```

### 4.1 Rotas (`App.tsx`)

- **Paths em inglês** (kebab-case); labels/menus em português — ver [ADR 0003](../adr/0003-rotas-frontend-em-ingles.md), [app-routes.md](./app-routes.md) e `AGENTS.md`
- Índice do módulo: `ModuleIndexPage` + entrada em `erpNavigation.ts`
- Listagem: `/app/<module>/<resource>`; detalhe: `/app/<module>/<resource>/:id`
- Guard de rota: se não tiver `view_*`, redirecionar (padrão do route component de Compras)
- Path legado substituído → `<Navigate replace />` para o path canônico
- **Obrigatório** EN em rotas novas e existentes; tabela canônica `/app/*` em [app-routes.md](./app-routes.md)

### 4.2 Navegação

Em `frontend/src/config/erpNavigation.ts`: item com `path`, `permission` (view) e/ou `managerOnly` quando aplicável. O menu só mostra o que o usuário pode ver.

### 4.3 Breadcrumb

Na página:

```ts
usePageBreadcrumb([
  { label: t('nav.<modulo>'), href: '/app/<module-en>' },
  { label: t('<contexto>.<recurso>.title') }, // página atual sem href
]);
```

Não renderizar `<nav>` de breadcrumb local — a faixa é global no layout.

---

## 5. Tela de listagem (obrigatório)

### 5.1 Toolbar

Ordem:

1. Busca (`Input` + ícone)
2. Filtros (`Select` / botões) — ex. Ativos / Inativos / Todos
3. Ações à direita (`sm:ml-auto`): **Novo** (se `add_*`) + **`ViewToggle`**

Chave de persistência: `smarnet:view:<contexto>-<recurso>` via `useViewMode`.

Componentes: `@/components/ui/ViewToggle`, `@/hooks/useViewMode`.

### 5.2 Três modos

| Modo | Layout | Ações |
|------|--------|--------|
| `tabela` | `<Table>` | Coluna estreita **à esquerda**, header vazio; menu ⋮ |
| `lista` | Linhas tipo row card | Menu ⋮ à esquerda |
| `cards` | Grid responsivo | Botões no **rodapé** do card (`variant="buttons"`) |

Regras de card:

- Título + identificador (código completo em mono), status
- Campos secundários em `<dl>` compacto
- **Não** usar badge quadrado com últimos dígitos do código
- Clique no card/linha abre detalhe; ações usam `stopPropagation`

### 5.3 Ações de linha

Componente dedicado (ex. `*RowActions`) com:

- Props: `canView`, `canEdit`, `canDelete`, callbacks, `variant: 'menu' | 'buttons'`
- Menu: `ActionsDropdown` + ícone `MoreVertical`
- Botões: `Button` `outline` / `destructive`, size `sm`, com ícone + label i18n (`module.view` / `module.edit` / `module.delete`)
- Só renderizar ações permitidas; se nenhuma, não mostrar coluna/rodapé

**Excluir na UI** (quando soft):

- Mostrar só se registro ativo e (`delete_*` **ou** `change_*`), conforme a regra do domínio de referência
- Confirmar com `window.confirm` (ou dialog) + mensagem i18n
- Chamar endpoint de **inativar**, não DELETE do mestre

### 5.4 Paginação

Rodapé: total de registros + Anterior/Próxima desabilitando nos extremos. `page_size` alinhado à API (referência: 20).

### 5.5 Estados

- Loading: spinner centrado
- Erro de carga / ação: `Alert`
- Lista vazia: mensagem clara (e empty state do Design System quando couber)

### 5.6 Criar / editar na listagem

- **Novo** e **Editar** abrem dialog de formulário (`*FormDialog`)
- Após criar com sucesso, navegar para o **detalhe** do novo id
- Editar pode permanecer na lista ou ir ao detalhe — referência: dialog na lista + detalhe com edição própria

---

## 6. Tela de detalhe

- Breadcrumb: Módulo → Listagem (href) → identificador/nome atual
- Ações: Editar, Ativar/Inativar (se `change_*`)
- Seções filhas (ex. contatos) com CRUD próprio e perms `*_filho`
- Volta à listagem via breadcrumb ou botão explícito se necessário

---

## 7. Cliente API e hooks

- Funções tipadas em `api/` (erros via classe `ApiError` ou equivalente do módulo)
- React Query: `useQuery` para list/get; `useMutation` para grava/atualiza/inativa com invalidação da listagem
- Hook `useXxxAccess` encapsula `hasPermission` para a página não espalhar strings de perm

---

## 8. i18n

- Chaves por módulo: título, colunas, status, confirmações, erros
- Ações genéricas de linha: `module.view`, `module.edit`, `module.delete`, `module.actions`
- View toggle: `view.tabela`, `view.lista`, `view.cards`
- Atualizar **pt-BR**, **en** e **es**

---

## 9. Checklist do agente (copiar e cumprir)

Antes de implementar um cadastro novo:

- [ ] Li este padrão + ARCHITECTURE + OPENSPEC
- [ ] Defini perms `view/add/change/delete` e strings no front
- [ ] Use cases + repos nas camadas corretas (sem lógica de negócio na view/serializer)
- [ ] Rotas API no formato da §3.2 (+ ativar/inativar se soft)
- [ ] Módulo front com api, hooks, pages, permissions
- [ ] Entrada em `erpNavigation` + rotas em `App.tsx` + guard `view`
- [ ] Listagem com toolbar, `ViewToggle`, 3 modos, ações left/menu vs footer/buttons
- [ ] Cards sem avatar de código truncado
- [ ] Soft inativar se o domínio usa flag ativo
- [ ] `usePageBreadcrumb` (sem nav local)
- [ ] i18n nos 3 idiomas
- [ ] Testes de API/perms no backend (e smoke de UI se houver harness)

**Não fazer:**

- Só tabela sem lista/cards
- Menu de ações só à direita “porque é comum em outros sistemas”
- Hard delete de mestre Oracle quando o padrão do contexto é inativar
- Embutir breadcrumb no `max-w` da página
- Bypass de permissão só no front (API deve validar)

---

## 10. Referência no código

| Camada | Onde olhar |
|--------|------------|
| Listagem + 3 views + ações | `frontend/src/modules/compras/pages/FornecedoresPage.tsx` |
| Row actions menu/buttons | `frontend/src/modules/compras/components/FornecedorRowActions.tsx` |
| Perms front | `frontend/src/modules/compras/permissions.ts` |
| ViewToggle | `frontend/src/components/ui/ViewToggle.tsx`, `hooks/useViewMode.ts` |
| Demo Design System | `/design-system/patterns`, `/design-system/components/table` |
| API + perms back | `backend/apps/compras/presentation/` |
| Use cases | `backend/apps/compras/application/use_cases/` |

Ao gerar código novo, **renomeie** entidades e paths; preserve o comportamento descrito acima.
