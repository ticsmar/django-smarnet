import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignUpBasicShowcase() {
  return (
    <AuthLayout title="Sign Up" description="Tela de cadastro básica com validação de senha" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <h2 className="text-xl font-bold text-foreground text-center mb-1">Criar conta</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Preencha seus dados para começar</p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1.5">Nome</Label>
                <Input placeholder="João" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Sobrenome</Label>
                <Input placeholder="Silva" />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1.5">E-mail</Label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Senha</Label>
              <Input type="password" placeholder="Mínimo 8 caracteres" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Confirmar senha</Label>
              <Input type="password" placeholder="Digite novamente" />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" />
              <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                Aceito os <a href="#" className="text-primary hover:underline">Termos de Uso</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
              </label>
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Criar Conta
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Já tem conta? <a href="#" className="text-primary hover:underline font-semibold">Entrar</a>
            </p>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
