
# Portal da Transparência — Nova Smar S/A (Frontend)

Escopo: construir somente o frontend. Dados via `axios` + React Query, com camada de mock ativada por flag (`VITE_USE_MOCK=true`) enquanto a API REST não existir. Sem alterações no backend/Lovable Cloud.

## 1. Infraestrutura

**Dependências a adicionar**
- `axios`, `@tanstack/react-query` (verificar — provavelmente já existe)
- `dompurify` + `@types/dompurify`
- `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

**Arquivos novos**
- `src/types/portal.ts` — `Menu`, `Noticia`, `GrupoNoticias`, enums de status/tipo.
- `src/lib/portalApi.ts` — instância axios `baseURL: import.meta.env.VITE_API_URL`.
- `src/mocks/portal.ts` — dataset mock (menus, grupos, ~8 notícias com imagens Unsplash placeholder, 3 com `destaque:true`).
- `src/services/portal.ts` — funções tipadas (`getMenus`, `getDestaques`, `getRecentes`, `getNoticia`, `getGrupo`, `listAdminNoticias`, `saveNoticia`, `deleteNoticia`, `listMenusAdmin`, `saveMenu`, `deleteMenu`, `listGrupos`, `saveGrupo`, `uploadImagem`). Cada uma checa `import.meta.env.VITE_USE_MOCK` e devolve mock ou chama axios.
- `src/providers/QueryProvider.tsx` (se ainda não houver) — `QueryClientProvider` no `App.tsx`.

## 2. Rotas (em `src/App.tsx`)

Lazy-load:

```
/portal                       PortalLayout
  index                       PortalHome (carrossel + sidebar)
  noticias/:slug              NoticiaPage
  grupo/:slug                 GrupoPage
  :menuSlug                   MenuDinamicoPage (resolve menu→tipo)

/portal/admin                 PortalAdminLayout
  index                       AdminDashboard
  menus                       MenusList
  menus/novo                  MenuForm
  menus/:id                   MenuForm
  grupos                      GruposList
  grupos/novo                 GrupoForm
  grupos/:id                  GrupoForm
  noticias                    NoticiasList
  noticias/nova               NoticiaForm
  noticias/:id                NoticiaForm
```

## 3. Tela TV `/portal`

- `PortalLayout`: header fixo 56px (`bg-[#0A0E1A]`, logo + menus dinâmicos via `useQuery(['menus'])` + relógio `HH:MM — DD/MM/AAAA` atualizado por `setInterval`).
- `PortalHome`: grid `grid-cols-4`.
  - `<DestaquesCarousel>` ocupa `col-span-3`: imagem background + gradiente bottom, manchete `text-5xl`, categoria/badge dourado `#C8922A`, troca automática 6s com `<ProgressBar>` linear, setas ‹ › `min-h-12 min-w-12`. Implementado com estado interno + `setInterval`.
  - `<RecentesSidebar>` `col-span-1`: cards (imagem, tag, manchete 2 linhas via `line-clamp-2`, data). Loop contínuo CSS `@keyframes scroll-y` no `tailwind.config.ts`, `pause` em `:hover`.
- React Query com `refetchInterval: 5*60*1000` em destaques e recentes.

## 4. `/portal/noticias/:slug`

- Hero full-width `h-[60vh]` com `bg-image` + overlay; manchete sobreposta `text-4xl`, badges categoria/data.
- Corpo: `dangerouslySetInnerHTML={ __html: DOMPurify.sanitize(noticia.corpo) }` em container `prose prose-lg max-w-3xl`.
- Rodapé com regra de validade:
  - `naoExpira` → badge teal "Conteúdo permanente".
  - `dataExpiracao` → "Válido até …", âmbar quando `diffDays ≤ 7`.
- Botão `← Voltar` flutuante top-left, `min-w-12 min-h-12`.

## 5. `/portal/grupo/:slug` e `/portal/:menuSlug`

- Grupo: grid de cards de notícias.
- MenuDinâmico: lê `menus`, resolve `tipo`:
  - `grupo` → redirect `/portal/grupo/:slug`
  - `noticia` → redirect `/portal/noticias/:slug`
  - `url` → `window.location.href = urlExterna`
  - `vazio` → página de lista filhos.

## 6. Admin

- `PortalAdminLayout`: reaproveita o estilo do `AdminLayout` (sidebar escura) com itens: Dashboard, Menus, Grupos, Notícias.
- `AdminDashboard`: KPIs simples (totais de notícias por status) usando `KpiCard` existente.
- `NoticiasList`: tabela com filtros (status, categoria, busca), paginação client-side em cima do mock; ações editar/excluir.
- `NoticiaForm`: formulário em seções conforme spec.
  - `react-hook-form` + `zod` para validação.
  - Slug auto: `slugify(manchete)` ao perder foco, editável.
  - Resumo com contador `0/180`.
  - Upload de imagem: `<input type=file>` → no modo mock devolve `URL.createObjectURL`, em produção `POST /admin/upload/imagem`.
  - Editor TipTap com toolbar (H2, H3, bold, italic, listas, blockquote, imagem, link).
  - Publicação: toggles "Publicar agora" / "Agendar" controlando `datetime-local`.
  - Validade: `RadioGroup` "Tem data de saída" | "Permanente".
  - Vínculos: selects de grupo/menu.
  - Botões "Salvar rascunho" (status=`rascunho`) / "Publicar" (status=`publicada`, `publicadoEm=now()`).
- `MenusList`: 3 colunas.
  - Coluna 1: árvore com `@dnd-kit/sortable` (ordenação por irmãos; aninhamento simples 2 níveis).
  - Coluna 2: form do item selecionado (label, ícone Tabler — input texto livre, ordem, pai, tipo via radio, vínculo dinâmico, ativo).
  - Coluna 3: preview da barra de menu igual ao `/portal`.
- `GruposList` + `GrupoForm`: CRUD simples.

## 7. UX TV / Acessibilidade

- Tokens já existentes no design system; somente as cores fixas do portal (`#0A0E1A`, `#0F4C81`, `#C8922A`, teal/âmbar para badges) ficam no escopo do portal — adicionar variáveis CSS `--portal-bg`, `--portal-primary`, `--portal-gold` em `src/index.css` e classes utilitárias.
- Mínimo `min-h-12 min-w-12` em todo controle interativo do portal.
- `text-base` (16px) mínimo no portal, manchete 32px+.
- Sem efeitos só de hover: aplicar mesmas classes em `active:` / `data-[state=active]`.
- Testar layout 1920×1080 mantendo grid e tipografia.

## 8. Mocks

- 4 menus raiz (Institucional, Notícias, Indicadores, Contato) com submenus.
- 3 grupos (Comunicados, Obras, Sustentabilidade).
- 8 notícias variadas (3 destaque, datas distintas, 1 expirando em 5 dias, 1 permanente).

## 9. Detalhes técnicos

- `import.meta.env.VITE_USE_MOCK` lido em `services/portal.ts`; default `true` quando indefinido.
- Wrappers React Query com `staleTime` 60s para admin, 30s para portal público.
- `slugify` simples local (sem libs).
- Sanitização: `DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })`.
- TipTap configurado client-only (sem SSR concerns).

## 10. Fora de escopo

- Autenticação, RBAC, persistência real, edge functions, testes E2E, i18n adicional.

Confirma para eu construir tudo isso de uma vez? Se preferir, posso entregar em duas fases: (1) portal público + mocks + rotas, (2) admin completo + TipTap + dnd-kit.
