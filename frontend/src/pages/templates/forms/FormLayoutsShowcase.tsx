import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormSection,
  FormGrid,
  FormRow,
  FormInline,
  FormActions,
} from '@/components/ui/forms';
import { Button } from '@/components/ui/button';

const ufOptions = ['SP', 'RJ', 'MG', 'PR', 'RS', 'SC'].map((uf) => ({ value: uf, label: uf }));
const unidadeOptions = [
  { value: 'un', label: 'UN' },
  { value: 'kg', label: 'KG' },
  { value: 'mt', label: 'MT' },
];

export default function FormLayoutsShowcase() {
  return (
    <FormsShowcaseLayout
      title="Form Layouts"
      description="Diferentes padrões de layout para formulários: vertical, horizontal, inline e em grid."
    >
      <ShowcaseSection title="Layout Vertical (Padrão)">
        <div className="max-w-md space-y-4">
          <FormInput label="Nome Completo" placeholder="Digite seu nome" />
          <FormInput type="email" label="Email" placeholder="email@empresa.com" />
          <FormTextarea label="Mensagem" placeholder="Sua mensagem..." rows={3} />
          <Button className="w-full">Enviar</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Layout Horizontal (FormRow)">
        <div className="space-y-4 max-w-2xl">
          <FormRow label="Nome Completo">
            <FormInput placeholder="Digite seu nome" />
          </FormRow>
          <FormRow label="Email">
            <FormInput type="email" placeholder="email@empresa.com" />
          </FormRow>
          <FormRow label="Telefone">
            <FormInput placeholder="(00) 00000-0000" />
          </FormRow>
          <FormActions>
            <Button>Salvar</Button>
          </FormActions>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Layout Inline (FormInline)">
        <FormInline>
          <FormInput label="Código" placeholder="COD" containerClassName="w-24" />
          <FormInput label="Produto" placeholder="Nome do produto" containerClassName="w-48" />
          <FormInput label="Qtd" type="number" placeholder="0" containerClassName="w-20" />
          <FormSelect
            label="Unidade"
            options={unidadeOptions}
            placeholder="UN"
            triggerClassName="w-24"
          />
          <Button>Adicionar</Button>
        </FormInline>
      </ShowcaseSection>

      <ShowcaseSection title="Grid Layout (Cadastro)">
        <FormGrid cols={3}>
          <FormInput label="Razão Social" placeholder="Razão social da empresa" />
          <FormInput label="Nome Fantasia" placeholder="Nome fantasia" />
          <FormInput label="CNPJ" placeholder="00.000.000/0000-00" />
          <FormInput label="Inscrição Estadual" placeholder="000.000.000.000" />
          <FormInput label="Telefone" placeholder="(00) 00000-0000" />
          <FormInput type="email" label="Email" placeholder="contato@empresa.com" />
          <div className="sm:col-span-2">
            <FormInput label="Endereço" placeholder="Rua, número, complemento" />
          </div>
          <FormInput label="Cidade" placeholder="Cidade" />
          <FormSelect label="Estado" options={ufOptions} placeholder="UF" />
          <FormInput label="CEP" placeholder="00000-000" />
        </FormGrid>
        <FormActions className="mt-6">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar Cadastro</Button>
        </FormActions>
      </ShowcaseSection>

      <ShowcaseSection title="Formulário com Seções (FormSection)">
        <div className="space-y-6">
          <FormSection title="Dados Pessoais">
            <FormGrid cols={3}>
              <FormInput label="Nome" placeholder="Nome" />
              <FormInput label="Sobrenome" placeholder="Sobrenome" />
              <FormInput label="CPF" placeholder="000.000.000-00" />
            </FormGrid>
          </FormSection>
          <FormSection title="Endereço" description="Endereço principal de cobrança">
            <FormGrid cols={3}>
              <div className="sm:col-span-2">
                <FormInput label="Logradouro" placeholder="Rua / Avenida" />
              </div>
              <FormInput label="Número" placeholder="Nº" />
            </FormGrid>
          </FormSection>
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
