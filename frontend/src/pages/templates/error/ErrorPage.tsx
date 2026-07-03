import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  illustration: ReactNode;
}

export function ErrorPage({ code, title, description, illustration }: ErrorPageProps) {
  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Templates</span>
        <ChevronRight size={12} />
        <span>Error</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{code}</span>
      </nav>
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Erro {code}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="bg-surface-container rounded-2xl border border-border/40 p-10 lg:p-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">{illustration}</div>
          <p className="font-display text-7xl lg:text-8xl font-black text-primary mb-3 leading-none">{code}</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">{description}</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/app" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <Home size={14} /> Ir para o início
            </Link>
            <button onClick={() => window.history.back()} className="px-5 py-2.5 rounded-lg border border-border/60 text-sm font-semibold text-foreground hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
              <ArrowLeft size={14} /> Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
