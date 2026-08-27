import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { ArrowLeft, CalendarClock, ShieldCheck } from 'lucide-react';
import { getNoticia } from '@/services/portal';
import { daysUntil, formatDate, formatDateTime, toEmbedUrl } from '@/lib/portalUtils';
import { cn } from '@/lib/utils';

export default function NoticiaPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { data: n, isLoading, isError } = useQuery({
    queryKey: ['portal', 'noticia', slug],
    queryFn: () => getNoticia(slug),
  });

  if (isLoading) return <div className="p-10 text-white/60">Carregando…</div>;
  if (isError || !n) return <div className="p-10 text-white/60">Notícia não encontrada.</div>;

  const dias = n.dataExpiracao ? daysUntil(n.dataExpiracao) : null;
  const expirando = dias !== null && dias <= 7;
  const embed = toEmbedUrl(n.videoUrl);

  return (
    <article className="bg-[#0A0E1A] h-full overflow-y-auto text-white">
      <header className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={n.imagem} alt={n.imagemAlt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 min-h-12 min-w-12 inline-flex items-center gap-2 px-4 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-black/80 active:bg-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Voltar</span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-14 max-w-5xl">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#C8922A] text-black mb-4">
            {n.categoria}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight drop-shadow">
            {n.manchete}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl">{n.resumo}</p>
          <p className="mt-4 text-base text-white/60">
            {formatDate(n.dataPublicacao)} · Por{' '}
            <span className="text-white">{n.autorNome}</span> · {n.autorCargo}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {embed && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
            <iframe
              src={embed}
              title={n.manchete}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#C8922A] prose-blockquote:border-l-[#C8922A]"
          style={{ fontSize: '19px', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(n.corpo, { USE_PROFILES: { html: true } }),
          }}
        />

        <footer className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
          {n.naoExpira ? (
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-semibold">Conteúdo permanente</span>
            </span>
          ) : n.dataExpiracao ? (
            <span
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-full border',
                expirando
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-white/5 text-white/70 border-white/10',
              )}
            >
              <CalendarClock className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Válido até {formatDateTime(n.dataExpiracao)}
                {expirando && ` · ${dias} ${dias === 1 ? 'dia' : 'dias'} restantes`}
              </span>
            </span>
          ) : null}
          <Link
            to="/portal"
            className="ml-auto min-h-12 inline-flex items-center px-5 rounded-xl bg-[#0F4C81] hover:bg-[#0F4C81]/90 active:bg-[#0F4C81]/80 text-white text-base font-medium"
          >
            Voltar ao portal
          </Link>
        </footer>
      </div>
    </article>
  );
}
