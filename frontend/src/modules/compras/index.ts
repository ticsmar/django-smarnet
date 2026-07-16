export const COMPRAS_FORNECEDORES_PATH = "/app/compras/fornecedores";

export { FornecedoresPage } from "./pages/FornecedoresPage";
export { FornecedorDetailPage } from "./pages/FornecedorDetailPage";
export { ComprasFornecedorRoute } from "./components/ComprasFornecedorRoute";
export { useComprasAccess } from "./hooks/useComprasAccess";
export { COMPRAS_PERMS, hasPermission } from "./permissions";
export {
  useAtivaFornecedor,
  useExcluiFornecContato,
  useFornecContatos,
  useFornecedor,
  useFornecedores,
  useGravaFornecContato,
  useGravaFornecedor,
  useInativaFornecedor,
} from "./hooks/useFornecedores";
