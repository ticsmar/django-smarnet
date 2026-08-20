# Smarnet ERP

Monólito modular de ERP (Django + React): ambiente novo para **aplicações nativas** e, aos poucos, **telas migradas** do Smarnet 3.0 (PHP em produção, mesmo Oracle). No go-live de cada módulo, a tela PHP equivalente é desativada. Contextos atuais: usuários, autenticação de filial, compras, administração (clientes).

## Language

**Smarnet 3.0**:
ERP em produção, escrito em PHP, no mesmo Oracle. Este repositório ainda não o substitui por completo; cada módulo implantado aqui desativa a tela equivalente no 3.0 (ver **Desativação do legado**).
_Avoid_: chamar este repo de “3.0”; tratar coexistência das duas UIs como permanente após o go-live do módulo

**Desativação do legado**:
Corte da tela/fluxo PHP do 3.0 quando o equivalente neste Django entra em produção. Primeira leva: cadastro de Pessoa, Empresa e Usuário em `/settings`. A mesma regra vale para os demais módulos, um a um. Desliga a UI PHP, não o package/tabela Oracle enquanto outro escritor 3.0 existir.
_Avoid_: big-bang de todo o 3.0; manter as duas UIs após o go-live; alterar objeto Oracle no mesmo dia só porque a tela PHP saiu; confundir `/settings` com Django `/admin/`

**Aplicação nativa**:
Módulo nascido neste Django, sem tela ou package equivalente no 3.0. Segue o padrão de cadastro/listagem e o hexágono; não exige `PCK_*`.
_Avoid_: forçar wrapping de package inexistente; inventar `PCK_*` cosmético

**Tela migrada**:
Reimplementação neste Django de um fluxo do 3.0 sobre o mesmo objeto Oracle (tabela/package). Writes via procedure do package (`callproc`); models unmanaged.
_Avoid_: reescrever o package em Python; ALTER de objeto que o PHP 3.0 usa

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
Registro operacional de produção usado para acompanhar itens em aberto no módulo Produção. A rota `/app/production/orders` ainda é simulada (aplicação nativa sem persistência; sem perm Django `producao_infrastructure`).
_Avoid_: pedido de venda, ordem de compra; inventar app `producao_infrastructure` só para a tela mock

**Cliente**:
Pessoa ou empresa atendida pela operação comercial/administrativa em `SIAOS.CLIENTE`. Escopo de dono efetivo: fábricas `5/7/15/116` veem/editam só a própria empresa; demais usuários operam o pool compartilhado da empresa `1` (inclui histórico não-fábrica tratado como pool-1). Cadastro v1: listagem + detalhe + Dados Gerais em `/app/administration/customers`. Status canônico = nota de risco em `INTEGRACAO.CLIENTE_RISCO` (A/B/C/D/E/N…), ligada por `NVL(NULLIF(SIAOS.CLIENTE.BLOQUEADO,0),1) = CRS_CODIGO` (`NULL`/`0` ≡ `1` / nota A; `BLOQUEADO=7` oculto na listagem) — ver `docs/developers/administracao-clientes.md` e `docs/_scripts/tables/integracao.cliente_risco.sql`.
_Avoid_: fornecedor; soft-delete/inativar no v1; tratar `BLOQUEADO` como equivalente de `for_ativo`; juntar `BLOQUEADO` em `CRS_COD_SIAOS` (o join correto é `CRS_CODIGO`); listar `BLOQUEADO=7` (E−) na grid (detalhe/wizard CNPJ podem abrir o código)

**Nota de risco (cliente)**:
Classificação de crédito/restrição do cliente (`INTEGRACAO.CLIENTE_RISCO`): PK `CRS_CODIGO` (= `CLIENTE.BLOQUEADO`); letras A, B, C, D, D-, E, E-, N; `CRS_RESTRICAO` indica se restringe abertura de OS/proposta. Na UI v1 o badge usa cores **semânticas** do Design System (`StatusBadge`: letra + `CRS_RESTRICAO`). `CRS_CORES` existe no catálogo Oracle (legado 3.0) e **não é interpolado** na UI. Completude do cadastro: `SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO` (`1` incompleto / `2` CNPJ inválido → badge `!` na listagem).
_Avoid_: status ativo/inativo de fornecedor; usar só o número `BLOQUEADO` na UI sem a descrição da nota; mapear via `CRS_COD_SIAOS`; interpolar hex de `CRS_CORES` no badge

**Mensagem de bloqueio (cliente)**:
Texto do motivo do status/bloqueio em `SIAOS.CLIENTE.MENSAGEM_BLOQUEIO`, preenchido pelo financeiro (não é o label da nota de risco).
_Avoid_: confundir com `CRS_DESC` do catálogo; apagar/ignorar na UI quando o financeiro registrou motivo


**Empresa dona do cliente (owner emp)**:
Empresa efetiva dona do registro de Cliente usada para filtrar listagem/edição. Fábricas usam o próprio `emp_codigo`; demais usam `1`.
_Avoid_: sempre filtrar só pelo `emp_codigo` do vínculo do usuário sem mapear fábricas vs pool

**CLIENT_IDENTIFIER (Oracle)**:
Identidade do usuário de negócio na sessão Oracle (`smar`) quando a conexão usa conta técnica: o middleware define `CLIENT_IDENTIFIER` (login web) por requisição e limpa ao final.
_Avoid_: logar no Oracle com a senha genérica de cada usuário final; deixar identificador vazado entre requisições

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
Documentação in-app de componentes e padrões de UI em `/design-system`.
_Avoid_: Documentação do Sistema (produto/domínio/operação em `docs/`)

**Documentação do Sistema**:
Conjunto de Markdown em `docs/` por público (developers, admins, operators), mais `CONTEXT.md` e `AGENTS.md`.
_Avoid_: Design System, Swagger sozinho

**Usuário**:
Registro operacional em `SIAOS.USUARIO` (chapa `usu_chapa`, empresa, login web). No produto, o cadastro vive em `/settings/users` junto da conta Django.
_Avoid_: sinônimo de Usuário Django; cadastro permanente no PHP 3.0 após o go-live deste fluxo

**Usuário Django**:
Conta `auth.User` deste ambiente (sessão, senha com hash, grupos/perms). Não existe no 3.0; o vínculo operacional é `usu_chapa` → Usuário. Operação do produto em `/settings`; CRUD técnico em `/admin/`.
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
