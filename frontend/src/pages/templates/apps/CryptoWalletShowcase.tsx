import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const portfolio = [
  { coin: 'BTC', name: 'Bitcoin', amount: '0.85', value: 'R$ 255.000', pct: 52, change: '+12.5%' },
  { coin: 'ETH', name: 'Ethereum', amount: '15.2', value: 'R$ 76.000', pct: 25, change: '+8.3%' },
  { coin: 'SOL', name: 'Solana', amount: '320', value: 'R$ 48.000', pct: 13, change: '+22.1%' },
  { coin: 'USDT', name: 'Tether', amount: '25,000', value: 'R$ 25.000', pct: 7, change: '0.0%' },
  { coin: 'MATIC', name: 'Polygon', amount: '8,500', value: 'R$ 21.250', pct: 3, change: '-3.2%' },
];

export default function CryptoWalletShowcase() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <AppsLayout title="Wallet" description="Carteira de criptomoedas com portfólio e alocação." category="Crypto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ShowcaseSection title="Saldo">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Wallet size={24} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-xs text-muted-foreground">Saldo Total</p>
                  <button onClick={() => setShowBalance(!showBalance)} className="text-muted-foreground">
                    {showBalance ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">{showBalance ? 'R$ 425.250' : '••••••'}</p>
                <p className="text-xs text-green-500">+5.8% este mês</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs"><ArrowUpRight size={12} className="mr-1" /> Enviar</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs"><ArrowDownLeft size={12} className="mr-1" /> Receber</Button>
                <Button size="sm" variant="outline" className="text-xs"><Plus size={12} /></Button>
              </div>
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Alocação">
            <div className="space-y-3">
              {portfolio.map(p => (
                <div key={p.coin} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{p.coin}</span>
                    <span className="text-muted-foreground">{p.pct}%</span>
                  </div>
                  <Progress value={p.pct} className="h-1.5" />
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>
        <div className="lg:col-span-2">
          <ShowcaseSection title="Portfólio">
            <div className="space-y-3">
              {portfolio.map(p => (
                <div key={p.coin} className="flex items-center gap-4 p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{p.coin[0]}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{p.name}</h4>
                    <p className="text-xs text-muted-foreground">{p.amount} {p.coin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{showBalance ? p.value : '••••'}</p>
                    <p className={`text-xs ${p.change.startsWith('+') ? 'text-green-500' : p.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>{p.change}</p>
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
