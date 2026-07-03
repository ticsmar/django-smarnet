import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormCheckbox, FormRadioGroup, FormSwitch } from '@/components/ui/forms';

export default function ChecksRadiosShowcase() {
  const [checks, setChecks] = useState({ a: true, b: false, c: false, d: true });
  const [radio, setRadio] = useState('opcao1');
  const [incoterm, setIncoterm] = useState('CIF');
  const [switches, setSwitches] = useState({ ativo: true, notif: false, dark: false });

  return (
    <FormsShowcaseLayout title="Checks & Radios" subtitle="Form Elements" description="Checkboxes, radio buttons e switches com variantes visuais.">
      <ShowcaseSection title="Checkboxes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Padrão</p>
            <FormCheckbox label="Opção selecionada" checked={checks.a} onCheckedChange={v => setChecks(p => ({ ...p, a: !!v }))} />
            <FormCheckbox label="Opção não selecionada" checked={checks.b} onCheckedChange={v => setChecks(p => ({ ...p, b: !!v }))} />
            <FormCheckbox label="Terceira opção" checked={checks.c} onCheckedChange={v => setChecks(p => ({ ...p, c: !!v }))} />
            <FormCheckbox
              label="Opção com descrição"
              description="Texto auxiliar explicando o item."
              checked={checks.d}
              onCheckedChange={v => setChecks(p => ({ ...p, d: !!v }))}
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Estados & Card</p>
            <FormCheckbox label="Desabilitado" disabled />
            <FormCheckbox label="Desabilitado Marcado" disabled checked />
            <FormCheckbox
              variant="card"
              label="Aceito os termos de uso"
              description="Confirmo que li e concordo com a política de privacidade."
              defaultChecked
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Radio Buttons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormRadioGroup
            label="Vertical"
            value={radio}
            onValueChange={setRadio}
            options={[
              { value: 'opcao1', label: 'Opção 1' },
              { value: 'opcao2', label: 'Opção 2' },
              { value: 'opcao3', label: 'Opção 3' },
            ]}
          />
          <FormRadioGroup
            label="Cards Radio"
            variant="cards"
            columns={3}
            value={incoterm}
            onValueChange={setIncoterm}
            options={[
              { value: 'CIF', label: 'CIF', description: 'Frete incluso' },
              { value: 'FOB', label: 'FOB', description: 'Frete por conta' },
              { value: 'EXW', label: 'EXW', description: 'Na fábrica' },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Switches (Toggle)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Linha (Row)</p>
            <FormSwitch
              variant="row"
              label="Sistema Ativo"
              description="Ativar/desativar o sistema"
              checked={switches.ativo}
              onCheckedChange={v => setSwitches(p => ({ ...p, ativo: v }))}
            />
            <FormSwitch
              variant="row"
              label="Notificações"
              description="Receber alertas por email"
              checked={switches.notif}
              onCheckedChange={v => setSwitches(p => ({ ...p, notif: v }))}
            />
            <FormSwitch
              variant="row"
              label="Modo Escuro"
              description="Alternar tema visual"
              checked={switches.dark}
              onCheckedChange={v => setSwitches(p => ({ ...p, dark: v }))}
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Inline & Estados</p>
            <FormSwitch label="Ativar recurso" description="Variante inline com label e descrição." defaultChecked />
            <FormSwitch variant="row" label="Desabilitado Off" disabled />
            <FormSwitch variant="row" label="Desabilitado On" disabled checked />
          </div>
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
