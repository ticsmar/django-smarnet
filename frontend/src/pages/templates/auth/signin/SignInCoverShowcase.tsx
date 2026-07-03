import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Factory, ShieldCheck, Zap } from 'lucide-react';

export default function SignInCoverShowcase() {
  return (
    <AuthLayout title="Sign In - Cover" description="Login com layout split incluindo cover ilustrativo" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="relative bg-gradient-to-br from-primary to-secondary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div>
            <h3 className="text-2xl font-display font-bold mb-3">Gestão Industrial Completa</h3>
            <p className="text-sm opacity-90 mb-8">Automatize seus processos, controle estoques e tome decisões baseadas em dados em tempo real.</p>
            <div className="space-y-3">
              {[
                { icon: Factory, label: 'Controle de Produção' },
                { icon: ShieldCheck, label: 'Segurança Corporativa' },
                { icon: Zap, label: 'Performance em Tempo Real' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet · Todos os direitos reservados</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-foreground mb-1">Acesse sua conta</h2>
            <p className="text-sm text-muted-foreground mb-6">Entre com suas credenciais corporativas</p>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">E-mail corporativo</Label>
                <Input type="email" placeholder="usuario@empresa.com.br" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="rem" />
                  <label htmlFor="rem" className="text-xs text-muted-foreground cursor-pointer">Lembrar</label>
                </div>
                <a href="#" className="text-xs text-primary hover:underline">Esqueceu a senha?</a>
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Entrar
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Solicitar acesso? <a href="#" className="text-primary hover:underline font-semibold">Fale com TI</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
