import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormRangeSlider, FormGrid } from '@/components/ui/forms';

export default function RangeSliderShowcase() {
  const [single, setSingle] = useState([50]);
  const [range, setRange] = useState([20, 80]);
  const [step, setStep] = useState([25]);
  const [price, setPrice] = useState([1000, 5000]);

  return (
    <FormsShowcaseLayout
      title="Range Slider"
      subtitle="Form Elements"
      description="Controles deslizantes para seleção de valores numéricos e faixas."
    >
      <ShowcaseSection title="Slider Simples">
        <FormGrid cols={2} gap="lg">
          <FormRangeSlider
            label="Volume"
            value={single}
            onValueChange={setSingle}
            max={100}
            step={1}
            formatValue={(v) => `${v[0]}%`}
          />
          <FormRangeSlider
            label="Steps (25)"
            value={step}
            onValueChange={setStep}
            max={100}
            step={25}
            formatValue={(v) => `${v[0]}%`}
            ticks={[0, 25, 50, 75, 100]}
            formatTick={(v) => `${v}%`}
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Slider de Faixa (Range)">
        <FormGrid cols={2} gap="lg">
          <FormRangeSlider
            label="Faixa"
            value={range}
            onValueChange={setRange}
            max={100}
            step={1}
          />
          <FormRangeSlider
            label="Faixa de Preço"
            value={price}
            onValueChange={setPrice}
            min={0}
            max={10000}
            step={100}
            formatValue={(v) => `R$ ${v[0].toLocaleString()} — R$ ${v[1].toLocaleString()}`}
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Estados">
        <FormGrid cols={3} gap="lg">
          <FormRangeSlider label="Normal" value={[40]} onValueChange={() => {}} max={100} />
          <FormRangeSlider
            label="Desabilitado"
            value={[60]}
            onValueChange={() => {}}
            max={100}
            disabled
          />
          <FormRangeSlider
            label="Com marcações"
            value={[50]}
            onValueChange={() => {}}
            max={100}
            step={10}
            ticks
          />
        </FormGrid>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
