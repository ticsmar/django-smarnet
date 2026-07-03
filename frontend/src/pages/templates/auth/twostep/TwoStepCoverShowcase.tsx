import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Smartphone, ShieldCheck } from 'lucide-react';

export default function TwoStepCoverShowcase() {
  return (
    <AuthLayout title="Two Step Verification - Cover" description="2FA com layout split" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-gradient-to-br from-secondary to-primary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div>
            <ShieldCheck size={48} className="mb-4 opacity-80" />
            <h3 className="text-2xl font-display font-bold mb-3">Camada extra de proteção</h3>
            <p className="text-sm opacity-90">A verificação em duas etapas protege sua conta mesmo se sua senha for comprometida.</p>
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Smartphone size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Digite o código</h2>
            <p className="text-sm text-muted-foreground mb-6">Enviado para +55 (11) ****-1234</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[1,2,3,4,5,6].map((i) => (
                  <input key={i} type="text" maxLength={1} className="flex-1 h-12 rounded-lg border border-input bg-background text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                ))}
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Confirmar
              </button>
              <p className="text-center text-xs text-muted-foreground">
                <a href="#" className="text-primary hover:underline font-semibold">Reenviar código</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
