import { DSSection, DSCard, DSSwatch, DSCode } from './_components';

export default function FoundationsPage() {
  return (
    <>
      {/* COLORS */}
      <DSSection
        title="Paleta de cores"
        description="Todas as cores são definidas em index.css como variáveis HSL e expostas via Tailwind como tokens semânticos."
      >
        <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Marca
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <DSSwatch name="Primary" token="primary" fg="primary-foreground" />
          <DSSwatch name="Primary Container" token="primary-container" fg="primary-foreground" />
          <DSSwatch name="Secondary" token="secondary" fg="secondary-foreground" />
          <DSSwatch name="Tertiary" token="tertiary" fg="tertiary-foreground" />
          <DSSwatch name="Accent" token="accent" fg="accent-foreground" />
        </div>

        <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Superfícies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <DSSwatch name="Background" token="background" />
          <DSSwatch name="Surface Low" token="surface-container-low" />
          <DSSwatch name="Surface" token="surface-container" />
          <DSSwatch name="Surface High" token="surface-container-high" />
          <DSSwatch name="Surface Highest" token="surface-container-highest" />
        </div>

        <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <DSSwatch name="Success" token="success" fg="success-foreground" />
          <DSSwatch name="Warning" token="warning" fg="warning-foreground" />
          <DSSwatch name="Alert" token="alert" fg="alert-foreground" />
          <DSSwatch name="Destructive" token="destructive" fg="destructive-foreground" />
          <DSSwatch name="Info" token="info" fg="info-foreground" />
        </div>
      </DSSection>

      {/* TYPOGRAPHY */}
      <DSSection
        title="Tipografia"
        description="Manrope para títulos (display) e Inter para texto corrido (body). Nunca usar fontes serifadas."
      >
        <DSCard className="space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Display 4XL · Manrope 800
            </p>
            <p className="font-display text-4xl font-extrabold tracking-tight">
              Painel Operacional
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Display 2XL · Manrope 700
            </p>
            <p className="font-display text-2xl font-bold">Indicadores em tempo real</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Body Base · Inter 400
            </p>
            <p className="font-body text-base">
              O sistema integra cadastros, produção e logística numa única superfície coesa.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Caption · Inter 500 uppercase
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Última sincronização há 3 minutos
            </p>
          </div>
        </DSCard>
      </DSSection>

      {/* SPACING */}
      <DSSection
        title="Espaçamento"
        description="Escala baseada em múltiplos de 4px. Use os tokens de Tailwind (gap-2, p-4, etc)."
      >
        <DSCard>
          <div className="space-y-2">
            {[
              { name: '1', px: '4px', cls: 'w-1' },
              { name: '2', px: '8px', cls: 'w-2' },
              { name: '4', px: '16px', cls: 'w-4' },
              { name: '6', px: '24px', cls: 'w-6' },
              { name: '8', px: '32px', cls: 'w-8' },
              { name: '12', px: '48px', cls: 'w-12' },
              { name: '16', px: '64px', cls: 'w-16' },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground w-12">{s.name}</span>
                <div className={`h-3 bg-accent rounded-full ${s.cls}`} />
                <span className="font-mono text-xs text-muted-foreground">{s.px}</span>
              </div>
            ))}
          </div>
        </DSCard>
      </DSSection>

      {/* RADIUS & SHADOW */}
      <DSSection title="Bordas, raios e sombras">
        <div className="grid md:grid-cols-2 gap-4">
          <DSCard>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Border radius
            </p>
            <div className="flex items-end gap-3">
              {[
                { l: 'sm', cls: 'rounded-sm' },
                { l: 'md', cls: 'rounded-md' },
                { l: 'lg', cls: 'rounded-lg' },
                { l: 'xl', cls: 'rounded-xl' },
                { l: '2xl', cls: 'rounded-2xl' },
                { l: '3xl', cls: 'rounded-3xl' },
              ].map((r) => (
                <div key={r.l} className="text-center">
                  <div className={`w-14 h-14 bg-primary ${r.cls}`} />
                  <p className="text-[10px] font-mono text-muted-foreground mt-2">{r.l}</p>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Sombras (elevação ambiente)
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-surface-container-low rounded-xl p-4 shadow-ambient">
                <p className="text-xs font-semibold">shadow-ambient</p>
              </div>
              <div className="flex-1 bg-surface-container-low rounded-xl p-4 shadow-ambient-lg">
                <p className="text-xs font-semibold">shadow-ambient-lg</p>
              </div>
            </div>
          </DSCard>
        </div>
      </DSSection>

      {/* USAGE */}
      <DSSection title="Uso em código">
        <DSCode>{`// ✓ Correto
<div className="bg-primary text-primary-foreground rounded-2xl p-6">
  <h3 className="font-display font-bold text-lg">KPI</h3>
</div>

// ✗ Incorreto
<div className="bg-blue-900 text-white rounded-2xl p-6">
  <h3 className="font-bold text-lg">KPI</h3>
</div>`}</DSCode>
      </DSSection>
    </>
  );
}
