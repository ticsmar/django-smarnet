import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormRichText } from '@/components/ui/forms';

export default function SunEditorShowcase() {
  return (
    <FormsShowcaseLayout
      title="Rich Text Editor"
      description="Editor de texto rico com formatação, alinhamento, listas e mais."
    >
      <ShowcaseSection title="Editor Completo">
        <FormRichText content="<p>Digite o conteúdo aqui. Use a barra de ferramentas para formatar o texto.</p><p>Suporta <strong>negrito</strong>, <em>itálico</em>, <u>sublinhado</u>, listas e muito mais.</p>" />
      </ShowcaseSection>

      <ShowcaseSection title="Editor Compacto">
        <FormRichText content="<p>Editor compacto para campos menores...</p>" minHeight="100px" />
      </ShowcaseSection>

      <ShowcaseSection title="Uso: Observações da NF">
        <FormRichText
          label="Observações da Nota Fiscal"
          description="Informações complementares que serão impressas na NF"
          content="<p>Informações complementares que serão impressas na Nota Fiscal...</p>"
          minHeight="120px"
        />
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
