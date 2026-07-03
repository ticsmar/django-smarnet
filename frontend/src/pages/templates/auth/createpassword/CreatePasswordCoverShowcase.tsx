import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

export default function CreatePasswordCoverShowcase() {
  return (
    <AuthLayout title="Create Password - Cover" description="Definição de nova senha com layout split" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-gradient-to-br from-secondary to-primary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div>
            <Lock size={40} className="mb-4 opacity-80" />
            <h3 className="text-2xl font-display font-bold mb-3">Segurança em primeiro lugar</h3>
            <p className="text-sm opacity-90">Use uma senha forte e única para proteger sua conta corporativa.</p>
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-foreground mb-1">Definir nova senha</h2>
            <p className="text-sm text-muted-foreground mb-6">Crie uma senha segura para sua conta</p>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">Nova senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Confirmar senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Salvar senha
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
