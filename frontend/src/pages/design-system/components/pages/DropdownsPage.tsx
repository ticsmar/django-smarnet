import { useState } from 'react';
import { Edit, Trash2, Copy, Download, Eye, Settings, User, CreditCard, Bell, HelpCircle } from 'lucide-react';
import {
  ActionsDropdown, FilterDropdown, ColumnsDropdown, ProfileDropdown,
  type DropdownAction, type FilterOption, type ColumnOption, type ProfileMenuItem,
} from '@/components/ui/dropdowns';
import {
  ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote,
  type PropDef,
} from '../_docs';

/* ── Props ── */
const actionsProps: PropDef[] = [
  { name: 'actions', type: 'DropdownAction[]', required: true, description: 'Array de ações com label, icon, onClick, destructive, children (sub-menu).' },
  { name: 'label', type: 'string', description: 'Texto do trigger. Se omitido com iconOnly, usa MoreHorizontal.' },
  { name: 'menuLabel', type: 'string', description: 'Cabeçalho acima das ações.' },
  { name: 'color', type: 'DropdownColor', default: "'neutral'", description: 'Cor semântica do trigger.' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'outline'", description: 'Estilo do trigger.' },
  { name: 'size', type: "'sm' | 'default' | 'lg' | 'icon'", default: "'default'", description: 'Tamanho do botão.' },
  { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Apenas ícone (MoreHorizontal).' },
  { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Alinhamento do dropdown.' },
];

const filterProps: PropDef[] = [
  { name: 'options', type: 'FilterOption[]', required: true, description: 'Opções de filtro (value + label).' },
  { name: 'value', type: 'string', required: true, description: 'Valor selecionado (controlado).' },
  { name: 'onChange', type: '(value: string) => void', required: true, description: 'Callback de mudança.' },
  { name: 'label', type: 'string', default: "'Filtro'", description: 'Rótulo antes do valor.' },
  { name: 'color', type: 'DropdownColor', default: "'neutral'", description: 'Cor do trigger.' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'outline'", description: 'Estilo do trigger.' },
];

const columnsProps: PropDef[] = [
  { name: 'columns', type: 'ColumnOption[]', required: true, description: 'Array de colunas (key, label, required?).' },
  { name: 'visible', type: 'Record<string, boolean>', required: true, description: 'Map de visibilidade controlado.' },
  { name: 'onChange', type: '(key, visible) => void', required: true, description: 'Callback de toggle.' },
  { name: 'label', type: 'string', default: "'Colunas'", description: 'Texto do trigger.' },
];

const profileProps: PropDef[] = [
  { name: 'name', type: 'string', required: true, description: 'Nome do usuário.' },
  { name: 'email', type: 'string', description: 'Email exibido no header do menu.' },
  { name: 'avatarUrl', type: 'string', description: 'URL da imagem. Se ausente, mostra iniciais.' },
  { name: 'items', type: 'ProfileMenuItem[]', required: true, description: 'Itens do menu.' },
  { name: 'onLogout', type: '() => void', description: 'Se presente, renderiza botão "Sair" por último.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Esconde nome, mostra só avatar.' },
];

const sampleActions: DropdownAction[] = [
  { key: 'view', label: 'Visualizar', icon: Eye },
  { key: 'edit', label: 'Editar', icon: Edit },
  { key: 'copy', label: 'Duplicar', icon: Copy },
  { key: 'export', label: 'Exportar', icon: Download, divider: true },
  { key: 'delete', label: 'Excluir', icon: Trash2, destructive: true, divider: true },
];

const statusOptions: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'pending', label: 'Pendente' },
];

const sampleColumns: ColumnOption[] = [
  { key: 'name', label: 'Nome', required: true },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
  { key: 'role', label: 'Perfil' },
  { key: 'created', label: 'Criado em' },
];

const profileItems: ProfileMenuItem[] = [
  { key: 'profile', label: 'Meu Perfil', icon: User },
  { key: 'billing', label: 'Faturamento', icon: CreditCard },
  { key: 'notifications', label: 'Notificações', icon: Bell },
  { key: 'help', label: 'Ajuda', icon: HelpCircle, divider: true },
];

export default function DropdownsPage() {
  const [status, setStatus] = useState('all');
  const [colVis, setColVis] = useState<Record<string, boolean>>({
    name: true, email: true, status: true, role: false, created: false,
  });

  return (
    <ComponentDoc
      summary="Dropdowns de alto nível para ações, filtros, colunas e perfil. Construídos sobre o primitivo DropdownMenu do shadcn."
      importPath="import { ActionsDropdown, FilterDropdown, ColumnsDropdown, ProfileDropdown } from '@/components/ui/dropdowns'"
    >
      {/* ── ActionsDropdown ── */}
      <DocSection title="ActionsDropdown" description="Menu de ações com sub-menus, divisores e itens destrutivos.">
        <VariantSection
          title="Padrão com label"
          preview={
            <div className="flex gap-3 flex-wrap">
              <ActionsDropdown label="Ações" actions={sampleActions} menuLabel="Opções do registro" />
              <ActionsDropdown label="Ações" actions={sampleActions} color="primary" variant="solid" />
              <ActionsDropdown actions={sampleActions} iconOnly />
              <ActionsDropdown actions={sampleActions} iconOnly size="sm" />
            </div>
          }
          code={`<ActionsDropdown
  label="Ações"
  actions={[
    { key: 'view', label: 'Visualizar', icon: Eye },
    { key: 'edit', label: 'Editar', icon: Edit },
    { key: 'delete', label: 'Excluir', icon: Trash2, destructive: true, divider: true },
  ]}
  menuLabel="Opções do registro"
/>

{/* Apenas ícone */}
<ActionsDropdown actions={actions} iconOnly />`}
        />
        <PropsTable rows={actionsProps} />
      </DocSection>

      {/* ── FilterDropdown ── */}
      <DocSection title="FilterDropdown" description="Dropdown de seleção única com radios, ideal para filtros de tabela.">
        <VariantSection
          title="Filtro de status"
          preview={
            <div className="flex gap-3 flex-wrap">
              <FilterDropdown label="Status" options={statusOptions} value={status} onChange={setStatus} />
              <FilterDropdown label="Status" options={statusOptions} value={status} onChange={setStatus} color="primary" variant="solid" />
            </div>
          }
          code={`const [status, setStatus] = useState('all');

<FilterDropdown
  label="Status"
  options={[
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ]}
  value={status}
  onChange={setStatus}
/>`}
        />
        <PropsTable rows={filterProps} />
      </DocSection>

      {/* ── ColumnsDropdown ── */}
      <DocSection title="ColumnsDropdown" description="Toggle de visibilidade de colunas, típico em DataTables.">
        <VariantSection
          title="Seleção de colunas"
          preview={
            <ColumnsDropdown
              columns={sampleColumns}
              visible={colVis}
              onChange={(key, v) => setColVis((prev) => ({ ...prev, [key]: v }))}
            />
          }
          code={`const [colVis, setColVis] = useState({ name: true, email: true, status: true });

<ColumnsDropdown
  columns={[
    { key: 'name', label: 'Nome', required: true },
    { key: 'email', label: 'E-mail' },
    { key: 'status', label: 'Status' },
  ]}
  visible={colVis}
  onChange={(key, v) => setColVis(prev => ({ ...prev, [key]: v }))}
/>`}
        />
        <PropsTable rows={columnsProps} />
      </DocSection>

      {/* ── ProfileDropdown ── */}
      <DocSection title="ProfileDropdown" description="Menu de perfil com avatar, nome e ações de conta.">
        <VariantSection
          title="Com avatar e compacto"
          preview={
            <div className="flex gap-6 items-center flex-wrap">
              <ProfileDropdown
                name="Carlos Silva"
                email="carlos@smarnet.com"
                items={profileItems}
                onLogout={() => {}}
              />
              <ProfileDropdown
                name="Ana Costa"
                email="ana@smarnet.com"
                items={profileItems}
                onLogout={() => {}}
                compact
              />
            </div>
          }
          code={`<ProfileDropdown
  name="Carlos Silva"
  email="carlos@smarnet.com"
  items={[
    { key: 'profile', label: 'Meu Perfil', icon: User },
    { key: 'billing', label: 'Faturamento', icon: CreditCard },
  ]}
  onLogout={() => signOut()}
/>

{/* Compacto — só avatar */}
<ProfileDropdown name="Ana" items={items} compact />`}
        />
        <PropsTable rows={profileProps} />
      </DocSection>

      <UsageNote type="tip">
        Para o primitivo <code>DropdownMenu</code> do shadcn, veja a página <strong>Dropdown Menu</strong> na seção Ações.
        Os componentes desta página encapsulam padrões recorrentes com API simplificada.
      </UsageNote>
    </ComponentDoc>
  );
}
