import { useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Grid3X3, LayoutList, Heart, Download, Eye, X } from 'lucide-react';

const categories = ['Todos', 'Natureza', 'Tecnologia', 'Arquitetura', 'Design'];
const images = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Imagem ${i + 1}`,
  category: categories[1 + (i % 4)],
  color: ['from-primary/40 to-secondary/40', 'from-secondary/40 to-accent/40', 'from-accent/40 to-primary/40', 'from-destructive/30 to-primary/40'][i % 4],
  likes: Math.floor(Math.random() * 500) + 50,
  views: Math.floor(Math.random() * 2000) + 200,
}));

export default function GalleryShowcase() {
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = images.filter(img =>
    (filter === 'Todos' || img.category === filter) &&
    img.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppsLayout title="Gallery" description="Galeria de imagens com filtros, busca, layouts e lightbox.">
      <ShowcaseSection title="Galeria">
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground hover:text-foreground'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar..." className="pl-8 pr-3 py-1.5 rounded-lg bg-muted/30 border border-border text-xs text-foreground w-40 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button onClick={() => setLayout('grid')} className={`p-1.5 ${layout === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Grid3X3 size={14} /></button>
                <button onClick={() => setLayout('masonry')} className={`p-1.5 ${layout === 'masonry' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><LayoutList size={14} /></button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className={layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'}>
            {filtered.map(img => (
              <div key={img.id} className={`group relative rounded-xl overflow-hidden border border-border cursor-pointer ${layout === 'masonry' ? 'break-inside-avoid' : ''}`}
                onClick={() => setLightbox(img.id)}>
                <div className={`bg-gradient-to-br ${img.color} ${layout === 'masonry' ? ['h-40', 'h-56', 'h-48', 'h-64'][img.id % 4] : 'aspect-square'} flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-foreground/20">{img.id}</span>
                </div>
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{img.title}</p>
                  <span className="text-xs text-muted-foreground">{img.category}</span>
                  <div className="flex gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Heart size={12} /> {img.likes}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Eye size={12} /> {img.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {lightbox !== null && (
            <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
              <button className="absolute top-4 right-4 text-foreground" onClick={() => setLightbox(null)}><X size={24} /></button>
              <div className="max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
                {(() => {
                  const img = images.find(i => i.id === lightbox)!;
                  return (
                    <div className="rounded-2xl overflow-hidden border border-border">
                      <div className={`bg-gradient-to-br ${img.color} h-80 flex items-center justify-center`}>
                        <span className="text-7xl font-bold text-foreground/20">{img.id}</span>
                      </div>
                      <div className="p-4 bg-surface-container flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{img.title}</p>
                          <p className="text-xs text-muted-foreground">{img.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-muted-foreground"><Heart size={16} /></button>
                          <button className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-muted-foreground"><Download size={16} /></button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
