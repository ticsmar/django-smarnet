import { PagesLayout, PageSection } from '../PagesLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon, Save, Send } from 'lucide-react';

export default function AddProductsShowcase() {
  return (
    <PagesLayout title="Adicionar Produto" description="Cadastre um novo produto na loja." category="Páginas / Ecommerce">
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          <PageSection title="Informações Básicas">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5">Nome do produto <span className="text-destructive">*</span></Label>
                <Input placeholder='Ex: Válvula reguladora 1/2"' />
              </div>
              <div>
                <Label className="text-xs mb-1.5">SKU</Label>
                <Input placeholder="COD-VR-12" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Código de barras</Label>
                <Input placeholder="789..." />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5">Descrição</Label>
                <Textarea rows={5} placeholder="Descreva o produto detalhadamente..." />
              </div>
            </div>
          </PageSection>

          <PageSection title="Preço e Estoque">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs mb-1.5">Preço de venda</Label>
                <Input placeholder="R$ 0,00" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Preço promocional</Label>
                <Input placeholder="R$ 0,00" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Estoque</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
          </PageSection>

          <PageSection title="Imagens">
            <div className="border-2 border-dashed border-border/60 rounded-xl p-10 text-center">
              <ImageIcon size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-semibold text-foreground">Arraste ou clique para enviar</p>
              <p className="text-xs text-muted-foreground mt-1">Até 6 imagens · JPG, PNG até 5MB cada</p>
            </div>
          </PageSection>
        </div>

        <aside className="space-y-4">
          <PageSection title="Categorização">
            <div className="space-y-3">
              <div>
                <Label className="text-xs mb-1.5">Categoria</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hidraulica">Hidráulica</SelectItem>
                    <SelectItem value="eletrica">Elétrica</SelectItem>
                    <SelectItem value="sensores">Sensores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Marca</Label>
                <Input placeholder="WEG, Tigre, etc." />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Tags</Label>
                <Input placeholder="Separe por vírgulas" />
              </div>
            </div>
          </PageSection>

          <div className="flex flex-col gap-2">
            <button className="h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2"><Send size={14} /> Publicar produto</button>
            <button className="h-11 rounded-lg border border-border text-sm font-semibold hover:bg-surface-container-low flex items-center justify-center gap-2"><Save size={14} /> Salvar rascunho</button>
          </div>
        </aside>
      </div>
    </PagesLayout>
  );
}
