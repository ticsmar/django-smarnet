import {
  BarChart3,
  Building2,
  ClipboardList,
  Droplets,
  Factory,
  Handshake,
  LayoutDashboard,
  Monitor,
  Settings2,
  Truck,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useBranchManagerAccess } from '@/modules/device';
import { COMMERCIAL_PERMS } from '@/modules/commercial';
import { ADMINISTRATION_PERMS } from '@/modules/administration';
import { hasPermission } from '@/lib/userPermissions';
import { PURCHASING_PERMS } from '@/modules/purchasing';
import type { User } from '@/types/auth';

export type ErpIcon = ComponentType<{ size?: number | string }>;

export type ErpNavLink = {
  kind: 'link';
  key: string;
  path: string;
  permission?: string;
  managerOnly?: boolean;
};

export type ErpNavFolder = {
  kind: 'folder';
  key: string;
  children: ErpNavLink[];
};

export type ErpNavChild = ErpNavLink | ErpNavFolder;

export type ErpNavGroup = {
  kind: 'group';
  key: string;
  icon: ErpIcon;
  path: string;
  children: ErpNavChild[];
};

export type ErpNavRootLink = {
  kind: 'link';
  key: string;
  icon: ErpIcon;
  path: string;
  permission?: string;
  managerOnly?: boolean;
};

export type ErpNavRoot = ErpNavGroup | ErpNavRootLink;

type AccessCtx = {
  user: User | null;
  canAccessDevices: boolean;
  canSeeAcessos: boolean;
};

export const erpNav: ErpNavRoot[] = [
  {
    kind: 'group',
    key: 'comercial',
    icon: Handshake,
    path: '/app/commercial',
    children: [
      {
        kind: 'folder',
        key: 'cadastros',
        children: [
          {
            kind: 'link',
            key: 'clientes',
            path: '/app/commercial/customers',
            permission: COMMERCIAL_PERMS.viewCliente,
          },
        ],
      },
    ],
  },
  {
    kind: 'group',
    key: 'compras',
    icon: Droplets,
    path: '/app/purchasing',
    children: [
      {
        kind: 'link',
        key: 'compras_dashboard',
        path: '/app/purchasing/dashboard',
        permission: PURCHASING_PERMS.viewDashboard,
      },
      {
        kind: 'folder',
        key: 'cadastros',
        children: [
          {
            kind: 'link',
            key: 'compras_fornecedores',
            path: '/app/purchasing/suppliers',
            permission: PURCHASING_PERMS.viewFornecedor,
          },
        ],
      },
    ],
  },
  {
    kind: 'group',
    key: 'producao',
    icon: Factory,
    path: '/app/production',
    children: [
      {
        kind: 'link',
        key: 'producao_dashboard',
        path: '/app/production/dashboard',
      },
      {
        kind: 'link',
        key: 'ops',
        path: '/app/production/orders',
      },
    ],
  },
  {
    kind: 'group',
    key: 'administracao',
    icon: Building2,
    path: '/app/administration',
    children: [
      {
        kind: 'link',
        key: 'administracao_dashboard',
        path: '/app/administration/dashboard',
        permission: ADMINISTRATION_PERMS.viewDashboard,
      },
      {
        kind: 'link',
        key: 'relatorios',
        path: '/app/administration/reports',
        permission: ADMINISTRATION_PERMS.viewRelatorio,
      },
    ],
  },
  {
    kind: 'group',
    key: 'configurar',
    icon: Settings2,
    path: '/app/access',
    children: [
      {
        kind: 'link',
        key: 'devices',
        path: '/app/devices',
        managerOnly: true,
      },
    ],
  },
];

export function findErpGroup(groupKey: string): ErpNavGroup | undefined {
  const entry = erpNav.find((item) => item.kind === 'group' && item.key === groupKey);
  return entry?.kind === 'group' ? entry : undefined;
}

export function flattenNavLinks(children: ErpNavChild[]): ErpNavLink[] {
  return children.flatMap((child) =>
    child.kind === 'folder' ? child.children : [child],
  );
}

export function navChildIsActive(
  child: ErpNavChild,
  isActive: (path: string) => boolean,
): boolean {
  if (child.kind === 'link') {
    return isActive(child.path);
  }
  return child.children.some((link) => isActive(link.path));
}

export function navRootIsActive(
  entry: ErpNavRoot,
  isActive: (path: string) => boolean,
): boolean {
  if (entry.kind === 'link') {
    return isActive(entry.path);
  }
  return isActive(entry.path) || entry.children.some((child) => navChildIsActive(child, isActive));
}

function canSeeLink(link: ErpNavLink, ctx: AccessCtx): boolean {
  if (
    link.managerOnly &&
    !ctx.canAccessDevices &&
    !ctx.user?.is_branch_manager &&
    !ctx.user?.is_superuser
  ) {
    return false;
  }
  if (link.permission && !hasPermission(ctx.user, link.permission)) {
    return false;
  }
  return true;
}

function filterChild(child: ErpNavChild, ctx: AccessCtx): ErpNavChild | null {
  if (child.kind === 'link') {
    return canSeeLink(child, ctx) ? child : null;
  }
  const children = child.children.filter((link) => canSeeLink(link, ctx));
  return children.length > 0 ? { ...child, children } : null;
}

function filterRoot(entry: ErpNavRoot, ctx: AccessCtx): ErpNavRoot | null {
  if (entry.kind === 'link') {
    return canSeeLink(entry, ctx) ? entry : null;
  }
  const children = entry.children
    .map((child) => filterChild(child, ctx))
    .filter((child): child is ErpNavChild => child !== null);
  if (children.length > 0) {
    return { ...entry, children };
  }
  if (entry.key === 'configurar' && ctx.canSeeAcessos) {
    return { ...entry, children: [] };
  }
  return null;
}

/** Raiz do menu visível para o usuário atual. */
export function useVisibleErpNav(): ErpNavRoot[] {
  const { user } = useApp();
  const { isManager: canAccessDevices } = useBranchManagerAccess();
  const canSeeAcessos = Boolean(
    canAccessDevices ||
      user?.is_branch_manager ||
      user?.can_manage_access ||
      user?.is_superuser,
  );
  const ctx: AccessCtx = { user, canAccessDevices, canSeeAcessos };

  return erpNav
    .map((entry) => filterRoot(entry, ctx))
    .filter((entry): entry is ErpNavRoot => entry !== null);
}

/** @deprecated Use useVisibleErpNav. Mantido para o índice de módulo. */
export function useVisibleErpGroups(): ErpNavGroup[] {
  return useVisibleErpNav().filter((entry): entry is ErpNavGroup => entry.kind === 'group');
}
