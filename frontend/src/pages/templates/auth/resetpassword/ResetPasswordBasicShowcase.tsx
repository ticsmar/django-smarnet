import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

export default function ResetPasswordBasicShowcase() {
  return (
    <AuthLayout title="Reset Password" description="Recuperação de senha por e-mail" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center mb-1">Esqueceu a senha?</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">E-mail cadastrado</Label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Enviar link de recuperação
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Lembrou a senha? <a href="#" className="text-primary hover:underline font-semibold">Voltar ao login</a>
            </p>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
