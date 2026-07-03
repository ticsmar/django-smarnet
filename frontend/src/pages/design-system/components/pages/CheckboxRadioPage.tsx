import { useState } from 'react';
import { FormCheckbox, FormRadioGroup } from '@/components/ui/forms';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

export default function CheckboxRadioPage() {
  const [pgto, setPgto] = useState('pix');
  const [incoterm, setIncoterm] = useState('CIF');

  return (
    <ComponentDoc
      summary="Componentes de seleção: FormCheckbox (binário ou múltiplo) e FormRadioGroup (escolha exclusiva). Suportam layouts inline, stacked e cards."
      importPath="@/components/ui/forms"
    >
      {/* ============== FormCheckbox ============== */}
      <DocSection title="FormCheckbox" description="Checkbox com label, descrição e variante card.">
        <VariantSection
          title="Inline (default)"
          preview={
            <div className="space-y-3">
              <FormCheckbox label="Receber notificações" defaultChecked />
              <FormCheckbox label="Aceito os termos" description="Veja a política de privacidade." />
              <FormCheckbox label="Desabilitado" disabled />
              <FormCheckbox label="Com erro" error="Você deve aceitar para continuar" />
            </div>
          }
          code={`<FormCheckbox label="Receber notificações" defaultChecked />
<FormCheckbox
  label="Aceito os termos"
  description="Veja a política de privacidade."
/>
<FormCheckbox label="Com erro" error="Você deve aceitar" />`}
        />

        <VariantSection
          title="Variante card"
          preview={
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              <FormCheckbox
                variant="card"
                label="Notificações por e-mail"
                description="Receba um resumo diário por e-mail."
                defaultChecked
              />
              <FormCheckbox
                variant="card"
                label="Notificações push"
                description="Alertas no navegador em tempo real."
              />
            </div>
          }
          code={`<FormCheckbox
  variant="card"
  label="Notificações por e-mail"
  description="Receba um resumo diário."
  defaultChecked
/>`}
        />

        <PropsTable
          rows={[
            { name: 'label', type: 'ReactNode', description: 'Texto principal ao lado do checkbox.' },
            { name: 'description', type: 'ReactNode', description: 'Texto auxiliar abaixo do label.' },
            { name: 'error', type: 'ReactNode', description: 'Mensagem de erro inline.' },
            { name: 'variant', type: '"inline" | "card"', default: '"inline"', description: 'Layout: linha simples ou cartão clicável.' },
            { name: '...CheckboxProps', type: 'Radix CheckboxProps', description: 'Aceita checked, defaultChecked, onCheckedChange, disabled.' },
          ]}
        />
      </DocSection>

      {/* ============== FormRadioGroup ============== */}
      <DocSection
        title="FormRadioGroup"
        description="Grupo de rádios data-driven com 3 layouts: stacked, inline e cards."
      >
        <VariantSection
          title="Stacked (default)"
          preview={
            <div className="max-w-md">
              <FormRadioGroup
                label="Forma de pagamento"
                value={pgto}
                onValueChange={setPgto}
                options={[
                  { value: 'pix', label: 'PIX', description: 'Aprovação instantânea.' },
                  { value: 'boleto', label: 'Boleto', description: 'Compensação em até 3 dias úteis.' },
                  { value: 'cartao', label: 'Cartão', description: 'Parcelado em até 12x.' },
                ]}
              />
            </div>
          }
          code={`const [pgto, setPgto] = useState('pix');

<FormRadioGroup
  label="Forma de pagamento"
  value={pgto}
  onValueChange={setPgto}
  options={[
    { value: 'pix', label: 'PIX', description: 'Aprovação instantânea.' },
    { value: 'boleto', label: 'Boleto', description: 'Em até 3 dias úteis.' },
  ]}
/>`}
        />

        <VariantSection
          title="Inline"
          preview={
            <FormRadioGroup
              label="Tamanho"
              variant="inline"
              defaultValue="m"
              options={[
                { value: 'p', label: 'P' },
                { value: 'm', label: 'M' },
                { value: 'g', label: 'G' },
                { value: 'gg', label: 'GG' },
              ]}
            />
          }
          code={`<FormRadioGroup
  label="Tamanho"
  variant="inline"
  defaultValue="m"
  options={[{ value: 'p', label: 'P' }, ...]}
/>`}
        />

        <VariantSection
          title="Cards"
          preview={
            <FormRadioGroup
              label="Incoterm"
              variant="cards"
              columns={3}
              value={incoterm}
              onValueChange={setIncoterm}
              options={[
                { value: 'CIF', label: 'CIF', description: 'Frete e seguro inclusos no preço.' },
                { value: 'FOB', label: 'FOB', description: 'Frete por conta do comprador.' },
                { value: 'EXW', label: 'EXW', description: 'Retirada na fábrica.' },
              ]}
            />
          }
          code={`<FormRadioGroup
  label="Incoterm"
  variant="cards"
  columns={3}
  value={value}
  onValueChange={setValue}
  options={[
    { value: 'CIF', label: 'CIF', description: 'Frete incluso.' },
    { value: 'FOB', label: 'FOB', description: 'Frete por conta.' },
  ]}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'options', type: 'FormRadioOption[]', required: true, description: 'Lista: { value, label, description?, disabled? }.' },
            { name: 'value / defaultValue', type: 'string', description: 'Valor controlado / inicial.' },
            { name: 'onValueChange', type: '(v: string) => void', description: 'Callback ao selecionar.' },
            { name: 'variant', type: '"stacked" | "inline" | "cards"', default: '"stacked"', description: 'Layout das opções.' },
            { name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Apenas para variant="cards".' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Props de field.' },
          ]}
        />
      </DocSection>

      <UsageNote type="tip">
        Use <strong>cards</strong> quando cada opção precisa de descrição visual destacada (planos,
        métodos de envio). Use <strong>stacked</strong> para listas longas ou com hint detalhado.
      </UsageNote>
    </ComponentDoc>
  );
}
