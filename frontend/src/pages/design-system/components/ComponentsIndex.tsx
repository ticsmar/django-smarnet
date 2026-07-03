import { Link } from 'react-router-dom';
import { componentGroups } from './ComponentsLayout';
import { DSCard } from '../_components';

export default function ComponentsIndex() {
  // Filter out the "Visão geral" group from the index grid
  const groups = componentGroups.filter((g) => g.label !== 'Visão geral');

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
          Catálogo
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight">
          Todos os componentes
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Biblioteca completa de componentes UI usados no SmarNet ERP. Cada item segue os tokens
          semânticos do design system e está pronto para composição.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <DSCard key={group.label} className="!p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <Icon size={16} />
                </span>
                <h3 className="font-display font-bold text-base">{group.label}</h3>
                <span className="ml-auto text-[10px] font-bold tracking-widest text-muted-foreground">
                  {group.items.length}
                </span>
              </div>
              <ul className="space-y-1">
                {group.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className="block text-sm px-2 py-1 rounded-md text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors"
                    >
                      → {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </DSCard>
          );
        })}
      </div>
    </div>
  );
}
