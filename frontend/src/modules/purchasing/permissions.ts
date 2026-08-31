/** Django permission strings for Compras models (`app_label.codename`). */
export const PURCHASING_PERMS = {
  viewFornecedor: "purchasing_infrastructure.view_fornecedor",
  viewDashboard: "purchasing_infrastructure.view_dashboard",
  addFornecedor: "purchasing_infrastructure.add_fornecedor",
  changeFornecedor: "purchasing_infrastructure.change_fornecedor",
  deleteFornecedor: "purchasing_infrastructure.delete_fornecedor",
  viewFornecContato: "purchasing_infrastructure.view_forneccontato",
  addFornecContato: "purchasing_infrastructure.add_forneccontato",
  changeFornecContato: "purchasing_infrastructure.change_forneccontato",
  deleteFornecContato: "purchasing_infrastructure.delete_forneccontato",
} as const;

export type PurchasingPermission = (typeof PURCHASING_PERMS)[keyof typeof PURCHASING_PERMS];
