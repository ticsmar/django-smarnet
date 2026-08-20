# Rotas do app autenticado (`/app/*`)

Paths de URL sob `/app` são em **inglês** (kebab-case). Labels de menu e copy da UI permanecem em **português**. Decisão: [ADR 0003](../adr/0003-rotas-frontend-em-ingles.md).

Código: `frontend/src/App.tsx`, navegação em `frontend/src/config/erpNavigation.ts`.

## Paths canônicos

| Path | Label UI | Notas |
|------|----------|--------|
| `/app` | Dashboard / hub | Índice autenticado |
| `/app/profile` | Perfil | |
| `/app/administration` | Administração | Índice do módulo |
| `/app/administration/customers` | Clientes | Listagem + Dados Gerais |
| `/app/administration/customers/:codCliente` | Detalhe cliente | |
| `/app/purchasing` | Compras | Índice do módulo |
| `/app/purchasing/suppliers` | Fornecedores | |
| `/app/purchasing/suppliers/:codFornec` | Detalhe fornecedor | |
| `/app/production` | Produção | Índice do módulo |
| `/app/production/orders` | Ordem de Produção | Simulado; autenticado, sem perm Django |
| `/app/access` | Acessos | Índice (admin de acesso / gerente de filial) |
| `/app/devices` | Devices | Tokens de filial (`branch_managers`) |

## Redirects legados (PT → EN)

| Legado | Canônico |
|-------|----------|
| `/app/administracao` | `/app/administration` |
| `/app/administracao/clientes` | `/app/administration/customers` |
| `/app/administracao/clientes/:id` | `/app/administration/customers/:id` |
| `/app/compras` | `/app/purchasing` |
| `/app/compras/fornecedores` | `/app/purchasing/suppliers` |
| `/app/compras/fornecedores/:id` | `/app/purchasing/suppliers/:id` |
| `/app/producao` | `/app/production` |
| `/app/ops` | `/app/production/orders` |
| `/app/configurar` | `/app/access` |

## Regras para rotas novas ou existentes

1. Path sempre em inglês kebab-case (`/app/<module>/<resource>`).
2. Não criar path em português.
3. Ao renomear path, manter `<Navigate replace />` do legado.
4. Labels i18n (`nav.*`) podem continuar em chaves históricas (ex. `nav.compras`); só a **URL** muda.
5. Settings (`/settings/*`) tem tabela própria em [admin-settings.md](./admin-settings.md).
