# Documentação do sistema em docs/ por público

O ERP precisava de documentação de produto/domínio/operação além do Design System (UI) e dos READMEs técnicos. Decidimos manter a fonte em Markdown sob `docs/`, com pastas `developers/`, `admins/` e `operators/`, mais `CONTEXT.md` e `AGENTS.md` na raiz para humanos e agentes de IA. O Design System permanece separado em `/design-system`. Conteúdo em português por agora (inglês quando maduro). Arquivos longos já existentes na raiz não são movidos — apenas linkados e resumidos em `docs/developers/`.

Hub in-app em `/docs` (superusuário em ambiente de desenvolvimento): renderiza estes Markdowns com menu em árvore, layout alinhado ao Design System.

## Status

accepted

## Considered Options

- Só Design System / só Swagger — insuficiente para operadores e domínio
- Tudo na raiz sem pastas por público — difícil de navegar por destino e por agentes
- Hub in-app na primeira entrega — adiado na decisão inicial; **entregue** depois (ver Consequences)
- Pastas em português — rejeitado em favor de nomes EN estáveis para agentes

## Consequences

Agentes devem seguir `AGENTS.md`. Novos manuais entram na pasta do público certo. Não duplicar o corpo de `ARCHITECTURE.md` etc. dentro de `docs/`. A UI em `/docs` já renderiza estes Markdowns e hoje é restrita a superusuário em ambiente de desenvolvimento.
