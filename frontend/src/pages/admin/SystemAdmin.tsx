import { ServerCog, Database, Globe, Mail, Shield, Save } from 'lucide-react';

const sections = [
  {
    icon: Globe,
    title: 'Geral',
    fields: [
      { label: 'Nome do Sistema', value: 'SmarNET ERP' },
      { label: 'Idioma padrão', value: 'Português (BR)', select: ['Português (BR)', 'English', 'Español'] },
      { label: 'Fuso horário', value: 'America/Sao_Paulo', select: ['America/Sao_Paulo', 'America/New_York', 'Europe/Lisbon'] },
    ],
  },
  {
    icon: Database,
    title: 'Banco de Dados',
    fields: [
      { label: 'Host', value: 'db.smarnet.local' },
      { label: 'Porta', value: '5432' },
      { label: 'Backup automático', value: 'Diário 03:00', select: ['Desativado', 'Diário 03:00', 'A cada 12h', 'Semanal'] },
    ],
  },
  {
    icon: Mail,
    title: 'E-mail',
    fields: [
      { label: 'Servidor SMTP', value: 'smtp.smarnet.com.br' },
      { label: 'Porta', value: '587' },
      { label: 'Remetente padrão', value: 'no-reply@smarnet.com.br' },
    ],
  },
  {
    icon: Shield,
    title: 'Segurança',
    fields: [
      { label: 'Política de senha', value: 'Forte (12+ caracteres, símbolos)', select: ['Básica', 'Média', 'Forte (12+ caracteres, símbolos)'] },
      { label: '2FA obrigatório', value: 'Apenas Admins', select: ['Desativado', 'Apenas Admins', 'Todos os usuários'] },
      { label: 'Tempo de sessão', value: '8 horas', select: ['1 hora', '4 horas', '8 horas', '24 horas'] },
    ],
  },
];

export default function SystemAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <ServerCog size={22} className="text-amber-400" /> Configurações do Sistema
          </h1>
          <p className="text-sm text-zinc-400">Parâmetros globais e configurações operacionais.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 transition-colors">
          <Save size={16} /> Salvar alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2">
              <s.icon size={16} className="text-amber-400" />
              <h3 className="font-bold text-zinc-100">{s.title}</h3>
            </div>
            <div className="p-5 space-y-4">
              {s.fields.map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{f.label}</label>
                  {f.select ? (
                    <select defaultValue={f.value}
                      className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60">
                      {f.select.map((opt) => <option key={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input defaultValue={f.value}
                      className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
