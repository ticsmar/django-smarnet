import { useState, useMemo } from 'react';
import { TablesLayout, ShowcaseSection } from './TablesLayout';
import { cn } from '@/lib/utils';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SortDir = 'asc' | 'desc' | null;

const TH = "px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low";
const TD = "px-6 py-4 text-sm text-foreground";

const employees = [
  { id: 1, nome: 'Carlos Mendes', depto: 'Engenharia', cargo: 'Eng. Mecânico Sr.', admissao: '15/03/2019', salario: 12500 },
  { id: 2, nome: 'Ana Paula Costa', depto: 'Qualidade', cargo: 'Coord. Qualidade', admissao: '02/08/2020', salario: 9800 },
  { id: 3, nome: 'Roberto Silva', depto: 'Produção', cargo: 'Supervisor Turno', admissao: '10/01/2018', salario: 8200 },
  { id: 4, nome: 'Juliana Ferreira', depto: 'Automação', cargo: 'Prog. CLP', admissao: '22/06/2021', salario: 11000 },
  { id: 5, nome: 'Marcos Oliveira', depto: 'Manutenção', cargo: 'Eletricista Ind.', admissao: '05/11/2017', salario: 7500 },
  { id: 6, nome: 'Fernanda Lima', depto: 'Engenharia', cargo: 'Eng. Processos', admissao: '18/04/2022', salario: 10200 },
  { id: 7, nome: 'Ricardo Santos', depto: 'Logística', cargo: 'Analista Supply', admissao: '30/09/2020', salario: 7800 },
  { id: 8, nome: 'Patrícia Rocha', depto: 'RH', cargo: 'Analista RH', admissao: '14/02/2021', salario: 6900 },
  { id: 9, nome: 'Thiago Almeida', depto: 'TI', cargo: 'Dev Full Stack', admissao: '08/07/2023', salario: 13500 },
  { id: 10, nome: 'Camila Duarte', depto: 'Financeiro', cargo: 'Controller', admissao: '25/05/2019', salario: 14200 },
  { id: 11, nome: 'Bruno Nascimento', depto: 'Produção', cargo: 'Operador CNC', admissao: '11/12/2022', salario: 5800 },
  { id: 12, nome: 'Larissa Moura', depto: 'Qualidade', cargo: 'Inspetora', admissao: '03/03/2023', salario: 5200 },
];

const formatCurrency = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export default function GridJSTablesShowcase() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const perPage = 5;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter(e => e.nome.toLowerCase().includes(q) || e.depto.toLowerCase().includes(q) || e.cargo.toLowerCase().includes(q));
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

  const toggleSort = (col: string) => {
    if (sortCol !== col) { setSortCol(col); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortCol(null); setSortDir(null); }
    setPage(0);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ArrowUpDown size={12} className="text-muted-foreground/50" />;
    return sortDir === 'asc' ? <ArrowUp size={12} className="text-secondary" /> : <ArrowDown size={12} className="text-secondary" />;
  };

  return (
    <TablesLayout title="Grid JS Tables" description="Tabelas interativas com busca, ordenação e paginação integradas.">

      <ShowcaseSection title="Tabela Interativa com Busca e Ordenação">
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

          <div className="overflow-hidden rounded-xl border border-border/40">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={cn(TH, "w-10")}>#</th>
                  {[
                    { key: 'nome', label: 'Nome' },
                    { key: 'depto', label: 'Departamento' },
                    { key: 'cargo', label: 'Cargo' },
                    { key: 'admissao', label: 'Admissão' },
                    { key: 'salario', label: 'Salário', align: 'text-right' },
                  ].map(col => (
                    <th key={col.key} className={cn(TH, "cursor-pointer select-none", col.align)} onClick={() => toggleSort(col.key)}>
                      <span className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                        {col.label} <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-muted-foreground">Nenhum registro encontrado</td></tr>
                ) : paged.map((row, i) => (
                  <tr key={row.id} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                    <td className={cn(TD, "font-mono text-xs text-muted-foreground")}>{row.id}</td>
                    <td className={cn(TD, "font-medium")}>{row.nome}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.depto}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.cargo}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.admissao}</td>
                    <td className={cn(TD, "text-right font-mono font-semibold")}>{formatCurrency(row.salario)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-surface-container-low text-xs text-muted-foreground">
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
      </ShowcaseSection>

      <ShowcaseSection title="Tabela com Células Customizadas">
        <div className="overflow-hidden rounded-xl border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={TH}>Colaborador</th>
                <th className={TH}>Departamento</th>
                <th className={cn(TH, "text-center")}>Performance</th>
                <th className={cn(TH, "text-right")}>Salário</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nome: 'Carlos Mendes', iniciais: 'CM', depto: 'Engenharia', perf: 92, salario: 12500 },
                { nome: 'Ana Paula Costa', iniciais: 'AC', depto: 'Qualidade', perf: 88, salario: 9800 },
                { nome: 'Juliana Ferreira', iniciais: 'JF', depto: 'Automação', perf: 95, salario: 11000 },
                { nome: 'Thiago Almeida', iniciais: 'TA', depto: 'TI', perf: 78, salario: 13500 },
              ].map((row, i) => (
                <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className={TD}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">{row.iniciais}</div>
                      <span className="font-medium">{row.nome}</span>
                    </div>
                  </td>
                  <td className={cn(TD, "text-muted-foreground")}>{row.depto}</td>
                  <td className={TD}>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", row.perf >= 90 ? "bg-status-success" : row.perf >= 80 ? "bg-status-warning" : "bg-destructive")} style={{ width: `${row.perf}%` }} />
                      </div>
                      <span className="text-xs font-mono font-semibold">{row.perf}%</span>
                    </div>
                  </td>
                  <td className={cn(TD, "text-right font-mono font-semibold")}>{formatCurrency(row.salario)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </TablesLayout>
  );
}
