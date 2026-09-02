# Comercial — Clientes

Bounded context Django em `backend/apps/commercial` (app label de permissões: `commercial_infrastructure`). **Não** fica em `administration` — aquele módulo só tem dashboard/relatórios. Tabelas Oracle **não gerenciadas** pelo ORM de migração Django.

Fontes legado para consulta (nesta ordem):

1. Este arquivo + glossário em [`CONTEXT.md`](../../CONTEXT.md)
2. Scripts: [`siaos.cliente.sql`](../_scripts/tables/siaos.cliente.sql), [`siaos.embarque.sql`](../_scripts/tables/siaos.embarque.sql), [`siaos.cobranca.sql`](../_scripts/tables/siaos.cobranca.sql), [`siaos.arclass.sql`](../_scripts/tables/siaos.arclass.sql), [`siaos.arlevel.sql`](../_scripts/tables/siaos.arlevel.sql), [`siaos.arsalesp.sql`](../_scripts/tables/siaos.arsalesp.sql), [`integracao.cliente_risco.sql`](../_scripts/tables/integracao.cliente_risco.sql), [`PCK_CLIENTE.pck`](../_scripts/packages/PCK_CLIENTE.pck), [`PCK_DQANET.pck`](../_scripts/packages/PCK_DQANET.pck) (`SF_PES_NUMERO_USER` / `SF_USU_CHAPA_USER`), [`TG_B_IU_EMBARQUE.trg`](../_scripts/triggers/TG_B_IU_EMBARQUE.trg), [`TG_B_IU_COBRANCA.trg`](../_scripts/triggers/TG_B_IU_COBRANCA.trg), [`TG_B_IU_CLIENTE.trg`](../_scripts/triggers/TG_B_IU_CLIENTE.trg)
3. Grants: [`docs/admins/grants-oracle-clientes.md`](../admins/grants-oracle-clientes.md)
4. Identidade Oracle: [ADR 0004](../adr/0004-oracle-client-identifier.md), playbook [refatoracao-smarnet-novo.md](./refatoracao-smarnet-novo.md)

## Domínio

- **Cliente** (`SIAOS.CLIENTE`): PK `CODIGO`; nome (`CLIENTE`), reduzido, documento (`CGC`), endereço, `EMP_CODIGO` (empresa dona / pool), `TIPO` (`J`/`F`/`I`), `BLOQUEADO` (código SIAOS do status), etc.
- **Segmento** (`SIAOS.CLIENTE.CLASSE`): catálogo `SIAOS.ARCLASS` (`CLASS_KEY` CHAR(5); só `CLASS_ATIVO = 1` no combo). Grava via `SP_ATUALIZA_DADOS_GERAIS` (`c_segmento`).
- **Vendedor Área** (`SIAOS.CLIENTE.TERRITORIO`): catálogo `SIAOS.ARLEVEL` (`TERR_KEY` CHAR(2); só `ARL_ATIVO = 1` no combo). Grava via `SP_ATUALIZA_DADOS_GERAIS` (`c_area`).
- **Vendedor** (`SIAOS.CLIENTE.VENDEDOR`): catálogo `SIAOS.ARSALESP` (`SALESP_KEY` CHAR(5); só `ASP_STATUS = 1` no combo). Nome = `USUARIO.USU_NOME` se houver, senão `SALESPERSON`. Combo agrupado por `GERAL.EMPRESA.EMP_NOME` (fallback `NOVA SMAR S/A`). Grava via `SP_ATUALIZA_DADOS_GERAIS` (`c_vendedor`).
- **Status / risco** (`INTEGRACAO.CLIENTE_RISCO`): catálogo canônico das notas (A, B, C, D, N…). `SIAOS.CLIENTE.BLOQUEADO` = `CRS_COD_SIAOS` (código de bloqueio SIAOS; `CRS_CODIGO` é só a PK do catálogo).
- Escopo de dono: fábricas `5/7/15/116` veem/editam a própria empresa; demais operam o **pool empresa 1** (ver `empresa_ownership` no domínio).
- Cadastro: listagem + detalhe com **7 abas** tipo pasta (`Tabs variant="folder"`) — Dados Cadastrais, Dados Financeiros, Contatos, Cobrança, Embarque, Observação, Gerenciador de Arquivos (`FileManager` sistema=7). Follow-up no **header** (`FollowUpTrigger` sistema=117), não é aba. Persistência via `SIAOS.PCK_CLIENTE` (`SP_ATUALIZA_*`); arquivos em `SIAOS.PROP_ARQUIVO`; recados em `SIAOS.PROP_RECADO`. Sem soft-delete/inativar. Layout das abas segue a sequência e as subdivisões do Smarnet 3.01.

## Status (nota de risco)

**Fonte canônica:** `INTEGRACAO.CLIENTE_RISCO` — não usar `for_ativo` de fornecedor.

Join típico: `NVL(SIAOS.CLIENTE.BLOQUEADO, 0) = INTEGRACAO.CLIENTE_RISCO.CRS_COD_SIAOS`
(`NULL` vira `0`, nota A). A letra **nunca fica vazia** na listagem (fallback `A`).

Clientes com `BLOQUEADO = 2` (nota E−, cadastro duplicado/inválido) **não entram**
na listagem nem no lookup por documento. O **detalhe por código** e o wizard de
CNPJ **abrem** esse cadastro (para não criar outro duplicado).

`CRS_CODIGO` é a PK do catálogo (não é a FK usada em `CLIENTE.BLOQUEADO`).

| `CRS_COD_SIAOS` (= `BLOQUEADO`) | `CRS_CODIGO` | Letra | Protheus | Restrição | Descrição |
|-------------------------------:|-------------:|:-----:|:--------:|----------:|-----------|
| 0 | 1 | A | A | 0 | Sem restrições |
| 6 | 2 | B | B | 0 | Sem crédito (pagamento à vista) |
| 1 | 3 | C | C | 0 | Pendência financeira (pagamento antecipado) |
| 3 | 4 | D | D | 1 | Pendência financeira (bloqueia OS; suspende OS em andamento) |
| 4 | 5 | D- | D | 2 | Pendência financeira (bloqueia OS e proposta; suspende OS em andamento) |
| 5 | 6 | E | E | 2 | Bloqueio judicial (proposta bloqueada) |
| 2 | 7 | E- | E | 2 | Cadastro duplicado/inválido |
| 7 | 8 | N | B | 0 | Cliente novo — avaliar crédito (restringe formas de pagamento) |

`CRS_RESTRICAO`: `0` sem restrição de abertura; `1` restringe OS; `2` restringe proposta.

### Cores (`CRS_CORES`)

Paleta visual de cada nota no legado PHP (CSV em `CRS_CORES`: `icone, texto_icone, linha1, linha_hover`). O campo existe no DTO/Oracle.

Na UI v1 o badge **não interpola** `CRS_CORES`. Usa `StatusBadge` semântico (`letra` + `CRS_RESTRICAO`) — ver `ClienteRiscoStatusBadge`. Não inventar hex paralelo ao Design System.

### Motivo (`SIAOS.CLIENTE.MENSAGEM_BLOQUEIO`)

Texto **livre do financeiro** explicando o motivo do bloqueio/status daquele cliente. Não vem do catálogo `CLIENTE_RISCO`; é preenchido caso a caso na operação financeira. Exibir junto da nota quando preenchido.

Coluna auxiliar relacionada: `FLAGSUSPEN` (suspenso). Preferir `CLIENTE_RISCO` (via `CRS_COD_SIAOS`) para label/cor da nota + `MENSAGEM_BLOQUEIO` para o motivo.

## Permissões

| Codename | Uso |
|----------|-----|
| `commercial_infrastructure.view_cliente` | Listar / detalhar / catálogos / lookup documento / log |
| `commercial_infrastructure.add_cliente` | Criar (Dados Gerais / from-funcionário) |
| `commercial_infrastructure.change_cliente` | Atualizar Dados Gerais, Financeiro (`SP_ATUALIZA_DADOS_FINAN`) e observações (`SP_ATUALIZA_OBS`) |
| `commercial_infrastructure.change_clientelimite` | Limite especial; listar modelos de pagamento sem filtro de risco |
| `commercial_infrastructure.change_clienterisco` | Alterar status/bloqueio (letra A–E). No 3.01 era ACE 370 (`cad_bloqueio.php`); o número **não** entra no código ([ADR 0007](../adr/0007-ace-codigo-django-vs-acesso-func.md), [acesso-atividade.md](./acesso-atividade.md)) |
| `commercial_infrastructure.view_dashboard` | Dashboard de Administração (`/app/administration/dashboard`) |
| `commercial_infrastructure.view_relatorio` | Relatórios de Administração (`/app/administration/reports`) |
| `commercial_infrastructure.view/add/change_clientecontato` | Aba Contatos (`SP_ATUALIZA_CONTATO` / `SP_UPDATE_CONTATO_CLIENTE`) |
| `commercial_infrastructure.view/add/change_clientecobranca` | Aba Cobrança (`SP_ATUALIZA_COBRANCA2` + `CLIENTE.COBRANCA` padrão) |
| `commercial_infrastructure.view/add/change_clienteembarque` | Aba Embarque (`SP_ATUALIZA_EMBARQUE2` + `CLIENTE.ENTREGA` padrão) |

Espelho no frontend: `frontend/src/modules/commercial/permissions.ts` e `frontend/src/config/productPermissions.ts`.

Consulta CNPJ (ReceitaWS): `RECEITAWS_TOKEN` no `.env` do backend (Bearer do 3.01 `getCNPJ.php`). Sem token, a API pública da ReceitaWS aceita poucas consultas por minuto. ViaCEP não exige chave.

## API (`/api/commercial/`)

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
| `/catalogos/origens/` | `GET` — `SIAOS.ORIGEM` (`ORI_STATUS = 1`) |
| `/catalogos/arclasses/` | `GET` — `SIAOS.ARCLASS` (Segmento; `CLASS_ATIVO = 1`) |
| `/catalogos/arlevels/` | `GET` — `SIAOS.ARLEVEL` (Vendedor Área; `ARL_ATIVO = 1`) |
| `/catalogos/arsalesps/` | `GET` — `SIAOS.ARSALESP` (Vendedor; `ASP_STATUS = 1`; nome via `USUARIO`, grupo `GERAL.EMPRESA.EMP_NOME`) |
| `/catalogos/cidades/` | `GET` (`pai_codigo`, `est_codigo`) — `PROTPROD.CC2010` |
| `/catalogos/grupos-tributarios/` | `GET` (`est_codigo`, `cli_tipo`) — `PROTPROD.SF7010` (default 25→`077`, 27→`070`) |
| `/catalogos/areas-os/` | `GET` (`tipo` C\|E, `mun_ibge`, `est_codigo`, `pai_codigo`, `current`) — `SIAOS.AREA_OS` |
| `/catalogos/modelos-pagto/` | `GET` (`origem`, `mpg_codigo`, `risco_protheus`) — sem filtro de risco se `change_clientelimite` |
| `/catalogos/riscos-cliente/` | `GET` — `INTEGRACAO.CLIENTE_RISCO` (`codigo` = `CRS_COD_SIAOS` = `BLOQUEADO`, letra, descrição, restrição) |
| `/clientes/<codigo>/bloqueio/` | `PUT` (`bloqueado` = `CRS_COD_SIAOS`, `mensagem_bloqueio`) — exige `change_clienterisco`; DML via 2 (`BLOQUEADO`, `MENSAGEM_BLOQUEIO`) |
| `/clientes/<codigo>/financeiro/` | `PUT` — `SP_ATUALIZA_DADOS_FINAN` + overlay Python das colunas que o package de gerais grava. Ocultar a aba se `GERAL.EMPRESA.EMP_TIPO = C` (`show_financeiro=false`) |
| `/clientes/<codigo>/contatos/` | `GET`, `POST` |
| `/clientes/<codigo>/contatos/padrao/` | `PUT` |
| `/clientes/<codigo>/cobrancas/` | `GET`, `POST` — ref. `cli_codigo_ref` + ativo (não endereço livre) |
| `/clientes/<codigo>/cobrancas/padrao/` | `PUT` (`chave`) |
| `/clientes/<codigo>/embarques/` | `GET`, `POST` |
| `/clientes/<codigo>/embarques/padrao/` | `PUT` (`chave`) |
| `/clientes/<codigo>/logs/` | `GET` — `SIAOS.LOG_CLIENTE` + `USUARIO` |
| `/clientes/<codigo>/observa/` | `PUT` — `SP_ATUALIZA_OBS` |
| `/clientes/<codigo>/dashboard/credito/` | `GET` (`scope=cliente\|grupo`) — resumo 3.01 (`estCli`): saldos, títulos pendentes, OSs/antecipações, séries de faturamento/proposta, limites e risco |
| `/clientes/<codigo>/dashboard/limites/` | `PUT` (`limitecr`, `cli_limite_crv`) — exige `change_clienterisco`; DML via 2 nas duas colunas (não porta `ajax.php?op=5` genérico) |
| `/clientes/<codigo>/dashboard/historico/os/` | `GET` (`scope`, `page`, `page_size`) — histórico de OS (`OEHDR`) |
| `/clientes/<codigo>/dashboard/historico/titulos/` | `GET` (`scope`, `page`, `page_size`) — títulos Protheus (`SE1010`; vazio se grant ausente) |

Permissão v1: `view_cliente`. Grants: [`grants-oracle-cliente-dashboard.md`](../admins/grants-oracle-cliente-dashboard.md).

`PUT` de Dados Gerais também persiste `CLI_TIPO`, `AOS_CODIGO_COM/TEC`, `CLASSE` (`c_segmento` / `SIAOS.ARCLASS.CLASS_KEY`), `TERRITORIO` (`c_area` / `SIAOS.ARLEVEL.TERR_KEY`), `VENDEDOR` (`c_vendedor` / `SIAOS.ARSALESP.SALESP_KEY`) e `CLI_GRUPO_TRIB` (UPDATE fora do package — o 3.01 faz o mesmo). `CLIENTE.ESTADO` grava **`EST_SIGLA`**, não o nome. Aba **Gerenciador de Arquivos**: `<FileManager sistema={SISTEMA_CLIENTE} filtro={String(codigo)} disabled={!editing} />` — repositório `SIAOS.PROP_ARQUIVO` (`PAR_SISTEMA=7`, `PAR_FILTRO=cli_codigo`, `desabilita` via `disabled`). Ver [arquivos.md](./arquivos.md). Header **Follow-up**: `<FollowUpTrigger sistema={SISTEMA_CLIENTE_FOLLOWUP} filtro={String(codigo)} disabled={!editing} />` — `PRE_SISTEMA=117`, recados em `PROP_RECADO` (follow-up genérico). O follow-up específico do Cliente (`FOLLOW_CLIENTE`) está descontinuado e **não** aparece nesta tela. Ver [followup.md](./followup.md). Não portar o `OBSERVA = 'OBSERVA'` do PHP pós-package.

## Frontend

- Paths: `/app/commercial/customers`, `/app/commercial/customers/:codCliente` (view), `/app/commercial/customers/:codCliente/edit` (Dados Cadastrais em página; o modal fica só no **Novo**). Menu: Comercial → Cadastros. Abas no detalhe: Dados Cadastrais, Dados Financeiros (se `show_financeiro`), Contatos, Cobrança, Embarque, Observação, Gerenciador de Arquivos (`FileManager` sistema=7). Follow-up: botão no header (`FollowUpTrigger` sistema=117).
- **Visualizar vs editar:** em `/:codCliente` (sem `/edit`) **todas** as abas abrem com campos `readOnly`/`disabled` (não só Dados Cadastrais). `FileManager` recebe `disabled`. Contatos/cobrança/embarque não mostram adicionar/alterar. Em `/:codCliente/edit` os campos seguem a perm de cada aba.
- **Layout da ficha:** cabeçalho `bg-card`. `Tabs variant="folder" fill` — aba ativa e `TabsContent` = `bg-card`; faixa das abas transparente (fundo do `main`); inativas `bg-muted-foreground/30`. Página `flex flex-col gap-5 lg:min-h-0 lg:flex-1`. **≥ `lg`:** o painel preenche o restante do `main`; scroll no `TabsContent` se preciso. **&lt; `lg`:** faixa numa linha (swipe) e sticky; a ficha cresce; rola o `main`. Ver [design-system.md](./design-system.md) §4.1–4.2.
- **Listagem (UX):** casca canônica do ERP — `CollectionHeader` (**Novo** à direita, se `add_cliente`) + `CollectionToolbar` (busca + `ViewToggle`; **sem filtro** nesta tela) + `Table`/`lista`/`cards`, **sem** card `bg-card` na página. Menu ⋮: Visualizar, Editar, **Follow-up** e **Dashboard** (modal quase tela cheia: Crédito no molde 3.01 — Resumo / Títulos pendentes / OSs e antecipações / Cadastros — + Histórico OS/Títulos; escopo Cliente ou Grupo `CLI_GRUPO`). Demais listagens devem copiar esta tela. Ver [padrao-cadastro-listagem.md](./padrao-cadastro-listagem.md) §5 e [design-system.md](./design-system.md) §3.
- Módulo: `frontend/src/modules/commercial/` (layout padrão = Fornecedores)
- Rotas: [`app-routes.md`](./app-routes.md)
- Listagem v1: `StatusBadge` com `CRS_COD_LETRA` à frente do nome (`title` = `CRS_DESC_LONGA`), join `BLOQUEADO = CRS_COD_SIAOS`.
- Detalhe: no header, à direita (ao lado de Editar), chip de status (`StatusBadge`): **só** `CRS_DESC` (descrição curta) no botão; `title` = `CRS_DESC_LONGA`. Clique abre o dialog de status (`cad_bloqueio.php`). **Gravar** exige `change_clienterisco`. Cores semânticas via letra/`CRS_RESTRICAO` — não interpolar `CRS_CORES`. Persistência: `BLOQUEADO = CRS_COD_SIAOS` (não `CRS_CODIGO`). Ao lado, **Follow-up** abre o modal genérico de recados (`PRE_SISTEMA=117`).
- Dashboard → Cadastros: limites e **Editar restrições** usam `change_clienterisco` (ACE 370 no 3.01). Sem perm, campos/botões **desabilitados**.
- Aba Observação / log: `SIAOS.LOG_CLIENTE.LCL_TEXTO` traz HTML do 3.01 (`<BR>`). Na UI o HTML é **renderizado** (sanitizado, tags de formatação), não mostrado como texto. `USU_CHAPA` do log vem de `PCK_DQANET.SF_USU_CHAPA_USER` (não chapa `7` com `API_SMAR`). Ver [refatoracao-smarnet-novo.md](./refatoracao-smarnet-novo.md).
- Completude: `SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO(CODIGO)` — `0` ok; `1` badge `!` “Cadastro Incompleto!!”; `2` badge `!` “CNPJ Inválido !”.
- Novo PJ: busca **primeiro** em `SIAOS.CLIENTE` (CNPJ sem máscara, alfanumérico, `LPAD`/`TRANSLATE` como o PHP; sem `SF_VALIDA_CONS_CLIENTE`). Se achar, devolve o código e a UI abre o detalhe. Se não achar, consulta ReceitaWS + ViaCEP e inicia o cadastro com os dados copiados quando `status=OK`.
- Novo Funcionário: `cadastro_novo.php?acao=func` — busca CPF em `SIAOS.CLIENTE`; se já existir, mostra o código e abre o detalhe. Se não, lê `PROTPROD.SRA010` (`D_E_L_E_T_ = ' '`) e libera **Copiar p/ Novo** (`SP_FUNC2CLIENTE`).
- Paginação Oracle 12c+: `OFFSET :n ROWS FETCH NEXT :m ROWS ONLY` (page_size 20). A listagem (`COUNT(*)` e as linhas) e o **get por código** **não** chamam `SF_VALIDA_CONS_CLIENTE`. Essa function entra só no lookup por documento.
