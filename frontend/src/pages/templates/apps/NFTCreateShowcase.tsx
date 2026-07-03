import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, X } from 'lucide-react';

export default function NFTCreateShowcase() {
  return (
    <AppsLayout title="Create NFT" description="Formulário para mintagem de novo NFT." category="NFT">
      <ShowcaseSection title="Criar NFT">
        <div className="max-w-2xl space-y-5">
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center">
            <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">Upload da Arte</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, GIF, WEBP, MP4. Máx 100MB.</p>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Nome</Label>
            <Input placeholder="Ex: Cyber Punk #001" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Descrição</Label>
            <Textarea rows={3} placeholder="Descreva seu NFT..." className="resize-none" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1.5">Preço (ETH)</Label>
              <Input type="number" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Royalties (%)</Label>
              <Input type="number" placeholder="10" />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Coleção</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecione uma coleção" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cyberpunk">CyberPunk Collection</SelectItem>
                <SelectItem value="abstract">Abstract Art</SelectItem>
                <SelectItem value="nova">Nova coleção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Propriedades</Label>
            <div className="space-y-2">
              {[{ trait: 'Background', value: 'Neon Purple' }, { trait: 'Eyes', value: 'Laser Red' }].map((p, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={p.trait} readOnly className="flex-1 bg-muted/30" />
                  <Input value={p.value} readOnly className="flex-1 bg-muted/30" />
                  <button className="p-2 text-muted-foreground hover:text-foreground"><X size={14} /></button>
                </div>
              ))}
              <button className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus size={12} /> Adicionar propriedade</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button>Criar NFT</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
