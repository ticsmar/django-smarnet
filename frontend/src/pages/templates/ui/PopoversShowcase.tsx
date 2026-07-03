import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HelpCircle, Info, Settings } from 'lucide-react';

export default function PopoversShowcase() {
  return (
    <UIShowcaseLayout title="Popovers" description="Conteúdo flutuante contextual acionado por clique.">
      <ShowcaseSection title="Popover Básico">
        <div className="flex flex-wrap gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Clique para abrir</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <h4 className="text-sm font-semibold text-foreground mb-1">Informações</h4>
              <p className="text-xs text-muted-foreground">Este é um popover com conteúdo informativo. Clique fora para fechar.</p>
            </PopoverContent>
          </Popover>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Posicionamento">
        <div className="flex flex-wrap gap-3 py-8 justify-center">
          {(['top', 'bottom', 'left', 'right'] as const).map(side => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </PopoverTrigger>
              <PopoverContent side={side} className="w-48">
                <p className="text-xs text-muted-foreground">Popover posicionado: <strong>{side}</strong></p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Popover de Ajuda Contextual">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">CNPJ</span>
          <Popover>
            <PopoverTrigger>
              <HelpCircle size={14} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex gap-2">
                <Info size={16} className="text-status-info shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Cadastro Nacional de Pessoa Jurídica</p>
                  <p className="text-xs text-muted-foreground mt-1">Formato: XX.XXX.XXX/XXXX-XX. Este campo é validado automaticamente pela Receita Federal.</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Popover com Ação">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline"><Settings size={14} /> Configurar colunas</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <h4 className="text-sm font-semibold mb-3">Colunas visíveis</h4>
            <div className="space-y-2">
              {['ID', 'Nome', 'CNPJ', 'Cidade', 'Status'].map(col => (
                <label key={col} className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-foreground">{col}</span>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </label>
              ))}
            </div>
            <Button size="sm" className="w-full mt-3 h-7 text-xs">Aplicar</Button>
          </PopoverContent>
        </Popover>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
