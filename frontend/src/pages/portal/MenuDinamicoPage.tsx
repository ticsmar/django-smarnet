import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { getMenus } from '@/services/portal';

const corpoFixo = `
<p>Bem-vindo a esta seção do portal. O conteúdo desta página é
<strong>fixo</strong> e está sempre disponível através do menu principal,
servindo como referência institucional permanente.</p>
<h2>Sobre esta seção</h2>
<p>Aqui você encontrará informações estáveis e atualizadas pela equipe
responsável, com foco em transparência, governança e clareza.</p>
<ul>
  <li>Conteúdo institucional permanente</li>
  <li>Acesso direto pelo menu superior</li>
  <li>Atualizações realizadas pela área responsável</li>
</ul>
<blockquote>Este conteúdo permanece disponível enquanto o item de menu estiver ativo.</blockquote>
<p>Para dúvidas, utilize os canais oficiais de comunicação interna.</p>
`;

const imagemFixa =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80';

export default function MenuDinamicoPage() {
  const { menuSlug = '' } = useParams();
  const navigate = useNavigate();
  const { data: menus = [], isLoading } = useQuery({
    queryKey: ['portal', 'menus'],
    queryFn: getMenus,
  });

  const menu = menus.find((m) => m.slug === menuSlug);

  useEffect(() => {
    if (menu?.tipo === 'url' && menu.urlExterna) {
      window.location.href = menu.urlExterna;
    }
  }, [menu]);

  if (isLoading) return <div className="p-10 text-white/60">Carregando…</div>;
  if (!menu) return <Navigate to="/portal" replace />;

  if (menu.tipo === 'grupo') return <Navigate to={`/portal/grupo/${menu.slug}`} replace />;
  if (menu.tipo === 'noticia') return <Navigate to={`/portal/noticias/${menu.slug}`} replace />;

  const menuPai = menu.menuPaiId ? menus.find((m) => m.id === menu.menuPaiId) : null;
  const categoria = menuPai?.label ?? 'Portal';

  return (
    <article className="bg-[#0A0E1A] h-full overflow-y-auto text-white">
      <header className="relative h-[36vh] min-h-[250px] w-full overflow-hidden">
        <img
          src={imagemFixa}
          alt={menu.label}
          className="absolute inset-0 w-full h-full object-cover"
        />
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
            {categoria}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight drop-shadow">
            {menu.label}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl">
            Conteúdo institucional fixo, sempre acessível pelo menu principal.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#C8922A] prose-blockquote:border-l-[#C8922A]"
          style={{ fontSize: '19px', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(corpoFixo, { USE_PROFILES: { html: true } }),
          }}
        />

        <footer className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-semibold">Conteúdo permanente</span>
          </span>
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
