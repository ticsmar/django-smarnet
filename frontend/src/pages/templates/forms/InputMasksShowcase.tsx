import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormMaskedInput, FormInput, FormGrid } from '@/components/ui/forms';

export default function InputMasksShowcase() {
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [money, setMoney] = useState('');
  const [date, setDate] = useState('');

  return (
    <FormsShowcaseLayout
      title="Input Masks"
      subtitle="Form Elements"
      description="Campos com máscaras de formatação para CPF, CNPJ, telefone, CEP e mais."
    >
      <ShowcaseSection title="Documentos">
        <FormGrid cols={3}>
          <FormMaskedInput
            mask="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={setCpf}
            hint="Formato: 000.000.000-00"
          />
          <FormMaskedInput
            mask="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={setCnpj}
            hint="Formato: 00.000.000/0000-00"
          />
          <FormInput
            label="IE (Inscrição Estadual)"
            placeholder="000.000.000.000"
            hint="Varia por estado"
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Contato & Endereço">
        <FormGrid cols={3}>
          <FormMaskedInput
            mask="phone"
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={setPhone}
          />
          <FormMaskedInput
            mask="cep"
            label="CEP"
            placeholder="00000-000"
            value={cep}
            onChange={setCep}
          />
          <FormMaskedInput
            mask="date"
            label="Data"
            placeholder="DD/MM/AAAA"
            value={date}
            onChange={setDate}
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Valores Monetários">
        <FormGrid cols={3}>
          <FormMaskedInput
            mask="money"
            label="Valor"
            placeholder="0,00"
            value={money}
            onChange={setMoney}
            prefix="R$"
            inputClassName="font-mono"
          />
          <FormInput
            label="Percentual"
            placeholder="0,00"
            suffix="%"
            inputClassName="font-mono"
          />
          <FormInput
            label="Quantidade"
            placeholder="0.000"
            suffix="un"
            inputClassName="font-mono"
          />
        </FormGrid>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
