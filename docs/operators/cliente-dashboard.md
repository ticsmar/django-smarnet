# Dashboard do Cliente (operador)

Consulta financeira e histórico a partir da **listagem de Clientes** (Comercial → Clientes).

## Como abrir

1. Na listagem, clique no menu **⋮** da linha do cliente.
2. Escolha **Dashboard** (abaixo de Follow-up).

## Abas

### Crédito

Mesmo conteúdo da aba Crédito do Smarnet 3.01, com quatro sub-abas:

- **Resumo do crédito:** saldo a prazo e à vista, médias de atraso/antecipação, gráficos de faturamento e proposta (toggle Gráficos/Tabela).
- **Títulos pendentes:** NF, parcela, vencimento e totais a vencer/vencidos.
- **OSs e antecipações:** OSs em aberto (faturado / antecipado / à vista / a prazo) e saldo de antecipações.
- **Cadastros:** limites (`LIMITECR`, `CLI_LIMITE_CRV`) e classificação de risco. **Salvar limites** e **Editar restrições** exigem permissão de alterar o status do cliente (`change_clienterisco`). Sem essa permissão os campos e botões ficam **desabilitados**.

Limites no Dashboard gravam só essas duas colunas (equivalente ao `salvaLimite` do 3.01). O `ajax.php?op=5` genérico (`SET $campo`) não foi portado. Na ficha do cliente, Dados Financeiros continua com `change_clientelimite`.

### Histórico

- **OSs:** ordens de serviço do cliente ou do grupo.
- **Títulos:** contas a receber (Protheus). Se o ambiente não tiver grant Oracle, a aba informa indisponibilidade.

## Escopo

| Opção | O que inclui |
|-------|----------------|
| **Cliente** | Somente o código selecionado |
| **Grupo econômico** | Cabeça do grupo (`CLI_GRUPO`) e todos os membros vinculados |

## Permissão

Exige permissão de **visualizar cliente** (`view_cliente`). Cadastros (limites e restrições): `change_clienterisco`.

## Referência técnica

- API: [`administracao-clientes.md`](../developers/administracao-clientes.md)
- Grants Oracle: [`grants-oracle-cliente-dashboard.md`](../admins/grants-oracle-cliente-dashboard.md)
