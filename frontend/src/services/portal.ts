import { portalApi, USE_MOCK } from '@/lib/portalApi';
import { mockGrupos, mockMenus, mockNoticias } from '@/mocks/portal';
import type { GrupoNoticias, Menu, Noticia } from '@/types/portal';

// in-memory mock store (mutável durante a sessão)
let menus = [...mockMenus];
let grupos = [...mockGrupos];
let noticias = [...mockNoticias];

const delay = <T,>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));
const uid = () => Math.random().toString(36).slice(2, 10);
const nowIso = () => new Date().toISOString();

// ───── Portal público ─────
export async function getMenus(): Promise<Menu[]> {
  if (USE_MOCK) return delay(menus.filter((m) => m.ativo));
  const { data } = await portalApi.get<Menu[]>('/portal/menus');
  return data;
}

export async function getDestaques(): Promise<Noticia[]> {
  if (USE_MOCK) return delay(noticias.filter((n) => n.destaque && n.status === 'publicada'));
  const { data } = await portalApi.get<Noticia[]>('/portal/noticias/destaques');
  return data;
}

export async function getRecentes(): Promise<Noticia[]> {
  if (USE_MOCK)
    return delay(
      [...noticias]
        .filter((n) => n.status === 'publicada')
        .sort((a, b) => +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao)),
    );
  const { data } = await portalApi.get<Noticia[]>('/portal/noticias/recentes');
  return data;
}

export async function getNoticia(slug: string): Promise<Noticia> {
  if (USE_MOCK) {
    const n = noticias.find((x) => x.slug === slug);
    if (!n) throw new Error('Notícia não encontrada');
    return delay(n);
  }
  const { data } = await portalApi.get<Noticia>(`/portal/noticias/${slug}`);
  return data;
}

export async function getGrupo(
  slug: string,
): Promise<{ grupo: GrupoNoticias; noticias: Noticia[] }> {
  if (USE_MOCK) {
    const grupo =
      grupos.find((g) => g.nome.toLowerCase().replace(/\s+/g, '-') === slug) ?? grupos[0];
    return delay({
      grupo,
      noticias: noticias.filter((n) => n.grupoId === grupo.id),
    });
  }
  const { data } = await portalApi.get(`/portal/grupo/${slug}`);
  return data;
}

// ───── Admin ─────
export async function listAdminNoticias(): Promise<Noticia[]> {
  if (USE_MOCK) return delay(noticias);
  const { data } = await portalApi.get<Noticia[]>('/admin/noticias');
  return data;
}

export async function getAdminNoticia(id: string): Promise<Noticia | null> {
  if (USE_MOCK) return delay(noticias.find((n) => n.id === id) ?? null);
  const { data } = await portalApi.get<Noticia>(`/admin/noticias/${id}`);
  return data;
}

export async function saveNoticia(n: Partial<Noticia>): Promise<Noticia> {
  if (USE_MOCK) {
    if (n.id) {
      noticias = noticias.map((x) =>
        x.id === n.id ? { ...x, ...n, atualizadoEm: nowIso() } as Noticia : x,
      );
      return delay(noticias.find((x) => x.id === n.id)!);
    }
    const nova: Noticia = {
      id: uid(),
      slug: n.slug ?? uid(),
      manchete: n.manchete ?? '',
      resumo: n.resumo ?? '',
      corpo: n.corpo ?? '',
      imagem: n.imagem ?? '',
      imagemAlt: n.imagemAlt ?? '',
      categoria: n.categoria ?? 'Institucional',
      destaque: !!n.destaque,
      autorNome: n.autorNome ?? '',
      autorCargo: n.autorCargo ?? '',
      status: n.status ?? 'rascunho',
      dataPublicacao: n.dataPublicacao ?? nowIso(),
      dataExpiracao: n.dataExpiracao ?? null,
      naoExpira: n.naoExpira ?? true,
      publicadoEm: n.status === 'publicada' ? nowIso() : null,
      criadoEm: nowIso(),
      atualizadoEm: nowIso(),
      grupoId: n.grupoId,
      menuId: n.menuId,
      videoUrl: n.videoUrl,
    };
    noticias = [nova, ...noticias];
    return delay(nova);
  }
  if (n.id) {
    const { data } = await portalApi.put<Noticia>(`/admin/noticias/${n.id}`, n);
    return data;
  }
  const { data } = await portalApi.post<Noticia>('/admin/noticias', n);
  return data;
}

export async function deleteNoticia(id: string): Promise<void> {
  if (USE_MOCK) {
    noticias = noticias.filter((n) => n.id !== id);
    return delay(undefined);
  }
  await portalApi.delete(`/admin/noticias/${id}`);
}

export async function listAdminMenus(): Promise<Menu[]> {
  if (USE_MOCK) return delay(menus);
  const { data } = await portalApi.get<Menu[]>('/admin/menus');
  return data;
}

export async function saveMenu(m: Partial<Menu>): Promise<Menu> {
  if (USE_MOCK) {
    if (m.id) {
      menus = menus.map((x) => (x.id === m.id ? ({ ...x, ...m } as Menu) : x));
      return delay(menus.find((x) => x.id === m.id)!);
    }
    const novo: Menu = {
      id: uid(),
      label: m.label ?? 'Novo menu',
      slug: m.slug ?? uid(),
      ordem: m.ordem ?? menus.length + 1,
      ativo: m.ativo ?? true,
      tipo: m.tipo ?? 'vazio',
      menuPaiId: m.menuPaiId ?? null,
      icone: m.icone,
      grupoNoticiaId: m.grupoNoticiaId,
      noticiaId: m.noticiaId,
      urlExterna: m.urlExterna,
    };
    menus = [...menus, novo];
    return delay(novo);
  }
  if (m.id) {
    const { data } = await portalApi.put<Menu>(`/admin/menus/${m.id}`, m);
    return data;
  }
  const { data } = await portalApi.post<Menu>('/admin/menus', m);
  return data;
}

export async function deleteMenu(id: string): Promise<void> {
  if (USE_MOCK) {
    menus = menus.filter((m) => m.id !== id);
    return delay(undefined);
  }
  await portalApi.delete(`/admin/menus/${id}`);
}

export async function reorderMenus(updated: Menu[]): Promise<void> {
  if (USE_MOCK) {
    menus = updated;
    return delay(undefined);
  }
  await Promise.all(updated.map((m) => portalApi.put(`/admin/menus/${m.id}`, m)));
}

export async function listGrupos(): Promise<GrupoNoticias[]> {
  if (USE_MOCK) return delay(grupos);
  const { data } = await portalApi.get<GrupoNoticias[]>('/admin/grupos');
  return data;
}

export async function saveGrupo(g: Partial<GrupoNoticias>): Promise<GrupoNoticias> {
  if (USE_MOCK) {
    if (g.id) {
      grupos = grupos.map((x) => (x.id === g.id ? ({ ...x, ...g } as GrupoNoticias) : x));
      return delay(grupos.find((x) => x.id === g.id)!);
    }
    const novo: GrupoNoticias = {
      id: uid(),
      nome: g.nome ?? 'Novo grupo',
      descricao: g.descricao,
      menuId: g.menuId,
      ativo: g.ativo ?? true,
    };
    grupos = [...grupos, novo];
    return delay(novo);
  }
  if (g.id) {
    const { data } = await portalApi.put<GrupoNoticias>(`/admin/grupos/${g.id}`, g);
    return data;
  }
  const { data } = await portalApi.post<GrupoNoticias>('/admin/grupos', g);
  return data;
}

export async function deleteGrupo(id: string): Promise<void> {
  if (USE_MOCK) {
    grupos = grupos.filter((g) => g.id !== id);
    return delay(undefined);
  }
  await portalApi.delete(`/admin/grupos/${id}`);
}

export async function uploadImagem(file: File): Promise<{ url: string }> {
  if (USE_MOCK) {
    return delay({ url: URL.createObjectURL(file) });
  }
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await portalApi.post<{ url: string }>('/admin/upload/imagem', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
