export const ADMINISTRACAO_CLIENTES_PATH = "/app/administration/customers";

export { ClientesPage } from "./pages/ClientesPage";
export { ClienteDetailPage } from "./pages/ClienteDetailPage";
export { AdministracaoClienteRoute } from "./components/AdministracaoClienteRoute";
export { useAdministracaoAccess } from "./hooks/useAdministracaoAccess";
export { ADMINISTRACAO_PERMS } from "./permissions";
export {
  useAtualizaCliente,
  useCliente,
  useClientes,
  useCreateClienteFromFuncionario,
  useGravaCliente,
} from "./hooks/useClientes";
