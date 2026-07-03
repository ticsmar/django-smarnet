import { useState } from 'react';
import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  SegmentedControl,
  Toolbar,
  SimplePager,
  ActionButton,
} from '@/components/ui/buttons';
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Grid3X3, LayoutList, LayoutGrid,
  Bold, Italic, Underline, Strikethrough, Link2, Image as ImageIcon,
  Save, Edit, Trash2, Plus, Download,
} from 'lucide-react';

export default function ButtonGroupShowcase() {
  const [align, setAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [view, setView] = useState<'list' | 'grid' | 'compact'>('grid');
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [page, setPage] = useState(3);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(true);

  return (
    <UIShowcaseLayout
      title="Button Group"
      description="Componentes prontos em src/components/ui/buttons/ — ButtonGroup, SegmentedControl, Toolbar e SimplePager. Suportam todas as cores do design system."
    >
      {/* ============ BUTTON GROUP — espaçado ============ */}
      <ShowcaseSection title="ButtonGroup espaçado (default)">
        <ButtonGroup>
          <ActionButton label="Novo" icon={Plus} variant="primary" />
          <ActionButton label="Editar" icon={Edit} variant="secondary" />
          <ActionButton label="Salvar" icon={Save} variant="success" />
          <ActionButton label="Excluir" icon={Trash2} variant="destructive" />
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="ButtonGroup vertical">
        <ButtonGroup orientation="vertical" className="max-w-[200px]">
          <ActionButton label="Salvar" icon={Save} variant="success" />
          <ActionButton label="Editar" icon={Edit} variant="outline" />
          <ActionButton label="Excluir" icon={Trash2} variant="outline-destructive" />
          <ActionButton label="Exportar" icon={Download} variant="outline" />
        </ButtonGroup>
      </ShowcaseSection>

      {/* ============ BUTTON GROUP attached ============ */}
      <ShowcaseSection title="ButtonGroup attached (botões colados)">
        <ButtonGroup attached>
          <Button variant="ghost" className="border-0">Dia</Button>
          <Button variant="ghost" className="border-0">Semana</Button>
          <Button variant="ghost" className="border-0">Mês</Button>
          <Button variant="ghost" className="border-0">Ano</Button>
        </ButtonGroup>
      </ShowcaseSection>

      {/* ============ SEGMENTED CONTROL — cores do system ============ */}
      <ShowcaseSection title="SegmentedControl — alinhamento (cor primary)">
        <SegmentedControl<'left' | 'center' | 'right' | 'justify'>
          ariaLabel="Alinhamento"
          value={align}
          onChange={setAlign}
          options={[
            { value: 'left', icon: AlignLeft, ariaLabel: 'Alinhar à esquerda' },
            { value: 'center', icon: AlignCenter, ariaLabel: 'Centralizar' },
            { value: 'right', icon: AlignRight, ariaLabel: 'Alinhar à direita' },
            { value: 'justify', icon: AlignJustify, ariaLabel: 'Justificar' },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="SegmentedControl — visualização com label (cor accent)">
        <SegmentedControl<'list' | 'grid' | 'compact'>
          color="accent"
          value={view}
          onChange={setView}
          options={[
            { value: 'list', icon: LayoutList, label: 'Lista' },
            { value: 'grid', icon: LayoutGrid, label: 'Grade' },
            { value: 'compact', icon: Grid3X3, label: 'Compacto' },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="SegmentedControl — período (todas as cores)">
        <div className="space-y-3">
          {(['primary', 'secondary', 'tertiary', 'accent', 'success', 'warning', 'alert', 'info', 'destructive'] as const).map((c) => (
            <div key={c} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-20 capitalize">{c}</span>
              <SegmentedControl<'day' | 'week' | 'month' | 'year'>
                color={c}
                value={period}
                onChange={setPeriod}
                options={[
                  { value: 'day', label: 'Dia' },
                  { value: 'week', label: 'Semana' },
                  { value: 'month', label: 'Mês' },
                  { value: 'year', label: 'Ano' },
                ]}
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="SegmentedControl — tamanhos">
        <div className="flex items-center gap-4">
          <SegmentedControl<'list' | 'grid' | 'compact'>
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { value: 'list', icon: LayoutList, label: 'SM' },
              { value: 'grid', icon: LayoutGrid, label: 'SM' },
            ]}
          />
          <SegmentedControl<'list' | 'grid' | 'compact'>
            size="md"
            value={view}
            onChange={setView}
            options={[
              { value: 'list', icon: LayoutList, label: 'MD' },
              { value: 'grid', icon: LayoutGrid, label: 'MD' },
            ]}
          />
          <SegmentedControl<'list' | 'grid' | 'compact'>
            size="lg"
            value={view}
            onChange={setView}
            options={[
              { value: 'list', icon: LayoutList, label: 'LG' },
              { value: 'grid', icon: LayoutGrid, label: 'LG' },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* ============ TOOLBAR ============ */}
      <ShowcaseSection title="Toolbar de formatação (com estado ativo + divisores)">
        <Toolbar
          ariaLabel="Formatação de texto"
          items={[
            { key: 'bold', icon: Bold, label: 'Negrito', active: bold, onClick: () => setBold(v => !v) },
            { key: 'italic', icon: Italic, label: 'Itálico', active: italic, onClick: () => setItalic(v => !v) },
            { key: 'underline', icon: Underline, label: 'Sublinhado' },
            { key: 'strike', icon: Strikethrough, label: 'Tachado' },
            { key: 'link', icon: Link2, label: 'Link', divider: true },
            { key: 'image', icon: ImageIcon, label: 'Imagem' },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Toolbar — cor ativa info">
        <Toolbar
          activeColor="info"
          items={[
            { key: 'bold', icon: Bold, label: 'Negrito', active: true },
            { key: 'italic', icon: Italic, label: 'Itálico' },
            { key: 'underline', icon: Underline, label: 'Sublinhado' },
          ]}
        />
      </ShowcaseSection>

      {/* ============ SIMPLE PAGER ============ */}
      <ShowcaseSection title="SimplePager (paginação simplificada)">
        <div className="space-y-3">
          <SimplePager page={page} total={12} onChange={setPage} />
          <SimplePager page={page} total={12} onChange={setPage} size="sm" />
          <SimplePager
            page={page}
            total={12}
            onChange={setPage}
            size="lg"
            formatLabel={(p, t) => `${p} / ${t}`}
          />
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
