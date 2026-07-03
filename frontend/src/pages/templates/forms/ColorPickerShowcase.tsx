import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormColorPicker, FormGrid } from '@/components/ui/forms';

const presetColors = [
  { name: 'Primary', value: 'hsl(213, 55%, 17%)' },
  { name: 'Secondary', value: 'hsl(185, 78%, 55%)' },
  { name: 'Accent', value: 'hsl(40, 96%, 64%)' },
  { name: 'Success', value: 'hsl(152, 60%, 52%)' },
  { name: 'Warning', value: 'hsl(38, 92%, 50%)' },
  { name: 'Error', value: 'hsl(0, 84%, 60%)' },
  { name: 'Info', value: 'hsl(210, 90%, 60%)' },
];

const swatches = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#1e293b',
];

export default function ColorPickerShowcase() {
  const [color1, setColor1] = useState('#2dd4bf');
  const [color2, setColor2] = useState('#1e3a5f');

  return (
    <FormsShowcaseLayout
      title="Color Pickers"
      subtitle="Form Elements"
      description="Seletores de cor para personalização e configuração visual."
    >
      <ShowcaseSection title="FormColorPicker">
        <FormGrid cols={3}>
          <FormColorPicker label="Cor Principal" value={color1} onChange={setColor1} />
          <FormColorPicker label="Cor Secundária" value={color2} onChange={setColor2} />
          <div>
            <p className="text-xs font-medium mb-1.5">Preview combinado</p>
            <div className="h-10 rounded-lg flex overflow-hidden border border-border">
              <div className="flex-1" style={{ backgroundColor: color1 }} />
              <div className="flex-1" style={{ backgroundColor: color2 }} />
            </div>
          </div>
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Cores do Design System">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {presetColors.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="w-full aspect-square rounded-xl border border-border/30 mb-2 shadow-sm"
                style={{ backgroundColor: c.value }}
              />
              <p className="text-[11px] font-semibold text-foreground">{c.name}</p>
              <p className="text-[9px] text-muted-foreground font-mono">{c.value}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com swatches integrados">
        <div className="max-w-sm">
          <FormColorPicker
            label="Selecione uma cor"
            description="Use o seletor, o campo hex ou clique em um swatch"
            value={color1}
            onChange={setColor1}
            swatches={swatches}
          />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
