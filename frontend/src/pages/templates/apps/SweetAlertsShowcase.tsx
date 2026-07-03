import { useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { CheckCircle2, AlertTriangle, XCircle, Info, HelpCircle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AlertType = 'success' | 'warning' | 'error' | 'info' | 'confirm' | 'delete' | null;

const alertConfig = {
  success: { icon: CheckCircle2, title: 'Sucesso!', message: 'Operação realizada com sucesso.', color: 'text-green-500', bg: 'bg-green-500/10' },
  warning: { icon: AlertTriangle, title: 'Atenção!', message: 'Esta ação pode ter consequências inesperadas.', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  error: { icon: XCircle, title: 'Erro!', message: 'Ocorreu um erro ao processar sua solicitação.', color: 'text-destructive', bg: 'bg-destructive/10' },
  info: { icon: Info, title: 'Informação', message: 'Aqui está uma informação importante para você.', color: 'text-primary', bg: 'bg-primary/10' },
  confirm: { icon: HelpCircle, title: 'Tem certeza?', message: 'Deseja prosseguir com esta ação?', color: 'text-primary', bg: 'bg-primary/10' },
  delete: { icon: Trash2, title: 'Excluir item?', message: 'Esta ação não pode ser desfeita. Todos os dados serão removidos permanentemente.', color: 'text-destructive', bg: 'bg-destructive/10' },
};

export default function SweetAlertsShowcase() {
  const [active, setActive] = useState<AlertType>(null);

  return (
    <AppsLayout title="Sweet Alerts" description="Alertas modais estilizados para feedback e confirmações de usuário.">
      <ShowcaseSection title="Tipos de Alerta">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.keys(alertConfig) as AlertType[]).filter(Boolean).map(type => {
            const cfg = alertConfig[type!];
            const Icon = cfg.icon;
            return (
              <button key={type} onClick={() => setActive(type)}
                className="p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors text-left space-y-2">
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center`}>
                  <Icon size={20} className={cfg.color} />
                </div>
                <p className="text-sm font-semibold text-foreground">{cfg.title}</p>
                <p className="text-xs text-muted-foreground">Clique para ver</p>
              </button>
            );
          })}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alertas Inline">
        <div className="space-y-3">
          {(['success', 'warning', 'error', 'info'] as const).map(type => {
            const cfg = alertConfig[type];
            const Icon = cfg.icon;
            return (
              <div key={type} className={`flex items-start gap-3 p-4 rounded-xl border border-border ${cfg.bg}`}>
                <Icon size={18} className={`${cfg.color} mt-0.5 shrink-0`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{cfg.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{cfg.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ShowcaseSection>

      {/* Modal */}
      {active && (() => {
        const cfg = alertConfig[active];
        const Icon = cfg.icon;
        return (
          <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center" onClick={() => setActive(null)}>
            <div className="bg-surface-container border border-border rounded-2xl p-6 max-w-sm w-full mx-4 text-center space-y-4" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-muted-foreground" onClick={() => setActive(null)}><X size={16} /></button>
              <div className={`w-16 h-16 rounded-2xl ${cfg.bg} flex items-center justify-center mx-auto`}>
                <Icon size={32} className={cfg.color} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{cfg.title}</h3>
              <p className="text-sm text-muted-foreground">{cfg.message}</p>
              <div className="flex gap-2 justify-center">
                {(active === 'confirm' || active === 'delete') && (
                  <Button variant="outline" onClick={() => setActive(null)}>Cancelar</Button>
                )}
                <Button variant={active === 'delete' ? 'destructive' : 'default'} onClick={() => setActive(null)}>
                  {active === 'delete' ? 'Excluir' : active === 'confirm' ? 'Confirmar' : 'OK'}
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </AppsLayout>
  );
}
