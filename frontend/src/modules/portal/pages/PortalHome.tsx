import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getDestaques, getRecentes } from '@/services/portal';
import { formatDate } from '@/lib/portalUtils';
import { cn } from '@/lib/utils';

const REFETCH = 5 * 60 * 1000;
const SLIDE_MS = 6000;

export default function PortalHome() {
  const { data: destaques = [] } = useQuery({
    queryKey: ['portal', 'destaques'],
    queryFn: getDestaques,
    refetchInterval: REFETCH,
  });
  const { data: recentes = [] } = useQuery({
    queryKey: ['portal', 'recentes'],
    queryFn: getRecentes,
    refetchInterval: REFETCH,
  });

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!destaques.length || paused) return;
    setProgress(0);
    const start = Date.now();
    tickRef.current = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / SLIDE_MS) * 100);
      setProgress(p);
      if (p >= 100) {
        setIdx((i) => (i + 1) % destaques.length);
      }
    }, 50);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [idx, destaques.length, paused]);

  const current = destaques[idx];
  const prev = () => setIdx((i) => (i - 1 + destaques.length) % destaques.length);
  const next = () => setIdx((i) => (i + 1) % destaques.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 h-full overflow-hidden">
      {/* Carrossel */}
      <section
        className="lg:col-span-3 relative overflow-hidden rounded-2xl bg-black"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {current && (
          <Link
            to={`/portal/noticias/${current.slug}`}
            className="absolute inset-0 block"
          >
            <img
              src={current.imagem}
              alt={current.imagemAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10" />
            {current.videoUrl && (
              <>
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <span className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-black/55 backdrop-blur-sm border-2 border-white/80 grid place-items-center shadow-2xl">
                    <Play className="w-9 h-9 lg:w-11 lg:h-11 text-white fill-white ml-1" />
                  </span>
                </div>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  <Play className="w-3 h-3 fill-white" /> Vídeo
                </span>
              </>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14 max-w-5xl">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#C8922A] text-black mb-4">
                {current.categoria}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow">
                {current.manchete}
              </h1>
              <p className="mt-4 text-lg lg:text-xl text-white/85 max-w-3xl line-clamp-2">
                {current.resumo}
              </p>
              <div className="mt-5 text-base text-white/70">
                {formatDate(current.dataPublicacao)} ·{' '}
                <span className="text-white">{current.autorNome}</span> ·{' '}
                {current.autorCargo}
              </div>
            </div>
          </Link>
        )}

        {/* Barra de progresso */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-[#C8922A] transition-[width] duration-75 linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Setas */}
        <button
          aria-label="Anterior"
          onClick={(e) => {
            e.preventDefault();
            prev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 min-w-12 min-h-12 grid place-items-center rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/70 active:bg-black/80"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          aria-label="Próximo"
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 min-w-12 min-h-12 grid place-items-center rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/70 active:bg-black/80"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 right-6 flex gap-2">
          {destaques.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Destaque ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all',
                i === idx ? 'w-8 bg-[#C8922A]' : 'w-2 bg-white/40',
              )}
            />
          ))}
        </div>
      </section>

      {/* Sidebar */}
      <aside className="lg:col-span-1 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Últimas notícias</h2>
          <p className="text-sm text-white/50">Atualização em tempo real</p>
        </div>
        <div className="relative flex-1 overflow-hidden group">
          {recentes.length >= 5 ? (
            <div className="absolute inset-x-0 top-0 animate-portal-scroll group-hover:[animation-play-state:paused]">
              {[...recentes, ...recentes].map((n, i) => (
                <Link
                  key={`${n.id}-${i}`}
                  to={`/portal/noticias/${n.slug}`}
                  className="flex gap-3 p-3 mx-3 mb-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors border border-white/5"
                >
                  <div className="relative shrink-0">
                    <img
                      src={n.imagem}
                      alt={n.imagemAlt}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {n.videoUrl && (
                      <span className="absolute inset-0 grid place-items-center bg-black/40 rounded-lg">
                        <span className="w-8 h-8 rounded-full bg-red-600/95 grid place-items-center border border-white/80">
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#C8922A]">
                      {n.categoria}
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 mt-1">
                      {n.manchete}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {formatDate(n.dataPublicacao)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col p-3 gap-3">
              {recentes.map((n) => (
                <Link
                  key={n.id}
                  to={`/portal/noticias/${n.slug}`}
                  className="flex gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors border border-white/5 flex-1 min-h-0"
                  style={{ maxHeight: 'calc((100% - 1.5rem) / 2)' }}
                >
                  <div className="relative h-full aspect-square shrink-0">
                    <img
                      src={n.imagem}
                      alt={n.imagemAlt}
                      className="h-full w-full object-cover rounded-lg"
                    />
                    {n.videoUrl && (
                      <span className="absolute inset-0 grid place-items-center bg-black/40 rounded-lg">
                        <span className="w-10 h-10 rounded-full bg-red-600/95 grid place-items-center border border-white/80">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#C8922A]">
                      {n.categoria}
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 mt-1">
                      {n.manchete}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {formatDate(n.dataPublicacao)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </aside>
    </div>
  );
}
