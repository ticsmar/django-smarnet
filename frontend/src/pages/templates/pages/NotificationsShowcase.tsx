import { PagesLayout, PageSection } from './PagesLayout';
import { Bell, CheckCheck, ShoppingCart, AlertTriangle, UserPlus, Receipt, Package } from 'lucide-react';

const notifications = [
  { icon: ShoppingCart, color: 'primary', title: 'Novo pedido recebido', desc: 'Pedido #PED-2401 — Construtora Moura Dubeux', time: '2 min', unread: true },
  { icon: AlertTriangle, color: 'warning', title: 'Estoque baixo', desc: 'Produto MAT-451 abaixo do mínimo (12 un)', time: '15 min', unread: true },
  { icon: Receipt, color: 'success', title: 'Pagamento confirmado', desc: 'NF #4521 — R$ 24.500,00 recebidos', time: '1h', unread: true },
  { icon: UserPlus, color: 'secondary', title: 'Novo usuário cadastrado', desc: 'Marina Costa adicionada ao time Comercial', time: '3h', unread: false },
  { icon: Package, color: 'primary', title: 'Entrega realizada', desc: 'Pedido #PED-2387 entregue com sucesso', time: 'Ontem', unread: false },
  { icon: AlertTriangle, color: 'destructive', title: 'Falha em integração', desc: 'API banco Itaú retornou erro 503', time: 'Ontem', unread: false },
];

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  warning: 'bg-amber-500/10 text-amber-500',
  success: 'bg-status-success/10 text-status-success',
  destructive: 'bg-destructive/10 text-destructive',
  secondary: 'bg-secondary/10 text-secondary',
};

export default function NotificationsShowcase() {
  return (
    <PagesLayout title="Notificações" description="Central de alertas e atualizações do sistema." category="Páginas">
      <PageSection>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Bell size={18} /></div>
            <div>
              <p className="font-semibold text-foreground">Você tem 3 notificações não lidas</p>
              <p className="text-xs text-muted-foreground">Última atualização há 2 minutos</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-primary flex items-center gap-1.5 hover:underline">
            <CheckCheck size={14} /> Marcar todas como lidas
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${n.unread ? 'bg-surface-container-low border-border/40' : 'bg-transparent border-transparent hover:bg-surface-container-low/50'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[n.color]}`}>
                <n.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground text-sm">{n.title}</p>
                  <span className="text-[11px] text-muted-foreground shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
