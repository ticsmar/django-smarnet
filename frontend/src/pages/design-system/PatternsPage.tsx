import { useState } from 'react';
import {
  Search,
  Bell,
  Filter,
  Plus,
  Inbox,
  MoreVertical,
  Home,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PathBreadcrumb } from '@/components/ui/breadcrumbs';
import { ViewToggle } from '@/components/ui/ViewToggle';
import {
  ActionsDropdown,
  type DropdownAction,
} from '@/components/ui/dropdowns/ActionsDropdown';
import { useViewMode } from '@/hooks/useViewMode';
import { DSSection, DSCard } from './_components';

const DEMO_ROWS = [
  { id: '#4821', client: 'Petrobras Refino', value: 'R$ 124.800', status: 'Faturado', color: 'success' },
  { id: '#4820', client: 'Vale Mineração', value: 'R$ 89.300', status: 'Em produção', color: 'warning' },
  { id: '#4819', client: 'Klabin Papéis', value: 'R$ 32.100', status: 'Pendente', color: 'alert' },
  { id: '#4818', client: 'CSN Aços', value: 'R$ 210.500', status: 'Cancelado', color: 'destructive' },
] as const;

const ROW_ACTIONS: DropdownAction[] = [
  { key: 'view', label: 'Visualizar', icon: Eye, onClick: () => undefined },
  { key: 'edit', label: 'Editar', icon: Pencil, onClick: () => undefined },
  {
    key: 'delete',
    label: 'Excluir',
    icon: Trash2,
    destructive: true,
    divider: true,
    onClick: () => undefined,
  },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <Badge
      style={{
        backgroundColor: `hsl(var(--${color}) / 0.15)`,
        color: `hsl(var(--${color}))`,
      }}
    >
      {status}
    </Badge>
  );
}

/** Ações da linha: menu ⋮ (tabela/lista) ou botões no rodapé (cards). */
function PatternRowActions({ variant = 'menu' }: { variant?: 'menu' | 'buttons' }) {
  if (variant === 'buttons') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {ROW_ACTIONS.map(({ key, label, icon: Icon, destructive }) => (
          <Button
            key={key}
            type="button"
            size="sm"
            variant={destructive ? 'destructive' : 'outline'}
            className="h-8 gap-1.5"
          >
            {Icon ? <Icon size={14} /> : null}
            {label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <ActionsDropdown
      iconOnly
      icon={MoreVertical}
      size="sm"
      variant="ghost"
      align="start"
      ariaLabel="Ações"
      actions={ROW_ACTIONS}
      triggerClassName="h-8 w-8 text-muted-foreground hover:text-foreground"
    />
  );
}

/** Padrão Data Table com ViewToggle (Tabela / Lista / Cards). */
function DataTablePatternPreview() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useViewMode('smarnet:view:ds-patterns-datatable', 'tabela');

  const rows = DEMO_ROWS.filter(
    (r) =>
      !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DSCard className="overflow-hidden">
      <div className="mt-0 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="pl-9"
            placeholder="Buscar pedido ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter size={14} /> Filtros
        </Button>
        <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          Nenhum pedido encontrado
        </div>
      ) : (
        <>
          {viewMode === 'tabela' ? (
            <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-high">
                  <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <th className="w-10 px-4 py-3" aria-label="Ações" />
                    <th className="px-4 py-3">Pedido</th>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Valor</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border/30 hover:bg-surface-container-low">
                      <td className="px-4 py-3">
                        <PatternRowActions />
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold">{r.id}</td>
                      <td className="px-4 py-3">{r.client}</td>
                      <td className="px-4 py-3 font-semibold">{r.value}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} color={r.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {viewMode === 'lista' ? (
            <div className="mt-6 space-y-2">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-background px-4 py-3 transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                >
                  <div className="shrink-0">
                    <PatternRowActions />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{r.client}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{r.id}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">{r.value}</p>
                  <StatusBadge status={r.status} color={r.color} />
                </div>
              ))}
            </div>
          ) : null}

          {viewMode === 'cards' ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col rounded-2xl border border-border/50 bg-background p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{r.client}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">{r.id}</p>
                    </div>
                    <StatusBadge status={r.status} color={r.color} />
                  </div>
                  <p className="text-base font-bold text-foreground">{r.value}</p>
                  <div className="mt-4 border-t border-border/40 pt-3">
                    <PatternRowActions variant="buttons" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </DSCard>
  );
}

export default function PatternsPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <DSSection
        title="Page Header"
        description="No app autenticado o breadcrumb fica numa faixa fixa do layout (abaixo do TopNav). O cabeçalho da página começa no título + ações — não embutir a trilha no conteúdo."
      >
        <DSCard className="space-y-4 p-0 overflow-hidden">
          <div className="px-6 pt-5">
            <PathBreadcrumb
              items={[
                { label: 'Início', href: '/app', icon: Home, iconOnly: true },
                { label: 'Comercial', href: '/app/purchasing' },
                { label: 'Pedidos' },
              ]}
            />
          </div>
          <div className="px-6 pb-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-display text-2xl font-bold">Pedidos em aberto</h3>
              <p className="text-sm text-muted-foreground mt-1">
                32 pedidos aguardando faturamento
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter size={14} /> Filtros
              </Button>
              <Button size="sm">
                <Plus size={14} /> Novo pedido
              </Button>
            </div>
          </div>
        </DSCard>
      </DSSection>

      {/* TOPBAR */}
      <DSSection title="Top Bar" description="Barra de busca + notificações + perfil do usuário.">
        <div className="rounded-2xl bg-surface-container-low p-3 flex items-center gap-3 shadow-ambient">
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input className="pl-9 bg-background" placeholder="Buscar pedidos, clientes, produtos..." />
          </div>
          <Button variant="ghost" size="icon">
            <Bell size={16} />
          </Button>
          <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
            JR
          </div>
        </div>
      </DSSection>

      {/* FORM */}
      <DSSection
        title="Form Layout"
        description="Formulário em grid de 2 colunas com agrupamento por seção."
      >
        <DSCard>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">
            Dados do cliente
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Razão social</Label>
              <Input placeholder="Nova Smar S/A" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input placeholder="00.000.000/0000-00" />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input placeholder="Sertãozinho" />
            </div>
            <div className="space-y-2">
              <Label>UF</Label>
              <Input placeholder="SP" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </DSCard>
      </DSSection>

      {/* TABLE */}
      <DSSection
        title="Data Table"
        description="Listagem com toolbar (busca + filtros) e ViewToggle à direita: Tabela, Lista ou Cards. Em Tabela/Lista use menu ⋮ à esquerda; em Cards, as mesmas ações como botões no rodapé — sem avatar/código no cabeçalho. Preferência persistida em localStorage."
      >
        <DataTablePatternPreview />
      </DSSection>

      {/* EMPTY STATE */}
      <DSSection title="Empty State">
        <DSCard className="flex flex-col items-center text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-muted-foreground flex items-center justify-center mb-4">
            <Inbox size={28} />
          </div>
          <h3 className="font-display font-bold text-lg">Nenhum pedido encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Ajuste os filtros ou cadastre um novo pedido para começar.
          </p>
          <Button className="mt-5">
            <Plus size={14} /> Novo pedido
          </Button>
        </DSCard>
      </DSSection>
    </>
  );
}
