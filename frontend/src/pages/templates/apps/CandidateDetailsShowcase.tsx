import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { MapPin, Mail, Phone, Globe, Star, Download, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function CandidateDetailsShowcase() {
  return (
    <AppsLayout title="Candidate Details" description="Perfil detalhado do candidato com experiência, skills e avaliação." category="Jobs">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ShowcaseSection title="Perfil">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">CM</div>
              <div>
                <h3 className="text-base font-bold text-foreground">Carlos Mendes</h3>
                <p className="text-xs text-muted-foreground">Full Stack Developer Senior</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= 5 ? 'fill-amber-400 text-amber-400' : 'text-muted'} />)}
              </div>
              <div className="space-y-2 text-xs text-muted-foreground text-left">
                <p className="flex items-center gap-2"><MapPin size={12} /> São Paulo, SP</p>
                <p className="flex items-center gap-2"><Mail size={12} /> carlos@email.com</p>
                <p className="flex items-center gap-2"><Phone size={12} /> +55 11 9999-0000</p>
                <p className="flex items-center gap-2"><Globe size={12} /> carlosmendes.dev</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs">Contatar</Button>
                <Button size="sm" variant="outline" className="text-xs"><Download size={12} /></Button>
              </div>
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Skills">
            <div className="space-y-3">
              {[
                { name: 'React/TypeScript', level: 95 },
                { name: 'Node.js', level: 90 },
                { name: 'PostgreSQL', level: 85 },
                { name: 'Docker/DevOps', level: 75 },
                { name: 'Design UI/UX', level: 60 },
              ].map(s => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground font-medium">{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <Progress value={s.level} className="h-1.5" />
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ShowcaseSection title="Experiência Profissional">
            <div className="space-y-4">
              {[
                { role: 'Senior Full Stack Developer', company: 'TechCorp Brasil', period: '2022 - Atual', desc: 'Liderança técnica de squad com 5 devs. Arquitetura de microserviços em Node.js e React.' },
                { role: 'Full Stack Developer', company: 'StartupX', period: '2019 - 2022', desc: 'Desenvolvimento do produto principal. Stack React + Node.js + PostgreSQL.' },
                { role: 'Frontend Developer', company: 'AgênciaDigital', period: '2017 - 2019', desc: 'Criação de interfaces responsivas e SPAs com React e Vue.js.' },
              ].map((exp, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Briefcase size={14} className="text-primary" /></div>
                    {i < 2 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-4">
                    <h4 className="text-sm font-semibold text-foreground">{exp.role}</h4>
                    <p className="text-xs text-primary">{exp.company} • {exp.period}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Formação">
            <div className="space-y-3">
              {[
                { degree: 'Bacharelado em Ciência da Computação', school: 'USP - Universidade de São Paulo', year: '2013 - 2017' },
                { degree: 'MBA em Gestão de Projetos', school: 'FGV', year: '2020 - 2021' },
              ].map((ed, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/10">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0"><GraduationCap size={14} className="text-secondary" /></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{ed.degree}</h4>
                    <p className="text-xs text-muted-foreground">{ed.school} • {ed.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </AppsLayout>
  );
}
