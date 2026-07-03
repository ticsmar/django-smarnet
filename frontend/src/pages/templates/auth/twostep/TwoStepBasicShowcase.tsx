import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Smartphone } from 'lucide-react';

export default function TwoStepBasicShowcase() {
  return (
    <AuthLayout title="Two Step Verification" description="Verificação em duas etapas via OTP" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Smartphone size={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center mb-1">Verificação em 2 etapas</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enviamos um código de 6 dígitos para <strong className="text-foreground">+55 (11) ****-1234</strong>
          </p>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1,2,3,4,5,6].map((i) => (
                <input key={i} type="text" maxLength={1} className="w-11 h-12 rounded-lg border border-input bg-background text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              ))}
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Verificar código
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Não recebeu? <a href="#" className="text-primary hover:underline font-semibold">Reenviar em 30s</a>
            </p>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
