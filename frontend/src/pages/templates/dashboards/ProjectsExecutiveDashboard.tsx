import { FolderKanban } from 'lucide-react';
import ExecutiveDashboardTemplate from './ExecutiveDashboardTemplate';

export default function ProjectsExecutiveDashboard() {
  return (
    <ExecutiveDashboardTemplate
      title="Projects Executivo"
      description="Leitura gerencial do portfólio com foco em capacidade, marcos e risco de prazo para priorização."
      category="Projects"
      period="Portfólio trimestral"
      heroValue="26 projetos"
      heroLabel="Projetos ativos sob governança com 81% dos marcos críticos dentro do plano"
      icon={FolderKanban}
      metrics={[
        { label: 'Projetos ativos', value: '26', change: '+4', detail: 'Entrada de frentes estratégicas no trimestre', tone: 'primary' },
        { label: 'Marcos no prazo', value: '81%', change: '+7 pp', detail: 'Recuperação sustentada nas squads core', tone: 'accent' },
        { label: 'Capacidade utilizada', value: '87%', change: '+5 pp', detail: 'Uso elevado, mas ainda controlado', tone: 'tertiary' },
        { label: 'Burn rate', value: 'R$ 1,3 mi', change: '+8%', detail: 'Pressão associada a fornecedores externos', tone: 'secondary' },
      ]}
      performanceSeries={[
        { label: 'Sprint 1', current: 62, target: 58 },
        { label: 'Sprint 2', current: 67, target: 60 },
        { label: 'Sprint 3', current: 71, target: 63 },
        { label: 'Sprint 4', current: 76, target: 66 },
        { label: 'Sprint 5', current: 81, target: 69 },
        { label: 'Sprint 6', current: 84, target: 72 },
      ]}
      funnelSeries={[
        { label: 'On track', current: 14 },
        { label: 'Atenção', current: 7 },
        { label: 'Risco', current: 3 },
        { label: 'Bloqueado', current: 2 },
      ]}
      breakdown={[
        { label: 'Produto', value: 36 },
        { label: 'Infra/ERP', value: 28 },
        { label: 'Operações', value: 21 },
        { label: 'Compliance', value: 15 },
      ]}
      spotlight={[
        { title: 'Projetos com maior risco de prazo', subtitle: 'Portal B2B, WMS fase 2 e pricing engine concentram atenção do PMO.', meta: 'Desvio médio', value: '+12 dias' },
        { title: 'Times no limite de capacidade', subtitle: 'Arquitetura e integrações estão acima de 90% de ocupação útil.', meta: 'Capacidade disponível', value: '8%' },
        { title: 'Portfólio com melhor retorno esperado', subtitle: 'Projetos de automação logística seguem com maior payback estimado.', meta: 'ROI previsto em 12 meses', value: '28%' },
      ]}
      ranking={[
        { name: 'Marcos Oliveira', role: 'PMO lead', value: '9 marcos entregues', progress: 86 },
        { name: 'Helena Vaz', role: 'Product ops', value: '7 marcos entregues', progress: 69 },
        { name: 'Tiago Santos', role: 'Infra manager', value: '6 marcos entregues', progress: 61 },
        { name: 'Larissa Prado', role: 'ERP squad lead', value: '5 marcos entregues', progress: 47 },
      ]}
      alerts={[
        { title: 'Capacidade crítica em integrações', description: 'A frente de integrações está perto do limite e pode atrasar três iniciativas-chave.', tone: 'primary' },
        { title: 'Dependência de fornecedor externo', description: 'Um parceiro concentrou 37% das entregas previstas para o próximo ciclo.', tone: 'accent' },
        { title: 'Marcos regulatórios próximos', description: 'Dois projetos de compliance entram em janela crítica já na próxima quinzena.', tone: 'secondary' },
      ]}
    />
  );
}
