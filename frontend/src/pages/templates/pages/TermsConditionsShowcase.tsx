import { PagesLayout, PageSection } from './PagesLayout';
import { FileText, Download } from 'lucide-react';

const sections = [
  {
    title: '1. Aceitação dos Termos',
    body: 'Ao acessar e utilizar a plataforma SmarNet ERP, você concorda integralmente com os termos e condições aqui descritos. Caso não concorde com qualquer disposição, recomendamos não prosseguir com o uso dos serviços.',
  },
  {
    title: '2. Cadastro e Conta de Usuário',
    body: 'Para utilizar a plataforma, é necessário criar uma conta fornecendo informações verdadeiras e atualizadas. Você é responsável pela confidencialidade das suas credenciais e por todas as atividades realizadas em sua conta.',
  },
  {
    title: '3. Uso da Plataforma',
    body: 'O usuário compromete-se a utilizar a plataforma exclusivamente para fins legais, respeitando as leis aplicáveis e os direitos de terceiros. É vedado o uso para atividades fraudulentas, difamatórias ou que violem direitos autorais.',
  },
  {
    title: '4. Propriedade Intelectual',
    body: 'Todo o conteúdo, marcas, logotipos e softwares disponibilizados na plataforma são de propriedade exclusiva da SmarNet ou licenciados a ela. É proibida qualquer reprodução, distribuição ou modificação sem autorização prévia por escrito.',
  },
  {
    title: '5. Privacidade e Dados',
    body: 'O tratamento dos dados pessoais é regulado pela nossa Política de Privacidade, em conformidade com a LGPD (Lei nº 13.709/2018). Garantimos a confidencialidade e segurança das informações coletadas.',
  },
  {
    title: '6. Pagamentos e Cancelamento',
    body: 'As assinaturas serão cobradas conforme o plano contratado. O cancelamento pode ser feito a qualquer momento, com vigência ao final do ciclo já pago. Não há reembolso proporcional para períodos parciais.',
  },
  {
    title: '7. Limitação de Responsabilidade',
    body: 'A SmarNet não se responsabiliza por danos indiretos, lucros cessantes ou interrupções decorrentes do uso da plataforma, exceto nos casos previstos em lei.',
  },
  {
    title: '8. Alterações nos Termos',
    body: 'Reservamo-nos o direito de modificar estes termos a qualquer momento, mediante aviso prévio aos usuários. O uso contínuo após as alterações configura aceitação tácita.',
  },
];

export default function TermsConditionsShowcase() {
  return (
    <PagesLayout title="Termos e Condições" description="Regras de uso da plataforma SmarNet." category="Páginas">
      <PageSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/40 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><FileText size={20} /></div>
            <div>
              <p className="font-semibold text-foreground">Última atualização: 01/04/2025</p>
              <p className="text-xs text-muted-foreground">Vigência a partir de 15/04/2025</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 h-9 rounded-lg border border-border text-sm font-semibold hover:bg-surface-container-low">
            <Download size={14} /> Baixar PDF
          </button>
        </div>

        <div className="prose-sm max-w-none space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="font-display font-bold text-foreground text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low rounded-xl p-5 mt-8 text-xs text-muted-foreground">
          Em caso de dúvidas, entre em contato pelo e-mail <span className="text-primary font-semibold">juridico@smarnet.com.br</span>.
        </div>
      </PageSection>
    </PagesLayout>
  );
}
