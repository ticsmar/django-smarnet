import { useQuery } from '@tanstack/react-query';
import { Newspaper, CheckCircle2, Clock, Archive, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listAdminNoticias } from '@/services/portal';
import type { NoticiaStatus } from '@/types/portal';

const CARDS: { key: NoticiaStatus | 'destaque' | 'total'; label: string; icon: any; color: string }[] = [
  { key: 'total', label: 'Total de notícias', icon: Newspaper, color: 'text-[#C8922A]' },
  { key: 'publicada', label: 'Publicadas', icon: CheckCircle2, color: 'text-emerald-400' },
  { key: 'agendada', label: 'Agendadas', icon: Clock, color: 'text-sky-400' },
  { key: 'rascunho', label: 'Rascunhos', icon: Newspaper, color: 'text-zinc-400' },
  { key: 'arquivada', label: 'Arquivadas', icon: Archive, color: 'text-zinc-500' },
  { key: 'destaque', label: 'No carrossel', icon: Star, color: 'text-amber-400' },
];

export default function AdminDashboard() {
  const { data: noticias = [] } = useQuery({ queryKey: ['admin', 'noticias'], queryFn: listAdminNoticias });

  const count = (k: typeof CARDS[number]['key']) => {
    if (k === 'total') return noticias.length;
    if (k === 'destaque') return noticias.filter((n) => n.destaque).length;
    return noticias.filter((n) => n.status === k).length;
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-400">Visão geral do Portal da Transparência</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CARDS.map((c) => (
          <div
            key={c.key}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"
          >
            <c.icon className={`w-5 h-5 ${c.color}`} />
            <div className="mt-3 text-3xl font-bold">{count(c.key)}</div>
            <div className="text-xs text-zinc-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-zinc-900 border border-zinc-800">
        <header className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold">Últimas notícias</h2>
          <Link
            to="/portal/admin/noticias/nova"
            className="px-4 py-2 rounded-lg bg-[#0F4C81] text-white text-sm font-medium hover:bg-[#0F4C81]/90"
          >
            Nova notícia
          </Link>
        </header>
        <ul className="divide-y divide-zinc-800">
          {noticias.slice(0, 6).map((n) => (
            <li key={n.id} className="px-5 py-4 flex items-center gap-4">
              <img src={n.imagem} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/portal/admin/noticias/${n.id}`}
                  className="font-semibold hover:text-[#C8922A] line-clamp-1"
                >
                  {n.manchete}
                </Link>
                <div className="text-xs text-zinc-500">
                  {n.categoria} · {n.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
