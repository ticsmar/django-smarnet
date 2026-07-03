import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ActionButton } from '@/components/ui/buttons';
import { KpiCard, AccentCard, ActivityCard } from '@/components/ui/cards';
import { TrendingUp, Users, Package, DollarSign, ShoppingCart, Check } from 'lucide-react';

export default function CardsShowcase() {
  return (
    <UIShowcaseLayout title="Cards" description="Containers de conteúdo para agrupar informações relacionadas. Cada padrão é um componente reutilizável em src/components/ui/cards/.">
      <ShowcaseSection title="Card Básico (primitivos)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Título do Card</CardTitle>
              <CardDescription>Descrição breve do conteúdo.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Conteúdo do card com informações detalhadas sobre o item.</p>
            </CardContent>
            <CardFooter>
              <ActionButton label="Confirmar" icon={Check} size="sm" variant="success" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Card Sem Footer</CardTitle>
              <CardDescription>Apenas conteúdo informativo.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Informações complementares do módulo.</p>
            </CardContent>
          </Card>
          <AccentCard
            title="Card com Acento"
            description="Borda lateral colorida."
            accent="secondary"
          >
            <p className="text-sm text-muted-foreground">
              Use <code className="text-xs">&lt;AccentCard accent="secondary" /&gt;</code> para destaques.
            </p>
          </AccentCard>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="KPI Cards — <KpiCard />">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Clientes"
            value="2.842"
            change="+12.5%"
            trend="up"
            icon={Users}
            iconColor="text-primary"
          />
          <KpiCard
            label="Pedidos Mês"
            value="384"
            change="+8.2%"
            trend="up"
            icon={ShoppingCart}
            iconColor="text-secondary"
          />
          <KpiCard
            label="Faturamento"
            value="R$ 1.2M"
            change="-3.1%"
            trend="down"
            icon={DollarSign}
            iconColor="text-tertiary"
          />
          <KpiCard
            label="Produtos Ativos"
            value="1.156"
            change="+2.4%"
            trend="up"
            icon={Package}
            iconColor="text-status-success"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Card com Lista — <ActivityCard />">
        <ActivityCard
          className="max-w-md"
          title="Últimas Atividades"
          description="Ações recentes no sistema"
          items={[
            { text: 'Pedido #4521 aprovado', time: '2 min', badge: 'Sucesso' },
            { text: 'Novo cliente cadastrado', time: '15 min', badge: 'Novo' },
            { text: 'Estoque atualizado', time: '1h', badge: 'Info' },
          ]}
          onFooterClick={() => {}}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Acento — Cores do Design System (tone='soft')">
        <p className="text-xs text-muted-foreground mb-3">
          <code className="text-xs">&lt;AccentCard accent="..." tone="soft" /&gt;</code> — todas as 10 cores semânticas suportadas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(['primary', 'secondary', 'tertiary', 'accent', 'success', 'warning', 'alert', 'info', 'destructive', 'neutral'] as const).map((c) => (
            <AccentCard key={c} title={c.charAt(0).toUpperCase() + c.slice(1)} description={`accent="${c}"`} accent={c} tone="soft">
              <p className="text-xs text-muted-foreground">Tom suave com borda lateral.</p>
            </AccentCard>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tons — Solid / Soft / Outline">
        <p className="text-xs text-muted-foreground mb-3">
          Cada cor pode ser exibida em três tons. Use <code className="text-xs">tone</code> para ajustar o nível de destaque.
        </p>
        <div className="space-y-6">
          {(['success', 'warning', 'destructive', 'info'] as const).map((c) => (
            <div key={c}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{c}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AccentCard title="Solid" description={`tone="solid"`} accent={c} tone="solid">
                  <p className="text-xs">Fundo sólido, máximo destaque.</p>
                </AccentCard>
                <AccentCard title="Soft" description={`tone="soft"`} accent={c} tone="soft">
                  <p className="text-xs text-muted-foreground">Fundo suave, destaque moderado.</p>
                </AccentCard>
                <AccentCard title="Outline" description={`tone="outline"`} accent={c} tone="outline">
                  <p className="text-xs text-muted-foreground">Apenas borda lateral, sutil.</p>
                </AccentCard>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Casos de Uso ERP">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AccentCard title="Sucesso" description="Operação concluída" accent="success" tone="soft">
            <p className="text-sm text-muted-foreground">3 pedidos faturados hoje.</p>
          </AccentCard>
          <AccentCard title="Atenção" description="Requer revisão" accent="warning" tone="soft">
            <p className="text-sm text-muted-foreground">5 propostas vencendo em 48h.</p>
          </AccentCard>
          <AccentCard title="Crítico" description="Ação imediata" accent="destructive" tone="solid">
            <p className="text-sm">2 estoques abaixo do mínimo.</p>
          </AccentCard>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
