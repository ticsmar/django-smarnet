# Design System (UI)

Catálogo in-app: **`/design-system`** (superusuário em ambiente de desenvolvimento).
Código: `frontend/src/components/ui/` (padrão shadcn/Radix + tokens em `frontend/src/index.css`).

Este documento é **obrigatório** antes de criar ou alterar tela, formulário, listagem ou qualquer UI.

Não confundir com a **Documentação do Sistema** (`docs/` / hub `/docs`).

---

## 1. Ordem de trabalho

1. Abrir o catálogo (`/design-system/components`, `/design-system/patterns`, `/design-system/foundations`) ou o código em `frontend/src/components/ui/`.
2. Reusar o componente/token existente. Importar de `@/components/ui/...`.
3. Só então, se **não existir**, estender o Design System (`components/ui` + página em `frontend/src/pages/design-system/`). Não criar um clone no módulo.

Em conflito entre “componente genérico de mercado” e o Smarnet, **vence o Design System**.

---

## 2. Formulários (cadastros)

Importar de `@/components/ui/forms`.

| Necessidade | Usar |
|-------------|------|
| Agrupamento de seção | `FormSection` — título DS: `text-[10px] font-bold uppercase tracking-widest text-accent` |
| Grade de campos | `FormGrid` (`cols={2}` etc.) |
| Texto / número | `FormInput` |
| Combo com busca | `FormCombobox` |
| Select simples | `FormSelect` |
| Checkbox / switch / rádio | `FormCheckbox`, `FormSwitch`, `FormRadioGroup` |
| Data | `FormDatePicker` / `FormDateRangePicker` |
| Máscara | `FormMaskedInput` |
| Ações do form | `FormActions` + `Button` / `ActionButton` |

**Estados do campo** (`fieldControlClassName` / `choiceControlClassName` em `@/components/ui/forms`):

| Estado | Fundo | Borda | Texto | Cursor |
|--------|--------|-------|-------|--------|
| Ativo | `bg-background` | `border-input` | `text-foreground` | texto |
| `readOnly` | um pouco mais escuro (`bg-muted`) | igual ao ativo | igual ao ativo | `not-allowed` |
| `disabled` | `bg-muted/50` | mais clara | mais clara | `not-allowed` |

Select/combobox `disabled`/`readOnly` usam wrapper com `cursor-not-allowed` (o Chrome ignora `cursor` em `<button disabled>`). Demo: `/design-system/components/input` (Ativo / somente leitura / desabilitado).

**Não fazer:** `h3`/`Section` local com `text-sm font-semibold`; `Label` + `Input` crus quando já existe `Form*`; copiar classes do PHP/legado.

Demo: `/design-system/components/form` e `/design-system/patterns` (Form Layout).

---

## 3. Listagens (página inteira)

A listagem **não é só a tabela**. A casca da página é o padrão — referência viva **Clientes** (`/app/commercial/customers`). Contrato completo: [padrao-cadastro-listagem.md](./padrao-cadastro-listagem.md) §5.

Catálogo: `/design-system/components/collection` (página de listagem) · `/design-system/components/table` (chrome do `Table`) · `/design-system/patterns` (Data Table).

### 3.1 Casca

```
<div className="space-y-6">
  CollectionHeader  {/* ícone + h1 + subtítulo; Novo à direita */}
  CollectionToolbar  {/* busca + filtros opcionais + ViewToggle */}
  Alert | EmptyState | Table | lista | cards
  PaginationInfo
</div>
```

**Não** envolver título, busca ou tabela em `rounded-2xl border border-border/50 bg-card p-6 shadow-sm`. O fundo é o do `AppLayout`. Detalhe de cadastro, home e perfil podem usar card — listagem não.

### 3.2 Table

`@/components/ui/table` já inclui:

- wrapper `rounded-xl border border-border/50 bg-background`
- `thead` muted (`bg-muted/50`, labels uppercase)
- zebra (`even:bg-muted/20`) e hover `hover:bg-muted/40`

Não envolva o `<Table>` com outro `div` de borda. Não reestilize thead/zebra no módulo. Coluna de ações: estreita à **esquerda**, header vazio, menu ⋮ (`ActionsDropdown iconOnly`).

### 3.3 Peças

| Peça | Import |
|------|--------|
| Cabeçalho (ícone + título; **Novo** à direita) | `CollectionHeader` — `@/components/ui/collection-header` |
| Toolbar (busca + filtros opcionais + ViewToggle) | `CollectionToolbar` — `@/components/ui/collection-toolbar` |
| Busca | `SearchField` — `@/components/ui/forms` |
| Vazio / loading | `EmptyState` (`variant="loading"`) — `@/components/ui/empty-state` |
| Paginação | `PaginationInfo` — `@/components/ui/pagination-blocks` |
| Modos tabela/lista/cards | `ViewToggle` + `useViewMode` |

Código de referência: `frontend/src/modules/commercial/pages/ClientesPage.tsx`.

---

## 4. Outros blocos

| Necessidade | Onde |
|-------------|------|
| Botões / toolbar / pager | `@/components/ui/button`, `@/components/ui/buttons` — `color` + `tone` (`solid` / `light` / `outline`) |
| Badge / status | `@/components/ui/badges` (`StatusBadge`, não hex Oracle) |
| Tabela | §3.2 — `Table` do DS; demo `/design-system/components/table` |
| Listagem 3 modos | §3 — página inteira como Clientes; demo `/design-system/components/collection` |
| Alertas / toasts | `@/components/ui/alert`, `@/components/ui/alerts`, `@/components/ui/toasts` |
| Dialog / sheet | `@/components/ui/dialog`, `sheet`, `alert-dialog` |
| Tabs | `@/components/ui/tabs` — cadastros/fichas: `variant="folder"`; painel da ficha preenchendo o `main`: `fill` (opt-in). Demo: `/design-system/components/tabs` |
| Cards / KPIs | `@/components/ui/cards`, `@/components/ui/panels` — Panel: `color` + `tone` (`solid` / `light` / `outline`) |
| Gerenciador de Arquivos | `@/components/ui/file-manager` — toolbar + árvore + modais do 3.01; props `sistema` + `filtro` + `disabled`. Demo: `/design-system/components/file-manager` |

Índice do catálogo: `/design-system/components`.

### 4.1 AppLayout (shell autenticado)

[`AppLayout.tsx`](../../frontend/src/components/AppLayout.tsx): shell `h-svh overflow-hidden`; coluna do conteúdo `min-h-0`; `main` é `flex flex-col min-h-0 overflow-y-auto` com **pads** `px-3 pt-3 sm:px-4 sm:pt-4` e `pb-[max(3rem,env(safe-area-inset-bottom))]`. Listagens rolam **no `main`**, não na janela.

Não usar `h-screen` / `100vh` nas páginas: isso ignora TopNav, breadcrumb e pads.

### 4.2 Ficha com abas pasta (`folder` + `fill`)

Referência: detalhe de Cliente (`/app/commercial/customers/:id`).

| Peça | Contrato |
|-------|----------|
| Cabeçalho da ficha | `bg-card` (mesmo token do painel da aba ativa) |
| Faixa das abas | transparente (`bg-transparent`) — aparece o fundo do `main` |
| Aba inativa | mais escura que o `main` (`bg-muted-foreground/30`) |
| Aba ativa + `TabsContent` | `bg-card`, fundidos |
| `fill` | opt-in no `Tabs` raiz; **efeito só ≥ `lg` (1024px)**. Página: `flex flex-col gap-5 lg:min-h-0 lg:flex-1`; header `shrink-0`; `<Tabs variant="folder" fill className="lg:min-h-0 lg:flex-1">`. `TabsContent` recebe `lg:min-h-0 lg:overflow-auto`. Abaixo de `lg` a ficha cresce e o **`main`** rola (sem scroll interno no painel). |
| Faixa &lt; `lg` | uma linha, swipe (`overflow-x-auto`); aba ativa entra em vista; `sticky` no topo do `main` (`bg-surface-container-low`). |
| Faixa ≥ `lg` | `flex-wrap` se as labels não couberem. |

Não aplicar `fill` em previews do DS sem um pai com altura (`h-64` ou `flex-1 min-h-0`). Não forçar `h-full` no `<form>` — quem estica é o `TabsContent`. Demo: `/design-system/components/tabs` (Fill) e `/design-system/patterns` (Ficha de cadastro).

---

## 5. Tokens (não hardcode)

- Cores só via tokens semânticos: `bg-primary`, `text-foreground`, `text-accent`, `bg-surface-container`, `success` / `warning` / `destructive` / `info`.
- Temas do catálogo: claro, escuro, sistema e **Admin** (zinc + amber de `/settings`, classe `.admin` no `html`).
- Proibido: `bg-blue-500`, `text-white`, hex/rgb no JSX, interpolar `CRS_CORES` do Oracle.
- Hierarquia por **superfície**, não por borda de 1px.
- Tipografia: Manrope (`font-display`) em títulos; Inter (`font-body`) no restante.
- Ícones: `lucide-react`.

Tokens: `frontend/src/index.css`. Fundamentos: `/design-system/foundations` e `/design-system` (princípios).

---

## 6. Estender o Design System

Se o bloco for reutilizável em mais de um módulo:

1. Implementar em `frontend/src/components/ui/` (ou subpasta: `forms/`, `buttons/`, `badges/`).
2. Exportar pelo `index` da pasta.
3. Documentar em `frontend/src/pages/design-system/` (props, preview, import path).
4. Usar o componente novo no módulo — não deixar uma cópia local.

Não inventar um segundo design system dentro de `frontend/src/modules/`.
