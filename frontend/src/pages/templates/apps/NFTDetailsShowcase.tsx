import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Heart, Share2, Eye, Clock, Tag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NFTDetailsShowcase() {
  return (
    <AppsLayout title="NFT Details" description="Página de detalhes de NFT com histórico e propriedades." category="NFT">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-border">
          <span className="text-8xl font-bold text-foreground/20">#1</span>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Cyber Punk #001</h2>
            <p className="text-sm text-muted-foreground mt-1">Coleção: CyberPunk Collection • por ArtistX</p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye size={12} /> 1.2k views</span>
            <span className="flex items-center gap-1"><Heart size={12} /> 124 likes</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/10 space-y-2">
            <p className="text-xs text-muted-foreground">Preço atual</p>
            <p className="text-2xl font-bold text-foreground">2.5 ETH <span className="text-sm text-muted-foreground font-normal">≈ R$ 12.500</span></p>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1">Comprar Agora</Button>
              <Button variant="outline">Fazer Oferta</Button>
              <Button variant="outline" size="icon"><Heart size={16} /></Button>
              <Button variant="outline" size="icon"><Share2 size={16} /></Button>
            </div>
          </div>
          <ShowcaseSection title="Propriedades">
            <div className="grid grid-cols-3 gap-2">
              {[
                { trait: 'Background', value: 'Neon Purple', rarity: '12%' },
                { trait: 'Eyes', value: 'Laser Red', rarity: '5%' },
                { trait: 'Outfit', value: 'Cyber Jacket', rarity: '8%' },
                { trait: 'Hair', value: 'Mohawk', rarity: '15%' },
                { trait: 'Accessory', value: 'VR Headset', rarity: '3%' },
                { trait: 'Rarity', value: 'Legendary', rarity: '1%' },
              ].map((p, i) => (
                <div key={i} className="p-2 rounded-lg bg-primary/5 border border-primary/20 text-center">
                  <p className="text-[10px] text-primary font-medium">{p.trait}</p>
                  <p className="text-xs font-semibold text-foreground">{p.value}</p>
                  <p className="text-[10px] text-muted-foreground">{p.rarity}</p>
                </div>
              ))}
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Histórico">
            <div className="space-y-2">
              {[
                { event: 'Listado', from: 'ArtistX', price: '2.5 ETH', time: '2h atrás' },
                { event: 'Transferido', from: 'Collector01', price: '2.0 ETH', time: '5d atrás' },
                { event: 'Mintado', from: 'ArtistX', price: '0.5 ETH', time: '30d atrás' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag size={12} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{h.event}</span>
                    <span className="text-muted-foreground">por {h.from}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{h.price}</p>
                    <p className="text-muted-foreground">{h.time}</p>
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
