# Compras

Bounded context Django em `backend/apps/purchasing` (app label de permissões: `purchasing_infrastructure`). Pasta/API em inglês; o domínio continua **Fornecedor**. Tabelas Oracle **não gerenciadas** pelo ORM de migração Django.

## Domínio

- **Fornecedor** (`NOVASMAR.FORNECEDOR`): PK `for_codigo`; razão social, nome reduzido, endereço, `pai_codigo`, datas, `for_ativo` (`1`/`0`).
- **FornecContato**: contatos ligados ao fornecedor (`fco_nome`, `fco_cargo`, `fco_email`, `fco_telefone`).
- Lookups: **Pais**, **MsgErro**.

Modelos: `backend/apps/purchasing/infrastructure/models.py`.

## Permissões

| Codename | Uso |
|----------|-----|
| `purchasing_infrastructure.view_fornecedor` | Listar/detalhar fornecedor; listar países (na API atual) |
| `purchasing_infrastructure.view_dashboard` | Dashboard de Compras (`/app/purchasing/dashboard`) |
| `purchasing_infrastructure.add_fornecedor` | Criar |
| `purchasing_infrastructure.change_fornecedor` | Atualizar; **ativar/inativar** |
| `purchasing_infrastructure.delete_fornecedor` | Affordance de “Excluir” na UI (ver soft delete) |
| `purchasing_infrastructure.*_forneccontato` | CRUD de contatos |
| `purchasing_infrastructure.view_msgerro` | Mensagens de erro |
| `purchasing_infrastructure.view_pais` | Definida; listagem de países na prática exige `view_fornecedor` |

Espelho no frontend: `frontend/src/modules/purchasing/permissions.ts` (`PURCHASING_PERMS`).

## API (`/api/purchasing/`)

| Rota | Métodos |
|------|---------|
| `/fornecedores/` | `GET` (query: `search`, `ativo`, `page`, `page_size`), `POST` |
| `/fornecedores/<cod>/` | `GET`, `PUT` |
| `/fornecedores/<cod>/ativar/` | `POST` |
| `/fornecedores/<cod>/inativar/` | `POST` |
| `/fornecedor-contatos/` | `GET`, `POST` |
| `/fornecedor-contatos/<cod>/` | `GET`, `DELETE` (hard delete do contato) |
| `/paises/`, `/paises/<id>/` | `GET` |
| `/msg-erros/` | `GET` |

## Soft delete (inativar)

Não há delete físico de fornecedor na API. Inativação/ativação chama procedures Oracle (`SP_INATIVA_FORNECEDOR` / `SP_ATIVA_FORNECEDOR`) e exige **`change_fornecedor`**.

Na UI, “Excluir” aparece se `(delete_fornecedor || change_fornecedor)` e o registro está ativo (`for_ativo === 1`), e chama `inativaFornecedor`.

## Frontend

- Rotas: `/app/purchasing`, `/app/purchasing/suppliers`, `/app/purchasing/suppliers/:codFornec` (guard `view_fornecedor`).
- Listagem: `FornecedoresPage` — mesma casca de Clientes (cabeçalho solto, **sem** card de página); modos **tabela / lista / cards** (`useViewMode`, chave `smarnet:view:compras-fornecedores`).
- Ações de linha: menu ⋮ em tabela/lista; **botões no rodapé** em cards (`FornecedorRowActions`).
- Detalhe: editar, ativar/inativar, contatos — `FornecedorDetailPage`.

Navegação: `frontend/src/config/erpNavigation.ts` (grupo `compras`).

**Padrão reutilizável** (telas/API/acessos sem amarrar ao domínio): [padrao-cadastro-listagem.md](./padrao-cadastro-listagem.md).

Guia do operador: [operators/compras-fornecedores](../operators/compras-fornecedores.md).
