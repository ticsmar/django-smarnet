import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';

export default function LockScreenBasicShowcase() {
  return (
    <AuthLayout title="Lock Screen" description="Tela de bloqueio para sessão suspensa" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3">
              MS
            </div>
            <h2 className="text-lg font-bold text-foreground">Maria Silva</h2>
            <p className="text-xs text-muted-foreground">maria.silva@smarnet.com.br</p>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Sua sessão está bloqueada. Digite sua senha para continuar.
          </p>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">Senha</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Desbloquear
            </button>
            <button className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
              <LogOut size={13} /> Não é você? Sair
            </button>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
