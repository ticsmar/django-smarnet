import { PagesLayout, PageSection } from './PagesLayout';
import { CheckCircle2, ShoppingCart, FileText, Truck, Package, CreditCard } from 'lucide-react';

const events = [
  { time: '15:42', date: 'Hoje', icon: CreditCard, title: 'Pagamento confirmado', desc: 'NF #4521 — R$ 24.500,00 recebidos via PIX', color: 'success' },
  { time: '14:20', date: 'Hoje', icon: Truck, title: 'Pedido despachado', desc: 'Pedido #PED-2401 saiu da expedição (transportadora Braspress)', color: 'primary' },
  { time: '11:08', date: 'Hoje', icon: Package, title: 'Separação concluída', desc: '12 itens separados e embalados no CD-SP', color: 'primary' },
  { time: '09:15', date: 'Hoje', icon: FileText, title: 'Nota fiscal emitida', desc: 'NF-e #4521 emitida para Construtora Moura Dubeux', color: 'primary' },
  { time: '17:30', date: 'Ontem', icon: CheckCircle2, title: 'Pedido aprovado', desc: 'Crédito aprovado pelo financeiro — limite OK', color: 'success' },
  { time: '14:02', date: 'Ontem', icon: ShoppingCart, title: 'Pedido recebido', desc: 'Novo pedido #PED-2401 — Construtora Moura Dubeux', color: 'secondary' },
];

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-status-success/10 text-status-success border-status-success/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
};

export default function TimelineShowcase() {
  return (
    <PagesLayout title="Linha do Tempo" description="Histórico cronológico de eventos do sistema." category="Páginas">
      <PageSection>
        <div className="relative pl-8">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
          {events.map((e, i) => (
            <div key={i} className="relative pb-7 last:pb-0">
              <div className={`absolute -left-[26px] w-8 h-8 rounded-full border-2 ${colorMap[e.color]} flex items-center justify-center bg-surface-container`}>
                <e.icon size={14} />
              </div>
              <div className="bg-surface-container-low rounded-xl p-4">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="font-semibold text-foreground text-sm">{e.title}</p>
                  <span className="text-[11px] text-muted-foreground shrink-0">{e.date} · {e.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
