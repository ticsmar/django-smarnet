import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

const Box = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-primary/15 text-primary px-3 py-2 rounded text-xs font-mono ${className}`}>{children}</div>
);

export default function FlexShowcase() {
  return (
    <UtilitiesLayout title="Flex" description="Utilitários de Flexbox para layout e alinhamento.">
      <ShowcaseSection title="Direção">
        <div className="space-y-4">
          <div>
            <code className="text-xs text-muted-foreground mb-2 block">flex-row</code>
            <div className="flex flex-row gap-2"><Box>1</Box><Box>2</Box><Box>3</Box></div>
          </div>
          <div>
            <code className="text-xs text-muted-foreground mb-2 block">flex-row-reverse</code>
            <div className="flex flex-row-reverse gap-2"><Box>1</Box><Box>2</Box><Box>3</Box></div>
          </div>
          <div>
            <code className="text-xs text-muted-foreground mb-2 block">flex-col</code>
            <div className="flex flex-col gap-2 max-w-[120px]"><Box>1</Box><Box>2</Box><Box>3</Box></div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Justify Content">
        <div className="space-y-3">
          {['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly'].map(j => (
            <div key={j}>
              <code className="text-xs text-muted-foreground mb-1 block">{j}</code>
              <div className={`flex ${j} gap-2 bg-muted/30 p-2 rounded-lg`}>
                <Box>A</Box><Box>B</Box><Box>C</Box>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Align Items">
        <div className="space-y-3">
          {['items-start', 'items-center', 'items-end', 'items-stretch', 'items-baseline'].map(a => (
            <div key={a}>
              <code className="text-xs text-muted-foreground mb-1 block">{a}</code>
              <div className={`flex ${a} gap-2 bg-muted/30 p-2 rounded-lg h-20`}>
                <Box className="py-1">A</Box><Box className="py-4">B</Box><Box className="py-2">C</Box>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Flex Wrap">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 20 }, (_, i) => (
            <Box key={i}>Item {i + 1}</Box>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Flex Grow / Shrink">
        <div className="flex gap-2">
          <Box className="flex-none">flex-none</Box>
          <Box className="flex-1">flex-1 (grow)</Box>
          <Box className="flex-none">flex-none</Box>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Gap">
        <div className="space-y-3">
          {['gap-1', 'gap-2', 'gap-4', 'gap-6', 'gap-8'].map(g => (
            <div key={g}>
              <code className="text-xs text-muted-foreground mb-1 block">{g}</code>
              <div className={`flex ${g}`}>
                <Box>A</Box><Box>B</Box><Box>C</Box><Box>D</Box>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
