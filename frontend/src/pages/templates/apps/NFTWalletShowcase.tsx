import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NFTWalletShowcase() {
  return (
    <AppsLayout title="Wallet Integration" description="Integração de carteira crypto com saldo e transações." category="NFT">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ShowcaseSection title="Carteira">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Wallet size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Saldo Total</p>
                <p className="text-2xl font-bold text-foreground">12.45 ETH</p>
                <p className="text-xs text-muted-foreground">≈ R$ 62.250,00</p>
              </div>
              <div className="flex items-center gap-2 justify-center bg-muted/20 rounded-lg p-2">
                <code className="text-xs text-muted-foreground">0x1a2b...9f0e</code>
                <button className="text-muted-foreground hover:text-foreground"><Copy size={12} /></button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs"><ArrowUpRight size={12} className="mr-1" /> Enviar</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs"><ArrowDownLeft size={12} className="mr-1" /> Receber</Button>
              </div>
            </div>
          </ShowcaseSection>
          <ShowcaseSection title="Tokens">
            <div className="space-y-2">
              {[
                { name: 'Ethereum', symbol: 'ETH', amount: '12.45', value: 'R$ 62.250' },
                { name: 'USDT', symbol: 'USDT', amount: '5,200', value: 'R$ 26.000' },
                { name: 'MATIC', symbol: 'MATIC', amount: '3,500', value: 'R$ 8.750' },
              ].map(t => (
                <div key={t.symbol} className="flex items-center justify-between p-2 rounded-lg bg-muted/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{t.symbol[0]}</div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.amount} {t.symbol}</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground">{t.value}</p>
                </div>
              ))}
            </div>
          </ShowcaseSection>
        </div>
        <div className="lg:col-span-2">
          <ShowcaseSection title="Transações Recentes">
            <div className="space-y-2">
              {[
                { type: 'out', desc: 'Compra NFT #42', amount: '-2.5 ETH', time: '1h atrás', hash: '0xabc...' },
                { type: 'in', desc: 'Venda NFT #18', amount: '+1.8 ETH', time: '3h atrás', hash: '0xdef...' },
                { type: 'out', desc: 'Gas Fee', amount: '-0.02 ETH', time: '3h atrás', hash: '0xghi...' },
                { type: 'in', desc: 'Royalty recebido', amount: '+0.15 ETH', time: '1d atrás', hash: '0xjkl...' },
                { type: 'out', desc: 'Mint NFT', amount: '-0.5 ETH', time: '2d atrás', hash: '0xmno...' },
                { type: 'in', desc: 'Depósito', amount: '+5.0 ETH', time: '3d atrás', hash: '0xpqr...' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'in' ? 'bg-green-500/10' : 'bg-destructive/10'}`}>
                    {tx.type === 'in' ? <ArrowDownLeft size={14} className="text-green-500" /> : <ArrowUpRight size={14} className="text-destructive" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${tx.type === 'in' ? 'text-green-500' : 'text-destructive'}`}>{tx.amount}</p>
                    <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary"><ExternalLink size={8} /> {tx.hash}</button>
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
