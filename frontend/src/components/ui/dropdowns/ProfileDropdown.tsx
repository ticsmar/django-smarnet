import { ChevronDown, LogOut, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface ProfileMenuItem {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  destructive?: boolean;
  divider?: boolean;
}

export interface ProfileDropdownProps {
  name: string;
  email?: string;
  /** URL da imagem. Se ausente, mostra iniciais sobre fundo primary/10. */
  avatarUrl?: string;
  /** Iniciais customizadas. Default: derivado do nome. */
  initials?: string;
  items: ProfileMenuItem[];
  /** Item de logout (renderizado por último com separador, em destructive). Opcional. */
  onLogout?: () => void;
  logoutLabel?: string;
  align?: 'start' | 'center' | 'end';
  className?: string;
  contentClassName?: string;
  /** Esconde o nome ao lado do avatar (mostra só o avatar). */
  compact?: boolean;
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
 * Menu de perfil com avatar, nome, email e ações de conta.
 */
export function ProfileDropdown({
  name,
  email,
  avatarUrl,
  initials,
  items,
  onLogout,
  logoutLabel = 'Sair',
  align = 'end',
  className,
  contentClassName,
  compact = false,
}: ProfileDropdownProps) {
  const displayInitials = initials ?? getInitials(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Menu de ${name}`}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors',
            className,
          )}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
              {displayInitials}
            </div>
          )}
          {!compact && (
            <>
              <span className="text-sm font-medium text-foreground">{name}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-56', contentClassName)} align={align}>
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium text-foreground">{name}</p>
          {email && <p className="text-xs text-muted-foreground">{email}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <span key={item.key}>
              {item.divider && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onClick={item.onClick}
                className={cn(item.destructive && 'text-destructive focus:text-destructive')}
              >
                {Icon && <Icon size={14} />} {item.label}
              </DropdownMenuItem>
            </span>
          );
        })}
        {onLogout && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut size={14} /> {logoutLabel}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
