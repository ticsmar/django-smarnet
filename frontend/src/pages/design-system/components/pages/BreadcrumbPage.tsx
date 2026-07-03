import { Home } from 'lucide-react';
import { PathBreadcrumb, CompactBreadcrumb, PageHeaderBreadcrumb } from '@/components/ui/breadcrumbs';
import { ActionButton } from '@/components/ui/buttons';
import { Plus } from 'lucide-react';
import { ComponentDoc, DocSection, VariantSection, PropsTable } from '../_docs';

const items = [
  { label: 'Início', href: '/', icon: Home },
  { label: 'Templates', href: '/templates' },
  { label: 'UI Elements', href: '/templates/ui' },
  { label: 'Breadcrumb' },
];

export default function BreadcrumbPage() {
  return (
    <ComponentDoc
      summary="Três variantes de breadcrumb data-driven: PathBreadcrumb (caminho completo com colapso), CompactBreadcrumb (responsivo com botão voltar no mobile) e PageHeaderBreadcrumb (cabeçalho de página)."
      importPath="@/components/ui/breadcrumbs"
    >
      <DocSection title="PathBreadcrumb">
        <VariantSection
          title="Variantes"
          preview={
            <div className="space-y-4">
              <PathBreadcrumb items={items} />
              <PathBreadcrumb items={items} separator="slash" />
              <PathBreadcrumb items={items} size="xs" />
              <PathBreadcrumb
                items={[
                  { label: 'Início', href: '/', icon: Home },
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
    { label: 'Início', href: '/', icon: Home },
    { label: 'Templates', href: '/templates' },
    { label: 'Breadcrumb' },  // último = página atual
  ]}
  separator="chevron"
  maxItems={4}
/>`}
        />
        <PropsTable
          rows={[
            { name: 'items', type: 'BreadcrumbItemData[]', required: true, description: '[{ label, href?, icon?, onClick? }]. Último é página atual.' },
            { name: 'separator', type: '"chevron" | "slash"', default: '"chevron"', description: 'Tipo do separador.' },
            { name: 'size', type: '"xs" | "sm"', default: '"sm"', description: 'Tamanho da fonte.' },
            { name: 'maxItems', type: 'number', default: '0', description: 'Colapsa o meio com ellipsis quando excede. 0 = sem limite.' },
          ]}
        />
      </DocSection>

      <DocSection title="CompactBreadcrumb" description="Responsivo: caminho completo no desktop, '← Voltar' no mobile.">
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

      <DocSection title="PageHeaderBreadcrumb" description="Header completo de página interna.">
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
    </ComponentDoc>
  );
}
