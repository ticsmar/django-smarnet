import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

/* ================================================================
 * Typography — Documentação do sistema tipográfico
 * ================================================================ */

export default function TypographyPage() {
  return (
    <ComponentDoc
      summary="Sistema tipográfico com hierarquia de headings (Manrope), corpo (Inter), estilos, cores semânticas e código monospace."
      importPath="Tailwind classes — font-display, text-*, font-*"
    >
      {/* ---- Headings ---- */}
      <DocSection title="Headings" description="Família Manrope com pesos e tamanhos progressivos.">
        <VariantSection
          title="Display & Headings"
          preview={
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">Heading 1 — Display</h1>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">Heading 2 — Título de Página</h2>
              <h3 className="font-display text-2xl font-bold text-foreground">Heading 3 — Seção</h3>
              <h4 className="font-display text-xl font-semibold text-foreground">Heading 4 — Subseção</h4>
              <h5 className="font-display text-lg font-semibold text-foreground">Heading 5 — Card Title</h5>
              <h6 className="font-display text-base font-semibold text-foreground">Heading 6 — Label</h6>
            </div>
          }
          code={`<h1 className="font-display text-4xl font-extrabold tracking-tight">Heading 1 — Display</h1>
<h2 className="font-display text-3xl font-bold tracking-tight">Heading 2</h2>
<h3 className="font-display text-2xl font-bold">Heading 3</h3>
<h4 className="font-display text-xl font-semibold">Heading 4</h4>
<h5 className="font-display text-lg font-semibold">Heading 5</h5>
<h6 className="font-display text-base font-semibold">Heading 6</h6>`}
        />
      </DocSection>

      {/* ---- Body Text ---- */}
      <DocSection title="Body Text" description="Família Inter para textos de corpo e conteúdo.">
        <VariantSection
          title="Tamanhos de corpo"
          preview={
            <div className="space-y-3 max-w-2xl">
              <p className="text-lg text-foreground">Texto grande — Introduções e destaques em páginas de conteúdo.</p>
              <p className="text-base text-foreground">Texto base — Corpo principal, descrições e parágrafos regulares.</p>
              <p className="text-sm text-foreground">Texto pequeno — Tabelas, formulários, labels e informações secundárias.</p>
              <p className="text-xs text-foreground">Texto extra-pequeno — Rodapés, metadados, timestamps e notas.</p>
            </div>
          }
          code={`<p className="text-lg">Texto grande</p>
<p className="text-base">Texto base</p>
<p className="text-sm">Texto pequeno</p>
<p className="text-xs">Texto extra-pequeno</p>`}
        />
      </DocSection>

      {/* ---- Estilos ---- */}
      <DocSection title="Estilos de Texto" description="Pesos, decorações e transformações tipográficas.">
        <VariantSection
          title="Pesos & decorações"
          preview={
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
          }
          code={`<p className="text-sm font-bold">Negrito</p>
<p className="text-sm font-semibold">Semi-bold</p>
<p className="text-sm font-medium">Medium</p>
<p className="text-sm">Regular</p>
<p className="text-sm font-light">Light</p>
<p className="text-sm italic">Itálico</p>
<p className="text-sm underline">Sublinhado</p>
<p className="text-sm line-through text-muted-foreground">Riscado</p>
<p className="text-sm uppercase tracking-widest">Uppercase</p>`}
        />

        <VariantSection
          title="Eyebrow / Label"
          description="Padrão de micro-label usado em seções e categorias."
          preview={
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Eyebrow com accent</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Eyebrow muted</p>
            </div>
          }
          code={`<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
  Eyebrow / label
</p>`}
        />
      </DocSection>

      {/* ---- Cores Semânticas ---- */}
      <DocSection title="Cores Semânticas" description="Tokens de cor aplicados a texto para comunicar significado.">
        <VariantSection
          title="Tokens de cor"
          preview={
            <div className="space-y-2">
              <p className="text-sm text-foreground">text-foreground (padrão)</p>
              <p className="text-sm text-muted-foreground">text-muted-foreground (secundário)</p>
              <p className="text-sm text-primary">text-primary</p>
              <p className="text-sm text-secondary">text-secondary (teal)</p>
              <p className="text-sm text-tertiary">text-tertiary (amber)</p>
              <p className="text-sm text-destructive">text-destructive (erro)</p>
              <p className="text-sm text-status-success">text-status-success</p>
              <p className="text-sm text-status-warning">text-status-warning</p>
              <p className="text-sm text-status-info">text-status-info</p>
            </div>
          }
          code={`<p className="text-foreground">Padrão</p>
<p className="text-muted-foreground">Secundário</p>
<p className="text-primary">Primary</p>
<p className="text-secondary">Secondary</p>
<p className="text-tertiary">Tertiary</p>
<p className="text-destructive">Destructive</p>
<p className="text-status-success">Success</p>
<p className="text-status-warning">Warning</p>
<p className="text-status-info">Info</p>`}
        />
      </DocSection>

      {/* ---- Monospace ---- */}
      <DocSection title="Monospace / Código" description="Estilos para inline code e blocos de código.">
        <VariantSection
          title="Inline & Block code"
          preview={
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                Use <code className="bg-muted px-2 py-1 rounded-md text-xs font-mono text-foreground">inline code</code> para referências no texto.
              </p>
              <pre className="bg-muted p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto">
{`const config = {
  primary: "hsl(210 100% 13%)",
  secondary: "hsl(185 78% 25%)",
  font: "Manrope, Inter"
};`}
              </pre>
            </div>
          }
          code={`{/* Inline */}
<code className="bg-muted px-2 py-1 rounded-md text-xs font-mono">
  inline code
</code>

{/* Block */}
<pre className="bg-muted p-4 rounded-xl text-xs font-mono overflow-x-auto">
  {\`const config = { ... };\`}
</pre>`}
        />
      </DocSection>

      {/* ---- Listas ---- */}
      <DocSection title="Listas" description="Estilos para listas ordenadas e não-ordenadas.">
        <VariantSection
          title="Ordered & Unordered"
          preview={
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
          }
          code={`<ul className="list-disc list-inside text-sm space-y-1">
  <li>Item</li>
</ul>

<ol className="list-decimal list-inside text-sm space-y-1">
  <li>Etapa</li>
</ol>`}
        />
      </DocSection>

      {/* ---- Props / Referência ---- */}
      <PropsTable
        title="Referência de Classes"
        rows={classReference}
      />

      <UsageNote type="tip">
        Use sempre <code className="text-xs font-mono">font-display</code> para headings (Manrope) e deixe o corpo com a fonte padrão (Inter).
        Prefira tokens semânticos de cor (<code className="text-xs font-mono">text-foreground</code>, <code className="text-xs font-mono">text-muted-foreground</code>) em vez de cores fixas.
      </UsageNote>
    </ComponentDoc>
  );
}

/* ---------- Referência de classes ---------- */
const classReference: PropDef[] = [
  { name: 'font-display', type: 'class', description: 'Aplica a família Manrope (headings).' },
  { name: 'font-mono', type: 'class', description: 'Aplica a família monospace para código.' },
  { name: 'text-4xl…xs', type: 'class', description: 'Tamanho do texto (Tailwind scale).' },
  { name: 'font-extrabold…light', type: 'class', description: 'Peso da fonte.' },
  { name: 'tracking-tight', type: 'class', description: 'Letter-spacing negativo para headings grandes.' },
  { name: 'tracking-widest', type: 'class', description: 'Letter-spacing largo para labels uppercase.' },
  { name: 'text-foreground', type: 'token', description: 'Cor de texto principal (adaptável ao tema).' },
  { name: 'text-muted-foreground', type: 'token', description: 'Cor de texto secundário/muted.' },
  { name: 'text-accent', type: 'token', description: 'Cor de destaque (eyebrows, badges).' },
];
