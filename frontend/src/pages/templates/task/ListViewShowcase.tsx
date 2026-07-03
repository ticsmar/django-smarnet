import { TaskLayout, TaskSection } from './TaskLayout';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Filter, Search, MoreHorizontal, Calendar, Flag } from 'lucide-react';
import { Input } from '@/components/ui/input';

const tasks = [
  { id: 1, title: 'Revisar proposta comercial Petrobras', project: 'Vendas', priority: 'Alta', status: 'Em Andamento', dueDate: '20 Abr 2025', assignee: 'Maria Silva', completed: false },
  { id: 2, title: 'Atualizar catálogo de produtos industriais', project: 'Marketing', priority: 'Média', status: 'A Fazer', dueDate: '22 Abr 2025', assignee: 'João Costa', completed: false },
  { id: 3, title: 'Preparar relatório mensal de vendas', project: 'Financeiro', priority: 'Baixa', status: 'A Fazer', dueDate: '25 Abr 2025', assignee: 'Ana Lima', completed: false },
  { id: 4, title: 'Implementar módulo de controle de estoque', project: 'TI', priority: 'Alta', status: 'Em Andamento', dueDate: '18 Abr 2025', assignee: 'Carlos Dias', completed: false },
  { id: 5, title: 'Migrar dados do sistema legado', project: 'TI', priority: 'Média', status: 'Em Andamento', dueDate: '21 Abr 2025', assignee: 'Roberto Pereira', completed: false },
  { id: 6, title: 'Validar integração com ERP', project: 'TI', priority: 'Alta', status: 'Em Revisão', dueDate: '19 Abr 2025', assignee: 'Tatiana Mendes', completed: false },
  { id: 7, title: 'Configurar ambiente de homologação', project: 'TI', priority: 'Média', status: 'Concluído', dueDate: '15 Abr 2025', assignee: 'Eduardo Ferreira', completed: true },
  { id: 8, title: 'Treinamento equipe comercial CRM', project: 'RH', priority: 'Baixa', status: 'Concluído', dueDate: '12 Abr 2025', assignee: 'Patricia Santos', completed: true },
];

const priorityColors: Record<string, string> = {
  'Alta': 'bg-destructive/10 text-destructive',
  'Média': 'bg-status-warning/10 text-status-warning',
  'Baixa': 'bg-status-info/10 text-status-info',
};

const statusColors: Record<string, string> = {
  'A Fazer': 'bg-muted text-muted-foreground',
  'Em Andamento': 'bg-status-warning/10 text-status-warning',
  'Em Revisão': 'bg-secondary/20 text-secondary',
  'Concluído': 'bg-status-success/10 text-status-success',
};

export default function ListViewShowcase() {
  return (
    <TaskLayout title="List View" description="Visualização em lista com filtros, ordenação e ações em massa">
      <TaskSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar tarefas..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg border border-border/60 text-xs text-foreground hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
              <Filter size={13} /> Filtros
            </button>
            <button className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <Plus size={13} /> Nova Tarefa
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border/40">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low w-10">
                  <Checkbox />
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Tarefa</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Projeto</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Prioridade</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Vencimento</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Responsável</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task.id} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                  <td className="px-6 py-4"><Checkbox checked={task.completed} /></td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{task.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{task.project}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[task.status]}`}>{task.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-1.5"><Calendar size={13} />{task.dueDate}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{task.assignee}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-surface-container-low text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={8} className="px-6 py-4 text-xs font-medium text-muted-foreground bg-surface-container-low">
                  Total: {tasks.length} tarefas · {tasks.filter(t => t.completed).length} concluídas
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </TaskSection>
    </TaskLayout>
  );
}
