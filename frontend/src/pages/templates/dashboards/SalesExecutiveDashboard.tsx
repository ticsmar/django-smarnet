import { TrendingUp } from 'lucide-react';
import ExecutiveDashboardTemplate from './ExecutiveDashboardTemplate';

export default function SalesExecutiveDashboard() {
  return (
    <ExecutiveDashboardTemplate
      title="Sales Executivo"
      description="Acompanhamento executivo de receita, margem e previsibilidade para decisões de expansão comercial."
      category="Sales"
      period="Trimestre atual"
      heroValue="R$ 12,4 mi"
      heroLabel="Receita prevista com 94% de aderência ao forecast consolidado"
      icon={TrendingUp}
      metrics={[
        { label: 'Receita bruta', value: 'R$ 9,7 mi', change: '+16%', detail: 'Acima do plano em 3 regiões', tone: 'primary' },
        { label: 'Margem de contribuição', value: '31,8%', change: '+2,4 pp', detail: 'Mix mais saudável em contas B2B', tone: 'accent' },
        { label: 'Forecast assertivo', value: '94%', change: '+6 pp', detail: 'Menor desvio desde janeiro', tone: 'tertiary' },
        { label: 'Win rate', value: '34%', change: '+4 pp', detail: 'Fechamentos maiores no segmento médio', tone: 'secondary' },
      ]}
      performanceSeries={[
        { label: 'Jan', current: 68, target: 62 },
        { label: 'Fev', current: 74, target: 66 },
        { label: 'Mar', current: 79, target: 70 },
        { label: 'Abr', current: 86, target: 74 },
        { label: 'Mai', current: 91, target: 79 },
        { label: 'Jun', current: 96, target: 84 },
      ]}
      funnelSeries={[
        { label: 'Sudeste', current: 38 },
        { label: 'Sul', current: 29 },
        { label: 'Nordeste', current: 24 },
        { label: 'Centro-Oeste', current: 19 },
        { label: 'Norte', current: 11 },
      ]}
      breakdown={[
        { label: 'Enterprise', value: 41 },
        { label: 'Mid-market', value: 27 },
        { label: 'Inside sales', value: 19 },
        { label: 'Canais', value: 13 },
      ]}
      spotlight={[
        { title: 'Região com melhor aceleração', subtitle: 'Sudeste entregou maior crescimento com ganho simultâneo de margem.', meta: 'Variação trimestral', value: '+22%' },
        { title: 'Contas com risco de desconto', subtitle: '12 negociações relevantes concentram pedidos fora da política padrão.', meta: 'Impacto potencial na margem', value: 'R$ 310 mil' },
        { title: 'Canais com melhor previsibilidade', subtitle: 'Parceiros tier 1 sustentam forecast mais estável para os próximos 60 dias.', meta: 'Aderência ao previsto', value: '96%' },
      ]}
      ranking={[
        { name: 'Letícia Prado', role: 'Regional Sudeste', value: 'R$ 2,6 mi', progress: 92 },
        { name: 'Fábio Moura', role: 'Regional Sul', value: 'R$ 1,9 mi', progress: 73 },
        { name: 'Sofia Matos', role: 'Inside sales lead', value: 'R$ 1,5 mi', progress: 61 },
        { name: 'Diego Pires', role: 'Canal parceiros', value: 'R$ 1,1 mi', progress: 48 },
      ]}
      alerts={[
        { title: 'Pressão por desconto no fim do mês', description: 'O volume de negociações próximas ao fechamento aumentou com maior tensão de preço.', tone: 'primary' },
        { title: 'Pipeline do Norte abaixo do ideal', description: 'A região segue com cobertura menor que 2x e demanda geração adicional imediata.', tone: 'accent' },
        { title: 'Renovação de contas grandes', description: 'Três renovações estratégicas pedem participação direta da diretoria comercial.', tone: 'secondary' },
      ]}
    />
  );
}
