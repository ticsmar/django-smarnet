import { PagesLayout, PageSection } from '../PagesLayout';
import { Inbox, Send, Star, FileText, AlertCircle, Trash2, Tag, Plus, Search, Paperclip, Reply, Forward } from 'lucide-react';
import { Input } from '@/components/ui/input';

const folders = [
  { icon: Inbox, name: 'Caixa de entrada', count: 12, active: true },
  { icon: Star, name: 'Favoritos', count: 4 },
  { icon: Send, name: 'Enviados', count: 0 },
  { icon: FileText, name: 'Rascunhos', count: 3 },
  { icon: AlertCircle, name: 'Spam', count: 0 },
  { icon: Trash2, name: 'Lixeira', count: 0 },
];

const labels = [
  { color: 'bg-primary', name: 'Comercial' },
  { color: 'bg-status-success', name: 'Financeiro' },
  { color: 'bg-amber-500', name: 'Importante' },
  { color: 'bg-destructive', name: 'Urgente' },
];

const emails = [
  { from: 'Ana Ribeiro', subject: 'Aprovação do pedido CLI-2401', preview: 'Olá! Preciso da sua aprovação para liberar...', time: '09:42', unread: true, starred: true },
  { from: 'Banco Itaú', subject: 'Extrato mensal disponível', preview: 'Seu extrato de março de 2025 já está disponível...', time: '08:15', unread: true },
  { from: 'Roberto Silva', subject: 'Reunião de planejamento Q2', preview: 'Confirmando a reunião amanhã às 14h na sala...', time: 'Ontem', unread: false, starred: true },
  { from: 'Marina Costa', subject: 'Relatório financeiro mensal', preview: 'Segue em anexo o consolidado de março...', time: 'Ontem', unread: false },
];

export default function MailAppShowcase() {
  return (
    <PagesLayout title="Caixa de E-mail" description="Cliente de e-mail integrado." category="Páginas / Email">
      <PageSection className="!p-0 overflow-hidden">
        <div className="grid md:grid-cols-[220px_320px_1fr] h-[640px]">
          {/* Sidebar */}
          <div className="border-r border-border/40 p-3 space-y-1">
            <button className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold mb-3 hover:bg-primary/90">
              <Plus size={14} /> Novo e-mail
            </button>
            {folders.map((f) => (
              <button
                key={f.name}
                className={`w-full flex items-center justify-between gap-2 px-3 h-9 rounded-lg text-sm ${f.active ? 'bg-surface-container-low text-foreground font-semibold' : 'text-muted-foreground hover:bg-surface-container-low'}`}
              >
                <span className="flex items-center gap-2.5"><f.icon size={14} /> {f.name}</span>
                {f.count > 0 && <span className="text-[10px] font-bold">{f.count}</span>}
              </button>
            ))}
            <div className="pt-3 mt-3 border-t border-border/40">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Marcadores</p>
              {labels.map((l) => (
                <button key={l.name} className="w-full flex items-center gap-2.5 px-3 h-8 rounded-lg text-sm text-muted-foreground hover:bg-surface-container-low">
                  <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="border-r border-border/40 flex flex-col">
            <div className="p-3 border-b border-border/40">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar e-mails..." className="pl-9 h-9 text-sm" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {emails.map((e, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-4 py-3 border-b border-border/30 hover:bg-surface-container-low transition-colors ${i === 0 ? 'bg-surface-container-low' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-sm truncate ${e.unread ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>{e.from}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      {e.starred && <Star size={11} className="text-amber-400" fill="currentColor" />}
                      <span className="text-[10px] text-muted-foreground">{e.time}</span>
                    </div>
                  </div>
                  <p className={`text-xs truncate mb-0.5 ${e.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{e.subject}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.preview}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Reading */}
          <div className="flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border/40">
              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Reply size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Forward size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Star size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Tag size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low ml-auto"><Trash2 size={14} /></button>
              </div>
              <h2 className="font-display text-lg font-bold text-foreground">Aprovação do pedido CLI-2401</h2>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">AR</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Ana Ribeiro <span className="text-xs text-muted-foreground font-normal">&lt;ana@smarnet.com&gt;</span></p>
                  <p className="text-[11px] text-muted-foreground">para mim · 15/04/2025 09:42</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 text-sm text-muted-foreground space-y-3">
              <p className="text-foreground">Olá!</p>
              <p>
                Preciso da sua aprovação para liberar o pedido CLI-2401 da Construtora Moura Dubeux.
                O cliente solicitou uma condição especial de pagamento (60/90/120) e o valor total está
                acima do limite padrão de crédito.
              </p>
              <p>Segue resumo:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Valor total: R$ 184.500,00</li>
                <li>Condição: 60/90/120 dias</li>
                <li>Histórico do cliente: excelente (24 meses sem atraso)</li>
              </ul>
              <p>Aguardo seu retorno até o final do dia.</p>
              <p className="text-foreground">Obrigada,<br />Ana</p>

              <div className="bg-surface-container-low rounded-xl p-3 mt-5 flex items-center gap-3">
                <Paperclip size={14} className="text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">Pedido_CLI-2401_resumo.pdf</p>
                  <p className="text-[10px] text-muted-foreground">324 KB</p>
                </div>
                <button className="text-xs font-semibold text-primary hover:underline">Baixar</button>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
