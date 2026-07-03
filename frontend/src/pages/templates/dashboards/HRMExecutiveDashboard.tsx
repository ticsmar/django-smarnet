import { UsersRound } from 'lucide-react';
import ExecutiveDashboardTemplate from './ExecutiveDashboardTemplate';

export default function HRMExecutiveDashboard() {
  return (
    <ExecutiveDashboardTemplate
      title="HRM Executivo"
      description="Painel executivo de pessoas com foco em estabilidade do quadro, desenvolvimento e saúde organizacional."
      category="HRM"
      period="Mês corrente"
      heroValue="1.284"
      heroLabel="Colaboradores ativos com quadro estabilizado e expansão controlada"
      icon={UsersRound}
      metrics={[
        { label: 'Headcount', value: '1.284', change: '+2,1%', detail: 'Expansão concentrada em operações', tone: 'primary' },
        { label: 'Turnover', value: '1,9%', change: '-0,6 pp', detail: 'Melhor resultado dos últimos 6 meses', tone: 'accent' },
        { label: 'Absenteísmo', value: '2,7%', change: '-0,3 pp', detail: 'Queda puxada por melhor escala de turnos', tone: 'tertiary' },
        { label: 'Engajamento', value: '82/100', change: '+4 pts', detail: 'Pesquisa pulse acima da meta interna', tone: 'secondary' },
      ]}
      performanceSeries={[
        { label: 'Jan', current: 65, target: 60 },
        { label: 'Fev', current: 67, target: 61 },
        { label: 'Mar', current: 70, target: 63 },
        { label: 'Abr', current: 74, target: 65 },
        { label: 'Mai', current: 79, target: 67 },
        { label: 'Jun', current: 82, target: 69 },
      ]}
      funnelSeries={[
        { label: 'Operações', current: 39 },
        { label: 'Comercial', current: 24 },
        { label: 'Tecnologia', current: 18 },
        { label: 'Backoffice', current: 14 },
        { label: 'Liderança', current: 8 },
      ]}
      breakdown={[
        { label: 'Desenvolvimento', value: 33 },
        { label: 'Clima', value: 24 },
        { label: 'Retenção', value: 28 },
        { label: 'Saúde ocupacional', value: 15 },
      ]}
      spotlight={[
        { title: 'Áreas com maior evolução de clima', subtitle: 'Operações sul e time comercial centro-oeste puxam o avanço do pulse.', meta: 'Crescimento médio', value: '+7 pts' },
        { title: 'Lideranças em atenção', subtitle: 'Duas células tiveram alta de desligamentos e pedem acompanhamento próximo.', meta: 'Impacto potencial', value: '23 colaboradores' },
        { title: 'Treinamentos obrigatórios', subtitle: 'Há backlog em reciclagens de segurança e conduta para 3 unidades.', meta: 'Pendências abertas', value: '146 pessoas' },
      ]}
      ranking={[
        { name: 'Fernanda Lopes', role: 'BP operações', value: '93% aderência', progress: 90 },
        { name: 'Ricardo Neves', role: 'DHO corporativo', value: '88% aderência', progress: 74 },
        { name: 'Camila Duarte', role: 'BP comercial', value: '85% aderência', progress: 66 },
        { name: 'Paulo Faria', role: 'Saúde ocupacional', value: '79% aderência', progress: 52 },
      ]}
      alerts={[
        { title: 'Backlog de capacitações obrigatórias', description: 'Treinamentos regulatórios seguem abaixo do ideal em três operações críticas.', tone: 'primary' },
        { title: 'Risco de sobrecarga em liderança média', description: 'A pesquisa pulse mostra queda de energia em supervisores com times maiores.', tone: 'accent' },
        { title: 'Movimento de mercado em tecnologia', description: 'A atração externa está mais agressiva em perfis especialistas e exige retenção ativa.', tone: 'secondary' },
      ]}
    />
  );
}
