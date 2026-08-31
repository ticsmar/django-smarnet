import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { listGrupos, saveGrupo } from '@/services/portal';
import type { GrupoNoticias } from '@/types/portal';

const inp = 'w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm focus:border-[#0F4C81] outline-none';

export default function GrupoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: all = [] } = useQuery({ queryKey: ['admin', 'grupos'], queryFn: listGrupos });

  const [form, setForm] = useState<Partial<GrupoNoticias>>({ nome: '', descricao: '', ativo: true });

  useEffect(() => {
    if (id) {
      const g = all.find((x) => x.id === id);
      if (g) setForm(g);
    }
  }, [id, all]);

  const save = useMutation({
    mutationFn: saveGrupo,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'grupos'] });
      navigate('/portal/admin/grupos');
    },
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate('/portal/admin/grupos')} className="p-2 rounded-lg hover:bg-zinc-800">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-bold">{id ? 'Editar grupo' : 'Novo grupo'}</h1>
      </header>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Nome *</label>
          <input className={inp} value={form.nome ?? ''} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Descrição</label>
          <textarea rows={3} className={inp + ' h-auto py-2'} value={form.descricao ?? ''} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
        </div>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} className="w-4 h-4 accent-[#0F4C81]" />
          <span className="text-sm">Ativo</span>
        </label>
      </div>

      <button
        onClick={() => save.mutate(form)}
        disabled={save.isPending || !form.nome}
        className="px-4 py-2.5 rounded-lg bg-[#0F4C81] text-white text-sm font-medium inline-flex items-center gap-2 hover:bg-[#0F4C81]/90 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> Salvar
      </button>
    </div>
  );
}
