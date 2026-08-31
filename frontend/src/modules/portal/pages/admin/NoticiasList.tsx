import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Pencil, Trash2, Plus } from 'lucide-react';
import { deleteNoticia, listAdminNoticias } from '@/services/portal';
import { CATEGORIAS_NOTICIA, type NoticiaStatus } from '@/types/portal';
import { formatDate } from '@/lib/portalUtils';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<NoticiaStatus, string> = {
  rascunho: 'bg-zinc-700 text-zinc-200',
  agendada: 'bg-sky-600/30 text-sky-300',
  publicada: 'bg-emerald-600/30 text-emerald-300',
  expirada: 'bg-amber-600/30 text-amber-300',
  arquivada: 'bg-zinc-600/30 text-zinc-400',
};

export default function NoticiasList() {
  const qc = useQueryClient();
  const { data: noticias = [] } = useQuery({ queryKey: ['admin', 'noticias'], queryFn: listAdminNoticias });
  const del = useMutation({
    mutationFn: deleteNoticia,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'noticias'] }),
  });

  const [q, setQ] = useState('');
  const [status, setStatus] = useState<string>('todos');
  const [cat, setCat] = useState<string>('todas');

  const filtered = useMemo(() => {
    return noticias.filter((n) => {
      if (status !== 'todos' && n.status !== status) return false;
      if (cat !== 'todas' && n.categoria !== cat) return false;
      if (q && !n.manchete.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [noticias, q, status, cat]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Notícias</h1>
          <p className="text-sm text-zinc-400">{filtered.length} de {noticias.length}</p>
        </div>
        <Link
          to="/portal/admin/noticias/nova"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F4C81] text-white text-sm font-medium hover:bg-[#0F4C81]/90"
        >
          <Plus className="w-4 h-4" /> Nova notícia
        </Link>
      </header>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            placeholder="Buscar pela manchete…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-3 h-10 rounded-lg bg-zinc-950 border border-zinc-800 text-sm focus:border-[#0F4C81] outline-none"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm"
        >
          <option value="todos">Todos status</option>
          {['rascunho', 'agendada', 'publicada', 'expirada', 'arquivada'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm"
        >
          <option value="todas">Todas categorias</option>
          {CATEGORIAS_NOTICIA.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Manchete</th>
              <th className="text-left px-4 py-3">Categoria</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Publicação</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filtered.map((n) => (
              <tr key={n.id} className="hover:bg-zinc-800/40">
                <td className="px-4 py-3 max-w-xl">
                  <Link to={`/portal/admin/noticias/${n.id}`} className="font-medium hover:text-[#C8922A] line-clamp-1">
                    {n.manchete}
                  </Link>
                  {n.destaque && (
                    <span className="ml-2 text-[10px] uppercase font-semibold text-[#C8922A]">destaque</span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-400">{n.categoria}</td>
                <td className="px-4 py-3">
                  <span className={cn('px-2 py-1 rounded-full text-[11px] font-semibold capitalize', STATUS_COLORS[n.status])}>
                    {n.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(n.dataPublicacao)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      to={`/portal/admin/noticias/${n.id}`}
                      className="p-2 rounded-lg hover:bg-zinc-700"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => confirm('Excluir notícia?') && del.mutate(n.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-zinc-500">Nenhuma notícia encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
