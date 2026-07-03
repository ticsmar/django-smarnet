import { AuthLayout, AuthCard, AuthBrand } from './AuthLayout';
import { Wrench } from 'lucide-react';

export default function UnderMaintenanceShowcase() {
  return (
    <AuthLayout title="Under Maintenance" description="Página de manutenção programada">
      <div className="max-w-2xl mx-auto">
        <AuthCard className="text-center">
          <AuthBrand />
          <div className="w-20 h-20 rounded-2xl bg-status-warning/10 flex items-center justify-center mx-auto mb-4">
            <Wrench size={32} className="text-status-warning" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Em manutenção</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Estamos realizando uma manutenção programada para melhorar nossos serviços. Voltaremos em breve.
          </p>
          <div className="bg-background rounded-xl border border-border/40 p-5 max-w-md mx-auto mb-6">
            <p className="text-xs text-muted-foreground mb-1">Previsão de retorno</p>
            <p className="text-lg font-bold text-foreground">17 Abr 2025 · 23:00 BRT</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Acompanhe atualizações em <a href="#" className="text-primary hover:underline font-semibold">status.smarnet.com.br</a>
          </p>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
