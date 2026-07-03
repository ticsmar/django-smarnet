import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import {
  FormFileUpload,
  FileListItem,
  FormAvatarUpload,
  FormGrid,
} from '@/components/ui/forms';

export default function FileUploadsShowcase() {
  const [files, setFiles] = useState([
    { name: 'proposta-comercial.pdf', size: '2.4 MB', type: 'pdf', progress: 100 },
    { name: 'foto-equipamento.jpg', size: '1.8 MB', type: 'image', progress: 100 },
    { name: 'planilha-custos.xlsx', size: '540 KB', type: 'file', progress: 65 },
  ]);

  return (
    <FormsShowcaseLayout
      title="File Uploads"
      subtitle="Form Elements"
      description="Componentes de upload de arquivos com drag-and-drop e indicadores de progresso."
    >
      <ShowcaseSection title="Área de Upload (Drag & Drop)">
        <FormFileUpload helperText="PDF, JPG, PNG, XLSX até 10MB" />
      </ShowcaseSection>

      <ShowcaseSection title="Upload Compacto">
        <FormGrid cols={2}>
          <FormFileUpload
            variant="compact"
            label="Documento"
            buttonLabel="Selecionar"
            accept=".pdf,.doc,.docx"
          />
          <FormFileUpload
            variant="compact"
            label="Imagem"
            buttonLabel="Selecionar"
            accept="image/*"
            helperText="Nenhuma imagem selecionada"
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Lista de Arquivos com Progresso">
        <div className="space-y-3">
          {files.map((file, i) => (
            <FileListItem
              key={i}
              {...file}
              onRemove={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
            />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Upload de Avatar / Imagem">
        <FormAvatarUpload
          label="Foto do Produto"
          description="JPG ou PNG, máximo 5MB"
          onPick={() => {}}
          onRemove={() => {}}
        />
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
