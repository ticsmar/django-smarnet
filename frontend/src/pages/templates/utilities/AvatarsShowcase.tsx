import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sizes = [
  { label: 'XS', cls: 'h-6 w-6 text-[10px]' },
  { label: 'SM', cls: 'h-8 w-8 text-xs' },
  { label: 'MD', cls: 'h-10 w-10 text-sm' },
  { label: 'LG', cls: 'h-14 w-14 text-lg' },
  { label: 'XL', cls: 'h-20 w-20 text-2xl' },
];

const colors = [
  { bg: 'bg-primary/20 text-primary', initials: 'JD' },
  { bg: 'bg-success/20 text-success', initials: 'AB' },
  { bg: 'bg-warning/20 text-warning', initials: 'CD' },
  { bg: 'bg-destructive/20 text-destructive', initials: 'EF' },
  { bg: 'bg-accent/20 text-accent-foreground', initials: 'GH' },
];

export default function AvatarsShowcase() {
  return (
    <UtilitiesLayout title="Avatars" description="Componentes de avatar com diferentes tamanhos, formas e estados.">
      <ShowcaseSection title="Tamanhos">
        <div className="flex items-end gap-4">
          {sizes.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Avatar className={s.cls}>
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback className={s.cls}>JD</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Iniciais (Cores)">
        <div className="flex items-center gap-4">
          {colors.map(c => (
            <Avatar key={c.initials} className="h-12 w-12">
              <AvatarFallback className={`${c.bg} font-semibold`}>{c.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Quadrado (Rounded)">
        <div className="flex items-center gap-4">
          {['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full'].map(r => (
            <Avatar key={r} className={`h-12 w-12 ${r}`}>
              <AvatarImage src="https://i.pravatar.cc/150?img=3" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Grupo de Avatares">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map(i => (
            <Avatar key={i} className="h-10 w-10 border-2 border-background">
              <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">+5</AvatarFallback>
          </Avatar>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Status Online">
        <div className="flex items-center gap-6">
          {[
            { color: 'bg-success', label: 'Online' },
            { color: 'bg-warning', label: 'Ausente' },
            { color: 'bg-destructive', label: 'Ocupado' },
            { color: 'bg-muted-foreground', label: 'Offline' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`} />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background ${s.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
