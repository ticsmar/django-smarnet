import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Info, Settings, Edit, Trash2 } from 'lucide-react';

export default function TooltipsShowcase() {
  return (
    <UIShowcaseLayout title="Tooltips" description="Dicas contextuais exibidas ao passar o mouse sobre elementos.">
      <ShowcaseSection title="Tooltips Básicos">
        <div className="flex flex-wrap gap-4 py-4">
          {(['top', 'bottom', 'left', 'right'] as const).map(side => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                <p>Tooltip {side}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Em Ícones de Ação">
        <div className="flex gap-2">
          {[
            { icon: Edit, label: 'Editar registro' },
            { icon: Trash2, label: 'Excluir registro' },
            { icon: Settings, label: 'Configurações' },
            { icon: HelpCircle, label: 'Ajuda' },
          ].map(item => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9"><item.icon size={15} /></Button>
              </TooltipTrigger>
              <TooltipContent><p>{item.label}</p></TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tooltip com Conteúdo Rico">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex items-center gap-1 text-sm text-primary cursor-help">
              <Info size={14} /> O que é CNPJ?
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="font-semibold text-xs">Cadastro Nacional de Pessoa Jurídica</p>
            <p className="text-xs mt-1 opacity-80">Número de identificação fiscal de empresas no Brasil, composto por 14 dígitos.</p>
          </TooltipContent>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection title="Tooltip em Texto Truncado">
        <div className="max-w-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm truncate cursor-default">Este é um texto muito longo que será cortado e o tooltip mostrará o conteúdo completo ao passar o mouse</p>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Este é um texto muito longo que será cortado e o tooltip mostrará o conteúdo completo ao passar o mouse</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
