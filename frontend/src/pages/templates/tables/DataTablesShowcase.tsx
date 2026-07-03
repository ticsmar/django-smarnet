import { TablesLayout, ShowcaseSection } from './TablesLayout';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, Filter, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SortDir = 'asc' | 'desc' | null;

const TH = "px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low";
const TD = "px-6 py-4 text-sm text-foreground";

const inventory = [
  { id: 1, sku: 'MAT-001', desc: 'Chapa Aço 1020 3mm', grupo: 'Aço', un: 'KG', estoque: 2450, minimo: 500, preco: 8.90, local: 'A1-P3' },
  { id: 2, sku: 'MAT-002', desc: 'Tubo Inox 304 1"', grupo: 'Inox', un: 'M', estoque: 180, minimo: 100, preco: 42.50, local: 'B2-P1' },
  { id: 3, sku: 'MAT-003', desc: 'Perfil U 3" Galvanizado', grupo: 'Galvanizado', un: 'M', estoque: 45, minimo: 80, preco: 38.00, local: 'C1-P2' },
  { id: 4, sku: 'MAT-004', desc: 'Eletrodo E7018 4mm', grupo: 'Soldagem', un: 'KG', estoque: 120, minimo: 50, preco: 52.00, local: 'D3-P1' },
  { id: 5, sku: 'MAT-005', desc: 'Parafuso M12x50 Inox', grupo: 'Fixação', un: 'UN', estoque: 3200, minimo: 1000, preco: 1.85, local: 'E1-P4' },
  { id: 6, sku: 'MAT-006', desc: 'Rolamento 6205 ZZ', grupo: 'Rolamentos', un: 'UN', estoque: 28, minimo: 30, preco: 32.00, local: 'F2-P2' },
  { id: 7, sku: 'MAT-007', desc: 'Cabo PP 3x2.5mm²', grupo: 'Elétrico', un: 'M', estoque: 850, minimo: 200, preco: 7.20, local: 'G1-P1' },
  { id: 8, sku: 'MAT-008', desc: 'Tinta Epoxi Cinza 18L', grupo: 'Pintura', un: 'LT', estoque: 15, minimo: 10, preco: 289.00, local: 'H1-P3' },
  { id: 9, sku: 'MAT-009', desc: 'Anel O-Ring Viton 25mm', grupo: 'Vedação', un: 'UN', estoque: 450, minimo: 200, preco: 4.50, local: 'D1-P2' },
  { id: 10, sku: 'MAT-010', desc: 'Disco Corte 7" Inox', grupo: 'Abrasivos', un: 'UN', estoque: 180, minimo: 100, preco: 8.90, local: 'E3-P1' },
  { id: 11, sku: 'MAT-011', desc: 'Lubrificante Mobil SHC 630', grupo: 'Lubrificação', un: 'LT', estoque: 42, minimo: 20, preco: 185.00, local: 'H2-P1' },
  { id: 12, sku: 'MAT-012', desc: 'Chapa Alumínio 2mm', grupo: 'Alumínio', un: 'KG', estoque: 380, minimo: 150, preco: 35.00, local: 'A2-P1' },
];

const formatCurrency = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export default function DataTablesShowcase() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return inventory.filter(e => e.desc.toLowerCase().includes(q) || e.sku.toLowerCase().includes(q) || e.grupo.toLowerCase().includes(q));
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortCol || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as any)[sortCol];
      const bv = (b as any)[sortCol];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const paged = sorted.slice(page * perPage, (page + 1) * perPage);
  const from = page * perPage + 1;
  const to = Math.min((page + 1) * perPage, sorted.length);

  const toggleSort = (col: string) => {
    if (sortCol !== col) { setSortCol(col); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortCol(null); setSortDir(null); }
    setPage(0);
  };

  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(prev => prev.length === paged.length ? [] : paged.map(p => p.id));

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ArrowUpDown size={11} className="text-muted-foreground/40" />;
    return sortDir === 'asc' ? <ArrowUp size={11} className="text-secondary" /> : <ArrowDown size={11} className="text-secondary" />;
  };

  const getStockStatus = (estoque: number, minimo: number) => {
    if (estoque <= minimo * 0.5) return { label: 'Crítico', cls: 'bg-destructive/10 text-destructive' };
    if (estoque <= minimo) return { label: 'Baixo', cls: 'bg-status-warning/10 text-status-warning' };
    return { label: 'Normal', cls: 'bg-status-success/10 text-status-success' };
  };

  return (
    <TablesLayout title="Data Tables" description="Tabelas avançadas com busca global, ordenação multi-coluna, paginação dinâmica e ações em lote.">

      <ShowcaseSection title="Gestão de Materiais — DataTable Completa">
        <div className="space-y-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(0); }}
                  placeholder="Buscar SKU, material ou grupo..."
                  className="h-9 w-64 pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs"><Filter size={13} /> Filtros</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs"><Download size={13} /> Exportar</Button>
              <Button size="sm" className="h-9 gap-1.5 text-xs"><Plus size={13} /> Novo Material</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-6 py-4 w-10 bg-surface-container-low">
                      <input type="checkbox" checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} className="rounded border-border accent-secondary" />
                    </th>
                    {[
                      { key: 'sku', label: 'SKU', w: 'w-24' },
                      { key: 'desc', label: 'Material' },
                      { key: 'grupo', label: 'Grupo' },
                      { key: 'un', label: 'Un', w: 'w-14 text-center' },
                      { key: 'estoque', label: 'Estoque', align: 'text-right' },
                      { key: 'preco', label: 'Preço Unit.', align: 'text-right' },
                      { key: 'local', label: 'Local', w: 'w-20 text-center' },
                    ].map(col => (
                      <th key={col.key} className={cn(TH, "cursor-pointer select-none", col.align || "text-left", col.w)} onClick={() => toggleSort(col.key)}>
                        <span className="inline-flex items-center gap-1 hover:text-foreground transition-colors whitespace-nowrap">
                          {col.label} <SortIcon col={col.key} />
                        </span>
                      </th>
                    ))}
                    <th className={cn(TH, "text-center w-20")}>Status</th>
                    <th className={cn(TH, "text-center w-24")}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 ? (
                    <tr><td colSpan={10} className="px-6 py-8 text-center text-sm text-muted-foreground">Nenhum material encontrado</td></tr>
                  ) : paged.map((row, i) => {
                    const status = getStockStatus(row.estoque, row.minimo);
                    return (
                      <tr key={row.id} className={cn("transition-colors", selected.includes(row.id) ? "bg-secondary/5" : i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                        <td className={TD}><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} className="rounded border-border accent-secondary" /></td>
                        <td className={cn(TD, "font-mono text-xs font-semibold text-secondary")}>{row.sku}</td>
                        <td className={cn(TD, "font-medium")}>{row.desc}</td>
                        <td className={cn(TD, "text-muted-foreground")}>{row.grupo}</td>
                        <td className={cn(TD, "text-center font-mono text-xs text-muted-foreground")}>{row.un}</td>
                        <td className={cn(TD, "text-right font-mono font-semibold")}>{row.estoque.toLocaleString('pt-BR')}</td>
                        <td className={cn(TD, "text-right font-mono")}>{formatCurrency(row.preco)}</td>
                        <td className={cn(TD, "text-center font-mono text-xs text-muted-foreground")}>{row.local}</td>
                        <td className={cn(TD, "text-center")}>
                          <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", status.cls)}>{status.label}</span>
                        </td>
                        <td className={cn(TD, "text-center")}>
                          <div className="inline-flex gap-0.5">
                            <button className="p-1.5 rounded-md hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-colors"><Eye size={13} /></button>
                            <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Edit size={13} /></button>
                            <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-surface-container-low text-xs text-muted-foreground flex-wrap gap-2">
              <div className="flex items-center gap-3">
                {selected.length > 0 && (
                  <span className="font-semibold text-secondary">{selected.length} selecionado(s)</span>
                )}
                <span>Exibindo {from}-{to} de {sorted.length}</span>
                <div className="flex items-center gap-1.5">
                  <span>Registros:</span>
                  <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(0); }} className="h-7 px-1.5 rounded border border-border bg-background text-xs">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft size={14} /></Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button key={i} variant={i === page ? 'default' : 'outline'} size="icon" className="h-7 w-7 text-xs" onClick={() => setPage(i)}>{i + 1}</Button>
                ))}
                <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight size={14} /></Button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabela Responsiva — Cards em Mobile">
        <p className="text-xs text-muted-foreground mb-3">Em telas menores, a tabela apresenta scroll horizontal. Redimensione a janela para testar.</p>
        <div className="overflow-hidden rounded-xl border border-border/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr>
                  <th className={TH}>Ordem Serviço</th>
                  <th className={TH}>Equipamento</th>
                  <th className={TH}>Tipo</th>
                  <th className={cn(TH, "text-center")}>Prioridade</th>
                  <th className={TH}>Responsável</th>
                  <th className={cn(TH, "text-center")}>Progresso</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { os: 'OS-4521', eq: 'Compressor Atlas ZR-250', tipo: 'Preventiva', prio: 'Alta', resp: 'Marcos Oliveira', prog: 75 },
                  { os: 'OS-4522', eq: 'Bomba KSB Megabloc', tipo: 'Corretiva', prio: 'Urgente', resp: 'Carlos Mendes', prog: 30 },
                  { os: 'OS-4523', eq: 'Inversor ABB ACS580', tipo: 'Preditiva', prio: 'Normal', resp: 'Juliana Ferreira', prog: 100 },
                  { os: 'OS-4524', eq: 'Esteira Transportadora T-12', tipo: 'Preventiva', prio: 'Baixa', resp: 'Roberto Silva', prog: 50 },
                ].map((row, i) => (
                  <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                    <td className={cn(TD, "font-mono text-xs font-semibold text-secondary")}>{row.os}</td>
                    <td className={cn(TD, "font-medium")}>{row.eq}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.tipo}</td>
                    <td className={cn(TD, "text-center")}>
                      <span className={cn(
                        "inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                        row.prio === 'Urgente' && 'bg-destructive/10 text-destructive',
                        row.prio === 'Alta' && 'bg-status-warning/10 text-status-warning',
                        row.prio === 'Normal' && 'bg-status-info/10 text-status-info',
                        row.prio === 'Baixa' && 'bg-status-success/10 text-status-success',
                      )}>{row.prio}</span>
                    </td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.resp}</td>
                    <td className={TD}>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", row.prog === 100 ? "bg-status-success" : "bg-secondary")} style={{ width: `${row.prog}%` }} />
                        </div>
                        <span className="text-xs font-mono font-semibold">{row.prog}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseSection>
    </TablesLayout>
  );
}
