import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Video,
  Download,
  MoreVertical,
  Upload,
  Plus,
  HardDrive,
  Share2,
  Trash2,
  ChevronRight,
  ChevronDown,
  Scissors,
  Copy,
  Clipboard,
  Pencil,
  ArrowUpDown,
  LayoutGrid,
  Monitor,
  List,
  Rows3,
  LayoutList,
  Grid2x2,
  Grid3x3,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ComponentDoc, DocSection, VariantSection, UsageNote, PropsTable } from '../_docs';
import { FormFileUpload, FileListItem, FormAvatarUpload } from '@/components/ui/forms';
import { FileManagerToolbar } from '@/components/ui/file-manager/FileManagerToolbar';
import { FileManagerTree } from '@/components/ui/file-manager/FileManagerTree';
import type { ArquivoNode } from '@/modules/files/types';

/* ============================================================
 * File Manager — Design System
 * Componentes para gerenciamento de arquivos: dropzone de upload,
 * lista com progresso, avatar/imagem e tela completa de gestão
 * (pastas, estatísticas e arquivos recentes).
 * Todos os blocos usam tokens semânticos (bg-surface-container,
 * border-border, status-*) → suportam light/dark automaticamente.
 * ============================================================ */

/* --------------------- Sub-blocos de preview --------------------- */

function StatTile({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: LucideIcon }) {
  return (
    <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary grid place-items-center">
          <Icon size={14} />
        </span>
      </div>
      <p className="font-display text-2xl font-bold text-foreground mt-2">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function DropzonePreview() {
  return (
    <FormFileUpload
      title="Arraste arquivos aqui ou clique para selecionar"
      helperText="PDF, JPG, PNG, XLSX até 10MB"
      buttonLabel="Selecionar arquivos"
      multiple
    />
  );
}

function CompactUploadPreview() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormFileUpload
        variant="compact"
        label="Documento"
        buttonLabel="Selecionar"
        accept=".pdf,.doc,.docx"
        helperText="Nenhum arquivo selecionado"
      />
      <FormFileUpload
        variant="compact"
        label="Imagem"
        buttonLabel="Selecionar"
        accept="image/*"
        helperText="JPG ou PNG, até 5MB"
      />
    </div>
  );
}

function FileProgressList() {
  const [files, setFiles] = useState([
    { name: 'proposta-comercial.pdf', size: '2.4 MB', type: 'pdf', progress: 100 },
    { name: 'foto-equipamento.jpg', size: '1.8 MB', type: 'image', progress: 100 },
    { name: 'planilha-custos.xlsx', size: '540 KB', type: 'file', progress: 65 },
  ]);
  return (
    <div className="space-y-3">
      {files.map((f, i) => (
        <FileListItem
          key={i}
          name={f.name}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onRemove={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        />
      ))}
    </div>
  );
}

function AvatarUploadPreview() {
  return (
    <FormAvatarUpload
      label="Foto do produto"
      description="JPG ou PNG, máximo 5MB"
      onPick={() => {}}
      onRemove={() => {}}
    />
  );
}

/* --- Tela completa: Stats + Pastas + Arquivos recentes ---------- */

const folders = [
  { name: 'Contratos', files: 24, size: '125 MB' },
  { name: 'Notas Fiscais 2025', files: 142, size: '380 MB' },
  { name: 'Relatórios', files: 56, size: '210 MB' },
  { name: 'Marketing', files: 89, size: '1.2 GB' },
];

const recentFiles = [
  { name: 'Contrato_Petrobras_2025.pdf', size: '2.4 MB', date: '15/04/2025', icon: FileText, color: 'text-destructive' },
  { name: 'Relatorio_Faturamento_Marco.xlsx', size: '845 KB', date: '14/04/2025', icon: FileSpreadsheet, color: 'text-status-success' },
  { name: 'Apresentacao_Comercial.pptx', size: '12 MB', date: '13/04/2025', icon: FileText, color: 'text-warning' },
  { name: 'Logo_Cliente_Vector.png', size: '320 KB', date: '12/04/2025', icon: ImageIcon, color: 'text-primary' },
  { name: 'Treinamento_Operadores.mp4', size: '156 MB', date: '10/04/2025', icon: Video, color: 'text-secondary' },
];

function FullManagerPreview() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Armazenamento" value="24.5 GB" sub="de 100 GB" icon={HardDrive} />
        <StatTile label="Arquivos totais" value="1.247" sub="em 38 pastas" icon={FileText} />
        <StatTile label="Compartilhados" value="128" sub="com a equipe" icon={Share2} />
        <StatTile label="Lixeira" value="12" sub="arquivos" icon={Trash2} />
      </div>

      <div className="bg-surface-container rounded-2xl border border-border/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-foreground">Pastas</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-surface-container-low transition-colors">
              <Plus size={14} /> Nova pasta
            </button>
            <button className="flex items-center gap-2 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
              <Upload size={14} /> Enviar arquivo
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {folders.map((f) => (
            <button
              key={f.name}
              className="text-left bg-surface-container-low rounded-xl p-4 border border-border/30 hover:border-primary/40 hover:bg-surface-container-low/70 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <Folder className="text-primary" size={26} fill="currentColor" />
                <MoreVertical size={14} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-sm truncate">{f.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {f.files} arquivos · {f.size}
              </p>
            </button>
          ))}
        </div>

        <p className="font-semibold text-foreground mb-2">Arquivos recentes</p>
        <div className="space-y-1">
          {recentFiles.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors"
            >
              <f.icon size={20} className={f.color} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{f.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {f.size} · {f.date}
                </p>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Download size={14} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <MoreVertical size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------- Snippets de código --------------------- */

const dropzoneCode = `import { FormFileUpload } from '@/components/ui/forms';

<FormFileUpload
  title="Arraste arquivos aqui ou clique para selecionar"
  helperText="PDF, JPG, PNG, XLSX até 10MB"
  buttonLabel="Selecionar arquivos"
  multiple
  onFilesSelected={(files) => console.log(files)}
/>`;

const compactCode = `<FormFileUpload
  variant="compact"
  label="Documento"
  buttonLabel="Selecionar"
  accept=".pdf,.doc,.docx"
  helperText="Nenhum arquivo selecionado"
/>`;

const listCode = `import { FileListItem } from '@/components/ui/forms';

<FileListItem
  name="planilha-custos.xlsx"
  size="540 KB"
  type="file"
  progress={65}
  onRemove={() => removeFile(id)}
/>`;

const avatarCode = `import { FormAvatarUpload } from '@/components/ui/forms';

<FormAvatarUpload
  label="Foto do produto"
  description="JPG ou PNG, máximo 5MB"
  preview={url}
  onPick={(files) => upload(files)}
  onRemove={() => clear()}
/>`;

const managerCode = `// Página completa: estatísticas + pastas + recentes.
// Use bg-surface-container nos cartões e bg-surface-container-low
// nos itens internos para criar a hierarquia de elevação.

<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  <StatTile label="Armazenamento" value="24.5 GB" sub="de 100 GB" icon={HardDrive} />
  {/* ... */}
</div>

<div className="bg-surface-container rounded-2xl border border-border/40 p-5">
  <Header actions={[NovaPasta, EnviarArquivo]} />
  <FoldersGrid items={folders} />
  <RecentFilesList items={recentFiles} />
</div>`;

/* ---------- Explorer variant (estilo Windows / IDE) ---------- */

type ExplorerTreeItem = {
  label: string;
  icon: LucideIcon;
  depth: number;
  expanded?: boolean;
  active?: boolean;
};

const treeItems: ExplorerTreeItem[] = [
  { label: 'S24+ de Juliano', icon: Monitor, expanded: false, depth: 0 },
  { label: 'Este Computador', icon: Monitor, expanded: true, depth: 0 },
  { label: 'Disco Local (C:)', icon: HardDrive, expanded: true, depth: 1, active: true },
  { label: '$GetCurrent', icon: Folder, depth: 2 },
  { label: 'AMD', icon: Folder, depth: 2 },
  { label: 'Arquivos de Programas', icon: Folder, depth: 2 },
  { label: 'Arquivos de Programas (x86)', icon: Folder, depth: 2 },
  { label: 'Autodesk', icon: Folder, depth: 2 },
  { label: 'inetpub', icon: Folder, depth: 2 },
  { label: 'laragon', icon: Folder, depth: 2 },
  { label: 'Microsoft', icon: Folder, depth: 2 },
  { label: 'OneDriveTemp', icon: Folder, depth: 2 },
  { label: 'PerfLogs', icon: Folder, depth: 2 },
  { label: 'ProgramData', icon: Folder, depth: 2 },
  { label: 'Recovery', icon: Folder, depth: 2 },
  { label: 'Riot Games', icon: Folder, depth: 2 },
  { label: 'tmp', icon: Folder, depth: 2 },
  { label: 'Ubuntu', icon: Folder, depth: 2 },
  { label: 'Usuários', icon: Folder, depth: 2 },
];

const explorerRows = [
  { name: '$GetCurrent', date: '22/08/2023 01:10', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'AMD', date: '24/08/2023 23:16', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Arquivos de Programas', date: '09/05/2026 01:37', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Arquivos de Programas (x86)', date: '25/04/2024 04:12', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Autodesk', date: '21/10/2024 15:01', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'inetpub', date: '10/04/2025 22:32', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'laragon', date: '14/06/2024 00:37', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Microsoft', date: '24/09/2025 17:11', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'OneDriveTemp', date: '21/08/2023 22:12', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'PerfLogs', date: '01/04/2024 04:26', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'ProgramData', date: '25/04/2026 04:16', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Recovery', date: '12/11/2024 12:01', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Riot Games', date: '22/08/2023 00:04', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'tmp', date: '26/01/2026 22:04', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Ubuntu', date: '12/02/2026 22:39', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Usuários', date: '21/10/2024 04:42', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'Windows', date: '09/05/2026 01:47', type: 'Pasta de arquivos', size: '', isFolder: true },
  { name: 'DumpStack.log', date: '10/04/2025 22:33', type: 'Documento de Texto', size: '12 KB', isFolder: false },
];

function ToolbarBtn({ icon: Icon, label }: { icon: LucideIcon; label?: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 h-8 px-2 rounded-md text-xs font-medium text-foreground/80 hover:bg-surface-container-low transition-colors"
    >
      <Icon size={14} />
      {label && <span>{label}</span>}
    </button>
  );
}

type ViewMode = 'xl-icons' | 'lg-icons' | 'md-icons' | 'sm-icons' | 'list' | 'details' | 'tiles' | 'content';

const viewModes: { id: ViewMode; label: string; icon: LucideIcon }[] = [
  { id: 'xl-icons', label: 'Ícones extra grandes', icon: Grid2x2 },
  { id: 'lg-icons', label: 'Ícones grandes', icon: Grid2x2 },
  { id: 'md-icons', label: 'Ícones médios', icon: LayoutGrid },
  { id: 'sm-icons', label: 'Ícones pequenos', icon: Grid3x3 },
  { id: 'list', label: 'Lista', icon: List },
  { id: 'details', label: 'Detalhes', icon: Rows3 },
  { id: 'tiles', label: 'Lado a lado', icon: LayoutList },
  { id: 'content', label: 'Conteúdo', icon: LayoutList },
];

function ItemIcon({ row, size }: { row: (typeof explorerRows)[number]; size: number }) {
  return row.isFolder ? (
    <Folder size={size} className="text-warning" fill="currentColor" />
  ) : (
    <FileText size={size} className="text-info" />
  );
}

function ExplorerBody({
  mode,
  selected,
  onSelect,
}: {
  mode: ViewMode;
  selected: string | null;
  onSelect: (n: string) => void;
}) {
  const rowCls = (name: string) =>
    cn(
      'cursor-pointer transition-colors rounded-md',
      selected === name ? 'bg-primary/10 text-foreground' : 'hover:bg-surface-container-low',
    );

  if (mode === 'details') {
    return (
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-surface-container-low/80 backdrop-blur z-10">
          <tr className="text-left border-b border-border/40">
            <th className="px-3 py-2 font-semibold text-foreground/90">
              <span className="inline-flex items-center gap-1">
                Nome <ChevronDown size={12} className="text-primary" />
              </span>
            </th>
            <th className="px-3 py-2 font-semibold text-foreground/90">Data de modificação</th>
            <th className="px-3 py-2 font-semibold text-foreground/90">Tipo</th>
            <th className="px-3 py-2 font-semibold text-foreground/90 text-right pr-6">Tamanho</th>
          </tr>
        </thead>
        <tbody>
          {explorerRows.map((row) => (
            <tr
              key={row.name}
              onClick={() => onSelect(row.name)}
              className={cn(
                'cursor-pointer transition-colors border-b border-border/20',
                selected === row.name
                  ? 'bg-primary/10 text-foreground'
                  : 'hover:bg-surface-container-low',
              )}
            >
              <td className="px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <ItemIcon row={row} size={14} />
                  <span className="truncate">{row.name}</span>
                </div>
              </td>
              <td className="px-3 py-1.5 text-muted-foreground whitespace-nowrap">{row.date}</td>
              <td className="px-3 py-1.5 text-muted-foreground whitespace-nowrap">{row.type}</td>
              <td className="px-3 py-1.5 text-muted-foreground text-right pr-6 font-mono whitespace-nowrap">
                {row.size || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (mode === 'list') {
    return (
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 p-3 text-xs">
        {explorerRows.map((row) => (
          <li
            key={row.name}
            onClick={() => onSelect(row.name)}
            className={cn(rowCls(row.name), 'flex items-center gap-2 px-2 py-1')}
          >
            <ItemIcon row={row} size={14} />
            <span className="truncate">{row.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (mode === 'tiles' || mode === 'content') {
    const isContent = mode === 'content';
    return (
      <ul className={cn('p-3 text-xs', isContent ? 'space-y-1' : 'grid grid-cols-2 lg:grid-cols-3 gap-2')}>
        {explorerRows.map((row) => (
          <li
            key={row.name}
            onClick={() => onSelect(row.name)}
            className={cn(rowCls(row.name), 'flex items-center gap-3 p-2')}
          >
            <ItemIcon row={row} size={isContent ? 18 : 28} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground truncate">{row.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">
                {row.type}
                {row.size && ` · ${row.size}`}
              </p>
              {isContent && (
                <p className="text-[10px] text-muted-foreground">Modificado em {row.date}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  // Icon grids (sm/md/lg/xl)
  const dim =
    mode === 'xl-icons'
      ? { cell: 'w-28', icon: 56, gap: 'gap-4' }
      : mode === 'lg-icons'
        ? { cell: 'w-24', icon: 44, gap: 'gap-3' }
        : mode === 'md-icons'
          ? { cell: 'w-20', icon: 32, gap: 'gap-3' }
          : { cell: 'w-16', icon: 22, gap: 'gap-2' };

  return (
    <div className={cn('flex flex-wrap p-4', dim.gap)}>
      {explorerRows.map((row) => (
        <button
          key={row.name}
          onClick={() => onSelect(row.name)}
          className={cn(
            dim.cell,
            'flex flex-col items-center gap-1.5 p-2 rounded-md text-center transition-colors',
            selected === row.name
              ? 'bg-primary/10 text-foreground'
              : 'hover:bg-surface-container-low',
          )}
        >
          <ItemIcon row={row} size={dim.icon} />
          <span className="text-[11px] leading-tight line-clamp-2 text-foreground/90">
            {row.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function ExplorerPreview() {
  const [selected, setSelected] = useState<string | null>('Arquivos de Programas');
  const [mode, setMode] = useState<ViewMode>('details');
  const currentMode = viewModes.find((m) => m.id === mode)!;

  return (
    <div className="bg-surface-container rounded-2xl border border-border/40 overflow-hidden shadow-ambient">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 h-12 border-b border-border/40 bg-surface-container-low/40">
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
          <Plus size={14} /> Novo
          <ChevronDown size={12} className="opacity-70" />
        </button>
        <div className="w-px h-5 bg-border/60 mx-1" />
        <ToolbarBtn icon={Scissors} />
        <ToolbarBtn icon={Copy} />
        <ToolbarBtn icon={Clipboard} />
        <ToolbarBtn icon={Pencil} />
        <ToolbarBtn icon={Share2} />
        <ToolbarBtn icon={Trash2} />
        <div className="w-px h-5 bg-border/60 mx-1" />
        <ToolbarBtn icon={ArrowUpDown} label="Classificar" />

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1.5 h-8 px-2 rounded-md text-xs font-medium text-foreground/80 hover:bg-surface-container-low transition-colors"
            >
              <currentMode.icon size={14} />
              <span>Visualizar</span>
              <ChevronDown size={12} className="opacity-60" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-1">
            <ul className="text-xs">
              {viewModes.map((m) => {
                const active = m.id === mode;
                return (
                  <li key={m.id}>
                    <button
                      onClick={() => setMode(m.id)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors',
                        active
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'hover:bg-surface-container-low text-foreground/85',
                      )}
                    >
                      <m.icon size={14} />
                      <span className="flex-1 text-left">{m.label}</span>
                      {active && <Check size={12} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>

        <button className="ml-auto h-8 w-8 grid place-items-center rounded-md text-muted-foreground hover:bg-surface-container-low">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="grid grid-cols-[220px_1fr] min-h-[420px]">
        {/* Tree sidebar */}
        <aside className="border-r border-border/40 bg-surface-container-low/30 py-2 overflow-y-auto max-h-[420px] sidebar-scroll">
          <ul className="space-y-0.5 text-xs">
            {treeItems.map((it, i) => {
              const Icon = it.icon;
              const hasChevron = it.depth < 2;
              return (
                <li key={i}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-1 pr-2 py-1 rounded-md transition-colors',
                      it.active
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground/85 hover:bg-surface-container',
                    )}
                    style={{ paddingLeft: 6 + it.depth * 12 }}
                  >
                    <span className="w-3 grid place-items-center text-muted-foreground">
                      {hasChevron ? (
                        it.expanded ? (
                          <ChevronDown size={12} />
                        ) : (
                          <ChevronRight size={12} />
                        )
                      ) : null}
                    </span>
                    <Icon
                      size={14}
                      className={it.depth === 2 ? 'text-warning' : 'text-primary'}
                      fill={it.depth === 2 ? 'currentColor' : 'none'}
                    />
                    <span className="truncate">{it.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content area — varia conforme o modo de visualização */}
        <div className="overflow-auto max-h-[420px]">
          <ExplorerBody mode={mode} selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 h-8 border-t border-border/40 bg-surface-container-low/40 text-[11px] text-muted-foreground">
        <span>
          {explorerRows.length} itens{selected && ' · 1 item selecionado'} ·{' '}
          <span className="text-foreground/70">{currentMode.label}</span>
        </span>
        <span>Disco Local (C:) · 24,5 GB de 100 GB usados</span>
      </div>
    </div>
  );
}

const explorerCode = `// Layout Explorer: toolbar + tree + tabela detalhada.
// grid-cols-[220px_1fr], surface-container-low para sidebar/header
// bg-primary/10 + text-primary para item ativo / linha selecionada.

<div className="bg-surface-container rounded-2xl border border-border/40">
  <Toolbar actions={[Novo, Recortar, Copiar, Colar, Renomear, ...]} />
  <div className="grid grid-cols-[220px_1fr]">
    <TreeSidebar items={treeItems} />
    <DetailTable
      columns={['Nome', 'Data de modificação', 'Tipo', 'Tamanho']}
      rows={rows}
      selected={selected}
      onSelect={setSelected}
    />
  </div>
  <StatusBar items={count} selection={selected} />
</div>`;

/* ----------------------------- Página ----------------------------- */

export default function FileManagerPage() {
  return (
    <ComponentDoc
      summary="Gerenciador de Arquivos do Smarnet (toolbar + árvore do 3.01) e blocos de upload (dropzone, lista, avatar). Tokens semânticos; o produto usa sistema + filtro, não o explorer Windows."
      importPath="import { FileManager } from '@/modules/files'"
    >
      <DocSection
        title="Upload de arquivos"
        description="Padrões para captura de arquivos — dropzone amplo para áreas dedicadas, compacto para formulários e avatar para imagens."
      >
        <VariantSection
          title="Dropzone (Drag & Drop)"
          description="Área ampla com indicação visual e botão fallback. Use em telas de upload dedicadas."
          preview={<DropzonePreview />}
          code={dropzoneCode}
        />

        <VariantSection
          title="Upload compacto"
          description="Versão inline para uso dentro de formulários, ao lado de outros campos."
          preview={<CompactUploadPreview />}
          code={compactCode}
        />

        <VariantSection
          title="Upload de avatar / imagem"
          description="Para fotos de perfil, capa de produto e thumbs com preview imediato."
          preview={<AvatarUploadPreview />}
          code={avatarCode}
        />
      </DocSection>

      <DocSection
        title="Lista de arquivos"
        description="Item visual com ícone tipado por extensão, barra de progresso e ação de remover."
      >
        <VariantSection
          title="Lista com progresso"
          description="Combine vários FileListItem para representar uploads em andamento e concluídos."
          preview={<FileProgressList />}
          code={listCode}
        />
      </DocSection>

      <DocSection
        title="Gerenciador do 3.01 (produto)"
        description="Toolbar + árvore + modais (Anexar, Nova Pasta, Mover, Histórico). Props sistema + filtro escopam SIAOS.PROP_ARQUIVO; disabled (desabilita 0/1) trava incluir/alterar/excluir. Não é o explorer estilo Windows."
      >
        <VariantSection
          title="FileManager"
          description="Raiz com rótulo do sistema e PK; pastas com descrição em itálico; arquivos com data/tamanho; Lixeira no rodapé. Texto accent se ACE_CODIGO."
          preview={<ProductTreePreview />}
          code={productCode}
        />
        <PropsTable
          rows={[
            { name: 'sistema', type: 'number', required: true, description: 'PAR_SISTEMA / op_file (cadastro em /settings/file-manager).' },
            { name: 'filtro', type: 'string', required: true, description: 'PAR_FILTRO — PK do registro host (varchar).' },
            { name: 'disabled', type: 'boolean | 0 | 1', default: '0', description: '3.01 desabilita. 1/true bloqueia incluir, alterar e excluir; listar, baixar e histórico continuam.' },
          ]}
        />
        <UsageNote type="tip">
          Host Cliente: <code>{'<FileManager sistema={SISTEMA_CLIENTE} filtro={String(cliente.codigo)} />'}</code>.
          Tokens do DS; não clonar o visual PHP.
        </UsageNote>
        <UsageNote type="warning">
          Não use <code>Tabs fill</code> no FileManager. A árvore tem altura própria;{' '}
          <code>fill</code> é só da ficha host (ex. Cliente). Em visualizar, passe{' '}
          <code>disabled</code> — listar/baixar/histórico continuam.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}

const sampleNodes: ArquivoNode[] = [
  {
    par_codigo: 1,
    par_codigo_pai: null,
    tipo: 0,
    nome: 'Cliente Entrada',
    descricao: 'Documentos Enviados Pelo Cliente',
    tamanho: null,
    data: null,
    ace_codigo: null,
    pasta_fixa: false,
    in_lixeira: false,
  },
  {
    par_codigo: 2,
    par_codigo_pai: 1,
    tipo: 1,
    nome: 'contrato.pdf',
    descricao: 'Scan',
    tamanho: 20480,
    data: '2026-01-15T10:00:00',
    ace_codigo: null,
    pasta_fixa: false,
    in_lixeira: false,
  },
  {
    par_codigo: 3,
    par_codigo_pai: null,
    tipo: 0,
    nome: 'Restrita',
    descricao: null,
    tamanho: null,
    data: null,
    ace_codigo: 12,
    pasta_fixa: true,
    in_lixeira: false,
  },
];

function ProductTreePreview() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));
  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-background">
      <FileManagerToolbar
        disableMutate={selected.size === 0}
        onTrash={() => {}}
        onAttach={() => {}}
        onFolder={() => {}}
        onMove={() => {}}
        onHistory={() => {}}
      />
      <FileManagerTree
        rootLabel="Cliente: 15114"
        nodes={sampleNodes}
        selected={selected}
        activeId={2}
        expanded={expanded}
        onToggleExpand={(id) =>
          setExpanded((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          })
        }
        onToggleSelect={(id) =>
          setSelected((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          })
        }
        onActivate={() => {}}
        onDownload={() => {}}
      />
    </div>
  );
}

const productCode = `import { FileManager } from '@/modules/files';
import { SISTEMA_CLIENTE } from '@/modules/files/sistemas';

<FileManager
  sistema={SISTEMA_CLIENTE}
  filtro={String(cliente.codigo)}
  disabled={!canEdit}
/>`;

