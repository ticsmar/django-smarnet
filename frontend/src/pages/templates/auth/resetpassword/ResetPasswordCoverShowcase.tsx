import { AuthLayout, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, KeyRound, ShieldCheck } from 'lucide-react';

export default function ResetPasswordCoverShowcase() {
  return (
    <AuthLayout title="Reset Password - Cover" description="Recuperação de senha com layout split" variant="cover">
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-gradient-to-br from-primary to-secondary p-10 hidden lg:flex flex-col justify-between text-primary-foreground">
          <AuthBrand onDark />
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold">Recupere o acesso em 3 passos</h3>
            {[
              { icon: Mail, t: '1. Informe seu e-mail', d: 'Use o e-mail cadastrado na plataforma' },
              { icon: KeyRound, t: '2. Receba o link', d: 'Verifique sua caixa de entrada' },
              { icon: ShieldCheck, t: '3. Defina nova senha', d: 'Mínimo 8 caracteres com símbolos' },
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <s.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold">{s.t}</p>
                  <p className="text-xs opacity-80 mt-0.5">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs opacity-70">© 2025 SmarNet</p>
        </div>
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-foreground mb-1">Recuperar senha</h2>
            <p className="text-sm text-muted-foreground mb-6">Enviaremos um link para o seu e-mail</p>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">E-mail</Label>
                <Input type="email" placeholder="seu@email.com" />
              </div>
              <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Enviar link
              </button>
              <p className="text-center text-xs text-muted-foreground">
                <a href="#" className="text-primary hover:underline font-semibold">Voltar ao login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
