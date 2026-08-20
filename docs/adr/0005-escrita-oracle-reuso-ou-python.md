# ADR 0005 — Escrita Oracle: reuso de package, DML Python ou package próprio

## Status

Accepted

## Context

O Smarnet 3.0 (PHP 5.2) segue em produção sobre o mesmo Oracle. Ao migrar telas, a gravação precisa de um critério: reusar a procedure do 3.0, replicar o DML em Python, ou criar objeto Oracle próprio do Django.

Reusar o package do 3.0 é o padrão quando ele serve. Parte dos objetos, porém, tem contrato incompatível com um caso de uso que também escreve no banco `default` do Django:

- `GERAL.PCK_USUARIO.SP_IN_PRE_PESSOA` (linha 210) e `SP_IN_EMPRESA` (linha 483) dão `COMMIT` interno.
- `GERAL.PCK_USUARIO.SP_IN_USUARIO` (linhas 741-756) tem `EXCEPTION WHEN OTHERS` que dispara e-mail, zera o `OUT` (`n_usu_chapa := NULL`) e faz `ROLLBACK` da sessão. O chamador recebe `NULL` sem motivo. O destinatário do e-mail de erro é resolvido por `WHERE UPPER(USU_LOGINWEB) = USER`, que com a conta técnica `API_SMAR` não casa com ninguém — o erro desaparece.
- `SP_IN_USUARIO` (linhas 644-651) grava `SMARNET.SENHA` em texto puro e envia a senha no corpo do e-mail.

Criar um `PCK` em schema próprio do Django (`SMARNETPY`) foi considerado e recusado **neste ciclo**: como o PHP continuaria chamando `SP_IN_USUARIO`, o package novo já seria uma segunda implementação. Empata em duplicação com o DML em Python e perde em custo de deploy (DDL, grants, DBA) e em testabilidade.

Senha: Smarnet novo e 3.0 têm credenciais independentes — essa separação é uma das motivações da migração. O Django autentica `auth.User` com hash; `oracle_auth_repository_impl.py` apenas delega para `django_authenticate`.

## Decision

Três vias de escrita, nesta ordem de preferência:

1. **Tela migrada, contrato serve** — `callproc` na procedure do 3.0, no repositório. Vale inclusive com `COMMIT` interno, desde que a tela seja **um** save e a procedure propague erro.
2. **Tela migrada, contrato não serve** — DML em Python no repositório, alias `smar`, dentro de `transaction.atomic()`. Aplicável quando a procedure engole erro em `WHEN OTHERS`, faz `ROLLBACK` da sessão, grava senha em texto puro, dispara e-mail, ou quando o caso de uso precisa compor com o banco `default`. Proibido criar `PCK_*` cosmético só para "ter package".
3. **Aplicação nativa** — ORM managed no alias `default` (`DJANGO_API`), sem package.

Na via 2 o repositório não grava `SMARNET.SENHA` e não envia e-mail pelo Oracle.

Quando um caso de uso escreve nos dois bancos, `atomic(using="smar")` é o bloco **externo**, para commitar por último.

`SMARNETPY` (schema + package próprio) fica como promoção futura, não como proibição. Promover a via 2 a package quando: aparecer **segundo escritor Oracle** no mesmo write (job, Forms, outro sistema), ou o DBA recusar DML direto da conta técnica na tabela.

## Consequences

- A via 2 duplica invariante que o 3.0 também aplica. Mitigação: DDL e package legados copiados em `docs/_scripts/` como referência de leitura, e a regra do 3.0 citada no repositório que a replica.
- Regras de alocação de chave que no 3.0 são `SELECT MAX(...) + 1` precisam de `select_for_update()` no lado Python, senão a corrida do legado é herdada.
- Escrita nos dois bancos não é atômica. A ordem de commit define qual órfão é possível; o resíduo aceitável é aquele que mantém a operação repetível.
- Casos de uso na via 2 precisam de guarda de idempotência, porque a repetição é o mecanismo de recuperação.

Ver também: [ADR 0004](./0004-oracle-client-identifier.md), [novas-telas.md](../developers/novas-telas.md).
