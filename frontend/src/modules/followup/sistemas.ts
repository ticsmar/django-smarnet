export const SISTEMA_CLIENTE_FOLLOWUP = 117;
export const SISTEMA_PROPOSTA_FOLLOWUP = 121;

export type FollowUpHostEmbed = {
  filtroKey: string;
  route?: string;
  routeLabel?: string;
  tabNameKey?: string;
};

/** Hosts that embed Follow-up. Key = PRE_SISTEMA / sit_codigo. */
export const FOLLOWUP_HOSTS: Partial<Record<number, FollowUpHostEmbed>> = {
  117: {
    filtroKey: "CLIENTE.CODIGO",
    route: "/app/commercial/customers",
    routeLabel: "Cadastro de clientes",
    tabNameKey: "followUp.host.117",
  },
  121: { filtroKey: "PRP_CODIGO", tabNameKey: "followUp.host.121" },
  3: { filtroKey: "ORDER_NO", tabNameKey: "followUp.host.3" },
};

export function hostEmbedFor(codigo: number): FollowUpHostEmbed | undefined {
  return FOLLOWUP_HOSTS[codigo];
}

export function followUpHostKey(sistema: number, filtro: string): string {
  return `${sistema}:${filtro}`;
}

export function followUpTabNameKey(sistema: number): string {
  return hostEmbedFor(sistema)?.tabNameKey ?? `followUp.host.${sistema}`;
}
