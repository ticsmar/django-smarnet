# Guia para agentes de IA

Leia nesta ordem antes de alterar o código:

1. [`CONTEXT.md`](./CONTEXT.md) — glossário de domínio (termos canônicos)
2. [`docs/README.md`](./docs/README.md) — mapa da documentação do sistema
3. [`docs/developers/README.md`](./docs/developers/README.md) — índice técnico + links às fontes na raiz
4. [`docs/developers/stack-e-infraestrutura.md`](./docs/developers/stack-e-infraestrutura.md) — plataformas, libs e versões
5. **[`docs/developers/design-system.md`](./docs/developers/design-system.md) — componentes e tokens de UI** (ler antes de qualquer tela/formulário)
6. **[`docs/developers/padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md) — padrão obrigatório de telas, APIs e acessos para cadastros/listagens** (ler antes de criar qualquer CRUD/listagem nova)
7. [`docs/developers/novas-telas.md`](./docs/developers/novas-telas.md) — modo **tela migrada** (3.01 / package) vs **aplicação nativa** (persistência e origem); no go-live, desativar a tela PHP equivalente ([ADR 0006](./docs/adr/0006-desativacao-legado-por-modulo.md))
8. [`docs/developers/refatoracao-smarnet-novo.md`](./docs/developers/refatoracao-smarnet-novo.md) — playbook PHP 3.01 → Smarnet Novo (identidade Oracle, `PCK_DQANET`, backend/frontend)
9. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — camadas e regras de dependência
10. [`AI_DEVELOPMENT_RULES.md`](./AI_DEVELOPMENT_RULES.md) — padrões de código
11. [`OPENSPEC.md`](./OPENSPEC.md) — checklist ao gerar features
12. ADRs em [`docs/adr/`](./docs/adr/) — decisões registradas

## Cadastros e listagens

Se a tarefa for **nova entidade de cadastro**, **listagem**, **detalhe**, **perms** ou **API de mestre**:

1. Seguir integralmente [`padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md).
2. Decidir modo em [`novas-telas.md`](./docs/developers/novas-telas.md): tela migrada (package Oracle do 3.01) ou aplicação nativa (sem `PCK_*` cosmético).
3. Confirmar o **módulo** (`commercial`, `purchasing`, `administration`, `production`, `portal`, `files`, `users`, `branch_auth`). Se houver dúvida, **perguntar** antes de criar pasta/API/tela — ver [`novas-telas.md`](./docs/developers/novas-telas.md) § “Qual módulo?”. Casca da listagem: `frontend/src/modules/commercial/pages/ClientesPage.tsx` (página inteira, sem card). API/perms: `frontend/src/modules/purchasing/` e `backend/apps/purchasing/` (renomear; não reinventar UX). Cliente vive em `commercial`, não em `administration`.
4. UI só com o Design System: catálogo `/design-system` e `@/components/ui` — ver [`design-system.md`](./docs/developers/design-system.md). Formulários: `FormSection`, `FormGrid`, `FormInput`, `FormCombobox` (não inventar `Section`/`h3` no módulo).
5. Cumprir o checklist da §9 do padrão de cadastro antes de considerar a feature pronta.
6. Em conflito entre “jeito genérico de mercado” e o padrão Smarnet, **vence o padrão Smarnet** (ou abra um ADR). Em tela migrada, o objeto Oracle do 3.01 também vence (não reescrever o package).

## UI e Design System

Antes de desenhar ou alterar interface:

1. Consultar `/design-system` (Components, Patterns, Foundations) e `frontend/src/components/ui/`.
2. Reusar o export existente (`@/components/ui/forms`, `buttons`, `badges`, …).
3. Token semântico (`text-accent`, `bg-surface-container`); sem hex, `bg-blue-500` ou cor Oracle interpolada.
4. Peça reutilizável que ainda não existe: implementar em `components/ui` + documentar em `pages/design-system/`, depois usar no módulo.
5. Listagem = página inteira como Clientes (`/app/commercial/customers`): `CollectionHeader` (Novo à direita) + `CollectionToolbar` (busca + filtros opcionais + `ViewToggle`) + `Table` do DS; **sem** card `bg-card` envolvendo a tela. Ver [`design-system.md`](./docs/developers/design-system.md) §3.
6. Ficha com abas: `Tabs variant="folder"`; visualizar trava **todas** as abas; `fill` só se o painel deve ocupar o `main` (opt-in, como Cliente) e **só ≥ `lg`** — no estreito a faixa é swipe + sticky e o `main` rola. Shell `h-svh`; não clipe o `Outlet`. Ver [`design-system.md`](./docs/developers/design-system.md) §4.1–4.2.

Detalhe e tabela de componentes: [`docs/developers/design-system.md`](./docs/developers/design-system.md).

## Rotas do frontend (paths em inglês)

**Paths de URL** no React Router são em **inglês** (kebab-case). Labels de menu, títulos e copy da UI permanecem em **português** (com acento).

- Settings: canônico em [`docs/developers/admin-settings.md`](./docs/developers/admin-settings.md).
- App autenticado (`/app/*`): canônico em [`docs/developers/app-routes.md`](./docs/developers/app-routes.md).
- ADR: [`docs/adr/0003-rotas-frontend-em-ingles.md`](./docs/adr/0003-rotas-frontend-em-ingles.md).
- Ao criar ou alterar rota: path EN em `App.tsx` / `erpNavigation` / sidebars; se substituir path antigo, incluir `<Navigate replace />` do path legado.
- Não inventar paths em português (`/settings`, `/app`, etc.).

## Onde escrever documentação nova

| Público | Pasta |
|---------|--------|
| Devs / agentes | `docs/developers/` |
| Admins / TI | `docs/admins/` |
| Operadores | `docs/operators/` |

Diagramas: blocos `mermaid` nos Markdowns; o hub `/docs` renderiza. Ver [`docs/README.md`](./docs/README.md#diagramas-mermaid).

Novos termos de domínio → atualizar `CONTEXT.md` (só glossário, sem detalhes de implementação).
Decisões difíceis de reverter → ADR em `docs/adr/`.

## Não confundir

- **Documentação do Sistema** (`docs/` / hub `/docs`) ≠ **Design System** (`/design-system` + `frontend/src/components/ui/`) — a UI usa o Design System; manuais de produto ficam em `docs/`
- Texto canônico longo de arquitetura/regras permanece na **raiz**; em `docs/developers/` há apenas links + resumos curtos
