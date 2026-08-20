export const COMPRAS_FORNECEDORES_PATH = "/app/purchasing/suppliers";

export { FornecedoresPage } from "./pages/FornecedoresPage";
export { FornecedorDetailPage } from "./pages/FornecedorDetailPage";
export { ComprasFornecedorRoute } from "./components/ComprasFornecedorRoute";
export { useComprasAccess } from "./hooks/useComprasAccess";
export { COMPRAS_PERMS } from "./permissions";
export {
  useAtualizaFornecedor,
  useAtivaFornecedor,
  useExcluiFornecContato,
  useFornecContatos,
  useFornecedor,
  useFornecedores,
  useGravaFornecContato,
  useGravaFornecedor,
  useInativaFornecedor,
} from "./hooks/useFornecedores";
