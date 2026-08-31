import { Mail, Plus, Trash2, Edit, Eye, Save, X, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Grid3x3, List, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { Button, type ButtonColor, type ButtonTone } from '@/components/ui/button';
import { SEMANTIC_COLORS } from '@/components/ui/color-tone';
import { ActionButton, IconButton, ButtonGroup, SegmentedControl, Toolbar, SimplePager } from '@/components/ui/buttons';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

const BUTTON_TONES: ButtonTone[] = ['solid', 'light', 'outline'];

export default function ButtonsPage() {
  const [view, setView] = useState<'grid' | 'list' | 'gallery'>('grid');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });
  const [page, setPage] = useState(2);

  return (
    <ComponentDoc
      summary="Componentes de ação de alto nível: ActionButton (com ícones e loading), IconButton (apenas ícone), ButtonGroup (agrupador), SegmentedControl (toggle de visualização), Toolbar (formatação) e SimplePager (paginação compacta). O Button primitivo aceita color + tone (solid, light, outline) nas 10 cores semânticas."
      importPath="@/components/ui/buttons"
    >
      {/* ============== Button (primitivo) ============== */}
      <DocSection
        title="Button"
        description="Primitivo com 10 cores × 3 tons. Prefira color + tone; variant permanece para ghost, link e atalhos legados."
      >
        <VariantSection
          title="Variantes principais"
          description="solid preenche, light suaviza o fundo, outline só desenha a borda — o mesmo vocabulário de Alert e Panel."
          preview={
            <div className="flex flex-wrap gap-3">
              <Button color="info" tone="light">Ver detalhes</Button>
              <Button color="success" tone="light">Confirmar</Button>
              <Button color="warning" tone="solid">Estoque baixo</Button>
              <Button color="destructive" tone="outline">Tentar de novo</Button>
            </div>
          }
          code={`<Button color="info" tone="light">Ver detalhes</Button>
<Button color="success" tone="light">Confirmar</Button>
<Button color="warning" tone="solid">Estoque baixo</Button>
<Button color="destructive" tone="outline">Tentar de novo</Button>`}
        />

        <VariantSection
          title="Matriz: cor × tom"
          description="As 10 cores semânticas em solid, light e outline."
          preview={
            <div className="space-y-4">
              {BUTTON_TONES.map((tone) => (
                <div key={tone} className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {tone}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SEMANTIC_COLORS.map((color) => (
                      <Button key={`${tone}-${color}`} color={color as ButtonColor} tone={tone} size="sm">
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<Button color="primary" tone="solid">Salvar</Button>
<Button color="primary" tone="light">Salvar</Button>
<Button color="primary" tone="outline">Salvar</Button>`}
        />

        <PropsTable
          rows={[
            { name: 'color', type: 'ButtonColor', description: '10 cores semânticas. Quando definido, sobrepõe variant.' },
            { name: 'tone', type: '"solid" | "light" | "outline"', default: '"solid"', description: 'Tom visual. soft é alias de light.' },
            { name: 'variant', type: '"default" | "primary" | "outline" | "ghost" | "link" | …', default: '"default"', description: 'Atalhos legados quando color não é usado.' },
            { name: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"', description: 'Tamanho do botão.' },
          ]}
        />
        <UsageNote type="tip">
          API recomendada: <code>color</code> + <code>tone</code>. Use <code>variant="ghost"</code> e{' '}
          <code>variant="link"</code> só para ações terciárias. ActionButton e IconButton herdam as mesmas props.
        </UsageNote>
      </DocSection>

      {/* ============== ActionButton ============== */}
      <DocSection
        title="ActionButton"
        description="Botão com ícone à esquerda/direita e estado de loading nativo. Substitui o padrão verboso <Button><Icon/> texto</Button>."
      >
        <VariantSection
          title="Cores e variantes"
          description="Use color + tone (solid, light, outline) ou os atalhos variant."
          preview={
            <div className="flex flex-wrap gap-3">
              <ActionButton label="Primary" icon={Save} />
              <ActionButton label="Success light" color="success" tone="light" icon={Save} />
              <ActionButton label="Warning" color="warning" tone="solid" />
              <ActionButton label="Destructive" color="destructive" tone="outline" icon={Trash2} />
              <ActionButton label="Ghost" variant="ghost" />
            </div>
          }
          code={`<ActionButton label="Salvar" icon={Save} />
<ActionButton label="Confirmar" color="success" tone="light" icon={Save} />
<ActionButton label="Excluir" color="destructive" tone="outline" icon={Trash2} />`}
        />

        <VariantSection
          title="Tamanhos"
          preview={
            <div className="flex flex-wrap items-center gap-3">
              <ActionButton label="Small" size="sm" icon={Plus} />
              <ActionButton label="Default" icon={Plus} />
              <ActionButton label="Large" size="lg" icon={Plus} />
            </div>
          }
          code={`<ActionButton label="Small" size="sm" icon={Plus} />
<ActionButton label="Default" icon={Plus} />
<ActionButton label="Large" size="lg" icon={Plus} />`}
        />

        <VariantSection
          title="Ícone à direita e Loading"
          preview={
            <div className="flex flex-wrap gap-3">
              <ActionButton label="Enviar" iconRight={Mail} />
              <ActionButton label="Salvando" loading loadingLabel="Salvando..." icon={Save} />
              <ActionButton label="Carregando" loading variant="secondary" />
            </div>
          }
          code={`<ActionButton label="Enviar" iconRight={Mail} />
<ActionButton label="Salvando" loading loadingLabel="Salvando..." icon={Save} />`}
        />

        <PropsTable
          rows={[
            { name: 'label', type: 'string', required: true, description: 'Texto exibido no botão.' },
            { name: 'icon', type: 'LucideIcon', description: 'Ícone à esquerda do label.' },
            { name: 'iconRight', type: 'LucideIcon', description: 'Ícone à direita do label.' },
            { name: 'iconSize', type: 'number', default: '16', description: 'Tamanho dos ícones em px.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Mostra spinner e desabilita o botão.' },
            { name: 'loadingLabel', type: 'string', description: 'Texto durante loading. Se ausente mantém o label.' },
            { name: 'color', type: 'ButtonColor', description: 'Cor semântica (com tone). Sobrepõe variant.' },
            { name: 'tone', type: '"solid" | "light" | "outline"', default: '"solid"', description: 'Tom visual quando color é usado.' },
            { name: 'variant', type: '"primary" | "secondary" | "destructive" | "success" | "warning" | "alert" | "info" | "outline" | "ghost" | "link" | …', default: '"primary"', description: 'Atalho legado quando color não é usado.' },
            { name: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"', description: 'Tamanho do botão.' },
            { name: '...ButtonProps', type: 'ButtonHTMLAttributes', description: 'Aceita todas as props nativas de <Button>.' },
          ]}
        />
      </DocSection>

      {/* ============== IconButton ============== */}
      <DocSection
        title="IconButton"
        description="Botão somente com ícone, com label acessível obrigatório (sr-only + aria-label + title)."
      >
        <VariantSection
          title="Tamanhos e variantes"
          preview={
            <div className="flex flex-wrap items-center gap-3">
              <IconButton icon={Edit} label="Editar" size="sm" />
              <IconButton icon={Edit} label="Editar" />
              <IconButton icon={Edit} label="Editar" size="lg" />
              <IconButton icon={Trash2} label="Excluir" color="destructive" tone="outline" />
              <IconButton icon={Eye} label="Ver" variant="ghost" />
              <IconButton icon={Plus} label="Adicionar" color="success" tone="light" />
            </div>
          }
          code={`<IconButton icon={Edit} label="Editar" />
<IconButton icon={Trash2} label="Excluir" variant="destructive" />
<IconButton icon={Eye} label="Visualizar" variant="ghost" size="sm" />`}
        />

        <PropsTable
          rows={[
            { name: 'icon', type: 'LucideIcon', required: true, description: 'Ícone a renderizar.' },
            { name: 'label', type: 'string', required: true, description: 'Texto acessível (sr-only + aria-label + title).' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do quadrado clicável.' },
            { name: 'iconSize', type: 'number', default: '15', description: 'Tamanho do ícone em px.' },
            { name: 'color / tone', type: 'ButtonColor + ButtonTone', description: 'Mesma API de <Button>.' },
            { name: 'variant', type: 'ButtonVariant', default: '"outline"', description: 'Atalho legado herdado de <Button>.' },
          ]}
        />
      </DocSection>

      {/* ============== ButtonGroup ============== */}
      <DocSection
        title="ButtonGroup"
        description="Agrupa botões com espaçamento consistente. Modo `attached` cola os botões formando uma única barra."
      >
        <VariantSection
          title="Espaçado (default)"
          preview={
            <ButtonGroup>
              <ActionButton label="Salvar" icon={Save} />
              <ActionButton label="Cancelar" variant="outline" icon={X} />
            </ButtonGroup>
          }
          code={`<ButtonGroup>
  <ActionButton label="Salvar" icon={Save} />
  <ActionButton label="Cancelar" variant="outline" icon={X} />
</ButtonGroup>`}
        />

        <VariantSection
          title="Attached (colado)"
          preview={
            <ButtonGroup attached>
              <Button variant="outline" size="sm"><Bold size={14} /></Button>
              <Button variant="outline" size="sm"><Italic size={14} /></Button>
              <Button variant="outline" size="sm"><Underline size={14} /></Button>
            </ButtonGroup>
          }
          code={`<ButtonGroup attached>
  <Button variant="outline" size="sm"><Bold /></Button>
  <Button variant="outline" size="sm"><Italic /></Button>
  <Button variant="outline" size="sm"><Underline /></Button>
</ButtonGroup>`}
        />

        <PropsTable
          rows={[
            { name: 'spacing', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Espaçamento entre botões (ignorado se attached).' },
            { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Direção do grupo.' },
            { name: 'wrap', type: 'boolean', default: 'true', description: 'Permite quebra de linha (apenas horizontal).' },
            { name: 'attached', type: 'boolean', default: 'false', description: 'Cola botões compartilhando bordas (toolbar/segmented).' },
          ]}
        />
      </DocSection>

      {/* ============== SegmentedControl ============== */}
      <DocSection
        title="SegmentedControl"
        description="Toggle de visualização (lista/grid, alinhamento, abas compactas). Estado controlado."
      >
        <VariantSection
          title="Com ícones e label"
          preview={
            <SegmentedControl<'grid' | 'list' | 'gallery'>
              value={view}
              onChange={setView}
              options={[
                { value: 'grid', label: 'Grid', icon: Grid3x3 },
                { value: 'list', label: 'Lista', icon: List },
                { value: 'gallery', label: 'Galeria', icon: LayoutGrid },
              ]}
            />
          }
          code={`const [view, setView] = useState<'grid' | 'list' | 'gallery'>('grid');

<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: 'grid', label: 'Grid', icon: Grid3x3 },
    { value: 'list', label: 'Lista', icon: List },
    { value: 'gallery', label: 'Galeria', icon: LayoutGrid },
  ]}
/>`}
        />

        <VariantSection
          title="Cores ativas alternativas"
          preview={
            <div className="flex flex-wrap gap-3">
              <SegmentedControl<'left' | 'center' | 'right'>
                value={align}
                onChange={setAlign}
                color="secondary"
                size="sm"
                options={[
                  { value: 'left', icon: AlignLeft, ariaLabel: 'Esquerda' },
                  { value: 'center', icon: AlignCenter, ariaLabel: 'Centro' },
                  { value: 'right', icon: AlignRight, ariaLabel: 'Direita' },
                ]}
              />
              <SegmentedControl<'left' | 'center' | 'right'>
                value={align}
                onChange={setAlign}
                color="success"
                options={[
                  { value: 'left', icon: AlignLeft, ariaLabel: 'Esquerda' },
                  { value: 'center', icon: AlignCenter, ariaLabel: 'Centro' },
                  { value: 'right', icon: AlignRight, ariaLabel: 'Direita' },
                ]}
              />
            </div>
          }
          code={`<SegmentedControl
  value={align}
  onChange={setAlign}
  color="secondary"
  size="sm"
  options={[...]}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'options', type: 'SegmentedControlOption<T>[]', required: true, description: 'Lista de opções: { value, label?, icon?, ariaLabel? }.' },
            { name: 'value', type: 'T', required: true, description: 'Valor atualmente selecionado.' },
            { name: 'onChange', type: '(value: T) => void', required: true, description: 'Callback ao trocar de opção.' },
            { name: 'color', type: '"primary" | "secondary" | "tertiary" | "accent" | "success" | "warning" | "alert" | "info" | "destructive"', default: '"primary"', description: 'Cor do item ativo.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho dos itens.' },
            { name: 'iconSize', type: 'number', description: 'Sobrescreve tamanho de ícone (default deriva de size).' },
            { name: 'ariaLabel', type: 'string', description: 'Label acessível do grupo.' },
          ]}
        />
      </DocSection>

      {/* ============== Toolbar ============== */}
      <DocSection
        title="Toolbar"
        description="Barra de ações com ícones — formatação de texto, edição, etc. Suporta divisores e item ativo."
      >
        <VariantSection
          title="Toolbar de formatação"
          preview={
            <Toolbar
              activeColor="secondary"
              items={[
                { key: 'b', icon: Bold, label: 'Negrito', active: active.bold, onClick: () => setActive((s) => ({ ...s, bold: !s.bold })) },
                { key: 'i', icon: Italic, label: 'Itálico', active: active.italic, onClick: () => setActive((s) => ({ ...s, italic: !s.italic })) },
                { key: 'u', icon: Underline, label: 'Sublinhado', active: active.underline, onClick: () => setActive((s) => ({ ...s, underline: !s.underline })) },
                { key: 'al', icon: AlignLeft, label: 'Esquerda', divider: true },
                { key: 'ac', icon: AlignCenter, label: 'Centro' },
                { key: 'ar', icon: AlignRight, label: 'Direita' },
              ]}
            />
          }
          code={`<Toolbar
  activeColor="secondary"
  items={[
    { key: 'b', icon: Bold, label: 'Negrito', active: bold, onClick: toggleBold },
    { key: 'i', icon: Italic, label: 'Itálico', active: italic, onClick: toggleItalic },
    { key: 'al', icon: AlignLeft, label: 'Esquerda', divider: true },
    { key: 'ac', icon: AlignCenter, label: 'Centro' },
  ]}
/>`}
        />

        <PropsTable
          rows={[
            { name: 'items', type: 'ToolbarItem[]', required: true, description: 'Cada item: { key, icon, label, onClick?, active?, disabled?, divider? }.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho dos botões.' },
            { name: 'activeColor', type: 'cores semânticas', default: '"primary"', description: 'Cor de fundo dos itens ativos.' },
            { name: 'ariaLabel', type: 'string', default: '"Toolbar"', description: 'Label acessível do grupo.' },
          ]}
        />
      </DocSection>

      {/* ============== SimplePager ============== */}
      <DocSection
        title="SimplePager"
        description="Paginação compacta para uso embarcado em headers e cards."
      >
        <VariantSection
          title="Pager simples"
          preview={
            <SimplePager page={page} total={10} onChange={setPage} />
          }
          code={`const [page, setPage] = useState(1);

<SimplePager page={page} total={10} onChange={setPage} />`}
        />

        <PropsTable
          rows={[
            { name: 'page', type: 'number', required: true, description: 'Página atual (1-indexada).' },
            { name: 'total', type: 'number', required: true, description: 'Total de páginas.' },
            { name: 'onChange', type: '(page: number) => void', required: true, description: 'Callback ao trocar de página.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do componente.' },
            { name: 'formatLabel', type: '(p, t) => string', default: '"Página {p} de {t}"', description: 'Custom da label central.' },
          ]}
        />
      </DocSection>

      <UsageNote type="tip">
        Para paginação numérica completa (com ellipsis), use os componentes em{' '}
        <code className="px-1 py-0.5 rounded bg-surface-container font-mono text-[11px]">
          @/components/ui/pagination-blocks
        </code>{' '}
        documentados na página <strong>Pagination</strong>.
      </UsageNote>
    </ComponentDoc>
  );
}
