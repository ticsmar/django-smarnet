# Administração — Clientes

**Caminho:** Comercial → Cadastros → Clientes (`/app/commercial/customers`).  
**Precisa de:** permissão de visualizar cliente. Sem ela o menu/rota não libera.

Cadastro de pessoas e empresas em `SIAOS.CLIENTE` (mesmo Oracle do Smarnet 3.01). Não há inativar/excluir nesta versão.

## Listar

1. Abra Clientes.
2. Use a busca (nome, documento, cidade, estado). Nesta tela **não há filtro** extra; o botão **Novo** fica no cabeçalho, à direita.
3. Alterne a visualização: **Tabela**, **Lista** ou **Cards** (a escolha fica salva no navegador). Esse layout (título, busca e grade, sem caixa extra em volta da página) é o mesmo das outras listagens do ERP.
4. A coluna de status mostra a **nota de risco** (A, B, C…). Um `!` indica cadastro incompleto ou CNPJ inválido.

Clientes com cadastro duplicado/inválido (nota E−) não aparecem na lista. Se o CNPJ
já existir (inclusive nessa nota), o sistema abre o cadastro pelo **código**.

## Criar

1. Botão **Novo** no canto direito do título (exige permissão de incluir).
2. Escolha o tipo.
   - **Pessoa jurídica:** informe o CNPJ (com ou sem máscara) e busque:
     - se o CNPJ já existir em `SIAOS.CLIENTE`, o sistema mostra o **código** e abre o detalhe (não cria outro);
     - se não existir, consulta a Receita Federal e, quando achar, já abre o formulário com nome e endereço;
     - se a Receita também não achar, abre o formulário só com o CNPJ.
   - **Funcionário:** informe o CPF:
     - se já existir cliente com esse documento, mostra o **código** e abre o detalhe;
     - se existir no RH e ainda não for cliente, **Copiar p/ Novo** cria o cadastro a partir do funcionário.
3. Preencha os **Dados Cadastrais** e salve.
4. O sistema abre o **detalhe** do cliente criado.

## Ações na listagem

| Ação | O que faz |
|------|-----------|
| Visualizar | Abre o detalhe |
| Editar | Abre o detalhe em modo edição (página, não modal; permissão de alterar) |

- Em **Tabela** e **Lista**: menu ⋮ à esquerda.
- Em **Cards**: mesmos links como **botões no rodapé** do card.

## Detalhe

No detalhe (`/app/commercial/customers/:codigo`) há abas:

| Aba | O que faz |
|-----|-----------|
| Dados Cadastrais | Razão social, documento, endereço, telefones, e-mails, origem, áreas e vendedor. Cond. pagto. e modo de pagto. ficam nesta aba |
| Dados Financeiros | Grupo tributário, limites, Suframa, CNAE, NIF, conta contábil, Fome Zero, multa, montador e recolhimentos. Não aparece para empresa tipo **C**. Limites só com permissão de limite |
| Contatos | Resumo comercial/técnico/financeiro, busca, cards com padrão e edição |
| Cobrança | Registro atual + lista **Outras Cobranças** (vincular cliente e tornar padrão) |
| Embarque | Igual à cobrança, em **Outros Embarques** |
| Observação | Texto livre e log de alterações (o log pode trazer negrito e quebras de linha, como no 3.01) |
| Gerenciador de Arquivos | Pastas e anexos do cliente (mesmo repositório do 3.01). Visualizar/baixar/histórico com permissão de visualizar; criar pasta, anexar, mover e apagar (lixeira) com permissão de alterar |

O chip de status (letra A–E) no cabeçalho mostra a **descrição curta**; passe o mouse para a descrição longa. Clique abre o dialog de bloqueio. **Gravar** exige a permissão de alterar status do cliente (não é a mesma de limite de crédito). Sem essa permissão o dialog abre só para consulta.

**Visualizar** (`/app/commercial/customers/:codigo`) deixa **todas** as abas só leitura (incluindo arquivos). **Editar** (botão no detalhe ou ação na lista) abre `/app/commercial/customers/:codigo/edit` e habilita os campos conforme a sua permissão. Cancelar volta à visualização.

Em tela grande o cartão da aba preenche a área abaixo do cabeçalho; a barra de rolagem do formulário só aparece se o conteúdo for mais alto que a tela. No celular e no tablet as abas ficam numa faixa que se arrasta para o lado (e acompanham o topo ao rolar); a página inteira é que sobe e desce.

Clique na linha (tabela/lista/card) também abre o detalhe; as ações do menu/botões não disparam esse clique.

Próximos fluxos: [Início e perfil](./inicio-perfil.md), [Compras — Fornecedores](./compras-fornecedores.md).
