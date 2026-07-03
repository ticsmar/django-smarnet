import { useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { ArrowDownUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pairs = [
  { from: 'BTC', to: 'BRL', rate: '300.000', change: '+2.5%', up: true },
  { from: 'ETH', to: 'BRL', rate: '5.000', change: '+1.8%', up: true },
  { from: 'SOL', to: 'BRL', rate: '150', change: '-0.5%', up: false },
  { from: 'BNB', to: 'BRL', rate: '1.200', change: '+3.2%', up: true },
  { from: 'ADA', to: 'BRL', rate: '2.50', change: '-1.2%', up: false },
  { from: 'MATIC', to: 'BRL', rate: '2.50', change: '+0.8%', up: true },
];

export default function CryptoExchangeShowcase() {
  const [fromCoin, setFromCoin] = useState('BTC');
  const [toCoin, setToCoin] = useState('ETH');

  return (
    <AppsLayout title="Currency Exchange" description="Troca de criptomoedas com cotações em tempo real." category="Crypto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ShowcaseSection title="Converter">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">De</label>
                <div className="flex gap-2">
                  <select value={fromCoin} onChange={e => setFromCoin(e.target.value)} className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground w-24">
                    {['BTC', 'ETH', 'SOL', 'BNB'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input type="number" placeholder="0.00" className="flex-1 px-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20"><ArrowDownUp size={16} /></button>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Para</label>
                <div className="flex gap-2">
                  <select value={toCoin} onChange={e => setToCoin(e.target.value)} className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground w-24">
                    {['ETH', 'BTC', 'SOL', 'USDT'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input type="number" readOnly placeholder="0.00" className="flex-1 px-3 py-2 rounded-lg bg-muted/10 border border-border text-sm text-muted-foreground" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/10 text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Taxa</span><span>0.1%</span></div>
                <div className="flex justify-between"><span>Estimativa</span><span>~15 segundos</span></div>
              </div>
              <Button className="w-full"><RefreshCw size={14} className="mr-1" /> Converter</Button>
            </div>
          </ShowcaseSection>
        </div>
        <div className="lg:col-span-2">
          <ShowcaseSection title="Cotações">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {['Par', 'Cotação (BRL)', 'Variação 24h'].map(h => (
                      <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pairs.map((p, i) => (
                    <tr key={i} className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{p.from[0]}</div>
                          <span className="font-medium text-foreground">{p.from}/{p.to}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium text-foreground">R$ {p.rate}</td>
                      <td className="py-3 px-3">
                        <span className={`text-xs font-medium ${p.up ? 'text-green-500' : 'text-destructive'}`}>{p.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </AppsLayout>
  );
}
