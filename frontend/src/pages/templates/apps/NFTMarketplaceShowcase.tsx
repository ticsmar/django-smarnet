import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Heart, Clock } from 'lucide-react';

const nfts = [
  { name: 'Cyber Punk #001', creator: 'ArtistX', price: '2.5 ETH', likes: 124, gradient: 'from-purple-500/30 to-pink-500/30' },
  { name: 'Abstract Wave', creator: 'DigitalArt', price: '1.8 ETH', likes: 89, gradient: 'from-blue-500/30 to-cyan-500/30' },
  { name: 'Neon City', creator: 'PixelMaster', price: '3.2 ETH', likes: 256, gradient: 'from-green-500/30 to-emerald-500/30' },
  { name: 'Space Explorer', creator: 'CosmicArt', price: '5.0 ETH', likes: 312, gradient: 'from-indigo-500/30 to-violet-500/30' },
  { name: 'Digital Dreams', creator: 'NeonStudio', price: '1.2 ETH', likes: 67, gradient: 'from-orange-500/30 to-red-500/30' },
  { name: 'Meta World', creator: 'VRCreator', price: '4.1 ETH', likes: 198, gradient: 'from-teal-500/30 to-blue-500/30' },
  { name: 'Pixel Art #42', creator: 'RetroPixel', price: '0.8 ETH', likes: 45, gradient: 'from-amber-500/30 to-yellow-500/30' },
  { name: 'Glitch Effect', creator: 'GlitchLab', price: '2.0 ETH', likes: 156, gradient: 'from-rose-500/30 to-pink-500/30' },
];

export default function NFTMarketplaceShowcase() {
  return (
    <AppsLayout title="Market Place" description="Marketplace de NFTs com coleções, busca e detalhes." category="NFT">
      <ShowcaseSection title="Marketplace">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar NFTs..." className="w-full pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            {['Categoria', 'Preço', 'Ordenar'].map(f => (
              <select key={f} className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground"><option>{f}</option></select>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nfts.map((nft, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/10 overflow-hidden hover:bg-muted/20 transition-colors cursor-pointer group">
                <div className={`aspect-square bg-gradient-to-br ${nft.gradient} flex items-center justify-center relative`}>
                  <span className="text-4xl font-bold text-foreground/20">#{i + 1}</span>
                  <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={14} className="text-foreground" />
                  </button>
                </div>
                <div className="p-3 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">{nft.name}</h4>
                  <p className="text-xs text-muted-foreground">por {nft.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">{nft.price}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Heart size={10} /> {nft.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
