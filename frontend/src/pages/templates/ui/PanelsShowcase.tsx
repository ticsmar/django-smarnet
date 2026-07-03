import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Panel, CollapsiblePanel, StatPanel, PanelColor, PanelTone } from '@/components/ui/panels';
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  DollarSign,
  Info,
  Layers,
  MoreHorizontal,
  Settings,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react';

const COLORS: PanelColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'success',
  'warning',
  'alert',
  'info',
  'destructive',
  'neutral',
];

const TONES: PanelTone[] = ['solid', 'soft', 'outline'];

export default function PanelsShowcase() {
  return (
    <UIShowcaseLayout
      title="Panels"
      description="Painéis estruturados (header + body + footer) com 10 cores semânticas e 3 tons (solid, soft, outline). Componentes reutilizáveis em src/components/ui/panels/."
    >
      {/* ======================= Básico ======================= */}
      <ShowcaseSection title="Panel Básico — <Panel />">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Panel
            title="Painel Simples"
            description="Header + body padrão"
            color="neutral"
            tone="soft"
          >
            Conteúdo do painel com informações relevantes para o usuário.
          </Panel>

          <Panel
            title="Com Ícone"
            description="Header decorado"
            color="primary"
            tone="soft"
            icon={Layers}
          >
            Use a prop <code className="text-xs">icon</code> para destacar a categoria.
          </Panel>

          <Panel
            title="Com Ações"
            description="Botões no header"
            color="secondary"
            tone="soft"
            icon={Settings}
            actions={
              <button className="p-1 rounded hover:bg-black/10">
                <MoreHorizontal size={16} />
              </button>
            }
            footer={
              <div className="flex justify-end gap-2 text-xs text-muted-foreground">
                Atualizado há 5 min
              </div>
            }
          >
            Painel com header + body + footer.
          </Panel>
        </div>
      </ShowcaseSection>

      {/* ======================= Tons ======================= */}
      <ShowcaseSection title="Tons — solid · soft · outline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TONES.map((tone) => (
            <Panel
              key={tone}
              title={`Tom ${tone}`}
              description={`tone="${tone}"`}
              color="primary"
              tone={tone}
              icon={Info}
            >
              Variação visual do painel usando a cor <strong>primary</strong> com tom{' '}
              <code className="text-xs">{tone}</code>.
            </Panel>
          ))}
        </div>
      </ShowcaseSection>

      {/* ======================= Matriz de cores × tons ======================= */}
      <ShowcaseSection title="Matriz: 10 cores × 3 tons">
        <div className="space-y-6">
          {COLORS.map((color) => (
            <div key={color}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {color}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TONES.map((tone) => (
                  <Panel
                    key={`${color}-${tone}`}
                    title={`${color} · ${tone}`}
                    color={color}
                    tone={tone}
                    icon={Bell}
                  >
                    <p className="text-xs text-muted-foreground">
                      Exemplo de conteúdo no painel.
                    </p>
                  </Panel>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* ======================= StatPanel ======================= */}
      <ShowcaseSection title="StatPanel — métricas com header colorido">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatPanel
            title="Receita"
            value="R$ 1,2M"
            delta="+8.4%"
            helper="vs. mês anterior"
            color="success"
            tone="soft"
            icon={DollarSign}
          />
          <StatPanel
            title="Usuários Ativos"
            value="2.842"
            delta="+12%"
            helper="últimos 30 dias"
            color="info"
            tone="soft"
            icon={Users}
          />
          <StatPanel
            title="Conversão"
            value="3,4%"
            delta="-0,3%"
            helper="média do período"
            color="warning"
            tone="soft"
            icon={TrendingUp}
          />
          <StatPanel
            title="Incidentes"
            value="7"
            delta="+2"
            helper="abertos hoje"
            color="destructive"
            tone="soft"
            icon={ShieldAlert}
          />
        </div>
      </ShowcaseSection>

      {/* ======================= CollapsiblePanel ======================= */}
      <ShowcaseSection title="CollapsiblePanel — expansível">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CollapsiblePanel
            title="Notificações do sistema"
            description="3 itens novos"
            color="info"
            tone="soft"
            icon={Bell}
            defaultOpen
          >
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-success" />
                Backup concluído com sucesso.
              </li>
              <li className="flex items-center gap-2">
                <Activity size={14} className="text-info" />
                Sincronização em andamento.
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-warning" />
                Certificado expira em 7 dias.
              </li>
            </ul>
          </CollapsiblePanel>

          <CollapsiblePanel
            title="Configurações avançadas"
            description="Toque no chevron para expandir"
            color="secondary"
            tone="outline"
            icon={Settings}
            defaultOpen={false}
          >
            Conteúdo oculto inicialmente. Útil para painéis secundários ou
            opções avançadas que não devem ocupar espaço por padrão.
          </CollapsiblePanel>
        </div>
      </ShowcaseSection>

      {/* ======================= Uso prático ======================= */}
      <ShowcaseSection title="Uso prático — painéis em layout">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Panel
            title="Status do Sistema"
            description="Operacional"
            color="success"
            tone="solid"
            icon={CheckCircle2}
          >
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API</span>
                <span className="text-success font-medium">200 OK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Banco</span>
                <span className="text-success font-medium">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Workers</span>
                <span className="text-success font-medium">12 ativos</span>
              </div>
            </div>
          </Panel>

          <Panel
            title="Atenção Necessária"
            description="2 alertas pendentes"
            color="warning"
            tone="soft"
            icon={AlertTriangle}
            footer={
              <button className="text-xs text-warning font-medium">Ver todos →</button>
            }
          >
            Há itens aguardando revisão manual antes de serem processados.
          </Panel>

          <Panel
            title="Falha Crítica"
            description="Ação imediata"
            color="destructive"
            tone="solid"
            icon={ShieldAlert}
            footer={
              <button className="text-xs font-medium text-destructive">Resolver</button>
            }
          >
            Conexão perdida com o serviço de pagamento. Verifique logs.
          </Panel>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
