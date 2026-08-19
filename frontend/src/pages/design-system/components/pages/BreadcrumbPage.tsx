import { Home } from 'lucide-react';
import { PathBreadcrumb, CompactBreadcrumb, PageHeaderBreadcrumb } from '@/components/ui/breadcrumbs';
import { ActionButton } from '@/components/ui/buttons';
import { Plus } from 'lucide-react';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

const items = [
  { label: 'Início', href: '/app', icon: Home, iconOnly: true },
  { label: 'Compras', href: '/app/purchasing' },
  { label: 'Fornecedores', href: '/app/purchasing/suppliers' },
  { label: '1011' },
];

export default function BreadcrumbPage() {
  return (
    <ComponentDoc
      summary="Trilha de navegação semântica (nav + ol/li + aria-current). PathBreadcrumb é a base; CompactBreadcrumb adapta ao mobile; PageHeaderBreadcrumb embute título e ações. No app autenticado a trilha vive numa faixa fixa do layout (PageBreadcrumbBar), não dentro do conteúdo da página."
      importPath="@/components/ui/breadcrumbs"
    >
      <DocSection
        title="PathBreadcrumb"
        description="Links usam react-router (Link via asChild). O último item é a página atual (não clicável). Ícones com iconOnly recebem o label em sr-only."
      >
        <VariantSection
          title="Variantes"
          preview={
            <div className="space-y-4">
              <PathBreadcrumb items={items} />
              <PathBreadcrumb items={items} separator="slash" />
              <PathBreadcrumb items={items} size="xs" />
              <PathBreadcrumb
                items={[
                  { label: 'Início', href: '/app', icon: Home, iconOnly: true },
                  { label: 'A', href: '#' },
                  { label: 'B', href: '#' },
                  { label: 'C', href: '#' },
                  { label: 'D', href: '#' },
                  { label: 'E', href: '#' },
                  { label: 'Atual' },
                ]}
                maxItems={4}
              />
            </div>
          }
          code={`<PathBreadcrumb
  items={[
    { label: 'Início', href: '/app', icon: Home, iconOnly: true },
    { label: 'Compras', href: '/app/purchasing' },
    { label: 'Fornecedores' },  // último = página atual
  ]}
  separator="chevron"
  maxItems={5}
/>`}
        />
        <PropsTable
          rows={[
            {
              name: 'items',
              type: 'BreadcrumbItemData[]',
              required: true,
              description:
                '[{ label, href?, icon?, iconOnly?, onClick? }]. Último item = página atual (aria-current).',
            },
            {
              name: 'separator',
              type: '"chevron" | "slash"',
              default: '"chevron"',
              description: 'Tipo do separador (decorativo, aria-hidden).',
            },
            {
              name: 'size',
              type: '"xs" | "sm"',
              default: '"sm"',
              description: 'Tamanho da fonte.',
            },
            {
              name: 'maxItems',
              type: 'number',
              default: '0',
              description: 'Colapsa o meio com ellipsis quando excede. 0 = sem limite.',
            },
          ]}
        />
        <PropsTable
          title="BreadcrumbItemData"
          rows={[
            { name: 'label', type: 'string', required: true, description: 'Texto visível (ou sr-only se iconOnly).' },
            { name: 'href', type: 'string', description: 'Rota SPA. Ausente = texto não-clicável.' },
            { name: 'icon', type: 'LucideIcon', description: 'Ícone opcional (ex.: Home no raiz).' },
            {
              name: 'iconOnly',
              type: 'boolean',
              default: 'false',
              description: 'Mostra só o ícone; label vai para sr-only (acessível).',
            },
            { name: 'onClick', type: '(e) => void', description: 'Handler opcional no Link.' },
          ]}
        />
      </DocSection>

      <DocSection title="CompactBreadcrumb" description="Responsivo: caminho completo no desktop, '← Voltar' no mobile (também via Link do router).">
        <VariantSection
          title="Default"
          preview={<CompactBreadcrumb items={items} />}
          code={`<CompactBreadcrumb
  items={items}
  onBack={() => navigate(-1)}  // opcional
/>`}
        />
        <PropsTable
          rows={[
            { name: 'items', type: 'BreadcrumbItemData[]', required: true, description: 'Mesma estrutura.' },
            { name: 'separator', type: '"chevron" | "slash"', default: '"chevron"', description: 'Separador no desktop.' },
            { name: 'backLabel', type: 'string', description: 'Label do botão voltar (default = penúltimo item).' },
            { name: 'onBack', type: '() => void', description: 'Callback do botão voltar.' },
          ]}
        />
      </DocSection>

      <DocSection title="PageHeaderBreadcrumb" description="Header completo de página interna (breadcrumb + h1 + ações). Útil em templates; no app ERP preferir a faixa do layout.">
        <VariantSection
          title="Com título e ações"
          preview={
            <PageHeaderBreadcrumb
              items={items}
              title="Listagem de breadcrumbs"
              description="Demonstração do componente de cabeçalho."
              actions={<ActionButton label="Novo" icon={Plus} />}
            />
          }
          code={`<PageHeaderBreadcrumb
  items={items}
  title="Pedidos"
  description="Gerencie seus pedidos"
  actions={<ActionButton label="Novo" icon={Plus} />}
/>`}
        />
        <PropsTable
          rows={[
            { name: 'items', type: 'BreadcrumbItemData[]', required: true, description: 'Caminho.' },
            { name: 'title', type: 'ReactNode', required: true, description: 'Título principal (h1).' },
            { name: 'description', type: 'ReactNode', description: 'Subtítulo.' },
            { name: 'actions', type: 'ReactNode', description: 'Slot de botões à direita.' },
            { name: 'separator', type: '"chevron" | "slash"', default: '"chevron"', description: 'Separador.' },
          ]}
        />
      </DocSection>

      <DocSection
        title="Faixa de layout (app autenticado)"
        description="No AppLayout a trilha fica fixa dentro do main, logo abaixo do TopNav, com a largura total da área de conteúdo — independente de wrappers max-w da página."
      >
        <VariantSection
          title="usePageBreadcrumb + PageBreadcrumbBar"
          description="A página declara só os níveis após o Home. A barra prepende o raiz e some quando não há items (ex.: Dashboard)."
          preview={
            <div className="rounded-xl border border-border/40 overflow-hidden bg-background">
              <div className="h-10 border-b border-border/40 bg-surface-container-low px-4 flex items-center text-[11px] text-muted-foreground font-mono">
                TopNav
              </div>
              <div className="px-4 pt-4 pb-6 space-y-4">
                <PathBreadcrumb items={items} className="w-full" />
                <div className="rounded-2xl border border-border/50 bg-card p-5 text-sm text-muted-foreground">
                  Conteúdo da página (pode ter max-w próprio — a trilha não encolhe junto).
                </div>
              </div>
            </div>
          }
          code={`// AppLayout
<main>
  <PageBreadcrumbBar />  {/* PathBreadcrumb + Home automático */}
  <Outlet />
</main>

// Página
usePageBreadcrumb([
  { label: t('nav.compras'), href: '/app/purchasing' },
  { label: t('compras.fornecedores.title') },
]);`}
        />
        <UsageNote type="tip">
          Não renderize <code className="font-mono text-[11px]">&lt;nav&gt;</code> manual dentro da
          página. Declare a trilha com{' '}
          <code className="font-mono text-[11px]">usePageBreadcrumb</code> para manter posição e
          largura estáveis.
        </UsageNote>
        <UsageNote type="warning">
          Crumbs intermediários de módulo (Compras, Produção) devem apontar para as rotas índice{' '}
          <code className="font-mono text-[11px]">/app/purchasing</code> e{' '}
          <code className="font-mono text-[11px]">/app/production</code> — não para a primeira tela
          filha.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
