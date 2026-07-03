import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormCombobox, FormGrid } from '@/components/ui/forms';

const clienteOptions = [
  { value: 'furlan', label: 'Furlan Industrial' },
  { value: 'ranazzi', label: 'Ranazzi Metalúrgica' },
  { value: 'acos-victoria', label: 'Aços Victoria Ltda' },
  { value: 'metaltech', label: 'MetalTech Solutions' },
  { value: 'soldamaq', label: 'SoldaMaq Equipamentos' },
];

const estadoOptions = [
  { value: 'SP', label: 'São Paulo' }, { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' }, { value: 'PR', label: 'Paraná' },
  { value: 'RS', label: 'Rio Grande do Sul' }, { value: 'SC', label: 'Santa Catarina' },
];

const tagOptions = [
  { value: 'industrial', label: 'Industrial' }, { value: 'automacao', label: 'Automação' },
  { value: 'metalurgia', label: 'Metalurgia' }, { value: 'hidraulica', label: 'Hidráulica' },
  { value: 'eletrica', label: 'Elétrica' }, { value: 'pneumatica', label: 'Pneumática' },
];

export default function Select2Showcase() {
  const [single, setSingle] = useState<any>(null);
  const [multi, setMulti] = useState<any>([]);
  const [creatable, setCreatable] = useState<any>([]);

  return (
    <FormsShowcaseLayout
      title="Select2"
      description="Selects avançados com busca, múltipla seleção e criação dinâmica usando react-select."
    >
      <ShowcaseSection title="Select Simples com Busca">
        <FormGrid cols={3}>
          <FormCombobox
            label="Cliente"
            options={clienteOptions}
            value={single}
            onChange={setSingle}
            placeholder="Buscar cliente..."
            isClearable
          />
          <FormCombobox
            label="Estado"
            options={estadoOptions}
            placeholder="Selecione o estado..."
            isClearable
          />
          <FormCombobox
            label="Desabilitado"
            options={clienteOptions}
            placeholder="Desabilitado"
            isDisabled
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Select">
        <FormGrid cols={2}>
          <FormCombobox
            label="Estados Atendidos"
            options={estadoOptions}
            isMulti
            value={multi}
            onChange={setMulti}
            placeholder="Selecione os estados..."
          />
          <FormCombobox
            label="Tags / Categorias"
            options={tagOptions}
            isMulti
            placeholder="Selecione as tags..."
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Creatable (Criar Novas Opções)">
        <FormGrid cols={2}>
          <FormCombobox
            label="Tags Personalizadas"
            creatable
            isMulti
            value={creatable}
            onChange={setCreatable}
            options={tagOptions}
            placeholder="Digite ou selecione..."
            formatCreateLabel={(v) => `Criar "${v}"`}
          />
          <FormCombobox
            label="Cidade (Criável)"
            creatable
            options={[
              { value: 'sp', label: 'São Paulo' }, { value: 'rj', label: 'Rio de Janeiro' },
              { value: 'bh', label: 'Belo Horizonte' }, { value: 'ctba', label: 'Curitiba' },
            ]}
            placeholder="Buscar ou criar cidade..."
            isClearable
            formatCreateLabel={(v) => `Adicionar "${v}"`}
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Com Agrupamento">
        <div className="max-w-md">
          <FormCombobox
            label="Produto por Categoria"
            options={[
              {
                label: 'Metalurgia',
                options: [
                  { value: 'chapa-aco', label: 'Chapa de Aço' },
                  { value: 'barra-aluminio', label: 'Barra de Alumínio' },
                ],
              },
              {
                label: 'Automação',
                options: [
                  { value: 'clp', label: 'CLP Siemens' },
                  { value: 'inversor', label: 'Inversor de Frequência' },
                ],
              },
              {
                label: 'Elétrica',
                options: [
                  { value: 'cabo', label: 'Cabo Flexível 2.5mm' },
                  { value: 'disjuntor', label: 'Disjuntor 32A' },
                ],
              },
            ]}
            placeholder="Buscar produto..."
            isClearable
          />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
