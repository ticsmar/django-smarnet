import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Button } from '@/components/ui/button';
import { ActionButton, IconButton, ButtonGroup } from '@/components/ui/buttons';
import {
  Plus, Download, Trash2, Edit, Save, ChevronRight, Mail, Search, Settings,
  Check, AlertTriangle, Info,
} from 'lucide-react';

export default function ButtonsShowcase() {
  return (
    <UIShowcaseLayout
      title="Buttons"
      description="Botões com todas as cores do design system. Componentes prontos em src/components/ui/buttons/ — use-os no sistema todo."
    >
      {/* ============ PRIMITIVO ============ */}
      <ShowcaseSection title="Variantes (todas as cores do design system)">
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="alert">Alert</Button>
          <Button variant="info">Info</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Variantes neutras / outline / link">
        <ButtonGroup>
          <Button variant="outline">Outline</Button>
          <Button variant="outline-primary">Outline Primary</Button>
          <Button variant="outline-destructive">Outline Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <ButtonGroup>
          <Button size="sm">Pequeno</Button>
          <Button size="default">Médio</Button>
          <Button size="lg">Grande</Button>
          <Button size="icon"><Plus size={16} /></Button>
        </ButtonGroup>
      </ShowcaseSection>

      {/* ============ ACTION BUTTON ============ */}
      <ShowcaseSection title="ActionButton (ícone + label + loading)">
        <ButtonGroup>
          <ActionButton label="Novo Cliente" icon={Plus} />
          <ActionButton label="Exportar" icon={Download} variant="outline" />
          <ActionButton label="Excluir" icon={Trash2} variant="destructive" />
          <ActionButton label="Editar" icon={Edit} variant="secondary" />
          <ActionButton label="Salvar" icon={Save} variant="success" />
          <ActionButton label="Avisar" icon={AlertTriangle} variant="warning" />
          <ActionButton label="Info" icon={Info} variant="info" />
          <ActionButton label="Aprovar" icon={Check} variant="accent" />
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="ActionButton — ícone à direita / loading / disabled">
        <ButtonGroup>
          <ActionButton label="Continuar" iconRight={ChevronRight} />
          <ActionButton label="Ver detalhes" iconRight={ChevronRight} variant="outline" />
          <ActionButton label="Enviar" icon={Mail} loading loadingLabel="Enviando..." />
          <ActionButton label="Indisponível" icon={Save} disabled />
        </ButtonGroup>
      </ShowcaseSection>

      {/* ============ ICON BUTTON ============ */}
      <ShowcaseSection title="IconButton (somente ícone, com a11y)">
        <ButtonGroup>
          <IconButton icon={Search} label="Buscar" />
          <IconButton icon={Settings} label="Configurações" />
          <IconButton icon={Edit} label="Editar" variant="secondary" />
          <IconButton icon={Trash2} label="Excluir" variant="destructive" />
          <IconButton icon={Download} label="Baixar" variant="outline" />
          <IconButton icon={Plus} label="Adicionar" variant="primary" />
          <IconButton icon={Check} label="Aprovar" variant="success" />
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="IconButton — tamanhos">
        <ButtonGroup>
          <IconButton icon={Settings} label="Pequeno" size="sm" />
          <IconButton icon={Settings} label="Médio" size="md" />
          <IconButton icon={Settings} label="Grande" size="lg" />
        </ButtonGroup>
      </ShowcaseSection>

      {/* ============ BUTTON GROUP ============ */}
      <ShowcaseSection title="ButtonGroup — vertical">
        <ButtonGroup orientation="vertical" className="max-w-[200px]">
          <ActionButton label="Salvar" icon={Save} variant="success" />
          <ActionButton label="Editar" icon={Edit} variant="outline" />
          <ActionButton label="Excluir" icon={Trash2} variant="outline-destructive" />
        </ButtonGroup>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
