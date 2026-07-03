import { Package, Users, FileText, Bell, Settings, Shield, ChevronRight } from 'lucide-react';
import { ColoredListGroup, type ListGroupItem } from '@/components/ui/listgroups';
import { StatusBadge } from '@/components/ui/badges';
import {
  ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote,
  type PropDef,
} from '../_docs';

const listGroupProps: PropDef[] = [
  { name: 'items', type: 'ListGroupItem[]', required: true, description: 'Array de itens da lista.' },
  { name: 'color', type: 'ListGroupColor', default: "'neutral'", description: '10 cores semânticas.' },
  { name: 'tone', type: "'solid' | 'soft' | 'outline'", default: "'soft'", description: 'Tom visual dos itens.' },
  { name: 'showChevron', type: 'boolean', default: 'false', description: 'Exibe chevron à direita.' },
];

const itemProps: PropDef[] = [
  { name: 'label', type: 'string', required: true, description: 'Texto principal.' },
  { name: 'description', type: 'string', description: 'Subtexto abaixo do label.' },
  { name: 'icon', type: 'LucideIcon', description: 'Ícone à esquerda.' },
  { name: 'badge', type: 'ReactNode', description: 'Badge ou tag à direita.' },
  { name: 'trailing', type: 'ReactNode', description: 'Conteúdo extra à direita (após badge).' },
  { name: 'onClick', type: '() => void', description: 'Callback ao clicar.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o item.' },
];

const sampleItems: ListGroupItem[] = [
  { label: 'Pedidos', description: '42 pendentes', icon: Package },
  { label: 'Clientes', description: '1.280 ativos', icon: Users },
  { label: 'Relatórios', description: '5 novos', icon: FileText },
  { label: 'Notificações', description: '12 não lidas', icon: Bell },
  { label: 'Configurações', icon: Settings },
];

const COLORS = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'destructive', 'neutral'] as const;

export default function ListGroupsPage() {
  return (
    <ComponentDoc
      summary="Lista agrupada com 10 cores semânticas × 3 tons. Ideal para menus laterais, listas de navegação e seleção."
      importPath="import { ColoredListGroup } from '@/components/ui/listgroups'"
    >
      <DocSection title="ColoredListGroup" description="Lista interativa com ícones, badges e tons de cor.">
        <VariantSection
          title="Tons: solid, soft, outline"
          preview={
            <div className="grid gap-4 md:grid-cols-3">
              {(['solid', 'soft', 'outline'] as const).map((tone) => (
                <ColoredListGroup key={tone} items={sampleItems.slice(0, 3)} color="primary" tone={tone} showChevron />
              ))}
            </div>
          }
          code={`<ColoredListGroup
  items={[
    { label: 'Pedidos', description: '42 pendentes', icon: Package },
    { label: 'Clientes', description: '1.280 ativos', icon: Users },
    { label: 'Relatórios', description: '5 novos', icon: FileText },
  ]}
  color="primary"
  tone="soft"
  showChevron
/>`}
        />

        <VariantSection
          title="Todas as cores (soft)"
          preview={
            <div className="grid gap-3 md:grid-cols-4">
              {COLORS.map((c) => (
                <ColoredListGroup
                  key={c}
                  items={[
                    { label: c, icon: Shield },
                    { label: 'Item 2', icon: Settings },
                  ]}
                  color={c}
                  tone="soft"
                />
              ))}
            </div>
          }
          code={`<ColoredListGroup items={items} color="success" tone="soft" />`}
        />

        <VariantSection
          title="Com badges e trailing"
          preview={
            <ColoredListGroup
              color="info"
              tone="outline"
              showChevron
              items={[
                { label: 'Pedidos', description: 'Gestão de pedidos', icon: Package, badge: <StatusBadge color="success" label="42" /> },
                { label: 'Alertas', icon: Bell, badge: <StatusBadge color="alert" label="Urgente" /> },
                { label: 'Desabilitado', icon: Settings, disabled: true },
              ]}
            />
          }
          code={`<ColoredListGroup
  color="info"
  tone="outline"
  showChevron
  items={[
    {
      label: 'Pedidos',
      icon: Package,
      badge: <StatusBadge status="active" label="42" size="sm" />,
    },
    {
      label: 'Alertas',
      icon: Bell,
      badge: <StatusBadge status="alert" label="Urgente" size="sm" />,
    },
    { label: 'Desabilitado', icon: Settings, disabled: true },
  ]}
/>`}
        />

        <PropsTable rows={listGroupProps} title="ColoredListGroup Props" />
        <PropsTable rows={itemProps} title="ListGroupItem" />
      </DocSection>

      <UsageNote type="tip">
        Use <code>tone="outline"</code> para listas de navegação sutis e <code>tone="solid"</code> para menus com destaque forte.
        Combine com <code>StatusBadge</code> para indicadores visuais nos itens.
      </UsageNote>
    </ComponentDoc>
  );
}
