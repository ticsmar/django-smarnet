# ACE de atividade vs ACE na linha

Como o Smarnet Novo trata `SMARNET.ACESSO` / `ACESSO_FUNC` ao migrar telas do 3.01. Decisão: [ADR 0007](../adr/0007-ace-codigo-django-vs-acesso-func.md).

## Tipo A — ACE no código (tela / atividade)

No PHP o script chama `SF_VALIDA_ACESSO(<número>)` (ou equivalente) com um `ACE_CODIGO` **fixo**. Esse número **não entra na aplicação**.

No Novo:

1. Extra perm Django no model unmanaged (`<contexto>_infrastructure.<codename>`), nome amigável (`change_clienterisco`, não `ace_370`).
2. Constante em `presentation/permissions.py` e no módulo frontend (`app_label.codename`).
3. View: sessão + `HasDjangoPermission`. Superuser passa.
4. UI: `hasPermission` / `useXxxAccess`. Chip/consulta pode usar `view_*`; **Gravar** usa o extra.
5. TI atribui em `/settings` ou Admin. O 3.01 continua no número até o go-live ([ADR 0006](../adr/0006-desativacao-legado-por-modulo.md)).

O número ACE só aparece no guia (“no 3.01 era ACE 370”).

## Tipo B — ACE na coluna (depois)

Quando **a linha** tem `ACE_CODIGO` (arquivo, origem, etc.), o filtro é `SMARNET.ACESSO_FUNC` + chapa. Não é extra Django. **Não implementado neste incremento.**

Não usar `SF_TEM_ACESSO` como gate HTTP de tipo A.

## Mapa já migrado (Clientes)

| 3.01 | Novo | Uso |
|------|------|-----|
| ACE 370 (`cad_bloqueio.php`) | `commercial_infrastructure.change_clienterisco` | Alterar status/bloqueio (`BLOQUEADO` = `CRS_COD_SIAOS`, `MENSAGEM_BLOQUEIO`) |
| (mesmo ACE 370 no PHP misturava limite) | `commercial_infrastructure.change_clientelimite` | Limite especial; modelos de pagamento sem filtro de risco |

`view_cliente` / `change_cliente` cobrem o cadastro. Status **não** reutiliza `change_clientelimite`.
