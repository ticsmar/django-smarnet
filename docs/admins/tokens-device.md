# Tokens de device / filial

## Quem gerencia

Grupo **`branch_managers`** (ou superusuário). Sem esse papel, o item **Devices** não aparece / a API responde `403`.

## Ciclo de vida

1. Gestor cria token em `/app/devices` (label opcional).
2. **Copia o token imediatamente** — ele só é mostrado uma vez.
3. O device chama verificação com o token + `device_uuid` (`POST /api/branch-auth/verify-token/`).
4. No primeiro sucesso, a **máquina** fica vinculada àquele UUID.
5. Gestores podem **revogar** tokens ativos (confirmação na UI); token e máquina associada deixam de autenticar.

## Segurança

- Em repouso o backend guarda **hash**, não o segredo.
- Na listagem só aparece o **prefixo**.
- Tentativas inválidas são registradas (`TokenAccessAttempt`).
- Endpoint de verify é público mas com throttle.

## Checklist operacional

- [ ] Usuário no grupo `branch_managers`
- [ ] Entregar o token ao responsável do device por canal seguro
- [ ] Confirmar bind (UUID aparece na lista)
- [ ] Revogar tokens de devices desativados/perdidos

Técnico: [developers/producao-devices](../developers/producao-devices.md).
