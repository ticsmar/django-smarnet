# Início e perfil

## Entrar no sistema

1. Abra o app e faça login no modal.
2. Se a senha for **obrigatória** na primeira vez, você vai para `/change-password` antes do hub.
3. Após autenticar, o hub fica em `/app`.

## Hub (`/app`)

Mostra atalhos conforme o seu perfil. Módulos ERP aparecem conforme permissões/papéis, configurações aparecem para admin de acesso e atalhos internos de desenvolvimento (`/docs` e `/design-system`) aparecem apenas para superusuário em ambiente de desenvolvimento.

## Perfil (`/app/profile`)

Mostra nome, e-mail, chapa, dados de `SIAOS.USUARIO`, nome da empresa e, quando houver, dados de funcionário (`SIAOS.FUNCIONARIO`). Também há link para alteração de senha.

## Menu lateral

- Grupos **Administração**, **Produção** e **Compras** (e filhos) só aparecem se você tiver permissão/papel.
- Itens sem permissão não são exibidos (não é só “erro depois do clique”).

Próximos fluxos: [Administração — Clientes](./administracao-clientes.md), [Compras — Fornecedores](./compras-fornecedores.md), [Produção — Devices](./producao-devices.md).
