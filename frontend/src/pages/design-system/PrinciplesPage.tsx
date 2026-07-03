import { Factory, Eye, Zap, ShieldCheck } from 'lucide-react';
import { DSSection, DSCard, DoDont } from './_components';

const principles = [
  {
    icon: Factory,
    title: 'Industrial Calm',
    text: 'A interface evoca robustez fabril com calma visual. Superfícies quentes neutras, hierarquia clara, sem ruído.',
  },
  {
    icon: Eye,
    title: 'Hierarquia por superfície',
    text: 'A profundidade vem dos níveis de surface (low → highest), não de bordas finas. Bordas de 1px são proibidas.',
  },
  {
    icon: Zap,
    title: 'Densidade informacional',
    text: 'Telas de ERP carregam muita informação. Tipografia compacta, espaçamentos previsíveis, KPIs sempre visíveis.',
  },
  {
    icon: ShieldCheck,
    title: 'Consistência semântica',
    text: 'Todas as cores são tokens HSL definidos em index.css. Nenhum componente deve usar cores hardcoded.',
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <DSSection
        title="Filosofia"
        description="O SmarNet ERP fala a língua de chão de fábrica: claro, direto, robusto. Cada decisão visual reforça confiança operacional."
      >
        <div className="grid md:grid-cols-2 gap-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <DSCard key={title}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            </DSCard>
          ))}
        </div>
      </DSSection>

      <DSSection title="Regras invioláveis">
        <div className="grid md:grid-cols-2 gap-3">
          <DoDont type="do">
            Use tokens semânticos (<code className="font-mono text-xs">bg-primary</code>,{' '}
            <code className="font-mono text-xs">text-foreground</code>).
          </DoDont>
          <DoDont type="dont">
            Cores diretas: <code className="font-mono text-xs">bg-blue-500</code>,{' '}
            <code className="font-mono text-xs">text-white</code>.
          </DoDont>
          <DoDont type="do">
            Diferencie blocos com superfícies (<code className="font-mono text-xs">bg-surface-container</code>).
          </DoDont>
          <DoDont type="dont">Bordas de 1px para hierarquia. Use elevação por superfície.</DoDont>
          <DoDont type="do">
            Manrope para títulos (font-display), Inter para texto corrido (font-body).
          </DoDont>
          <DoDont type="dont">Fontes serifadas ou decorativas em qualquer contexto.</DoDont>
          <DoDont type="do">Status sempre via tokens success/warning/alert/destructive/info.</DoDont>
          <DoDont type="dont">
            Verde/amarelo/vermelho hardcoded — quebra o tema dark e a consistência semântica.
          </DoDont>
        </div>
      </DSSection>

      <DSSection title="Tom de voz visual">
        <DSCard>
          <ul className="space-y-3 text-sm">
            <li>
              <strong className="text-accent">Compacto, não apertado.</strong> Espaçamentos múltiplos
              de 4px; padding generoso em cards; gaps consistentes.
            </li>
            <li>
              <strong className="text-accent">Cor com propósito.</strong> Cores brilhantes (accent,
              status) usadas com parcimônia para guiar atenção.
            </li>
            <li>
              <strong className="text-accent">Movimento sutil.</strong> Animações de 200-400ms,
              easing suave. Nunca chamativo.
            </li>
            <li>
              <strong className="text-accent">Cantos arredondados generosos.</strong> Radius padrão
              1rem; cards 1.5rem; pills full.
            </li>
          </ul>
        </DSCard>
      </DSSection>
    </>
  );
}
