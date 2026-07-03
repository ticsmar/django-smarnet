import { PagesLayout, PageSection } from './PagesLayout';
import { Folder, FileText, Image as ImageIcon, FileSpreadsheet, Video, Download, MoreVertical, Upload, Plus } from 'lucide-react';

const folders = [
  { name: 'Contratos', files: 24, size: '125 MB' },
  { name: 'Notas Fiscais 2025', files: 142, size: '380 MB' },
  { name: 'Relatórios', files: 56, size: '210 MB' },
  { name: 'Marketing', files: 89, size: '1.2 GB' },
];

const files = [
  { name: 'Contrato_Petrobras_2025.pdf', type: 'pdf', size: '2.4 MB', date: '15/04/2025', icon: FileText, color: 'text-destructive' },
  { name: 'Relatorio_Faturamento_Marco.xlsx', type: 'xlsx', size: '845 KB', date: '14/04/2025', icon: FileSpreadsheet, color: 'text-status-success' },
  { name: 'Apresentacao_Comercial.pptx', type: 'pptx', size: '12 MB', date: '13/04/2025', icon: FileText, color: 'text-amber-500' },
  { name: 'Logo_Cliente_Vector.png', type: 'png', size: '320 KB', date: '12/04/2025', icon: ImageIcon, color: 'text-primary' },
  { name: 'Treinamento_Operadores.mp4', type: 'mp4', size: '156 MB', date: '10/04/2025', icon: Video, color: 'text-secondary' },
];

export default function FileManagerShowcase() {
  return (
    <PagesLayout title="Gerenciador de Arquivos" description="Organize documentos, imagens e mídias." category="Páginas">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Armazenamento usado', value: '24.5 GB', sub: 'de 100 GB' },
          { label: 'Arquivos totais', value: '1.247', sub: 'em 38 pastas' },
          { label: 'Compartilhados', value: '128', sub: 'com a equipe' },
          { label: 'Lixeira', value: '12', sub: 'arquivos' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container rounded-2xl border border-border/40 p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl font-bold text-foreground mt-1">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <PageSection>
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-foreground">Pastas</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 h-9 rounded-lg border border-border text-xs font-semibold hover:bg-surface-container-low">
              <Plus size={14} /> Nova pasta
            </button>
            <button className="flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90">
              <Upload size={14} /> Enviar arquivo
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {folders.map((f) => (
            <div key={f.name} className="bg-surface-container-low rounded-xl p-4 hover:bg-surface-container-low/70 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <Folder className="text-primary" size={28} fill="currentColor" />
                <button className="text-muted-foreground hover:text-foreground"><MoreVertical size={14} /></button>
              </div>
              <p className="font-semibold text-foreground text-sm truncate">{f.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{f.files} arquivos · {f.size}</p>
            </div>
          ))}
        </div>

        <p className="font-semibold text-foreground mb-3">Arquivos recentes</p>
        <div className="space-y-1">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
              <f.icon size={20} className={f.color} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{f.name}</p>
                <p className="text-[11px] text-muted-foreground">{f.size} · {f.date}</p>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground"><Download size={14} /></button>
              <button className="p-2 text-muted-foreground hover:text-foreground"><MoreVertical size={14} /></button>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
