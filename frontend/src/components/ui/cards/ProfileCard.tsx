import { MoreVertical, UserPlus, type LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/buttons';
import { cn } from '@/lib/utils';

export interface ProfileCardStat {
  label: string;
  value: string | number;
}

export interface ProfileCardSocial {
  key: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export interface ProfileCardProps {
  name: string;
  role: string;
  /** URL da imagem do avatar. Se ausente, mostra iniciais. */
  avatarUrl?: string;
  /** URL da imagem de capa (cover). */
  coverUrl?: string;
  /** Iniciais customizadas. Default: derivado do nome. */
  initials?: string;
  /** Métricas exibidas em colunas (até 3). */
  stats?: ProfileCardStat[];
  /** Texto de bio/descrição. */
  bio?: string;
  /** Texto do botão CTA. Default: "Seguir". */
  actionLabel?: string;
  /** Callback do botão CTA. */
  onAction?: () => void;
  /** Esconde o botão CTA. */
  hideAction?: boolean;
  /** Ações sociais exibidas no rodapé. */
  socials?: ProfileCardSocial[];
  /** Callback do botão de menu (kebab). */
  onMenu?: () => void;
  /** Esconde o botão de menu. */
  hideMenu?: boolean;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Card de perfil com cover, avatar grande sobreposto, métricas, CTA e bio.
 * Pensado para listas de usuários, equipe, colaboradores e perfis públicos.
 */
export function ProfileCard({
  name,
  role,
  avatarUrl,
  coverUrl,
  initials,
  stats,
  bio,
  actionLabel = 'Seguir',
  onAction,
  hideAction = false,
  socials,
  onMenu,
  hideMenu = false,
  className,
}: ProfileCardProps) {
  const displayInitials = initials ?? getInitials(name);

  return (
    <article
      className={cn(
        'relative rounded-3xl bg-card text-card-foreground shadow-elevated overflow-hidden flex flex-col',
        className,
      )}
    >
      <div className="relative h-32 bg-surface-container-low">
        {coverUrl && (
          <img src={coverUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
        )}
      </div>

      <div className="relative px-6 pt-16 pb-7 flex flex-col items-center text-center">
        <Avatar className="absolute -top-14 left-1/2 -translate-x-1/2 h-28 w-28 border-4 border-card shadow-elevated">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
          <AvatarFallback className="bg-primary/10 text-primary font-display font-bold text-xl">
            {displayInitials}
          </AvatarFallback>
        </Avatar>

        {!hideMenu && (
          <button
            type="button"
            aria-label="Mais ações"
            onClick={onMenu}
            className="absolute top-3 right-3 w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
          >
            <MoreVertical size={18} />
          </button>
        )}

        <h3 className="font-display font-extrabold text-xl text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{role}</p>

        {stats && stats.length > 0 && (
          <div
            className="grid gap-8 mt-5"
            style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))` }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-extrabold text-primary leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {!hideAction && (
          <Button
            onClick={onAction}
            className="w-full mt-6 h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-base"
          >
            <UserPlus size={16} /> {actionLabel}
          </Button>
        )}

        {bio && <p className="text-sm text-muted-foreground leading-relaxed mt-5">{bio}</p>}

        {socials && socials.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-5 pt-5 border-t border-border/50 w-full">
            {socials.map((s) => (
              <IconButton
                key={s.key}
                variant="ghost"
                size="sm"
                label={s.label}
                icon={s.icon}
                iconSize={14}
                onClick={s.onClick}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
