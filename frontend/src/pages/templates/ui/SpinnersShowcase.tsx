import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SpinnersShowcase() {
  return (
    <UIShowcaseLayout title="Spinners" description="Indicadores de carregamento para feedback visual ao usuário.">
      <ShowcaseSection title="Spinners Básicos">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-primary" size={24} />
            <span className="text-xs text-muted-foreground">Lucide</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">Border</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-xs text-muted-foreground">Dots</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full animate-pulse bg-primary/30" />
            <span className="text-xs text-muted-foreground">Pulse</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">SM</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">MD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">LG</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">XL</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cores de Status">
        <div className="flex items-center gap-6">
          {[
            { color: 'border-t-primary', label: 'Primary' },
            { color: 'border-t-secondary', label: 'Secondary' },
            { color: 'border-t-status-success', label: 'Success' },
            { color: 'border-t-status-warning', label: 'Warning' },
            { color: 'border-t-destructive', label: 'Error' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className={`w-6 h-6 border-2 border-muted rounded-full animate-spin ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Em Botão">
        <div className="flex flex-wrap gap-3">
          <Button disabled><Loader2 size={16} className="animate-spin" /> Salvando...</Button>
          <Button variant="outline" disabled><RefreshCw size={16} className="animate-spin" /> Atualizando...</Button>
          <Button variant="secondary" disabled><Loader2 size={16} className="animate-spin" /> Carregando...</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Overlay de Carregamento">
        <div className="relative h-40 rounded-xl bg-surface-container-high/50 border border-border flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Conteúdo da tabela...</p>
          <div className="absolute inset-0 rounded-xl bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground mt-3">Carregando dados...</p>
          </div>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
