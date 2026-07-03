import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, ChevronRight, Search, MoreVertical, MessageSquare, FileText, Plus,
  Users, Star, DollarSign, Clock, RefreshCw, CheckCircle2, ShoppingCart,
  ShieldAlert, Compass, Settings2, MailCheck, Edit, Send, BarChart3,
  ChevronLeft, ChevronsLeft, ChevronsRight,
  FileBarChart, Calculator, Settings, Copy, Paperclip, Activity, Printer,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/* ── 14 Status (espelhando a tela legada) ────────────────────────── */
type StatusDef = { key: string; label: string; icon: any; tone: string; isView?: boolean };
const statuses: readonly StatusDef[] = [
  { key: 'visitas',     label: 'Visitas',         icon: Users,        tone: 'sky' },
  { key: 'leads',       label: 'Leads',           icon: Star,         tone: 'amber' },
  { key: 'cotacao',     label: 'Cotação',         icon: DollarSign,   tone: 'violet' },
  { key: 'cons_pend',   label: 'Cons. Pendentes', icon: Clock,        tone: 'orange' },
  { key: 'revisao',     label: 'Em Revisão',      icon: RefreshCw,    tone: 'blue' },
  { key: 'ativas',      label: 'Ativas',          icon: CheckCircle2, tone: 'emerald' },
  { key: 'pedidos',     label: 'Pedidos',         icon: ShoppingCart, tone: 'teal' },
  { key: 'moderar',     label: 'Moderar',         icon: ShieldAlert,  tone: 'rose' },
  { key: 'prospeccao',  label: 'Prospecção',      icon: Compass,      tone: 'indigo' },
  { key: 'set',         label: 'SET',             icon: Settings2,    tone: 'slate' },
  { key: 'cons_resp',   label: 'Cons. Resp.',     icon: MailCheck,    tone: 'cyan' },
  { key: 'elaboracao',  label: 'Em Elaboração',   icon: Edit,         tone: 'lime' },
  { key: 'followup',    label: 'Ag. Follow Up',   icon: Send,         tone: 'pink' },
  { key: 'dashboard',   label: 'Dashboard',       icon: BarChart3,    tone: 'primary', isView: true },
] as const;

type StatusKey = string;

const toneClasses: Record<string, { bg: string; text: string; border: string; soft: string }> = {
  sky:      { bg: 'bg-sky-500',     text: 'text-sky-400',     border: 'border-sky-500/30',     soft: 'bg-sky-500/10' },
  amber:    { bg: 'bg-amber-500',   text: 'text-amber-400',   border: 'border-amber-500/30',   soft: 'bg-amber-500/10' },
  violet:   { bg: 'bg-violet-500',  text: 'text-violet-400',  border: 'border-violet-500/30',  soft: 'bg-violet-500/10' },
  orange:   { bg: 'bg-orange-500',  text: 'text-orange-400',  border: 'border-orange-500/30',  soft: 'bg-orange-500/10' },
  blue:     { bg: 'bg-blue-500',    text: 'text-blue-400',    border: 'border-blue-500/30',    soft: 'bg-blue-500/10' },
  emerald:  { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', soft: 'bg-emerald-500/10' },
  teal:     { bg: 'bg-teal-500',    text: 'text-teal-400',    border: 'border-teal-500/30',    soft: 'bg-teal-500/10' },
  rose:     { bg: 'bg-rose-500',    text: 'text-rose-400',    border: 'border-rose-500/30',    soft: 'bg-rose-500/10' },
  indigo:   { bg: 'bg-indigo-500',  text: 'text-indigo-400',  border: 'border-indigo-500/30',  soft: 'bg-indigo-500/10' },
  slate:    { bg: 'bg-slate-500',   text: 'text-slate-400',   border: 'border-slate-500/30',   soft: 'bg-slate-500/10' },
  cyan:     { bg: 'bg-cyan-500',    text: 'text-cyan-400',    border: 'border-cyan-500/30',    soft: 'bg-cyan-500/10' },
  lime:     { bg: 'bg-lime-500',    text: 'text-lime-400',    border: 'border-lime-500/30',    soft: 'bg-lime-500/10' },
  pink:     { bg: 'bg-pink-500',    text: 'text-pink-400',    border: 'border-pink-500/30',    soft: 'bg-pink-500/10' },
  primary:  { bg: 'bg-primary',     text: 'text-primary',     border: 'border-primary/30',     soft: 'bg-primary/10' },
};

/* ── Mock de propostas ───────────────────────────────────────────── */
type Proposta = {
  id: string;
  cliente: string;
  tipo: 'A' | 'B' | 'C';
  status: StatusKey;
  origem: string;
  atualizado: string;
  valor: number;
  vendedor: string;
  progresso: 20 | 50 | 70 | 100;
};

const propostas: Proposta[] = [
  { id: '0675709-0', cliente: 'FURLAN INDUSTRIAL', tipo: 'C', status: 'elaboracao', origem: 'BR - FEAVI', atualizado: '24/01/2023', valor: 7167.87,  vendedor: 'Juliano Bonini',  progresso: 50 },
  { id: '0685643-0', cliente: 'RANAZZI METALÚRGICA', tipo: 'C', status: 'elaboracao', origem: 'BR - S/COM', atualizado: '12/01/2023', valor: 10756.15, vendedor: 'Juliano Bonini',  progresso: 70 },
  { id: '0691201-0', cliente: 'AÇOS VICTORIA LTDA', tipo: 'A', status: 'ativas',     origem: 'BR - SUL',   atualizado: '15/02/2023', valor: 23450.00, vendedor: 'Mariana Costa',   progresso: 100 },
  { id: '0693412-0', cliente: 'METALPACK IND. E COM.', tipo: 'B', status: 'ativas',   origem: 'BR - FEAVI', atualizado: '18/02/2023', valor: 8920.50,  vendedor: 'Mariana Costa',   progresso: 100 },
  { id: '0694100-0', cliente: 'TECNOFERRO LTDA',     tipo: 'A', status: 'leads',     origem: 'BR - NORTE', atualizado: '20/02/2023', valor: 15300.00, vendedor: 'Carlos Mendes',   progresso: 20 },
  { id: '0695201-0', cliente: 'SIDERÚRGICA PARANÁ',  tipo: 'C', status: 'cotacao',   origem: 'BR - SUL',   atualizado: '22/02/2023', valor: 42100.00, vendedor: 'Carlos Mendes',   progresso: 50 },
  { id: '0695890-0', cliente: 'MINERAÇÃO VALE VERDE', tipo: 'A', status: 'cons_pend', origem: 'BR - MG',    atualizado: '25/02/2023', valor: 67800.00, vendedor: 'Ana Souza',       progresso: 20 },
  { id: '0696100-0', cliente: 'COMPRESSORES ATLAS',  tipo: 'B', status: 'revisao',   origem: 'BR - SP',    atualizado: '01/03/2023', valor: 31200.00, vendedor: 'Ana Souza',       progresso: 70 },
  { id: '0696455-0', cliente: 'BOMBAS HIDRÁULICAS SA', tipo: 'C', status: 'followup', origem: 'BR - RS',   atualizado: '03/03/2023', valor: 19450.00, vendedor: 'Juliano Bonini',  progresso: 70 },
  { id: '0697001-0', cliente: 'ENGRENAGENS PREMIUM', tipo: 'A', status: 'visitas',   origem: 'BR - SC',    atualizado: '05/03/2023', valor: 5600.00,  vendedor: 'Mariana Costa',   progresso: 20 },
  { id: '0697500-0', cliente: 'FUNDIÇÃO ESTRELA',    tipo: 'B', status: 'pedidos',   origem: 'BR - PR',    atualizado: '08/03/2023', valor: 12350.00, vendedor: 'Carlos Mendes',   progresso: 100 },
  { id: '0698010-0', cliente: 'USINAGEM PRECISA IND.', tipo: 'A', status: 'pedidos', origem: 'BR - SP',    atualizado: '10/03/2023', valor: 28900.00, vendedor: 'Ana Souza',       progresso: 100 },
  { id: '0698300-0', cliente: 'CALDEIRARIA FORTE',   tipo: 'C', status: 'prospeccao', origem: 'BR - MG',   atualizado: '12/03/2023', valor: 45600.00, vendedor: 'Juliano Bonini',  progresso: 20 },
  { id: '0698750-0', cliente: 'TUBOS E CONEXÕES BR', tipo: 'B', status: 'leads',     origem: 'BR - RS',    atualizado: '15/03/2023', valor: 8200.00,  vendedor: 'Mariana Costa',   progresso: 50 },
  { id: '0699112-0', cliente: 'MOTORES POTENZA',     tipo: 'A', status: 'cons_resp', origem: 'BR - SP',    atualizado: '17/03/2023', valor: 51200.00, vendedor: 'Ana Souza',       progresso: 70 },
  { id: '0699550-0', cliente: 'ROLAMENTOS SUL',      tipo: 'B', status: 'moderar',   origem: 'BR - RS',    atualizado: '19/03/2023', valor: 9870.00,  vendedor: 'Carlos Mendes',   progresso: 50 },
  { id: '0700001-0', cliente: 'INDUSTRIAL PETROBRAS', tipo: 'A', status: 'set',      origem: 'BR - RJ',    atualizado: '21/03/2023', valor: 128400.00, vendedor: 'Juliano Bonini', progresso: 100 },
];

const vendedores = ['Todos', 'Juliano Bonini', 'Mariana Costa', 'Carlos Mendes', 'Ana Souza'];
const escopos = ['Minhas', 'Grupo', 'O.s. De Sistema'] as const;
const progressos = ['Todas', '20%', '50%', '70%', '100%'] as const;
const ordenadores = ['Cliente', 'Semana', 'Vendedor', 'Elaborador'] as const;
const categoriasBusca = ['Tudo', 'Cliente', 'Nº O.S.', 'Origem'];

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ── Component ───────────────────────────────────────────────────── */
export default function PropostasShowcase() {
  const [activeStatus, setActiveStatus] = useState<StatusKey | 'todas'>('todas');
  const [escopo, setEscopo] = useState<typeof escopos[number]>('Minhas');
  const [progresso, setProgresso] = useState<typeof progressos[number]>('Todas');
  const [ordenador, setOrdenador] = useState<typeof ordenadores[number]>('Vendedor');
  const [search, setSearch] = useState('');
  const [searchCat, setSearchCat] = useState('Tudo');
  const [perPage, setPerPage] = useState(20);

  /* contadores por status */
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    statuses.forEach(s => { c[s.key] = propostas.filter(p => p.status === s.key).length; });
    return c;
  }, []);

  /* filtragem */
  const filtered = useMemo(() => {
    return propostas.filter(p => {
      if (activeStatus !== 'todas' && p.status !== activeStatus) return false;
      if (progresso !== 'Todas' && `${p.progresso}%` !== progresso) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay =
          searchCat === 'Cliente' ? p.cliente :
          searchCat === 'Nº O.S.' ? p.id :
          searchCat === 'Origem'  ? p.origem :
          `${p.cliente} ${p.id} ${p.origem} ${p.vendedor}`;
        if (!hay.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeStatus, progresso, search, searchCat]);

  /* ordenação + agrupamento por vendedor */
  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      switch (ordenador) {
        case 'Cliente':    return a.cliente.localeCompare(b.cliente);
        case 'Semana':     return a.atualizado.localeCompare(b.atualizado);
        case 'Elaborador': return a.vendedor.localeCompare(b.vendedor);
        case 'Vendedor':
        default:           return a.vendedor.localeCompare(b.vendedor);
      }
    });
    const map = new Map<string, Proposta[]>();
    sorted.forEach(p => {
      const key = ordenador === 'Cliente' ? p.cliente : p.vendedor;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });
    return Array.from(map.entries());
  }, [filtered, ordenador]);

  const totalGeral = filtered.reduce((sum, p) => sum + p.valor, 0);

  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Comercial</span>
        <ChevronRight size={12} />
        <span>Movimentos</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Propostas</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Propostas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestão de Vendas — modelo alternativo com painel de status, filtros e agrupamento.
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus size={14} /> Nova Pré-O.S.
        </Button>
      </div>

      {/* ── Painel de 14 Status (KPIs clicáveis) ── */}
      <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <span className="w-8 h-px bg-border" />
            Painel de Status
          </h3>
          <button
            onClick={() => setActiveStatus('todas')}
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors',
              activeStatus === 'todas'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted/40'
            )}
          >
            Todas ({propostas.length})
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {statuses.map((s) => {
            const tone = toneClasses[s.tone];
            const count = counts[s.key] ?? 0;
            const isActive = activeStatus === s.key;
            const Icon = s.icon;
            return (
              <motion.button
                key={s.key}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => !s.isView && setActiveStatus(isActive ? 'todas' : (s.key as StatusKey))}
                className={cn(
                  'group relative rounded-xl border p-2.5 text-left transition-all',
                  isActive
                    ? `${tone.border} ${tone.soft} ring-1 ring-current ${tone.text}`
                    : 'border-border/40 bg-surface-container-low hover:border-border'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', tone.soft, tone.text)}>
                    <Icon size={14} />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground truncate uppercase tracking-wide flex-1 min-w-0">
                    {s.label}
                  </p>
                  <p className={cn('text-sm font-bold leading-none shrink-0', isActive ? tone.text : 'text-foreground')}>
                    {s.isView ? '—' : count}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Toolbar: escopo + progresso + ordenador + busca ── */}
      <div className="bg-surface-container rounded-2xl border border-border/40 p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Escopo */}
          <div className="inline-flex rounded-lg border border-border bg-surface-container-low p-0.5">
            {escopos.map((e) => (
              <button
                key={e}
                onClick={() => setEscopo(e)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  escopo === e ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {e}
              </button>
            ))}
          </div>

          {/* Progresso */}
          <div className="inline-flex rounded-lg border border-border bg-surface-container-low p-0.5 ml-auto">
            {progressos.map((p) => (
              <button
                key={p}
                onClick={() => setProgresso(p)}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  progresso === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Ordenador */}
          <div className="inline-flex rounded-lg border border-border bg-surface-container-low p-0.5">
            {ordenadores.map((o) => (
              <button
                key={o}
                onClick={() => setOrdenador(o)}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  ordenador === o ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Busca */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <select
              value={searchCat}
              onChange={(e) => setSearchCat(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-surface-container-low border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {categoriasBusca.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="relative flex-1">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar propostas..."
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-container-low border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Total:</span>{' '}
            <span className="font-bold text-primary">{fmt(totalGeral)}</span>
          </div>
        </div>
      </div>

      {/* ── Tabela agrupada ── */}
      <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead className="bg-muted/90 border-b-2 border-border sticky top-0 z-10">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:text-[10px] [&>th]:font-bold [&>th]:uppercase [&>th]:tracking-wider [&>th]:text-foreground">
                <th className="w-[110px]">Pré-O.Ss.</th>
                <th>Clientes</th>
                <th className="w-[160px]">Status</th>
                <th className="w-[140px]">Origem</th>
                <th className="w-[130px]">Atualizado em</th>
                <th className="w-[130px] text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {grouped.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    Nenhuma proposta encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : grouped.map(([groupName, items]) => {
                const groupTotal = items.reduce((s, p) => s + p.valor, 0);
                return (
                  <GroupBlock key={groupName} name={groupName} count={items.length} total={groupTotal} items={items} />
                );
              })}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr className="bg-muted/90 border-t-2 border-border">
                  <td colSpan={5} className="px-4 py-3.5 text-right text-xs font-bold text-foreground uppercase tracking-widest">
                    Valor Total Geral
                  </td>
                  <td className="px-4 py-3.5 text-right text-sm font-bold text-foreground bg-muted">{fmt(totalGeral)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-border/40 bg-surface-container-low/50 flex-wrap">
          <p className="text-xs text-muted-foreground">
            Exibindo <span className="font-semibold text-foreground">{filtered.length}</span> de{' '}
            <span className="font-semibold text-foreground">{propostas.length}</span> propostas
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground mr-2">Páginas</span>
            <button className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-40" disabled>
              <ChevronsLeft size={14} />
            </button>
            <button className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-40" disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="px-3 py-1.5 rounded-md border border-border text-xs font-medium text-foreground bg-muted/40">
              Próximo
            </button>
            <button className="px-3 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40">
              Todas
            </button>
            <button className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40">
              <ChevronsRight size={14} />
            </button>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="ml-2 px-2 py-1.5 rounded-md bg-surface-container-low border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {[20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Subcomponente: bloco agrupado ───────────────────────────────── */
function GroupBlock({
  name, count, total, items,
}: { name: string; count: number; total: number; items: Proposta[] }) {
  return (
    <>
      {/* Cabeçalho do grupo */}
<tr className="bg-muted/50">
                      <td colSpan={6} className="px-4 py-2.5 border-b border-[#ccc]">
          <div className="flex items-center gap-3 text-xs">
            <span className="w-1 h-4 rounded-full bg-muted-foreground/60" />
            <span className="font-semibold text-foreground">{name}</span>
            <span className="text-muted-foreground">Qtd.: <span className="font-medium text-foreground">{count}</span></span>
            <span className="text-muted-foreground ml-auto">Subtotal: <span className="font-medium text-foreground">{fmt(total)}</span></span>
          </div>
        </td>
      </tr>
{/* Separador fino cinza claro */}
                        <tr className="h-1 border-b border-[#ccc]" />
      {items.map((p, idx) => {
        const st = statuses.find(s => s.key === p.status)!;
        const tone = toneClasses[st.tone];
        return (
          <tr
            key={p.id}
            className={cn(
              'border-b border-border/30 transition-colors',
              idx % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low/50',
              'hover:bg-accent/10'
            )}
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      title="Ações"
                      className="text-muted-foreground hover:text-primary p-0.5 rounded hover:bg-muted/40 transition-colors"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-52">
                    <DropdownMenuLabel className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Printer size={12} /> Gerar Impressão
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <FileBarChart size={14} className="text-rose-500" /> Proposta
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <Calculator size={14} className="text-rose-500" /> Memorial de Cálculo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <Settings size={14} /> Configurar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Outros
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <Copy size={14} className="text-primary" /> Copiar Proposta
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <Paperclip size={14} className="text-primary" /> Arquivos Anexos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">
                      <Activity size={14} className="text-primary" /> Follow up
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button title="Comentários" className="text-muted-foreground hover:text-primary"><MessageSquare size={13} /></button>
                <button title="Documento" className="text-muted-foreground hover:text-primary"><FileText size={13} /></button>
                <span className="ml-1 text-xs font-mono font-semibold text-primary">{p.id}</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0',
                  p.tipo === 'A' ? 'bg-status-success' : p.tipo === 'B' ? 'bg-status-warning' : 'bg-status-error'
                )}>{p.tipo}</span>
                <span className="text-xs font-medium text-foreground truncate">{p.cliente}</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <span className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border',
                tone.soft, tone.text, tone.border
              )}>
                {st.label}
              </span>
            </td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{p.origem}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground">{p.atualizado}</td>
            <td className="px-4 py-3 text-right text-xs font-semibold text-primary">{fmt(p.valor)}</td>
          </tr>
        );
      })}
    </>
  );
}
