import { useState } from 'react';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormInput, FormTextarea } from '@/components/ui/forms';

export default function InputsShowcase() {
  const [showPass, setShowPass] = useState(false);

  return (
    <FormsShowcaseLayout title="Inputs" subtitle="Form Elements" description="Campos de entrada de texto com diferentes variantes, estados e tamanhos.">
      <ShowcaseSection title="Tamanhos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Small" size="sm" placeholder="Input small" />
          <FormInput label="Default" size="md" placeholder="Input default" />
          <FormInput label="Large" size="lg" placeholder="Input large" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Ícones">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Busca"
            placeholder="Pesquisar..."
            startIcon={<Search size={16} />}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="email@empresa.com"
            startIcon={<Mail size={16} />}
          />
          <FormInput
            label="Senha"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            startIcon={<Lock size={16} />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput label="Normal" placeholder="Campo normal" />
          <FormInput label="Desabilitado" placeholder="Desabilitado" disabled />
          <FormInput label="Somente Leitura" defaultValue="Valor fixo" readOnly />
          <FormInput label="Com valor" defaultValue="João Silva" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Validação">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Válido"
            defaultValue="contato@empresa.com"
            success="Email válido"
          />
          <FormInput
            label="Inválido"
            defaultValue="email-invalido"
            error="Formato de email inválido"
          />
          <FormInput
            label="Obrigatório"
            required
            placeholder="Campo obrigatório"
            status="warning"
            hint="Este campo é obrigatório"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Prefixo e Sufixo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Moeda" placeholder="0,00" prefix="R$" />
          <FormInput label="Peso" placeholder="0.000" suffix="kg" />
          <FormInput label="URL" placeholder="www.site.com.br" prefix="https://" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Textarea">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormTextarea
            label="Observações"
            placeholder="Digite suas observações aqui..."
            maxLength={500}
            showCounter
            hint="Máximo 500 caracteres"
            textareaClassName="min-h-[120px]"
          />
          <FormTextarea
            label="Descrição (Desabilitado)"
            placeholder="Textarea desabilitado"
            disabled
            textareaClassName="min-h-[120px]"
          />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
