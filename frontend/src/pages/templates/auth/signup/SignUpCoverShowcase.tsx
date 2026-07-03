import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignUpCoverShowcase() {
  return (
    <AuthLayout title="Sign Up - Cover" description="Cadastro com layout split e benefícios" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="relative bg-gradient-to-br from-secondary to-primary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div>
            <h3 className="text-2xl font-display font-bold mb-3">Comece em minutos</h3>
            <p className="text-sm opacity-90 mb-8">Mais de 500 indústrias já confiam na nossa plataforma para gestão integrada.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '500+', l: 'Empresas' },
                { v: '99.9%', l: 'Uptime' },
                { v: '30min', l: 'Setup médio' },
                { v: '24/7', l: 'Suporte' },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-display font-bold">{s.v}</p>
                  <p className="text-xs opacity-80 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-foreground mb-1">Criar nova conta</h2>
            <p className="text-sm text-muted-foreground mb-6">Cadastre-se para acessar a plataforma</p>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">Nome completo</Label>
                <Input placeholder="João Silva" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">E-mail corporativo</Label>
                <Input type="email" placeholder="usuario@empresa.com.br" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Empresa</Label>
                <Input placeholder="Razão Social" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Senha</Label>
                <Input type="password" placeholder="Mínimo 8 caracteres" />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="terms2" className="mt-0.5" />
                <label htmlFor="terms2" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                  Aceito os termos e a política de privacidade
                </label>
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
