# Guia para agentes de IA

Leia nesta ordem antes de alterar o código:

1. [`CONTEXT.md`](./CONTEXT.md) — glossário de domínio (termos canônicos)
2. [`docs/README.md`](./docs/README.md) — mapa da documentação do sistema
3. [`docs/developers/README.md`](./docs/developers/README.md) — índice técnico + links às fontes na raiz
4. [`docs/developers/stack-e-infraestrutura.md`](./docs/developers/stack-e-infraestrutura.md) — plataformas, libs e versões
5. **[`docs/developers/padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md) — padrão obrigatório de telas, APIs e acessos para cadastros/listagens** (ler antes de criar qualquer CRUD/listagem nova)
6. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — camadas e regras de dependência
7. [`AI_DEVELOPMENT_RULES.md`](./AI_DEVELOPMENT_RULES.md) — padrões de código
8. [`OPENSPEC.md`](./OPENSPEC.md) — checklist ao gerar features
9. ADRs em [`docs/adr/`](./docs/adr/) — decisões registradas

## Cadastros e listagens

Se a tarefa for **nova entidade de cadastro**, **listagem**, **detalhe**, **perms** ou **API de mestre**:

1. Seguir integralmente [`padrao-cadastro-listagem.md`](./docs/developers/padrao-cadastro-listagem.md).
2. Usar a implementação de referência em `frontend/src/modules/compras/` e `backend/apps/compras/` como molde (renomear; não reinventar UX).
3. Cumprir o checklist da §9 desse documento antes de considerar a feature pronta.
4. Em conflito entre “jeito genérico de mercado” e o padrão Smarnet, **vence o padrão Smarnet** (ou abra um ADR).

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
