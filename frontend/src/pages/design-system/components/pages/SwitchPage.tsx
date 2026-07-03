import { FormSwitch } from '@/components/ui/forms';
import { ComponentDoc, DocSection, VariantSection, PropsTable } from '../_docs';

export default function SwitchPage() {
  return (
    <ComponentDoc
      summary="Toggle on/off com label, descrição, dois layouts (inline e row card) e estado de erro."
      importPath="@/components/ui/forms"
    >
      <DocSection title="FormSwitch">
        <VariantSection
          title="Inline (default)"
          preview={
            <div className="space-y-3">
              <FormSwitch label="Notificações por e-mail" defaultChecked />
              <FormSwitch label="Modo escuro" description="Aplica o tema escuro em toda a interface." />
              <FormSwitch label="Desabilitado" disabled />
              <FormSwitch label="Com erro" error="Confirme antes de ativar" />
            </div>
          }
          code={`<FormSwitch label="Notificações por e-mail" defaultChecked />
<FormSwitch
  label="Modo escuro"
  description="Aplica o tema escuro em toda a interface."
/>`}
        />

        <VariantSection
          title="Variante row (card)"
          preview={
            <div className="space-y-2 max-w-xl">
              <FormSwitch
                variant="row"
                label="Receber atualizações de produto"
                description="Novidades, melhorias e novas versões."
                defaultChecked
              />
              <FormSwitch
                variant="row"
                label="E-mails de marketing"
                description="Promoções e ofertas eventuais."
              />
              <FormSwitch
                variant="row"
                label="Sincronização automática"
                description="Sincroniza dados a cada 15 min."
                defaultChecked
              />
            </div>
          }
          code={`<FormSwitch
  variant="row"
  label="Receber atualizações"
  description="Novidades e melhorias."
  defaultChecked
/>`}
        />

        <PropsTable
          rows={[
            { name: 'label', type: 'ReactNode', description: 'Texto principal.' },
            { name: 'description', type: 'ReactNode', description: 'Texto auxiliar abaixo do label.' },
            { name: 'error', type: 'ReactNode', description: 'Mensagem de erro.' },
            { name: 'variant', type: '"inline" | "row"', default: '"inline"', description: 'Layout: linha simples ou cartão.' },
            { name: '...SwitchProps', type: 'Radix SwitchProps', description: 'checked, defaultChecked, onCheckedChange, disabled.' },
          ]}
        />
      </DocSection>
    </ComponentDoc>
  );
}
