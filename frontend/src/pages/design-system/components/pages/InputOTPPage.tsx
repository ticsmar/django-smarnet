import { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

const otpProps: PropDef[] = [
  { name: 'maxLength', type: 'number', required: true, description: 'Quantidade total de dígitos do OTP.' },
  { name: 'value', type: 'string', description: 'Valor controlado.' },
  { name: 'onChange', type: '(value: string) => void', description: 'Callback de mudança.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita todos os slots.' },
  { name: 'containerClassName', type: 'string', description: 'Classe CSS no container externo.' },
];

const slotProps: PropDef[] = [
  { name: 'index', type: 'number', required: true, description: 'Posição do slot (zero-based).' },
  { name: 'className', type: 'string', description: 'Classes extras no slot.' },
];

export default function InputOTPPage() {
  const [value, setValue] = useState('');

  return (
    <ComponentDoc
      summary="Campo de entrada para códigos OTP / 2FA. Composto por InputOTP, InputOTPGroup, InputOTPSlot e InputOTPSeparator."
      importPath="@/components/ui/input-otp"
    >
      {/* --- 6 dígitos com separador --- */}
      <DocSection title="InputOTP">
        <VariantSection
          title="6 dígitos com separador"
          description="Formato padrão para códigos de verificação."
          preview={
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          }
          code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        />

        <VariantSection
          title="4 dígitos sem separador"
          description="Para PINs curtos ou códigos de 4 dígitos."
          preview={
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          }
          code={`<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        />

        <VariantSection
          title="Controlado"
          description="Com value/onChange para capturar o valor digitado."
          preview={
            <div className="space-y-3">
              <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-muted-foreground">
                Valor: <code className="font-mono text-foreground">{value || '—'}</code>
              </p>
            </div>
          }
          code={`const [value, setValue] = useState('');

<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        />

        <VariantSection
          title="Desabilitado"
          preview={
            <InputOTP maxLength={6} disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          }
          code={`<InputOTP maxLength={6} disabled>
  ...
</InputOTP>`}
        />

        <PropsTable rows={otpProps} title="InputOTP Props" />
        <PropsTable rows={slotProps} title="InputOTPSlot Props" />

        <UsageNote type="tip">
          Use <code className="font-mono text-xs">InputOTPSeparator</code> entre grupos para
          separar visualmente blocos de dígitos (ex: 3-3 ou 4-2).
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
