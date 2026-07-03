import { AuthLayout, AuthCard, AuthBrand } from '../AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye } from 'lucide-react';

export default function SignInBasicShowcase() {
  return (
    <AuthLayout title="Sign In" description="Tela de login básica com formulário centralizado" variant="basic">
      <div className="max-w-md mx-auto">
        <AuthCard>
          <AuthBrand />
          <h2 className="text-xl font-bold text-foreground text-center mb-1">Bem-vindo de volta</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Faça login para acessar sua conta</p>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">E-mail</Label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">Esqueceu?</a>
              </div>
              <div className="relative">
                <Input type="password" placeholder="••••••••" />
                <Eye size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">Manter conectado</label>
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Entrar
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <span className="relative bg-surface-container px-3 text-xs text-muted-foreground flex justify-center">ou continue com</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 rounded-lg border border-border/60 text-sm text-foreground hover:bg-surface-container-low transition-colors">Google</button>
              <button className="py-2 rounded-lg border border-border/60 text-sm text-foreground hover:bg-surface-container-low transition-colors">Microsoft</button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Não tem conta? <a href="#" className="text-primary hover:underline font-semibold">Cadastre-se</a>
            </p>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
