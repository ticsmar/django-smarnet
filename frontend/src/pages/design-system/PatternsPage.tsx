import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Filter,
  Plus,
  Inbox,
  Building2,
  MoreVertical,
  Home,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CollectionHeader } from '@/components/ui/collection-header';
import { CollectionToolbar } from '@/components/ui/collection-toolbar';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FormGrid,
  FormInput,
  FormRow,
  FormSelect,
  FloatingLabelInput,
  FloatingLabelSelect,
} from '@/components/ui/forms';
import { PathBreadcrumb } from '@/components/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewToggle } from '@/components/ui/ViewToggle';
import {
  ActionsDropdown,
  type DropdownAction,
} from '@/components/ui/dropdowns/ActionsDropdown';
import { useViewMode } from '@/hooks/useViewMode';
import { DSSection, DSCard } from './_components';

const DEMO_ROWS = [
  { id: '21187', client: 'NARI INTERNATIONAL LTD', value: 'NARI', status: 'NORTHAMPTON' },
  { id: '17730', client: '1 GIGA COMPUTERS BRASIL LTDA - EPP', value: '1 GIGA', status: 'SAO PAULO / SP' },
  { id: '19002', client: 'NOVA SMAR S/A', value: 'SMAR', status: 'SERTAOZINHO / SP' },
  { id: '13928', client: 'ACME INDUSTRIAL LTDA', value: 'ACME', status: 'CAMPINAS / SP' },
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
    <div className="space-y-6">
      <CollectionHeader
        icon={<Building2 size={20} />}
        title="Clientes"
        description="Cadastro e consulta de clientes."
        action={
          <Button type="button">
            <Plus size={16} className="mr-1.5" /> Novo cliente
          </Button>
        }
      />
      <CollectionToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nome, documento, cidade ou UF..."
        searchAriaLabel="Buscar clientes"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {rows.length === 0 ? (
        <EmptyState title="Nenhum cliente encontrado" />
      ) : (
        <>
          {viewMode === 'tabela' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" aria-label="Ações" />
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Reduzido</TableHead>
                  <TableHead>Cidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="w-10 px-2 py-2">
                      <PatternRowActions />
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.client}</TableCell>
                    <TableCell>{r.value}</TableCell>
                    <TableCell className="text-muted-foreground">{r.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}

          {viewMode === 'lista' ? (
            <div className="space-y-2">
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
                  <p className="shrink-0 text-sm text-muted-foreground">{r.value}</p>
                  <p className="hidden shrink-0 text-sm text-muted-foreground sm:block">{r.status}</p>
                </div>
              ))}
            </div>
          ) : null}

          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  </div>
                  <p className="text-sm text-muted-foreground">{r.value} · {r.status}</p>
                  <div className="mt-4 border-t border-border/40 pt-3">
                    <PatternRowActions variant="buttons" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
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
        description="Três layouts de label: stacked (top-aligned, padrão de cadastro), horizontal (FormRow) e floating label."
      >
        <div className="space-y-6">
          <DSCard>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Stacked
            </p>
            <p className="mb-4 mt-1 text-xs text-muted-foreground">
              Top-aligned. Padrão do SmarNet em cadastros. Use <code className="font-mono">FormInput</code> /{' '}
              <code className="font-mono">FormSelect</code> com a prop <code className="font-mono">label</code>.
            </p>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Dados do cliente
            </p>
            <FormGrid cols={2}>
              <FormInput label="Razão social" placeholder="Nova Smar S/A" />
              <FormInput label="CNPJ" placeholder="00.000.000/0000-00" />
              <FormInput label="Cidade" placeholder="Sertãozinho" />
              <FormSelect
                label="UF"
                placeholder="SP"
                options={[
                  { value: 'sp', label: 'SP' },
                  { value: 'rj', label: 'RJ' },
                ]}
              />
            </FormGrid>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </DSCard>

          <DSCard>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Horizontal
            </p>
            <p className="mb-4 mt-1 text-xs text-muted-foreground">
              Label à frente do campo. Formulários compactos. Use <code className="font-mono">FormRow</code>.
            </p>
            <div className="max-w-2xl space-y-3">
              <FormRow label="Razão social">
                <FormInput placeholder="Nova Smar S/A" />
              </FormRow>
              <FormRow label="CNPJ">
                <FormInput placeholder="00.000.000/0000-00" />
              </FormRow>
              <FormRow label="Cidade">
                <FormInput placeholder="Sertãozinho" />
              </FormRow>
              <FormRow label="UF">
                <FormSelect
                  placeholder="SP"
                  options={[
                    { value: 'sp', label: 'SP' },
                    { value: 'rj', label: 'RJ' },
                  ]}
                />
              </FormRow>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </DSCard>

          <DSCard>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Floating label
            </p>
            <p className="mb-4 mt-1 text-xs text-muted-foreground">
              Label dentro do input; sobe ao focar ou preencher. Use{' '}
              <code className="font-mono">FloatingLabelInput</code> /{' '}
              <code className="font-mono">FloatingLabelSelect</code> em telas compactas (ex.: autenticação).
            </p>
            <FormGrid cols={2}>
              <FloatingLabelInput label="Razão social" />
              <FloatingLabelInput label="CNPJ" />
              <FloatingLabelInput label="Cidade" />
              <FloatingLabelSelect
                label="UF"
                options={[
                  { value: 'sp', label: 'SP' },
                  { value: 'rj', label: 'RJ' },
                ]}
              />
            </FormGrid>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </DSCard>
        </div>
      </DSSection>

      <DSSection
        title="Ficha de cadastro (abas pasta)"
        description="Detalhe de mestre: cabeçalho bg-card, Tabs folder, inativas mais escuras. fill (opt-in) estica o painel no main só ≥ lg; abaixo de lg a faixa é swipe + sticky e o main rola. Visualizar trava todas as abas. Demo: /design-system/components/tabs. Referência: Clientes."
      >
        <p className="mb-3 text-sm text-muted-foreground">
          Referência viva:{' '}
          <Link className="underline" to="/app/commercial/customers">
            /app/commercial/customers
          </Link>
          {' · '}
          <Link className="underline" to="/design-system/components/tabs">
            Tabs
          </Link>
        </p>
        <DSCard className="bg-surface-container-low p-4">
          <div className="flex h-64 min-h-0 flex-col gap-3">
            <div className="shrink-0 rounded-xl bg-card px-4 py-3 text-sm font-medium">
              Cabeçalho da ficha (código + nome + status)
            </div>
            <Tabs variant="folder" fill defaultValue="geral" className="min-h-0 flex-1">
              <TabsList>
                <TabsTrigger value="geral">Dados Cadastrais</TabsTrigger>
                <TabsTrigger value="finan">Dados Financeiros</TabsTrigger>
                <TabsTrigger value="obs">Observação</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="p-4 text-sm text-muted-foreground">
                Painel fill: ocupa o resto da altura. Em visualizar os campos ficam readOnly.
              </TabsContent>
              <TabsContent value="finan" className="p-4 text-sm text-muted-foreground">
                Mesmo cartão da aba ativa (bg-card).
              </TabsContent>
              <TabsContent value="obs" className="p-4 text-sm text-muted-foreground">
                Log HTML sanitizado; descrição longa do status só no title do chip.
              </TabsContent>
            </Tabs>
          </div>
        </DSCard>
      </DSSection>

      {/* TABLE */}
      <DSSection
        title="Data Table"
        description="Padrão canônico da listagem (página inteira): o mesmo de Cadastros → Clientes. CollectionHeader (Novo à direita) + CollectionToolbar (busca + ViewToggle; filtro opcional) + Table do DS. Sem card de página. Preferência de visão em localStorage."
      >
        <p className="mb-3 text-sm text-muted-foreground">
          Referência viva:{" "}
          <Link className="underline" to="/app/commercial/customers">
            /app/commercial/customers
          </Link>
          {" · "}
          <Link className="underline" to="/design-system/components/collection">
            Collection
          </Link>
        </p>
        <DataTablePatternPreview />
      </DSSection>

      {/* EMPTY STATE */}
      <DSSection title="Empty State">
        <DSCard className="flex flex-col items-center text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-muted-foreground flex items-center justify-center mb-4">
            <Inbox size={28} />
          </div>
          <h3 className="font-display font-bold text-lg">Nenhum cliente encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Ajuste a busca ou cadastre um novo cliente para começar.
          </p>
          <Button className="mt-5">
            <Plus size={14} /> Novo cliente
          </Button>
        </DSCard>
      </DSSection>
    </>
  );
}
