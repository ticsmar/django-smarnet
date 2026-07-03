import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';

interface DragItem { id: string; title: string; desc: string; }

export default function DraggableCardsShowcase() {
  const [items, setItems] = useState<DragItem[]>([
    { id: '1', title: 'Verificar Estoque', desc: 'Conferir níveis mínimos de produtos' },
    { id: '2', title: 'Aprovar Pedidos', desc: '5 pedidos aguardando aprovação' },
    { id: '3', title: 'Atualizar Preços', desc: 'Tabela de preços Q2 2026' },
    { id: '4', title: 'Relatório Mensal', desc: 'Gerar relatório de faturamento' },
  ]);

  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const newItems = [...items];
    const [moved] = newItems.splice(dragIdx, 1);
    newItems.splice(idx, 0, moved);
    setItems(newItems);
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  return (
    <AdvancedUILayout title="Draggable Cards" description="Cards arrastáveis para reorganização de conteúdo via drag & drop.">
      <ShowcaseSection title="Lista Reordenável">
        <div className="space-y-2 max-w-lg">
          {items.map((item, idx) => (
            <Card
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className={`cursor-grab active:cursor-grabbing transition-all border-border/40 ${dragIdx === idx ? 'opacity-50 scale-95' : ''}`}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <GripVertical className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">#{item.id}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Grid Reordenável">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
          {[
            { title: 'Vendas', value: 'R$ 245.800', color: 'text-primary' },
            { title: 'Pedidos', value: '142', color: 'text-secondary' },
            { title: 'Novos Clientes', value: '38', color: 'text-accent' },
            { title: 'Itens em Estoque', value: '1.245', color: 'text-foreground' },
          ].map((kpi, i) => (
            <Card key={i} draggable className="cursor-grab active:cursor-grabbing border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <GripVertical className="h-3.5 w-3.5" />
                  {kpi.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
