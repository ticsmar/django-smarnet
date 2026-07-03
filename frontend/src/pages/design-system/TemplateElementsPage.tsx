import { Link } from 'react-router-dom';
import {
  AppWindow,
  Blocks,
  ChartColumn,
  FormInput,
  Grid3X3,
  LayoutTemplate,
  ListChecks,
  MessageSquareMore,
  PanelTop,
  TableProperties,
  WandSparkles,
} from 'lucide-react';
import { DSCard, DSSection } from './_components';

const templateGroups = [
  {
    title: 'UI Elements',
    description: 'Elementos visuais básicos e peças reutilizáveis do sistema.',
    icon: Blocks,
    items: [
      { label: 'Alerts', to: '/app/templates/ui/alerts' },
      { label: 'Badge', to: '/app/templates/ui/badge' },
      { label: 'Breadcrumb', to: '/app/templates/ui/breadcrumb' },
      { label: 'Buttons', to: '/app/templates/ui/buttons' },
      { label: 'Button Group', to: '/app/templates/ui/buttongroup' },
      { label: 'Cards', to: '/app/templates/ui/cards' },
      { label: 'Dropdowns', to: '/app/templates/ui/dropdowns' },
      { label: 'Images', to: '/app/templates/ui/images' },
      { label: 'Links', to: '/app/templates/ui/links' },
      { label: 'List Group', to: '/app/templates/ui/listgroup' },
      { label: 'Navs & Tabs', to: '/app/templates/ui/navstabs' },
      { label: 'Object Fit', to: '/app/templates/ui/objectfit' },
      { label: 'Pagination', to: '/app/templates/ui/pagination' },
      { label: 'Popovers', to: '/app/templates/ui/popovers' },
      { label: 'Progress', to: '/app/templates/ui/progress' },
      { label: 'Spinners', to: '/app/templates/ui/spinners' },
      { label: 'Toasts', to: '/app/templates/ui/toasts' },
      { label: 'Tooltips', to: '/app/templates/ui/tooltips' },
      { label: 'Typography', to: '/app/templates/ui/typography' },
    ],
  },
  {
    title: 'Forms',
    description: 'Entradas, seleção, validação, upload e composição de formulários.',
    icon: FormInput,
    items: [
      { label: 'Inputs', to: '/app/templates/forms/inputs' },
      { label: 'Checks & Radios', to: '/app/templates/forms/checksradios' },
      { label: 'Input Group', to: '/app/templates/forms/inputgroup' },
      { label: 'Form Select', to: '/app/templates/forms/formselect' },
      { label: 'Range Slider', to: '/app/templates/forms/rangeslider' },
      { label: 'Input Masks', to: '/app/templates/forms/inputmasks' },
      { label: 'File Uploads', to: '/app/templates/forms/fileuploads' },
      { label: 'Date & Time Picker', to: '/app/templates/forms/datetimepicker' },
      { label: 'Color Picker', to: '/app/templates/forms/colorpicker' },
      { label: 'Floating Labels', to: '/app/templates/forms/floatinglabels' },
      { label: 'Layouts', to: '/app/templates/forms/layouts' },
      { label: 'Sun Editor', to: '/app/templates/forms/suneditor' },
      { label: 'Validation', to: '/app/templates/forms/validation' },
      { label: 'Select2', to: '/app/templates/forms/select2' },
    ],
  },
  {
    title: 'Advanced UI',
    description: 'Padrões interativos avançados para navegação, overlays e microinterações.',
    icon: WandSparkles,
    items: [
      { label: 'Accordions', to: '/app/templates/advancedui/accordions' },
      { label: 'Carousel', to: '/app/templates/advancedui/carousel' },
      { label: 'Draggable Cards', to: '/app/templates/advancedui/draggablecards' },
      { label: 'Modals', to: '/app/templates/advancedui/modals' },
      { label: 'Navbar', to: '/app/templates/advancedui/navbar' },
      { label: 'Offcanvas', to: '/app/templates/advancedui/offcanvas' },
      { label: 'Placeholders', to: '/app/templates/advancedui/placeholders' },
      { label: 'Ratings', to: '/app/templates/advancedui/ratings' },
      { label: 'Swiper', to: '/app/templates/advancedui/swiperjs' },
    ],
  },
  {
    title: 'Utilities',
    description: 'Utilitários de layout, responsividade, espaçamento e helpers visuais.',
    icon: Grid3X3,
    items: [
      { label: 'Avatars', to: '/app/templates/utilities/avatars' },
      { label: 'Borders', to: '/app/templates/utilities/borders' },
      { label: 'Breakpoints', to: '/app/templates/utilities/breakpoints' },
      { label: 'Colors', to: '/app/templates/utilities/colors' },
      { label: 'Columns', to: '/app/templates/utilities/columns' },
      { label: 'Flex', to: '/app/templates/utilities/flex' },
      { label: 'Gutters', to: '/app/templates/utilities/gutters' },
      { label: 'Helpers', to: '/app/templates/utilities/helpers' },
      { label: 'Position', to: '/app/templates/utilities/position' },
      { label: 'Additional Content', to: '/app/templates/utilities/additionalcontent' },
    ],
  },
  {
    title: 'Tables, Icons e Charts',
    description: 'Catálogos de dados, bibliotecas de ícones e visualização analítica.',
    icon: ChartColumn,
    items: [
      { label: 'Basic Tables', to: '/app/templates/tables/tables' },
      { label: 'GridJS Tables', to: '/app/templates/tables/gridjs' },
      { label: 'DataTables', to: '/app/templates/tables/datatables' },
      { label: 'Remix Icons', to: '/app/templates/icons/remix' },
      { label: 'Tabler Icons', to: '/app/templates/icons/tabler' },
      { label: 'Bootstrap Icons', to: '/app/templates/icons/bootstrap' },
      { label: 'Feather Icons', to: '/app/templates/icons/feather' },
      { label: 'Lucide Icons', to: '/app/templates/icons/lucide' },
      { label: 'Chart.js', to: '/app/templates/charts/chartjs' },
      { label: 'ECharts', to: '/app/templates/charts/echart' },
      { label: 'Apex Line', to: '/app/templates/charts/apex/line' },
      { label: 'Apex Area', to: '/app/templates/charts/apex/area' },
      { label: 'Apex Column', to: '/app/templates/charts/apex/column' },
      { label: 'Apex Bar', to: '/app/templates/charts/apex/bar' },
      { label: 'Apex Mixed', to: '/app/templates/charts/apex/mixed' },
      { label: 'Apex Range Area', to: '/app/templates/charts/apex/rangearea' },
      { label: 'Apex Timeline', to: '/app/templates/charts/apex/timeline' },
      { label: 'Apex Funnel', to: '/app/templates/charts/apex/funnel' },
      { label: 'Apex Candlestick', to: '/app/templates/charts/apex/candlestick' },
      { label: 'Apex Boxplot', to: '/app/templates/charts/apex/boxplot' },
      { label: 'Apex Bubble', to: '/app/templates/charts/apex/bubble' },
      { label: 'Apex Scatter', to: '/app/templates/charts/apex/scatter' },
      { label: 'Apex Heatmap', to: '/app/templates/charts/apex/heatmap' },
      { label: 'Apex Treemap', to: '/app/templates/charts/apex/treemap' },
      { label: 'Apex Pie', to: '/app/templates/charts/apex/pie' },
      { label: 'Apex Radial Bar', to: '/app/templates/charts/apex/radialbar' },
      { label: 'Apex Radar', to: '/app/templates/charts/apex/radar' },
      { label: 'Apex Polar Area', to: '/app/templates/charts/apex/polararea' },
    ],
  },
  {
    title: 'Apps e Dashboards',
    description: 'Exemplos completos de produto para CRM, jobs, projetos, crypto e visão executiva.',
    icon: AppWindow,
    items: [
      { label: 'Full Calendar', to: '/app/templates/apps/fullcalendar' },
      { label: 'Gallery', to: '/app/templates/apps/gallery' },
      { label: 'Sweet Alerts', to: '/app/templates/apps/sweetalerts' },
      { label: 'Projects List', to: '/app/templates/apps/projects/list' },
      { label: 'Projects Overview', to: '/app/templates/apps/projects/overview' },
      { label: 'Projects Create', to: '/app/templates/apps/projects/create' },
      { label: 'Jobs Details', to: '/app/templates/apps/jobs/details' },
      { label: 'Jobs List', to: '/app/templates/apps/jobs/list' },
      { label: 'Job Post', to: '/app/templates/apps/jobs/jobpost' },
      { label: 'Search Company', to: '/app/templates/apps/jobs/searchcompany' },
      { label: 'Search Jobs', to: '/app/templates/apps/jobs/searchjobs' },
      { label: 'Search Candidate', to: '/app/templates/apps/jobs/searchcandidate' },
      { label: 'Candidate Details', to: '/app/templates/apps/jobs/candidatedetails' },
      { label: 'CRM Contacts', to: '/app/templates/apps/crm/contacts' },
      { label: 'CRM Companies', to: '/app/templates/apps/crm/companies' },
      { label: 'CRM Deals', to: '/app/templates/apps/crm/deals' },
      { label: 'CRM Leads', to: '/app/templates/apps/crm/leads' },
      { label: 'Crypto Transactions', to: '/app/templates/apps/crypto/transactions' },
      { label: 'Crypto Exchange', to: '/app/templates/apps/crypto/exchange' },
      { label: 'Crypto Buy/Sell', to: '/app/templates/apps/crypto/buysell' },
      { label: 'Crypto Marketcap', to: '/app/templates/apps/crypto/marketcap' },
      { label: 'Crypto Wallet', to: '/app/templates/apps/crypto/wallet' },
      { label: 'NFT Marketplace', to: '/app/templates/apps/nft/marketplace' },
      { label: 'NFT Details', to: '/app/templates/apps/nft/details' },
      { label: 'NFT Create', to: '/app/templates/apps/nft/create' },
      { label: 'NFT Wallet', to: '/app/templates/apps/nft/wallet' },
      { label: 'NFT Live Auction', to: '/app/templates/apps/nft/liveauction' },
      { label: 'Dashboard CRM', to: '/app/templates/dashboards/crm' },
      { label: 'Dashboard Jobs', to: '/app/templates/dashboards/jobs' },
      { label: 'Dashboard Sales', to: '/app/templates/dashboards/sales' },
      { label: 'Dashboard HRM', to: '/app/templates/dashboards/hrm' },
      { label: 'Dashboard Projects', to: '/app/templates/dashboards/projects' },
    ],
  },
  {
    title: 'Pages, Auth, Widgets e Error',
    description: 'Telas institucionais, fluxos de autenticação, widgets e estados de erro.',
    icon: LayoutTemplate,
    items: [
      { label: 'About Us', to: '/app/templates/pages/aboutus' },
      { label: 'Chat', to: '/app/templates/pages/chat' },
      { label: 'Contacts', to: '/app/templates/pages/contacts' },
      { label: 'Contact Us', to: '/app/templates/pages/contactus' },
      { label: 'Empty', to: '/app/templates/pages/empty' },
      { label: 'FAQs', to: '/app/templates/pages/faqs' },
      { label: 'Landing', to: '/app/templates/pages/landing' },
      { label: 'Jobs Landing', to: '/app/templates/pages/jobslanding' },
      { label: 'Notifications', to: '/app/templates/pages/notifications' },
      { label: 'Pricing', to: '/app/templates/pages/pricing' },
      { label: 'Profile', to: '/app/templates/pages/profile' },
      { label: 'Reviews', to: '/app/templates/pages/reviews' },
      { label: 'Team', to: '/app/templates/pages/team' },
      { label: 'Terms & Conditions', to: '/app/templates/pages/termsconditions' },
      { label: 'Timeline', to: '/app/templates/pages/timeline' },
      { label: 'To-do List', to: '/app/templates/pages/todolist' },
      { label: 'File Manager', to: '/app/templates/pages/filemanager/filemanager' },
      { label: 'Blog', to: '/app/templates/pages/blog/blog' },
      { label: 'Blog Details', to: '/app/templates/pages/blog/details' },
      { label: 'Create Blog', to: '/app/templates/pages/blog/create' },
      { label: 'Mail App', to: '/app/templates/pages/email/mailapp' },
      { label: 'Mail Editor', to: '/app/templates/pages/email/maileditor' },
      { label: 'Mail Settings', to: '/app/templates/pages/email/mailsettings' },
      { label: 'E-mail Interno (template)', to: '/app/templates/pages/email/interno' },
      { label: 'E-mail Externo (template)', to: '/app/templates/pages/email/externo' },
      { label: 'Create Invoice', to: '/app/templates/pages/invoice/create' },
      { label: 'Invoice Details', to: '/app/templates/pages/invoice/details' },
      { label: 'Invoice List', to: '/app/templates/pages/invoice/list' },
      { label: 'Products', to: '/app/templates/pages/ecommerce/products' },
      { label: 'Product Details', to: '/app/templates/pages/ecommerce/productdetails' },
      { label: 'Cart', to: '/app/templates/pages/ecommerce/cart' },
      { label: 'Checkout', to: '/app/templates/pages/ecommerce/checkout' },
      { label: 'Add Products', to: '/app/templates/pages/ecommerce/addproducts' },
      { label: 'Edit Products', to: '/app/templates/pages/ecommerce/editproducts' },
      { label: 'Orders', to: '/app/templates/pages/ecommerce/orders' },
      { label: 'Order Details', to: '/app/templates/pages/ecommerce/orderdetails' },
      { label: 'Product List', to: '/app/templates/pages/ecommerce/productlist' },
      { label: 'Wishlist', to: '/app/templates/pages/ecommerce/wishlist' },
      { label: 'Kanban', to: '/app/templates/task/kanban' },
      { label: 'List View', to: '/app/templates/task/listview' },
      { label: 'Task Details', to: '/app/templates/task/details' },
      { label: 'Sign In Basic', to: '/app/templates/auth/signin/basic' },
      { label: 'Sign In Cover', to: '/app/templates/auth/signin/cover' },
      { label: 'Sign Up Basic', to: '/app/templates/auth/signup/basic' },
      { label: 'Sign Up Cover', to: '/app/templates/auth/signup/cover' },
      { label: 'Reset Password Basic', to: '/app/templates/auth/resetpassword/basic' },
      { label: 'Reset Password Cover', to: '/app/templates/auth/resetpassword/cover' },
      { label: 'Create Password Basic', to: '/app/templates/auth/createpassword/basic' },
      { label: 'Create Password Cover', to: '/app/templates/auth/createpassword/cover' },
      { label: 'Lock Screen Basic', to: '/app/templates/auth/lockscreen/basic' },
      { label: 'Lock Screen Cover', to: '/app/templates/auth/lockscreen/cover' },
      { label: 'Two Step Basic', to: '/app/templates/auth/twostep/basic' },
      { label: 'Two Step Cover', to: '/app/templates/auth/twostep/cover' },
      { label: 'Coming Soon', to: '/app/templates/auth/comingsoon' },
      { label: 'Under Maintenance', to: '/app/templates/auth/undermaintenance' },
      { label: 'Widgets', to: '/app/templates/widgets' },
      { label: 'Error 401', to: '/app/templates/error/401' },
      { label: 'Error 404', to: '/app/templates/error/404' },
      { label: 'Error 500', to: '/app/templates/error/500' },
    ],
  },
];

export default function TemplateElementsPage() {
  const total = templateGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="space-y-10">
      <DSSection
        title="Cobertura dos templates"
        description="Mapa completo dos elementos e telas já disponíveis no projeto para acelerar referência, reaproveitamento e padronização dentro do /design-system."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <DSCard>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
                  Biblioteca expandida
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Todos os elementos disponíveis nos templates
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                  Esta área conecta o design system aos exemplos reais do produto: componentes, formulários,
                  páginas completas, dashboards, fluxos de autenticação e telas operacionais.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-container-high px-5 py-4 min-w-[180px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Itens mapeados
                </p>
                <p className="font-display text-3xl font-extrabold mt-2">{total}</p>
                <p className="text-xs text-muted-foreground mt-1">links organizados por categoria</p>
              </div>
            </div>
          </DSCard>

          <DSCard>
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Como usar</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><PanelTop size={16} className="mt-0.5 text-accent shrink-0" />Use os links para abrir a referência viva no app.</li>
                <li className="flex gap-2"><ListChecks size={16} className="mt-0.5 text-accent shrink-0" />Compare estrutura, densidade e padrões antes de criar novas telas.</li>
                <li className="flex gap-2"><MessageSquareMore size={16} className="mt-0.5 text-accent shrink-0" />Priorize reaproveitar antes de desenhar algo novo.</li>
              </ul>
            </div>
          </DSCard>
        </div>
      </DSSection>

      <DSSection
        title="Catálogo navegável"
        description="Referência centralizada dos grupos presentes nos templates do projeto."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {templateGroups.map((group) => {
            const Icon = group.icon;

            return (
              <DSCard key={group.title} className="!p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-lg font-bold">{group.title}</h3>
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                        {group.items.length} itens
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-lg bg-surface-container-high px-3 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </DSCard>
            );
          })}
        </div>
      </DSSection>

      <DSSection
        title="Diretriz de completude"
        description="Quando surgir um novo template útil ao ERP, ele deve entrar aqui para manter o design system como índice mestre de referência."
      >
        <DSCard>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <TableProperties size={18} className="mt-0.5 text-accent shrink-0" />
            <p>
              O <span className="text-foreground font-semibold">/design-system</span> agora passa a cobrir não só
              componentes isolados, mas também os elementos disponíveis nos templates reais do sistema.
              Isso facilita localizar padrões de UI, páginas compostas e exemplos executáveis em um único lugar.
            </p>
          </div>
        </DSCard>
      </DSSection>
    </div>
  );
}