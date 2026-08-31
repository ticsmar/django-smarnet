# ADR 0006 — Desativação do legado por módulo no go-live

O **Smarnet 3.01** (PHP) e o **Smarnet Novo** (este Django + React) compartilham o Oracle durante a migração. Decidimos que, quando um módulo deste repositório entra em produção, a tela/fluxo equivalente no 3.01 é **desativada**. Não há coexistência permanente das duas UIs nem substituição big-bang de todo o PHP.

## Status

Accepted

## Context

Cadastros mestres de Pessoa, Empresa e Usuário (e a conta **Usuário Django**, que não existe no 3.01) estão em `/settings`. Sem uma regra de corte, o risco é manter duas telas gravando o mesmo Oracle, treinar operadores em dois lugares e nunca ter uma fonte de verdade de UI.

Alternativas reais: (1) as duas UIs para sempre; (2) desligar o 3.01 inteiro de uma vez; (3) cortar módulo a módulo no go-live.

## Decision

**Cutover por módulo.** No go-live do equivalente neste Django, a tela PHP correspondente sai de operação.

Primeira leva, quando este ambiente entrar em produção para o admin de cadastros: Pessoa, Empresa e Usuário do 3.01. O cadastro operacional passa a ser `/settings` (`/settings/masters/people`, `/settings/masters/companies`, `/settings/users`). O Django `/admin/` continua só para CRUD técnico de `auth.User` — não é a tela de cadastro do produto.

A mesma regra vale para **os demais módulos** (Compras, Clientes, etc.): conforme o novo for implantado, o do legado é desativado.

O corte é da **UI PHP**, não do objeto Oracle. Package/tabela que outro escritor 3.01 (tela, job, Forms) ainda usa permanece com o contrato atual ([ADR 0005](./0005-escrita-oracle-reuso-ou-python.md), [novas-telas.md](../developers/novas-telas.md)). ALTER/retirada de package só quando não houver escritor 3.01 naquele objeto.

## Considered Options

- **Coexistência permanente das duas UIs** — rejeitado: duplica fonte de verdade, treino e suporte.
- **Big-bang (desligar todo o 3.01 de uma vez)** — rejeitado: risco operacional alto; o 3.01 continua dono dos módulos ainda não migrados.
- **Cutover por módulo no go-live** — escolhido.

## Consequences

- Não projetar dual-write eterno nem feature flag “as duas telas ativas” após o go-live do módulo.
- TI precisa de runbook para tirar o item de menu/PHP do 3.01 no mesmo evento de implantação.
- Enquanto o PHP ainda escrever no mesmo package, o contrato de não ALTER do objeto 3.01 permanece.
- Usuário Django não tem tela 3.01 para desligar; o que se desliga é o cadastro PHP de Usuário (`SIAOS.USUARIO` / login web).
