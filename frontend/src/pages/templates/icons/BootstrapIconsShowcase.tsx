import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { IconsLayout, IconGrid, IconCell } from './IconsLayout';
import { Search } from 'lucide-react';

const bootstrapIcons = [
  { name: 'bi-alarm', path: 'M8.5.5A.5.5 0 019 0h6a.5.5 0 01.5.5.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5zM12 4a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm.5-9.5a.5.5 0 00-1 0v5a.5.5 0 00.5.5h3a.5.5 0 000-1h-2.5v-4.5z' },
  { name: 'bi-archive', path: 'M2 4h20v3H2V4zm1 4v11a1 1 0 001 1h16a1 1 0 001-1V8H3zm5 3h8v2H8v-2z' },
  { name: 'bi-arrow-right', path: 'M1 12h20m-7-7l7 7-7 7' },
  { name: 'bi-bag', path: 'M8 1a2.5 2.5 0 00-2.5 2.5V4h-1A1.5 1.5 0 003 5.5v13A1.5 1.5 0 004.5 20h15a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0019.5 4h-1v-.5A2.5 2.5 0 0016 1H8zm0 1h8a1.5 1.5 0 011.5 1.5V4h-11v-.5A1.5 1.5 0 018 2z' },
  { name: 'bi-bell', path: 'M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' },
  { name: 'bi-bookmark', path: 'M5 2a1 1 0 011-1h12a1 1 0 011 1v19.5a.5.5 0 01-.777.416L12 17.5l-6.223 4.416A.5.5 0 015 21.5V2z' },
  { name: 'bi-box', path: 'M2.5 4L12 2l9.5 2v14L12 22l-9.5-4V4zM12 2v20M2.5 4L12 8l9.5-4' },
  { name: 'bi-briefcase', path: 'M6 7a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7zM9 5V3.5A1.5 1.5 0 0110.5 2h3A1.5 1.5 0 0115 3.5V5M2 10h20' },
  { name: 'bi-calendar', path: 'M3.5 4A1.5 1.5 0 015 2.5h14A1.5 1.5 0 0120.5 4v16a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 20V4zM16 1v3M8 1v3M3.5 8h17' },
  { name: 'bi-camera', path: 'M14.5 4l-1.12-2.25A2 2 0 0011.62 0h-3.24a2 2 0 00-1.76 1.06L5.5 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2h-2.5zM12 15a4 4 0 100-8 4 4 0 000 8z' },
  { name: 'bi-cart', path: 'M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.61L23 6H6' },
  { name: 'bi-chat', path: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z' },
  { name: 'bi-check', path: 'M20 6L9 17l-5-5' },
  { name: 'bi-clipboard', path: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z' },
  { name: 'bi-cloud', path: 'M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z' },
  { name: 'bi-code', path: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
  { name: 'bi-cpu', path: 'M4 4h16v16H4V4zm2 2v12h12V6H6zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3' },
  { name: 'bi-credit-card', path: 'M3 5a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2H3zM1 10h22' },
  { name: 'bi-cup', path: 'M4 2h12v10a4 4 0 01-4 4H8a4 4 0 01-4-4V2zM16 6h2a2 2 0 012 2v1a2 2 0 01-2 2h-2M6 18h8' },
  { name: 'bi-database', path: 'M12 2c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3zM4 5v14c0 1.657 3.582 3 8 3s8-1.343 8-3V5M4 9c0 1.657 3.582 3 8 3s8-1.343 8-3M4 14c0 1.657 3.582 3 8 3s8-1.343 8-3' },
  { name: 'bi-display', path: 'M2 4a1 1 0 011-1h18a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 20h8M12 16v4' },
  { name: 'bi-door', path: 'M3 2a1 1 0 011-1h16a1 1 0 011 1v19H3V2zm4 0v19M14 11a1 1 0 100-2 1 1 0 000 2z' },
  { name: 'bi-download', path: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3' },
  { name: 'bi-envelope', path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6' },
  { name: 'bi-exclamation', path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v5M12 16h.01' },
  { name: 'bi-eye', path: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 100-6 3 3 0 000 6z' },
  { name: 'bi-file', path: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6' },
  { name: 'bi-filter', path: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z' },
  { name: 'bi-flag', path: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7' },
  { name: 'bi-folder', path: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' },
  { name: 'bi-gear', path: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z' },
  { name: 'bi-gift', path: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z' },
  { name: 'bi-globe', path: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' },
  { name: 'bi-graph', path: 'M18 20V10M12 20V4M6 20v-6' },
  { name: 'bi-grid', path: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { name: 'bi-hammer', path: 'M15 12l-8.5 8.5c-.83.83-2.17.83-3 0s-.83-2.17 0-3L12 9M17.64 15L22 10.64 13.36 2 9 6.36' },
  { name: 'bi-headphones', path: 'M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z' },
  { name: 'bi-heart', path: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
  { name: 'bi-house', path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
  { name: 'bi-image', path: 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21' },
  { name: 'bi-inbox', path: 'M22 12h-6l-2 3H10l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z' },
  { name: 'bi-key', path: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zM15.5 7.5l1 1' },
];

export default function BootstrapIconsShowcase() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bootstrapIcons.filter(i => i.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <IconsLayout
      title="Bootstrap Icons"
      description="Referência visual de ícones Bootstrap — biblioteca oficial do Bootstrap com mais de 2.000 ícones SVG."
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input placeholder="Buscar ícones..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>
      <p className="text-xs text-muted-foreground">Exibindo {filtered.length} de {bootstrapIcons.length} ícones</p>
      <IconGrid>
        {filtered.map(icon => (
          <IconCell
            key={icon.name}
            name={icon.name}
            icon={
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={icon.path} />
              </svg>
            }
          />
        ))}
      </IconGrid>
    </IconsLayout>
  );
}
