import { TaskLayout } from './TaskLayout';
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  comments: number;
  attachments: number;
  dueDate: string;
  assignees: string[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const columns: Column[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    color: 'bg-muted-foreground',
    tasks: [
      { id: '1', title: 'Revisar proposta comercial', description: 'Analisar a proposta do cliente Petrobras antes da reunião', priority: 'high', comments: 3, attachments: 2, dueDate: '20 Abr', assignees: ['MS', 'JC'] },
      { id: '2', title: 'Atualizar catálogo de produtos', description: 'Incluir novos itens da linha industrial', priority: 'medium', comments: 1, attachments: 0, dueDate: '22 Abr', assignees: ['AL'] },
      { id: '3', title: 'Preparar relatório mensal', description: 'Compilar dados de vendas de Março', priority: 'low', comments: 0, attachments: 1, dueDate: '25 Abr', assignees: ['RP', 'TM'] },
    ],
  },
  {
    id: 'progress',
    title: 'Em Andamento',
    color: 'bg-status-warning',
    tasks: [
      { id: '4', title: 'Implementar módulo de estoque', description: 'Desenvolver funcionalidades de controle de inventário', priority: 'high', comments: 5, attachments: 3, dueDate: '18 Abr', assignees: ['CD', 'EF'] },
      { id: '5', title: 'Migrar dados do sistema legado', description: 'Transferir registros de clientes', priority: 'medium', comments: 2, attachments: 0, dueDate: '21 Abr', assignees: ['GH'] },
    ],
  },
  {
    id: 'review',
    title: 'Em Revisão',
    color: 'bg-secondary',
    tasks: [
      { id: '6', title: 'Validar integração com ERP', description: 'Testar sincronização de pedidos', priority: 'high', comments: 4, attachments: 2, dueDate: '19 Abr', assignees: ['IJ', 'KL'] },
      { id: '7', title: 'Revisar documentação API', description: 'Atualizar endpoints e exemplos', priority: 'low', comments: 1, attachments: 0, dueDate: '23 Abr', assignees: ['MN'] },
    ],
  },
  {
    id: 'done',
    title: 'Concluído',
    color: 'bg-status-success',
    tasks: [
      { id: '8', title: 'Configurar ambiente de homologação', description: 'Setup do servidor de testes finalizado', priority: 'medium', comments: 2, attachments: 1, dueDate: '15 Abr', assignees: ['OP'] },
      { id: '9', title: 'Treinamento equipe comercial', description: 'Apresentação do novo CRM realizada', priority: 'low', comments: 6, attachments: 4, dueDate: '12 Abr', assignees: ['QR', 'ST', 'UV'] },
    ],
  },
];

const priorityColors = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-status-warning/10 text-status-warning',
  low: 'bg-status-info/10 text-status-info',
};

const priorityLabels = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
};

export default function KanbanShowcase() {
  return (
    <TaskLayout title="Kanban Board" description="Quadro Kanban para gestão visual de tarefas e fluxos de trabalho">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.id} className="bg-surface-container rounded-2xl border border-border/40 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-bold text-foreground">{col.title}</h3>
                <span className="text-xs text-muted-foreground bg-surface-container-low px-2 py-0.5 rounded-md">{col.tasks.length}</span>
              </div>
              <button className="p-1 rounded hover:bg-surface-container-low text-muted-foreground hover:text-foreground transition-colors">
                <Plus size={15} />
              </button>
            </div>
            <div className="space-y-3">
              {col.tasks.map((task) => (
                <div key={task.id} className="bg-background rounded-xl border border-border/40 p-4 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{task.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><MessageSquare size={12} />{task.comments}</span>
                      <span className="flex items-center gap-1"><Paperclip size={12} />{task.attachments}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />{task.dueDate}</span>
                    </div>
                    <div className="flex -space-x-1.5">
                      {task.assignees.map((a, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-semibold text-primary">
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 rounded-lg border border-dashed border-border/60 text-xs text-muted-foreground hover:bg-surface-container-low hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                <Plus size={14} /> Adicionar tarefa
              </button>
            </div>
          </div>
        ))}
      </div>
    </TaskLayout>
  );
}
