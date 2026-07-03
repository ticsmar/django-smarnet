import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { MapPin, Clock, DollarSign, Building2, Briefcase, Star, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JobDetailsShowcase() {
  return (
    <AppsLayout title="Job Details" description="Página detalhada de vaga de emprego com informações e ações." category="Jobs">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ShowcaseSection title="Detalhes da Vaga">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Desenvolvedor Full Stack Senior</h2>
                  <p className="text-sm text-muted-foreground">TechCorp Brasil • Publicado há 2 dias</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      { icon: MapPin, text: 'São Paulo, SP (Híbrido)' },
                      { icon: Clock, text: 'Tempo Integral' },
                      { icon: DollarSign, text: 'R$ 15.000 - R$ 22.000' },
                      { icon: Briefcase, text: '5+ anos' },
                    ].map((item, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <item.icon size={12} /> {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Candidatar-se</Button>
                <Button variant="outline" size="icon"><Bookmark size={16} /></Button>
                <Button variant="outline" size="icon"><Share2 size={16} /></Button>
              </div>
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-foreground">Descrição</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estamos buscando um desenvolvedor Full Stack Senior para liderar iniciativas técnicas no nosso produto principal.
                  Você trabalhará com React, Node.js e PostgreSQL em um ambiente ágil e colaborativo.
                </p>
                <h3 className="text-sm font-bold text-foreground">Requisitos</h3>
                <ul className="space-y-1.5">
                  {['React/TypeScript avançado', 'Node.js e APIs REST/GraphQL', 'PostgreSQL ou similar', 'Docker e CI/CD', 'Metodologias ágeis'].map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-bold text-foreground">Benefícios</h3>
                <div className="flex flex-wrap gap-2">
                  {['Vale Refeição', 'Plano de Saúde', 'Home Office', 'PLR', 'Gympass', 'Day Off Aniversário'].map(b => (
                    <span key={b} className="px-2 py-1 rounded-lg bg-muted/20 text-xs text-muted-foreground">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </ShowcaseSection>
        </div>
        <div className="space-y-6">
          <ShowcaseSection title="Sobre a Empresa">
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <Building2 size={28} className="text-primary" />
              </div>
              <h4 className="text-sm font-bold text-foreground">TechCorp Brasil</h4>
              <p className="text-xs text-muted-foreground">Tecnologia • 500-1000 funcionários</p>
              <div className="flex items-center justify-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} className={s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-muted'} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">4.2</span>
              </div>
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Vagas Similares">
            <div className="space-y-2">
              {['Backend Developer', 'Tech Lead', 'DevOps Engineer'].map(j => (
                <div key={j} className="p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">{j}</p>
                  <p className="text-xs text-muted-foreground">São Paulo • Tempo Integral</p>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </AppsLayout>
  );
}
