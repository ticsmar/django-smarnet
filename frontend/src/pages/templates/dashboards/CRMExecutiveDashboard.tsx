import { BadgeDollarSign } from 'lucide-react';
import ExecutiveDashboardTemplate from './ExecutiveDashboardTemplate';

export default function CRMExecutiveDashboard() {
  return (
    <ExecutiveDashboardTemplate
      title="CRM Executivo"
      description="Visão gerencial do funil comercial, cobertura de meta e qualidade da carteira para decisões rápidas da diretoria comercial."
      category="CRM"
      period="Últimos 30 dias"
      heroValue="R$ 4,8 mi"
      heroLabel="Pipeline ponderado com 3,2x de cobertura da meta mensal"
      icon={BadgeDollarSign}
      metrics={[
        { label: 'Pipeline ativo', value: 'R$ 6,2 mi', change: '+14%', detail: '31 oportunidades críticas no radar', tone: 'primary' },
        { label: 'Conversão', value: '28,4%', change: '+3,1 pp', detail: 'Melhor índice do trimestre', tone: 'accent' },
        { label: 'Ticket médio', value: 'R$ 118 mil', change: '+9%', detail: 'Foco em contas enterprise e upsell', tone: 'tertiary' },
        { label: 'Ciclo médio', value: '23 dias', change: '-4 dias', detail: 'Redução puxada por propostas recorrentes', tone: 'secondary' },
      ]}
      performanceSeries={[
        { label: 'Sem 1', current: 72, target: 68 },
        { label: 'Sem 2', current: 76, target: 72 },
        { label: 'Sem 3', current: 83, target: 76 },
        { label: 'Sem 4', current: 88, target: 80 },
        { label: 'Sem 5', current: 96, target: 84 },
        { label: 'Sem 6', current: 102, target: 88 },
      ]}
      funnelSeries={[
        { label: 'Qualificação', current: 44 },
        { label: 'Diagnóstico', current: 31 },
        { label: 'Proposta', current: 22 },
        { label: 'Negociação', current: 16 },
        { label: 'Fechamento', current: 11 },
      ]}
      breakdown={[
        { label: 'Novos logos', value: 38 },
        { label: 'Expansão', value: 29 },
        { label: 'Renovação', value: 21 },
        { label: 'Recuperação', value: 12 },
      ]}
      spotlight={[
        { title: 'Contas com maior probabilidade', subtitle: 'Mega Aços, Grupo Delta e Via Norte seguem acima de 80% de chance.', meta: 'Previsão de fechamento até 12 dias', value: 'R$ 1,46 mi' },
        { title: 'Propostas em atenção', subtitle: '5 negociações estão acima do SLA ideal e pedem ação do gestor.', meta: 'Tempo médio 9 dias acima do alvo', value: 'R$ 740 mil' },
        { title: 'Origem com melhor resposta', subtitle: 'Indicação de clientes segue liderando em win rate e ticket.', meta: 'Conversão 42%', value: 'R$ 980 mil' },
      ]}
      ranking={[
        { name: 'Ana Souza', role: 'Executiva de contas', value: 'R$ 1,18 mi', progress: 88 },
        { name: 'Carlos Lima', role: 'Hunter enterprise', value: 'R$ 920 mil', progress: 72 },
        { name: 'Marina Costa', role: 'Farmer key accounts', value: 'R$ 810 mil', progress: 64 },
        { name: 'João Mendes', role: 'Inside sales', value: 'R$ 640 mil', progress: 51 },
      ]}
      alerts={[
        { title: 'Negociações grandes concentradas', description: '42% do pipeline do mês está em 4 contas. Vale revisar plano B e dependência de fechamento.', tone: 'primary' },
        { title: 'Perda de ritmo em inbound pago', description: 'O volume de leads qualificados caiu nas duas últimas semanas e pode pressionar maio.', tone: 'accent' },
        { title: 'Fila de propostas para aprovação', description: '7 propostas aguardam revisão comercial-financeira e podem atrasar o fechamento.', tone: 'secondary' },
      ]}
    />
  );
}
