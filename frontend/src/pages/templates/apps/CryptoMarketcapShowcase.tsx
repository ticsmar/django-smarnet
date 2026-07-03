import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const TH = "px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low";
const TD = "px-6 py-4 text-sm text-foreground";

const coins = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 'R$ 300.000', marketcap: 'R$ 5.8T', volume: 'R$ 120B', change: '+2.5%', up: true },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 'R$ 5.000', marketcap: 'R$ 600B', volume: 'R$ 45B', change: '+1.8%', up: true },
  { rank: 3, name: 'BNB', symbol: 'BNB', price: 'R$ 1.200', marketcap: 'R$ 180B', volume: 'R$ 8B', change: '-0.3%', up: false },
  { rank: 4, name: 'Solana', symbol: 'SOL', price: 'R$ 150', marketcap: 'R$ 65B', volume: 'R$ 12B', change: '+4.2%', up: true },
  { rank: 5, name: 'XRP', symbol: 'XRP', price: 'R$ 3.50', marketcap: 'R$ 50B', volume: 'R$ 5B', change: '-1.5%', up: false },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: 'R$ 2.50', marketcap: 'R$ 30B', volume: 'R$ 3B', change: '+0.8%', up: true },
  { rank: 7, name: 'Polygon', symbol: 'MATIC', price: 'R$ 2.50', marketcap: 'R$ 22B', volume: 'R$ 2.5B', change: '+1.2%', up: true },
  { rank: 8, name: 'Avalanche', symbol: 'AVAX', price: 'R$ 120', marketcap: 'R$ 18B', volume: 'R$ 1.8B', change: '-2.1%', up: false },
];

export default function CryptoMarketcapShowcase() {
  return (
    <AppsLayout title="Marketcap" description="Ranking de criptomoedas por capitalização de mercado." category="Crypto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {[
          { label: 'Market Cap Total', value: 'R$ 7.2T', change: '+1.8%' },
          { label: 'Volume 24h', value: 'R$ 350B', change: '+5.2%' },
          { label: 'Dominância BTC', value: '52.3%', change: '-0.4%' },
          { label: 'Moedas Ativas', value: '12,450', change: '+24' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container rounded-xl border border-border/40 p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-bold text-foreground mt-1">{s.value}</p>
            <p className={`text-xs ${s.change.startsWith('+') ? 'text-status-success' : 'text-destructive'}`}>{s.change}</p>
          </div>
        ))}
      </div>
      <ShowcaseSection title="Ranking">
        <div className="space-y-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar moeda..." className="w-full pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="overflow-hidden rounded-xl border border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={TH}>#</th>
                    <th className={TH}>Moeda</th>
                    <th className={TH}>Preço</th>
                    <th className={TH}>Market Cap</th>
                    <th className={TH}>Volume 24h</th>
                    <th className={TH}>24h</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((c, i) => (
                    <tr key={c.rank} className={cn("hover:bg-muted/20 transition-colors cursor-pointer", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                      <td className={cn(TD, "text-xs text-muted-foreground")}>{c.rank}</td>
                      <td className={TD}>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{c.symbol[0]}</div>
                          <div>
                            <span className="font-medium text-xs">{c.name}</span>
                            <span className="text-[10px] text-muted-foreground ml-1">{c.symbol}</span>
                          </div>
                        </div>
                      </td>
                      <td className={cn(TD, "font-medium text-xs")}>{c.price}</td>
                      <td className={cn(TD, "text-xs text-muted-foreground")}>{c.marketcap}</td>
                      <td className={cn(TD, "text-xs text-muted-foreground")}>{c.volume}</td>
                      <td className={TD}>
                        <span className={`flex items-center gap-1 text-xs font-medium ${c.up ? 'text-status-success' : 'text-destructive'}`}>
                          {c.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {c.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
