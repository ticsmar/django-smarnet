import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, LogOut } from 'lucide-react';

export default function LockScreenCoverShowcase() {
  return (
    <AuthLayout title="Lock Screen - Cover" description="Tela de bloqueio com layout split" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-gradient-to-br from-primary to-secondary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div>
            <Lock size={48} className="mb-4 opacity-80" />
            <h3 className="text-2xl font-display font-bold mb-3">Sessão bloqueada</h3>
            <p className="text-sm opacity-90">Sua conta permanece segura. Insira sua senha para retomar de onde parou.</p>
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3">MS</div>
              <h2 className="text-lg font-bold text-foreground">Maria Silva</h2>
              <p className="text-xs text-muted-foreground">Última atividade há 15 minutos</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">Senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Desbloquear sessão
              </button>
              <button className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                <LogOut size={13} /> Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
