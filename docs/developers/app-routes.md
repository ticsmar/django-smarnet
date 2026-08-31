# Rotas do app autenticado (`/app/*`)

Paths de URL sob `/app` são em **inglês** (kebab-case). Labels de menu e copy da UI permanecem em **português**. Decisão: [ADR 0003](../adr/0003-rotas-frontend-em-ingles.md).

Código: `frontend/src/App.tsx`, navegação em `frontend/src/config/erpNavigation.ts`.

## Paths canônicos

| Path | Label UI | Notas |
|------|----------|--------|
| `/app` | Dashboard / hub | Índice autenticado |
| `/app/profile` | Perfil | |
| `/app/commercial` | Comercial | Índice do módulo |
| `/app/commercial/customers` | Clientes | Listagem (menu Comercial → Cadastros) |
| `/app/commercial/customers/:codCliente` | Detalhe cliente | Visualizar + abas |
| `/app/commercial/customers/:codCliente/edit` | Editar cliente | Formulário Dados Cadastrais em página |
| `/app/administration` | Administração | Índice do módulo |
| `/app/administration/dashboard` | Dashboard | Placeholder; perm `view_dashboard` |
| `/app/administration/reports` | Relatórios | Placeholder; perm `view_relatorio` |
| `/app/purchasing` | Compras | Índice do módulo |
| `/app/purchasing/dashboard` | Dashboard | Placeholder; perm `purchasing_infrastructure.view_dashboard` |
| `/app/purchasing/suppliers` | Fornecedores | |
| `/app/purchasing/suppliers/:codFornec` | Detalhe fornecedor | |
| `/app/production` | Produção | Índice do módulo |
| `/app/production/dashboard` | Dashboard | Placeholder; autenticado |
| `/app/production/orders` | Ordem de Produção | Simulado; autenticado, sem perm Django |
| `/app/access` | Acessos | Índice (admin de acesso / gerente de filial) |
| `/app/devices` | Devices | Tokens de filial (`branch_managers`) |

## Redirects legados (PT → EN)

| Legado | Canônico |
|-------|----------|
| `/app/administracao` | `/app/administration` |
| `/app/administracao/clientes` | `/app/commercial/customers` |
| `/app/administracao/clientes/:id` | `/app/commercial/customers/:id` |
| `/app/administracao/clientes/:id/edit` | `/app/commercial/customers/:id/edit` |
| `/app/administration/customers` | `/app/commercial/customers` |
| `/app/comercial` | `/app/commercial` |
| `/app/comercial/clientes` | `/app/commercial/customers` |
| `/app/comercial/cliente` | `/app/commercial/customers` |
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
