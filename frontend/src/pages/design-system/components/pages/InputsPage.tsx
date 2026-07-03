import { useState } from 'react';
import { Mail, Search, User, Lock, DollarSign, Globe } from 'lucide-react';
import { FormInput, FormTextarea, FormMaskedInput, FloatingLabelInput } from '@/components/ui/forms';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

export default function InputsPage() {
  const [textValue, setTextValue] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [floating, setFloating] = useState('');

  return (
    <ComponentDoc
      summary="Inputs e textareas padronizados com label, descrição, mensagens de erro/sucesso/hint, ícones laterais, addons (prefix/suffix), tamanhos e validação visual. Todos suportam light/dark automaticamente via tokens semânticos."
      importPath="@/components/ui/forms"
    >
      {/* ============== FormInput ============== */}
      <DocSection
        title="FormInput"
        description="Wrapper completo do <Input> com label, validação visual, tamanhos e suporte a ícones/addons."
      >
        <VariantSection
          title="Variações principais"
          preview={
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Nome" placeholder="João Silva" required />
              <FormInput label="E-mail" type="email" placeholder="email@empresa.com" hint="Usado para login." />
              <FormInput label="Senha" type="password" placeholder="••••••••" required />
              <FormInput label="Desabilitado" disabled defaultValue="Não editável" />
            </div>
          }
          code={`<FormInput label="Nome" placeholder="João Silva" required />
<FormInput
  label="E-mail"
  type="email"
  placeholder="email@empresa.com"
  hint="Usado para login."
/>`}
        />

        <VariantSection
          title="Tamanhos"
          preview={
            <div className="space-y-3 max-w-md">
              <FormInput label="Small" size="sm" placeholder="h-8" />
              <FormInput label="Medium (default)" size="md" placeholder="h-10" />
              <FormInput label="Large" size="lg" placeholder="h-12" />
            </div>
          }
          code={`<FormInput label="Small" size="sm" />
<FormInput label="Medium" size="md" />
<FormInput label="Large" size="lg" />`}
        />

        <VariantSection
          title="Com ícones"
          preview={
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Buscar" startIcon={<Search size={16} />} placeholder="Pesquisar..." />
              <FormInput label="E-mail" startIcon={<Mail size={16} />} placeholder="email@..." />
              <FormInput label="Usuário" endIcon={<User size={16} />} placeholder="Username" />
              <FormInput label="Senha" startIcon={<Lock size={16} />} type="password" placeholder="••••" />
            </div>
          }
          code={`<FormInput label="Buscar" startIcon={<Search size={16} />} />
<FormInput label="Senha" startIcon={<Lock size={16} />} type="password" />`}
        />

        <VariantSection
          title="Addons (prefix / suffix)"
          preview={
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Site" prefix="https://" placeholder="exemplo.com" />
              <FormInput label="Preço" prefix={<DollarSign size={14} />} suffix="USD" placeholder="0,00" />
              <FormInput label="Domínio" suffix=".com.br" placeholder="meudominio" />
              <FormInput label="Idioma" prefix={<Globe size={14} />} suffix="pt-BR" />
            </div>
          }
          code={`<FormInput label="Site" prefix="https://" placeholder="exemplo.com" />
<FormInput label="Preço" prefix={<DollarSign size={14} />} suffix="USD" />`}
        />

        <VariantSection
          title="Estados de validação"
          preview={
            <div className="grid md:grid-cols-3 gap-4">
              <FormInput label="Erro" defaultValue="abc" error="Mínimo 5 caracteres" />
              <FormInput label="Sucesso" defaultValue="joao@empresa.com" success="E-mail válido" />
              <FormInput label="Aviso" defaultValue="usuario" status="warning" hint="Verifique disponibilidade" />
            </div>
          }
          code={`<FormInput label="Erro" error="Mínimo 5 caracteres" />
<FormInput label="Sucesso" success="E-mail válido" />
<FormInput label="Aviso" status="warning" hint="Verifique disponibilidade" />`}
        />

        <PropsTable
          rows={[
            { name: 'label', type: 'ReactNode', description: 'Label do campo. Exibe asterisco se required=true.' },
            { name: 'description', type: 'ReactNode', description: 'Texto auxiliar logo abaixo do label.' },
            { name: 'hint', type: 'ReactNode', description: 'Dica abaixo do input (com ícone de info).' },
            { name: 'error', type: 'ReactNode', description: 'Mensagem de erro — força status="error".' },
            { name: 'success', type: 'ReactNode', description: 'Mensagem de sucesso — força status="success".' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Marca o campo como obrigatório (asterisco).' },
            { name: 'optionalLabel', type: 'string', description: 'Texto entre parênteses ao lado do label quando não-required.' },
            { name: 'status', type: '"default" | "error" | "success" | "warning"', default: '"default"', description: 'Estado visual explícito do campo.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Altura e tamanho de fonte.' },
            { name: 'startIcon', type: 'ReactNode', description: 'Ícone à esquerda dentro do input.' },
            { name: 'endIcon', type: 'ReactNode', description: 'Ícone à direita dentro do input.' },
            { name: 'prefix', type: 'ReactNode', description: 'Addon externo à esquerda (com borda compartilhada).' },
            { name: 'suffix', type: 'ReactNode', description: 'Addon externo à direita.' },
            { name: '...InputProps', type: 'InputHTMLAttributes', description: 'Aceita todas as props nativas de <input>.' },
          ]}
        />
      </DocSection>

      {/* ============== FormTextarea ============== */}
      <DocSection
        title="FormTextarea"
        description="Textarea com mesmas capacidades do FormInput + contador de caracteres opcional."
      >
        <VariantSection
          title="Com contador"
          preview={
            <div className="space-y-4 max-w-xl">
              <FormTextarea
                label="Observações"
                placeholder="Descreva..."
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                showCounter
                maxLength={200}
                hint="Seja conciso."
              />
              <FormTextarea label="Sem limite" placeholder="..." rows={3} />
            </div>
          }
          code={`const [value, setValue] = useState('');

<FormTextarea
  label="Observações"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  showCounter
  maxLength={200}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'label', type: 'ReactNode', description: 'Label do campo.' },
            { name: 'showCounter', type: 'boolean', default: 'false', description: 'Mostra contador de caracteres.' },
            { name: 'counterMax', type: 'number', description: 'Máximo do contador (default = maxLength).' },
            { name: 'maxLength', type: 'number', description: 'Limite real do textarea.' },
            { name: 'error / success / hint / status / required', type: '— igual FormInput —', description: 'Mesmas props de validação.' },
          ]}
        />
      </DocSection>

      {/* ============== FormMaskedInput ============== */}
      <DocSection
        title="FormMaskedInput"
        description="Input com máscara automática: CPF, CNPJ, telefone, CEP, data, valor, percentual ou customizada. Reusa todas as props de FormInput."
      >
        <VariantSection
          title="Máscaras prontas"
          preview={
            <div className="grid md:grid-cols-2 gap-4">
              <FormMaskedInput mask="phone" label="Telefone" value={phone} onChange={setPhone} placeholder="(11) 99999-9999" />
              <FormMaskedInput mask="cnpj" label="CNPJ" value={cnpj} onChange={setCnpj} placeholder="00.000.000/0000-00" />
              <FormMaskedInput mask="cpf" label="CPF" value="" onChange={() => {}} placeholder="000.000.000-00" />
              <FormMaskedInput mask="cep" label="CEP" value="" onChange={() => {}} placeholder="00000-000" />
              <FormMaskedInput mask="date" label="Data" value="" onChange={() => {}} placeholder="dd/mm/aaaa" />
              <FormMaskedInput mask="money" label="Valor" prefix="R$" value="" onChange={() => {}} placeholder="0,00" />
            </div>
          }
          code={`const [phone, setPhone] = useState('');

<FormMaskedInput
  mask="phone"
  label="Telefone"
  value={phone}
  onChange={setPhone}
/>

<FormMaskedInput mask="cnpj" label="CNPJ" value={cnpj} onChange={setCnpj} />
<FormMaskedInput mask="money" label="Valor" prefix="R$" value={value} onChange={setValue} />`}
        />

        <PropsTable
          rows={[
            { name: 'mask', type: '"cpf" | "cnpj" | "phone" | "cep" | "date" | "money" | "percent" | "custom"', required: true, description: 'Tipo de máscara.' },
            { name: 'value', type: 'string', required: true, description: 'Valor controlado já mascarado.' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Callback recebe valor mascarado.' },
            { name: 'customMask', type: '(value: string) => string', description: 'Função própria de máscara (mask="custom").' },
            { name: '...FormInputProps', type: 'FormInputProps', description: 'Aceita todas as props de FormInput.' },
          ]}
        />
      </DocSection>

      {/* ============== FloatingLabelInput ============== */}
      <DocSection
        title="FloatingLabelInput"
        description="Input com label flutuante (Material-style). Não compartilha API com FormInput — destinado a layouts compactos específicos."
      >
        <VariantSection
          title="Floating label"
          preview={
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <FloatingLabelInput label="E-mail" type="email" />
              <FloatingLabelInput label="Senha" type="password" />
              <FloatingLabelInput label="Com erro" error="Campo obrigatório" />
              <FloatingLabelInput
                label="Controlado"
                value={floating}
                onChange={(e) => setFloating(e.target.value)}
                hint="Use Tab para focar"
              />
            </div>
          }
          code={`<FloatingLabelInput label="E-mail" type="email" />
<FloatingLabelInput label="Senha" type="password" />
<FloatingLabelInput label="Com erro" error="Campo obrigatório" />`}
        />
      </DocSection>

      <UsageNote type="tip">
        Use <strong>FormInput</strong> como padrão. <strong>FloatingLabelInput</strong> é indicado
        apenas em telas de autenticação / formulários compactos onde o efeito visual é desejado.
      </UsageNote>
    </ComponentDoc>
  );
}
