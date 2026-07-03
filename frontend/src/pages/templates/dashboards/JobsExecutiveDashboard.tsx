import { BriefcaseBusiness } from 'lucide-react';
import ExecutiveDashboardTemplate from './ExecutiveDashboardTemplate';

export default function JobsExecutiveDashboard() {
  return (
    <ExecutiveDashboardTemplate
      title="Jobs Executivo"
      description="Painel de recrutamento com foco em vagas críticas, produtividade do time e velocidade de contratação."
      category="Jobs"
      period="Últimos 45 dias"
      heroValue="17 vagas"
      heroLabel="Posições críticas abertas com prioridade executiva e SLA acompanhado"
      icon={BriefcaseBusiness}
      metrics={[
        { label: 'Vagas abertas', value: '64', change: '+11%', detail: 'Crescimento puxado por operações e tecnologia', tone: 'primary' },
        { label: 'Time to hire', value: '21 dias', change: '-3 dias', detail: 'Abaixo da meta em perfis operacionais', tone: 'accent' },
        { label: 'Oferta aceita', value: '87%', change: '+5 pp', detail: 'Maior aderência de proposta salarial', tone: 'tertiary' },
        { label: 'Banco qualificado', value: '1.248', change: '+18%', detail: 'Candidatos com aderência alta por skill', tone: 'secondary' },
      ]}
      performanceSeries={[
        { label: 'S1', current: 58, target: 54 },
        { label: 'S2', current: 61, target: 56 },
        { label: 'S3', current: 66, target: 58 },
        { label: 'S4', current: 73, target: 61 },
        { label: 'S5', current: 78, target: 64 },
        { label: 'S6', current: 82, target: 68 },
      ]}
      funnelSeries={[
        { label: 'Triagem', current: 186 },
        { label: 'Entrevista RH', current: 109 },
        { label: 'Gestor', current: 62 },
        { label: 'Proposta', current: 28 },
        { label: 'Admissão', current: 19 },
      ]}
      breakdown={[
        { label: 'Operações', value: 34 },
        { label: 'Tecnologia', value: 26 },
        { label: 'Comercial', value: 22 },
        { label: 'Corporativo', value: 18 },
      ]}
      spotlight={[
        { title: 'Vagas com risco de SLA', subtitle: 'Coordenação de logística, analista fiscal e dev full stack exigem ação rápida.', meta: 'Abertas há mais de 28 dias', value: '7 posições' },
        { title: 'Fonte com melhor qualidade', subtitle: 'Programa de indicação gera maior aderência e melhor retenção na admissão.', meta: 'Conversão até proposta: 24%', value: '312 candidatos' },
        { title: 'Fila de entrevistas técnicas', subtitle: 'Capacidade dos gestores técnicos está no limite para os próximos 10 dias.', meta: 'Backlog atual', value: '41 entrevistas' },
      ]}
      ranking={[
        { name: 'Patrícia Nunes', role: 'Talent acquisition lead', value: '14 admissões', progress: 84 },
        { name: 'Renato Alves', role: 'Tech recruiter', value: '11 admissões', progress: 68 },
        { name: 'Juliana Rosa', role: 'Business recruiter', value: '9 admissões', progress: 57 },
        { name: 'Bruno Teixeira', role: 'Ops recruiter', value: '8 admissões', progress: 49 },
      ]}
      alerts={[
        { title: 'Dependência de entrevistas com gestores', description: 'Há concentração de entrevistas em 3 líderes e risco de gargalo já nesta semana.', tone: 'primary' },
        { title: 'Competitividade salarial em TI', description: 'As recusas em tecnologia voltaram a subir para vagas sêniores acima de 15k.', tone: 'accent' },
        { title: 'Aprovação de headcount pendente', description: 'Cinco posições seguem travadas por validação orçamentária e impactam o cronograma.', tone: 'secondary' },
      ]}
    />
  );
}
