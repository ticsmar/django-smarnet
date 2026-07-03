import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, ChevronRight, Search, Filter, Eye, Edit,
  FileText, Clock, CheckCircle2, AlertTriangle, XCircle,
  Send, RefreshCw, Star, TrendingUp, DollarSign, Users
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Status definitions
const statuses = [
  { key: 'todas', label: 'Todas', icon: FileText, color: 'bg-muted text-muted-foreground' },
  { key: 'visita', label: 'Visitas', icon: Users, color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  { key: 'lead', label: 'Leads', icon: Star, color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  { key: 'cotacao', label: 'Cotação', icon: DollarSign, color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  { key: 'pendente', label: 'Cons. Pendentes', icon: Clock, color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  { key: 'revisao', label: 'Em Revisão', icon: RefreshCw, color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  { key: 'elaboracao', label: 'Em Elaboração', icon: Edit, color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
  { key: 'ativa', label: 'Ativas', icon: CheckCircle2, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { key: 'followup', label: 'Ag. Follow Up', icon: Send, color: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  { key: 'cancelada', label: 'Canceladas', icon: XCircle, color: 'bg-red-500/15 text-red-400 border-red-500/30' },
];

// Mock proposals
const proposals = [
  { id: 'OS-0675709-0', cliente: 'FURLAN INDUSTRIAL', status: 'elaboracao', origem: 'BR - FEAVI', atualizado: '24/01/2023', valor: 7167.87, vendedor: 'Juliano Bonini', tipo: 'C' },
  { id: 'OS-0685643-0', cliente: 'RANAZZI METALÚRGICA', status: 'elaboracao', origem: 'BR - S/COM', atualizado: '12/01/2023', valor: 10756.15, vendedor: 'Juliano Bonini', tipo: 'C' },
  { id: 'OS-0691201-0', cliente: 'AÇOS VICTORIA LTDA', status: 'ativa', origem: 'BR - SUL', atualizado: '15/02/2023', valor: 23450.00, vendedor: 'Mariana Costa', tipo: 'A' },
  { id: 'OS-0693412-0', cliente: 'METALPACK IND. E COM.', status: 'ativa', origem: 'BR - FEAVI', atualizado: '18/02/2023', valor: 8920.50, vendedor: 'Mariana Costa', tipo: 'B' },
  { id: 'OS-0694100-0', cliente: 'TECNOFERRO LTDA', status: 'lead', origem: 'BR - NORTE', atualizado: '20/02/2023', valor: 15300.00, vendedor: 'Carlos Mendes', tipo: 'A' },
  { id: 'OS-0695201-0', cliente: 'SIDERÚRGICA PARANÁ', status: 'cotacao', origem: 'BR - SUL', atualizado: '22/02/2023', valor: 42100.00, vendedor: 'Carlos Mendes', tipo: 'C' },
  { id: 'OS-0695890-0', cliente: 'MINERAÇÃO VALE VERDE', status: 'pendente', origem: 'BR - MG', atualizado: '25/02/2023', valor: 67800.00, vendedor: 'Ana Souza', tipo: 'A' },
  { id: 'OS-0696100-0', cliente: 'COMPRESSORES ATLAS', status: 'revisao', origem: 'BR - SP', atualizado: '01/03/2023', valor: 31200.00, vendedor: 'Ana Souza', tipo: 'B' },
  { id: 'OS-0696455-0', cliente: 'BOMBAS HIDRÁULICAS SA', status: 'followup', origem: 'BR - RS', atualizado: '03/03/2023', valor: 19450.00, vendedor: 'Juliano Bonini', tipo: 'C' },
  { id: 'OS-0697001-0', cliente: 'ENGRENAGENS PREMIUM', status: 'visita', origem: 'BR - SC', atualizado: '05/03/2023', valor: 5600.00, vendedor: 'Mariana Costa', tipo: 'A' },
  { id: 'OS-0697500-0', cliente: 'FUNDIÇÃO ESTRELA', status: 'cancelada', origem: 'BR - PR', atualizado: '08/03/2023', valor: 12350.00, vendedor: 'Carlos Mendes', tipo: 'B' },
  { id: 'OS-0698010-0', cliente: 'USINAGEM PRECISA IND.', status: 'ativa', origem: 'BR - SP', atualizado: '10/03/2023', valor: 28900.00, vendedor: 'Ana Souza', tipo: 'A' },
  { id: 'OS-0698300-0', cliente: 'CALDEIRARIA FORTE', status: 'ativa', origem: 'BR - MG', atualizado: '12/03/2023', valor: 45600.00, vendedor: 'Juliano Bonini', tipo: 'C' },
  { id: 'OS-0698750-0', cliente: 'TUBOS E CONEXÕES BR', status: 'lead', origem: 'BR - RS', atualizado: '15/03/2023', valor: 8200.00, vendedor: 'Mariana Costa', tipo: 'B' },
];

const vendedores = ['Todos', 'Juliano Bonini', 'Mariana Costa', 'Carlos Mendes', 'Ana Souza'];
const origens = ['Todas', 'BR - FEAVI', 'BR - S/COM', 'BR - SUL', 'BR - NORTE', 'BR - MG', 'BR - SP', 'BR - RS', 'BR - SC', 'BR - PR'];
const progressFilters = ['Todas', '20%', '50%', '70%', '100%'];

function getStatusInfo(key: string) {
  return statuses.find(s => s.key === key) || statuses[0];
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function AdminPanelShowcase() {
  const [activeStatus, setActiveStatus] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [vendedorFilter, setVendedorFilter] = useState('Todos');
  const [origemFilter, setOrigemFilter] = useState('Todas');
  const [progressFilter, setProgressFilter] = useState('Todas');
  const [viewMode, setViewMode] = useState<'minhas' | 'grupo' | 'sistema'>('minhas');

  // Counts per status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    statuses.forEach(s => { counts[s.key] = 0; });
    proposals.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });
    counts['todas'] = proposals.length;
    return counts;
  }, []);

  // Filtered data
  const filtered = useMemo(() => {
    return proposals.filter(p => {
      if (activeStatus !== 'todas' && p.status !== activeStatus) return false;
      if (vendedorFilter !== 'Todos' && p.vendedor !== vendedorFilter) return false;
      if (origemFilter !== 'Todas' && p.origem !== origemFilter) return false;
      if (searchTerm && !p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) && !p.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [activeStatus, vendedorFilter, origemFilter, searchTerm]);

  const totalValue = filtered.reduce((sum, p) => sum + p.valor, 0);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Ferramentas</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-semibold">Painel Administrativo</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Gestão de Vendas</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Painel de acompanhamento de propostas e ordens de serviço</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <FileText size={16} />
            Nova Pré-O.S.
          </button>
        </div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2 mb-5">
          {statuses.map(s => {
            const Icon = s.icon;
            const count = statusCounts[s.key];
            const isActive = activeStatus === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveStatus(s.key)}
                className={cn(
                  'relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 border-primary/40 ring-1 ring-primary/20 shadow-sm'
                    : 'bg-surface-container border-border/40 hover:border-border hover:bg-surface-container-high'
                )}
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0', s.color)}>
                  <Icon size={15} />
                </div>
                <div className="min-w-0">
                  <p className={cn('text-[10px] font-semibold uppercase tracking-wider truncate', isActive ? 'text-primary' : 'text-muted-foreground')}>
                    {s.label}
                  </p>
                  <p className={cn('text-lg font-bold leading-tight', isActive ? 'text-primary' : 'text-foreground')}>
                    {count}
                  </p>
                </div>
                {isActive && (
                  <motion.div layoutId="statusIndicator" className="absolute inset-0 rounded-xl border-2 border-primary/50 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-container rounded-2xl border border-border/40 p-4 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-0.5 border border-border/30">
              {(['minhas', 'grupo', 'sistema'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
                    viewMode === mode
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {mode === 'minhas' ? 'Minhas' : mode === 'grupo' ? 'Grupo' : 'O.S. de Sistema'}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-border/50 hidden sm:block" />

            {/* Progress Filters */}
            <div className="flex items-center gap-1">
              {progressFilters.map(pf => (
                <button
                  key={pf}
                  onClick={() => setProgressFilter(pf)}
                  className={cn(
                    'px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all',
                    progressFilter === pf
                      ? 'bg-secondary/15 border-secondary/40 text-secondary'
                      : 'border-transparent text-muted-foreground hover:bg-muted/30'
                  )}
                >
                  {pf}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-border/50 hidden sm:block" />

            {/* Vendedor Select */}
            <select
              value={vendedorFilter}
              onChange={(e) => setVendedorFilter(e.target.value)}
              className="bg-surface-container-low border border-border/40 rounded-xl px-3 py-1.5 text-xs font-medium text-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none"
            >
              {vendedores.map(v => <option key={v} value={v}>{v === 'Todos' ? 'Vendedor' : v}</option>)}
            </select>

            {/* Origem Select */}
            <select
              value={origemFilter}
              onChange={(e) => setOrigemFilter(e.target.value)}
              className="bg-surface-container-low border border-border/40 rounded-xl px-3 py-1.5 text-xs font-medium text-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none"
            >
              {origens.map(o => <option key={o} value={o}>{o === 'Todas' ? 'Origem' : o}</option>)}
            </select>

            {/* Search */}
            <div className="relative flex-1 min-w-[200px] ml-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar cliente ou O.S..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container-low border border-border/40 rounded-xl pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container-high/50 rounded-xl border border-border/30 mb-3">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {viewMode === 'minhas' ? 'Minhas O.S.' : viewMode === 'grupo' ? 'O.S. do Grupo' : 'Todas O.S.'}
            </span>
            <span className="text-sm font-bold text-foreground">
              Qtd.: {filtered.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-sm font-bold text-primary">{formatCurrency(totalValue)}</span>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Pré-O.S.</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Cliente</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Origem</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Vendedor</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Atualizado</th>
                  <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Valor</th>
                  <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-surface-container-low">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const statusInfo = getStatusInfo(p.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={p.id} className={cn(
                      'transition-colors hover:bg-muted/20',
                      i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'
                    )}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center border',
                            p.tipo === 'A' ? 'bg-status-success/15 text-status-success border-status-success/30' :
                            p.tipo === 'B' ? 'bg-status-info/15 text-status-info border-status-info/30' :
                            'bg-status-warning/15 text-status-warning border-status-warning/30'
                          )}>
                            {p.tipo}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground">{p.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground text-sm">{p.cliente}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border',
                          statusInfo.color
                        )}>
                          <StatusIcon size={11} />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{p.origem}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{p.vendedor}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{p.atualizado}</td>
                      <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-foreground">{formatCurrency(p.valor)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors">
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-surface-container-low border-t border-border/40">
                  <td colSpan={6} className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Total ({filtered.length} registros)
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm font-bold text-primary">
                    {formatCurrency(totalValue)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-muted-foreground">
            Exibindo <span className="font-semibold text-foreground">1-{filtered.length}</span> de <span className="font-semibold text-foreground">{filtered.length}</span> registros
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 text-muted-foreground hover:bg-muted/20 transition-colors">Anterior</button>
            <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 text-muted-foreground hover:bg-muted/20 transition-colors">2</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 text-muted-foreground hover:bg-muted/20 transition-colors">Próximo</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-surface-container rounded-2xl border border-border/40 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Taxa Conversão</p>
                <p className="text-xl font-bold text-foreground">34.5%</p>
              </div>
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold">↑ 4.2% vs mês anterior</p>
          </div>
          <div className="bg-surface-container rounded-2xl border border-border/40 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ticket Médio</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalValue / (filtered.length || 1))}</p>
              </div>
            </div>
            <p className="text-[10px] text-primary font-semibold">Base: {filtered.length} propostas filtradas</p>
          </div>
          <div className="bg-surface-container rounded-2xl border border-border/40 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Aguardando Ação</p>
                <p className="text-xl font-bold text-foreground">{statusCounts['pendente'] + statusCounts['followup']}</p>
              </div>
            </div>
            <p className="text-[10px] text-amber-400 font-semibold">Pendentes + Follow Up</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
