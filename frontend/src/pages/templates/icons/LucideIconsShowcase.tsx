import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { IconsLayout, IconGrid, IconCell } from './IconsLayout';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const iconEntries = Object.entries(LucideIcons).filter(
  ([name, component]) =>
    typeof component === 'object' &&
    component !== null &&
    'render' in component &&
    name !== 'default' &&
    name !== 'createLucideIcon' &&
    name !== 'icons' &&
    !name.startsWith('Lucide') &&
    name !== 'Icon'
);

export default function LucideIconsShowcase() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return iconEntries.filter(([name]) => name.toLowerCase().includes(q)).slice(0, 120);
  }, [search]);

  return (
    <IconsLayout
      title="Lucide Icons"
      description="Biblioteca de ícones Lucide — leve, consistente e totalmente tree-shakable. Usada como padrão neste projeto."
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Buscar ícones..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Exibindo {filtered.length} de {iconEntries.length} ícones
      </p>
      <IconGrid>
        {filtered.map(([name, IconComp]: [string, any]) => (
          <IconCell key={name} name={name} icon={<IconComp size={22} />} />
        ))}
      </IconGrid>
    </IconsLayout>
  );
}
