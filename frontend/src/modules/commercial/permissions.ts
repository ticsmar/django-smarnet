/** Django permission strings for Administração Cliente. */
export const COMMERCIAL_PERMS = {
  viewCliente: "commercial_infrastructure.view_cliente",
  addCliente: "commercial_infrastructure.add_cliente",
  changeCliente: "commercial_infrastructure.change_cliente",
  changeClienteLimite: "commercial_infrastructure.change_clientelimite",
  changeClienteRisco: "commercial_infrastructure.change_clienterisco",
  viewContato: "commercial_infrastructure.view_clientecontato",
  addContato: "commercial_infrastructure.add_clientecontato",
  changeContato: "commercial_infrastructure.change_clientecontato",
  viewCobranca: "commercial_infrastructure.view_clientecobranca",
  addCobranca: "commercial_infrastructure.add_clientecobranca",
  changeCobranca: "commercial_infrastructure.change_clientecobranca",
  viewEmbarque: "commercial_infrastructure.view_clienteembarque",
  addEmbarque: "commercial_infrastructure.add_clienteembarque",
  changeEmbarque: "commercial_infrastructure.change_clienteembarque",
} as const;

export type CommercialPermission =
  (typeof COMMERCIAL_PERMS)[keyof typeof COMMERCIAL_PERMS];
