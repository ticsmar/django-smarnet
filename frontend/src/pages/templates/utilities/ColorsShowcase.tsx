import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const semanticColors = [
  { name: 'background', cls: 'bg-background', text: 'text-foreground' },
  { name: 'foreground', cls: 'bg-foreground', text: 'text-background' },
  { name: 'primary', cls: 'bg-primary', text: 'text-primary-foreground' },
  { name: 'secondary', cls: 'bg-secondary', text: 'text-secondary-foreground' },
  { name: 'muted', cls: 'bg-muted', text: 'text-muted-foreground' },
  { name: 'accent', cls: 'bg-accent', text: 'text-accent-foreground' },
  { name: 'destructive', cls: 'bg-destructive', text: 'text-destructive-foreground' },
  { name: 'card', cls: 'bg-card', text: 'text-card-foreground' },
  { name: 'popover', cls: 'bg-popover', text: 'text-popover-foreground' },
];

const statusColors = [
  { name: 'Success', bg: 'bg-success', text: 'text-success' },
  { name: 'Warning', bg: 'bg-warning', text: 'text-warning' },
  { name: 'Alert', bg: 'bg-alert', text: 'text-alert' },
  { name: 'Destructive', bg: 'bg-destructive', text: 'text-destructive' },
  { name: 'Info', bg: 'bg-info', text: 'text-info' },
];

export default function ColorsShowcase() {
  return (
    <UtilitiesLayout title="Colors" description="Paleta de cores semânticas do design system.">
      <ShowcaseSection title="Cores Semânticas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {semanticColors.map(c => (
            <div key={c.name} className="flex items-stretch rounded-lg overflow-hidden border border-border/40">
              <div className={`${c.cls} ${c.text} w-20 flex items-center justify-center text-xs font-mono shrink-0`}>Aa</div>
              <div className="px-4 py-3 flex-1">
                <div className="text-sm font-semibold text-foreground">{c.name}</div>
                <code className="text-xs text-muted-foreground">{c.cls}</code>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cores de Status">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            {statusColors.map(c => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-xl ${c.bg}`} />
                <span className={`text-xs font-semibold ${c.text}`}>{c.name}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Botões</div>
            <div className="flex flex-wrap gap-3">
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="alert">Alert</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="info">Info</Button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Badges</div>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success text-success-foreground hover:bg-success/90">Success</Badge>
              <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Warning</Badge>
              <Badge className="bg-alert text-alert-foreground hover:bg-alert/90">Alert</Badge>
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Destructive</Badge>
              <Badge className="bg-info text-info-foreground hover:bg-info/90">Info</Badge>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Soft / Outline</div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-success/15 text-success border border-success/30">Success</span>
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-warning/15 text-warning border border-warning/30">Warning</span>
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-alert/15 text-alert border border-alert/30">Alert</span>
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-destructive/15 text-destructive border border-destructive/30">Destructive</span>
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-info/15 text-info border border-info/30">Info</span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Opacidades">
        <div className="flex flex-wrap gap-3">
          {[
            { o: 10, cls: 'bg-primary/10' },
            { o: 20, cls: 'bg-primary/20' },
            { o: 30, cls: 'bg-primary/30' },
            { o: 40, cls: 'bg-primary/40' },
            { o: 50, cls: 'bg-primary/50' },
            { o: 60, cls: 'bg-primary/60' },
            { o: 70, cls: 'bg-primary/70' },
            { o: 80, cls: 'bg-primary/80' },
            { o: 90, cls: 'bg-primary/90' },
            { o: 100, cls: 'bg-primary' },
          ].map(({ o, cls }) => (
            <div key={o} className="flex flex-col items-center gap-1">
              <div className={`w-14 h-14 rounded-lg ${cls}`} />
              <code className="text-[10px] text-muted-foreground">{o}%</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Texto sobre Backgrounds">
        <div className="space-y-2">
          {[
            { bg: 'bg-background', fg: 'text-foreground', label: 'Default' },
            { bg: 'bg-primary', fg: 'text-primary-foreground', label: 'Primary' },
            { bg: 'bg-secondary', fg: 'text-secondary-foreground', label: 'Secondary' },
            { bg: 'bg-muted', fg: 'text-muted-foreground', label: 'Muted' },
            { bg: 'bg-destructive', fg: 'text-destructive-foreground', label: 'Destructive' },
          ].map(c => (
            <div key={c.label} className={`${c.bg} ${c.fg} px-4 py-3 rounded-lg text-sm font-medium`}>
              {c.label}: Texto de exemplo sobre fundo {c.label.toLowerCase()}
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
