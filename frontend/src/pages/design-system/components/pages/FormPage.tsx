import { useState } from 'react';
import { Save } from 'lucide-react';
import {
  FormDatePicker,
  FormDateRangePicker,
  FormFileUpload,
  FormAvatarUpload,
  FormColorPicker,
  FormRichText,
  FormRichTextTinyMCE,
  FormSection,
  FormGrid,
  FormRow,
  FormInline,
  FormActions,
  FormInput,
  FormSelect,
} from '@/components/ui/forms';
import { ActionButton } from '@/components/ui/buttons';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

export default function FormPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<any>();
  const [color, setColor] = useState('#0EA5E9');

  return (
    <ComponentDoc
      summary="Componentes especiais de formulário (DatePicker, FileUpload, ColorPicker, RichText) e helpers de layout (FormSection, FormGrid, FormRow, FormInline, FormActions). Use estes blocos para montar formulários completos e consistentes."
      importPath="@/components/ui/forms"
    >
      {/* ============== Layout helpers ============== */}
      <DocSection
        title="Layout helpers"
        description="Estruturadores de formulário: seções com título, grids responsivos, linhas horizontais, campos inline e barra de ações."
      >
        <VariantSection
          title="FormSection + FormGrid + FormActions"
          preview={
            <FormSection
              title="Endereço de cobrança"
              description="Dados usados para emissão de NF."
            >
              <FormGrid cols={3}>
                <FormInput label="CEP" placeholder="00000-000" />
                <FormInput label="Cidade" placeholder="São Paulo" containerClassName="sm:col-span-2 lg:col-span-1" />
                <FormSelect label="UF" placeholder="SP" options={[{ value: 'sp', label: 'SP' }, { value: 'rj', label: 'RJ' }]} />
                <FormInput label="Logradouro" containerClassName="sm:col-span-2 lg:col-span-2" />
                <FormInput label="Número" />
              </FormGrid>
              <FormActions>
                <ActionButton label="Cancelar" variant="outline" />
                <ActionButton label="Salvar" icon={Save} />
              </FormActions>
            </FormSection>
          }
          code={`<FormSection title="Endereço" description="Dados usados para NF.">
  <FormGrid cols={3}>
    <FormInput label="CEP" />
    <FormInput label="Cidade" containerClassName="sm:col-span-2" />
    <FormSelect label="UF" options={...} />
  </FormGrid>
  <FormActions>
    <ActionButton label="Cancelar" variant="outline" />
    <ActionButton label="Salvar" icon={Save} />
  </FormActions>
</FormSection>`}
        />

        <VariantSection
          title="FormRow (label horizontal)"
          preview={
            <div className="max-w-2xl space-y-3">
              <FormRow label="Razão social"><FormInput placeholder="Nova Smar S/A" /></FormRow>
              <FormRow label="CNPJ"><FormInput placeholder="00.000.000/0000-00" /></FormRow>
              <FormRow label="Status">
                <FormSelect placeholder="..." options={[{ value: 'a', label: 'Ativo' }, { value: 'i', label: 'Inativo' }]} />
              </FormRow>
            </div>
          }
          code={`<FormRow label="Razão social"><FormInput /></FormRow>
<FormRow label="CNPJ"><FormInput /></FormRow>`}
        />

        <VariantSection
          title="FormInline (filtros)"
          preview={
            <FormInline>
              <FormInput label="Buscar" placeholder="Nome ou código..." size="sm" />
              <FormSelect label="Status" size="sm" placeholder="Todos" options={[{ value: 'a', label: 'Ativos' }]} />
              <ActionButton label="Filtrar" size="sm" />
            </FormInline>
          }
          code={`<FormInline>
  <FormInput label="Buscar" size="sm" />
  <FormSelect label="Status" size="sm" options={...} />
  <ActionButton label="Filtrar" size="sm" />
</FormInline>`}
        />

        <PropsTable
          title="FormSection / FormGrid / FormActions — props"
          rows={[
            { name: 'FormSection.title', type: 'ReactNode', description: 'Título da seção (com linha divisória).' },
            { name: 'FormSection.description', type: 'ReactNode', description: 'Subtítulo abaixo do título.' },
            { name: 'FormSection.actions', type: 'ReactNode', description: 'Slot à direita do título (botões).' },
            { name: 'FormGrid.cols', type: '1 | 2 | 3 | 4 | 6 | 12', default: '2', description: 'Quantidade de colunas responsivas.' },
            { name: 'FormGrid.gap', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Espaçamento entre células.' },
            { name: 'FormRow.label', type: 'ReactNode', description: 'Label à esquerda na linha horizontal.' },
            { name: 'FormRow.labelWidth', type: 'number', default: '128', description: 'Largura do label em px.' },
            { name: 'FormActions.align', type: '"start" | "end" | "between"', default: '"end"', description: 'Alinhamento dos botões.' },
          ]}
        />
      </DocSection>

      {/* ============== Date pickers ============== */}
      <DocSection title="FormDatePicker" description="Seletor de data única ou intervalo (range), com Calendar + Popover.">
        <VariantSection
          title="Single e Range"
          preview={
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <FormDatePicker label="Data de emissão" value={date} onChange={setDate} required />
              <FormDateRangePicker label="Período" value={range} onChange={setRange} />
            </div>
          }
          code={`const [date, setDate] = useState<Date | undefined>();
const [range, setRange] = useState<DateRange | undefined>();

<FormDatePicker label="Data" value={date} onChange={setDate} required />
<FormDateRangePicker label="Período" value={range} onChange={setRange} />`}
        />

        <PropsTable
          rows={[
            { name: 'value', type: 'Date | DateRange', description: 'Valor controlado.' },
            { name: 'onChange', type: '(d) => void', required: true, description: 'Callback de mudança.' },
            { name: 'formatStr', type: 'string', default: '"dd/MM/yyyy"', description: 'Formato exibido (date-fns).' },
            { name: 'numberOfMonths', type: 'number', default: '1 (single) / 2 (range)', description: 'Meses visíveis no popover.' },
            { name: 'placeholder', type: 'string', description: 'Texto sem seleção.' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Props de field.' },
          ]}
        />
      </DocSection>

      {/* ============== File upload ============== */}
      <DocSection title="FormFileUpload" description="Dropzone, compact e avatar para uploads.">
        <VariantSection
          title="Dropzone"
          preview={
            <FormFileUpload
              label="Anexos"
              title="Arraste arquivos aqui ou clique"
              helperText="PDF, PNG, JPG até 10MB"
              multiple
            />
          }
          code={`<FormFileUpload
  label="Anexos"
  title="Arraste arquivos aqui"
  helperText="PDF, PNG, JPG até 10MB"
  multiple
  onFilesSelected={(files) => console.log(files)}
/>`}
        />

        <VariantSection
          title="Compact"
          preview={
            <div className="max-w-md">
              <FormFileUpload variant="compact" label="Logo" buttonLabel="Escolher" />
            </div>
          }
          code={`<FormFileUpload variant="compact" label="Logo" buttonLabel="Escolher" />`}
        />

        <VariantSection
          title="Avatar upload"
          preview={
            <FormAvatarUpload
              label="Foto do perfil"
              description="JPG ou PNG, até 2MB."
            />
          }
          code={`<FormAvatarUpload
  label="Foto do perfil"
  description="JPG ou PNG, até 2MB."
  preview={url}
  onPick={(files) => upload(files)}
  onRemove={() => setUrl(null)}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'variant', type: '"dropzone" | "compact"', default: '"dropzone"', description: 'Estilo visual.' },
            { name: 'title / helperText / buttonLabel', type: 'string', description: 'Textos do dropzone.' },
            { name: 'accept', type: 'string', description: 'Tipos aceitos (input file).' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite múltiplos arquivos.' },
            { name: 'onFilesSelected', type: '(files: FileList | null) => void', description: 'Callback ao selecionar.' },
          ]}
        />
      </DocSection>

      {/* ============== Color picker ============== */}
      <DocSection title="FormColorPicker">
        <VariantSection
          title="Com swatches"
          preview={
            <div className="max-w-sm">
              <FormColorPicker
                label="Cor da marca"
                value={color}
                onChange={setColor}
                swatches={['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']}
              />
            </div>
          }
          code={`<FormColorPicker
  label="Cor da marca"
  value={color}
  onChange={setColor}
  swatches={['#0EA5E9', '#10B981', '#F59E0B', '#EF4444']}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'value', type: 'string', required: true, description: 'Cor em hex.' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Callback ao alterar.' },
            { name: 'swatches', type: 'string[]', description: 'Lista de cores pré-definidas para clique rápido.' },
            { name: 'hideHex', type: 'boolean', default: 'false', description: 'Oculta o input de texto hex.' },
          ]}
        />
      </DocSection>

      {/* ============== Rich text ============== */}
      <DocSection title="FormRichText" description="Editor rico (TipTap) com toolbar padrão.">
        <VariantSection
          title="Editor"
          preview={
            <div className="max-w-2xl">
              <FormRichText
                label="Descrição do produto"
                content="<p>Comece a editar...</p>"
                hint="Use os atalhos de formatação na toolbar."
              />
            </div>
          }
          code={`<FormRichText
  label="Descrição"
  content="<p>Texto inicial</p>"
  onChange={(html) => setContent(html)}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'content', type: 'string', description: 'HTML inicial.' },
            { name: 'onChange', type: '(html: string) => void', description: 'Recebe HTML a cada mudança.' },
            { name: 'minHeight', type: 'string', default: '"200px"', description: 'Altura mínima do editor.' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Props de field.' },
          ]}
        />
      </DocSection>

      {/* ============== Rich text (TinyMCE) ============== */}
      <DocSection
        title="FormRichTextTinyMCE"
        description="Alternativa ao TipTap usando TinyMCE self-hosted (licença GPL, sem API key). Mesma API de field — escolha conforme a familiaridade da equipe."
      >
        <VariantSection
          title="Editor TinyMCE"
          preview={
            <div className="max-w-2xl">
              <FormRichTextTinyMCE
                label="Descrição do produto"
                content="<p>Editor <strong>TinyMCE</strong> integrado ao design system.</p>"
                hint="Toolbar completa com tabelas, imagens, links e código."
              />
            </div>
          }
          code={`<FormRichTextTinyMCE
  label="Descrição"
  content="<p>Texto inicial</p>"
  onChange={(html) => setContent(html)}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'content', type: 'string', description: 'HTML inicial.' },
            { name: 'onChange', type: '(html: string) => void', description: 'Recebe HTML a cada mudança.' },
            { name: 'minHeight', type: 'number', default: '240', description: 'Altura mínima do editor em px.' },
            { name: 'toolbar', type: 'string', description: 'String de toolbar do TinyMCE (override).' },
            { name: 'plugins', type: 'string[]', description: 'Lista de plugins TinyMCE habilitados.' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Props de field.' },
          ]}
        />

        <UsageNote type="info">
          <strong>TipTap vs TinyMCE:</strong> use <strong>FormRichText</strong> (TipTap) para
          editores leves e altamente customizáveis em React; use <strong>FormRichTextTinyMCE</strong>
          quando precisar de toolbar completa pronta (tabelas, mídia, código) ou quando a equipe já
          domina TinyMCE.
        </UsageNote>
      </DocSection>

      <UsageNote type="tip">
        Veja também <strong>FloatingLabelInput</strong>, <strong>FormMaskedInput</strong> e demais
        componentes na página <strong>Input &amp; Textarea</strong>.
      </UsageNote>
    </ComponentDoc>
  );
}
