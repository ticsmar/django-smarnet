import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';

export default function TypographyShowcase() {
  return (
    <UIShowcaseLayout title="Typography" description="Sistema tipográfico com hierarquia, tamanhos e estilos.">
      <ShowcaseSection title="Headings (Manrope)">
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-extrabold text-foreground">Heading 1 — Display</h1>
          <h2 className="font-display text-3xl font-bold text-foreground">Heading 2 — Título de Página</h2>
          <h3 className="font-display text-2xl font-bold text-foreground">Heading 3 — Seção</h3>
          <h4 className="font-display text-xl font-semibold text-foreground">Heading 4 — Subseção</h4>
          <h5 className="font-display text-lg font-semibold text-foreground">Heading 5 — Card Title</h5>
          <h6 className="font-display text-base font-semibold text-foreground">Heading 6 — Label</h6>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Body Text (Inter)">
        <div className="space-y-3 max-w-2xl">
          <p className="text-lg text-foreground">Texto grande — Usado para introduções e destaques em páginas de conteúdo.</p>
          <p className="text-base text-foreground">Texto base — Corpo principal de textos, descrições e parágrafos regulares no sistema.</p>
          <p className="text-sm text-foreground">Texto pequeno — Usado em tabelas, formulários, labels de campos e informações secundárias.</p>
          <p className="text-xs text-foreground">Texto extra-pequeno — Rodapés, metadados, timestamps e notas de rodapé.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estilos de Texto">
        <div className="space-y-2">
          <p className="text-sm font-bold text-foreground">Texto em negrito (bold)</p>
          <p className="text-sm font-semibold text-foreground">Texto semi-bold</p>
          <p className="text-sm font-medium text-foreground">Texto medium</p>
          <p className="text-sm text-foreground">Texto regular</p>
          <p className="text-sm font-light text-foreground">Texto light</p>
          <p className="text-sm italic text-foreground">Texto em itálico</p>
          <p className="text-sm underline text-foreground">Texto sublinhado</p>
          <p className="text-sm line-through text-muted-foreground">Texto riscado</p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Texto uppercase tracking</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cores Semânticas">
        <div className="space-y-2">
          <p className="text-sm text-foreground">Texto foreground (padrão)</p>
          <p className="text-sm text-muted-foreground">Texto muted-foreground (secundário)</p>
          <p className="text-sm text-primary">Texto primary</p>
          <p className="text-sm text-secondary">Texto secondary (teal)</p>
          <p className="text-sm text-tertiary">Texto tertiary (amber)</p>
          <p className="text-sm text-destructive">Texto destructive (erro)</p>
          <p className="text-sm text-status-success">Texto success</p>
          <p className="text-sm text-status-warning">Texto warning</p>
          <p className="text-sm text-status-info">Texto info</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Monospace / Código">
        <div className="space-y-3">
          <code className="bg-muted px-2 py-1 rounded-md text-xs font-mono text-foreground">inline code</code>
          <pre className="bg-muted p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto mt-2">
{`const config = {
  primary: "hsl(210 100% 13%)",
  secondary: "hsl(185 78% 25%)",
  font: "Manrope, Inter"
};`}
          </pre>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Listas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Lista não ordenada</p>
            <ul className="list-disc list-inside text-sm text-foreground space-y-1">
              <li>Primeiro item da lista</li>
              <li>Segundo item da lista</li>
              <li>Terceiro item da lista</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Lista ordenada</p>
            <ol className="list-decimal list-inside text-sm text-foreground space-y-1">
              <li>Etapa de configuração</li>
              <li>Etapa de validação</li>
              <li>Etapa de aprovação</li>
            </ol>
          </div>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
