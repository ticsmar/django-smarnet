import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Upload, Save, Send, ArrowLeft } from 'lucide-react';
import {
  getAdminNoticia, saveNoticia, uploadImagem, listGrupos, listAdminMenus,
} from '@/services/portal';
import { CATEGORIAS_NOTICIA, type Noticia, type NoticiaStatus } from '@/types/portal';
import { slugify } from '@/lib/portalUtils';
import { TipTapEditor } from './TipTapEditor';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<NoticiaStatus, string> = {
  rascunho: 'bg-zinc-700 text-zinc-200',
  agendada: 'bg-sky-600/30 text-sky-300',
  publicada: 'bg-emerald-600/30 text-emerald-300',
  expirada: 'bg-amber-600/30 text-amber-300',
  arquivada: 'bg-zinc-600/30 text-zinc-400',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-zinc-900 border border-zinc-800">
      <h2 className="px-5 py-3 border-b border-zinc-800 text-sm font-semibold uppercase tracking-wider text-zinc-300">
        {title}
      </h2>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}

const inp = 'w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm focus:border-[#0F4C81] outline-none';

export default function NoticiaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: existing } = useQuery({
    queryKey: ['admin', 'noticia', id],
    queryFn: () => (id ? getAdminNoticia(id) : Promise.resolve(null)),
    enabled: !!id,
  });
  const { data: grupos = [] } = useQuery({ queryKey: ['admin', 'grupos'], queryFn: listGrupos });
  const { data: menus = [] } = useQuery({ queryKey: ['admin', 'menus'], queryFn: listAdminMenus });

  const [form, setForm] = useState<Partial<Noticia>>({
    manchete: '', slug: '', resumo: '', corpo: '', categoria: 'Comunicados',
    destaque: false, imagem: '', imagemAlt: '',
    autorNome: '', autorCargo: '',
    status: 'rascunho',
    dataPublicacao: new Date().toISOString(),
    dataExpiracao: null, naoExpira: true,
  });

  useEffect(() => { if (existing) setForm(existing); }, [existing]);

  const upd = (p: Partial<Noticia>) => setForm((s) => ({ ...s, ...p }));

  const save = useMutation({
    mutationFn: saveNoticia,
    onSuccess: (n) => {
      qc.invalidateQueries({ queryKey: ['admin', 'noticias'] });
      navigate(`/portal/admin/noticias/${n.id}`);
    },
  });

  const upload = useMutation({
    mutationFn: uploadImagem,
    onSuccess: ({ url }) => upd({ imagem: url }),
  });

  const handleSave = (status: NoticiaStatus) => {
    save.mutate({
      ...form,
      status,
      slug: form.slug || slugify(form.manchete || ''),
    });
  };

  const dtLocal = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 16) : '');
  const fromDt = (v: string) => (v ? new Date(v).toISOString() : '');

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate('/portal/admin/noticias')} className="p-2 rounded-lg hover:bg-zinc-800">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{id ? 'Editar notícia' : 'Nova notícia'}</h1>
          <p className="text-sm text-zinc-400">Portal da Transparência · Nova Smar S/A</p>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-[11px] font-semibold capitalize', STATUS_COLORS[form.status as NoticiaStatus])}>
          {form.status}
        </span>
      </header>

      <Section title="Identificação">
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Manchete *</label>
          <input
            className={inp}
            value={form.manchete}
            onChange={(e) => upd({ manchete: e.target.value })}
            onBlur={() => !form.slug && upd({ slug: slugify(form.manchete || '') })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Slug</label>
            <input className={inp} value={form.slug} onChange={(e) => upd({ slug: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Categoria</label>
            <select className={inp} value={form.categoria} onChange={(e) => upd({ categoria: e.target.value })}>
              {CATEGORIAS_NOTICIA.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block flex justify-between">
            Resumo <span>{(form.resumo ?? '').length}/180</span>
          </label>
          <textarea
            maxLength={180}
            rows={3}
            className={inp + ' h-auto py-2 resize-y'}
            value={form.resumo}
            onChange={(e) => upd({ resumo: e.target.value })}
          />
        </div>
        <label className="inline-flex items-center gap-2 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.destaque}
            onChange={(e) => upd({ destaque: e.target.checked })}
            className="w-4 h-4 accent-[#C8922A]"
          />
          <span className="text-sm">Destaque — aparecer no carrossel</span>
        </label>
      </Section>

      <Section title="Mídia">
        <div className="flex flex-wrap gap-4 items-start">
          {form.imagem ? (
            <img src={form.imagem} alt="" className="w-48 h-32 object-cover rounded-lg border border-zinc-800" />
          ) : (
            <div className="w-48 h-32 rounded-lg bg-zinc-950 border border-dashed border-zinc-700 grid place-items-center text-xs text-zinc-500">
              sem imagem
            </div>
          )}
          <div className="flex-1 min-w-[220px] space-y-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F4C81] text-white text-sm font-medium cursor-pointer hover:bg-[#0F4C81]/90">
              <Upload className="w-4 h-4" />
              Enviar imagem
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => e.target.files?.[0] && upload.mutate(e.target.files[0])}
              />
            </label>
            <input
              className={inp}
              placeholder="Texto alternativo (alt)"
              value={form.imagemAlt}
              onChange={(e) => upd({ imagemAlt: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="text-xs text-zinc-400 mb-2">Tipo de publicação</div>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => upd({ videoUrl: undefined })}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg border',
                !form.videoUrl
                  ? 'bg-[#C8922A] text-black border-[#C8922A] font-semibold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800',
              )}
            >
              Apenas texto
            </button>
            <button
              type="button"
              onClick={() => upd({ videoUrl: form.videoUrl ?? '' })}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg border',
                form.videoUrl !== undefined
                  ? 'bg-[#C8922A] text-black border-[#C8922A] font-semibold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800',
              )}
            >
              Texto + Vídeo
            </button>
          </div>
          {form.videoUrl !== undefined && (
            <>
              <label className="text-xs text-zinc-400 mb-1 block">URL do vídeo (YouTube ou Vimeo)</label>
              <input
                className={inp}
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.videoUrl ?? ''}
                onChange={(e) => upd({ videoUrl: e.target.value })}
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                A imagem de capa continua sendo usada no carrossel; um selo de vídeo é exibido automaticamente.
              </p>
            </>
          )}
        </div>
      </Section>

      <Section title="Corpo">
        <TipTapEditor value={form.corpo ?? ''} onChange={(html) => upd({ corpo: html })} />
      </Section>

      <Section title="Publicação">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Autor (nome)</label>
            <input className={inp} value={form.autorNome} onChange={(e) => upd({ autorNome: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Autor (cargo)</label>
            <input className={inp} value={form.autorCargo} onChange={(e) => upd({ autorCargo: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-400 mb-1 block">Data de publicação</label>
          <input
            type="datetime-local"
            className={inp}
            value={dtLocal(form.dataPublicacao)}
            onChange={(e) => upd({ dataPublicacao: fromDt(e.target.value) })}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => upd({ dataPublicacao: new Date().toISOString() })}
              className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700"
            >
              Publicar agora
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date(); d.setDate(d.getDate() + 1);
                upd({ dataPublicacao: d.toISOString() });
              }}
              className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700"
            >
              Agendar (+1 dia)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-zinc-400">Validade</div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={!form.naoExpira}
              onChange={() => upd({ naoExpira: false, dataExpiracao: form.dataExpiracao ?? new Date().toISOString() })}
            />
            <span className="text-sm">Tem data de saída</span>
          </label>
          {!form.naoExpira && (
            <input
              type="datetime-local"
              className={inp}
              value={dtLocal(form.dataExpiracao)}
              onChange={(e) => upd({ dataExpiracao: fromDt(e.target.value) })}
            />
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={!!form.naoExpira}
              onChange={() => upd({ naoExpira: true, dataExpiracao: null })}
            />
            <span className="text-sm">Conteúdo permanente (não expira)</span>
          </label>
        </div>
      </Section>

      <Section title="Vínculos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Grupo de notícias</label>
            <select className={inp} value={form.grupoId ?? ''} onChange={(e) => upd({ grupoId: e.target.value || undefined })}>
              <option value="">— Nenhum —</option>
              {grupos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Menu (opcional)</label>
            <select className={inp} value={form.menuId ?? ''} onChange={(e) => upd({ menuId: e.target.value || undefined })}>
              <option value="">— Nenhum —</option>
              {menus.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        </div>
      </Section>

      <div className="flex items-center gap-3 sticky bottom-0 bg-zinc-950 -mx-8 px-8 py-4 border-t border-zinc-800">
        <button
          onClick={() => handleSave('rascunho')}
          disabled={save.isPending}
          className="px-4 py-2.5 rounded-lg bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Salvar rascunho
        </button>
        <button
          onClick={() => handleSave('publicada')}
          disabled={save.isPending}
          className="px-4 py-2.5 rounded-lg bg-[#C8922A] text-black text-sm font-semibold hover:opacity-90 inline-flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Publicar
        </button>
      </div>
    </div>
  );
}
