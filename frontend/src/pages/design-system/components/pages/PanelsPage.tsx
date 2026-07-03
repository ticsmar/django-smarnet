import { useState } from 'react';
import { Settings, TrendingUp, Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, CollapsiblePanel, StatPanel } from '@/components/ui/panels';
import {
  ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote,
  type PropDef,
} from '../_docs';

/* ── Props definitions ── */
const panelProps: PropDef[] = [
  { name: 'title', type: 'string', required: true, description: 'Título exibido no header.' },
  { name: 'description', type: 'string', description: 'Subtítulo abaixo do título.' },
  { name: 'color', type: 'PanelColor', default: "'neutral'", description: '10 cores semânticas: primary, secondary, tertiary, accent, success, warning, alert, info, destructive, neutral.' },
  { name: 'tone', type: "'solid' | 'soft' | 'outline'", default: "'soft'", description: 'Tom visual do header.' },
  { name: 'icon', type: 'LucideIcon', description: 'Ícone ao lado do título.' },
  { name: 'actions', type: 'ReactNode', description: 'Ações no canto direito do header (botões, menu).' },
  { name: 'children', type: 'ReactNode', description: 'Conteúdo do body.' },
  { name: 'footer', type: 'ReactNode', description: 'Conteúdo do footer.' },
];

const collapsibleProps: PropDef[] = [
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: 'Estado inicial de expansão.' },
  { name: '...PanelProps', type: '', description: 'Herda todas as props do Panel (exceto actions).' },
];

const statPanelProps: PropDef[] = [
  { name: 'title', type: 'string', required: true, description: 'Rótulo da métrica.' },
  { name: 'value', type: 'string | number', required: true, description: 'Valor principal em destaque.' },
  { name: 'delta', type: 'string', description: 'Variação (ex: "+12%"). Positivo = verde, negativo = vermelho.' },
  { name: 'helper', type: 'string', description: 'Texto auxiliar abaixo do valor.' },
  { name: 'color', type: 'PanelColor', default: "'primary'", description: 'Cor semântica do header.' },
  { name: 'tone', type: "'solid' | 'soft' | 'outline'", default: "'soft'", description: 'Tom visual.' },
  { name: 'icon', type: 'LucideIcon', description: 'Ícone no header.' },
];

const COLORS = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'destructive', 'neutral'] as const;

export default function PanelsPage() {
  return (
    <ComponentDoc
      summary="Painéis estruturados com header colorido, body e footer opcional. 10 cores semânticas × 3 tons (solid, soft, outline)."
      importPath="import { Panel, CollapsiblePanel, StatPanel } from '@/components/ui/panels'"
    >
      {/* ── Panel ── */}
      <DocSection title="Panel" description="Container genérico com header, body e footer.">
        <VariantSection
          title="Tons: solid, soft, outline"
          preview={
            <div className="grid gap-4 md:grid-cols-3">
              {(['solid', 'soft', 'outline'] as const).map((tone) => (
                <Panel key={tone} title={`Tom ${tone}`} color="primary" tone={tone} icon={Settings}>
                  Conteúdo do painel com tom <strong>{tone}</strong>.
                </Panel>
              ))}
            </div>
          }
          code={`<Panel title="Configurações" color="primary" tone="solid" icon={Settings}>
  Conteúdo do painel...
</Panel>`}
        />

        <VariantSection
          title="Todas as cores (soft)"
          preview={
            <div className="grid gap-3 md:grid-cols-4">
              {COLORS.map((c) => (
                <Panel key={c} title={c} color={c} tone="soft" icon={Shield}>
                  Exemplo {c}.
                </Panel>
              ))}
            </div>
          }
          code={`<Panel title="success" color="success" tone="soft" icon={Shield}>
  Conteúdo...
</Panel>`}
        />

        <VariantSection
          title="Com ações e footer"
          preview={
            <Panel
              title="Configurações do sistema"
              description="Gerencie permissões e segurança"
              color="info"
              tone="soft"
              icon={Settings}
              actions={<Button size="sm" variant="outline">Editar</Button>}
              footer={<span className="text-xs text-muted-foreground">Última atualização: hoje às 14:30</span>}
            >
              Conteúdo principal do painel com informações detalhadas.
            </Panel>
          }
          code={`<Panel
  title="Configurações do sistema"
  description="Gerencie permissões e segurança"
  color="info"
  tone="soft"
  icon={Settings}
  actions={<Button size="sm" variant="outline">Editar</Button>}
  footer={<span>Última atualização: hoje</span>}
>
  Conteúdo...
</Panel>`}
        />

        <PropsTable rows={panelProps} />
      </DocSection>

      {/* ── CollapsiblePanel ── */}
      <DocSection title="CollapsiblePanel" description="Panel com toggle de expansão no header.">
        <VariantSection
          title="Expansível"
          preview={
            <div className="grid gap-4 md:grid-cols-2">
              <CollapsiblePanel title="Aberto por padrão" color="accent" icon={Users} defaultOpen>
                Conteúdo visível ao abrir a página.
              </CollapsiblePanel>
              <CollapsiblePanel title="Fechado por padrão" color="warning" icon={Shield} defaultOpen={false}>
                Conteúdo inicialmente oculto.
              </CollapsiblePanel>
            </div>
          }
          code={`<CollapsiblePanel title="Filtros" color="accent" icon={Users} defaultOpen>
  Conteúdo expansível...
</CollapsiblePanel>

<CollapsiblePanel title="Avançado" color="warning" defaultOpen={false}>
  Conteúdo inicialmente oculto.
</CollapsiblePanel>`}
        />
        <PropsTable rows={collapsibleProps} />
      </DocSection>

      {/* ── StatPanel ── */}
      <DocSection title="StatPanel" description="Painel especializado para exibir KPIs e métricas.">
        <VariantSection
          title="KPI cards"
          preview={
            <div className="grid gap-4 md:grid-cols-3">
              <StatPanel title="Receita Mensal" value="R$ 48.200" delta="+12%" helper="vs. mês anterior" color="success" icon={TrendingUp} />
              <StatPanel title="Usuários Ativos" value="1.842" delta="+5%" helper="últimos 30 dias" color="primary" icon={Users} />
              <StatPanel title="Tickets Abertos" value="23" delta="-8%" helper="pendentes" color="warning" icon={BarChart3} />
            </div>
          }
          code={`<StatPanel
  title="Receita Mensal"
  value="R$ 48.200"
  delta="+12%"
  helper="vs. mês anterior"
  color="success"
  icon={TrendingUp}
/>`}
        />

        <VariantSection
          title="Tom solid"
          preview={
            <div className="grid gap-4 md:grid-cols-3">
              <StatPanel title="Vendas" value="342" delta="+18%" color="primary" tone="solid" icon={BarChart3} />
              <StatPanel title="Erros" value="7" delta="-3" color="destructive" tone="solid" icon={Shield} />
              <StatPanel title="Uptime" value="99.9%" color="success" tone="solid" icon={TrendingUp} />
            </div>
          }
          code={`<StatPanel title="Vendas" value="342" delta="+18%" color="primary" tone="solid" />`}
        />
        <PropsTable rows={statPanelProps} />
      </DocSection>

      <UsageNote type="tip">
        Use <code>StatPanel</code> em dashboards para KPIs. Para conteúdo genérico, prefira <code>Panel</code>.
        Combine com <code>CollapsiblePanel</code> para seções opcionais em formulários ou configurações.
      </UsageNote>
    </ComponentDoc>
  );
}
