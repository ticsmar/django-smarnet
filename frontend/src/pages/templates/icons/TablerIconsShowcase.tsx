import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { IconsLayout, IconGrid, IconCell } from './IconsLayout';
import { Search } from 'lucide-react';

const tablerIcons = [
  { name: 'tb-home', path: 'M5 12l-2 0l9-9l9 9l-2 0M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6' },
  { name: 'tb-user', path: 'M8 7a4 4 0 108 0a4 4 0 10-8 0M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2' },
  { name: 'tb-settings', path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.573-1.066zM9 12a3 3 0 106 0a3 3 0 10-6 0' },
  { name: 'tb-search', path: 'M10 10m-7 0a7 7 0 107 7a7 7 0 10-7-7M21 21l-6-6' },
  { name: 'tb-heart', path: 'M19.5 12.572l-7.5 7.428l-7.5-7.428a5 5 0 117.5-6.566a5 5 0 117.5 6.572' },
  { name: 'tb-star', path: 'M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' },
  { name: 'tb-bell', path: 'M10 5a2 2 0 014 0a7 7 0 014 6v3a4 4 0 002 3h-16a4 4 0 002-3v-3a7 7 0 014-6M9 17v1a3 3 0 006 0v-1' },
  { name: 'tb-mail', path: 'M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-14a2 2 0 01-2-2v-10zM3 7l9 6l9-6' },
  { name: 'tb-calendar', path: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12zM16 3v4M8 3v4M4 11h16M11 15h1M12 15v3' },
  { name: 'tb-clock', path: 'M12 12m-9 0a9 9 0 109 9a9 9 0 10-9-9M12 7v5l3 3' },
  { name: 'tb-camera', path: 'M5 7h1a2 2 0 002-2a1 1 0 011-1h6a1 1 0 011 1a2 2 0 002 2h1a2 2 0 012 2v9a2 2 0 01-2 2h-14a2 2 0 01-2-2v-9a2 2 0 012-2M12 13m-3 0a3 3 0 103 3a3 3 0 10-3-3' },
  { name: 'tb-bookmark', path: 'M9 4h6a2 2 0 012 2v14l-5-3l-5 3v-14a2 2 0 012-2' },
  { name: 'tb-archive', path: 'M3 4m0 2a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2h-14a2 2 0 01-2-2zM5 8v10a2 2 0 002 2h10a2 2 0 002-2v-10M10 12h4' },
  { name: 'tb-cloud', path: 'M6.657 18c-2.572 0-4.657-2.007-4.657-4.483c0-2.475 2.085-4.482 4.657-4.482c.393-1.762 1.794-3.2 3.675-3.773c1.88-.572 3.956-.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.768h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927-1.551 3.487-3.464 3.487h-11.879' },
  { name: 'tb-database', path: 'M12 6m-8 0a8 3 0 108 3a8 3 0 10-8-3M4 6v6a8 3 0 0016 0v-6M4 12v6a8 3 0 0016 0v-6' },
  { name: 'tb-download', path: 'M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5l5-5M12 4v12' },
  { name: 'tb-eye', path: 'M10 12a2 2 0 104 0a2 2 0 10-4 0M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6' },
  { name: 'tb-filter', path: 'M5.5 5h13a1 1 0 01.5 1.5l-5 5.5v7l-4-2v-5l-5-5.5a1 1 0 01.5-1.5' },
  { name: 'tb-gift', path: 'M3 8m0 1a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1h-16a1 1 0 01-1-1zM12 8l0 13M19 12v7a2 2 0 01-2 2h-10a2 2 0 01-2-2v-7M7.5 8a2.5 2.5 0 010-5a4.8 8 0 014.5 5a4.8 8 0 014.5-5a2.5 2.5 0 010 5' },
  { name: 'tb-globe', path: 'M12 12m-9 0a9 9 0 109 9a9 9 0 10-9-9M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18' },
  { name: 'tb-lock', path: 'M5 13a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2h-10a2 2 0 01-2-2v-6zM11 16a1 1 0 102 0a1 1 0 10-2 0M8 11v-4a4 4 0 118 0v4' },
  { name: 'tb-map-pin', path: 'M9 11a3 3 0 106 0a3 3 0 10-6 0M17.657 16.657l-4.243 4.243a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'tb-message', path: 'M4 21v-13a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3h-9l-4 4M8 9l8 0M8 13l6 0' },
  { name: 'tb-moon', path: 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446a9 9 0 11-8.313-12.454z' },
  { name: 'tb-music', path: 'M3 17a3 3 0 106 0a3 3 0 10-6 0M13 17a3 3 0 106 0a3 3 0 10-6 0M9 17v-13h10v13M9 8h10' },
  { name: 'tb-phone', path: 'M5 4h4l2 5l-2.5 1.5a11 11 0 005 5l1.5-2.5l5 2v4a2 2 0 01-2 2a16 16 0 01-15-15a2 2 0 012-2' },
  { name: 'tb-photo', path: 'M15 8h.01M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3h-12a3 3 0 01-3-3v-12zM6 18l3.5-4.5a1 1 0 011.6 0l2.4 3l3-3.8a1 1 0 011.6 0l1.9 2.4' },
  { name: 'tb-rocket', path: 'M4 13a8 8 0 017-7a8 8 0 017 7a6 6 0 01-3 5h-8a6 6 0 01-3-5M12 11l0 2M9.7 21h4.6' },
  { name: 'tb-shield', path: 'M12 3a12 12 0 008.5 3a12 12 0 01-8.5 15a12 12 0 01-8.5-15a12 12 0 008.5-3' },
  { name: 'tb-sun', path: 'M12 12m-4 0a4 4 0 108 0a4 4 0 10-8 0M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7.7M18.4 5.6l-.7.7M17.7 17.7l.7.7M6.3 17.7l-.7.7' },
  { name: 'tb-tag', path: 'M7.5 7.5m-1 0a1 1 0 102 0a1 1 0 10-2 0M3 6v5.172a2 2 0 00.586 1.414l7.71 7.71a2.41 2.41 0 003.408 0l5.592-5.592a2.41 2.41 0 000-3.408l-7.71-7.71a2 2 0 00-1.414-.586h-5.172a3 3 0 00-3 3z' },
  { name: 'tb-terminal', path: 'M5 7l5 5l-5 5M12 17l7 0' },
  { name: 'tb-trash', path: 'M4 7l16 0M10 11l0 6M14 11l0 6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7v-3a1 1 0 011-1h4a1 1 0 011 1v3' },
  { name: 'tb-trending-up', path: 'M3 17l6-6l4 4l8-8M14 7l7 0l0 7' },
  { name: 'tb-truck', path: 'M7 17m-2 0a2 2 0 104 0a2 2 0 10-4 0M17 17m-2 0a2 2 0 104 0a2 2 0 10-4 0M5 17h-2v-4m-1-8h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4' },
  { name: 'tb-upload', path: 'M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5l5 5M12 4v12' },
  { name: 'tb-wifi', path: 'M12 18l.01 0M9.172 15.172a4 4 0 015.656 0M6.343 12.343a8 8 0 0111.314 0M3.515 9.515c4.686-4.687 12.284-4.687 16.97 0' },
  { name: 'tb-zap', path: 'M13 3l0 7l6 0l-8 11l0-7l-6 0l8-11' },
];

export default function TablerIconsShowcase() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tablerIcons.filter(i => i.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <IconsLayout
      title="Tabler Icons"
      description="Referência visual de ícones Tabler — mais de 4.000 ícones SVG com traço consistente, gratuitos e open-source."
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input placeholder="Buscar ícones..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>
      <p className="text-xs text-muted-foreground">Exibindo {filtered.length} de {tablerIcons.length} ícones</p>
      <IconGrid>
        {filtered.map(icon => (
          <IconCell
            key={icon.name}
            name={icon.name}
            icon={
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d={icon.path} />
              </svg>
            }
          />
        ))}
      </IconGrid>
    </IconsLayout>
  );
}
