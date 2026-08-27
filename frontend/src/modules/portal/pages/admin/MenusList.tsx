import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { deleteMenu, listAdminMenus, reorderMenus } from '@/services/portal';
import type { Menu } from '@/types/portal';
import { cn } from '@/lib/utils';

function SortableRow({ m, selected, onSelect, onDelete }: {
  m: Menu; selected: boolean; onSelect: () => void; onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: m.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 px-2 py-2 rounded-lg border',
        selected ? 'border-[#0F4C81] bg-[#0F4C81]/15' : 'border-transparent hover:bg-zinc-800/50',
      )}
    >
      <button {...attributes} {...listeners} className="p-1 cursor-grab text-zinc-500 hover:text-zinc-200">
        <GripVertical className="w-4 h-4" />
      </button>
      <button onClick={onSelect} className="flex-1 text-left text-sm">
        <span className={cn('block font-medium', !m.ativo && 'text-zinc-500 line-through')}>{m.label}</span>
        <span className="block text-[11px] text-zinc-500">/{m.slug} · {m.tipo}</span>
      </button>
      <button onClick={onDelete} className="p-1.5 rounded hover:bg-red-500/20 text-red-400">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </li>
  );
}

export default function MenusList() {
  const qc = useQueryClient();
  const { data: menus = [] } = useQuery({ queryKey: ['admin', 'menus'], queryFn: listAdminMenus });
  const reorder = useMutation({
    mutationFn: reorderMenus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'menus'] }),
  });
  const del = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'menus'] }),
  });

  const [selected, setSelected] = useState<string | null>(null);

  const root = [...menus].filter((m) => !m.menuPaiId).sort((a, b) => a.ordem - b.ordem);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = root.findIndex((m) => m.id === active.id);
    const newIdx = root.findIndex((m) => m.id === over.id);
    const reordered = arrayMove(root, oldIdx, newIdx).map((m, i) => ({ ...m, ordem: i + 1 }));
    const rest = menus.filter((m) => m.menuPaiId);
    reorder.mutate([...reordered, ...rest]);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menus</h1>
          <p className="text-sm text-zinc-400">Arraste para reordenar · selecione para editar</p>
        </div>
        <Link to="/portal/admin/menus/novo" className="px-4 py-2.5 rounded-lg bg-[#0F4C81] text-white text-sm font-medium inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo menu
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Árvore */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-3">
          <h3 className="text-xs uppercase tracking-wider text-zinc-400 px-2 py-2">Árvore</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={root.map((m) => m.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-1">
                {root.map((m) => (
                  <div key={m.id}>
                    <SortableRow
                      m={m}
                      selected={selected === m.id}
                      onSelect={() => setSelected(m.id)}
                      onDelete={() => confirm('Excluir menu?') && del.mutate(m.id)}
                    />
                    {menus.filter((c) => c.menuPaiId === m.id).sort((a, b) => a.ordem - b.ordem).map((c) => (
                      <div key={c.id} className="ml-8">
                        <button
                          onClick={() => setSelected(c.id)}
                          className={cn(
                            'w-full text-left px-2 py-1.5 rounded-md text-sm',
                            selected === c.id ? 'bg-[#0F4C81]/20 text-white' : 'text-zinc-400 hover:bg-zinc-800/50',
                          )}
                        >
                          ↳ {c.label}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>

        {/* Editor */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 lg:col-span-1">
          {selected ? (
            <div className="space-y-2 text-sm">
              <p className="text-zinc-300">
                Selecionado: <strong>{menus.find((m) => m.id === selected)?.label}</strong>
              </p>
              <Link
                to={`/portal/admin/menus/${selected}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F4C81] text-white text-sm font-medium"
              >
                <Pencil className="w-4 h-4" /> Editar este item
              </Link>
            </div>
          ) : (
            <div className="text-sm text-zinc-500">Selecione um item para editar.</div>
          )}
        </div>

        {/* Preview */}
        <div className="rounded-2xl bg-[#0A0E1A] border border-zinc-800 p-3">
          <h3 className="text-xs uppercase tracking-wider text-zinc-400 px-2 py-2">Preview</h3>
          <nav className="flex flex-wrap gap-1 p-2 rounded-lg bg-[#0A0E1A] border border-white/5">
            {root.filter((m) => m.ativo).map((m) => (
              <span key={m.id} className="px-3 py-2 rounded-md text-sm font-medium text-white/80 bg-white/5">
                {m.label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
