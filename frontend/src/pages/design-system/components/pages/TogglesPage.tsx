import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { ComponentDoc, VariantSection, PropsTable, DocSection, UsageNote, type PropDef } from '../_docs';

const toggleProps: PropDef[] = [
  { name: 'variant', type: '"default" | "outline"', default: '"default"', description: 'Estilo visual do toggle.' },
  { name: 'size', type: '"default" | "sm" | "lg"', default: '"default"', description: 'Tamanho do botão.' },
  { name: 'pressed', type: 'boolean', description: 'Estado controlado (on/off).' },
  { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Callback ao mudar estado.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desativa a interação.' },
];

const groupProps: PropDef[] = [
  { name: 'type', type: '"single" | "multiple"', required: true, description: 'Permite selecionar um ou vários itens.' },
  { name: 'value', type: 'string | string[]', description: 'Valor(es) selecionado(s) — controlado.' },
  { name: 'defaultValue', type: 'string | string[]', description: 'Valor(es) inicial(is) — não-controlado.' },
  { name: 'onValueChange', type: '(value) => void', description: 'Callback ao mudar seleção.' },
  { name: 'variant', type: '"default" | "outline"', default: '"default"', description: 'Variante aplicada a todos os itens do grupo.' },
  { name: 'size', type: '"default" | "sm" | "lg"', default: '"default"', description: 'Tamanho dos itens.' },
];

export default function TogglesPage() {
  const [bold, setBold] = useState(false);

  return (
    <ComponentDoc
      summary="Toggle e ToggleGroup permitem ativar/desativar opções individuais ou em grupo, como formatação de texto ou alinhamento."
      importPath="import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'"
    >
      <DocSection title="Variantes" description="Toggle suporta variantes default e outline.">
        <VariantSection
          title="Default"
          description="Fundo transparente, destaque ao ativar."
          preview={
            <div className="flex gap-2">
              <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
              <Toggle aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
              <Toggle aria-label="Underline"><Underline className="h-4 w-4" /></Toggle>
            </div>
          }
          code={`<Toggle aria-label="Bold"><Bold /></Toggle>
<Toggle aria-label="Italic"><Italic /></Toggle>`}
        />

        <VariantSection
          title="Outline"
          description="Borda visível mesmo quando inativo."
          preview={
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
              <Toggle variant="outline" aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
            </div>
          }
          code={`<Toggle variant="outline" aria-label="Bold"><Bold /></Toggle>`}
        />
      </DocSection>

      <DocSection title="Tamanhos">
        <VariantSection
          title="sm / default / lg"
          preview={
            <div className="flex items-center gap-3">
              <Toggle size="sm" aria-label="sm"><Bold className="h-3.5 w-3.5" /></Toggle>
              <Toggle size="default" aria-label="default"><Bold className="h-4 w-4" /></Toggle>
              <Toggle size="lg" aria-label="lg"><Bold className="h-5 w-5" /></Toggle>
            </div>
          }
          code={`<Toggle size="sm">…</Toggle>
<Toggle size="default">…</Toggle>
<Toggle size="lg">…</Toggle>`}
        />
      </DocSection>

      <DocSection title="Estado controlado">
        <VariantSection
          title="Controlado com pressed"
          description="Use pressed + onPressedChange para controlar o estado externamente."
          preview={
            <div className="flex items-center gap-3">
              <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
                <Bold className="h-4 w-4" />
              </Toggle>
              <span className="text-sm text-muted-foreground">
                {bold ? 'Ativado' : 'Desativado'}
              </span>
            </div>
          }
          code={`const [bold, setBold] = useState(false);

<Toggle pressed={bold} onPressedChange={setBold}>
  <Bold />
</Toggle>`}
        />
      </DocSection>

      <DocSection title="Desabilitado">
        <VariantSection
          title="Toggle disabled"
          preview={
            <div className="flex gap-2">
              <Toggle disabled aria-label="Disabled"><Bold className="h-4 w-4" /></Toggle>
              <Toggle disabled variant="outline" aria-label="Disabled outline"><Italic className="h-4 w-4" /></Toggle>
            </div>
          }
          code={`<Toggle disabled><Bold /></Toggle>`}
        />
      </DocSection>

      <PropsTable rows={toggleProps} title="Toggle Props" />

      <DocSection title="ToggleGroup" description="Agrupa múltiplos toggles com seleção single ou multiple.">
        <VariantSection
          title="Single — Alinhamento"
          description="Apenas um item pode estar ativo."
          preview={
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Esquerda"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Centro"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Direita"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Justificado"><AlignJustify className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          }
          code={`<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`}
        />

        <VariantSection
          title="Multiple — Formatação"
          description="Vários itens podem estar ativos ao mesmo tempo."
          preview={
            <ToggleGroup type="multiple" defaultValue={['bold']}>
              <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          }
          code={`<ToggleGroup type="multiple" defaultValue={['bold']}>
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`}
        />

        <VariantSection
          title="Outline variant"
          preview={
            <ToggleGroup type="single" variant="outline" defaultValue="center">
              <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          }
          code={`<ToggleGroup type="single" variant="outline" defaultValue="center">
  …
</ToggleGroup>`}
        />
      </DocSection>

      <PropsTable rows={groupProps} title="ToggleGroup Props" />

      <UsageNote type="tip">
        Sempre forneça <code>aria-label</code> quando o toggle contém apenas ícones para garantir acessibilidade.
      </UsageNote>
    </ComponentDoc>
  );
}
