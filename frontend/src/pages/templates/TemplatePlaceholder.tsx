import { useLocation } from 'react-router-dom';

import { Construction, ArrowRight } from 'lucide-react';

export default function TemplatePlaceholder() {
  const location = useLocation();
  
  // Derive page title from URL path
  const segments = location.pathname.replace('/app/templates/', '').split('/');
  const title = segments
    .map(s => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
    .join(' › ');

  // Breadcrumb
  const breadcrumb = [
    { label: 'Templates', path: '/app/templates' },
    ...segments.map((s, i) => ({
      label: s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      path: '/app/templates/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight size={10} className="text-muted-foreground/40" />}
            <span className={i === breadcrumb.length - 1 ? 'text-foreground font-medium' : ''}>
              {item.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Construction size={40} className="text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground text-sm max-w-md text-center">
          Este template está em desenvolvimento. Em breve estará disponível com exemplos completos e código reutilizável.
        </p>
        <div className="mt-8 flex gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-medium text-muted-foreground">
            Template
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-xs font-medium text-primary">
            Em breve
          </span>
        </div>
      </div>
    </>
  );
}
