export { CLIENTES_PATH, COMERCIAL_PATH } from "./paths";

export { ClientesPage } from "./pages/ClientesPage";
export { ClienteDetailPage } from "./pages/ClienteDetailPage";
export { CommercialClienteRoute } from "./components/CommercialClienteRoute";
export { useCommercialAccess } from "./hooks/useCommercialAccess";
export { COMMERCIAL_PERMS } from "./permissions";
export {
  useAtualizaCliente,
  useCliente,
  useClientes,
  useCreateClienteFromFuncionario,
  useGravaCliente,
} from "./hooks/useClientes";
