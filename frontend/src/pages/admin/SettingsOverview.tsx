import { useNavigate } from 'react-router-dom';
import { Users, Building2, KeyRound, ServerCog, Activity, Database, Bell, FileText, TrendingUp, ChevronRight } from 'lucide-react';

const stats = [
  { label: 'Usuários ativos', value: '127', delta: '+8', icon: Users, color: 'text-sky-400' },
  { label: 'Empresas', value: '12', delta: '+1', icon: Building2, color: 'text-emerald-400' },
  { label: 'Perfis de acesso', value: '9', delta: '0', icon: KeyRound, color: 'text-violet-400' },
  { label: 'Eventos hoje', value: '342', delta: '+24%', icon: Activity, color: 'text-amber-400' },
];

const shortcuts = [
  { label: 'Cadastrar usuário', desc: 'Novo acesso ao sistema', icon: Users, path: '/settings/usuarios' },
  { label: 'Cadastrar empresa', desc: 'Adicionar nova filial / matriz', icon: Building2, path: '/settings/empresas' },
  { label: 'Gerir perfis', desc: 'Permissões e papéis', icon: KeyRound, path: '/settings/acessos' },
  { label: 'Configurações do sistema', desc: 'Parâmetros globais', icon: ServerCog, path: '/settings/sistema' },
  { label: 'Integrações', desc: 'APIs e conectores', icon: Database, path: '/settings/integracoes' },
  { label: 'Notificações', desc: 'Templates e canais', icon: Bell, path: '/settings/notificacoes' },
  { label: 'Logs & auditoria', desc: 'Histórico de eventos', icon: FileText, path: '/settings/logs' },
];

export default function SettingsOverview() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-zinc-100">Painel Administrativo</h1>
        <p className="text-sm text-zinc-400">Gerencie usuários, empresas, acessos e configurações do sistema.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon size={18} className={s.color} />
              <span className="text-[10px] font-semibold text-zinc-500 inline-flex items-center gap-1">
                <TrendingUp size={10} /> {s.delta}
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Ações rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {shortcuts.map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className="text-left rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-900/60 p-4 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-amber-500/15 flex items-center justify-center text-zinc-400 group-hover:text-amber-300 transition-colors">
                  <s.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-100">{s.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
                </div>
                <ChevronRight size={16} className="text-zinc-600 group-hover:text-amber-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
