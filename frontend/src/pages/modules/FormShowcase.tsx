import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save, X, Home, ChevronRight, Palette, Calendar as CalendarIcon,
  Type, ToggleLeft, List, Bold, Italic, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight, Strikethrough, Highlighter,
  Heading1, Heading2, ListOrdered, Quote
} from 'lucide-react';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapUnderline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { format, startOfWeek, endOfWeek, getISOWeek, getISOWeekYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

type Tab = 'selects' | 'datas' | 'toggles' | 'editor';

const tabs: { key: Tab; label: string; icon: typeof Palette }[] = [
  { key: 'selects', label: 'Selects & Multi-Select', icon: List },
  { key: 'datas', label: 'Datas & Calendários', icon: CalendarIcon },
  { key: 'toggles', label: 'Toggles & Radios', icon: ToggleLeft },
  { key: 'editor', label: 'Editor de Texto Rico', icon: Type },
];

// react-select custom theme for dark/corporate
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--background))',
    borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
    borderRadius: '0.5rem',
    minHeight: '2.5rem',
    fontSize: '0.875rem',
    boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring) / 0.3)' : 'none',
    '&:hover': { borderColor: 'hsl(var(--ring))' },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    zIndex: 50,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'hsl(var(--primary))'
      : state.isFocused
      ? 'hsl(var(--accent))'
      : 'transparent',
    color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
    fontSize: '0.875rem',
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--secondary) / 0.15)',
    borderRadius: '0.375rem',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'hsl(var(--secondary))',
    fontWeight: 500,
    fontSize: '0.75rem',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'hsl(var(--secondary))',
    '&:hover': { backgroundColor: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' },
  }),
  singleValue: (base: any) => ({ ...base, color: 'hsl(var(--foreground))' }),
  input: (base: any) => ({ ...base, color: 'hsl(var(--foreground))' }),
  placeholder: (base: any) => ({ ...base, color: 'hsl(var(--muted-foreground))' }),
};

const categoriaOptions = [
  { value: 'sensores', label: 'Sensores' },
  { value: 'valvulas', label: 'Válvulas' },
  { value: 'controladores', label: 'Controladores' },
  { value: 'transmissores', label: 'Transmissores' },
  { value: 'atuadores', label: 'Atuadores' },
  { value: 'instrumentacao', label: 'Instrumentação' },
];

const estadoOptions = [
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PR', label: 'Paraná' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'BA', label: 'Bahia' },
  { value: 'PE', label: 'Pernambuco' },
];

const prioridadeOptions = [
  { value: 'baixa', label: '🟢 Baixa' },
  { value: 'media', label: '🟡 Média' },
  { value: 'alta', label: '🟠 Alta' },
  { value: 'critica', label: '🔴 Crítica' },
];

const tagOptions = [
  { value: 'industrial', label: 'Industrial' },
  { value: 'automacao', label: 'Automação' },
  { value: 'metalurgia', label: 'Metalurgia' },
  { value: 'quimica', label: 'Química' },
  { value: 'energia', label: 'Energia' },
  { value: 'petroleo', label: 'Petróleo & Gás' },
];

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, span = 1, required }: { label: string; children: React.ReactNode; span?: number; required?: boolean }) {
  const spanClass = span === 2 ? 'md:col-span-2' : span === 3 ? 'md:col-span-2 xl:col-span-3' : '';
  return (
    <div className={spanClass}>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ISO Week display helper
function getISOWeekString(date: Date) {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  return `${year}/${week.toString().padStart(2, '0')}`;
}

// Tiptap toolbar button
function ToolbarBtn({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "p-1.5 rounded transition-colors",
        active ? "bg-secondary/20 text-secondary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export default function FormShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('selects');

  // Select states
  const [categoria, setCategoria] = useState<any>(null);
  const [estados, setEstados] = useState<any>([]);
  const [prioridade, setPrioridade] = useState<any>(null);
  const [tags, setTags] = useState<any>([]);

  // Date states
  const [singleDate, setSingleDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [weekDate, setWeekDate] = useState<Date | undefined>();

  // Toggle/radio states
  const [toggles, setToggles] = useState({
    ativo: true,
    notificacoes: false,
    modoEscuro: false,
    relatorioAuto: true,
    integracaoAPI: false,
    backupAuto: true,
  });
  const [tipoFrete, setTipoFrete] = useState('cif');
  const [status, setStatus] = useState('aprovado');

  // Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapUnderline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: false }),
    ],
    content: `
      <h2>Especificação Técnica — Sensor XK-200</h2>
      <p>O <strong>Sensor XK-200</strong> é projetado para aplicações industriais de alta precisão em ambientes com temperatura de até <em>200°C</em>.</p>
      <h3>Características Principais</h3>
      <ul>
        <li>Faixa de medição: 0-100 bar</li>
        <li>Precisão: ±0.05%</li>
        <li>Protocolo: HART / 4-20mA</li>
        <li>Certificação: ATEX Zona 1</li>
      </ul>
      <blockquote><p>Nota: Este produto requer calibração a cada 12 meses conforme norma ABNT NBR 14105.</p></blockquote>
      <p>Para mais detalhes, consulte o <u>manual técnico MT-XK200-R3</u>.</p>
    `,
  });

  const toggleField = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const weekStart = weekDate ? startOfWeek(weekDate, { weekStartsOn: 1 }) : undefined;
  const weekEnd = weekDate ? endOfWeek(weekDate, { weekStartsOn: 1 }) : undefined;

  return (
    <>
      <div className="px-4 lg:px-8 pt-4 pb-10 space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1"><Home size={13} /> Início</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Showcase de Formulários</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight font-heading">
              Componentes Avançados de Formulário
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Demonstração de componentes para design system ERP</p>
          </div>
          <div className="flex gap-2">
            <Link to="/app" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-muted/50 text-muted-foreground hover:bg-muted transition-colors border border-border">
              <X size={14} /> Fechar
            </Link>
            <button className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-sm">
              <Save size={14} /> Salvar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-medium/50 rounded-xl p-1 border border-border/50 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap relative",
                  isActive
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Icon size={14} />
                {tab.label}
                {isActive && (
                  <motion.div layoutId="showcase-tab" className="absolute inset-0 rounded-lg border-2 border-secondary/30 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-background rounded-2xl border border-border/60 shadow-sm p-6"
        >
          {/* ====== SELECTS TAB ====== */}
          {activeTab === 'selects' && (
            <>
              <FieldGroup title="Select Simples">
                <Field label="Categoria do Produto" required>
                  <Select
                    options={categoriaOptions}
                    value={categoria}
                    onChange={setCategoria}
                    placeholder="Selecione uma categoria..."
                    isClearable
                    styles={selectStyles}
                  />
                </Field>
                <Field label="Prioridade">
                  <Select
                    options={prioridadeOptions}
                    value={prioridade}
                    onChange={setPrioridade}
                    placeholder="Selecione a prioridade..."
                    styles={selectStyles}
                  />
                </Field>
                <Field label="Unidade de Medida">
                  <Select
                    options={[
                      { value: 'un', label: 'Unidade (UN)' },
                      { value: 'kg', label: 'Quilograma (KG)' },
                      { value: 'lt', label: 'Litro (LT)' },
                      { value: 'mt', label: 'Metro (MT)' },
                      { value: 'cx', label: 'Caixa (CX)' },
                    ]}
                    placeholder="Selecione..."
                    styles={selectStyles}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup title="Multi-Select (Select2 Style)">
                <Field label="Estados de Atuação" span={2} required>
                  <Select
                    options={estadoOptions}
                    value={estados}
                    onChange={setEstados}
                    isMulti
                    placeholder="Selecione os estados..."
                    closeMenuOnSelect={false}
                    styles={selectStyles}
                  />
                </Field>
                <Field label="Quantidade selecionada">
                  <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
                    {estados.length} estado(s) selecionado(s)
                  </div>
                </Field>
              </FieldGroup>

              <FieldGroup title="Creatable Multi-Select (Tags)">
                <Field label="Tags / Segmentos" span={2}>
                  <CreatableSelect
                    options={tagOptions}
                    value={tags}
                    onChange={setTags}
                    isMulti
                    placeholder="Digite ou selecione tags..."
                    formatCreateLabel={(input) => `Criar tag "${input}"`}
                    styles={selectStyles}
                  />
                </Field>
                <Field label="Grupo de Vendas">
                  <Select
                    options={[
                      { value: 'industrial', label: 'Vendas Industriais' },
                      { value: 'corporativo', label: 'Vendas Corporativas' },
                      { value: 'governo', label: 'Licitações / Governo' },
                      { value: 'exportacao', label: 'Exportação' },
                    ]}
                    placeholder="Selecione o grupo..."
                    styles={selectStyles}
                    isSearchable
                  />
                </Field>
              </FieldGroup>

              <FieldGroup title="Select com Agrupamento">
                <Field label="Produto por Família" span={2}>
                  <Select
                    options={[
                      {
                        label: '🔧 Instrumentação',
                        options: [
                          { value: 'xk200', label: 'Sensor XK-200' },
                          { value: 'tt300', label: 'Transmissor TT-300' },
                        ],
                      },
                      {
                        label: '⚙️ Atuação',
                        options: [
                          { value: 'vp100', label: 'Válvula VP-100' },
                          { value: 'ae500', label: 'Atuador AE-500' },
                        ],
                      },
                      {
                        label: '🖥️ Controle',
                        options: [
                          { value: 'plc400', label: 'PLC-400' },
                          { value: 'dcs600', label: 'DCS-600' },
                        ],
                      },
                    ]}
                    placeholder="Selecione o produto..."
                    styles={selectStyles}
                  />
                </Field>
              </FieldGroup>
            </>
          )}

          {/* ====== DATES TAB ====== */}
          {activeTab === 'datas' && (
            <>
              <FieldGroup title="Data Simples">
                <Field label="Data de Emissão" required>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm transition-colors hover:border-ring",
                        !singleDate && "text-muted-foreground"
                      )}>
                        <CalendarIcon size={14} className="text-muted-foreground" />
                        {singleDate ? format(singleDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data..."}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={singleDate}
                        onSelect={setSingleDate}
                        locale={ptBR}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Valor formatado">
                  <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
                    {singleDate ? format(singleDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '—'}
                  </div>
                </Field>
              </FieldGroup>

              <FieldGroup title="Intervalo de Datas (Date Range)">
                <Field label="Período do Relatório" span={2} required>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm transition-colors hover:border-ring",
                        !dateRange?.from && "text-muted-foreground"
                      )}>
                        <CalendarIcon size={14} className="text-muted-foreground" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            `${format(dateRange.from, "dd/MM/yyyy")} — ${format(dateRange.to, "dd/MM/yyyy")}`
                          ) : format(dateRange.from, "dd/MM/yyyy")
                        ) : "Selecione o intervalo..."}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        locale={ptBR}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Dias no intervalo">
                  <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
                    {dateRange?.from && dateRange?.to
                      ? `${Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} dias`
                      : '—'}
                  </div>
                </Field>
              </FieldGroup>

              <FieldGroup title="Semana ISO (YYYY/WW)">
                <Field label="Semana de Produção" required>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm transition-colors hover:border-ring",
                        !weekDate && "text-muted-foreground"
                      )}>
                        <CalendarIcon size={14} className="text-muted-foreground" />
                        {weekDate ? getISOWeekString(weekDate) : "Selecione a semana..."}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={weekDate}
                        onSelect={setWeekDate}
                        locale={ptBR}
                        className="p-3 pointer-events-auto"
                        modifiers={{
                          selectedWeek: weekDate
                            ? { from: startOfWeek(weekDate, { weekStartsOn: 1 }), to: endOfWeek(weekDate, { weekStartsOn: 1 }) }
                            : undefined as any,
                        }}
                        modifiersClassNames={{
                          selectedWeek: 'bg-secondary/15 text-secondary rounded-none',
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Intervalo da Semana">
                  <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
                    {weekStart && weekEnd
                      ? `${format(weekStart, "dd/MM")} a ${format(weekEnd, "dd/MM/yyyy")}`
                      : '—'}
                  </div>
                </Field>
                <Field label="Ano ISO / Semana">
                  <div className="h-10 flex items-center gap-2 px-3 rounded-lg bg-secondary/10 border border-secondary/20 text-sm font-mono font-bold text-secondary">
                    {weekDate ? getISOWeekString(weekDate) : '—'}
                  </div>
                </Field>
              </FieldGroup>
            </>
          )}

          {/* ====== TOGGLES TAB ====== */}
          {activeTab === 'toggles' && (
            <>
              <FieldGroup title="Switch Toggle (On/Off)">
                {Object.entries({
                  ativo: { label: 'Status Ativo', desc: 'Registro visível no sistema' },
                  notificacoes: { label: 'Notificações por E-mail', desc: 'Receber alertas de mudanças' },
                  modoEscuro: { label: 'Modo Escuro', desc: 'Tema visual dark' },
                  relatorioAuto: { label: 'Relatório Automático', desc: 'Gerar PDF toda segunda-feira' },
                  integracaoAPI: { label: 'Integração via API', desc: 'Habilitar endpoints REST' },
                  backupAuto: { label: 'Backup Automático', desc: 'Backup diário às 02:00' },
                }).map(([key, { label, desc }]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-medium/30 hover:bg-surface-medium/50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={toggles[key as keyof typeof toggles]}
                      onCheckedChange={() => toggleField(key as keyof typeof toggles)}
                    />
                  </div>
                ))}
              </FieldGroup>

              <FieldGroup title="Radio Buttons — Tipo de Frete">
                <div className="md:col-span-2 xl:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'cif', label: 'CIF', desc: 'Frete por conta do remetente', icon: '🚚' },
                    { value: 'fob', label: 'FOB', desc: 'Frete por conta do destinatário', icon: '📦' },
                    { value: 'terceiros', label: 'Terceiros', desc: 'Frete por conta de terceiros', icon: '🤝' },
                    { value: 'sem', label: 'Sem Frete', desc: 'Retirada no local', icon: '🏭' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTipoFrete(opt.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                        tipoFrete === opt.value
                          ? "border-secondary bg-secondary/10 shadow-sm"
                          : "border-border hover:border-muted-foreground/30 bg-surface-medium/20"
                      )}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className={cn("text-sm font-bold", tipoFrete === opt.value ? "text-secondary" : "text-foreground")}>{opt.label}</span>
                      <span className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</span>
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1",
                        tipoFrete === opt.value ? "border-secondary" : "border-muted-foreground/40"
                      )}>
                        {tipoFrete === opt.value && <div className="w-2 h-2 rounded-full bg-secondary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup title="Radio Buttons — Status do Pedido">
                <div className="md:col-span-2 xl:col-span-3 flex flex-wrap gap-2">
                  {[
                    { value: 'rascunho', label: 'Rascunho', color: 'bg-muted text-muted-foreground border-muted' },
                    { value: 'pendente', label: 'Pendente', color: 'bg-status-pending/10 text-status-pending border-status-pending/30' },
                    { value: 'aprovado', label: 'Aprovado', color: 'bg-status-success/10 text-status-success border-status-success/30' },
                    { value: 'producao', label: 'Em Produção', color: 'bg-secondary/10 text-secondary border-secondary/30' },
                    { value: 'faturado', label: 'Faturado', color: 'bg-accent/20 text-accent border-accent/30' },
                    { value: 'cancelado', label: 'Cancelado', color: 'bg-destructive/10 text-destructive border-destructive/30' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStatus(opt.value)}
                      className={cn(
                        "px-4 py-2 rounded-full border-2 text-xs font-bold transition-all",
                        status === opt.value
                          ? `${opt.color} ring-2 ring-offset-1 ring-current/20`
                          : "border-border text-muted-foreground hover:border-muted-foreground/40 bg-background"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup title="Checkbox Cards">
                <div className="md:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { key: 'ativo', label: 'Registro Ativo', icon: '✅' },
                    { key: 'relatorioAuto', label: 'Relatório Automático', icon: '📊' },
                    { key: 'backupAuto', label: 'Backup Diário', icon: '💾' },
                  ].map(item => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleField(item.key as keyof typeof toggles)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                        toggles[item.key as keyof typeof toggles]
                          ? "border-secondary bg-secondary/5"
                          : "border-border bg-surface-medium/20 hover:border-muted-foreground/30"
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-semibold text-foreground flex-1">{item.label}</span>
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center border-2 transition-colors",
                        toggles[item.key as keyof typeof toggles]
                          ? "bg-secondary border-secondary text-white"
                          : "border-muted-foreground/40"
                      )}>
                        {toggles[item.key as keyof typeof toggles] && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </FieldGroup>
            </>
          )}

          {/* ====== EDITOR TAB ====== */}
          {activeTab === 'editor' && (
            <>
              <FieldGroup title="Editor de Texto Rico (Tiptap — alternativa a TinyMCE / CKEditor)">
                <div className="md:col-span-2 xl:col-span-3">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Especificação Técnica / Observações
                  </label>
                  <div className="border border-border rounded-xl overflow-hidden bg-background">
                    {/* Toolbar */}
                    {editor && (
                      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border bg-surface-medium/30">
                        <ToolbarBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Negrito">
                          <Bold size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Itálico">
                          <Italic size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Sublinhado">
                          <UnderlineIcon size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Riscado">
                          <Strikethrough size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Realçar">
                          <Highlighter size={15} />
                        </ToolbarBtn>
                        <div className="w-px h-5 bg-border mx-1" />
                        <ToolbarBtn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Título 1">
                          <Heading1 size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Título 2">
                          <Heading2 size={15} />
                        </ToolbarBtn>
                        <div className="w-px h-5 bg-border mx-1" />
                        <ToolbarBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Lista">
                          <List size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Lista Numerada">
                          <ListOrdered size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Citação">
                          <Quote size={15} />
                        </ToolbarBtn>
                        <div className="w-px h-5 bg-border mx-1" />
                        <ToolbarBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Alinhar à Esquerda">
                          <AlignLeft size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Centralizar">
                          <AlignCenter size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Alinhar à Direita">
                          <AlignRight size={15} />
                        </ToolbarBtn>
                      </div>
                    )}
                    {/* Editor Area */}
                    <EditorContent
                      editor={editor}
                      className="prose prose-sm max-w-none p-4 min-h-[250px] focus:outline-none
                        [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]
                        [&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-foreground [&_.ProseMirror_h1]:mb-3
                        [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-foreground [&_.ProseMirror_h2]:mb-2
                        [&_.ProseMirror_h3]:text-base [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-foreground [&_.ProseMirror_h3]:mb-2
                        [&_.ProseMirror_p]:text-sm [&_.ProseMirror_p]:text-foreground [&_.ProseMirror_p]:mb-2
                        [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-2
                        [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-2
                        [&_.ProseMirror_li]:text-sm [&_.ProseMirror_li]:text-foreground
                        [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-secondary/30 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground
                        [&_.ProseMirror_mark]:bg-accent/40 [&_.ProseMirror_mark]:rounded [&_.ProseMirror_mark]:px-0.5
                        [&_.ProseMirror_u]:underline
                      "
                    />
                    {/* Footer */}
                    <div className="flex items-center justify-between px-3 py-1.5 border-t border-border bg-surface-medium/20 text-[10px] text-muted-foreground">
                      <span>Tiptap Editor — Compatível com TinyMCE / CKEditor</span>
                      <span>{editor?.storage.characterCount?.characters?.() || '—'} caracteres</span>
                    </div>
                  </div>
                </div>
              </FieldGroup>

              <FieldGroup title="Textarea Simples (fallback)">
                <Field label="Observações Gerais" span={2}>
                  <textarea
                    rows={4}
                    placeholder="Digite observações em texto plano..."
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                  />
                </Field>
              </FieldGroup>
            </>
          )}

        </motion.div>
      </div>
    </>
  );
}
