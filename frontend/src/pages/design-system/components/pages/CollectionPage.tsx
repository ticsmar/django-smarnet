import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionHeader } from "@/components/ui/collection-header";
import { CollectionToolbar } from "@/components/ui/collection-toolbar";
import { ActionsDropdown } from "@/components/ui/dropdowns/ActionsDropdown";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/forms";
import { PaginationInfo } from "@/components/ui/pagination-blocks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DataViewMode } from "@/hooks/useViewMode";
import { ClienteRiscoStatusBadge } from "@/modules/commercial/components/ClienteRiscoStatusBadge";
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
} from "../_docs";

const CLIENTES_GRID = [
  {
    codigo: 21187,
    nome: "NARI INTERNATIONAL LTD",
    reduzido: "NARI",
    cgc: "05425121000107",
    cidade: "NORTHAMPTON",
    letra: "N",
    restricao: 0,
  },
  {
    codigo: 17730,
    nome: "1 GIGA COMPUTERS BRASIL LTDA - EPP",
    reduzido: "1 GIGA",
    cgc: "10847216000190",
    cidade: "SAO PAULO / SP",
    letra: "A",
    restricao: 0,
  },
  {
    codigo: 19002,
    nome: "NOVA SMAR S/A",
    reduzido: "SMAR",
    cgc: "56997468000100",
    cidade: "SERTAOZINHO / SP",
    letra: "B",
    restricao: 0,
  },
];

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<DataViewMode>("tabela");
  const [page, setPage] = useState(1);

  return (
    <ComponentDoc
      summary="Padrão de listagem ERP (página inteira). Referência viva: Cadastros → Clientes (`/app/commercial/customers`). CollectionHeader (Novo à direita) + CollectionToolbar (busca + ViewToggle; filtro opcional) + Table do DS. Sem card de página (`rounded-2xl border bg-card`). Sem DataTable genérico."
      importPath="import { CollectionHeader } from '@/components/ui/collection-header'; import { CollectionToolbar } from '@/components/ui/collection-toolbar'; import { Table } from '@/components/ui/table'"
    >
      <DocSection
        title="Padrão do sistema — Clientes"
        description="Use esta casca em toda listagem: CollectionHeader (Novo à direita), CollectionToolbar (busca + filtros opcionais + ViewToggle), Table (já traz borda e fundo), EmptyState e PaginationInfo. Clientes não tem filtro. Tela real: /app/commercial/customers."
      >
        <UsageNote type="info">
          Referência de implementação:{" "}
          <Link className="underline" to="/app/commercial/customers">
            /app/commercial/customers
          </Link>
          . Código:{" "}
          <code className="font-mono text-[11px]">
            frontend/src/modules/commercial/pages/ClientesPage.tsx
          </code>
          . A unidade do padrão é a página inteira (`CollectionHeader` com Novo à direita + toolbar + tabela), não só o grid. Clientes não tem filtro na toolbar.
        </UsageNote>
        <UsageNote type="warning">
          Não envolva a listagem em{" "}
          <code className="font-mono text-[11px]">rounded-2xl border … bg-card p-6 shadow-sm</code>
          . O fundo é o do app; só o <code className="font-mono text-[11px]">Table</code> (e os cards dos modos lista/cards) têm borda.
        </UsageNote>
        <VariantSection
          title="Página de listagem — Clientes"
          preview={
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 px-2" />
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Reduzido</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Cidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CLIENTES_GRID.map((item) => (
                    <TableRow key={item.codigo}>
                      <TableCell className="w-10 px-2 py-2">
                        <ActionsDropdown
                          iconOnly
                          ariaLabel="Ações"
                          actions={[
                            { key: "view", label: "Visualizar", onClick: () => undefined },
                            { key: "edit", label: "Editar", onClick: () => undefined },
                          ]}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        {item.codigo}
                      </TableCell>
                      <TableCell className="font-medium">
                        <span className="inline-flex max-w-full items-center gap-2">
                          <ClienteRiscoStatusBadge
                            letra={item.letra}
                            restricao={item.restricao}
                          />
                          <span className="truncate">{item.nome}</span>
                        </span>
                      </TableCell>
                      <TableCell>{item.reduzido}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {item.cgc}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.cidade}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationInfo
                page={page}
                pageSize={20}
                total={48}
                onPageChange={setPage}
              />
            </div>
          }
          code={`<div className="space-y-6">
  <CollectionHeader icon={...} title="Clientes" description="..." action={<Button>Novo cliente</Button>} />
  <CollectionToolbar searchValue={search} onSearchChange={setSearch} viewMode={viewMode} onViewModeChange={setViewMode} />
  <Table>...</Table>
  <PaginationInfo page={page} pageSize={20} total={total} onPageChange={setPage} />
</div>`}
        />
      </DocSection>

      <DocSection title="SearchField" description="Input de busca com ícone. Use na toolbar de cadastros.">
        <VariantSection
          title="Padrão"
          preview={
            <SearchField
              aria-label="Buscar"
              placeholder="Buscar por nome ou código…"
              value={search}
              onValueChange={setSearch}
            />
          }
          code={`<SearchField
  aria-label="Buscar"
  placeholder="Buscar por nome ou código…"
  value={search}
  onValueChange={setSearch}
/>`}
        />
      </DocSection>

      <DocSection title="EmptyState">
        <VariantSection
          title="Vazio"
          preview={<EmptyState title="Nenhum cliente encontrado" />}
          code={`<EmptyState title="Nenhum cliente encontrado" />`}
        />
        <VariantSection
          title="Loading"
          preview={<EmptyState variant="loading" title="Carregando…" />}
          code={`<EmptyState variant="loading" title="Carregando…" />`}
        />
      </DocSection>

      <DocSection title="CollectionHeader">
        <VariantSection
          title="Título + Novo à direita"
          preview={
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
          }
          code={`<CollectionHeader
  icon={<Building2 size={20} />}
  title="Clientes"
  description="Cadastro e consulta de clientes."
  action={<Button>Novo cliente</Button>}
/>`}
        />
      </DocSection>

      <DocSection title="CollectionToolbar">
        <VariantSection
          title="Busca + ViewToggle (sem filtro, como Clientes)"
          preview={
            <CollectionToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Buscar…"
              searchAriaLabel="Buscar registros"
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          }
          code={`<CollectionToolbar
  searchValue={search}
  onSearchChange={setSearch}
  searchPlaceholder="Buscar…"
  searchAriaLabel="Buscar registros"
  viewMode={viewMode}
  onViewModeChange={setViewMode}
/>`}
        />
        <PropsTable
          rows={[
            { name: "searchValue", type: "string", required: true, description: "Texto da busca." },
            { name: "onSearchChange", type: "(value: string) => void", required: true, description: "Callback da busca." },
            { name: "searchAriaLabel", type: "string", required: true, description: "Acessibilidade do campo." },
            { name: "filters", type: "ReactNode", description: "Dropdown/Select de filtro. Clientes não usa." },
            { name: "actions", type: "ReactNode", description: "Ações extras da toolbar (listagens filhas). Novo da página vai no CollectionHeader." },
            { name: "viewMode / onViewModeChange", type: "DataViewMode", description: "Opcional; exibe ViewToggle." },
          ]}
        />
      </DocSection>

      <DocSection title="PaginationInfo" description="Rodapé com intervalo e anterior/próxima. Labels i18n via props.">
        <VariantSection
          title="Padrão"
          preview={
            <PaginationInfo
              page={page}
              pageSize={20}
              total={48}
              onPageChange={setPage}
            />
          }
          code={`<PaginationInfo
  page={page}
  pageSize={20}
  total={48}
  onPageChange={setPage}
  recordLabel="registros"
  showingLabel="Exibindo"
  ofLabel="de"
  prevLabel="Anterior"
  nextLabel="Próxima"
/>`}
        />
      </DocSection>
    </ComponentDoc>
  );
}
