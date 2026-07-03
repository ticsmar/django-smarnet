import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { CheckCircle2, Clock, AlertTriangle, Users, Calendar, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const tasks = [
  { title: 'Configurar CI/CD pipeline', assignee: 'Carlos M.', status: 'done', priority: 'Alta' },
  { title: 'Design da landing page', assignee: 'Ana S.', status: 'progress', priority: 'Média' },
  { title: 'Integração API de pagamentos', assignee: 'Lucas R.', status: 'progress', priority: 'Alta' },
  { title: 'Testes unitários módulo auth', assignee: 'Maria L.', status: 'todo', priority: 'Média' },
  { title: 'Documentação da API REST', assignee: 'Pedro K.', status: 'todo', priority: 'Baixa' },
];

const activity = [
  { user: 'Carlos M.', action: 'completou a tarefa "CI/CD pipeline"', time: '2h atrás' },
  { user: 'Ana S.', action: 'atualizou o design da landing', time: '4h atrás' },
  { user: 'Lucas R.', action: 'adicionou nova branch feature/payments', time: '6h atrás' },
  { user: 'Maria L.', action: 'criou 3 novas tarefas', time: '1d atrás' },
];

export default function ProjectsOverviewShowcase() {
  return (
    <AppsLayout title="Project Overview" description="Visão geral do projeto com métricas, tarefas e atividades recentes." category="Projects">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tarefas Totais', value: '35', icon: FileText, color: 'text-primary bg-primary/10' },
          { label: 'Concluídas', value: '24', icon: CheckCircle2, color: 'text-green-500 bg-green-500/10' },
          { label: 'Em Progresso', value: '8', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Membros', value: '5', icon: Users, color: 'text-secondary bg-secondary/10' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container rounded-xl border border-border/40 p-4">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
              <s.icon size={16} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShowcaseSection title="Tarefas do Projeto">
            <div className="space-y-2">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    t.status === 'done' ? 'border-green-500 bg-green-500' : t.status === 'progress' ? 'border-primary' : 'border-border'
                  }`}>
                    {t.status === 'done' && <CheckCircle2 size={12} className="text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${t.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.assignee}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    t.priority === 'Alta' ? 'bg-destructive/10 text-destructive' :
                    t.priority === 'Média' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-muted text-muted-foreground'
                  }`}>{t.priority}</span>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>

        <div className="space-y-6">
          <ShowcaseSection title="Progresso Geral">
            <div className="text-center space-y-3">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="2" />
                  <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-primary" strokeWidth="2"
                    strokeDasharray="100" strokeDashoffset="32" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">68%</span>
              </div>
              <p className="text-xs text-muted-foreground">24 de 35 tarefas</p>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Atividade Recente">
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary">
                    {a.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-foreground"><span className="font-semibold">{a.user}</span> {a.action}</p>
                    <p className="text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </AppsLayout>
  );
}
