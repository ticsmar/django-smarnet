# Administração — Clientes

Bounded context Django em `backend/apps/administracao` (app label de permissões: `administracao_infrastructure`). Tabelas Oracle **não gerenciadas** pelo ORM de migração Django.

Fontes legado para consulta (nesta ordem):

1. Este arquivo + glossário em [`CONTEXT.md`](../../CONTEXT.md)
2. Scripts: [`siaos.cliente.sql`](../_scripts/tables/siaos.cliente.sql), [`integracao.cliente_risco.sql`](../_scripts/tables/integracao.cliente_risco.sql), [`PCK_CLIENTE.pck`](../_scripts/packages/PCK_CLIENTE.pck)
3. Grants: [`docs/admins/grants-oracle-clientes.md`](../admins/grants-oracle-clientes.md)
4. Identidade Oracle: [ADR 0004](../adr/0004-oracle-client-identifier.md)

## Domínio

- **Cliente** (`SIAOS.CLIENTE`): PK `CODIGO`; nome (`CLIENTE`), reduzido, documento (`CGC`), endereço, `EMP_CODIGO` (empresa dona / pool), `TIPO` (`J`/`F`/`I`), `BLOQUEADO` (código SIAOS do status), etc.
- **Status / risco** (`INTEGRACAO.CLIENTE_RISCO`): catálogo canônico das notas (A, B, C, D, N…). `SIAOS.CLIENTE.BLOQUEADO` = `CRS_CODIGO` (PK do catálogo).
- Escopo de dono: fábricas `5/7/15/116` veem/editam a própria empresa; demais operam o **pool empresa 1** (ver `empresa_ownership` no domínio).
- Cadastro v1: listagem + detalhe + **Dados Gerais** (procedure `SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS`). Sem soft-delete/inativar no v1.

## Status (nota de risco)

**Fonte canônica:** `INTEGRACAO.CLIENTE_RISCO` — não usar `for_ativo` de fornecedor.

Join típico: `NVL(NULLIF(SIAOS.CLIENTE.BLOQUEADO, 0), 1) = INTEGRACAO.CLIENTE_RISCO.CRS_CODIGO`
(`NULL` e `0` viram `1`, nota A). A letra **nunca fica vazia** na listagem (fallback `A`).

Clientes com `BLOQUEADO = 7` (nota E−, cadastro duplicado/inválido) **não entram**
na listagem nem no lookup por documento. O **detalhe por código** e o wizard de
CNPJ **abrem** esse cadastro (para não criar outro duplicado).

`CRS_COD_SIAOS` é código paralelo legado SIAOS (não é a FK usada em `CLIENTE.BLOQUEADO`).

| `CRS_CODIGO` (= `BLOQUEADO`) | `CRS_COD_SIAOS` | Letra | Protheus | Restrição | Descrição |
|-----------------------------:|----------------:|:-----:|:--------:|----------:|-----------|
| 1 | 0 | A | A | 0 | Sem restrições |
| 2 | 6 | B | B | 0 | Sem crédito (pagamento à vista) |
| 3 | 1 | C | C | 0 | Pendência financeira (pagamento antecipado) |
| 4 | 3 | D | D | 1 | Pendência financeira (bloqueia OS; suspende OS em andamento) |
| 5 | 4 | D- | D | 2 | Pendência financeira (bloqueia OS e proposta; suspende OS em andamento) |
| 6 | 5 | E | E | 2 | Bloqueio judicial (proposta bloqueada) |
| 7 | 2 | E- | E | 2 | Cadastro duplicado/inválido |
| 8 | 7 | N | B | 0 | Cliente novo — avaliar crédito (restringe formas de pagamento) |

`CRS_RESTRICAO`: `0` sem restrição de abertura; `1` restringe OS; `2` restringe proposta.

### Cores (`CRS_CORES`)

Paleta visual de cada nota no legado PHP (CSV em `CRS_CORES`: `icone, texto_icone, linha1, linha_hover`). O campo existe no DTO/Oracle.

Na UI v1 o badge **não interpola** `CRS_CORES`. Usa `StatusBadge` semântico (`letra` + `CRS_RESTRICAO`) — ver `ClienteRiscoStatusBadge`. Não inventar hex paralelo ao Design System.

### Motivo (`SIAOS.CLIENTE.MENSAGEM_BLOQUEIO`)

Texto **livre do financeiro** explicando o motivo do bloqueio/status daquele cliente. Não vem do catálogo `CLIENTE_RISCO`; é preenchido caso a caso na operação financeira. Exibir junto da nota quando preenchido.

Coluna auxiliar relacionada: `FLAGSUSPEN` (suspenso). Preferir `CLIENTE_RISCO` (via `CRS_CODIGO`) para label/cor da nota + `MENSAGEM_BLOQUEIO` para o motivo.

## Permissões

| Codename | Uso |
|----------|-----|
| `administracao_infrastructure.view_cliente` | Listar / detalhar / catálogos / lookup documento |
| `administracao_infrastructure.add_cliente` | Criar (Dados Gerais / from-funcionário) |
| `administracao_infrastructure.change_cliente` | Atualizar Dados Gerais |

Espelho no frontend: `frontend/src/modules/administracao/permissions.ts` e `frontend/src/config/productPermissions.ts`.

Consulta CNPJ (ReceitaWS): `RECEITAWS_TOKEN` no `.env` do backend (Bearer do 3.0 `getCNPJ.php`). Sem token, a API pública da ReceitaWS aceita poucas consultas por minuto. ViaCEP não exige chave.

## API (`/api/administracao/`)

| Rota | Métodos |
|------|---------|
| `/clientes/` | `GET` (`search`, `page`, `page_size`), `POST` |
| `/clientes/<codigo>/` | `GET`, `PUT` |
| `/clientes/documento/` | `GET` (`documento`) |
| `/clientes/cnpj/` | `POST` (`cnpj`) — wizard PJ: duplicidade Oracle + ReceitaWS. Aceita máscara `. / -` e CNPJ alfanumérico (14 caracteres). |
| `/clientes/funcionario/` | `POST` (`cpf`) — wizard Funcionário (`verificaFunc.php`): duplicidade em `SIAOS.CLIENTE` + RH em `PROTPROD.SRA010`. |
| `/clientes/from-funcionario/` | `POST` (`cpf`) — `INTEGRACAO.SP_FUNC2CLIENTE` (Copiar p/ Novo). |
| `/catalogos/paises/` | `GET` |
| `/catalogos/estados/` | `GET` (`pai_codigo`) |
| `/catalogos/origens/` | `GET` |

## Frontend

- Paths: `/app/administration/customers`, `/app/administration/customers/:codCliente`
- Módulo: `frontend/src/modules/administracao/` (layout padrão = Fornecedores)
- Rotas: [`app-routes.md`](./app-routes.md)
- Listagem v1: `StatusBadge` com `CRS_COD_LETRA` à frente do nome (`title` = `CRS_DESC_LONGA`), join `BLOQUEADO = CRS_CODIGO`.
- Completude: `SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO(CODIGO)` — `0` ok; `1` badge `!` “Cadastro Incompleto!!”; `2` badge `!` “CNPJ Inválido !”.
- Novo PJ: busca **primeiro** em `SIAOS.CLIENTE` (CNPJ sem máscara, alfanumérico, `LPAD`/`TRANSLATE` como o PHP; sem `SF_VALIDA_CONS_CLIENTE`). Se achar, devolve o código e a UI abre o detalhe. Se não achar, consulta ReceitaWS + ViaCEP e inicia o cadastro com os dados copiados quando `status=OK`.
- Novo Funcionário: `cadastro_novo.php?acao=func` — busca CPF em `SIAOS.CLIENTE`; se já existir, mostra o código e abre o detalhe. Se não, lê `PROTPROD.SRA010` (`D_E_L_E_T_ = ' '`) e libera **Copiar p/ Novo** (`SP_FUNC2CLIENTE`).
- Paginação Oracle 12c+: `OFFSET :n ROWS FETCH NEXT :m ROWS ONLY` (page_size 20). A listagem (`COUNT(*)` e as linhas) e o **get por código** **não** chamam `SF_VALIDA_CONS_CLIENTE`. Essa function entra só no lookup por documento.
