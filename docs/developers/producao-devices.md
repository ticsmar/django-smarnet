# Produção e devices

O menu **Produção** (`/app/production`) é um grupo de navegação ERP. **Ordem de Produção** (`/app/production/orders`) é tela **simulada** (aplicação nativa ainda sem persistência): visível a usuários autenticados, **sem** permissão Django `producao_infrastructure` (app inexistente). O item funcional de devices fica em **Devices** (`/app/devices`), sob o grupo **Acessos** (`/app/access`). Tokens vivem em `backend/apps/branch_auth`.

## Modelo

- **AccessToken**: armazena **hash** (nunca o token cru após criação); `token_prefix`, `status` (`active` \| `revoked`), `label`, dono (FK usuário).
- **Machine**: vínculo 1:1 no primeiro `verify` bem-sucedido (`device_uuid`).
- **TokenAccessAttempt**: auditoria de tentativas de verificação.

## Autorização

Grupo Django `branch_managers` → flag `is_branch_manager`. Superusuário também acessa. A rota frontend `DeviceManagerRoute` sonda `GET /api/branch-auth/tokens/`; `403` esconde/bloqueia a área.

## API (`/api/branch-auth/`)

| Rota | Auth | Comportamento |
|------|------|----------------|
| `GET\|POST /tokens/` | `IsBranchManager` | Lista/cria; escopo do dono |
| `POST /tokens/<id>/revoke/` | gestor | Revoga token (e máquina associada) |
| `POST /verify-token/` | público | Body `{ token, device_uuid }`; throttle ~60/min |

Verificação: token inválido/revogado, UUID incompatível ou máquina revogada → `401` + log de tentativa. Sucesso atualiza `last_access_*` e pode criar o bind da máquina.

**Importante:** o token em texto claro só é devolvido **na criação**. Depois disso só o prefixo aparece na listagem.

## Frontend

`frontend/src/modules/device/` — `DeviceTokensPage`:

- Tabela: label, prefixo, status, criação, máquina (UUID truncado ou “sem vínculo”), revogar se ativo.
- Dialog de criação: label opcional → exibe token cru uma vez + copiar.
- Confirmação antes de revogar.

Operadores/admins: [operators/producao-devices](../operators/producao-devices.md), [admins/tokens-device](../admins/tokens-device.md).
