# Padrão de cadastro/listagem como contrato do ERP

Novos cadastros mestres proliferariam layouts e regras de permissão inconsistentes. Fixamos como padrão a abordagem já estabilizada na listagem/cadastro de Compras: três visualizações (Tabela/Lista/Cards), ações por permissão (menu à esquerda ou botões no rodapé do card), soft inativação quando o domínio usa flag ativo, breadcrumb no layout, API em camadas hexagonais com perms Django. Documentado em `docs/developers/padrao-cadastro-listagem.md` e exigido via `AGENTS.md`. Alternativas (só tabela, hard delete genérico, breadcrumb local) ficam de fora salvo ADR futuro.

## Evolução (casca visual)

A **casca da listagem** (página inteira: cabeçalho solto + toolbar + `Table` do DS, **sem** card `bg-card` envolvendo a tela) tem referência viva em Clientes (`/app/commercial/customers`). Compras continua o molde de API, permissões e três modos. Ver `padrao-cadastro-listagem.md` §5 e `design-system.md` §3.

## Status

accepted
