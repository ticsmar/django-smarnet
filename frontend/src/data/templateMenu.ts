import {
  LayoutDashboard, FileText, CheckSquare, Fingerprint, AlertTriangle,
  Box, Medal, File, PartyPopper, Gift, Grid3X3, Menu,
  Table2, BarChart3, Map, Store
} from 'lucide-react';

export interface TemplateMenuItem {
  label: string;
  path?: string;
  badge?: string;
  badgeColor?: string;
  children?: TemplateMenuItem[];
}

export interface TemplateMenuGroup {
  category: string;
  items: {
    label: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
    path?: string;
    children?: TemplateMenuItem[];
  }[];
}

export const templateMenuGroups: TemplateMenuGroup[] = [
  {
    category: 'MAIN',
    items: [
      {
        label: 'Dashboards',
        icon: LayoutDashboard,
        badge: '12',
        badgeColor: 'warning',
        children: [
          { label: 'CRM', path: '/app/templates/dashboards/crm' },
          { label: 'Ecommerce', path: '/app/templates/dashboards/ecommerce' },
          { label: 'Crypto', path: '/app/templates/dashboards/crypto' },
          { label: 'Jobs', path: '/app/templates/dashboards/jobs' },
          { label: 'NFT', path: '/app/templates/dashboards/nft' },
          { label: 'Sales', path: '/app/templates/dashboards/sales' },
          { label: 'Analytics', path: '/app/templates/dashboards/analytics' },
          { label: 'Projects', path: '/app/templates/dashboards/projects' },
          { label: 'HRM', path: '/app/templates/dashboards/hrm' },
          { label: 'Stocks', path: '/app/templates/dashboards/stocks' },
          { label: 'Courses', path: '/app/templates/dashboards/courses' },
          { label: 'Personal', path: '/app/templates/dashboards/personal' },
        ],
      },
    ],
  },
  {
    category: 'PAGES',
    items: [
      {
        label: 'Pages',
        icon: FileText,
        badge: 'New',
        badgeColor: 'secondary',
        children: [
          { label: 'About Us', path: '/app/templates/pages/aboutus' },
          {
            label: 'Blog',
            children: [
              { label: 'Blog', path: '/app/templates/pages/blog/blog' },
              { label: 'Blog Details', path: '/app/templates/pages/blog/details' },
              { label: 'Create Blog', path: '/app/templates/pages/blog/create' },
            ],
          },
          { label: 'Chat', path: '/app/templates/pages/chat' },
          { label: 'Contacts', path: '/app/templates/pages/contacts' },
          { label: 'Contact Us', path: '/app/templates/pages/contactus' },
          {
            label: 'Ecommerce',
            children: [
              { label: 'Add Products', path: '/app/templates/pages/ecommerce/addproducts' },
              { label: 'Cart', path: '/app/templates/pages/ecommerce/cart' },
              { label: 'Checkout', path: '/app/templates/pages/ecommerce/checkout' },
              { label: 'Edit Products', path: '/app/templates/pages/ecommerce/editproducts' },
              { label: 'Order Details', path: '/app/templates/pages/ecommerce/orderdetails' },
              { label: 'Orders', path: '/app/templates/pages/ecommerce/orders' },
              { label: 'Products', path: '/app/templates/pages/ecommerce/products' },
              { label: 'Product Details', path: '/app/templates/pages/ecommerce/productdetails' },
              { label: 'Products List', path: '/app/templates/pages/ecommerce/productlist' },
              { label: 'Wishlist', path: '/app/templates/pages/ecommerce/wishlist' },
            ],
          },
          {
            label: 'Email',
            children: [
              { label: 'Mail App', path: '/app/templates/pages/email/mailapp' },
              { label: 'Mail Editor', path: '/app/templates/pages/email/maileditor' },
              { label: 'Mail Settings', path: '/app/templates/pages/email/mailsettings' },
              { label: 'E-mail Interno', path: '/app/templates/pages/email/interno' },
              { label: 'E-mail Externo', path: '/app/templates/pages/email/externo' },
            ],
          },
          { label: 'Empty', path: '/app/templates/pages/empty' },
          { label: "FAQ's", path: '/app/templates/pages/faqs' },
          {
            label: 'File Manager',
            children: [
              { label: 'File Manager', path: '/app/templates/pages/filemanager/filemanager' },
            ],
          },
          {
            label: 'Invoice',
            children: [
              { label: 'Create Invoice', path: '/app/templates/pages/invoice/create' },
              { label: 'Invoice Details', path: '/app/templates/pages/invoice/details' },
              { label: 'Invoice List', path: '/app/templates/pages/invoice/list' },
            ],
          },
          { label: 'Landing', path: '/app/templates/pages/landing' },
          { label: 'Jobs Landing', path: '/app/templates/pages/jobslanding' },
          { label: 'Notifications', path: '/app/templates/pages/notifications' },
          { label: 'Pricing', path: '/app/templates/pages/pricing' },
          { label: 'Profile', path: '/app/templates/pages/profile' },
          { label: 'Profile — Edit', path: '/app/templates/pages/profile-edit' },
          { label: 'Reviews', path: '/app/templates/pages/reviews' },
          { label: 'Team', path: '/app/templates/pages/team' },
          { label: 'Terms & Conditions', path: '/app/templates/pages/termsconditions' },
          { label: 'Timeline', path: '/app/templates/pages/timeline' },
          { label: 'To Do List', path: '/app/templates/pages/todolist' },
        ],
      },
      {
        label: 'Task',
        icon: CheckSquare,
        badge: 'New',
        badgeColor: 'secondary',
        children: [
          { label: 'Kanban Board', path: '/app/templates/task/kanban' },
          { label: 'List View', path: '/app/templates/task/listview' },
          { label: 'Task Details', path: '/app/templates/task/details' },
        ],
      },
      {
        label: 'Authentication',
        icon: Fingerprint,
        children: [
          { label: 'Coming Soon', path: '/app/templates/auth/comingsoon' },
          {
            label: 'Create Password',
            children: [
              { label: 'Basic', path: '/app/templates/auth/createpassword/basic' },
              { label: 'Cover', path: '/app/templates/auth/createpassword/cover' },
            ],
          },
          {
            label: 'Lock Screen',
            children: [
              { label: 'Basic', path: '/app/templates/auth/lockscreen/basic' },
              { label: 'Cover', path: '/app/templates/auth/lockscreen/cover' },
            ],
          },
          {
            label: 'Reset Password',
            children: [
              { label: 'Basic', path: '/app/templates/auth/resetpassword/basic' },
              { label: 'Cover', path: '/app/templates/auth/resetpassword/cover' },
            ],
          },
          {
            label: 'Sign Up',
            children: [
              { label: 'Basic', path: '/app/templates/auth/signup/basic' },
              { label: 'Cover', path: '/app/templates/auth/signup/cover' },
            ],
          },
          {
            label: 'Sign In',
            children: [
              { label: 'Basic', path: '/app/templates/auth/signin/basic' },
              { label: 'Cover', path: '/app/templates/auth/signin/cover' },
            ],
          },
          {
            label: 'Two Step Verification',
            children: [
              { label: 'Basic', path: '/app/templates/auth/twostep/basic' },
              { label: 'Cover', path: '/app/templates/auth/twostep/cover' },
            ],
          },
          { label: 'Under Maintenance', path: '/app/templates/auth/undermaintenance' },
        ],
      },
      {
        label: 'Error',
        icon: AlertTriangle,
        children: [
          { label: '401 - Error', path: '/app/templates/error/401' },
          { label: '404 - Error', path: '/app/templates/error/404' },
          { label: '500 - Error', path: '/app/templates/error/500' },
        ],
      },
    ],
  },
  {
    category: 'GENERAL',
    items: [
      {
        label: 'UI Elements',
        icon: Box,
        children: [
          { label: 'Alerts', path: '/app/templates/ui/alerts' },
          { label: 'Badge', path: '/app/templates/ui/badge' },
          { label: 'Breadcrumb', path: '/app/templates/ui/breadcrumb' },
          { label: 'Buttons', path: '/app/templates/ui/buttons' },
          { label: 'Button Group', path: '/app/templates/ui/buttongroup' },
          { label: 'Cards', path: '/app/templates/ui/cards' },
          { label: 'Dropdowns', path: '/app/templates/ui/dropdowns' },
          { label: 'Images & Figures', path: '/app/templates/ui/images' },
          { label: 'Links & Interactions', path: '/app/templates/ui/links' },
          { label: 'List Group', path: '/app/templates/ui/listgroup' },
          { label: 'Navs & Tabs', path: '/app/templates/ui/navstabs' },
          { label: 'Object Fit', path: '/app/templates/ui/objectfit' },
          { label: 'Pagination', path: '/app/templates/ui/pagination' },
          { label: 'Panels', path: '/app/templates/ui/panels' },
          { label: 'Popovers', path: '/app/templates/ui/popovers' },
          { label: 'Progress', path: '/app/templates/ui/progress' },
          { label: 'Spinners', path: '/app/templates/ui/spinners' },
          { label: 'Toasts', path: '/app/templates/ui/toasts' },
          { label: 'Tooltips', path: '/app/templates/ui/tooltips' },
          { label: 'Typography', path: '/app/templates/ui/typography' },
        ],
      },
      {
        label: 'Utilities',
        icon: Medal,
        children: [
          { label: 'Avatars', path: '/app/templates/utilities/avatars' },
          { label: 'Borders', path: '/app/templates/utilities/borders' },
          { label: 'Breakpoints', path: '/app/templates/utilities/breakpoints' },
          { label: 'Colors', path: '/app/templates/utilities/colors' },
          { label: 'Columns', path: '/app/templates/utilities/columns' },
          { label: 'Flex', path: '/app/templates/utilities/flex' },
          { label: 'Gutters', path: '/app/templates/utilities/gutters' },
          { label: 'Helpers', path: '/app/templates/utilities/helpers' },
          { label: 'Position', path: '/app/templates/utilities/position' },
          { label: 'Additional Content', path: '/app/templates/utilities/additionalcontent' },
        ],
      },
      {
        label: 'Forms',
        icon: File,
        children: [
          {
            label: 'Form Elements',
            children: [
              { label: 'Inputs', path: '/app/templates/forms/inputs' },
              { label: 'Checks & Radios', path: '/app/templates/forms/checksradios' },
              { label: 'Input Group', path: '/app/templates/forms/inputgroup' },
              { label: 'Form Select', path: '/app/templates/forms/formselect' },
              { label: 'Range Slider', path: '/app/templates/forms/rangeslider' },
              { label: 'Input Masks', path: '/app/templates/forms/inputmasks' },
              { label: 'File Uploads', path: '/app/templates/forms/fileuploads' },
              { label: 'Date, Time Picker', path: '/app/templates/forms/datetimepicker' },
              { label: 'Color Pickers', path: '/app/templates/forms/colorpicker' },
            ],
          },
          { label: 'Floating Labels', path: '/app/templates/forms/floatinglabels' },
          { label: 'Form Layouts', path: '/app/templates/forms/layouts' },
          { label: 'Sun Editor', path: '/app/templates/forms/suneditor' },
          { label: 'Validation', path: '/app/templates/forms/validation' },
          { label: 'Select2', path: '/app/templates/forms/select2' },
        ],
      },
      {
        label: 'Advanced UI',
        icon: PartyPopper,
        children: [
          { label: 'Accordions & Collapse', path: '/app/templates/advancedui/accordions' },
          { label: 'Carousel', path: '/app/templates/advancedui/carousel' },
          { label: 'Draggable Cards', path: '/app/templates/advancedui/draggablecards' },
          { label: 'Modals & Closes', path: '/app/templates/advancedui/modals' },
          { label: 'Navbar', path: '/app/templates/advancedui/navbar' },
          { label: 'Offcanvas', path: '/app/templates/advancedui/offcanvas' },
          { label: 'Placeholders', path: '/app/templates/advancedui/placeholders' },
          { label: 'Ratings', path: '/app/templates/advancedui/ratings' },
          { label: 'Swiper JS', path: '/app/templates/advancedui/swiperjs' },
        ],
      },
      {
        label: 'Widgets',
        icon: Gift,
        badge: 'Hot',
        badgeColor: 'destructive',
        path: '/app/templates/widgets',
      },
    ],
  },
  {
    category: 'WEB APPS',
    items: [
      {
        label: 'Apps',
        icon: Grid3X3,
        badge: 'New',
        badgeColor: 'secondary',
        children: [
          { label: 'Full Calendar', path: '/app/templates/apps/fullcalendar' },
          { label: 'Gallery', path: '/app/templates/apps/gallery' },
          { label: 'Sweet Alerts', path: '/app/templates/apps/sweetalerts' },
          { label: 'Webmail', path: '/app/templates/apps/webmail' },
          {
            label: 'Projects',
            badge: 'New',
            children: [
              { label: 'Projects List', path: '/app/templates/apps/projects/list' },
              { label: 'Project Overview', path: '/app/templates/apps/projects/overview' },
              { label: 'Create Project', path: '/app/templates/apps/projects/create' },
            ],
          },
          {
            label: 'Jobs',
            badge: 'New',
            children: [
              { label: 'Job Details', path: '/app/templates/apps/jobs/details' },
              { label: 'Search Company', path: '/app/templates/apps/jobs/searchcompany' },
              { label: 'Search Jobs', path: '/app/templates/apps/jobs/searchjobs' },
              { label: 'Job Post', path: '/app/templates/apps/jobs/jobpost' },
              { label: 'Jobs List', path: '/app/templates/apps/jobs/list' },
              { label: 'Search Candidate', path: '/app/templates/apps/jobs/searchcandidate' },
              { label: 'Candidate Details', path: '/app/templates/apps/jobs/candidatedetails' },
            ],
          },
          {
            label: 'NFT',
            badge: 'New',
            children: [
              { label: 'Market Place', path: '/app/templates/apps/nft/marketplace' },
              { label: 'NFT Details', path: '/app/templates/apps/nft/details' },
              { label: 'Create NFT', path: '/app/templates/apps/nft/create' },
              { label: 'Wallet Integration', path: '/app/templates/apps/nft/wallet' },
              { label: 'Live Auction', path: '/app/templates/apps/nft/liveauction' },
            ],
          },
          {
            label: 'CRM',
            badge: 'New',
            children: [
              { label: 'Contacts', path: '/app/templates/apps/crm/contacts' },
              { label: 'Companies', path: '/app/templates/apps/crm/companies' },
              { label: 'Deals', path: '/app/templates/apps/crm/deals' },
              { label: 'Leads', path: '/app/templates/apps/crm/leads' },
            ],
          },
          {
            label: 'Crypto',
            badge: 'New',
            children: [
              { label: 'Transactions', path: '/app/templates/apps/crypto/transactions' },
              { label: 'Currency Exchange', path: '/app/templates/apps/crypto/exchange' },
              { label: 'Buy & Sell', path: '/app/templates/apps/crypto/buysell' },
              { label: 'Marketcap', path: '/app/templates/apps/crypto/marketcap' },
              { label: 'Wallet', path: '/app/templates/apps/crypto/wallet' },
            ],
          },
        ],
      },
      {
        label: 'Nested Menu',
        icon: Menu,
        children: [
          { label: 'Nested-1', path: '/app/templates/nested/nested1' },
          {
            label: 'Nested-2',
            children: [
              { label: 'Nested-2.1', path: '/app/templates/nested/nested2-1' },
              {
                label: 'Nested-2.2',
                children: [
                  { label: 'Nested-2.2.1', path: '/app/templates/nested/nested2-2-1' },
                  { label: 'Nested-2.2.2', path: '/app/templates/nested/nested2-2-2' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    category: 'TABLES & CHARTS',
    items: [
      {
        label: 'Tables',
        icon: Table2,
        badge: '3',
        badgeColor: 'success',
        children: [
          { label: 'Tables', path: '/app/templates/tables/tables' },
          { label: 'Grid JS Tables', path: '/app/templates/tables/gridjs' },
          { label: 'Data Tables', path: '/app/templates/tables/datatables' },
        ],
      },
      {
        label: 'Charts',
        icon: BarChart3,
        children: [
          {
            label: 'Apex Charts',
            children: [
              { label: 'Line Charts', path: '/app/templates/charts/apex/line' },
              { label: 'Area Charts', path: '/app/templates/charts/apex/area' },
              { label: 'Column Charts', path: '/app/templates/charts/apex/column' },
              { label: 'Bar Charts', path: '/app/templates/charts/apex/bar' },
              { label: 'Mixed Charts', path: '/app/templates/charts/apex/mixed' },
              { label: 'Range Area Charts', path: '/app/templates/charts/apex/rangearea' },
              { label: 'Timeline Charts', path: '/app/templates/charts/apex/timeline' },
              { label: 'Funnel Charts', path: '/app/templates/charts/apex/funnel' },
              { label: 'CandleStick Charts', path: '/app/templates/charts/apex/candlestick' },
              { label: 'Boxplot Charts', path: '/app/templates/charts/apex/boxplot' },
              { label: 'Bubble Charts', path: '/app/templates/charts/apex/bubble' },
              { label: 'Scatter Charts', path: '/app/templates/charts/apex/scatter' },
              { label: 'Heatmap Charts', path: '/app/templates/charts/apex/heatmap' },
              { label: 'Treemap Charts', path: '/app/templates/charts/apex/treemap' },
              { label: 'Pie Charts', path: '/app/templates/charts/apex/pie' },
              { label: 'Radialbar Charts', path: '/app/templates/charts/apex/radialbar' },
              { label: 'Radar Charts', path: '/app/templates/charts/apex/radar' },
              { label: 'Polararea Charts', path: '/app/templates/charts/apex/polararea' },
            ],
          },
          { label: 'Chartjs Charts', path: '/app/templates/charts/chartjs' },
          { label: 'Echart Charts', path: '/app/templates/charts/echart' },
        ],
      },
    ],
  },
  {
    category: 'MAPS & ICONS',
    items: [
      {
        label: 'Maps',
        icon: Map,
        children: [
          { label: 'Pigeon Maps', path: '/app/templates/maps/pigeon' },
          { label: 'Leaflet Maps', path: '/app/templates/maps/leaflet' },
        ],
      },
      {
        label: 'Icons',
        icon: Store,
        children: [
          { label: 'Remix Icons', path: '/app/templates/icons/remix' },
          { label: 'Tabler Icons', path: '/app/templates/icons/tabler' },
          { label: 'Bootstrap Icons', path: '/app/templates/icons/bootstrap' },
          { label: 'Feather Icons', path: '/app/templates/icons/feather' },
          { label: 'Lucide Icons', path: '/app/templates/icons/lucide' },
        ],
      },
    ],
  },
];
