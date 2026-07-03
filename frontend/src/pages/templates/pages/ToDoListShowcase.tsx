import { useState } from 'react';
import { PagesLayout, PageSection } from './PagesLayout';
import { Plus, Trash2, Calendar, Flag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

const initial: Todo[] = [
  { id: 1, text: 'Revisar pedidos em aberto do dia', done: false, priority: 'high', date: 'Hoje' },
  { id: 2, text: 'Aprovar NFs pendentes do faturamento', done: false, priority: 'high', date: 'Hoje' },
  { id: 3, text: 'Reunião com fornecedor Gerdau', done: false, priority: 'medium', date: 'Amanhã' },
  { id: 4, text: 'Enviar relatório mensal para diretoria', done: true, priority: 'high', date: 'Hoje' },
  { id: 5, text: 'Atualizar tabela de preços de produtos', done: true, priority: 'low', date: 'Esta semana' },
  { id: 6, text: 'Conferir conciliação bancária', done: false, priority: 'medium', date: 'Sexta' },
];

const priorityColor: Record<string, string> = {
  high: 'text-destructive',
  medium: 'text-amber-500',
  low: 'text-muted-foreground',
};

export default function ToDoListShowcase() {
  const [todos, setTodos] = useState<Todo[]>(initial);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos([{ id: Date.now(), text, done: false, priority: 'medium', date: 'Hoje' }, ...todos]);
    setText('');
  };

  const toggle = (id: number) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id: number) => setTodos(todos.filter(t => t.id !== id));

  const pending = todos.filter(t => !t.done).length;

  return (
    <PagesLayout title="Lista de Tarefas" description="Organize seu dia com prioridades e prazos." category="Páginas">
      <PageSection>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-display text-lg font-bold text-foreground">Suas tarefas</p>
            <p className="text-xs text-muted-foreground">{pending} pendentes · {todos.length - pending} concluídas</p>
          </div>
        </div>

        <div className="flex gap-2 mb-5">
          <Input
            placeholder="Nova tarefa..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            className="h-10"
          />
          <button onClick={add} className="px-4 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Plus size={15} /> Adicionar
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3.5 group"
            >
              <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
              <Flag size={13} className={`shrink-0 ${priorityColor[t.priority]}`} fill="currentColor" />
              <span className={`flex-1 text-sm ${t.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{t.text}</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar size={11} /> {t.date}</span>
              <button onClick={() => remove(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </PageSection>
    </PagesLayout>
  );
}
