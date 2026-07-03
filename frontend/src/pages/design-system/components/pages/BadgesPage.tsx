import { Bell, Mail, User } from 'lucide-react';
import { StatusBadge, CounterBadge, TrendBadge, Badge } from '@/components/ui/badges';
import { Button } from '@/components/ui/button';
import { ComponentDoc, DocSection, VariantSection, PropsTable } from '../_docs';

export default function BadgesPage() {
  return (
    <ComponentDoc
      summary="Badges especializados: StatusBadge (com dot colorido), CounterBadge (notificações com overlay) e TrendBadge (tendência ↑/↓ com cor semântica)."
      importPath="@/components/ui/badges"
    >
      <DocSection title="StatusBadge" description="Status com dot colorido. 10 cores semânticas.">
        <VariantSection
          title="Variantes"
          preview={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label="Ativo" color="success" />
              <StatusBadge label="Pendente" color="warning" />
              <StatusBadge label="Cancelado" color="destructive" />
              <StatusBadge label="Em revisão" color="info" />
              <StatusBadge label="Rascunho" color="neutral" />
              <StatusBadge label="Ao vivo" color="success" pulse />
              <StatusBadge label="Sólido" color="primary" tone="solid" />
              <StatusBadge label="Outline" color="secondary" tone="outline" showDot={false} />
            </div>
          }
          code={`<StatusBadge label="Ativo" color="success" />
<StatusBadge label="Ao vivo" color="success" pulse />
<StatusBadge label="Sólido" color="primary" tone="solid" />`}
        />
        <PropsTable
          rows={[
            { name: 'label', type: 'string', required: true, description: 'Texto do badge.' },
            { name: 'color', type: 'BadgeColor', default: '"success"', description: 'Cor semântica.' },
            { name: 'tone', type: '"solid" | "soft" | "outline"', default: '"soft"', description: 'Tom visual.' },
            { name: 'showDot', type: 'boolean', default: 'true', description: 'Mostra dot antes do label.' },
            { name: 'pulse', type: 'boolean', default: 'false', description: 'Anima o dot (ao vivo).' },
          ]}
        />
      </DocSection>

      <DocSection title="CounterBadge" description="Contador de notificações com modo dot e overlay.">
        <VariantSection
          title="Inline e overlay"
          preview={
            <div className="flex items-center gap-6">
              <CounterBadge count={3} />
              <CounterBadge count={42} color="primary" />
              <CounterBadge count={150} max={99} />
              <CounterBadge dot color="success" />

              <CounterBadge count={5} position="top-right">
                <Button variant="outline" size="icon"><Bell size={16} /></Button>
              </CounterBadge>
              <CounterBadge dot color="success" position="bottom-right">
                <Button variant="outline" size="icon"><User size={16} /></Button>
              </CounterBadge>
              <CounterBadge count={12} position="top-right" color="warning">
                <Button variant="outline" size="icon"><Mail size={16} /></Button>
              </CounterBadge>
            </div>
          }
          code={`<CounterBadge count={3} />
<CounterBadge count={150} max={99} />

<CounterBadge count={5} position="top-right">
  <Button variant="outline" size="icon"><Bell /></Button>
</CounterBadge>

<CounterBadge dot color="success" position="bottom-right">
  <Avatar />
</CounterBadge>`}
        />
        <PropsTable
          rows={[
            { name: 'count', type: 'number', default: '0', description: 'Valor numérico.' },
            { name: 'max', type: 'number', default: '99', description: 'Limite — exibe "{max}+" acima.' },
            { name: 'color', type: 'BadgeColor', default: '"destructive"', description: 'Cor.' },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Indicador sem número.' },
            { name: 'hideOnZero', type: 'boolean', default: 'true', description: 'Esconde quando count=0.' },
            { name: 'position', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', description: 'Sobrepõe a um filho.' },
            { name: 'children', type: 'ReactNode', description: 'Elemento alvo do overlay (ícone, avatar).' },
            { name: 'ring', type: 'boolean', description: 'Borda externa para destacar.' },
          ]}
        />
      </DocSection>

      <DocSection title="TrendBadge" description="Tendência ↑/↓ com cor semântica automática.">
        <VariantSection
          title="Variantes"
          preview={
            <div className="flex flex-wrap items-center gap-3">
              <TrendBadge value={12.4} />
              <TrendBadge value={-5.2} />
              <TrendBadge value={0} />
              <TrendBadge value={3.8} suffix="" />
              <TrendBadge value={-8.1} invertColors />
              <TrendBadge value={2.5} hideIcon />
              <TrendBadge value={15} size="sm" />
            </div>
          }
          code={`<TrendBadge value={12.4} />          // ↑ verde +12.4%
<TrendBadge value={-5.2} />          // ↓ vermelho -5.2%
<TrendBadge value={-8.1} invertColors />  // ↓ verde (subir é ruim)
<TrendBadge value={3.8} suffix="" />  // sem sufixo`}
        />
        <PropsTable
          rows={[
            { name: 'value', type: 'number', required: true, description: 'Valor — sinal define cor/ícone.' },
            { name: 'direction', type: '"up" | "down" | "flat"', description: 'Sobrescreve direção deduzida.' },
            { name: 'suffix', type: 'string', default: '"%"', description: 'Sufixo após o número.' },
            { name: 'invertColors', type: 'boolean', default: 'false', description: 'Inverte semântica (subir = ruim).' },
            { name: 'hideIcon', type: 'boolean', default: 'false', description: 'Oculta a seta.' },
            { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Tamanho.' },
            { name: 'precision', type: 'number', default: '1', description: 'Casas decimais.' },
          ]}
        />
      </DocSection>

      <DocSection title="Badge (primitivo)" description="Wrapper shadcn de baixo nível.">
        <VariantSection
          title="Variantes base"
          preview={
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          }
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>`}
        />
      </DocSection>
    </ComponentDoc>
  );
}
