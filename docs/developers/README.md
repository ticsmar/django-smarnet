# Desenvolvedores

Documentação técnica para quem implementa ou estende o Smarnet.
Agentes de IA devem começar por [`AGENTS.md`](../../AGENTS.md) e o glossário em [`CONTEXT.md`](../../CONTEXT.md).

## Fontes canônicas na raiz (texto completo)

Resumos abaixo; o conteúdo completo fica nos arquivos da raiz para evitar duplicação.

| Documento | Resumo | Link |
|-----------|--------|------|
| `README.md` | Visão geral do monólito modular, setup backend/frontend, OpenAPI | [../../README.md](../../README.md) |
| `ARCHITECTURE.md` | Estilo modular monolith, camadas hexagonais, regras de dependência | [../../ARCHITECTURE.md](../../ARCHITECTURE.md) |
| `AI_DEVELOPMENT_RULES.md` | Padrões de código gerado (Python/DRF/testes) | [../../AI_DEVELOPMENT_RULES.md](../../AI_DEVELOPMENT_RULES.md) |
| `OPENSPEC.md` | Checklist de geração de features (entidades, use cases, testes) | [../../OPENSPEC.md](../../OPENSPEC.md) |
| `backend/README.md` | Layout e qualidade do backend | [../../backend/README.md](../../backend/README.md) |

## Design System

Catálogo de UI no app para superusuário em ambiente de desenvolvimento: `/design-system`. Não substitui esta pasta.

## Por área

- [Stack e infraestrutura](./stack-e-infraestrutura.md) — plataformas, libs, versões, Docker/Oracle
- [Padrão de cadastro e listagem](./padrao-cadastro-listagem.md) — **obrigatório** para novos CRUDs (telas, API, acessos)
- [Novas telas (legado vs nativo)](./novas-telas.md) — tela migrada do 3.0 vs aplicação nativa; persistência, origem e desativação do legado no go-live
- [Autenticação e usuários](./auth.md)
- [Compras](./compras.md)
- [Administração — Clientes](./administracao-clientes.md)
- [Produção e devices](./producao-devices.md)
- [Admin e settings](./admin-settings.md) — rotas `/settings/*` (paths EN) + API admin
- [Rotas do app (`/app/*`)](./app-routes.md) — paths EN canônicos + redirects legados
- [ADR 0003 — rotas frontend em inglês](../adr/0003-rotas-frontend-em-ingles.md)
- [ADR 0004 — CLIENT_IDENTIFIER Oracle](../adr/0004-oracle-client-identifier.md)
- [ADR 0005 — escrita Oracle: reuso, DML Python ou package próprio](../adr/0005-escrita-oracle-reuso-ou-python.md)
- [ADR 0006 — desativação do legado por módulo no go-live](../adr/0006-desativacao-legado-por-modulo.md)
- [API / OpenAPI](./api.md)
