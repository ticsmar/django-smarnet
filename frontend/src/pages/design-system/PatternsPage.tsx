import { Search, Bell, Filter, Plus, Inbox, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DSSection, DSCard } from './_components';

export default function PatternsPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <DSSection
        title="Page Header"
        description="Cabeçalho de tela com título, breadcrumb opcional, ações primárias à direita."
      >
        <DSCard className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Comercial / Pedidos
              </p>
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
        description="Formulário em grid de 2 colunas com agrupamento por seção."
      >
        <DSCard>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">
            Dados do cliente
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Razão social</Label>
              <Input placeholder="Nova Smar S/A" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input placeholder="00.000.000/0000-00" />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input placeholder="Sertãozinho" />
            </div>
            <div className="space-y-2">
              <Label>UF</Label>
              <Input placeholder="SP" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </DSCard>
      </DSSection>

      {/* TABLE */}
      <DSSection title="Data Table" description="Tabela com cabeçalho fixo, status e ações por linha.">
        <DSCard className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-container-high">
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#4821', client: 'Petrobras Refino', value: 'R$ 124.800', status: 'Faturado', color: 'success' },
                { id: '#4820', client: 'Vale Mineração', value: 'R$ 89.300', status: 'Em produção', color: 'warning' },
                { id: '#4819', client: 'Klabin Papéis', value: 'R$ 32.100', status: 'Pendente', color: 'alert' },
                { id: '#4818', client: 'CSN Aços', value: 'R$ 210.500', status: 'Cancelado', color: 'destructive' },
              ].map((r) => (
                <tr key={r.id} className="border-t border-border/30 hover:bg-surface-container-low">
                  <td className="px-4 py-3 font-mono font-semibold">{r.id}</td>
                  <td className="px-4 py-3">{r.client}</td>
                  <td className="px-4 py-3 font-semibold">{r.value}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`bg-${r.color}/15 text-${r.color} hover:bg-${r.color}/15`}
                      style={{
                        backgroundColor: `hsl(var(--${r.color}) / 0.15)`,
                        color: `hsl(var(--${r.color}))`,
                      }}
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DSCard>
      </DSSection>

      {/* EMPTY STATE */}
      <DSSection title="Empty State">
        <DSCard className="flex flex-col items-center text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-muted-foreground flex items-center justify-center mb-4">
            <Inbox size={28} />
          </div>
          <h3 className="font-display font-bold text-lg">Nenhum pedido encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Ajuste os filtros ou cadastre um novo pedido para começar.
          </p>
          <Button className="mt-5">
            <Plus size={14} /> Novo pedido
          </Button>
        </DSCard>
      </DSSection>
    </>
  );
}
