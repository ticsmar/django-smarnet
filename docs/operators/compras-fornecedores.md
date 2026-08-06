# Compras — Fornecedores

**Caminho:** Compras → Fornecedores (`/app/compras/fornecedores`).  
**Precisa de:** permissão de visualizar fornecedor. Sem ela o menu/rota não libera.

## Listar e filtrar

1. Abra Fornecedores.
2. Use a busca (código, razão social, etc., conforme API).
3. Filtre por **Ativos / Inativos / Todos**.
4. Alterne a visualização: **Tabela**, **Lista** ou **Cards** (a escolha fica salva no navegador).

## Criar

1. Botão **Novo** (exige permissão de incluir).
2. Preencha o formulário e salve.
3. O sistema abre o **detalhe** do fornecedor criado.

## Ações na listagem

| Ação | O que faz |
|------|-----------|
| Visualizar | Abre o detalhe |
| Editar | Abre o formulário (permissão de alterar) |
| Excluir | **Inativa** o fornecedor ativo (não apaga do banco). Exige permissão de excluir ou alterar |

- Em **Tabela** e **Lista**: menu ⋮ à esquerda.
- Em **Cards**: mesmos links como **botões no rodapé** do card (sem ícone de avatar de código).

## Detalhe

No detalhe (`/app/compras/fornecedores/:codigo`) você pode:

- Editar dados cadastrais
- **Ativar** ou **Inativar**
- Gerenciar **contatos** (incluir / editar / remover), se tiver permissão de contato

## Dicas

- “Excluir” na lista = inativar: o registro pode voltar com **Ativar**.
- Clique na linha (tabela/lista/card) também abre o detalhe; as ações do menu/botões não disparam esse clique.
