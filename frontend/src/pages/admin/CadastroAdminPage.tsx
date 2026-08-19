import { Building2, Globe2, Map, UserRound } from 'lucide-react';

type CadastroKind = 'pessoa' | 'pais' | 'estado';

const cadastros = {
  pessoa: {
    title: 'Cadastro de Pessoa',
    description: 'Base de pessoas e meios de contato usada pelos cadastros corporativos.',
    icon: UserRound,
    items: ['Pessoa', 'Meios de contato', 'Tipos de contato', 'Solicitações de acesso', 'Celular'],
  },
  pais: {
    title: 'Cadastro de País',
    description: 'Países e nomes alternativos vinculados à base geral.',
    icon: Globe2,
    items: ['País', 'Nome do país'],
  },
  estado: {
    title: 'Cadastro de Estado',
    description: 'Estados e classificações de tipo de estado vinculadas ao país.',
    icon: Map,
    items: ['Estado', 'Tipo de estado'],
  },
} satisfies Record<CadastroKind, {
  title: string;
  description: string;
  icon: typeof Building2;
  items: string[];
}>;

export default function CadastroAdminPage({ kind }: { kind: CadastroKind }) {
  const cadastro = cadastros[kind];
  const Icon = cadastro.icon;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <Icon size={22} className="text-amber-400" /> {cadastro.title}
          </h1>
          <p className="text-sm text-zinc-400">{cadastro.description}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800">
          <h2 className="font-bold text-zinc-100">Escopo do cadastro</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Tela preparada no menu. O CRUD deve seguir o padrão de cadastro/listagem antes de ligar a API.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {cadastro.items.map((item) => (
            <div key={item} className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Escopo</p>
              <p className="mt-1 text-sm text-zinc-100">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
