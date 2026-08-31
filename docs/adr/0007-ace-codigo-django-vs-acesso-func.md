# ADR 0007 — ACE no código vira perm Django; ACE na coluna usa ACESSO_FUNC

O Smarnet 3.01 guarda telas e recursos em `SMARNET.ACESSO` (`ACE_CODIGO`) e a chapa em `SMARNET.ACESSO_FUNC`. No Smarnet Novo isso **não** vira um número na aplicação. Há dois casos, e só o primeiro entra neste incremento.

## Status

Accepted

## Context

No 3.01, `cad_bloqueio.php` chama `SF_VALIDA_ACESSO(370)` (ou equivalente) para quem pode alterar o status/bloqueio do cliente. Copiar `370` para o Django/React repetiria o catálogo legado e misturaria ACL de tela com ACL de linha.

O Novo já autentica com sessão + `auth.Permission`. Limite de crédito já usa o extra `change_clientelimite`. Status/bloqueio precisa de um extra **próprio**: quem altera nota A–E não é o mesmo conjunto de quem altera limite.

`ACESSO_FUNC` continua no Oracle (grant de `SELECT` para a conta da API). Serve quando **a linha** traz `ACE_CODIGO` (arquivo, origem, etc.). Não é o gate HTTP deste fluxo.

## Decision

Dois tipos, sem misturar:

| Tipo | Onde o ACE aparece | ACL no Novo |
|------|--------------------|-------------|
| **A — atividade / tela** | Número hardcoded no PHP (`SF_VALIDA_ACESSO(370)`) | Extra perm Django com **codename amigável**. O número 3.01 fica só no guia de migração. |
| **B — linha** | Coluna `ACE_CODIGO` no registro | `SMARNET.ACESSO_FUNC` + chapa (`FUN_CHAPA` no legado). **Fora deste incremento.** |

Status do cliente (letra A–E / `BLOQUEADO` = `CRS_COD_SIAOS`):

- Permissão: `commercial_infrastructure.change_clienterisco`
- Chip visível com `view_cliente`
- `PUT .../bloqueio/` e o botão **Gravar** exigem `change_clienterisco` (superuser passa)
- Persistência via 2 ([ADR 0005](./0005-escrita-oracle-reuso-ou-python.md)): `UPDATE SIAOS.CLIENTE` com `BLOQUEADO = CRS_COD_SIAOS` e `MENSAGEM_BLOQUEIO`. Não gravar `CRS_CODIGO` em `BLOQUEADO`. `PCK_CLIENTE` não persiste esses campos.
- `change_clientelimite` permanece só para limite especial e catálogo de modelos de pagamento sem filtro de risco
- PHP 3.01 continua no ACE 370 até o corte do módulo ([ADR 0006](./0006-desativacao-legado-por-modulo.md))

TI marca o extra em `/settings` ou no Admin Django. Login já envia `permissions[]`.

## Considered Options

- **Usar `370` na aplicação** — rejeitado: número opaco, acopla o Novo ao catálogo `ACESSO`.
- **Reusar `change_clientelimite` para o status** — rejeitado: limite e status são atividades distintas; o 3.01 só coincidia no mesmo ACE por acaso da tela.
- **Gate HTTP com `SF_TEM_ACESSO` / `ACESSO_FUNC` neste fluxo** — rejeitado para tipo A; reserva-se ao tipo B (coluna na linha).
- **Codename Django `change_clienterisco`** — escolhido.

## Consequences

- Não colocar `370` (nem outro `ACE_CODIGO` de tela) em constante de backend/frontend.
- Mapa legado → Novo vive em [`acesso-atividade.md`](../developers/acesso-atividade.md) e no guia do módulo.
- Tipo B (filtro por `ACE_CODIGO` da linha) não entra neste PR.
- Quem tinha só `change_clientelimite` **não** grava status até ganhar `change_clienterisco`.
