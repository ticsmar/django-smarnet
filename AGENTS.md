# Guia para agentes de IA

Leia nesta ordem antes de alterar o código:

1. [`CONTEXT.md`](./CONTEXT.md) — glossário de domínio (termos canônicos)
2. [`docs/README.md`](./docs/README.md) — mapa da documentação do sistema
3. [`docs/developers/README.md`](./docs/developers/README.md) — índice técnico + links às fontes na raiz
4. [`docs/developers/stack-e-infraestrutura.md`](./docs/developers/stack-e-infraestrutura.md) — plataformas, libs e versões
5. **[`docs/developers/padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md) — padrão obrigatório de telas, APIs e acessos para cadastros/listagens** (ler antes de criar qualquer CRUD/listagem nova)
6. [`docs/developers/novas-telas.md`](./docs/developers/novas-telas.md) — modo **tela migrada** (3.0 / package) vs **aplicação nativa** (persistência e origem); no go-live, desativar a tela PHP equivalente ([ADR 0006](./docs/adr/0006-desativacao-legado-por-modulo.md))
7. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — camadas e regras de dependência
8. [`AI_DEVELOPMENT_RULES.md`](./AI_DEVELOPMENT_RULES.md) — padrões de código
9. [`OPENSPEC.md`](./OPENSPEC.md) — checklist ao gerar features
10. ADRs em [`docs/adr/`](./docs/adr/) — decisões registradas

## Cadastros e listagens

Se a tarefa for **nova entidade de cadastro**, **listagem**, **detalhe**, **perms** ou **API de mestre**:

1. Seguir integralmente [`padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md).
2. Decidir modo em [`novas-telas.md`](./docs/developers/novas-telas.md): tela migrada (package Oracle do 3.0) ou aplicação nativa (sem `PCK_*` cosmético).
3. Usar a implementação de referência em `frontend/src/modules/compras/` e `backend/apps/compras/` como molde (renomear; não reinventar UX).
4. Cumprir o checklist da §9 do padrão de cadastro antes de considerar a feature pronta.
5. Em conflito entre “jeito genérico de mercado” e o padrão Smarnet, **vence o padrão Smarnet** (ou abra um ADR). Em tela migrada, o objeto Oracle do 3.0 também vence (não reescrever o package).

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

Novos termos de domínio → atualizar `CONTEXT.md` (só glossário, sem detalhes de implementação).
Decisões difíceis de reverter → ADR em `docs/adr/`.

## Não confundir

- **Documentação do Sistema** (`docs/`) ≠ **Design System** (`/design-system` no frontend)
- Texto canônico longo de arquitetura/regras permanece na **raiz**; em `docs/developers/` há apenas links + resumos curtos
