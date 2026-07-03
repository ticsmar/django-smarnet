import { TablesLayout, ShowcaseSection } from './TablesLayout';
import { cn } from '@/lib/utils';
import { Eye, Edit, Trash2, ArrowUpDown, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const TH = "px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low";
const TD = "px-6 py-4 text-sm text-foreground";
const WRAPPER = "overflow-hidden rounded-xl border border-border/40";

const products = [
  { cod: 'PRD-0012', desc: 'Sensor de Pressão XK-200', cat: 'Instrumentação', valor: 'R$ 1.250,00', status: 'Ativo' },
  { cod: 'PRD-0045', desc: 'Válvula Solenoide 2"', cat: 'Controle', valor: 'R$ 3.890,00', status: 'Ativo' },
  { cod: 'PRD-0078', desc: 'Transmissor de Nível', cat: 'Instrumentação', valor: 'R$ 2.150,00', status: 'Inativo' },
  { cod: 'PRD-0103', desc: 'CLP Compacto S7-1200', cat: 'Automação', valor: 'R$ 8.420,00', status: 'Ativo' },
  { cod: 'PRD-0156', desc: 'Cabo Profibus DP 100m', cat: 'Redes', valor: 'R$ 480,00', status: 'Baixo Estoque' },
];

const orders = [
  { cod: '001', prod: 'Parafuso M8x30 Inox', qtd: 500, unit: '0,45', total: '225,00' },
  { cod: '002', prod: 'Porca Sext. M8 Inox', qtd: 500, unit: '0,22', total: '110,00' },
  { cod: '003', prod: 'Arruela Lisa M8', qtd: 1000, unit: '0,08', total: '80,00' },
  { cod: '004', prod: 'Chapa Aço 1020 3mm', qtd: 10, unit: '189,90', total: '1.899,00' },
  { cod: '005', prod: 'Tubo Galv. 1" x 6m', qtd: 25, unit: '42,00', total: '1.050,00' },
  { cod: '006', prod: 'Eletrodo E6013 3.25mm', qtd: 5, unit: '38,50', total: '192,50' },
];

const statusMap: Record<string, string> = {
  'Ativo': 'bg-status-success/10 text-status-success',
  'Inativo': 'bg-muted text-muted-foreground',
  'Baixo Estoque': 'bg-status-warning/10 text-status-warning',
};

export default function BasicTablesShowcase() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (cod: string) => {
    setSelected(prev => prev.includes(cod) ? prev.filter(c => c !== cod) : [...prev, cod]);
  };
  const toggleAll = () => {
    setSelected(prev => prev.length === products.length ? [] : products.map(p => p.cod));
  };

  return (
    <TablesLayout title="Tables" description="Tabelas HTML padrão com variações de estilo, densidade e funcionalidade.">

      {/* Basic */}
      <ShowcaseSection title="Tabela Padrão">
        <div className={WRAPPER}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={TH}><button className="inline-flex items-center gap-1 hover:text-foreground">Código <ArrowUpDown size={12} /></button></th>
                <th className={TH}><button className="inline-flex items-center gap-1 hover:text-foreground">Descrição <ArrowUpDown size={12} /></button></th>
                <th className={TH}>Categoria</th>
                <th className={cn(TH, "text-right")}>Valor</th>
                <th className={cn(TH, "text-center")}>Status</th>
                <th className={cn(TH, "text-center")}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row, i) => (
                <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className={cn(TD, "font-mono text-xs font-semibold text-secondary")}>{row.cod}</td>
                  <td className={cn(TD, "font-medium")}>{row.desc}</td>
                  <td className={cn(TD, "text-muted-foreground")}>{row.cat}</td>
                  <td className={cn(TD, "text-right font-mono font-semibold")}>{row.valor}</td>
                  <td className={cn(TD, "text-center")}>
                    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", statusMap[row.status])}>{row.status}</span>
                  </td>
                  <td className={cn(TD, "text-center")}>
                    <div className="inline-flex gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection title="Tabela Compacta">
        <div className={WRAPPER}>
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Código</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Produto</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Qtd</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Unit.</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row, i) => (
                <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{row.cod}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{row.prod}</td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-sm text-foreground">{row.qtd}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">R$ {row.unit}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-sm text-foreground">R$ {row.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-container-low font-semibold">
                <td colSpan={4} className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Geral:</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-secondary font-bold">R$ 3.556,50</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </ShowcaseSection>

      {/* Striped */}
      <ShowcaseSection title="Tabela Zebrada">
        <div className={WRAPPER}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={TH}>#</th>
                <th className={TH}>Equipamento</th>
                <th className={TH}>Setor</th>
                <th className={cn(TH, "text-center")}>Criticidade</th>
                <th className={cn(TH, "text-right")}>Última Manutenção</th>
              </tr>
            </thead>
            <tbody>
              {[
                { eq: 'Compressor Atlas ZR-250', setor: 'Utilidades', crit: 'Alta', data: '12/03/2026' },
                { eq: 'Caldeira Aalborg OC-B', setor: 'Geração', crit: 'Crítica', data: '28/02/2026' },
                { eq: 'Bomba KSB Megabloc', setor: 'Transferência', crit: 'Média', data: '05/04/2026' },
                { eq: 'Torre de Resfriamento GEA', setor: 'Utilidades', crit: 'Alta', data: '18/01/2026' },
                { eq: 'Inversor ABB ACS580', setor: 'Automação', crit: 'Baixa', data: '10/04/2026' },
              ].map((row, i) => (
                <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className={cn(TD, "font-mono text-xs text-muted-foreground")}>{i + 1}</td>
                  <td className={cn(TD, "font-medium")}>{row.eq}</td>
                  <td className={cn(TD, "text-muted-foreground")}>{row.setor}</td>
                  <td className={cn(TD, "text-center")}>
                    <span className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      row.crit === 'Crítica' && 'bg-destructive/10 text-destructive',
                      row.crit === 'Alta' && 'bg-status-warning/10 text-status-warning',
                      row.crit === 'Média' && 'bg-status-info/10 text-status-info',
                      row.crit === 'Baixa' && 'bg-status-success/10 text-status-success',
                    )}>{row.crit}</span>
                  </td>
                  <td className={cn(TD, "text-right text-muted-foreground")}>{row.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* Selection */}
      <ShowcaseSection title="Tabela com Seleção">
        <div className={WRAPPER}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-4 w-10 bg-surface-container-low">
                  <input type="checkbox" checked={selected.length === products.length} onChange={toggleAll} className="rounded border-border accent-secondary" />
                </th>
                <th className={TH}>Código</th>
                <th className={TH}>Descrição</th>
                <th className={cn(TH, "text-right")}>Valor</th>
                <th className={cn(TH, "text-center")}>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row, i) => (
                <tr key={i} className={cn("transition-colors", selected.includes(row.cod) ? "bg-secondary/5" : i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.includes(row.cod)} onChange={() => toggleSelect(row.cod)} className="rounded border-border accent-secondary" />
                  </td>
                  <td className={cn(TD, "font-mono text-xs font-semibold text-secondary")}>{row.cod}</td>
                  <td className={cn(TD, "font-medium")}>{row.desc}</td>
                  <td className={cn(TD, "text-right font-mono font-semibold")}>{row.valor}</td>
                  <td className={cn(TD, "text-center")}>
                    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", statusMap[row.status])}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selected.length > 0 && (
            <div className="flex items-center gap-3 px-6 py-4 border-t border-border/40 bg-surface-container-low text-xs">
              <span className="font-semibold text-secondary">{selected.length} selecionado(s)</span>
              <button className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors">Aprovar</button>
              <button className="px-3 py-1 rounded-md text-destructive hover:bg-destructive/10 font-semibold transition-colors">Excluir</button>
            </div>
          )}
        </div>
      </ShowcaseSection>

      {/* Bordered */}
      <ShowcaseSection title="Tabela com Bordas">
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border-b border-r border-border">Material</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border-b border-r border-border">Jan</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border-b border-r border-border">Fev</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border-b border-r border-border">Mar</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border-b border-border">Abr</th>
              </tr>
            </thead>
            <tbody>
              {[
                { mat: 'Aço Inox 304', vals: [120, 145, 132, 158] },
                { mat: 'Alumínio 6061', vals: [89, 92, 105, 98] },
                { mat: 'Cobre Eletrolítico', vals: [45, 52, 48, 61] },
              ].map((row, i) => (
                <tr key={i} className={cn("border-b border-border/50 last:border-b-0", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                  <td className="px-6 py-4 font-medium text-sm text-foreground border-r border-border/50">{row.mat}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={cn("px-6 py-4 text-center font-mono text-sm text-muted-foreground", j < 3 && "border-r border-border/50")}>{v} ton</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* Contextual Rows */}
      <ShowcaseSection title="Linhas Contextuais">
        <div className={WRAPPER}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={cn(TH, "w-10 text-center")}></th>
                <th className={TH}>Evento</th>
                <th className={TH}>Descrição</th>
                <th className={cn(TH, "text-right")}>Horário</th>
              </tr>
            </thead>
            <tbody>
              {[
                { icon: CheckCircle2, color: 'text-status-success', bg: 'bg-status-success/5', ev: 'Backup concluído', desc: 'Backup diário do banco de dados finalizado', hora: '06:00' },
                { icon: AlertTriangle, color: 'text-status-warning', bg: 'bg-status-warning/5', ev: 'CPU elevada', desc: 'Servidor APP-02 com CPU acima de 85%', hora: '09:32' },
                { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/5', ev: 'Falha de conexão', desc: 'Timeout na comunicação com gateway de pagamento', hora: '11:15' },
                { icon: Clock, color: 'text-status-info', bg: 'bg-status-info/5', ev: 'Job agendado', desc: 'Sincronização de estoque programada para 23:00', hora: '14:00' },
              ].map((row, i) => {
                const Icon = row.icon;
                return (
                  <tr key={i} className={cn(row.bg, "transition-colors")}>
                    <td className={cn(TD, "text-center")}><Icon size={16} className={row.color} /></td>
                    <td className={cn(TD, "font-semibold")}>{row.ev}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{row.desc}</td>
                    <td className={cn(TD, "text-right font-mono text-xs text-muted-foreground")}>{row.hora}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </TablesLayout>
  );
}
