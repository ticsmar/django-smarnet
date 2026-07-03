import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Filter, Plus, ChevronLeft, ChevronRight, Edit, Trash2,
  Table2, LayoutList, LayoutGrid, Eye, MoreVertical, Home
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';


type ViewMode = 'table' | 'list' | 'grid';

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface ModulePageProps {
  title: string;
  columns: Column[];
  data: any[];
}

export default function ModulePage({ title, columns, data }: ModulePageProps) {
  const { locale } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const perPage = viewMode === 'grid' ? 12 : 8;

  const filtered = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const primaryCol = columns[1] || columns[0];
  const secondaryCol = columns[2] || columns[0];
  const statusCol = columns.find((c) => c.key === 'status' || c.key === 'nivel');

  const viewModes: { key: ViewMode; icon: typeof Table2; tip: string }[] = [
    { key: 'table', icon: Table2, tip: 'Tabela' },
    { key: 'list', icon: LayoutList, tip: 'Lista' },
    { key: 'grid', icon: LayoutGrid, tip: 'Grade' },
  ];

  // Build breadcrumb from path
  const pathSegments = location.pathname.replace('/app/', '').split('/');
  const breadcrumbMap: Record<string, { group?: string; label: string }> = {
    clientes: { group: 'Comercial', label: 'Clientes' },
    fornecedores: { group: 'Comercial', label: 'Fornecedores' },
    pedidos: { group: 'Comercial', label: 'Pedidos' },
    faturamento: { group: 'Comercial', label: 'Faturamento' },
    produtos: { group: 'Produção', label: 'Produtos' },
    estoque: { group: 'Produção', label: 'Estoque' },
    funcionarios: { group: 'RH', label: 'Funcionários' },
    usuarios: { group: 'RH', label: 'Usuários' },
  };
  const crumb = breadcrumbMap[pathSegments[0]] || { label: title };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6">
        <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors"><Home size={14} /></Link>
        {crumb.group && (
          <>
            <ChevronRight size={14} className="text-muted-foreground/50" />
            <span className="text-muted-foreground">{crumb.group}</span>
          </>
        )}
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-foreground font-medium">{crumb.label}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">{title}</h1>
        <button onClick={() => navigate(`${location.pathname}/novo`)} className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity w-fit">
          <Plus size={16} /> {t('module.new', locale)}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder={t('module.search', locale)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 shadow-ambient text-sm"
          />
        </div>
        <button className="px-5 py-3 rounded-xl bg-background text-foreground text-sm font-medium flex items-center gap-2 shadow-ambient hover:bg-surface-container-high transition-colors">
          <Filter size={16} /> {t('module.filters', locale)}
        </button>

        {/* View mode toggle */}
        <div className="flex rounded-xl bg-background shadow-ambient p-1 gap-0.5">
          {viewModes.map(({ key, icon: Icon, tip }) => (
            <button
              key={key}
              onClick={() => { setViewMode(key); setPage(1); }}
              title={tip}
              className={`p-2.5 rounded-lg transition-colors ${
                viewMode === key
                  ? 'gradient-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-low'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-background rounded-2xl shadow-ambient overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">
                    {t('module.actions', locale)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-sm text-foreground">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground">
                          <Edit size={15} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination filtered={filtered} page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}

      {/* List View (inline cards) */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {paged.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-background rounded-2xl shadow-ambient p-5 flex items-center gap-5 hover:shadow-ambient-lg transition-shadow"
            >
              {/* Avatar/ID */}
              <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {String(row[columns[0].key]).slice(-3)}
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground text-sm truncate">
                  {row[primaryCol.key]}
                </h3>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {row[secondaryCol.key]}
                </p>
              </div>

              {/* Extra columns */}
              {columns.slice(3).filter(c => c !== statusCol).map((col) => (
                <div key={col.key} className="hidden lg:block text-center shrink-0 min-w-[80px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{col.label}</p>
                  <p className="text-sm text-foreground mt-0.5">{col.render ? col.render(row[col.key], row) : row[col.key]}</p>
                </div>
              ))}

              {/* Status */}
              {statusCol && (
                <div className="shrink-0">
                  {statusCol.render ? statusCol.render(row[statusCol.key], row) : row[statusCol.key]}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground">
                  <Eye size={15} />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground">
                  <Edit size={15} />
                </button>
              </div>
            </motion.div>
          ))}
          <Pagination filtered={filtered} page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}

      {/* Grid View (detailed cards) */}
      {viewMode === 'grid' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paged.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="bg-background rounded-2xl shadow-ambient p-6 hover:shadow-ambient-lg transition-shadow group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                      {String(row[primaryCol.key]).charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-foreground text-sm truncate">
                        {row[primaryCol.key]}
                      </h3>
                      <p className="text-xs text-muted-foreground">{row[columns[0].key]}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground opacity-0 group-hover:opacity-100">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2.5 mb-4">
                  {columns.slice(2).filter(c => c !== statusCol).map((col) => (
                    <div key={col.key} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{col.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid hsl(var(--border) / 0.3)' }}>
                  {statusCol ? (
                    <div>{statusCol.render ? statusCol.render(row[statusCol.key], row) : row[statusCol.key]}</div>
                  ) : <div />}
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground">
                      <Eye size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination filtered={filtered} page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </>
      )}
    </>
  );
}

function Pagination({ filtered, page, totalPages, setPage }: {
  filtered: any[];
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low/50 rounded-b-2xl">
      <p className="text-sm text-muted-foreground">
        {filtered.length} registros • Página {page}/{totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
          className="p-2 rounded-lg hover:bg-surface-container transition-colors text-muted-foreground disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => setPage(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'gradient-primary text-primary-foreground' : 'hover:bg-surface-container text-muted-foreground'}`}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="p-2 rounded-lg hover:bg-surface-container transition-colors text-muted-foreground disabled:opacity-30">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
