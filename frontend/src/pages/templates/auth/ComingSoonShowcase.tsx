import { AuthLayout, AuthCard, AuthBrand } from './AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

function useCountdown() {
  const [time, setTime] = useState({ d: 30, h: 12, m: 45, s: 30 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => ({ ...p, s: p.s > 0 ? p.s - 1 : 59, m: p.s === 0 ? p.m - 1 : p.m }));
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function ComingSoonShowcase() {
  const time = useCountdown();
  const items = [
    { v: time.d, l: 'Dias' },
    { v: time.h, l: 'Horas' },
    { v: time.m, l: 'Minutos' },
    { v: time.s, l: 'Segundos' },
  ];
  return (
    <AuthLayout title="Coming Soon" description="Página de pré-lançamento com countdown e captura de leads">
      <div className="max-w-2xl mx-auto">
        <AuthCard className="text-center">
          <AuthBrand />
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Rocket size={28} className="text-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Em breve</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Estamos preparando uma nova versão da plataforma. Cadastre-se para ser avisado no lançamento.
          </p>
          <div className="grid grid-cols-4 gap-3 mb-8 max-w-md mx-auto">
            {items.map((item, i) => (
              <div key={i} className="bg-background rounded-xl border border-border/40 p-4">
                <p className="text-2xl font-display font-bold text-foreground">{String(item.v).padStart(2, '0')}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{item.l}</p>
              </div>
            ))}
          </div>
          <div className="max-w-sm mx-auto space-y-3">
            <Label className="text-xs mb-1.5 text-left block">Receba o aviso de lançamento</Label>
            <div className="flex gap-2">
              <Input type="email" placeholder="seu@email.com" />
              <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                Avisar-me
              </button>
            </div>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
