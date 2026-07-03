import { useMemo, useState } from 'react';

const orders = [
  { cod: '001', prod: 'Parafuso M8x30 Inox', qtd: 500, unit: '0,45', total: '225,00' },
  { cod: '002', prod: 'Porca Sext. M8 Inox', qtd: 500, unit: '0,22', total: '110,00' },
  { cod: '003', prod: 'Arruela Lisa M8', qtd: 1000, unit: '0,08', total: '80,00' },
  { cod: '004', prod: 'Chapa Aço 1020 3mm', qtd: 10, unit: '189,90', total: '1.899,00' },
  { cod: '005', prod: 'Tubo Galv. 1" x 6m', qtd: 25, unit: '42,00', total: '1.050,00' },
];

const equipments = [
  { eq: 'Compressor Atlas ZR-250', setor: 'Utilidades', crit: 'Alta', data: '12/03/2026' },
  { eq: 'Caldeira Aalborg OC-B', setor: 'Geração', crit: 'Crítica', data: '28/02/2026' },
  { eq: 'Bomba KSB Megabloc', setor: 'Transferência', crit: 'Média', data: '05/04/2026' },
  { eq: 'Torre de Resfriamento GEA', setor: 'Utilidades', crit: 'Alta', data: '18/01/2026' },
  { eq: 'Inversor ABB ACS580', setor: 'Automação', crit: 'Baixa', data: '10/04/2026' },
];

const consumption = [
  { mat: 'Aço Inox 304', vals: [120, 145, 132, 158] },
  { mat: 'Alumínio 6061', vals: [89, 92, 105, 98] },
  { mat: 'Cobre Eletrolítico', vals: [45, 52, 48, 61] },
];
import {
  Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Search, ChevronLeft, ChevronRight,
  Download, Filter, Eye, Edit, Trash2, Plus, CheckCircle2, AlertTriangle, XCircle, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef,
} from '../_docs';

/* ========== Tokens compartilhados (tabelas HTML nativas) ========== */
const TH = 'px-5 py-3 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low';
const TD = 'px-5 py-3 text-sm text-foreground';
const WRAPPER = 'overflow-hidden rounded-xl border border-border/60';

/* ========== Datasets ========== */
const products = [
  { cod: 'PRD-0012', desc: 'Sensor de Pressão XK-200', cat: 'Instrumentação', valor: 'R$ 1.250,00', status: 'Ativo' },
  { cod: 'PRD-0045', desc: 'Válvula Solenoide 2"', cat: 'Controle', valor: 'R$ 3.890,00', status: 'Ativo' },
  { cod: 'PRD-0078', desc: 'Transmissor de Nível', cat: 'Instrumentação', valor: 'R$ 2.150,00', status: 'Inativo' },
  { cod: 'PRD-0103', desc: 'CLP Compacto S7-1200', cat: 'Automação', valor: 'R$ 8.420,00', status: 'Ativo' },
  { cod: 'PRD-0156', desc: 'Cabo Profibus DP 100m', cat: 'Redes', valor: 'R$ 480,00', status: 'Baixo Estoque' },
];

const statusMap: Record<string, string> = {
  'Ativo': 'bg-success/10 text-success',
  'Inativo': 'bg-muted text-muted-foreground',
  'Baixo Estoque': 'bg-warning/10 text-warning',
};

const employees = [
  { id: 1, nome: 'Carlos Mendes', depto: 'Engenharia', cargo: 'Eng. Mecânico Sr.', salario: 12500 },
  { id: 2, nome: 'Ana Paula Costa', depto: 'Qualidade', cargo: 'Coord. Qualidade', salario: 9800 },
  { id: 3, nome: 'Roberto Silva', depto: 'Produção', cargo: 'Supervisor Turno', salario: 8200 },
  { id: 4, nome: 'Juliana Ferreira', depto: 'Automação', cargo: 'Prog. CLP', salario: 11000 },
  { id: 5, nome: 'Marcos Oliveira', depto: 'Manutenção', cargo: 'Eletricista Ind.', salario: 7500 },
  { id: 6, nome: 'Fernanda Lima', depto: 'Engenharia', cargo: 'Eng. Processos', salario: 10200 },
  { id: 7, nome: 'Ricardo Santos', depto: 'Logística', cargo: 'Analista Supply', salario: 7800 },
  { id: 8, nome: 'Patrícia Rocha', depto: 'RH', cargo: 'Analista RH', salario: 6900 },
];

const inventory = [
  { id: 1, sku: 'MAT-001', desc: 'Chapa Aço 1020 3mm', grupo: 'Aço', un: 'KG', estoque: 2450, minimo: 500, preco: 8.90 },
  { id: 2, sku: 'MAT-002', desc: 'Tubo Inox 304 1"', grupo: 'Inox', un: 'M', estoque: 180, minimo: 100, preco: 42.50 },
  { id: 3, sku: 'MAT-003', desc: 'Perfil U 3" Galvanizado', grupo: 'Galvanizado', un: 'M', estoque: 45, minimo: 80, preco: 38.00 },
  { id: 4, sku: 'MAT-004', desc: 'Eletrodo E7018 4mm', grupo: 'Soldagem', un: 'KG', estoque: 120, minimo: 50, preco: 52.00 },
  { id: 5, sku: 'MAT-005', desc: 'Parafuso M12x50 Inox', grupo: 'Fixação', un: 'UN', estoque: 3200, minimo: 1000, preco: 1.85 },
  { id: 6, sku: 'MAT-006', desc: 'Rolamento 6205 ZZ', grupo: 'Rolamentos', un: 'UN', estoque: 28, minimo: 30, preco: 32.00 },
  { id: 7, sku: 'MAT-007', desc: 'Cabo PP 3x2.5mm²', grupo: 'Elétrico', un: 'M', estoque: 850, minimo: 200, preco: 7.20 },
  { id: 8, sku: 'MAT-008', desc: 'Tinta Epoxi Cinza 18L', grupo: 'Pintura', un: 'LT', estoque: 15, minimo: 10, preco: 289.00 },
];

const formatCurrency = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

/* ========================================================== */
/* SUBCOMPONENTES INTERATIVOS                                 */
/* ========================================================== */

type SortDir = 'asc' | 'desc' | null;

function GridJSPreview() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const perPage = 4;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter(e =>
      e.nome.toLowerCase().includes(q) ||
      e.depto.toLowerCase().includes(q) ||
      e.cargo.toLowerCase().includes(q)
    );
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortCol || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as any)[sortCol]; const bv = (b as any)[sortCol];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = sorted.slice(page * perPage, (page + 1) * perPage);

  const toggleSort = (col: string) => {
    if (sortCol !== col) { setSortCol(col); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortCol(null); setSortDir(null); }
    setPage(0);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ArrowUpDown size={11} className="text-muted-foreground/50" />;
    return sortDir === 'asc'
      ? <ArrowUp size={11} className="text-secondary" />
      : <ArrowDown size={11} className="text-secondary" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Buscar por nome, depto ou cargo..."
            className="h-9 w-full pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <span className="text-xs text-muted-foreground">{sorted.length} registro(s)</span>
      </div>

      <div className={WRAPPER}>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className={cn(TH, 'w-10')}>#</th>
              {[
                { key: 'nome', label: 'Nome' },
                { key: 'depto', label: 'Departamento' },
                { key: 'cargo', label: 'Cargo' },
                { key: 'salario', label: 'Salário', align: 'text-right' },
              ].map(col => (
                <th key={col.key} className={cn(TH, 'cursor-pointer select-none', (col as any).align)} onClick={() => toggleSort(col.key)}>
                  <span className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {col.label} <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum registro encontrado</td></tr>
            ) : paged.map((row, i) => (
              <tr key={row.id} className={cn('hover:bg-muted/30 transition-colors', i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                <td className={cn(TD, 'font-mono text-xs text-muted-foreground')}>{row.id}</td>
                <td className={cn(TD, 'font-medium')}>{row.nome}</td>
                <td className={cn(TD, 'text-muted-foreground')}>{row.depto}</td>
                <td className={cn(TD, 'text-muted-foreground')}>{row.cargo}</td>
                <td className={cn(TD, 'text-right font-mono font-semibold')}>{formatCurrency(row.salario)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border/60 bg-surface-container-low text-xs text-muted-foreground">
            <span>Página {page + 1} de {totalPages}</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft size={14} /></Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} variant={i === page ? 'default' : 'outline'} size="icon" className="h-7 w-7 text-xs" onClick={() => setPage(i)}>{i + 1}</Button>
              ))}
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight size={14} /></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DataTablePreview() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return inventory.filter(e =>
      e.desc.toLowerCase().includes(q) ||
      e.sku.toLowerCase().includes(q) ||
      e.grupo.toLowerCase().includes(q)
    );
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortCol || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as any)[sortCol]; const bv = (b as any)[sortCol];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = sorted.slice(page * perPage, (page + 1) * perPage);
  const from = sorted.length === 0 ? 0 : page * perPage + 1;
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
    return sortDir === 'asc'
      ? <ArrowUp size={11} className="text-secondary" />
      : <ArrowDown size={11} className="text-secondary" />;
  };

  const getStockStatus = (estoque: number, minimo: number) => {
    if (estoque <= minimo * 0.5) return { label: 'Crítico', cls: 'bg-destructive/10 text-destructive' };
    if (estoque <= minimo) return { label: 'Baixo', cls: 'bg-warning/10 text-warning' };
    return { label: 'Normal', cls: 'bg-success/10 text-success' };
  };

  return (
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
          <Button size="sm" className="h-9 gap-1.5 text-xs"><Plus size={13} /> Novo</Button>
        </div>
      </div>

      <div className={WRAPPER}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-5 py-3 w-10 bg-surface-container-low">
                  <input type="checkbox" checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} className="rounded border-border accent-secondary" />
                </th>
                {[
                  { key: 'sku', label: 'SKU' },
                  { key: 'desc', label: 'Material' },
                  { key: 'grupo', label: 'Grupo' },
                  { key: 'un', label: 'Un', align: 'text-center' },
                  { key: 'estoque', label: 'Estoque', align: 'text-right' },
                  { key: 'preco', label: 'Preço', align: 'text-right' },
                ].map(col => (
                  <th key={col.key} className={cn(TH, 'cursor-pointer select-none', (col as any).align)} onClick={() => toggleSort(col.key)}>
                    <span className="inline-flex items-center gap-1 hover:text-foreground transition-colors whitespace-nowrap">
                      {col.label} <SortIcon col={col.key} />
                    </span>
                  </th>
                ))}
                <th className={cn(TH, 'text-center w-20')}>Status</th>
                <th className={cn(TH, 'text-center w-24')}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={9} className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum material encontrado</td></tr>
              ) : paged.map((row, i) => {
                const status = getStockStatus(row.estoque, row.minimo);
                return (
                  <tr key={row.id} className={cn('transition-colors', selected.includes(row.id) ? 'bg-secondary/5' : i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                    <td className={TD}><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} className="rounded border-border accent-secondary" /></td>
                    <td className={cn(TD, 'font-mono text-xs font-semibold text-secondary')}>{row.sku}</td>
                    <td className={cn(TD, 'font-medium')}>{row.desc}</td>
                    <td className={cn(TD, 'text-muted-foreground')}>{row.grupo}</td>
                    <td className={cn(TD, 'text-center font-mono text-xs text-muted-foreground')}>{row.un}</td>
                    <td className={cn(TD, 'text-right font-mono font-semibold')}>{row.estoque.toLocaleString('pt-BR')}</td>
                    <td className={cn(TD, 'text-right font-mono')}>{formatCurrency(row.preco)}</td>
                    <td className={cn(TD, 'text-center')}>
                      <span className={cn('inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', status.cls)}>{status.label}</span>
                    </td>
                    <td className={cn(TD, 'text-center')}>
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

        <div className="flex items-center justify-between px-5 py-3 border-t border-border/60 bg-surface-container-low text-xs text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {selected.length > 0 && <span className="font-semibold text-secondary">{selected.length} selecionado(s)</span>}
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
  );
}

function SelectionTablePreview() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelect = (cod: string) => setSelected(prev => prev.includes(cod) ? prev.filter(c => c !== cod) : [...prev, cod]);
  const toggleAll = () => setSelected(prev => prev.length === products.length ? [] : products.map(p => p.cod));

  return (
    <div className={WRAPPER}>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className={cn(TH, 'w-10')}>
              <input type="checkbox" checked={selected.length === products.length} onChange={toggleAll} className="rounded border-border accent-secondary" />
            </th>
            <th className={TH}>Código</th>
            <th className={TH}>Descrição</th>
            <th className={cn(TH, 'text-right')}>Valor</th>
            <th className={cn(TH, 'text-center')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row, i) => (
            <tr key={i} className={cn('transition-colors', selected.includes(row.cod) ? 'bg-secondary/5' : i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
              <td className={TD}><input type="checkbox" checked={selected.includes(row.cod)} onChange={() => toggleSelect(row.cod)} className="rounded border-border accent-secondary" /></td>
              <td className={cn(TD, 'font-mono text-xs font-semibold text-secondary')}>{row.cod}</td>
              <td className={cn(TD, 'font-medium')}>{row.desc}</td>
              <td className={cn(TD, 'text-right font-mono font-semibold')}>{row.valor}</td>
              <td className={cn(TD, 'text-center')}>
                <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', statusMap[row.status])}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 border-t border-border/60 bg-surface-container-low text-xs">
          <span className="font-semibold text-secondary">{selected.length} selecionado(s)</span>
          <button className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors">Aprovar</button>
          <button className="px-3 py-1 rounded-md text-destructive hover:bg-destructive/10 font-semibold transition-colors">Excluir</button>
        </div>
      )}
    </div>
  );
}

/* ========== Props metadata ========== */

const tableProps: PropDef[] = [
  { name: 'className', type: 'string', description: 'Classes utilitárias para a tabela raiz.' },
];

const cellProps: PropDef[] = [
  { name: 'colSpan / rowSpan', type: 'number', description: 'Mescla células — útil em rodapés de totalização.' },
  { name: 'className', type: 'string', description: 'Tipograficamente, use text-right para valores monetários.' },
];

const dataTableProps: PropDef[] = [
  { name: 'data', type: 'T[]', required: true, description: 'Array de registros a ser renderizado.' },
  { name: 'searchable', type: 'boolean', default: 'true', description: 'Habilita o campo de busca global no toolbar.' },
  { name: 'sortable', type: 'boolean', default: 'true', description: 'Permite ordenação clicando no cabeçalho.' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Quantidade de registros por página.' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Adiciona coluna de checkbox para seleção em lote.' },
];

/* ========================================================== */
/* PÁGINA                                                     */
/* ========================================================== */

export default function TablePage() {
  return (
    <ComponentDoc
      summary="Componentes de tabela — do wrapper shadcn (Table) às variações HTML estilizadas (Tables, GridJS e DataTables) usadas em telas industriais. Todas usam tokens semânticos e respondem automaticamente ao modo claro/escuro."
      importPath="import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'"
    >
      {/* ============ Shadcn Table base ============ */}
      <DocSection title="Table (shadcn)" description="Wrapper estilizado sobre os elementos HTML <table>. Cabeçalho, hover e zebra herdam tokens semânticos.">
        <VariantSection
          title="Padrão com status"
          description="Listagem de pedidos com badges semânticos para o status."
          preview={
            <Table>
              <TableCaption>Pedidos recentes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#4821</TableCell>
                  <TableCell>Nova Smar</TableCell>
                  <TableCell><Badge className="bg-success text-success-foreground hover:bg-success/90">Faturado</Badge></TableCell>
                  <TableCell className="text-right font-mono">R$ 18.420,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#4822</TableCell>
                  <TableCell>Petrobras</TableCell>
                  <TableCell><Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Pendente</Badge></TableCell>
                  <TableCell className="text-right font-mono">R$ 92.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#4823</TableCell>
                  <TableCell>Vale</TableCell>
                  <TableCell><Badge variant="destructive">Cancelado</Badge></TableCell>
                  <TableCell className="text-right font-mono">R$ 4.300,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          }
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Pedido</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>#4821</TableCell>
      <TableCell className="text-right">R$ 18.420,00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        />

        <VariantSection
          title="Com seleção, ordenação e ações"
          description="Padrão de data table compacta: checkbox, ordenação no header, ações por linha e rodapé com totalização."
          preview={
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"><Checkbox /></TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="-ml-3 h-8">
                      Produto <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { p: 'Sensor de pressão', sku: 'SP-2010', e: 124 },
                  { p: 'Transmissor inteligente', sku: 'TI-4400', e: 18 },
                  { p: 'Válvula esfera 2"', sku: 'VE-2000', e: 0 },
                ].map((r) => (
                  <TableRow key={r.sku}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-medium">{r.p}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{r.sku}</TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={r.e === 0 ? 'text-destructive' : r.e < 30 ? 'text-warning' : 'text-success'}>{r.e}</span>
                    </TableCell>
                    <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total em estoque</TableCell>
                  <TableCell className="text-right font-mono">142</TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          }
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10"><Checkbox /></TableHead>
      <TableHead>Produto</TableHead>
      <TableHead className="text-right">Estoque</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* rows */}</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">142</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        />

        <PropsTable rows={tableProps} title="Table (Root)" />
        <PropsTable rows={cellProps} title="TableCell / TableHead" />
      </DocSection>

      {/* ============ Tables (HTML estilizado) ============ */}
      <DocSection
        title="Tables — variações HTML"
        description="Tabelas HTML estilizadas direto com utilitários, equivalentes ao template /app/templates/tables/tables. Usam zebra com bg-surface-container-low, hover muted e badges com tokens de status."
      >
        <VariantSection
          title="Padrão com ações por linha"
          description="Cabeçalho ordenável, status pill e ações ver/editar/excluir."
          preview={
            <div className={WRAPPER}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={TH}><button className="inline-flex items-center gap-1 hover:text-foreground">Código <ArrowUpDown size={12} /></button></th>
                    <th className={TH}>Descrição</th>
                    <th className={TH}>Categoria</th>
                    <th className={cn(TH, 'text-right')}>Valor</th>
                    <th className={cn(TH, 'text-center')}>Status</th>
                    <th className={cn(TH, 'text-center')}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((row, i) => (
                    <tr key={i} className={cn('hover:bg-muted/30 transition-colors', i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                      <td className={cn(TD, 'font-mono text-xs font-semibold text-secondary')}>{row.cod}</td>
                      <td className={cn(TD, 'font-medium')}>{row.desc}</td>
                      <td className={cn(TD, 'text-muted-foreground')}>{row.cat}</td>
                      <td className={cn(TD, 'text-right font-mono font-semibold')}>{row.valor}</td>
                      <td className={cn(TD, 'text-center')}>
                        <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', statusMap[row.status])}>{row.status}</span>
                      </td>
                      <td className={cn(TD, 'text-center')}>
                        <div className="inline-flex gap-1">
                          <button className="p-1.5 rounded-md hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-colors"><Eye size={14} /></button>
                          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Edit size={14} /></button>
                          <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<div className="overflow-hidden rounded-xl border border-border/60">
  <table className="w-full text-sm">
    <thead>
      <tr>
        <th className="px-5 py-3 text-left text-[11px] font-bold text-muted-foreground uppercase bg-surface-container-low">Código</th>
        {/* ... */}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
          <td className="px-5 py-3 font-mono text-xs text-secondary">{r.cod}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`}
        />

        <VariantSection
          title="Compacta com rodapé"
          description="Densidade reduzida (text-xs / py-3) e tfoot com totalização para itens de pedido."
          preview={
            <div className={WRAPPER}>
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className={TH}>Código</th>
                    <th className={TH}>Produto</th>
                    <th className={cn(TH, 'text-center')}>Qtd</th>
                    <th className={cn(TH, 'text-right')}>Unit.</th>
                    <th className={cn(TH, 'text-right')}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((row, i) => (
                    <tr key={i} className={cn('hover:bg-muted/30 transition-colors', i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                      <td className={cn(TD, 'font-mono text-muted-foreground')}>{row.cod}</td>
                      <td className={TD}>{row.prod}</td>
                      <td className={cn(TD, 'text-center font-mono font-semibold')}>{row.qtd}</td>
                      <td className={cn(TD, 'text-right font-mono text-muted-foreground')}>R$ {row.unit}</td>
                      <td className={cn(TD, 'text-right font-mono font-semibold')}>R$ {row.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-container-low font-semibold">
                    <td colSpan={4} className="px-5 py-3 text-right text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Geral:</td>
                    <td className="px-5 py-3 text-right font-mono text-secondary font-bold">R$ 3.364,00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          }
          code={`<table className="w-full text-xs">
  <thead>{/* TH compactos */}</thead>
  <tbody>{/* py-3 */}</tbody>
  <tfoot>
    <tr className="bg-surface-container-low font-semibold">
      <td colSpan={4} className="text-right">Total Geral:</td>
      <td className="text-right text-secondary">R$ 3.364,00</td>
    </tr>
  </tfoot>
</table>`}
        />

        <VariantSection
          title="Zebrada com criticidade"
          description="Linhas alternadas e badge de criticidade pintado por nível (crítica → baixa)."
          preview={
            <div className={WRAPPER}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={TH}>#</th>
                    <th className={TH}>Equipamento</th>
                    <th className={TH}>Setor</th>
                    <th className={cn(TH, 'text-center')}>Criticidade</th>
                    <th className={cn(TH, 'text-right')}>Última Manutenção</th>
                  </tr>
                </thead>
                <tbody>
                  {equipments.map((row, i) => (
                    <tr key={i} className={cn('hover:bg-muted/30 transition-colors', i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                      <td className={cn(TD, 'font-mono text-xs text-muted-foreground')}>{i + 1}</td>
                      <td className={cn(TD, 'font-medium')}>{row.eq}</td>
                      <td className={cn(TD, 'text-muted-foreground')}>{row.setor}</td>
                      <td className={cn(TD, 'text-center')}>
                        <span className={cn(
                          'inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                          row.crit === 'Crítica' && 'bg-destructive/10 text-destructive',
                          row.crit === 'Alta' && 'bg-warning/10 text-warning',
                          row.crit === 'Média' && 'bg-info/10 text-info',
                          row.crit === 'Baixa' && 'bg-success/10 text-success',
                        )}>{row.crit}</span>
                      </td>
                      <td className={cn(TD, 'text-right text-muted-foreground')}>{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<tr className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
  <td>{row.eq}</td>
  <td>
    <span className={cn(
      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
      crit === 'Crítica' && 'bg-destructive/10 text-destructive',
      crit === 'Alta' && 'bg-warning/10 text-warning',
    )}>{crit}</span>
  </td>
</tr>`}
        />

        <VariantSection
          title="Com seleção em lote"
          description="Checkbox por linha + master no header. Quando há seleção, aparece a barra de ações em lote no rodapé."
          preview={<SelectionTablePreview />}
          code={`const [selected, setSelected] = useState<string[]>([]);

<tr className={selected.includes(row.cod) ? 'bg-secondary/5' : 'bg-background'}>
  <td><input type="checkbox" checked={selected.includes(row.cod)} onChange={...} /></td>
</tr>

{selected.length > 0 && (
  <div className="flex gap-3 border-t bg-surface-container-low">
    <span>{selected.length} selecionado(s)</span>
    <button>Aprovar</button>
  </div>
)}`}
        />

        <VariantSection
          title="Com bordas (matriz)"
          description="Tabela tipo planilha com bordas em todas as células — boa para comparação multi-coluna (ex.: consumo mensal)."
          preview={
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={cn(TH, 'border-b border-r border-border')}>Material</th>
                    <th className={cn(TH, 'text-center border-b border-r border-border')}>Jan</th>
                    <th className={cn(TH, 'text-center border-b border-r border-border')}>Fev</th>
                    <th className={cn(TH, 'text-center border-b border-r border-border')}>Mar</th>
                    <th className={cn(TH, 'text-center border-b border-border')}>Abr</th>
                  </tr>
                </thead>
                <tbody>
                  {consumption.map((row, i) => (
                    <tr key={i} className={cn('border-b border-border/50 last:border-b-0', i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50')}>
                      <td className={cn(TD, 'font-medium border-r border-border/50')}>{row.mat}</td>
                      {row.vals.map((v, j) => (
                        <td key={j} className={cn(TD, 'text-center font-mono text-muted-foreground', j < 3 && 'border-r border-border/50')}>{v} ton</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<div className="rounded-xl border border-border overflow-hidden">
  <table>
    <thead>
      <tr>
        <th className="border-b border-r border-border">Material</th>
        <th className="border-b border-r border-border text-center">Jan</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border/50">
        <td className="border-r border-border/50">{row.mat}</td>
      </tr>
    </tbody>
  </table>
</div>`}
        />

        <VariantSection
          title="Linhas contextuais"
          description="Cada linha recebe um tom semântico (success/warning/destructive/info) para destacar eventos."
          preview={
            <div className={WRAPPER}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={cn(TH, 'w-10 text-center')}></th>
                    <th className={TH}>Evento</th>
                    <th className={TH}>Descrição</th>
                    <th className={cn(TH, 'text-right')}>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', ev: 'Backup concluído', desc: 'Backup diário do banco finalizado', hora: '06:00' },
                    { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/5', ev: 'CPU elevada', desc: 'Servidor APP-02 com CPU > 85%', hora: '09:32' },
                    { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/5', ev: 'Falha de conexão', desc: 'Timeout no gateway de pagamento', hora: '11:15' },
                    { icon: Clock, color: 'text-info', bg: 'bg-info/5', ev: 'Job agendado', desc: 'Sincronização de estoque para 23:00', hora: '14:00' },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <tr key={i} className={cn(row.bg, 'transition-colors')}>
                        <td className={cn(TD, 'text-center')}><Icon size={16} className={row.color} /></td>
                        <td className={cn(TD, 'font-semibold')}>{row.ev}</td>
                        <td className={cn(TD, 'text-muted-foreground')}>{row.desc}</td>
                        <td className={cn(TD, 'text-right font-mono text-xs text-muted-foreground')}>{row.hora}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          }
          code={`<tr className="bg-success/5">
  <td><CheckCircle2 className="text-success" /></td>
  <td className="font-semibold">Backup concluído</td>
</tr>`}
        />

        <VariantSection
          title="Densa em superfície elevada"
          description="Use bg-surface-container-high quando a tabela viver dentro de um card já contrastado."
          preview={
            <div className="rounded-xl border-2 border-border/70 bg-surface-container-high overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Centro de custo</TableHead>
                    <TableHead className="text-right">Realizado</TableHead>
                    <TableHead className="text-right">Orçado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>Manutenção</TableCell><TableCell className="text-right font-mono">R$ 38.420</TableCell><TableCell className="text-right font-mono text-muted-foreground">R$ 50.000</TableCell></TableRow>
                  <TableRow><TableCell>Engenharia</TableCell><TableCell className="text-right font-mono">R$ 112.000</TableCell><TableCell className="text-right font-mono text-muted-foreground">R$ 100.000</TableCell></TableRow>
                  <TableRow><TableCell>TI</TableCell><TableCell className="text-right font-mono">R$ 24.300</TableCell><TableCell className="text-right font-mono text-muted-foreground">R$ 30.000</TableCell></TableRow>
                </TableBody>
              </Table>
            </div>
          }
          code={`<div className="rounded-xl border-2 border-border/70 bg-surface-container-high overflow-hidden">
  <Table>{/* ... */}</Table>
</div>`}
        />
      </DocSection>

      {/* ============ GridJS interativa ============ */}
      <DocSection
        title="GridJS — busca + ordenação + paginação"
        description="Tabela leve totalmente interativa: busca global com debounce visual, ordenação tri-state (asc → desc → none) e paginação numérica. Equivalente a /app/templates/tables/gridjs."
      >
        <VariantSection
          title="Tabela interativa"
          description="Pesquise por nome/depto/cargo e clique nos cabeçalhos para alternar a ordenação."
          preview={<GridJSPreview />}
          code={`const [search, setSearch] = useState('');
const [sortCol, setSortCol] = useState<string | null>(null);
const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

const filtered = useMemo(() => {
  const q = search.toLowerCase();
  return data.filter(r => r.nome.toLowerCase().includes(q));
}, [search]);

const sorted = useMemo(() => {
  if (!sortCol || !sortDir) return filtered;
  return [...filtered].sort((a, b) => {
    const cmp = typeof a[sortCol] === 'string'
      ? a[sortCol].localeCompare(b[sortCol])
      : a[sortCol] - b[sortCol];
    return sortDir === 'asc' ? cmp : -cmp;
  });
}, [filtered, sortCol, sortDir]);`}
        />
      </DocSection>

      {/* ============ DataTables completo ============ */}
      <DocSection
        title="Data Table — toolbar completa"
        description="Padrão completo: toolbar com busca, filtros e exportação; seleção múltipla; ordenação por coluna; paginação dinâmica; status pill e ações por linha. Equivalente a /app/templates/tables/datatables."
      >
        <VariantSection
          title="Gestão de Materiais"
          description="Selecione linhas, ordene colunas, troque o tamanho da página e navegue."
          preview={<DataTablePreview />}
          code={`// Composição: toolbar + table + footer (paginação)
<div className="space-y-3">
  <Toolbar>
    <SearchInput />
    <Button variant="outline"><Filter /> Filtros</Button>
    <Button variant="outline"><Download /> Exportar</Button>
    <Button><Plus /> Novo</Button>
  </Toolbar>

  <div className="rounded-xl border border-border/60 overflow-hidden">
    <table>{/* head + body com checkbox, sort e badges */}</table>
    <Footer>
      <SelectedCount /> <PageSize /> <Pager />
    </Footer>
  </div>
</div>`}
        />

        <PropsTable rows={dataTableProps} title="Props sugeridas para um wrapper <DataTable />" />
      </DocSection>

      <UsageNote type="tip">
        Para valores numéricos, use <code className="font-mono text-[11px]">font-mono</code> + <code className="font-mono text-[11px]">text-right</code> — facilita o alinhamento decimal e a leitura comparativa.
      </UsageNote>

      <UsageNote type="info">
        Zebra usa <code className="font-mono text-[11px]">bg-surface-container-low/50</code> em linhas ímpares e hover <code className="font-mono text-[11px]">hover:bg-muted/30</code>. Tudo herda o modo escuro automaticamente — não defina cores fixas.
      </UsageNote>

      <UsageNote type="warning">
        Para listas com 50+ linhas, prefira virtualização (TanStack Table + react-virtual) e paginação server-side. Renderizar milhares de linhas degrada significativamente a performance.
      </UsageNote>
    </ComponentDoc>
  );
}
