import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import LandingPage from "./pages/LandingPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import RequestAccess from "./pages/RequestAccess";
import {
  ClientesPage, ProdutosPage, UsuariosPage, FuncionariosPage,
  FornecedoresPage, PedidosPage, FaturamentoPage, EstoquePage
} from "./pages/modules";
import ClienteForm from "./pages/modules/ClienteForm";
import PedidoForm from "./pages/modules/PedidoForm";
import FormShowcase from "./pages/modules/FormShowcase";
import TableShowcase from "./pages/modules/TableShowcase";
import AdminPanelShowcase from "./pages/modules/AdminPanelShowcase";
import PropostasShowcase from "./pages/modules/PropostasShowcase";
import TemplatePlaceholder from "./pages/templates/TemplatePlaceholder";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/AppLayout";
import { AdminLayout } from "./components/AdminLayout";
import { DeviceTokensPage, DeviceManagerRoute } from "./modules/device";
import { AccessAdminRoute } from "./modules/admin";
import { lazy, Suspense } from "react";

// Admin (Settings)
const SettingsOverview = lazy(() => import("./pages/admin/SettingsOverview"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const CompaniesAdmin = lazy(() => import("./pages/admin/CompaniesAdmin"));
const AccessAdmin = lazy(() => import("./pages/admin/AccessAdmin"));
const SystemAdmin = lazy(() => import("./pages/admin/SystemAdmin"));

// UI Elements showcases
const AlertsShowcase = lazy(() => import("./pages/templates/ui/AlertsShowcase"));
const BadgeShowcase = lazy(() => import("./pages/templates/ui/BadgeShowcase"));
const BreadcrumbShowcase = lazy(() => import("./pages/templates/ui/BreadcrumbShowcase"));
const ButtonsShowcase = lazy(() => import("./pages/templates/ui/ButtonsShowcase"));
const ButtonGroupShowcase = lazy(() => import("./pages/templates/ui/ButtonGroupShowcase"));
const CardsShowcase = lazy(() => import("./pages/templates/ui/CardsShowcase"));
const DropdownsShowcase = lazy(() => import("./pages/templates/ui/DropdownsShowcase"));
const ImagesShowcase = lazy(() => import("./pages/templates/ui/ImagesShowcase"));
const LinksShowcase = lazy(() => import("./pages/templates/ui/LinksShowcase"));
const ListGroupShowcase = lazy(() => import("./pages/templates/ui/ListGroupShowcase"));
const NavsTabsShowcase = lazy(() => import("./pages/templates/ui/NavsTabsShowcase"));
const ObjectFitShowcase = lazy(() => import("./pages/templates/ui/ObjectFitShowcase"));
const PaginationShowcase = lazy(() => import("./pages/templates/ui/PaginationShowcase"));
const PanelsShowcase = lazy(() => import("./pages/templates/ui/PanelsShowcase"));
const PopoversShowcase = lazy(() => import("./pages/templates/ui/PopoversShowcase"));
const ProgressShowcase = lazy(() => import("./pages/templates/ui/ProgressShowcase"));
const SpinnersShowcase = lazy(() => import("./pages/templates/ui/SpinnersShowcase"));
const ToastsShowcase = lazy(() => import("./pages/templates/ui/ToastsShowcase"));
const TooltipsShowcase = lazy(() => import("./pages/templates/ui/TooltipsShowcase"));
const TypographyShowcase = lazy(() => import("./pages/templates/ui/TypographyShowcase"));

// Forms showcases
const InputsShowcase = lazy(() => import("./pages/templates/forms/InputsShowcase"));
const ChecksRadiosShowcase = lazy(() => import("./pages/templates/forms/ChecksRadiosShowcase"));
const InputGroupShowcase = lazy(() => import("./pages/templates/forms/InputGroupShowcase"));
const FormSelectShowcase = lazy(() => import("./pages/templates/forms/FormSelectShowcase"));
const RangeSliderShowcase = lazy(() => import("./pages/templates/forms/RangeSliderShowcase"));
const InputMasksShowcase = lazy(() => import("./pages/templates/forms/InputMasksShowcase"));
const FileUploadsShowcase = lazy(() => import("./pages/templates/forms/FileUploadsShowcase"));
const DateTimePickerShowcase = lazy(() => import("./pages/templates/forms/DateTimePickerShowcase"));
const ColorPickerShowcase = lazy(() => import("./pages/templates/forms/ColorPickerShowcase"));
const FloatingLabelsShowcase = lazy(() => import("./pages/templates/forms/FloatingLabelsShowcase"));
const FormLayoutsShowcase = lazy(() => import("./pages/templates/forms/FormLayoutsShowcase"));
const SunEditorShowcase = lazy(() => import("./pages/templates/forms/SunEditorShowcase"));
const FormsValidationShowcase = lazy(() => import("./pages/templates/forms/ValidationShowcase"));
const Select2Showcase = lazy(() => import("./pages/templates/forms/Select2Showcase"));

// Advanced UI showcases
const AccordionsShowcase = lazy(() => import("./pages/templates/advancedui/AccordionsShowcase"));
const CarouselShowcase = lazy(() => import("./pages/templates/advancedui/CarouselShowcase"));
const DraggableCardsShowcase = lazy(() => import("./pages/templates/advancedui/DraggableCardsShowcase"));
const ModalsShowcase = lazy(() => import("./pages/templates/advancedui/ModalsShowcase"));
const NavbarShowcase = lazy(() => import("./pages/templates/advancedui/NavbarShowcase"));
const OffcanvasShowcase = lazy(() => import("./pages/templates/advancedui/OffcanvasShowcase"));
const PlaceholdersShowcase = lazy(() => import("./pages/templates/advancedui/PlaceholdersShowcase"));
const RatingsShowcase = lazy(() => import("./pages/templates/advancedui/RatingsShowcase"));
const SwiperShowcase = lazy(() => import("./pages/templates/advancedui/SwiperShowcase"));

// Utilities showcases
const AvatarsShowcase = lazy(() => import("./pages/templates/utilities/AvatarsShowcase"));
const BordersShowcase = lazy(() => import("./pages/templates/utilities/BordersShowcase"));
const BreakpointsShowcase = lazy(() => import("./pages/templates/utilities/BreakpointsShowcase"));
const ColorsShowcase = lazy(() => import("./pages/templates/utilities/ColorsShowcase"));
const ColumnsShowcase = lazy(() => import("./pages/templates/utilities/ColumnsShowcase"));
const FlexShowcase = lazy(() => import("./pages/templates/utilities/FlexShowcase"));
const GuttersShowcase = lazy(() => import("./pages/templates/utilities/GuttersShowcase"));
const HelpersShowcase = lazy(() => import("./pages/templates/utilities/HelpersShowcase"));
const PositionShowcase = lazy(() => import("./pages/templates/utilities/PositionShowcase"));
const AdditionalContentShowcase = lazy(() => import("./pages/templates/utilities/AdditionalContentShowcase"));

// Tables showcases
const BasicTablesShowcase = lazy(() => import("./pages/templates/tables/BasicTablesShowcase"));
const GridJSTablesShowcase = lazy(() => import("./pages/templates/tables/GridJSTablesShowcase"));
const DataTablesShowcase = lazy(() => import("./pages/templates/tables/DataTablesShowcase"));

// Icons showcases
const RemixIconsShowcase = lazy(() => import("./pages/templates/icons/RemixIconsShowcase"));
const TablerIconsShowcase = lazy(() => import("./pages/templates/icons/TablerIconsShowcase"));
const BootstrapIconsShowcase = lazy(() => import("./pages/templates/icons/BootstrapIconsShowcase"));
const FeatherIconsShowcase = lazy(() => import("./pages/templates/icons/FeatherIconsShowcase"));
const LucideIconsShowcase = lazy(() => import("./pages/templates/icons/LucideIconsShowcase"));

// Apps showcases
const FullCalendarShowcase = lazy(() => import("./pages/templates/apps/FullCalendarShowcase"));
const GalleryShowcase = lazy(() => import("./pages/templates/apps/GalleryShowcase"));
const SweetAlertsShowcase = lazy(() => import("./pages/templates/apps/SweetAlertsShowcase"));
const WebmailShowcase = lazy(() => import("./pages/templates/apps/WebmailShowcase"));
const ProjectsListShowcase = lazy(() => import("./pages/templates/apps/ProjectsListShowcase"));
const ProjectsOverviewShowcase = lazy(() => import("./pages/templates/apps/ProjectsOverviewShowcase"));
const ProjectsCreateShowcase = lazy(() => import("./pages/templates/apps/ProjectsCreateShowcase"));
const JobDetailsShowcase = lazy(() => import("./pages/templates/apps/JobDetailsShowcase"));
const JobsListShowcase = lazy(() => import("./pages/templates/apps/JobsListShowcase"));
const JobPostShowcase = lazy(() => import("./pages/templates/apps/JobPostShowcase"));
const SearchCompanyShowcase = lazy(() => import("./pages/templates/apps/SearchCompanyShowcase"));
const SearchJobsShowcase = lazy(() => import("./pages/templates/apps/SearchJobsShowcase"));
const SearchCandidateShowcase = lazy(() => import("./pages/templates/apps/SearchCandidateShowcase"));
const CandidateDetailsShowcase = lazy(() => import("./pages/templates/apps/CandidateDetailsShowcase"));
const NFTMarketplaceShowcase = lazy(() => import("./pages/templates/apps/NFTMarketplaceShowcase"));
const NFTDetailsShowcase = lazy(() => import("./pages/templates/apps/NFTDetailsShowcase"));
const NFTCreateShowcase = lazy(() => import("./pages/templates/apps/NFTCreateShowcase"));
const NFTWalletShowcase = lazy(() => import("./pages/templates/apps/NFTWalletShowcase"));
const NFTLiveAuctionShowcase = lazy(() => import("./pages/templates/apps/NFTLiveAuctionShowcase"));
const CRMContactsShowcase = lazy(() => import("./pages/templates/apps/CRMContactsShowcase"));
const CRMCompaniesShowcase = lazy(() => import("./pages/templates/apps/CRMCompaniesShowcase"));
const CRMDealsShowcase = lazy(() => import("./pages/templates/apps/CRMDealsShowcase"));
const CRMLeadsShowcase = lazy(() => import("./pages/templates/apps/CRMLeadsShowcase"));
const CryptoTransactionsShowcase = lazy(() => import("./pages/templates/apps/CryptoTransactionsShowcase"));
const CryptoExchangeShowcase = lazy(() => import("./pages/templates/apps/CryptoExchangeShowcase"));
const CryptoBuySellShowcase = lazy(() => import("./pages/templates/apps/CryptoBuySellShowcase"));
const CryptoMarketcapShowcase = lazy(() => import("./pages/templates/apps/CryptoMarketcapShowcase"));
const CryptoWalletShowcase = lazy(() => import("./pages/templates/apps/CryptoWalletShowcase"));
const CRMExecutiveDashboard = lazy(() => import("./pages/templates/dashboards/CRMExecutiveDashboard"));
const JobsExecutiveDashboard = lazy(() => import("./pages/templates/dashboards/JobsExecutiveDashboard"));
const SalesExecutiveDashboard = lazy(() => import("./pages/templates/dashboards/SalesExecutiveDashboard"));
const HRMExecutiveDashboard = lazy(() => import("./pages/templates/dashboards/HRMExecutiveDashboard"));
const ProjectsExecutiveDashboard = lazy(() => import("./pages/templates/dashboards/ProjectsExecutiveDashboard"));

// Pages
const AboutUsShowcase = lazy(() => import("./pages/templates/pages/AboutUsShowcase"));
const ChatShowcase = lazy(() => import("./pages/templates/pages/ChatShowcase"));
const ContactsShowcase = lazy(() => import("./pages/templates/pages/ContactsShowcase"));
const ContactUsShowcase = lazy(() => import("./pages/templates/pages/ContactUsShowcase"));
const EmptyShowcase = lazy(() => import("./pages/templates/pages/EmptyShowcase"));
const FAQsShowcase = lazy(() => import("./pages/templates/pages/FAQsShowcase"));
const LandingShowcase = lazy(() => import("./pages/templates/pages/LandingShowcase"));
const JobsLandingShowcase = lazy(() => import("./pages/templates/pages/JobsLandingShowcase"));
const NotificationsShowcase = lazy(() => import("./pages/templates/pages/NotificationsShowcase"));
const PricingShowcase = lazy(() => import("./pages/templates/pages/PricingShowcase"));
const ProfileShowcase = lazy(() => import("./pages/templates/pages/ProfileShowcase"));
const ProfileEditShowcase = lazy(() => import("./pages/templates/pages/ProfileEditShowcase"));
const ReviewsShowcase = lazy(() => import("./pages/templates/pages/ReviewsShowcase"));
const TeamShowcase = lazy(() => import("./pages/templates/pages/TeamShowcase"));
const TermsConditionsShowcase = lazy(() => import("./pages/templates/pages/TermsConditionsShowcase"));
const TimelineShowcase = lazy(() => import("./pages/templates/pages/TimelineShowcase"));
const ToDoListShowcase = lazy(() => import("./pages/templates/pages/ToDoListShowcase"));
const FileManagerShowcase = lazy(() => import("./pages/templates/pages/FileManagerShowcase"));
const BlogShowcase = lazy(() => import("./pages/templates/pages/blog/BlogShowcase"));
const BlogDetailsShowcase = lazy(() => import("./pages/templates/pages/blog/BlogDetailsShowcase"));
const CreateBlogShowcase = lazy(() => import("./pages/templates/pages/blog/CreateBlogShowcase"));
const MailAppShowcase = lazy(() => import("./pages/templates/pages/email/MailAppShowcase"));
const MailEditorShowcase = lazy(() => import("./pages/templates/pages/email/MailEditorShowcase"));
const MailSettingsShowcase = lazy(() => import("./pages/templates/pages/email/MailSettingsShowcase"));
const EmailInternoShowcase = lazy(() => import("./pages/templates/pages/email/EmailInternoShowcase"));
const EmailExternoShowcase = lazy(() => import("./pages/templates/pages/email/EmailExternoShowcase"));
const CreateInvoiceShowcase = lazy(() => import("./pages/templates/pages/invoice/CreateInvoiceShowcase"));
const InvoiceDetailsShowcase = lazy(() => import("./pages/templates/pages/invoice/InvoiceDetailsShowcase"));
const InvoiceListShowcase = lazy(() => import("./pages/templates/pages/invoice/InvoiceListShowcase"));
const ProductsShowcase = lazy(() => import("./pages/templates/pages/ecommerce/ProductsShowcase"));
const ProductDetailsShowcase = lazy(() => import("./pages/templates/pages/ecommerce/ProductDetailsShowcase"));
const CartShowcase = lazy(() => import("./pages/templates/pages/ecommerce/CartShowcase"));
const CheckoutShowcase = lazy(() => import("./pages/templates/pages/ecommerce/CheckoutShowcase"));
const AddProductsShowcase = lazy(() => import("./pages/templates/pages/ecommerce/AddProductsShowcase"));
const EditProductsShowcase = lazy(() => import("./pages/templates/pages/ecommerce/EditProductsShowcase"));
const OrdersShowcase = lazy(() => import("./pages/templates/pages/ecommerce/OrdersShowcase"));
const OrderDetailsShowcase = lazy(() => import("./pages/templates/pages/ecommerce/OrderDetailsShowcase"));
const EcommerceProductsListShowcase = lazy(() => import("./pages/templates/pages/ecommerce/ProductsListShowcase"));
const WishlistShowcase = lazy(() => import("./pages/templates/pages/ecommerce/WishlistShowcase"));

// Task
const KanbanShowcase = lazy(() => import("./pages/templates/task/KanbanShowcase"));
const ListViewShowcase = lazy(() => import("./pages/templates/task/ListViewShowcase"));
const TaskDetailsShowcase = lazy(() => import("./pages/templates/task/TaskDetailsShowcase"));

// Authentication
const SignInBasicShowcase = lazy(() => import("./pages/templates/auth/signin/SignInBasicShowcase"));
const SignInCoverShowcase = lazy(() => import("./pages/templates/auth/signin/SignInCoverShowcase"));
const SignUpBasicShowcase = lazy(() => import("./pages/templates/auth/signup/SignUpBasicShowcase"));
const SignUpCoverShowcase = lazy(() => import("./pages/templates/auth/signup/SignUpCoverShowcase"));
const ResetPasswordBasicShowcase = lazy(() => import("./pages/templates/auth/resetpassword/ResetPasswordBasicShowcase"));
const ResetPasswordCoverShowcase = lazy(() => import("./pages/templates/auth/resetpassword/ResetPasswordCoverShowcase"));
const CreatePasswordBasicShowcase = lazy(() => import("./pages/templates/auth/createpassword/CreatePasswordBasicShowcase"));
const CreatePasswordCoverShowcase = lazy(() => import("./pages/templates/auth/createpassword/CreatePasswordCoverShowcase"));
const LockScreenBasicShowcase = lazy(() => import("./pages/templates/auth/lockscreen/LockScreenBasicShowcase"));
const LockScreenCoverShowcase = lazy(() => import("./pages/templates/auth/lockscreen/LockScreenCoverShowcase"));
const TwoStepBasicShowcase = lazy(() => import("./pages/templates/auth/twostep/TwoStepBasicShowcase"));
const TwoStepCoverShowcase = lazy(() => import("./pages/templates/auth/twostep/TwoStepCoverShowcase"));
const ComingSoonShowcase = lazy(() => import("./pages/templates/auth/ComingSoonShowcase"));
const UnderMaintenanceShowcase = lazy(() => import("./pages/templates/auth/UnderMaintenanceShowcase"));

// Widgets
const WidgetsShowcase = lazy(() => import("./pages/templates/widgets/WidgetsShowcase"));

// Error
const Error401Showcase = lazy(() => import("./pages/templates/error/Error401Showcase"));
const Error404Showcase = lazy(() => import("./pages/templates/error/Error404Showcase"));
const Error500Showcase = lazy(() => import("./pages/templates/error/Error500Showcase"));

// Charts - Apex
const ApexLineChart = lazy(() => import("./pages/templates/charts/apex/ApexLineChart"));
const ApexAreaChart = lazy(() => import("./pages/templates/charts/apex/ApexAreaChart"));
const ApexColumnChart = lazy(() => import("./pages/templates/charts/apex/ApexColumnChart"));
const ApexBarChart = lazy(() => import("./pages/templates/charts/apex/ApexBarChart"));
const ApexMixedChart = lazy(() => import("./pages/templates/charts/apex/ApexMixedChart"));
const ApexRangeAreaChart = lazy(() => import("./pages/templates/charts/apex/ApexRangeAreaChart"));
const ApexTimelineChart = lazy(() => import("./pages/templates/charts/apex/ApexTimelineChart"));
const ApexFunnelChart = lazy(() => import("./pages/templates/charts/apex/ApexFunnelChart"));
const ApexCandleStickChart = lazy(() => import("./pages/templates/charts/apex/ApexCandleStickChart"));
const ApexBoxplotChart = lazy(() => import("./pages/templates/charts/apex/ApexBoxplotChart"));
const ApexBubbleChart = lazy(() => import("./pages/templates/charts/apex/ApexBubbleChart"));
const ApexScatterChart = lazy(() => import("./pages/templates/charts/apex/ApexScatterChart"));
const ApexHeatmapChart = lazy(() => import("./pages/templates/charts/apex/ApexHeatmapChart"));
const ApexTreemapChart = lazy(() => import("./pages/templates/charts/apex/ApexTreemapChart"));
const ApexPieChart = lazy(() => import("./pages/templates/charts/apex/ApexPieChart"));
const ApexRadialBarChart = lazy(() => import("./pages/templates/charts/apex/ApexRadialBarChart"));
const ApexRadarChart = lazy(() => import("./pages/templates/charts/apex/ApexRadarChart"));
const ApexPolarAreaChart = lazy(() => import("./pages/templates/charts/apex/ApexPolarAreaChart"));
const ChartjsShowcase = lazy(() => import("./pages/templates/charts/ChartjsShowcase"));
const EchartShowcase = lazy(() => import("./pages/templates/charts/EchartShowcase"));

// Design System (standalone)
const DesignSystemLayout = lazy(() => import("./pages/design-system/DesignSystemLayout"));
const DSPrinciples = lazy(() => import("./pages/design-system/PrinciplesPage"));
const DSFoundations = lazy(() => import("./pages/design-system/FoundationsPage"));
const DSComponentsLayout = lazy(() => import("./pages/design-system/components/ComponentsLayout"));
const DSComponentsIndex = lazy(() => import("./pages/design-system/components/ComponentsIndex"));
const DSCButtons = lazy(() => import("./pages/design-system/components/pages/ButtonsPage"));
const DSCToggles = lazy(() => import("./pages/design-system/components/pages/TogglesPage"));
const DSCDropdownMenu = lazy(() => import("./pages/design-system/components/pages/DropdownMenuPage"));
const DSCContextMenu = lazy(() => import("./pages/design-system/components/pages/ContextMenuPage"));
const DSCMenubar = lazy(() => import("./pages/design-system/components/pages/MenubarPage"));
const DSCCommand = lazy(() => import("./pages/design-system/components/pages/CommandPage"));
const DSCInputs = lazy(() => import("./pages/design-system/components/pages/InputsPage"));
const DSCSelect = lazy(() => import("./pages/design-system/components/pages/SelectPage"));
const DSCCheckboxRadio = lazy(() => import("./pages/design-system/components/pages/CheckboxRadioPage"));
const DSCSwitch = lazy(() => import("./pages/design-system/components/pages/SwitchPage"));
const DSCSlider = lazy(() => import("./pages/design-system/components/pages/SliderPage"));
const DSCInputOTP = lazy(() => import("./pages/design-system/components/pages/InputOTPPage"));
const DSCCalendar = lazy(() => import("./pages/design-system/components/pages/CalendarPage"));
const DSCForm = lazy(() => import("./pages/design-system/components/pages/FormPage"));
const DSCCards = lazy(() => import("./pages/design-system/components/pages/CardsPage"));
const DSCBadges = lazy(() => import("./pages/design-system/components/pages/BadgesPage"));
const DSCAvatars = lazy(() => import("./pages/design-system/components/pages/AvatarsPage"));
const DSCSeparator = lazy(() => import("./pages/design-system/components/pages/SeparatorPage"));
const DSCSkeleton = lazy(() => import("./pages/design-system/components/pages/SkeletonPage"));
const DSCAspectRatio = lazy(() => import("./pages/design-system/components/pages/AspectRatioPage"));
const DSCTypography = lazy(() => import("./pages/design-system/components/pages/TypographyPage"));
const DSCAlerts = lazy(() => import("./pages/design-system/components/pages/AlertsPage"));
const DSCProgress = lazy(() => import("./pages/design-system/components/pages/ProgressPage"));
const DSCToasts = lazy(() => import("./pages/design-system/components/pages/ToastsPage"));
const DSCTooltip = lazy(() => import("./pages/design-system/components/pages/TooltipPage"));
const DSCHoverCard = lazy(() => import("./pages/design-system/components/pages/HoverCardPage"));
const DSCPopover = lazy(() => import("./pages/design-system/components/pages/PopoverPage"));
const DSCDialog = lazy(() => import("./pages/design-system/components/pages/DialogPage"));
const DSCAlertDialog = lazy(() => import("./pages/design-system/components/pages/AlertDialogPage"));
const DSCSheet = lazy(() => import("./pages/design-system/components/pages/SheetPage"));
const DSCDrawer = lazy(() => import("./pages/design-system/components/pages/DrawerPage"));
const DSCTabs = lazy(() => import("./pages/design-system/components/pages/TabsPage"));
const DSCAccordion = lazy(() => import("./pages/design-system/components/pages/AccordionPage"));
const DSCCollapsible = lazy(() => import("./pages/design-system/components/pages/CollapsiblePage"));
const DSCBreadcrumb = lazy(() => import("./pages/design-system/components/pages/BreadcrumbPage"));
const DSCPagination = lazy(() => import("./pages/design-system/components/pages/PaginationPage"));
const DSCNavigationMenu = lazy(() => import("./pages/design-system/components/pages/NavigationMenuPage"));
const DSCSidebar = lazy(() => import("./pages/design-system/components/pages/SidebarPage"));
const DSCTable = lazy(() => import("./pages/design-system/components/pages/TablePage"));
const DSCCarousel = lazy(() => import("./pages/design-system/components/pages/CarouselPage"));
const DSCScrollArea = lazy(() => import("./pages/design-system/components/pages/ScrollAreaPage"));
const DSCResizable = lazy(() => import("./pages/design-system/components/pages/ResizablePage"));
const DSCChart = lazy(() => import("./pages/design-system/components/pages/ChartPage"));
const DSCPanels = lazy(() => import("./pages/design-system/components/pages/PanelsPage"));
const DSCListGroups = lazy(() => import("./pages/design-system/components/pages/ListGroupsPage"));
const DSCDropdowns = lazy(() => import("./pages/design-system/components/pages/DropdownsPage"));
const DSCFileManager = lazy(() => import("./pages/design-system/components/pages/FileManagerPage"));
const DSPatterns = lazy(() => import("./pages/design-system/PatternsPage"));
const DSDashboards = lazy(() => import("./pages/design-system/DashboardsPage"));
const DSTemplates = lazy(() => import("./pages/design-system/TemplateElementsPage"));
const DSIntegrations = lazy(() => import("./pages/design-system/IntegrationsPage"));

// Portal da Transparência
const PortalLayout = lazy(() => import("./pages/portal/PortalLayout"));
const PortalHome = lazy(() => import("./pages/portal/PortalHome"));
const PortalNoticia = lazy(() => import("./pages/portal/NoticiaPage"));
const PortalGrupo = lazy(() => import("./pages/portal/GrupoPage"));
const PortalMenuDinamico = lazy(() => import("./pages/portal/MenuDinamicoPage"));
const PortalAdminLayout = lazy(() => import("./pages/portal/admin/PortalAdminLayout"));
const PortalAdminDashboard = lazy(() => import("./pages/portal/admin/AdminDashboard"));
const PortalNoticiasList = lazy(() => import("./pages/portal/admin/NoticiasList"));
const PortalNoticiaForm = lazy(() => import("./pages/portal/admin/NoticiaForm"));
const PortalMenusList = lazy(() => import("./pages/portal/admin/MenusList"));
const PortalMenuForm = lazy(() => import("./pages/portal/admin/MenuForm"));
const PortalGruposList = lazy(() => import("./pages/portal/admin/GruposList"));
const PortalGrupoForm = lazy(() => import("./pages/portal/admin/GrupoForm"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LazyFallback />}>{children}</Suspense>;
}

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-container-low">
      <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function ProtectedLayout() {
  const { isAuthenticated, authLoading, user } = useApp();
  if (authLoading) return <AuthLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" />;
  if (user?.must_change_password) return <Navigate to="/change-password" replace />;
  return <AppLayout />;
}

function ProtectedAdminLayout() {
  const { isAuthenticated, authLoading, user } = useApp();
  if (authLoading) return <AuthLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" />;
  if (user?.must_change_password) return <Navigate to="/change-password" replace />;
  return <AccessAdminRoute />;
}

function AppRoutes() {
  const { isAuthenticated, authLoading, user } = useApp();

  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={user?.must_change_password ? "/change-password" : "/app"} /> : <LandingPage />} />
      <Route path="/register" element={<Navigate to="/request-access" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/request-access" element={<RequestAccess />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Design System (standalone, public) */}
      <Route path="/design-system" element={<LazyRoute><DesignSystemLayout /></LazyRoute>}>
        <Route index element={<LazyRoute><DSPrinciples /></LazyRoute>} />
        <Route path="foundations" element={<LazyRoute><DSFoundations /></LazyRoute>} />
        <Route path="components" element={<LazyRoute><DSComponentsLayout /></LazyRoute>}>
          <Route index element={<LazyRoute><DSComponentsIndex /></LazyRoute>} />
          <Route path="buttons" element={<LazyRoute><DSCButtons /></LazyRoute>} />
          <Route path="toggles" element={<LazyRoute><DSCToggles /></LazyRoute>} />
          <Route path="dropdown-menu" element={<LazyRoute><DSCDropdownMenu /></LazyRoute>} />
          <Route path="context-menu" element={<LazyRoute><DSCContextMenu /></LazyRoute>} />
          <Route path="menubar" element={<LazyRoute><DSCMenubar /></LazyRoute>} />
          <Route path="command" element={<LazyRoute><DSCCommand /></LazyRoute>} />
          <Route path="inputs" element={<LazyRoute><DSCInputs /></LazyRoute>} />
          <Route path="select" element={<LazyRoute><DSCSelect /></LazyRoute>} />
          <Route path="checkbox-radio" element={<LazyRoute><DSCCheckboxRadio /></LazyRoute>} />
          <Route path="switch" element={<LazyRoute><DSCSwitch /></LazyRoute>} />
          <Route path="slider" element={<LazyRoute><DSCSlider /></LazyRoute>} />
          <Route path="input-otp" element={<LazyRoute><DSCInputOTP /></LazyRoute>} />
          <Route path="calendar" element={<LazyRoute><DSCCalendar /></LazyRoute>} />
          <Route path="form" element={<LazyRoute><DSCForm /></LazyRoute>} />
          <Route path="cards" element={<LazyRoute><DSCCards /></LazyRoute>} />
          <Route path="badges" element={<LazyRoute><DSCBadges /></LazyRoute>} />
          <Route path="avatars" element={<LazyRoute><DSCAvatars /></LazyRoute>} />
          <Route path="separator" element={<LazyRoute><DSCSeparator /></LazyRoute>} />
          <Route path="skeleton" element={<LazyRoute><DSCSkeleton /></LazyRoute>} />
          <Route path="aspect-ratio" element={<LazyRoute><DSCAspectRatio /></LazyRoute>} />
          <Route path="typography" element={<LazyRoute><DSCTypography /></LazyRoute>} />
          <Route path="alerts" element={<LazyRoute><DSCAlerts /></LazyRoute>} />
          <Route path="progress" element={<LazyRoute><DSCProgress /></LazyRoute>} />
          <Route path="toasts" element={<LazyRoute><DSCToasts /></LazyRoute>} />
          <Route path="tooltip" element={<LazyRoute><DSCTooltip /></LazyRoute>} />
          <Route path="hover-card" element={<LazyRoute><DSCHoverCard /></LazyRoute>} />
          <Route path="popover" element={<LazyRoute><DSCPopover /></LazyRoute>} />
          <Route path="dialog" element={<LazyRoute><DSCDialog /></LazyRoute>} />
          <Route path="alert-dialog" element={<LazyRoute><DSCAlertDialog /></LazyRoute>} />
          <Route path="sheet" element={<LazyRoute><DSCSheet /></LazyRoute>} />
          <Route path="drawer" element={<LazyRoute><DSCDrawer /></LazyRoute>} />
          <Route path="tabs" element={<LazyRoute><DSCTabs /></LazyRoute>} />
          <Route path="accordion" element={<LazyRoute><DSCAccordion /></LazyRoute>} />
          <Route path="collapsible" element={<LazyRoute><DSCCollapsible /></LazyRoute>} />
          <Route path="breadcrumb" element={<LazyRoute><DSCBreadcrumb /></LazyRoute>} />
          <Route path="pagination" element={<LazyRoute><DSCPagination /></LazyRoute>} />
          <Route path="navigation-menu" element={<LazyRoute><DSCNavigationMenu /></LazyRoute>} />
          <Route path="sidebar" element={<LazyRoute><DSCSidebar /></LazyRoute>} />
          <Route path="table" element={<LazyRoute><DSCTable /></LazyRoute>} />
          <Route path="carousel" element={<LazyRoute><DSCCarousel /></LazyRoute>} />
          <Route path="scroll-area" element={<LazyRoute><DSCScrollArea /></LazyRoute>} />
          <Route path="resizable" element={<LazyRoute><DSCResizable /></LazyRoute>} />
          <Route path="chart" element={<LazyRoute><DSCChart /></LazyRoute>} />
          <Route path="panels" element={<LazyRoute><DSCPanels /></LazyRoute>} />
          <Route path="list-groups" element={<LazyRoute><DSCListGroups /></LazyRoute>} />
          <Route path="dropdowns" element={<LazyRoute><DSCDropdowns /></LazyRoute>} />
          <Route path="file-manager" element={<LazyRoute><DSCFileManager /></LazyRoute>} />
        </Route>
        <Route path="patterns" element={<LazyRoute><DSPatterns /></LazyRoute>} />
        <Route path="dashboards" element={<LazyRoute><DSDashboards /></LazyRoute>} />
        <Route path="templates" element={<LazyRoute><DSTemplates /></LazyRoute>} />
        <Route path="integrations" element={<LazyRoute><DSIntegrations /></LazyRoute>} />
      </Route>

      {/* All authenticated routes share the same AppLayout instance */}
      <Route path="/app" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<LazyRoute><ProfileShowcase /></LazyRoute>} />
        <Route path="profile/edit" element={<LazyRoute><ProfileEditShowcase /></LazyRoute>} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="clientes/novo" element={<ClienteForm />} />
        <Route path="produtos" element={<ProdutosPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="funcionarios" element={<FuncionariosPage />} />
        <Route path="fornecedores" element={<FornecedoresPage />} />
        <Route path="pedidos" element={<PedidosPage />} />
        <Route path="pedidos/novo" element={<PedidoForm />} />
        <Route path="faturamento" element={<FaturamentoPage />} />
        <Route path="estoque" element={<EstoquePage />} />
        <Route path="devices" element={<DeviceManagerRoute />}>
          <Route index element={<DeviceTokensPage />} />
        </Route>
        <Route path="formularios" element={<FormShowcase />} />
        <Route path="tabelas" element={<TableShowcase />} />
        <Route path="painel" element={<AdminPanelShowcase />} />
        <Route path="comercial/movimentos/propostas" element={<PropostasShowcase />} />

        {/* Dashboards */}
        <Route path="templates/dashboards/crm" element={<LazyRoute><CRMExecutiveDashboard /></LazyRoute>} />
        <Route path="templates/dashboards/jobs" element={<LazyRoute><JobsExecutiveDashboard /></LazyRoute>} />
        <Route path="templates/dashboards/sales" element={<LazyRoute><SalesExecutiveDashboard /></LazyRoute>} />
        <Route path="templates/dashboards/hrm" element={<LazyRoute><HRMExecutiveDashboard /></LazyRoute>} />
        <Route path="templates/dashboards/projects" element={<LazyRoute><ProjectsExecutiveDashboard /></LazyRoute>} />

        {/* UI Elements */}
        <Route path="templates/ui/alerts" element={<LazyRoute><AlertsShowcase /></LazyRoute>} />
        <Route path="templates/ui/badge" element={<LazyRoute><BadgeShowcase /></LazyRoute>} />
        <Route path="templates/ui/breadcrumb" element={<LazyRoute><BreadcrumbShowcase /></LazyRoute>} />
        <Route path="templates/ui/buttons" element={<LazyRoute><ButtonsShowcase /></LazyRoute>} />
        <Route path="templates/ui/buttongroup" element={<LazyRoute><ButtonGroupShowcase /></LazyRoute>} />
        <Route path="templates/ui/cards" element={<LazyRoute><CardsShowcase /></LazyRoute>} />
        <Route path="templates/ui/dropdowns" element={<LazyRoute><DropdownsShowcase /></LazyRoute>} />
        <Route path="templates/ui/images" element={<LazyRoute><ImagesShowcase /></LazyRoute>} />
        <Route path="templates/ui/links" element={<LazyRoute><LinksShowcase /></LazyRoute>} />
        <Route path="templates/ui/listgroup" element={<LazyRoute><ListGroupShowcase /></LazyRoute>} />
        <Route path="templates/ui/navstabs" element={<LazyRoute><NavsTabsShowcase /></LazyRoute>} />
        <Route path="templates/ui/objectfit" element={<LazyRoute><ObjectFitShowcase /></LazyRoute>} />
        <Route path="templates/ui/pagination" element={<LazyRoute><PaginationShowcase /></LazyRoute>} />
        <Route path="templates/ui/panels" element={<LazyRoute><PanelsShowcase /></LazyRoute>} />
        <Route path="templates/ui/popovers" element={<LazyRoute><PopoversShowcase /></LazyRoute>} />
        <Route path="templates/ui/progress" element={<LazyRoute><ProgressShowcase /></LazyRoute>} />
        <Route path="templates/ui/spinners" element={<LazyRoute><SpinnersShowcase /></LazyRoute>} />
        <Route path="templates/ui/toasts" element={<LazyRoute><ToastsShowcase /></LazyRoute>} />
        <Route path="templates/ui/tooltips" element={<LazyRoute><TooltipsShowcase /></LazyRoute>} />
        <Route path="templates/ui/typography" element={<LazyRoute><TypographyShowcase /></LazyRoute>} />

        {/* Forms */}
        <Route path="templates/forms/inputs" element={<LazyRoute><InputsShowcase /></LazyRoute>} />
        <Route path="templates/forms/checksradios" element={<LazyRoute><ChecksRadiosShowcase /></LazyRoute>} />
        <Route path="templates/forms/inputgroup" element={<LazyRoute><InputGroupShowcase /></LazyRoute>} />
        <Route path="templates/forms/formselect" element={<LazyRoute><FormSelectShowcase /></LazyRoute>} />
        <Route path="templates/forms/rangeslider" element={<LazyRoute><RangeSliderShowcase /></LazyRoute>} />
        <Route path="templates/forms/inputmasks" element={<LazyRoute><InputMasksShowcase /></LazyRoute>} />
        <Route path="templates/forms/fileuploads" element={<LazyRoute><FileUploadsShowcase /></LazyRoute>} />
        <Route path="templates/forms/datetimepicker" element={<LazyRoute><DateTimePickerShowcase /></LazyRoute>} />
        <Route path="templates/forms/colorpicker" element={<LazyRoute><ColorPickerShowcase /></LazyRoute>} />
        <Route path="templates/forms/floatinglabels" element={<LazyRoute><FloatingLabelsShowcase /></LazyRoute>} />
        <Route path="templates/forms/layouts" element={<LazyRoute><FormLayoutsShowcase /></LazyRoute>} />
        <Route path="templates/forms/suneditor" element={<LazyRoute><SunEditorShowcase /></LazyRoute>} />
        <Route path="templates/forms/validation" element={<LazyRoute><FormsValidationShowcase /></LazyRoute>} />
        <Route path="templates/forms/select2" element={<LazyRoute><Select2Showcase /></LazyRoute>} />

        {/* Advanced UI */}
        <Route path="templates/advancedui/accordions" element={<LazyRoute><AccordionsShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/carousel" element={<LazyRoute><CarouselShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/draggablecards" element={<LazyRoute><DraggableCardsShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/modals" element={<LazyRoute><ModalsShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/navbar" element={<LazyRoute><NavbarShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/offcanvas" element={<LazyRoute><OffcanvasShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/placeholders" element={<LazyRoute><PlaceholdersShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/ratings" element={<LazyRoute><RatingsShowcase /></LazyRoute>} />
        <Route path="templates/advancedui/swiperjs" element={<LazyRoute><SwiperShowcase /></LazyRoute>} />

        {/* Utilities */}
        <Route path="templates/utilities/avatars" element={<LazyRoute><AvatarsShowcase /></LazyRoute>} />
        <Route path="templates/utilities/borders" element={<LazyRoute><BordersShowcase /></LazyRoute>} />
        <Route path="templates/utilities/breakpoints" element={<LazyRoute><BreakpointsShowcase /></LazyRoute>} />
        <Route path="templates/utilities/colors" element={<LazyRoute><ColorsShowcase /></LazyRoute>} />
        <Route path="templates/utilities/columns" element={<LazyRoute><ColumnsShowcase /></LazyRoute>} />
        <Route path="templates/utilities/flex" element={<LazyRoute><FlexShowcase /></LazyRoute>} />
        <Route path="templates/utilities/gutters" element={<LazyRoute><GuttersShowcase /></LazyRoute>} />
        <Route path="templates/utilities/helpers" element={<LazyRoute><HelpersShowcase /></LazyRoute>} />
        <Route path="templates/utilities/position" element={<LazyRoute><PositionShowcase /></LazyRoute>} />
        <Route path="templates/utilities/additionalcontent" element={<LazyRoute><AdditionalContentShowcase /></LazyRoute>} />

        {/* Icons */}
        <Route path="templates/icons/remix" element={<LazyRoute><RemixIconsShowcase /></LazyRoute>} />
        <Route path="templates/icons/tabler" element={<LazyRoute><TablerIconsShowcase /></LazyRoute>} />
        <Route path="templates/icons/bootstrap" element={<LazyRoute><BootstrapIconsShowcase /></LazyRoute>} />
        <Route path="templates/icons/feather" element={<LazyRoute><FeatherIconsShowcase /></LazyRoute>} />
        <Route path="templates/icons/lucide" element={<LazyRoute><LucideIconsShowcase /></LazyRoute>} />

        {/* Tables */}
        <Route path="templates/tables/tables" element={<LazyRoute><BasicTablesShowcase /></LazyRoute>} />
        <Route path="templates/tables/gridjs" element={<LazyRoute><GridJSTablesShowcase /></LazyRoute>} />
        <Route path="templates/tables/datatables" element={<LazyRoute><DataTablesShowcase /></LazyRoute>} />

        {/* Apps */}
        <Route path="templates/apps/fullcalendar" element={<LazyRoute><FullCalendarShowcase /></LazyRoute>} />
        <Route path="templates/apps/gallery" element={<LazyRoute><GalleryShowcase /></LazyRoute>} />
        <Route path="templates/apps/sweetalerts" element={<LazyRoute><SweetAlertsShowcase /></LazyRoute>} />
        <Route path="templates/apps/webmail" element={<LazyRoute><WebmailShowcase /></LazyRoute>} />
        <Route path="templates/apps/projects/list" element={<LazyRoute><ProjectsListShowcase /></LazyRoute>} />
        <Route path="templates/apps/projects/overview" element={<LazyRoute><ProjectsOverviewShowcase /></LazyRoute>} />
        <Route path="templates/apps/projects/create" element={<LazyRoute><ProjectsCreateShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/details" element={<LazyRoute><JobDetailsShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/list" element={<LazyRoute><JobsListShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/jobpost" element={<LazyRoute><JobPostShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/searchcompany" element={<LazyRoute><SearchCompanyShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/searchjobs" element={<LazyRoute><SearchJobsShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/searchcandidate" element={<LazyRoute><SearchCandidateShowcase /></LazyRoute>} />
        <Route path="templates/apps/jobs/candidatedetails" element={<LazyRoute><CandidateDetailsShowcase /></LazyRoute>} />
        <Route path="templates/apps/nft/marketplace" element={<LazyRoute><NFTMarketplaceShowcase /></LazyRoute>} />
        <Route path="templates/apps/nft/details" element={<LazyRoute><NFTDetailsShowcase /></LazyRoute>} />
        <Route path="templates/apps/nft/create" element={<LazyRoute><NFTCreateShowcase /></LazyRoute>} />
        <Route path="templates/apps/nft/wallet" element={<LazyRoute><NFTWalletShowcase /></LazyRoute>} />
        <Route path="templates/apps/nft/liveauction" element={<LazyRoute><NFTLiveAuctionShowcase /></LazyRoute>} />
        <Route path="templates/apps/crm/contacts" element={<LazyRoute><CRMContactsShowcase /></LazyRoute>} />
        <Route path="templates/apps/crm/companies" element={<LazyRoute><CRMCompaniesShowcase /></LazyRoute>} />
        <Route path="templates/apps/crm/deals" element={<LazyRoute><CRMDealsShowcase /></LazyRoute>} />
        <Route path="templates/apps/crm/leads" element={<LazyRoute><CRMLeadsShowcase /></LazyRoute>} />
        <Route path="templates/apps/crypto/transactions" element={<LazyRoute><CryptoTransactionsShowcase /></LazyRoute>} />
        <Route path="templates/apps/crypto/exchange" element={<LazyRoute><CryptoExchangeShowcase /></LazyRoute>} />
        <Route path="templates/apps/crypto/buysell" element={<LazyRoute><CryptoBuySellShowcase /></LazyRoute>} />
        <Route path="templates/apps/crypto/marketcap" element={<LazyRoute><CryptoMarketcapShowcase /></LazyRoute>} />
        <Route path="templates/apps/crypto/wallet" element={<LazyRoute><CryptoWalletShowcase /></LazyRoute>} />

        {/* Pages */}
        <Route path="templates/pages/aboutus" element={<LazyRoute><AboutUsShowcase /></LazyRoute>} />
        <Route path="templates/pages/chat" element={<LazyRoute><ChatShowcase /></LazyRoute>} />
        <Route path="templates/pages/contacts" element={<LazyRoute><ContactsShowcase /></LazyRoute>} />
        <Route path="templates/pages/contactus" element={<LazyRoute><ContactUsShowcase /></LazyRoute>} />
        <Route path="templates/pages/empty" element={<LazyRoute><EmptyShowcase /></LazyRoute>} />
        <Route path="templates/pages/faqs" element={<LazyRoute><FAQsShowcase /></LazyRoute>} />
        <Route path="templates/pages/landing" element={<LazyRoute><LandingShowcase /></LazyRoute>} />
        <Route path="templates/pages/jobslanding" element={<LazyRoute><JobsLandingShowcase /></LazyRoute>} />
        <Route path="templates/pages/notifications" element={<LazyRoute><NotificationsShowcase /></LazyRoute>} />
        <Route path="templates/pages/pricing" element={<LazyRoute><PricingShowcase /></LazyRoute>} />
        <Route path="templates/pages/profile" element={<LazyRoute><ProfileShowcase /></LazyRoute>} />
        <Route path="templates/pages/profile-edit" element={<LazyRoute><ProfileEditShowcase /></LazyRoute>} />
        <Route path="templates/pages/reviews" element={<LazyRoute><ReviewsShowcase /></LazyRoute>} />
        <Route path="templates/pages/team" element={<LazyRoute><TeamShowcase /></LazyRoute>} />
        <Route path="templates/pages/termsconditions" element={<LazyRoute><TermsConditionsShowcase /></LazyRoute>} />
        <Route path="templates/pages/timeline" element={<LazyRoute><TimelineShowcase /></LazyRoute>} />
        <Route path="templates/pages/todolist" element={<LazyRoute><ToDoListShowcase /></LazyRoute>} />
        <Route path="templates/pages/filemanager/filemanager" element={<LazyRoute><FileManagerShowcase /></LazyRoute>} />
        <Route path="templates/pages/blog/blog" element={<LazyRoute><BlogShowcase /></LazyRoute>} />
        <Route path="templates/pages/blog/details" element={<LazyRoute><BlogDetailsShowcase /></LazyRoute>} />
        <Route path="templates/pages/blog/create" element={<LazyRoute><CreateBlogShowcase /></LazyRoute>} />
        <Route path="templates/pages/email/mailapp" element={<LazyRoute><MailAppShowcase /></LazyRoute>} />
        <Route path="templates/pages/email/maileditor" element={<LazyRoute><MailEditorShowcase /></LazyRoute>} />
        <Route path="templates/pages/email/mailsettings" element={<LazyRoute><MailSettingsShowcase /></LazyRoute>} />
        <Route path="templates/pages/email/interno" element={<LazyRoute><EmailInternoShowcase /></LazyRoute>} />
        <Route path="templates/pages/email/externo" element={<LazyRoute><EmailExternoShowcase /></LazyRoute>} />
        <Route path="templates/pages/invoice/create" element={<LazyRoute><CreateInvoiceShowcase /></LazyRoute>} />
        <Route path="templates/pages/invoice/details" element={<LazyRoute><InvoiceDetailsShowcase /></LazyRoute>} />
        <Route path="templates/pages/invoice/list" element={<LazyRoute><InvoiceListShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/products" element={<LazyRoute><ProductsShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/productdetails" element={<LazyRoute><ProductDetailsShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/cart" element={<LazyRoute><CartShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/checkout" element={<LazyRoute><CheckoutShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/addproducts" element={<LazyRoute><AddProductsShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/editproducts" element={<LazyRoute><EditProductsShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/orders" element={<LazyRoute><OrdersShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/orderdetails" element={<LazyRoute><OrderDetailsShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/productlist" element={<LazyRoute><EcommerceProductsListShowcase /></LazyRoute>} />
        <Route path="templates/pages/ecommerce/wishlist" element={<LazyRoute><WishlistShowcase /></LazyRoute>} />

        {/* Task */}
        <Route path="templates/task/kanban" element={<LazyRoute><KanbanShowcase /></LazyRoute>} />
        <Route path="templates/task/listview" element={<LazyRoute><ListViewShowcase /></LazyRoute>} />
        <Route path="templates/task/details" element={<LazyRoute><TaskDetailsShowcase /></LazyRoute>} />

        {/* Authentication */}
        <Route path="templates/auth/signin/basic" element={<LazyRoute><SignInBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/signin/cover" element={<LazyRoute><SignInCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/signup/basic" element={<LazyRoute><SignUpBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/signup/cover" element={<LazyRoute><SignUpCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/resetpassword/basic" element={<LazyRoute><ResetPasswordBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/resetpassword/cover" element={<LazyRoute><ResetPasswordCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/createpassword/basic" element={<LazyRoute><CreatePasswordBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/createpassword/cover" element={<LazyRoute><CreatePasswordCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/lockscreen/basic" element={<LazyRoute><LockScreenBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/lockscreen/cover" element={<LazyRoute><LockScreenCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/twostep/basic" element={<LazyRoute><TwoStepBasicShowcase /></LazyRoute>} />
        <Route path="templates/auth/twostep/cover" element={<LazyRoute><TwoStepCoverShowcase /></LazyRoute>} />
        <Route path="templates/auth/comingsoon" element={<LazyRoute><ComingSoonShowcase /></LazyRoute>} />
        <Route path="templates/auth/undermaintenance" element={<LazyRoute><UnderMaintenanceShowcase /></LazyRoute>} />

        {/* Widgets */}
        <Route path="templates/widgets" element={<LazyRoute><WidgetsShowcase /></LazyRoute>} />

        {/* Error */}
        <Route path="templates/error/401" element={<LazyRoute><Error401Showcase /></LazyRoute>} />
        <Route path="templates/error/404" element={<LazyRoute><Error404Showcase /></LazyRoute>} />
        <Route path="templates/error/500" element={<LazyRoute><Error500Showcase /></LazyRoute>} />

        {/* Charts */}
        <Route path="templates/charts/apex/line" element={<LazyRoute><ApexLineChart /></LazyRoute>} />
        <Route path="templates/charts/apex/area" element={<LazyRoute><ApexAreaChart /></LazyRoute>} />
        <Route path="templates/charts/apex/column" element={<LazyRoute><ApexColumnChart /></LazyRoute>} />
        <Route path="templates/charts/apex/bar" element={<LazyRoute><ApexBarChart /></LazyRoute>} />
        <Route path="templates/charts/apex/mixed" element={<LazyRoute><ApexMixedChart /></LazyRoute>} />
        <Route path="templates/charts/apex/rangearea" element={<LazyRoute><ApexRangeAreaChart /></LazyRoute>} />
        <Route path="templates/charts/apex/timeline" element={<LazyRoute><ApexTimelineChart /></LazyRoute>} />
        <Route path="templates/charts/apex/funnel" element={<LazyRoute><ApexFunnelChart /></LazyRoute>} />
        <Route path="templates/charts/apex/candlestick" element={<LazyRoute><ApexCandleStickChart /></LazyRoute>} />
        <Route path="templates/charts/apex/boxplot" element={<LazyRoute><ApexBoxplotChart /></LazyRoute>} />
        <Route path="templates/charts/apex/bubble" element={<LazyRoute><ApexBubbleChart /></LazyRoute>} />
        <Route path="templates/charts/apex/scatter" element={<LazyRoute><ApexScatterChart /></LazyRoute>} />
        <Route path="templates/charts/apex/heatmap" element={<LazyRoute><ApexHeatmapChart /></LazyRoute>} />
        <Route path="templates/charts/apex/treemap" element={<LazyRoute><ApexTreemapChart /></LazyRoute>} />
        <Route path="templates/charts/apex/pie" element={<LazyRoute><ApexPieChart /></LazyRoute>} />
        <Route path="templates/charts/apex/radialbar" element={<LazyRoute><ApexRadialBarChart /></LazyRoute>} />
        <Route path="templates/charts/apex/radar" element={<LazyRoute><ApexRadarChart /></LazyRoute>} />
        <Route path="templates/charts/apex/polararea" element={<LazyRoute><ApexPolarAreaChart /></LazyRoute>} />
        <Route path="templates/charts/chartjs" element={<LazyRoute><ChartjsShowcase /></LazyRoute>} />
        <Route path="templates/charts/echart" element={<LazyRoute><EchartShowcase /></LazyRoute>} />

        <Route path="templates/*" element={<TemplatePlaceholder />} />
      </Route>

      {/* Admin / Settings area */}
      <Route path="/settings" element={<ProtectedAdminLayout />}>
        <Route element={<AdminLayout />}>
        <Route index element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        <Route path="usuarios" element={<LazyRoute><UsersAdmin /></LazyRoute>} />
        <Route path="empresas" element={<LazyRoute><CompaniesAdmin /></LazyRoute>} />
        <Route path="acessos" element={<LazyRoute><AccessAdmin /></LazyRoute>} />
        <Route path="sistema" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="atividade" element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        <Route path="integracoes" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="notificacoes" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="logs" element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        </Route>
      </Route>

      {/* Portal da Transparência — Admin (rotas mais específicas primeiro) */}
      <Route path="/portal/admin" element={<LazyRoute><PortalAdminLayout /></LazyRoute>}>
        <Route index element={<LazyRoute><PortalAdminDashboard /></LazyRoute>} />
        <Route path="menus" element={<LazyRoute><PortalMenusList /></LazyRoute>} />
        <Route path="menus/novo" element={<LazyRoute><PortalMenuForm /></LazyRoute>} />
        <Route path="menus/:id" element={<LazyRoute><PortalMenuForm /></LazyRoute>} />
        <Route path="grupos" element={<LazyRoute><PortalGruposList /></LazyRoute>} />
        <Route path="grupos/novo" element={<LazyRoute><PortalGrupoForm /></LazyRoute>} />
        <Route path="grupos/:id" element={<LazyRoute><PortalGrupoForm /></LazyRoute>} />
        <Route path="noticias" element={<LazyRoute><PortalNoticiasList /></LazyRoute>} />
        <Route path="noticias/nova" element={<LazyRoute><PortalNoticiaForm /></LazyRoute>} />
        <Route path="noticias/:id" element={<LazyRoute><PortalNoticiaForm /></LazyRoute>} />
      </Route>

      {/* Portal da Transparência — Público */}
      <Route path="/portal" element={<LazyRoute><PortalLayout /></LazyRoute>}>
        <Route index element={<LazyRoute><PortalHome /></LazyRoute>} />
        <Route path="noticias/:slug" element={<LazyRoute><PortalNoticia /></LazyRoute>} />
        <Route path="grupo/:slug" element={<LazyRoute><PortalGrupo /></LazyRoute>} />
        <Route path=":menuSlug" element={<LazyRoute><PortalMenuDinamico /></LazyRoute>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
