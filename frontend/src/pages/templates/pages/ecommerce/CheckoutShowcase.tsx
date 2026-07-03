import { PagesLayout, PageSection } from '../PagesLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, Check } from 'lucide-react';

const steps = ['Endereço', 'Pagamento', 'Confirmação'];

export default function CheckoutShowcase() {
  return (
    <PagesLayout title="Finalizar Compra" description="Conclua sua compra em poucos passos." category="Páginas / Ecommerce">
      <PageSection>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= 1 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-muted-foreground'}`}>
                  {i < 1 ? <Check size={13} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${i <= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-px ${i < 1 ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        <PageSection title="Forma de Pagamento">
          <div className="space-y-2 mb-6">
            {['Cartão de crédito', 'Boleto bancário', 'PIX'].map((m, i) => (
              <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${i === 0 ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                <span className="text-sm font-semibold text-foreground flex-1">{m}</span>
                <CreditCard size={15} className="text-muted-foreground" />
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">Número do cartão</Label>
              <Input placeholder="0000 0000 0000 0000" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Nome impresso no cartão</Label>
              <Input placeholder="ANA P RIBEIRO" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1.5">Validade</Label>
                <Input placeholder="MM/AA" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">CVV</Label>
                <Input placeholder="123" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Parcelas</Label>
                <Input defaultValue="6x sem juros" readOnly />
              </div>
            </div>
          </div>
        </PageSection>

        <aside className="space-y-4">
          <PageSection>
            <p className="font-semibold text-foreground mb-4">Resumo do pedido</p>
            <div className="space-y-2 text-sm pb-4 border-b border-border/40">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal (3 itens)</span><span>R$ 1.910,00</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Frete</span><span>R$ 35,00</span></div>
              <div className="flex justify-between text-status-success"><span>Desconto</span><span>- R$ 95,00</span></div>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-foreground pt-4 mb-5">
              <span>Total</span>
              <span className="text-primary">R$ 1.850,00</span>
            </div>
            <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
              <Lock size={15} /> Pagar R$ 1.850,00
            </button>
            <p className="text-[10px] text-center text-muted-foreground mt-3">Pagamento 100% seguro</p>
          </PageSection>
        </aside>
      </div>
    </PagesLayout>
  );
}
