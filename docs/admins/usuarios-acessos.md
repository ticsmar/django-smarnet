# Usuários e acessos

## Quem pode administrar

Usuários no grupo **`access_admins`** (flag `can_manage_access`) ou **superusuário**. A UI `/settings` e a API `/api/admin/` usam o mesmo critério.

## O que fazer na prática

1. Entre em **Configurações** (`/settings`) — se não aparecer ou redirecionar, falta o grupo.
2. **Usuários** (`/settings/usuarios`): listar, criar, editar, definir senha.
3. **Acessos** (`/settings/acessos`): atribuir grupos ao usuário.

### Grupos relevantes

| Grupo | Efeito |
|-------|--------|
| `access_admins` | Administra usuários/acessos |
| `branch_managers` | Gerencia tokens em Produção → Devices |
| (permissões Django de `compras_infrastructure.*`) | Libera telas/APIs de Compras |

Permissões de app (ex. `view_fornecedor`) vêm do modelo de permissões Django ligado aos grupos/usuário — não apenas do nome do grupo ERP.

## Criação de usuário

- Self-register público está **desligado** por padrão (`ALLOW_PUBLIC_REGISTER=False`).
- Crie via admin API/UI. Pode marcar troca de senha obrigatória no primeiro acesso (`must_change_password`).

## Telas ainda mock

Empresas, sistema, integrações, notificações e logs em `/settings` são placeholders — não persistir expectativas de produção nelas.

Detalhes técnicos: [developers/auth](../developers/auth.md), [developers/admin-settings](../developers/admin-settings.md).
