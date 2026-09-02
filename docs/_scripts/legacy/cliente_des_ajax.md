# Legado — `cliente/cadastro/cliente_des_ajax.php`

Cópia de referência para migração do **Dashboard do Cliente** (visualização 3.01). O Smarnet Novo **não** embute este PHP; a API nativa replica os dados.

Fonte local: `cliente_des_ajax.php` nesta pasta. Classes: `dqanet/_src/php/classes/cliente/relatorios.php`.

## Endpoints (Infonet / webdesenv)

Base: `/cliente/cadastro/cliente_des_ajax.php?cli_codigo={codigo}&op={op}`

| `op` | Aba Novo | Conteúdo legado |
|------|----------|-----------------|
| `estCli` | Crédito | Resumo, títulos pendentes, OSs/antecipações, cadastros, gráficos |
| `histCliOS` | Histórico → OSs | Ordens de serviço do cliente / grupo |
| `histCliTit` | Histórico → Títulos | Títulos financeiros (contas a receber) |

## Crédito (`estCli`) — objetos

| Bloco | Função PHP | Objeto |
|-------|------------|--------|
| Títulos pendentes | `titulosPendCliente` | `INTEGRACAO.VW_TITULOS_PEND` (`TRIM(PARCELA) != 'RA'`, `COD_CLI = LPAD(codigo,6,0)`) |
| OSs em aberto | `ossPendCliente` | `INTEGRACAO.VW_OSS_PEND` |
| Médias atraso/antecipação | SQL inline | `INTEGRACAO.VW_TITULO_NF_SAIDA` (ou `VW_TITULO_INV_SAIDA` se `ORIGEM='CO'`) |
| Faturamento mês/ano | SQL inline | `GERAL.CALENDARIO` + `SIAOS.OEHDR`/`OELIN` + `PCK_DQANET.SF_CONVERTE_MOEDA` + `PCK_SMART_SALES3.SF_CALCULA_IMP_SAIDA` (÷1000) |
| Proposta / O.S. por ano | SQL inline | `SADIG.VM_PROPOSTA` ∪ `SADIG.VM_PROPOSTA_ANTIGA` (O.S. = `STATUS_PROPOSTA = 'OS ABERTA'`) |
| Limites / risco | cadastro | `SIAOS.CLIENTE.LIMITECR` / `CLI_LIMITE_CRV`; `INTEGRACAO.CLIENTE_RISCO`; ACE 370 → `change_clienterisco` |

Saldos (JS `calculaLimites`): crédito concedido a prazo = títulos a vencer + vencidos + a faturar a prazo; à vista = a faturar antecipação + à vista + saldo de antecipações; saldo = limite + concedido. Saldo geral: se ambos ≤ 0 soma os dois; senão o à vista se > 0, senão o a prazo.

Não portar `ajax.php?op=5` (UPDATE genérico `SET $campo`). O Novo grava só `LIMITECR` e `CLI_LIMITE_CRV` via `PUT .../dashboard/limites/` com `change_clienterisco`.

## Filtros

- **Cliente:** apenas `cli_codigo` informado.
- **Grupo:** agrega membros do grupo econômico (`SIAOS.CLIENTE.CLI_GRUPO` → cabeça `NVL(CLI_GRUPO, CODIGO)`). No 3.01 o `estCli` é só o código; o Novo aplica o mesmo escopo Cliente/Grupo nas queries.

## Objetos Oracle mapeados (Novo)

| Área | Objetos |
|------|---------|
| Crédito | views `INTEGRACAO.VW_*` acima, `SADIG.VM_PROPOSTA*`, `GERAL.CALENDARIO`, `SIAOS.OEHDR`/`OELIN`, `SIAOS.CLIENTE`, `INTEGRACAO.CLIENTE_RISCO` |
| Histórico OS | `SIAOS.OEHDR`, `SIAOS.ORIGEM`, `SIAOS.CLIENTE` |
| Histórico Títulos | `PROTPROD.SE1010` (Protheus; `E1_CLIENTE` = código cliente 6 dígitos) |

## Permissão legado

Reutiliza acesso de visualização do cadastro de Cliente. Cadastros/restrições: ACE 370. No Novo: `commercial_infrastructure.view_cliente` e `change_clienterisco`.
