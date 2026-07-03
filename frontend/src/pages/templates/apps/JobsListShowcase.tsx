import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, MapPin, Clock, DollarSign, Building2, Bookmark } from 'lucide-react';

const jobs = [
  { title: 'Full Stack Developer', company: 'TechCorp', location: 'São Paulo', type: 'Integral', salary: 'R$ 15-22k', posted: '2d', saved: false },
  { title: 'UX Designer Senior', company: 'DesignHub', location: 'Remoto', type: 'Integral', salary: 'R$ 12-18k', posted: '3d', saved: true },
  { title: 'DevOps Engineer', company: 'CloudFirst', location: 'Curitiba', type: 'Integral', salary: 'R$ 16-24k', posted: '5d', saved: false },
  { title: 'Product Manager', company: 'StartupX', location: 'Remoto', type: 'Integral', salary: 'R$ 18-25k', posted: '1d', saved: false },
  { title: 'Data Analyst', company: 'DataInsights', location: 'Rio de Janeiro', type: 'PJ', salary: 'R$ 10-15k', posted: '4d', saved: true },
  { title: 'Mobile Developer', company: 'AppFactory', location: 'Florianópolis', type: 'Híbrido', salary: 'R$ 13-20k', posted: '6d', saved: false },
];

export default function JobsListShowcase() {
  return (
    <AppsLayout title="Jobs List" description="Listagem de vagas com busca e filtros." category="Jobs">
      <ShowcaseSection title="Vagas Disponíveis">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar vagas..." className="w-full pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            {['Localização', 'Tipo', 'Salário'].map(f => (
              <select key={f} className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground">
                <option>{f}</option>
              </select>
            ))}
          </div>
          <div className="space-y-3">
            {jobs.map((j, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground">{j.title}</h4>
                  <p className="text-xs text-muted-foreground">{j.company}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={10} /> {j.location}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={10} /> {j.type}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><DollarSign size={10} /> {j.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground">{j.posted}</span>
                  <Bookmark size={16} className={j.saved ? 'fill-primary text-primary' : 'text-muted-foreground'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
