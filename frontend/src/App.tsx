import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import LandingPage from "./pages/LandingPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPassword from "./pages/ForgotPassword";
import RequestAccess from "./pages/RequestAccess";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/AppLayout";
import { AdminLayout } from "./components/AdminLayout";
import { DeviceTokensPage, DeviceManagerRoute } from "./modules/device";
import { AccessAdminRoute } from "./modules/admin";
import { FornecedoresPage as ComprasFornecedoresPage, FornecedorDetailPage, ComprasFornecedorRoute } from "./modules/compras";
import { lazy, Suspense } from "react";

// Admin (Settings)
const SettingsOverview = lazy(() => import("./pages/admin/SettingsOverview"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const CompaniesAdmin = lazy(() => import("./pages/admin/CompaniesAdmin"));
const AccessAdmin = lazy(() => import("./pages/admin/AccessAdmin"));
const SystemAdmin = lazy(() => import("./pages/admin/SystemAdmin"));

// Profile (TopNav) + Home hub
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HomePage = lazy(() => import("./pages/HomePage"));

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

function SuperuserDesignSystemLayout() {
  const { isAuthenticated, authLoading, user } = useApp();
  if (authLoading) return <AuthLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (user?.must_change_password) return <Navigate to="/change-password" replace />;
  if (!user?.is_superuser) return <Navigate to="/app" replace />;
  return (
    <LazyRoute>
      <DesignSystemLayout />
    </LazyRoute>
  );
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

      {/* Design System — superusers only */}
      <Route path="/design-system" element={<SuperuserDesignSystemLayout />}>
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

      {/* Authenticated app — home hub + Compras + Devices (+ profile via TopNav) */}
      <Route path="/app" element={<ProtectedLayout />}>
        <Route index element={<LazyRoute><HomePage /></LazyRoute>} />
        <Route path="profile" element={<LazyRoute><ProfilePage /></LazyRoute>} />
        <Route path="devices" element={<DeviceManagerRoute />}>
          <Route index element={<DeviceTokensPage />} />
        </Route>
        <Route path="compras/fornecedores" element={<ComprasFornecedorRoute />}>
          <Route index element={<ComprasFornecedoresPage />} />
          <Route path=":codFornec" element={<FornecedorDetailPage />} />
        </Route>
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
