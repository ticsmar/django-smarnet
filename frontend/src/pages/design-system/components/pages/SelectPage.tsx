import { useState } from 'react';
import { FormSelect, FormCombobox } from '@/components/ui/forms';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

const setores = [
  { value: 'prod', label: 'Produção' },
  { value: 'qual', label: 'Qualidade' },
  { value: 'log', label: 'Logística' },
  { value: 'adm', label: 'Administrativo' },
];

const tags = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const groupedOptions = [
  {
    label: 'Sudeste',
    options: [
      { value: 'sp', label: 'São Paulo' },
      { value: 'rj', label: 'Rio de Janeiro' },
      { value: 'mg', label: 'Minas Gerais' },
    ],
  },
  {
    label: 'Sul',
    options: [
      { value: 'rs', label: 'Rio Grande do Sul' },
      { value: 'sc', label: 'Santa Catarina' },
      { value: 'pr', label: 'Paraná' },
    ],
  },
];

export default function SelectPage() {
  const [setor, setSetor] = useState<string | undefined>();
  const [comboValue, setComboValue] = useState<any>(null);
  const [multiValue, setMultiValue] = useState<any>([]);

  return (
    <ComponentDoc
      summary="Selects nativos (FormSelect, baseados em Radix) e avançados (FormCombobox, com busca/multi/criação dinâmica via react-select). Ambos integrados ao FormFieldShell."
      importPath="@/components/ui/forms"
    >
      {/* ============== FormSelect ============== */}
      <DocSection
        title="FormSelect"
        description="Select nativo (driver Radix) data-driven com options, validação visual e tamanhos."
      >
        <VariantSection
          title="Select básico"
          preview={
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <FormSelect
                label="Setor"
                placeholder="Selecione..."
                options={setores}
                value={setor}
                onValueChange={setSetor}
                required
              />
              <FormSelect
                label="Estado"
                placeholder="Selecione..."
                options={[
                  { value: 'sp', label: 'São Paulo' },
                  { value: 'rj', label: 'Rio de Janeiro' },
                  { value: 'mg', label: 'Minas Gerais' },
                ]}
                hint="UF da matriz"
              />
            </div>
          }
          code={`const [setor, setSetor] = useState<string | undefined>();

<FormSelect
  label="Setor"
  placeholder="Selecione..."
  options={[
    { value: 'prod', label: 'Produção' },
    { value: 'qual', label: 'Qualidade' },
  ]}
  value={setor}
  onValueChange={setSetor}
  required
/>`}
        />

        <VariantSection
          title="Tamanhos e validação"
          preview={
            <div className="space-y-3 max-w-md">
              <FormSelect label="Small" size="sm" placeholder="..." options={setores} />
              <FormSelect label="Medium" size="md" placeholder="..." options={setores} />
              <FormSelect label="Large" size="lg" placeholder="..." options={setores} />
              <FormSelect label="Com erro" placeholder="..." options={setores} error="Campo obrigatório" />
            </div>
          }
          code={`<FormSelect label="Small" size="sm" options={...} />
<FormSelect label="Com erro" options={...} error="Campo obrigatório" />`}
        />

        <PropsTable
          rows={[
            { name: 'options', type: 'FormSelectOption[]', required: true, description: 'Lista: { value, label, disabled? }.' },
            { name: 'label', type: 'ReactNode', description: 'Label do campo.' },
            { name: 'placeholder', type: 'string', description: 'Texto exibido sem seleção.' },
            { name: 'value', type: 'string', description: 'Valor controlado.' },
            { name: 'defaultValue', type: 'string', description: 'Valor inicial não-controlado.' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao selecionar.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Altura do trigger.' },
            { name: 'required / error / success / hint / status / description', type: '— igual FormInput —', description: 'Mesmas props de validação e label.' },
            { name: 'disabled', type: 'boolean', description: 'Desabilita o select.' },
          ]}
        />
      </DocSection>

      {/* ============== FormCombobox ============== */}
      <DocSection
        title="FormCombobox"
        description="Select avançado (react-select) com busca, multi-seleção, agrupamento e criação dinâmica."
      >
        <VariantSection
          title="Single com busca"
          preview={
            <div className="max-w-md">
              <FormCombobox
                label="Tecnologia"
                placeholder="Buscar..."
                options={tags}
                value={comboValue}
                onChange={setComboValue}
                isClearable
              />
            </div>
          }
          code={`const [value, setValue] = useState(null);

<FormCombobox
  label="Tecnologia"
  options={tags}
  value={value}
  onChange={setValue}
  isClearable
/>`}
        />

        <VariantSection
          title="Multi seleção"
          preview={
            <div className="max-w-md">
              <FormCombobox
                label="Tags"
                placeholder="Selecione múltiplos..."
                options={tags}
                value={multiValue}
                onChange={setMultiValue}
                isMulti
                hint="Use Backspace para remover"
              />
            </div>
          }
          code={`<FormCombobox
  label="Tags"
  options={tags}
  value={multi}
  onChange={setMulti}
  isMulti
/>`}
        />

        <VariantSection
          title="Agrupado"
          preview={
            <div className="max-w-md">
              <FormCombobox
                label="Estado por região"
                placeholder="Buscar UF..."
                options={groupedOptions}
              />
            </div>
          }
          code={`const grouped = [
  { label: 'Sudeste', options: [{ value: 'sp', label: 'SP' }] },
  { label: 'Sul', options: [{ value: 'rs', label: 'RS' }] },
];

<FormCombobox label="UF" options={grouped} />`}
        />

        <VariantSection
          title="Criação dinâmica (Creatable)"
          preview={
            <div className="max-w-md">
              <FormCombobox
                label="Tags livres"
                placeholder="Digite e tecle Enter..."
                options={tags}
                isMulti
                creatable
                hint="Pode criar novas tags"
              />
            </div>
          }
          code={`<FormCombobox
  label="Tags"
  options={tags}
  isMulti
  creatable
/>`}
        />

        <PropsTable
          rows={[
            { name: 'options', type: 'FormComboboxOption[] | FormComboboxGroup[]', required: true, description: 'Lista plana ou agrupada.' },
            { name: 'value', type: 'Option | Option[] | null', description: 'Valor controlado.' },
            { name: 'onChange', type: '(value) => void', description: 'Callback react-select.' },
            { name: 'isMulti', type: 'boolean', default: 'false', description: 'Habilita multi-seleção (chips).' },
            { name: 'creatable', type: 'boolean', default: 'false', description: 'Permite criar novas opções (Enter).' },
            { name: 'isClearable', type: 'boolean', default: 'false', description: 'Mostra botão "x" para limpar.' },
            { name: 'isSearchable', type: 'boolean', default: 'true', description: 'Habilita busca (digitação).' },
            { name: 'placeholder', type: 'string', description: 'Texto sem seleção.' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Mesmas props de field.' },
          ]}
        />
      </DocSection>

      <UsageNote type="info">
        Use <strong>FormSelect</strong> para listas curtas (até ~10 opções). Use{' '}
        <strong>FormCombobox</strong> quando precisar de busca, multi-seleção ou criação dinâmica.
      </UsageNote>
    </ComponentDoc>
  );
}
