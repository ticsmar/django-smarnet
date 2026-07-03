import { useState } from 'react';
import { FormRangeSlider } from '@/components/ui/forms';
import { ComponentDoc, DocSection, VariantSection, PropsTable } from '../_docs';

export default function SliderPage() {
  const [vol, setVol] = useState([60]);
  const [price, setPrice] = useState([20, 80]);
  const [score, setScore] = useState([7]);

  return (
    <ComponentDoc
      summary="Range slider com label, valor formatado em destaque, ticks opcionais e suporte a um ou dois handles."
      importPath="@/components/ui/forms"
    >
      <DocSection title="FormRangeSlider">
        <VariantSection
          title="Single value"
          preview={
            <div className="max-w-md">
              <FormRangeSlider
                label="Volume"
                value={vol}
                onValueChange={setVol}
                formatValue={(v) => `${v[0]}%`}
              />
            </div>
          }
          code={`const [vol, setVol] = useState([60]);

<FormRangeSlider
  label="Volume"
  value={vol}
  onValueChange={setVol}
  formatValue={(v) => \`\${v[0]}%\`}
/>`}
        />

        <VariantSection
          title="Range (dois handles)"
          preview={
            <div className="max-w-md">
              <FormRangeSlider
                label="Faixa de preço"
                value={price}
                onValueChange={setPrice}
                min={0}
                max={1000}
                step={10}
                formatValue={(v) => `R$ ${v[0]} — R$ ${v[1]}`}
              />
            </div>
          }
          code={`const [price, setPrice] = useState([20, 80]);

<FormRangeSlider
  label="Faixa de preço"
  value={price}
  onValueChange={setPrice}
  min={0}
  max={1000}
  step={10}
  formatValue={(v) => \`R$ \${v[0]} — R$ \${v[1]}\`}
/>`}
        />

        <VariantSection
          title="Com ticks"
          preview={
            <div className="max-w-md">
              <FormRangeSlider
                label="Avaliação"
                value={score}
                onValueChange={setScore}
                min={0}
                max={10}
                step={1}
                ticks={[0, 2, 4, 6, 8, 10]}
                formatValue={(v) => `Nota ${v[0]}`}
              />
            </div>
          }
          code={`<FormRangeSlider
  label="Avaliação"
  value={score}
  onValueChange={setScore}
  min={0}
  max={10}
  step={1}
  ticks={[0, 2, 4, 6, 8, 10]}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'value', type: 'number[]', required: true, description: 'Array de 1 ou 2 elementos.' },
            { name: 'onValueChange', type: '(value: number[]) => void', required: true, description: 'Callback ao mover o slider.' },
            { name: 'min / max / step', type: 'number', default: '0 / 100 / 1', description: 'Limites e granularidade.' },
            { name: 'formatValue', type: '(v: number[]) => ReactNode', description: 'Custom da label exibida ao lado do título.' },
            { name: 'ticks', type: 'number[] | true', description: 'Marcações abaixo. true gera automaticamente.' },
            { name: 'formatTick', type: '(v: number) => ReactNode', description: 'Custom de cada tick.' },
            { name: 'label / required / error / hint / description', type: '— igual FormInput —', description: 'Props de field.' },
          ]}
        />
      </DocSection>
    </ComponentDoc>
  );
}
