import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGrupo } from '@/services/portal';
import { formatDate } from '@/lib/portalUtils';

export default function GrupoPage() {
  const { slug = '' } = useParams();
  const { data } = useQuery({
    queryKey: ['portal', 'grupo', slug],
    queryFn: () => getGrupo(slug),
  });

  if (!data) return <div className="p-10 text-white/60">Carregando…</div>;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold">{data.grupo.nome}</h1>
      {data.grupo.descricao && (
        <p className="text-white/60 mt-2">{data.grupo.descricao}</p>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.noticias.map((n) => (
          <Link
            key={n.id}
            to={`/portal/noticias/${n.slug}`}
            className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-[#C8922A]/40 hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={n.imagem}
                alt={n.imagemAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8922A]">
                {n.categoria}
              </span>
              <h3 className="mt-2 text-lg font-bold leading-snug line-clamp-2">
                {n.manchete}
              </h3>
              <p className="mt-2 text-sm text-white/60 line-clamp-2">{n.resumo}</p>
              <p className="mt-3 text-xs text-white/40">{formatDate(n.dataPublicacao)}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}
