# Usuários e acessos

## Quem pode administrar

Usuários no grupo **`access_admins`** (flag `can_manage_access`) ou **superusuário**. A UI `/settings` e a API `/api/admin/` usam o mesmo critério.

## Divisão com o Django admin

O settings não substitui o Django admin para o modelo `auth.User`.
Use `/settings` para operação do produto e concessão de permissões de produto; use `/admin/auth/user/<id>/change/` para permissões nativas/técnicas do Django, campos técnicos e ajustes excepcionais.

## O que fazer na prática

1. Entre em **Configurações** (`/settings`) — se não aparecer ou redirecionar, falta o grupo.
2. **Usuários** (`/settings/users`): listar, criar, editar dados, definir senha, ajustar grupos com busca e ajustar permissões diretas de produto com busca por área, recurso ou permissão.
3. **Perfis de Acesso** (`/settings/access-profiles`): usar as abas **Grupos** e **Perfis** para selecionar um grupo/perfil e adicionar/remover usuários dele.

No modal de edição de usuário, a aba **Dados** concentra e-mail, status e senha temporária. A aba **Grupos** mostra grupos do produto com busca. A aba **Perfil de acesso** mostra apenas permissões diretas das áreas do produto, como permissões de Compras/Fornecedor; permissões técnicas do Django não aparecem nessa tela.
Na tela **Acessos**, o fluxo é o inverso: primeiro escolha a aba **Grupos** ou **Perfis**, pesquise o grupo/perfil desejado e depois mova usuários para dentro ou fora dele.

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

## Go-live e o Smarnet 3.0

Quando o cadastro em `/settings` entrar em produção, as telas PHP de Pessoa, Empresa e Usuário no 3.0 devem ser **desligadas** (menu/fluxo). Não operar as duas UIs depois disso. O Django `/admin/` permanece só para ajuste técnico de `auth.User`.

Os demais módulos seguem a mesma regra: o legado sai quando o novo entra. Detalhe: [ADR 0006](../adr/0006-desativacao-legado-por-modulo.md).

## Telas de settings

- **Empresas** (`/settings/masters/companies`): listagem live em `GERAL.EMPRESA`. Formulário composto ainda **sem** gravação Oracle.
- Sistema, integrações, notificações, logs e atividade: placeholders — não persistir expectativas de produção nelas.

Detalhes técnicos: [developers/auth](../developers/auth.md), [developers/admin-settings](../developers/admin-settings.md).
