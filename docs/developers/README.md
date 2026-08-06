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

Catálogo de UI no app (superuser): `/design-system`. Não substitui esta pasta.

## Por área

- [Stack e infraestrutura](./stack-e-infraestrutura.md) — plataformas, libs, versões, Docker/Oracle
- [Padrão de cadastro e listagem](./padrao-cadastro-listagem.md) — **obrigatório** para novos CRUDs (telas, API, acessos)
- [Autenticação e usuários](./auth.md)
- [Compras](./compras.md)
- [Produção e devices](./producao-devices.md)
- [Admin e settings](./admin-settings.md)
- [API / OpenAPI](./api.md)
