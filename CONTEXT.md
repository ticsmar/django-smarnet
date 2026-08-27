# Smarnet ERP

Monólito modular de ERP (Django + React): **Smarnet Novo**, para **aplicações nativas** e, aos poucos, **telas migradas** do **Smarnet 3.01** (PHP em produção, mesmo Oracle). No go-live de cada módulo, a tela PHP equivalente é desativada. Pastas Django/API em inglês (`commercial`, `purchasing`, `administration`, `production`, `portal`, `files`, `users`); termos de domínio em português (Cliente, Fornecedor).

## Language

**Smarnet 3.01**:
ERP em produção, escrito em PHP, no mesmo Oracle. Nome canônico do legado. Este repositório ainda não o substitui por completo; cada módulo implantado aqui desativa a tela equivalente no 3.01 (ver **Desativação do legado**).
_Avoid_: “Smarnet 3.0”; chamar este repo de 3.01; tratar coexistência das duas UIs como permanente após o go-live do módulo

**Smarnet Novo**:
Este repositório (Django + React). Nome canônico **até** haver número de versão de produção. Candidatos em discussão, ainda **sem decisão**: **4** (sequência) ou **27** (ano pretendido de go-live).
_Avoid_: Smarnet 4, v4, 4.0, Smarnet 27 até a decisão; chamar de 3.01 ou de “3.0”

**Desativação do legado**:
Corte da tela/fluxo PHP do 3.01 quando o equivalente no Smarnet Novo entra em produção. Primeira leva: cadastro de Pessoa, Empresa e Usuário em `/settings`. A mesma regra vale para os demais módulos, um a um. Desliga a UI PHP, não o package/tabela Oracle enquanto outro escritor 3.01 existir.
_Avoid_: big-bang de todo o 3.01; manter as duas UIs após o go-live; alterar objeto Oracle no mesmo dia só porque a tela PHP saiu; confundir `/settings` com Django `/admin/`

**Aplicação nativa**:
Módulo nascido no Smarnet Novo, sem tela ou package equivalente no 3.01. Segue o padrão de cadastro/listagem e o hexágono; não exige `PCK_*`.
_Avoid_: forçar wrapping de package inexistente; inventar `PCK_*` cosmético

**Tela migrada**:
Reimplementação no Smarnet Novo de um fluxo do 3.01 sobre o mesmo objeto Oracle (tabela/package). Writes via procedure do package (`callproc`); models unmanaged.
_Avoid_: reescrever o package em Python; ALTER de objeto que o PHP 3.01 usa

**Package (PCK)**:
Package Oracle (`PCK_*`). Contém procedures (`SP_*`) e functions (`SF_*`). Exemplo canônico: `docs/_scripts/packages/PCK_CLIENTE.pck`. Arquivos em `docs/_scripts/` são cópia de leitura, não fonte de deploy.
_Avoid_: tratar PCK como procedure; tratar PCK como tipo de objeto distinto de package

**Fornecedor**:
Empresa ou pessoa fornecedora cadastrada no módulo de Compras.
_Avoid_: Supplier (em textos PT), vendor, cliente

**Inativar fornecedor**:
Desativação lógica (`for_ativo = 0`) via procedure Oracle; não é exclusão física do registro.
_Avoid_: delete, apagar, hard delete

**Token de device**:
Credencial emitida para um dispositivo/filial autenticar-se via branch-auth; valor cru só na criação.
_Avoid_: API key genérica, senha de usuário

**Máquina (device)**:
Dispositivo identificado por `device_uuid`, vinculado a um token no primeiro verify bem-sucedido.
_Avoid_: computador genérico, servidor

**Ordem de Produção (OP)**:
Registro operacional de produção usado para acompanhar itens em aberto no módulo Produção (`backend/apps/production/`, UI `/app/production/orders`). A listagem v1 ainda pode ser simulada; perms Django usam `production_infrastructure`.
_Avoid_: pedido de venda, ordem de compra; pasta `producao/`

**Comercial (módulo)**:
Bounded context `backend/apps/commercial/` + `frontend/src/modules/commercial/`. Dono do cadastro de **Cliente**. Rota `/app/commercial/customers`. Não é Administração.
_Avoid_: colocar Cliente em `administration`; pasta `administracao/` ou `comercial/`

**Administração (módulo)**:
Bounded context `backend/apps/administration/` — dashboards e relatórios do menu Administração (`/app/administration/*`). **Não** contém Cliente.
_Avoid_: misturar com Comercial; tratar `/settings` como este módulo

**Compras (módulo)**:
Bounded context `backend/apps/purchasing/` (Fornecedor). Pasta e API em inglês; o termo de domínio continua **Fornecedor**.
_Avoid_: pasta `compras/`

**Portal (módulo)**:
Bounded context `backend/apps/portal/` + `frontend/src/modules/portal/` — notícias, grupos e menus públicos (`/portal`).
_Avoid_: deixar só em `pages/portal` sem app Django

**Settings (shell)**:
Área de UI `/settings/*` (admin de acesso). **Não** é um app Django: não criar `backend/apps/settings/` (colide com `config/settings/`). Telas falam com `users` e `files`.
_Avoid_: `apps.settings`; confundir com Django `/admin/`

**Arquivos (módulo)**:
Bounded context `backend/apps/files/` (gerenciador). Hosts (ex. Cliente) só passam `sistema` + `filtro`.
_Avoid_: pasta `arquivos/`

**Cliente**:
Pessoa ou empresa atendida pela operação comercial/administrativa em `SIAOS.CLIENTE`. Escopo de dono efetivo: fábricas `5/7/15/116` veem/editam só a própria empresa; demais usuários operam o pool compartilhado da empresa `1` (inclui histórico não-fábrica tratado como pool-1). Cadastro v1: listagem + detalhe + Dados Gerais em `/app/commercial/customers` (módulo `commercial`, não `administration`). Status canônico = nota de risco em `INTEGRACAO.CLIENTE_RISCO` (A/B/C/D/E/N…), ligada por `NVL(SIAOS.CLIENTE.BLOQUEADO,0) = CRS_COD_SIAOS` (`NULL` ≡ `0` / nota A; `BLOQUEADO=2` oculto na listagem) — ver `docs/developers/administracao-clientes.md` e `docs/_scripts/tables/integracao.cliente_risco.sql`.
_Avoid_: fornecedor; soft-delete/inativar no v1; tratar `BLOQUEADO` como equivalente de `for_ativo`; juntar `BLOQUEADO` em `CRS_CODIGO` (o join correto é `CRS_COD_SIAOS`); listar `BLOQUEADO=2` (E−) na grid (detalhe/wizard CNPJ podem abrir o código)

**Nota de risco (cliente)**:
Classificação de crédito/restrição do cliente (`INTEGRACAO.CLIENTE_RISCO`): PK `CRS_CODIGO`; `CLIENTE.BLOQUEADO` = `CRS_COD_SIAOS` (código de bloqueio SIAOS); letras A, B, C, D, D-, E, E-, N; `CRS_RESTRICAO` indica se restringe abertura de OS/proposta. Na UI v1 o badge usa cores **semânticas** do Design System (`StatusBadge`: letra + `CRS_RESTRICAO`). `CRS_CORES` existe no catálogo Oracle (legado 3.01) e **não é interpolado** na UI. Completude do cadastro: `SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO` (`1` incompleto / `2` CNPJ inválido → badge `!` na listagem).
_Avoid_: status ativo/inativo de fornecedor; usar só o número `BLOQUEADO` na UI sem a descrição da nota; mapear via `CRS_CODIGO`; interpolar hex de `CRS_CORES` no badge

**Mensagem de bloqueio (cliente)**:
Texto do motivo do status/bloqueio em `SIAOS.CLIENTE.MENSAGEM_BLOQUEIO`, preenchido pelo financeiro (não é o label da nota de risco).
_Avoid_: confundir com `CRS_DESC` do catálogo; apagar/ignorar na UI quando o financeiro registrou motivo


**Empresa dona do cliente (owner emp)**:
Empresa efetiva dona do registro de Cliente usada para filtrar listagem/edição. Fábricas usam o próprio `emp_codigo`; demais usam `1`.
_Avoid_: sempre filtrar só pelo `emp_codigo` do vínculo do usuário sem mapear fábricas vs pool

**CLIENT_IDENTIFIER (Oracle)**:
Identidade do usuário de negócio na sessão Oracle (`smar`) quando a conexão usa conta técnica: o middleware define `CLIENT_IDENTIFIER` (login web) por requisição e limpa ao final. No 3.01, `SIAOS.PCK_DQANET.SF_PES_NUMERO_USER` / `SF_USU_CHAPA_USER` leem esse identifier (ou `USER` no PHP).
_Avoid_: logar no Oracle com a senha genérica de cada usuário final; deixar identificador vazado entre requisições; resolver ator com `WHERE USU_LOGINWEB = USER` na conta `API_SMAR`

**USU_CHAPA**:
PK de `SIAOS.USUARIO` (usuário do sistema / login web). Em PL/SQL de sessão, resolver com `SIAOS.PCK_DQANET.SF_USU_CHAPA_USER` — não com `USER` nem com `FUN_CHAPA`.
_Avoid_: gravar `PES_NUMERO` ou `FUN_CHAPA` em coluna `USU_CHAPA`; `WHERE USU_LOGINWEB = USER` com `API_SMAR`

**PES_NUMERO**:
Identificador da pessoa ligada ao usuário. Em PL/SQL de sessão, `SIAOS.PCK_DQANET.SF_PES_NUMERO_USER`.
_Avoid_: usar no lugar de `USU_CHAPA` em log de cadastro

**FUN_CHAPA**:
PK de `SIAOS.FUNCIONARIO` (RH). Em PL/SQL de sessão, `SIAOS.PCK_DQANET.SF_FUN_CHAPA_USER`. Acesso legado PHP (`SF_VALIDA_ACESSO`) usa esta chapa; a UI nova usa permissão Django.
_Avoid_: usar `FUN_CHAPA` em `LOG_CLIENTE.USU_CHAPA`

**ACE (atividade)**:
Número de tela em `SMARNET.ACESSO` que o 3.01 checa com `SF_VALIDA_ACESSO`. No Novo vira extra perm Django com nome amigável (ex. `change_clienterisco`). O número (ex. 370) fica só no guia de migração.
_Avoid_: constante `370` no backend/frontend; reusar `change_clientelimite` para status

**ACE na linha**:
Coluna `ACE_CODIGO` no registro (arquivo, origem). ACL via `SMARNET.ACESSO_FUNC` + chapa. Não é extra Django. Fora do status de cliente neste incremento.
_Avoid_: gate HTTP de tela com `ACESSO_FUNC` quando o ACE era hardcoded no PHP

**Gestor de filial**:
Papel (grupo Django `branch_managers`) autorizado a gerir tokens de device.
_Avoid_: admin genérico, superusuário (papéis distintos)

**Admin de acesso**:
Papel (grupo Django `access_admins`) autorizado a gerir usuários e grupos em `/settings` e `/api/admin/`.
_Avoid_: gestor de filial, superusuário (podem coexistir, mas não são sinônimos)

**Superusuário**:
Usuário Django com `is_superuser`, com acesso a ferramentas de desenvolvimento como o Design System.
_Avoid_: gestor de filial, admin de acesso

**Design System**:
Catálogo in-app de componentes e padrões de UI em `/design-system`; código em `frontend/src/components/ui/`. Ver `docs/developers/design-system.md`.
_Avoid_: Documentação do Sistema (produto/domínio/operação em `docs/`); inventar UI no módulo

**Documentação do Sistema**:
Conjunto de Markdown em `docs/` por público (developers, admins, operators), mais `CONTEXT.md` e `AGENTS.md`.
_Avoid_: Design System, Swagger sozinho

**Usuário**:
Registro operacional em `SIAOS.USUARIO` (chapa `usu_chapa`, empresa, login web). No produto, o cadastro vive em `/settings/users` junto da conta Django.
_Avoid_: sinônimo de Usuário Django; cadastro permanente no PHP 3.01 após o go-live deste fluxo

**Usuário Django**:
Conta `auth.User` deste ambiente (sessão, senha com hash, grupos/perms). Não existe no 3.01; o vínculo operacional é `usu_chapa` → Usuário. Operação do produto em `/settings`; CRUD técnico em `/admin/`.
_Avoid_: cadastrar operação do produto só no Django admin; tratar como substituto de `SIAOS.USUARIO`

**Perfil de segurança (USER_SECURITY_PROFILE)**:
Vínculo do Usuário Django ao legado via `usu_chapa` (obrigatório para todo usuário operacional); `pes_numero` e `emp_codigo` vêm de `SIAOS.USUARIO` a partir dessa chapa.
_Avoid_: usuário sem `usu_chapa`; duplicar PES/EMP no profile Django

**Escopo por empresa**:
Visibilidade de dados mestres/operacionais com `emp_codigo`: o usuário só enxerga (e opera) o que bate com o `emp_codigo` dele em `SIAOS.USUARIO`. Registro com `emp_codigo` nulo é tratado como empresa `1`.
_Avoid_: ver dados de outra empresa; tratar `emp_codigo` só como filtro cosmético de tela; usuário sem empresa resolvida

**Solicitação de acesso (pré-pessoa)**:
Registro pendente em `GERAL.PRE_PESSOA` (tipos Cliente `C` ou Fornecedor `F`) criado em `/request-access`, aguardando triagem em `/settings/access-requests`.
_Avoid_: auto-cadastro Django, register público

**Padrão de cadastro e listagem**:
Contrato de UX/API/perms para entidades mestre: ViewToggle (tabela/lista/cards), ações ⋮ à esquerda ou botões no rodapé do card, soft inativar, breadcrumb global, camadas hexagonais.
_Avoid_: listagem só-tabela, hard delete genérico sem alinhar ao domínio, breadcrumb embutido na página

**Gerenciador de Arquivos**:
Componente único (`sistema` + `filtro` + `disabled`) que lê/grava `SIAOS.PROP_ARQUIVO` (e log em `PROP_ARQ_LOG`). Hosts só passam esses parâmetros; não implementam arquivos.
_Avoid_: um explorer por tela; misturar `PAR_CODIGO` (PK da linha) com a PK do host; repositório paralelo no Django

**PAR_SISTEMA (`op_file`)**:
Código do sistema em que o gerenciador atua (`PROP_ARQUIVO.PAR_SISTEMA`). Cadastro nativo em `/settings/file-manager`. Seed 1–12 do 3.01; **7 = Cliente**.
_Avoid_: hardcode solto no host; inventar código que colida com 1–12; alterar `codigo` depois de criado

**PAR_FILTRO**:
Chave primária do registro host gravada como varchar (`PROP_ARQUIVO.PAR_FILTRO`, máx. 100). No Cliente: `SIAOS.CLIENTE.CODIGO` (`cli_codigo`). Toda query/insert/update/delete/log usa **os dois** (`PAR_SISTEMA` + `PAR_FILTRO`).
_Avoid_: filtrar só por sistema; usar `PAR_CODIGO` como filtro do host

**desabilita (`disabled`)**:
Flag do host (3.01 `desabilita` = `0` ou `1`). `1` / `true` bloqueia incluir, alterar e excluir no gerenciador; listar, baixar e histórico continuam. Não é coluna Oracle.
_Avoid_: reimplementar a trava no host; esconder download/histórico quando só as escritas devem travar
