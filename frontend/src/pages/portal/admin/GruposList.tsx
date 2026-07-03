import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { deleteGrupo, listGrupos } from '@/services/portal';

export default function GruposList() {
  const qc = useQueryClient();
  const { data: grupos = [] } = useQuery({ queryKey: ['admin', 'grupos'], queryFn: listGrupos });
  const del = useMutation({
    mutationFn: deleteGrupo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'grupos'] }),
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Grupos de notícias</h1>
          <p className="text-sm text-zinc-400">Agrupe notícias por tema</p>
        </div>
        <Link to="/portal/admin/grupos/novo" className="px-4 py-2.5 rounded-lg bg-[#0F4C81] text-white text-sm font-medium inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo grupo
        </Link>
      </header>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Descrição</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {grupos.map((g) => (
              <tr key={g.id} className="hover:bg-zinc-800/40">
                <td className="px-4 py-3 font-medium">{g.nome}</td>
                <td className="px-4 py-3 text-zinc-400">{g.descricao}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${g.ativo ? 'bg-emerald-600/30 text-emerald-300' : 'bg-zinc-700 text-zinc-300'}`}>
                    {g.ativo ? 'ativo' : 'inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link to={`/portal/admin/grupos/${g.id}`} className="p-2 rounded-lg hover:bg-zinc-700">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => confirm('Excluir grupo?') && del.mutate(g.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!grupos.length && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-zinc-500">Nenhum grupo cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
