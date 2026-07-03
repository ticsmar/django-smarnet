import { PagesLayout, PageSection } from './PagesLayout';
import { Mail, Linkedin, Github } from 'lucide-react';
import { ProfileCard } from '@/components/ui/cards';

interface TeamMember {
  name: string;
  role: string;
  dept: string;
  email: string;
  followers: number;
  following: number;
  bio: string;
  cover: string;
  avatar: string;
}

const team: TeamMember[] = [
  { name: 'Carlos Eduardo Mendes', role: 'CEO & Fundador', dept: 'Diretoria', email: 'carlos@smarnet.com', followers: 1284, following: 312, bio: 'Lidera a SmarNet há 12 anos com foco em inovação industrial e cultura de pessoas.', cover: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Ana Paula Ribeiro', role: 'CTO', dept: 'Tecnologia', email: 'ana@smarnet.com', followers: 942, following: 188, bio: 'Arquiteta de plataformas distribuídas, apaixonada por DX e times de alta performance.', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Roberto Silva', role: 'COO', dept: 'Operações', email: 'roberto@smarnet.com', followers: 612, following: 220, bio: 'Especialista em manufatura enxuta e operações industriais em escala global.', cover: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600', avatar: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Marina Costa', role: 'CFO', dept: 'Financeiro', email: 'marina@smarnet.com', followers: 530, following: 140, bio: 'Estrutura financeira e estratégica, com passagem por grandes grupos industriais.', cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600', avatar: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Pedro Santos', role: 'Head de Engenharia', dept: 'Tecnologia', email: 'pedro@smarnet.com', followers: 478, following: 305, bio: 'Constrói squads de engenharia que entregam software industrial de classe mundial.', cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Juliana Almeida', role: 'Head de Produto', dept: 'Tecnologia', email: 'juliana@smarnet.com', followers: 690, following: 410, bio: 'Conecta dores reais de chão de fábrica a uma visão de produto orientada a outcomes.', cover: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600', avatar: 'https://i.pravatar.cc/150?img=49' },
  { name: 'Fernando Lima', role: 'Head Comercial', dept: 'Comercial', email: 'fernando@smarnet.com', followers: 812, following: 502, bio: 'Lidera vendas consultivas para indústrias de médio e grande porte na América Latina.', cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600', avatar: 'https://i.pravatar.cc/150?img=68' },
  { name: 'Camila Rocha', role: 'Head de RH', dept: 'Pessoas', email: 'camila@smarnet.com', followers: 1102, following: 388, bio: 'Cuida da cultura, do bem-estar e do desenvolvimento de quem constrói a SmarNet.', cover: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600', avatar: 'https://i.pravatar.cc/150?img=45' },
];

const departments = ['Todos', 'Diretoria', 'Tecnologia', 'Comercial', 'Operações'];

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export default function TeamShowcase() {
  return (
    <PagesLayout title="Nossa Equipe" description="As pessoas por trás da SmarNet." category="Páginas">
      <PageSection>
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">Conheça quem faz a diferença</h2>
          <p className="text-sm text-muted-foreground mt-2">Profissionais experientes e apaixonados pelo que fazem.</p>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {departments.map((d, i) => (
              <button
                key={d}
                className={`px-4 h-8 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-muted-foreground hover:text-foreground'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {team.map((t) => (
            <ProfileCard
              key={t.name}
              name={t.name}
              role={`${t.role} · ${t.dept}`}
              avatarUrl={t.avatar}
              coverUrl={t.cover}
              stats={[
                { label: 'Seguidores', value: formatCount(t.followers) },
                { label: 'Seguindo', value: formatCount(t.following) },
              ]}
              bio={t.bio}
              socials={[
                { key: 'mail', label: 'E-mail', icon: Mail },
                { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                { key: 'github', label: 'GitHub', icon: Github },
              ]}
            />
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
