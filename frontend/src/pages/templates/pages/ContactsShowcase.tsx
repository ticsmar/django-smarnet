import { useState } from 'react';
import { PagesLayout, PageSection } from './PagesLayout';
import {
  Mail, Phone, MapPin, Star, MoreVertical, Plus, Search,
  LayoutGrid, List, Table as TableIcon, Eye, Pencil, Trash2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const contacts = [
  { id: 1, name: 'Ana Paula Ribeiro', role: 'Gerente Comercial', email: 'ana.ribeiro@smarnet.com', phone: '+55 11 98765-4321', city: 'São Paulo, SP', starred: true, status: 'Ativo' },
  { id: 2, name: 'Carlos Mendes', role: 'Diretor de Operações', email: 'carlos@gerdau.com', phone: '+55 21 91234-5678', city: 'Rio de Janeiro, RJ', starred: true, status: 'Ativo' },
  { id: 3, name: 'Marina Costa', role: 'CFO', email: 'marina.costa@petrobras.com', phone: '+55 11 99876-5432', city: 'Sertãozinho, SP', starred: false, status: 'Ativo' },
  { id: 4, name: 'Roberto Silva', role: 'Engenheiro de Produção', email: 'roberto@vale.com', phone: '+55 31 98123-4567', city: 'Belo Horizonte, MG', starred: false, status: 'Inativo' },
  { id: 5, name: 'Juliana Almeida', role: 'Compradora', email: 'juliana@weg.com', phone: '+55 47 99234-1234', city: 'Curitiba, PR', starred: false, status: 'Ativo' },
  { id: 6, name: 'Pedro Santos', role: 'Diretor Industrial', email: 'pedro@mouradubeux.com', phone: '+55 81 98765-1234', city: 'Recife, PE', starred: true, status: 'Ativo' },
];

type ViewMode = 'panel' | 'list' | 'table';

const viewOptions: { mode: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { mode: 'panel', icon: LayoutGrid, label: 'Painel' },
  { mode: 'list', icon: List, label: 'Lista' },
  { mode: 'table', icon: TableIcon, label: 'Tabela' },
];

function Initials({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
      {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const isActive = status === 'Ativo';
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
}

function RowActions({ id }: { id: number }) {
  return (
    <div className="flex items-center gap-1 justify-end">
      <Link to="/app/templates/pages/profile-edit" className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" title="Visualizar">
        <Eye size={14} />
      </Link>
      <Link to="/app/templates/pages/profile-edit" className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-primary" title="Editar">
        <Pencil size={14} />
      </Link>
      <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-destructive" title="Excluir">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default function ContactsShowcase() {
  const [view, setView] = useState<ViewMode>('panel');

  return (
    <PagesLayout title="Contatos" description="Sua agenda corporativa centralizada." category="Páginas">
      <PageSection>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar contato..." className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-lg border border-border/60 bg-surface-container-low p-0.5">
              {viewOptions.map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={`flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium transition-colors ${
                    view === mode
                      ? 'bg-surface-container text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-pressed={view === mode}
                >
                  <Icon size={13} />
                  <span className="hidden md:inline">{label}</span>
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              <Plus size={15} /> Novo contato
            </button>
          </div>
        </div>

        {view === 'panel' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((c) => (
              <div key={c.id} className="bg-surface-container-low rounded-xl p-5 hover:bg-surface-container-low/70 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold">
                    {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className={c.starred ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}>
                      <Star size={15} fill={c.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-foreground"><MoreVertical size={15} /></button>
                  </div>
                </div>
                <p className="font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground mb-3">{c.role}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><Mail size={12} /> {c.email}</p>
                  <p className="flex items-center gap-2"><Phone size={12} /> {c.phone}</p>
                  <p className="flex items-center gap-2"><MapPin size={12} /> {c.city}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                  <StatusPill status={c.status} />
                  <RowActions id={c.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'list' && (
          <ul className="divide-y divide-border/40 rounded-xl bg-surface-container-low/50 overflow-hidden">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors">
                <Initials name={c.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground truncate">{c.name}</p>
                    <StatusPill status={c.status} />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.role} · {c.city}</p>
                </div>
                <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Mail size={11} /> {c.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={11} /> {c.phone}</span>
                </div>
                <button className={c.starred ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}>
                  <Star size={15} fill={c.starred ? 'currentColor' : 'none'} />
                </button>
                <RowActions id={c.id} />
              </li>
            ))}
          </ul>
        )}

        {view === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Cargo</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">E-mail</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Telefone</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Cidade</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Initials name={c.name} />
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.role}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{c.email}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{c.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.city}</td>
                    <td className="px-4 py-3"><StatusPill status={c.status} /></td>
                    <td className="px-4 py-3"><RowActions id={c.id} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageSection>
    </PagesLayout>
  );
}
