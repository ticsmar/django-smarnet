import { Search, Globe, Percent } from 'lucide-react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormInput, InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/forms';

export default function InputGroupShowcase() {
  return (
    <FormsShowcaseLayout title="Input Group" subtitle="Form Elements" description="Combinações de inputs com prefixos, sufixos, botões e ícones.">
      <ShowcaseSection title="Prefixo de Texto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Moeda" prefix="R$" placeholder="0,00" />
          <FormInput label="Dólar" prefix="US$" placeholder="0.00" />
          <FormInput label="Euro" prefix="€" placeholder="0,00" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sufixo de Texto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Peso" suffix="kg" placeholder="0" />
          <FormInput label="Comprimento" suffix="mm" placeholder="0" />
          <FormInput label="Temperatura" suffix="°C" placeholder="0" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Ícone Prefixo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Pesquisar" placeholder="Buscar..." startIcon={<Search size={16} />} />
          <FormInput label="Email" placeholder="email@empresa.com" startIcon={<Search size={16} />} />
          <FormInput label="Telefone" placeholder="(00) 00000-0000" startIcon={<Search size={16} />} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Botão">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Busca com ação"
            placeholder="Pesquisar código..."
            append={
              <InputGroupButton>
                <Search size={16} />
              </InputGroupButton>
            }
          />
          <InputGroup
            label="URL com botão"
            placeholder="www.exemplo.com"
            prepend={<InputGroupAddon position="start">https://</InputGroupAddon>}
            append={
              <InputGroupButton variant="secondary">
                <Globe size={16} className="mr-1" /> Ir
              </InputGroupButton>
            }
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Combinados">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block text-foreground">Faixa de Preço</label>
            <div className="flex items-center gap-2">
              <FormInput containerClassName="flex-1" prefix="R$" placeholder="Min" />
              <span className="text-muted-foreground text-xs">até</span>
              <FormInput containerClassName="flex-1" prefix="R$" placeholder="Max" />
            </div>
          </div>
          <InputGroup
            label="Desconto"
            placeholder="0"
            append={
              <>
                <InputGroupAddon position="end"><Percent size={14} /></InputGroupAddon>
              </>
            }
          />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
