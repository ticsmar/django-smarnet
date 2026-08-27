import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import LandingPage from "./pages/LandingPage";
import { LGPDBanner } from "./components/LGPDBanner";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPassword from "./pages/ForgotPassword";
import RequestAccess from "./pages/RequestAccess";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/AppLayout";
import { AdminLayout } from "./components/AdminLayout";
import { ModuleIndexPage } from "./components/ModuleIndexPage";
import { PermissionRoute } from "./components/PermissionRoute";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { DeviceTokensPage, DeviceManagerRoute } from "./modules/device";
import { AccessAdminRoute } from "./modules/admin";
import {
  FornecedoresPage as ComprasFornecedoresPage,
  FornecedorDetailPage,
  PurchasingFornecedorRoute,
  PURCHASING_PERMS,
} from "./modules/purchasing";
import {
  ClientesPage as AdministracaoClientesPage,
  ClienteDetailPage,
  CommercialClienteRoute,
  COMMERCIAL_PERMS,
} from "./modules/commercial";
import { ADMINISTRATION_PERMS } from "./modules/administration";
import { lazy, Suspense } from "react";
import { canAccessAdminDevArea } from "@/lib/adminDevAccess";

// Admin (Settings)
const SettingsOverview = lazy(() => import("./pages/admin/SettingsOverview"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const ImportUsersAdmin = lazy(() => import("./pages/admin/ImportUsersAdmin"));
const SolicitacoesAdmin = lazy(() => import("./pages/admin/SolicitacoesAdmin"));
const CompaniesAdmin = lazy(() => import("./pages/admin/CompaniesAdmin"));
const PeopleAdmin = lazy(() => import("./pages/admin/PeopleAdmin"));
const CountriesAdmin = lazy(() => import("./pages/admin/CountriesAdmin"));
const StatesAdmin = lazy(() => import("./pages/admin/StatesAdmin"));
const AccessAdmin = lazy(() => import("./pages/admin/AccessAdmin"));
const SystemAdmin = lazy(() => import("./pages/admin/SystemAdmin"));
const FileManagerSistemasAdmin = lazy(() => import("./pages/admin/FileManagerSistemasAdmin"));

// Profile (TopNav) + Home hub
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const OrdemProducaoListPage = lazy(() => import("./modules/production/pages/OrdemProducaoListPage"));

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
const DSCCollection = lazy(() => import("./pages/design-system/components/pages/CollectionPage"));
const DSPatterns = lazy(() => import("./pages/design-system/PatternsPage"));
const DSDashboards = lazy(() => import("./pages/design-system/DashboardsPage"));
const DSTemplates = lazy(() => import("./pages/design-system/TemplateElementsPage"));
const DSIntegrations = lazy(() => import("./pages/design-system/IntegrationsPage"));
const DocsLayout = lazy(() => import("./pages/docs/DocsLayout"));
const DocPage = lazy(() =>
  import("./pages/docs/DocsLayout").then((m) => ({ default: m.DocPage })),
);
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

// Portal da Transparência
const PortalLayout = lazy(() => import("./modules/portal/pages/PortalLayout"));
const PortalHome = lazy(() => import("./modules/portal/pages/PortalHome"));
const PortalNoticia = lazy(() => import("./modules/portal/pages/NoticiaPage"));
const PortalGrupo = lazy(() => import("./modules/portal/pages/GrupoPage"));
const PortalMenuDinamico = lazy(() => import("./modules/portal/pages/MenuDinamicoPage"));
const PortalAdminLayout = lazy(() => import("./modules/portal/pages/admin/PortalAdminLayout"));
const PortalAdminDashboard = lazy(() => import("./modules/portal/pages/admin/AdminDashboard"));
const PortalNoticiasList = lazy(() => import("./modules/portal/pages/admin/NoticiasList"));
const PortalNoticiaForm = lazy(() => import("./modules/portal/pages/admin/NoticiaForm"));
const PortalMenusList = lazy(() => import("./modules/portal/pages/admin/MenusList"));
const PortalMenuForm = lazy(() => import("./modules/portal/pages/admin/MenuForm"));
const PortalGruposList = lazy(() => import("./modules/portal/pages/admin/GruposList"));
const PortalGrupoForm = lazy(() => import("./modules/portal/pages/admin/GrupoForm"));

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
  if (!canAccessAdminDevArea(user)) return <Navigate to="/app" replace />;
  return (
    <LazyRoute>
      <DesignSystemLayout />
    </LazyRoute>
  );
}

function AuthenticatedDocsLayout() {
  const { isAuthenticated, authLoading, user } = useApp();
  if (authLoading) return <AuthLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (user?.must_change_password) return <Navigate to="/change-password" replace />;
  if (!canAccessAdminDevArea(user)) return <Navigate to="/app" replace />;
  return (
    <LazyRoute>
      <DocsLayout />
    </LazyRoute>
  );
}

function LegacySupplierRedirect() {
  const { codFornec } = useParams();
  return <Navigate to={`/app/purchasing/suppliers/${codFornec ?? ""}`} replace />;
}

function LegacyCustomerRedirect() {
  const { codCliente } = useParams();
  return (
    <Navigate to={`/app/commercial/customers/${codCliente ?? ""}`} replace />
  );
}

function LegacyCustomerEditRedirect() {
  const { codCliente } = useParams();
  return (
    <Navigate
      to={`/app/commercial/customers/${codCliente ?? ""}/edit`}
      replace
    />
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
      <Route
        path="/privacy"
        element={
          <LazyRoute>
            <PrivacyPage />
          </LazyRoute>
        }
      />
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
          <Route path="collection" element={<LazyRoute><DSCCollection /></LazyRoute>} />
        </Route>
        <Route path="patterns" element={<LazyRoute><DSPatterns /></LazyRoute>} />
        <Route path="dashboards" element={<LazyRoute><DSDashboards /></LazyRoute>} />
        <Route path="templates" element={<LazyRoute><DSTemplates /></LazyRoute>} />
        <Route path="integrations" element={<LazyRoute><DSIntegrations /></LazyRoute>} />
      </Route>

      {/* Documentação do Sistema — usuários autenticados */}
      <Route path="/docs" element={<AuthenticatedDocsLayout />}>
        <Route index element={<LazyRoute><DocPage /></LazyRoute>} />
        <Route path="*" element={<LazyRoute><DocPage /></LazyRoute>} />
      </Route>

      {/* Authenticated app — home hub + modules (+ profile via TopNav) */}
      <Route path="/app" element={<ProtectedLayout />}>
        <Route index element={<LazyRoute><HomePage /></LazyRoute>} />
        <Route path="profile" element={<LazyRoute><ProfilePage /></LazyRoute>} />

        <Route path="commercial" element={<ModuleIndexPage groupKey="comercial" />} />
        <Route path="commercial/customers" element={<CommercialClienteRoute />}>
          <Route index element={<AdministracaoClientesPage />} />
          <Route path=":codCliente/edit" element={<ClienteDetailPage />} />
          <Route path=":codCliente" element={<ClienteDetailPage />} />
        </Route>
        <Route
          path="commercial/cliente"
          element={<Navigate to="/app/commercial/customers" replace />}
        />
        <Route
          path="commercial/cliente/:codCliente/edit"
          element={<LegacyCustomerEditRedirect />}
        />
        <Route
          path="commercial/cliente/:codCliente"
          element={<LegacyCustomerRedirect />}
        />

        <Route path="administration" element={<ModuleIndexPage groupKey="administracao" />} />
        <Route
          path="administration/dashboard"
          element={
            <PermissionRoute permission={ADMINISTRATION_PERMS.viewDashboard}>
              <ComingSoonPage
                groupKey="administracao"
                groupPath="/app/administration"
                titleKey="nav.administracao_dashboard"
              />
            </PermissionRoute>
          }
        />
        <Route
          path="administration/reports"
          element={
            <PermissionRoute permission={ADMINISTRATION_PERMS.viewRelatorio}>
              <ComingSoonPage
                groupKey="administracao"
                groupPath="/app/administration"
                titleKey="nav.relatorios"
              />
            </PermissionRoute>
          }
        />
        <Route
          path="administration/customers"
          element={<Navigate to="/app/commercial/customers" replace />}
        />
        <Route
          path="administration/customers/:codCliente/edit"
          element={<LegacyCustomerEditRedirect />}
        />
        <Route
          path="administration/customers/:codCliente"
          element={<LegacyCustomerRedirect />}
        />

        <Route path="purchasing" element={<ModuleIndexPage groupKey="compras" />} />
        <Route
          path="purchasing/dashboard"
          element={
            <PermissionRoute permission={PURCHASING_PERMS.viewDashboard}>
              <ComingSoonPage
                groupKey="compras"
                groupPath="/app/purchasing"
                titleKey="nav.compras_dashboard"
              />
            </PermissionRoute>
          }
        />
        <Route path="purchasing/suppliers" element={<PurchasingFornecedorRoute />}>
          <Route index element={<ComprasFornecedoresPage />} />
          <Route path=":codFornec" element={<FornecedorDetailPage />} />
        </Route>

        <Route path="production" element={<ModuleIndexPage groupKey="producao" />} />
        <Route
          path="production/dashboard"
          element={
            <ComingSoonPage
              groupKey="producao"
              groupPath="/app/production"
              titleKey="nav.producao_dashboard"
            />
          }
        />
        <Route path="production/orders" element={<LazyRoute><OrdemProducaoListPage /></LazyRoute>} />

        <Route path="access" element={<ModuleIndexPage groupKey="configurar" />} />
        <Route path="devices" element={<DeviceManagerRoute />}>
          <Route index element={<DeviceTokensPage />} />
        </Route>

        {/* PT legacy redirects */}
        <Route path="administracao" element={<Navigate to="/app/administration" replace />} />
        <Route path="administracao/clientes" element={<Navigate to="/app/commercial/customers" replace />} />
        <Route path="administracao/clientes/:codCliente/edit" element={<LegacyCustomerEditRedirect />} />
        <Route path="administracao/clientes/:codCliente" element={<LegacyCustomerRedirect />} />
        <Route path="comercial" element={<Navigate to="/app/commercial" replace />} />
        <Route path="comercial/clientes" element={<Navigate to="/app/commercial/customers" replace />} />
        <Route path="comercial/clientes/:codCliente/edit" element={<LegacyCustomerEditRedirect />} />
        <Route path="comercial/clientes/:codCliente" element={<LegacyCustomerRedirect />} />
        <Route path="comercial/cliente" element={<Navigate to="/app/commercial/customers" replace />} />
        <Route path="comercial/cliente/:codCliente/edit" element={<LegacyCustomerEditRedirect />} />
        <Route path="comercial/cliente/:codCliente" element={<LegacyCustomerRedirect />} />
        <Route path="compras" element={<Navigate to="/app/purchasing" replace />} />
        <Route path="compras/fornecedores" element={<Navigate to="/app/purchasing/suppliers" replace />} />
        <Route path="compras/fornecedores/:codFornec" element={<LegacySupplierRedirect />} />
        <Route path="producao" element={<Navigate to="/app/production" replace />} />
        <Route path="ops" element={<Navigate to="/app/production/orders" replace />} />
        <Route path="configurar" element={<Navigate to="/app/access" replace />} />
      </Route>

      {/* Admin / Settings area */}
      <Route path="/settings" element={<ProtectedAdminLayout />}>
        <Route element={<AdminLayout />}>
        <Route index element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        <Route path="access-requests" element={<LazyRoute><SolicitacoesAdmin /></LazyRoute>} />
        <Route path="users" element={<LazyRoute><UsersAdmin /></LazyRoute>} />
        <Route path="import-users" element={<LazyRoute><ImportUsersAdmin /></LazyRoute>} />
        <Route path="masters/companies" element={<LazyRoute><CompaniesAdmin /></LazyRoute>} />
        <Route path="masters/people" element={<LazyRoute><PeopleAdmin /></LazyRoute>} />
        <Route path="masters/countries" element={<LazyRoute><CountriesAdmin /></LazyRoute>} />
        <Route path="masters/states" element={<LazyRoute><StatesAdmin /></LazyRoute>} />
        <Route path="access-profiles" element={<LazyRoute><AccessAdmin /></LazyRoute>} />
        <Route path="system" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="file-manager" element={<LazyRoute><FileManagerSistemasAdmin /></LazyRoute>} />
        <Route path="activity" element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        <Route path="integrations" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="notifications" element={<LazyRoute><SystemAdmin /></LazyRoute>} />
        <Route path="logs" element={<LazyRoute><SettingsOverview /></LazyRoute>} />
        {/* PT legacy redirects */}
        <Route path="solicitacao" element={<Navigate to="/settings/access-requests" replace />} />
        <Route path="usuarios" element={<Navigate to="/settings/users" replace />} />
        <Route path="importar-usuario" element={<Navigate to="/settings/import-users" replace />} />
        <Route path="acessos" element={<Navigate to="/settings/access-profiles" replace />} />
        <Route path="empresas" element={<Navigate to="/settings/masters/companies" replace />} />
        <Route path="cadastros/empresas" element={<Navigate to="/settings/masters/companies" replace />} />
        <Route path="cadastros/pessoa" element={<Navigate to="/settings/masters/people" replace />} />
        <Route path="cadastros/pais" element={<Navigate to="/settings/masters/countries" replace />} />
        <Route path="cadastros/estado" element={<Navigate to="/settings/masters/states" replace />} />
        <Route path="sistema" element={<Navigate to="/settings/system" replace />} />
        <Route path="atividade" element={<Navigate to="/settings/activity" replace />} />
        <Route path="integracoes" element={<Navigate to="/settings/integrations" replace />} />
        <Route path="notificacoes" element={<Navigate to="/settings/notifications" replace />} />
        <Route path="gerenciador-arquivos" element={<Navigate to="/settings/file-manager" replace />} />
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
          <LGPDBanner />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
