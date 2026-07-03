import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormSelect, FormSelectOption } from '@/components/ui/forms';

const estados: FormSelectOption[] = [
  'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná', 'Rio Grande do Sul',
  'Santa Catarina', 'Bahia', 'Pernambuco', 'Ceará', 'Goiás',
].map(e => ({ value: e, label: e }));

const categorias: FormSelectOption[] = ['Metalúrgica', 'Automação', 'Elétrica', 'Hidráulica', 'Pneumática']
  .map(c => ({ value: c, label: c }));

const prioridades: FormSelectOption[] = [
  { value: 'baixa', label: '🟢 Baixa' },
  { value: 'media', label: '🟡 Média' },
  { value: 'alta', label: '🟠 Alta' },
  { value: 'critica', label: '🔴 Crítica' },
];

export default function FormSelectShowcase() {
  return (
    <FormsShowcaseLayout title="Form Select" subtitle="Form Elements" description="Componentes de seleção nativa com variantes e estados.">
      <ShowcaseSection title="Select Padrão">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Estado" placeholder="Selecione um estado" options={estados} />
          <FormSelect label="Categoria" placeholder="Selecione a categoria" options={categorias} />
          <FormSelect label="Prioridade" defaultValue="media" options={prioridades} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Small" size="sm" placeholder="Selecione" options={categorias} />
          <FormSelect label="Default" size="md" placeholder="Selecione" options={categorias} />
          <FormSelect label="Large" size="lg" placeholder="Selecione" options={categorias} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Normal" placeholder="Selecione" options={categorias} />
          <FormSelect label="Desabilitado" placeholder="Desabilitado" disabled options={categorias} />
          <FormSelect
            label="Com erro"
            required
            placeholder="Selecione"
            options={categorias}
            error="Seleção obrigatória"
          />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
