import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FloatingLabelInput, FloatingLabelSelect, FloatingLabelTextarea } from '@/components/ui/forms';

export default function FloatingLabelsShowcase() {
  return (
    <FormsShowcaseLayout title="Floating Labels" description="Campos com labels flutuantes que se movem ao receber foco ou valor.">
      <ShowcaseSection title="Inputs com Label Flutuante">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FloatingLabelInput label="Razão Social" />
          <FloatingLabelInput label="CNPJ" />
          <FloatingLabelInput label="Email" type="email" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Valor Padrão">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FloatingLabelInput label="Nome Fantasia" defaultValue="Nova Smar S/A" />
          <FloatingLabelInput label="Cidade" defaultValue="São Paulo" />
          <FloatingLabelInput label="UF" defaultValue="SP" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Select & Textarea">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelSelect label="Estado" options={['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná']} />
          <FloatingLabelSelect label="Categoria" options={['Metalúrgica', 'Automação', 'Elétrica']} />
        </div>
        <div className="mt-4">
          <FloatingLabelTextarea label="Observações" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FloatingLabelInput label="Normal" />
          <FloatingLabelInput label="Desabilitado" disabled />
          <FloatingLabelInput label="Com Erro" defaultValue="valor-invalido" error="Formato inválido" />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
