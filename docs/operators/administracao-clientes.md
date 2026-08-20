# Administração — Clientes

**Caminho:** Administração → Clientes (`/app/administration/customers`).  
**Precisa de:** permissão de visualizar cliente. Sem ela o menu/rota não libera.

Cadastro de pessoas e empresas em `SIAOS.CLIENTE` (mesmo Oracle do Smarnet 3.0). Não há inativar/excluir nesta versão.

## Listar e filtrar

1. Abra Clientes.
2. Use a busca (nome, documento, cidade, estado).
3. Alterne a visualização: **Tabela**, **Lista** ou **Cards** (a escolha fica salva no navegador).
4. A coluna de status mostra a **nota de risco** (A, B, C…). Um `!` indica cadastro incompleto ou CNPJ inválido.

Clientes com cadastro duplicado/inválido (nota E−) não aparecem na lista. Se o CNPJ
já existir (inclusive nessa nota), o sistema abre o cadastro pelo **código**.

## Criar

1. Botão **Novo** (exige permissão de incluir).
2. Escolha o tipo.
   - **Pessoa jurídica:** informe o CNPJ (com ou sem máscara) e busque:
     - se o CNPJ já existir em `SIAOS.CLIENTE`, o sistema mostra o **código** e abre o detalhe (não cria outro);
     - se não existir, consulta a Receita Federal e, quando achar, já abre o formulário com nome e endereço;
     - se a Receita também não achar, abre o formulário só com o CNPJ.
   - **Funcionário:** informe o CPF:
     - se já existir cliente com esse documento, mostra o **código** e abre o detalhe;
     - se existir no RH e ainda não for cliente, **Copiar p/ Novo** cria o cadastro a partir do funcionário.
3. Preencha os **Dados Gerais** e salve.
4. O sistema abre o **detalhe** do cliente criado.

## Ações na listagem

| Ação | O que faz |
|------|-----------|
| Visualizar | Abre o detalhe |
| Editar | Abre o formulário de Dados Gerais (permissão de alterar) |

- Em **Tabela** e **Lista**: menu ⋮ à esquerda.
- Em **Cards**: mesmos links como **botões no rodapé** do card.

## Detalhe

No detalhe (`/app/administration/customers/:codigo`) você vê dados gerais, a nota de risco e, quando o financeiro preencheu, a **mensagem de bloqueio** (motivo, não o rótulo da nota).

Clique na linha (tabela/lista/card) também abre o detalhe; as ações do menu/botões não disparam esse clique.

Próximos fluxos: [Início e perfil](./inicio-perfil.md), [Compras — Fornecedores](./compras-fornecedores.md).
