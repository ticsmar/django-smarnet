import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import {
  listAdminMenus, listAdminNoticias, listGrupos, saveMenu,
} from '@/services/portal';
import type { Menu, MenuTipo } from '@/types/portal';
import { slugify } from '@/lib/portalUtils';

const inp = 'w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm focus:border-[#0F4C81] outline-none';

const TIPOS: { value: MenuTipo; label: string }[] = [
  { value: 'grupo', label: 'Grupo de notícias' },
  { value: 'noticia', label: 'Notícia específica' },
  { value: 'url', label: 'URL externa' },
  { value: 'vazio', label: 'Apenas agrupador (sem vínculo)' },
];

export default function MenuForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: menus = [] } = useQuery({ queryKey: ['admin', 'menus'], queryFn: listAdminMenus });
  const { data: grupos = [] } = useQuery({ queryKey: ['admin', 'grupos'], queryFn: listGrupos });
  const { data: noticias = [] } = useQuery({ queryKey: ['admin', 'noticias'], queryFn: listAdminNoticias });

  const [form, setForm] = useState<Partial<Menu>>({
    label: '', slug: '', ordem: 0, ativo: true, tipo: 'vazio', menuPaiId: null,
  });

  useEffect(() => {
    if (id) {
      const m = menus.find((x) => x.id === id);
      if (m) setForm(m);
    }
  }, [id, menus]);

  const save = useMutation({
    mutationFn: saveMenu,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'menus'] });
      navigate('/portal/admin/menus');
    },
  });

  const upd = (p: Partial<Menu>) => setForm((s) => ({ ...s, ...p }));

  return (
    <div className="space-y-6 max-w-2xl">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate('/portal/admin/menus')} className="p-2 rounded-lg hover:bg-zinc-800">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-bold">{id ? 'Editar menu' : 'Novo menu'}</h1>
      </header>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Label *</label>
            <input
              className={inp}
              value={form.label ?? ''}
              onChange={(e) => upd({ label: e.target.value })}
              onBlur={() => !form.slug && upd({ slug: slugify(form.label ?? '') })}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Slug</label>
            <input className={inp} value={form.slug ?? ''} onChange={(e) => upd({ slug: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Ícone (Tabler/Lucide)</label>
            <input className={inp} value={form.icone ?? ''} onChange={(e) => upd({ icone: e.target.value })} placeholder="ex: home" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Ordem</label>
            <input
              type="number"
              className={inp}
              value={form.ordem ?? 0}
              onChange={(e) => upd({ ordem: Number(e.target.value) })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-zinc-400 mb-1 block">Menu pai (para criar submenu)</label>
            <select
              className={inp}
              value={form.menuPaiId ?? ''}
              onChange={(e) => upd({ menuPaiId: e.target.value || null })}
            >
              <option value="">— Nenhum (menu raiz) —</option>
              {menus.filter((m) => m.id !== id && !m.menuPaiId).map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-zinc-400">Tipo de vínculo</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {TIPOS.map((t) => (
              <label key={t.value} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-zinc-800 hover:bg-zinc-800/50">
                <input
                  type="radio"
                  name="tipo"
                  checked={form.tipo === t.value}
                  onChange={() => upd({ tipo: t.value })}
                />
                <span className="text-sm">{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        {form.tipo === 'grupo' && (
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Grupo de notícias</label>
            <select className={inp} value={form.grupoNoticiaId ?? ''} onChange={(e) => upd({ grupoNoticiaId: e.target.value })}>
              <option value="">— Selecione —</option>
              {grupos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
            </select>
          </div>
        )}
        {form.tipo === 'noticia' && (
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Notícia</label>
            <select className={inp} value={form.noticiaId ?? ''} onChange={(e) => upd({ noticiaId: e.target.value })}>
              <option value="">— Selecione —</option>
              {noticias.map((n) => <option key={n.id} value={n.id}>{n.manchete}</option>)}
            </select>
          </div>
        )}
        {form.tipo === 'url' && (
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">URL externa</label>
            <input className={inp} value={form.urlExterna ?? ''} onChange={(e) => upd({ urlExterna: e.target.value })} placeholder="https://…" />
          </div>
        )}

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.ativo}
            onChange={(e) => upd({ ativo: e.target.checked })}
            className="w-4 h-4 accent-[#0F4C81]"
          />
          <span className="text-sm">Ativo</span>
        </label>
      </div>

      <button
        onClick={() => save.mutate({ ...form, slug: form.slug || slugify(form.label ?? '') })}
        disabled={save.isPending || !form.label}
        className="px-4 py-2.5 rounded-lg bg-[#0F4C81] text-white text-sm font-medium inline-flex items-center gap-2 hover:bg-[#0F4C81]/90 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> Salvar
      </button>
    </div>
  );
}
