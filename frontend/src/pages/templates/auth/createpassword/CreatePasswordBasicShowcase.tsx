import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

export default function CreatePasswordBasicShowcase() {
  return (
    <AuthLayout title="Create Password" description="Definição de nova senha com indicador de força" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <h2 className="text-xl font-bold text-foreground text-center mb-1">Criar nova senha</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Sua nova senha deve ser diferente das anteriores</p>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">Nova senha</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Confirmar senha</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="bg-background rounded-lg border border-border/40 p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground mb-2">Sua senha deve conter:</p>
              {[
                { ok: true, t: 'Mínimo 8 caracteres' },
                { ok: true, t: 'Uma letra maiúscula' },
                { ok: false, t: 'Um número' },
                { ok: false, t: 'Um símbolo especial' },
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.ok ? 'bg-status-success/10 text-status-success' : 'bg-muted text-muted-foreground'}`}>
                    <Check size={10} />
                  </div>
                  <span className={req.ok ? 'text-foreground' : 'text-muted-foreground'}>{req.t}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Salvar nova senha
            </button>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
