import { Building2, ClipboardList, Droplets, Factory, Monitor, Settings2, Truck } from 'lucide-react';
import type { ComponentType } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useBranchManagerAccess } from '@/modules/device';
import { ADMINISTRACAO_PERMS } from '@/modules/administracao';
import { hasPermission } from '@/lib/userPermissions';
import { COMPRAS_PERMS } from '@/modules/compras';

export type ErpMenuItem = {
  key: string;
  icon: ComponentType<{ size?: number | string }>;
  path: string;
  managerOnly?: boolean;
  permission?: string;
};

export type ErpSection = {
  label: string | null;
  items: ErpMenuItem[];
};

export type ErpGroup = {
  key: string;
  icon: ComponentType<{ size?: number | string }>;
  /** Página índice do módulo, usada no menu e no breadcrumb. */
  path: string;
  sections: ErpSection[];
};

export const erpGroups: ErpGroup[] = [
  {
    key: 'administracao',
    icon: Building2,
    path: '/app/administration',
    sections: [
      {
        label: null,
        items: [
          {
            key: 'clientes',
            icon: Building2,
            path: '/app/administration/customers',
            permission: ADMINISTRACAO_PERMS.viewCliente,
          },
        ],
      },
    ],
  },
  {
    key: 'compras',
    icon: Droplets,
    path: '/app/purchasing',
    sections: [
      {
        label: null,
        items: [
          {
            key: 'compras_fornecedores',
            icon: Truck,
            path: '/app/purchasing/suppliers',
            permission: COMPRAS_PERMS.viewFornecedor,
          },
        ],
      },
    ],
  },
  {
    key: 'producao',
    icon: Factory,
    path: '/app/production',
    sections: [
      {
        label: null,
        items: [
          {
            key: 'ops',
            icon: ClipboardList,
            path: '/app/production/orders',
          },
        ],
      },
    ],
  },
  {
    key: 'configurar',
    icon: Settings2,
    path: '/app/access',
    sections: [
      {
        label: null,
        items: [{ key: 'devices', icon: Monitor, path: '/app/devices', managerOnly: true }],
      },
    ],
  },
];

export function findErpGroup(groupKey: string): ErpGroup | undefined {
  return erpGroups.find((group) => group.key === groupKey);
}

/** Grupos e itens que o usuário atual pode acessar. */
export function useVisibleErpGroups(): ErpGroup[] {
  const { user } = useApp();
  const { isManager: canAccessDevices } = useBranchManagerAccess();
  const canSeeAcessos = Boolean(
    canAccessDevices ||
      user?.is_branch_manager ||
      user?.can_manage_access ||
      user?.is_superuser,
  );

  return erpGroups
    .map((group) => ({
      ...group,
      sections: group.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            if (item.managerOnly && !canAccessDevices && !user?.is_branch_manager && !user?.is_superuser) {
              return false;
            }
            if (item.permission && !hasPermission(user, item.permission)) return false;
            return true;
          }),
        }))
        .filter((section) => section.items.length > 0),
    }))
    .filter((group) => {
      if (group.sections.length > 0) return true;
      // Acessos: visível para admin de acesso e gerente de filial
      // mesmo sem itens filhos (ex.: admin sem devices).
      return group.key === 'configurar' && canSeeAcessos;
    });
}
