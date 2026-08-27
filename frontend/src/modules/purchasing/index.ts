export const PURCHASING_FORNECEDORES_PATH = "/app/purchasing/suppliers";

export { FornecedoresPage } from "./pages/FornecedoresPage";
export { FornecedorDetailPage } from "./pages/FornecedorDetailPage";
export { PurchasingFornecedorRoute } from "./components/PurchasingFornecedorRoute";
export { usePurchasingAccess } from "./hooks/usePurchasingAccess";
export { PURCHASING_PERMS } from "./permissions";
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
