import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Clock, Users, Gavel, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const auctions = [
  { name: 'Cosmic Genesis', creator: 'StarArt', current: '5.2 ETH', bids: 18, ends: '2h 15min', gradient: 'from-indigo-500/30 to-purple-500/30' },
  { name: 'Digital Phoenix', creator: 'FlameArt', current: '3.8 ETH', bids: 12, ends: '4h 30min', gradient: 'from-orange-500/30 to-red-500/30' },
  { name: 'Ocean Depths', creator: 'AquaPixel', current: '2.1 ETH', bids: 8, ends: '6h 45min', gradient: 'from-cyan-500/30 to-blue-500/30' },
  { name: 'Forest Spirit', creator: 'NatureDAO', current: '4.5 ETH', bids: 22, ends: '1h 10min', gradient: 'from-green-500/30 to-emerald-500/30' },
];

export default function NFTLiveAuctionShowcase() {
  return (
    <AppsLayout title="Live Auction" description="Leilões ao vivo de NFTs com lances em tempo real." category="NFT">
      <ShowcaseSection title="Leilões Ativos">
        <div className="grid md:grid-cols-2 gap-6">
          {auctions.map((a, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden group">
              <div className={`aspect-video bg-gradient-to-br ${a.gradient} flex items-center justify-center relative`}>
                <span className="text-5xl font-bold text-foreground/20">#{i + 1}</span>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-destructive/90 text-primary-foreground text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" /> LIVE
                </div>
              </div>
              <div className="p-4 space-y-3 bg-surface-container">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{a.name}</h4>
                    <p className="text-xs text-muted-foreground">por {a.creator}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-destructive font-medium">
                    <Clock size={12} /> {a.ends}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <p className="text-xs text-muted-foreground">Lance atual</p>
                    <p className="text-lg font-bold text-foreground">{a.current}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Lances</p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1"><Users size={12} /> {a.bids}</p>
                  </div>
                </div>
                <Button className="w-full"><Gavel size={14} className="mr-1" /> Fazer Lance</Button>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Histórico de Lances">
        <div className="space-y-2">
          {[
            { user: 'CryptoKing', amount: '5.2 ETH', item: 'Cosmic Genesis', time: '2min atrás' },
            { user: 'NFTCollector', amount: '5.0 ETH', item: 'Cosmic Genesis', time: '8min atrás' },
            { user: 'ArtLover99', amount: '4.5 ETH', item: 'Forest Spirit', time: '15min atrás' },
            { user: 'DigitalWhale', amount: '3.8 ETH', item: 'Digital Phoenix', time: '22min atrás' },
            { user: 'MetaTrader', amount: '4.2 ETH', item: 'Forest Spirit', time: '30min atrás' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{b.user[0]}</div>
              <div className="flex-1">
                <p className="text-sm text-foreground"><span className="font-semibold">{b.user}</span> fez lance de <span className="font-bold text-primary">{b.amount}</span></p>
                <p className="text-xs text-muted-foreground">{b.item} • {b.time}</p>
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
