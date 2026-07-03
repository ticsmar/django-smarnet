import { TaskLayout, TaskSection } from './TaskLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Flag, Paperclip, MessageSquare, CheckCircle2, User, Tag, Send } from 'lucide-react';

const subtasks = [
  { id: 1, title: 'Levantar requisitos com cliente', completed: true },
  { id: 2, title: 'Elaborar proposta técnica', completed: true },
  { id: 3, title: 'Revisar valores comerciais', completed: false },
  { id: 4, title: 'Validar com diretoria', completed: false },
  { id: 5, title: 'Enviar para aprovação final', completed: false },
];

const comments = [
  { id: 1, author: 'Maria Silva', avatar: 'MS', time: 'há 2 horas', text: 'Já validei os valores com o financeiro. Podemos seguir com a proposta atual.' },
  { id: 2, author: 'João Costa', avatar: 'JC', time: 'há 4 horas', text: 'Adicionei o comparativo técnico com a concorrência no anexo.' },
  { id: 3, author: 'Ana Lima', avatar: 'AL', time: 'ontem', text: 'Reunião agendada para sexta-feira às 14h com a equipe da Petrobras.' },
];

const attachments = [
  { name: 'proposta-comercial-v3.pdf', size: '2.4 MB' },
  { name: 'comparativo-tecnico.xlsx', size: '845 KB' },
  { name: 'cronograma-implantacao.pdf', size: '1.1 MB' },
];

export default function TaskDetailsShowcase() {
  return (
    <TaskLayout title="Task Details" description="Detalhamento completo de tarefa com subtarefas, comentários e anexos">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskSection>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-destructive/10 text-destructive mb-2 inline-block">Alta Prioridade</span>
                <h2 className="text-xl font-bold text-foreground">Revisar proposta comercial Petrobras</h2>
                <p className="text-sm text-muted-foreground mt-1">TASK-2024-0045 · Criada em 12 Abr 2025</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-status-warning/10 text-status-warning">Em Andamento</span>
            </div>
            <div>
              <Label className="text-xs mb-1.5">Descrição</Label>
              <Textarea
                rows={4}
                defaultValue="Revisar proposta comercial completa para o cliente Petrobras antes da reunião de apresentação. Validar valores, prazos e escopo técnico com as áreas envolvidas."
              />
            </div>
          </TaskSection>

          <TaskSection title="Subtarefas">
            <div className="space-y-2">
              {subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/40">
                  <CheckCircle2 size={18} className={sub.completed ? 'text-status-success' : 'text-muted-foreground'} />
                  <span className={`text-sm flex-1 ${sub.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>
          </TaskSection>

          <TaskSection title="Comentários">
            <div className="space-y-4 mb-5">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{c.author}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Input placeholder="Adicionar comentário..." className="flex-1" />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                <Send size={14} /> Enviar
              </button>
            </div>
          </TaskSection>
        </div>

        <div className="space-y-6">
          <TaskSection title="Detalhes">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><User size={13} /> Responsável</div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">MS</div>
                  <span className="text-sm text-foreground">Maria Silva</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Calendar size={13} /> Vencimento</div>
                <span className="text-sm text-foreground">20 Abr 2025</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Clock size={13} /> Tempo estimado</div>
                <span className="text-sm text-foreground">8 horas</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Flag size={13} /> Projeto</div>
                <span className="text-sm text-foreground">Vendas Q2</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2"><Tag size={13} /> Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary/10 text-secondary">Comercial</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-primary/10 text-primary">Cliente VIP</span>
                </div>
              </div>
            </div>
          </TaskSection>

          <TaskSection title="Anexos">
            <div className="space-y-2">
              {attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-background border border-border/40 hover:bg-surface-container-low transition-colors cursor-pointer">
                  <Paperclip size={15} className="text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </TaskSection>
        </div>
      </div>
    </TaskLayout>
  );
}
