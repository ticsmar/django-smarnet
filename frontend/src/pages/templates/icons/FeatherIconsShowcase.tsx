import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { IconsLayout, IconGrid, IconCell } from './IconsLayout';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Feather icons are a subset of Lucide (Lucide is the fork of Feather)
// We show common Feather-origin icons
const featherNames = [
  'Activity','Airplay','AlertCircle','AlertOctagon','AlertTriangle','AlignCenter','AlignJustify','AlignLeft','AlignRight',
  'Anchor','Archive','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','AtSign','Award',
  'BarChart','BarChart2','Battery','BatteryCharging','Bell','BellOff','Bluetooth','Bold','Book','BookOpen','Bookmark',
  'Briefcase','Calendar','Camera','CameraOff','Cast','Check','CheckCircle','CheckSquare','ChevronDown',
  'ChevronLeft','ChevronRight','ChevronUp','Chrome','Circle','Clipboard','Clock','Cloud','CloudDrizzle',
  'CloudLightning','CloudOff','CloudRain','CloudSnow','Code','Coffee','Columns','Command','Compass',
  'Copy','CornerDownLeft','CornerDownRight','CornerLeftDown','CornerLeftUp','CornerRightDown','CornerRightUp',
  'CornerUpLeft','CornerUpRight','Cpu','CreditCard','Crop','Crosshair','Database','Delete',
  'Disc','DollarSign','Download','Droplet','Edit','Edit2','Edit3','ExternalLink','Eye','EyeOff',
  'Facebook','FastForward','Feather','File','FileMinus','FilePlus','FileText','Film','Filter','Flag',
  'Folder','FolderMinus','FolderPlus','Framer','Frown','Gift','GitBranch','GitCommit','GitMerge','GitPullRequest',
  'Globe','Grid','HardDrive','Hash','Headphones','Heart','HelpCircle','Hexagon','Home',
  'Image','Inbox','Info','Italic','Key','Layers','Layout','LifeBuoy','Link','Link2',
  'List','Loader','Lock','LogIn','LogOut','Mail','Map','MapPin','Maximize','Maximize2',
  'Meh','Menu','MessageCircle','MessageSquare','Mic','MicOff','Minimize','Minimize2','Minus','MinusCircle',
  'MinusSquare','Monitor','Moon','MoreHorizontal','MoreVertical','MousePointer','Move','Music','Navigation',
  'Navigation2','Octagon','Package','Paperclip','Pause','PauseCircle','PenTool','Percent','Phone',
  'PhoneCall','PhoneForwarded','PhoneIncoming','PhoneMissed','PhoneOff','PhoneOutgoing','PieChart','Play',
  'PlayCircle','Plus','PlusCircle','PlusSquare','Pocket','Power','Printer','Radio','RefreshCw','RefreshCcw',
  'Repeat','Rewind','RotateCcw','RotateCw','Rss','Save','Scissors','Search','Send','Server','Settings',
  'Share','Share2','Shield','ShieldOff','ShoppingBag','ShoppingCart','Shuffle','Sidebar','SkipBack','SkipForward',
  'Slash','Sliders','Smartphone','Smile','Speaker','Square','Star','StopCircle','Sun','Sunrise','Sunset',
  'Tablet','Tag','Target','Terminal','Thermometer','ThumbsDown','ThumbsUp','ToggleLeft','ToggleRight',
  'Trash','Trash2','Triangle','Truck','Tv','Twitter','Type','Umbrella','Underline','Unlock','Upload',
  'User','UserCheck','UserMinus','UserPlus','UserX','Users','Video','VideoOff','Voicemail','Volume',
  'Volume1','Volume2','VolumeX','Watch','Wifi','WifiOff','Wind','X','XCircle','XSquare','Zap','ZapOff','ZoomIn','ZoomOut',
];

const iconEntries = featherNames
  .filter(name => (LucideIcons as any)[name])
  .map(name => [name, (LucideIcons as any)[name]] as [string, any]);

export default function FeatherIconsShowcase() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return iconEntries.filter(([name]) => name.toLowerCase().includes(q));
  }, [search]);

  return (
    <IconsLayout
      title="Feather Icons"
      description="Ícones Feather — conjunto original que deu origem ao Lucide. Ícones minimalistas e com traço consistente."
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input placeholder="Buscar ícones..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>
      <p className="text-xs text-muted-foreground">Exibindo {filtered.length} de {iconEntries.length} ícones</p>
      <IconGrid>
        {filtered.map(([name, IconComp]) => (
          <IconCell key={name} name={name} icon={<IconComp size={22} />} />
        ))}
      </IconGrid>
    </IconsLayout>
  );
}
