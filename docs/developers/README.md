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

Catálogo in-app `/design-system` (superusuário em dev) + código em `frontend/src/components/ui/`.

**Agentes: ler [design-system.md](./design-system.md) antes de qualquer UI.** Reusar `FormSection`, `FormGrid`, `FormInput`, `FormCombobox` e tokens; não clonar componentes no módulo. Ficha com abas: `folder` + `fill` opt-in só ≥ `lg` (§4.2); no estreito swipe + sticky e scroll no `main`; catálogo `/design-system/components/tabs` e `/design-system/patterns`.

## Por área

- [Stack e infraestrutura](./stack-e-infraestrutura.md) — plataformas, libs, versões, Docker/Oracle
- [Design System](./design-system.md) — **obrigatório** para UI: catálogo `/design-system`, `@/components/ui`, tokens. Ficha: §4.1–4.2 (`folder` + `fill` opt-in só ≥ `lg`; no estreito swipe + sticky); demo `/design-system/components/tabs` e `/design-system/patterns`
- [Diagramas Mermaid](../README.md#diagramas-mermaid) — fluxogramas nos Markdowns; render no hub `/docs`
- [Padrão de cadastro e listagem](./padrao-cadastro-listagem.md) — **obrigatório** para novos CRUDs (telas, API, acessos). Casca visual da listagem = Clientes (`/app/commercial/customers`), sem card de página.
- [Novas telas (legado vs nativo)](./novas-telas.md) — tela migrada do 3.01 vs aplicação nativa; persistência, origem e desativação do legado no go-live
- [Refatoração 3.01 → Smarnet Novo](./refatoracao-smarnet-novo.md) — playbook: `USER`/`CLIENT_IDENTIFIER`, `PCK_DQANET` (chapa certa), padrões de backend e frontend
- [Autenticação e usuários](./auth.md)
- [Compras](./compras.md) (`apps.purchasing`)
- [Comercial — Clientes](./administracao-clientes.md) (`apps.commercial`; Administração é outro módulo)
- [ACE de atividade vs ACE na linha](./acesso-atividade.md) — extra Django vs `ACESSO_FUNC` ([ADR 0007](../adr/0007-ace-codigo-django-vs-acesso-func.md))
- [Gerenciador de Arquivos](./arquivos.md) — componente compartilhado (`sistema` + `filtro`); Settings + aba Cliente
- [Follow-up](./followup.md) — componente compartilhado (`sistema` + `filtro`); Settings + modal no Cliente
- [Produção e devices](./producao-devices.md)
- [Admin e settings](./admin-settings.md) — rotas `/settings/*` (paths EN) + API admin
- [Rotas do app (`/app/*`)](./app-routes.md) — paths EN canônicos + redirects legados
- [ADR 0003 — rotas frontend em inglês](../adr/0003-rotas-frontend-em-ingles.md)
- [ADR 0004 — CLIENT_IDENTIFIER Oracle](../adr/0004-oracle-client-identifier.md)
- [ADR 0005 — escrita Oracle: reuso, DML Python ou package próprio](../adr/0005-escrita-oracle-reuso-ou-python.md)
- [ADR 0006 — desativação do legado por módulo no go-live](../adr/0006-desativacao-legado-por-modulo.md)
- [ADR 0007 — ACE no código = Django; ACE na coluna = ACESSO_FUNC](../adr/0007-ace-codigo-django-vs-acesso-func.md)
- [API / OpenAPI](./api.md)
