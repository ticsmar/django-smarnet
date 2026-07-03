import { useState } from 'react';
import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import {
  ActionsDropdown,
  ColumnsDropdown,
  FilterDropdown,
  ProfileDropdown,
  type DropdownColor,
} from '@/components/ui/dropdowns';
import {
  Eye, Edit, Copy, Trash2, Download, FileText, Printer, Share2,
  User, Settings,
} from 'lucide-react';

const ALL_COLORS: DropdownColor[] = [
  'primary', 'secondary', 'tertiary', 'accent',
  'success', 'warning', 'alert', 'info', 'destructive', 'neutral',
];

export default function DropdownsShowcase() {
  const [status, setStatus] = useState<'active' | 'inactive' | 'pending'>('active');
  const [columns, setColumns] = useState<Record<string, boolean>>({
    id: true, name: true, status: true, createdAt: false, updatedAt: false,
  });

  return (
    <UIShowcaseLayout
      title="Dropdowns"
      description="Componentes prontos em src/components/ui/dropdowns/ — ActionsDropdown, ColumnsDropdown, FilterDropdown e ProfileDropdown. Trigger aceita variant (solid/outline/ghost) + color (9 do design system + neutral)."
    >
      {/* ============ ACTIONS DROPDOWN ============ */}
      <ShowcaseSection title="ActionsDropdown — básico (com sub-menu, divisor e item destrutivo)">
        <div className="flex flex-wrap gap-3">
          <ActionsDropdown
            label="Ações"
            menuLabel="Ações do registro"
            actions={[
              { key: 'view', label: 'Visualizar', icon: Eye },
              { key: 'edit', label: 'Editar', icon: Edit },
              { key: 'duplicate', label: 'Duplicar', icon: Copy },
              {
                key: 'export', label: 'Exportar', icon: Download,
                children: [
                  { key: 'xlsx', label: 'Excel (.xlsx)' },
                  { key: 'csv', label: 'CSV (.csv)' },
                  { key: 'pdf', label: 'PDF (.pdf)' },
                ],
              },
              { key: 'delete', label: 'Excluir', icon: Trash2, destructive: true, divider: true },
            ]}
          />

          <ActionsDropdown
            iconOnly
            ariaLabel="Mais opções"
            variant="ghost"
            actions={[
              { key: 'csv', label: 'Exportar CSV', icon: Download },
              { key: 'pdf', label: 'Exportar PDF', icon: FileText },
              { key: 'print', label: 'Imprimir', icon: Printer },
              { key: 'share', label: 'Compartilhar', icon: Share2 },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ActionsDropdown — todas as cores (variant solid)">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <ActionsDropdown
              key={c}
              label={c}
              color={c}
              variant="solid"
              actions={[
                { key: 'view', label: 'Visualizar', icon: Eye },
                { key: 'edit', label: 'Editar', icon: Edit },
                { key: 'delete', label: 'Excluir', icon: Trash2, destructive: true },
              ]}
            />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ActionsDropdown — variant outline">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <ActionsDropdown
              key={c}
              label={c}
              color={c}
              variant="outline"
              actions={[
                { key: 'view', label: 'Visualizar', icon: Eye },
                { key: 'edit', label: 'Editar', icon: Edit },
              ]}
            />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ActionsDropdown — variant ghost + tamanhos">
        <div className="flex flex-wrap items-center gap-3">
          <ActionsDropdown label="Pequeno" variant="ghost" size="sm" actions={[{ key: 'a', label: 'Item' }]} />
          <ActionsDropdown label="Médio" variant="ghost" actions={[{ key: 'a', label: 'Item' }]} />
          <ActionsDropdown label="Grande" variant="ghost" size="lg" actions={[{ key: 'a', label: 'Item' }]} />
        </div>
      </ShowcaseSection>

      {/* ============ COLUMNS DROPDOWN ============ */}
      <ShowcaseSection title="ColumnsDropdown — alternar visibilidade de colunas (típico em DataTable)">
        <div className="flex flex-wrap gap-3">
          <ColumnsDropdown
            visible={columns}
            onChange={(key, v) => setColumns((prev) => ({ ...prev, [key]: v }))}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', required: true },
              { key: 'status', label: 'Status' },
              { key: 'createdAt', label: 'Criado em' },
              { key: 'updatedAt', label: 'Atualizado em' },
            ]}
          />
          <ColumnsDropdown
            color="info"
            variant="solid"
            label="Colunas (info)"
            visible={columns}
            onChange={(key, v) => setColumns((prev) => ({ ...prev, [key]: v }))}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', required: true },
              { key: 'status', label: 'Status' },
            ]}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Estado atual: {Object.entries(columns).filter(([, v]) => v).map(([k]) => k).join(', ') || 'nenhuma'}
        </p>
      </ShowcaseSection>

      {/* ============ FILTER DROPDOWN ============ */}
      <ShowcaseSection title="FilterDropdown — seleção única (radios)">
        <div className="flex flex-wrap gap-3">
          <FilterDropdown<'active' | 'inactive' | 'pending'>
            label="Status"
            menuLabel="Filtrar por status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
              { value: 'pending', label: 'Pendente' },
            ]}
          />
          <FilterDropdown<'active' | 'inactive' | 'pending'>
            label="Status"
            color="success"
            variant="solid"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
              { value: 'pending', label: 'Pendente' },
            ]}
          />
          <FilterDropdown<'active' | 'inactive' | 'pending'>
            label="Status"
            color="warning"
            variant="outline"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
              { value: 'pending', label: 'Pendente' },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* ============ PROFILE DROPDOWN ============ */}
      <ShowcaseSection title="ProfileDropdown — menu de perfil/conta">
        <div className="flex flex-wrap items-center gap-6">
          <ProfileDropdown
            name="João Silva"
            email="joao@empresa.com.br"
            items={[
              { key: 'profile', label: 'Meu Perfil', icon: User },
              { key: 'settings', label: 'Configurações', icon: Settings },
            ]}
            onLogout={() => console.log('logout')}
          />

          <ProfileDropdown
            compact
            name="Maria Souza"
            email="maria@empresa.com.br"
            items={[
              { key: 'profile', label: 'Meu Perfil', icon: User },
              { key: 'settings', label: 'Configurações', icon: Settings },
            ]}
            onLogout={() => console.log('logout')}
          />
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
