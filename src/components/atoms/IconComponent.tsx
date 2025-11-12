import React from 'react';
import {
  Home,
  Bike,
  Wallet,
  Gift,
  HelpCircle,
  CircleHelp,
  Plus,
  Minus,
  Play,
  Square,
  Check,
  AlertTriangle,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Settings,
  MapPin,
  Clock,
  Battery,
  BatteryLow,
  Menu,
  Search,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Shield,
  LogOut,
  Edit,
  Edit2,
  Trash,
  Trash2,
  Download,
  Upload,
  Send,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Heart,
  Star,
  Bookmark,
  Share2,
  Filter,
  SlidersHorizontal,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Activity,
  Zap,
  Award,
  Target,
  Flag,
  Hash,
  AtSign,
  Link,
  ExternalLink,
  File,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Headphones,
  Mic,
  Camera,
  RefreshCw,
  RotateCw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Power,
  CreditCard,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  Package,
  Truck,
  Navigation,
  Compass,
  Map,
  Route,
  Briefcase,
  Building,
  Cloud,
  CloudOff,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Facebook,
  Twitter,
  Instagram,
  Sparkles,
  Ticket,
  Zap as Bolt,
  type LucideIcon,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

// Map icon names to Lucide React components
const iconMap: Record<string, LucideIcon> = {
  // Navigation
  home: Home,
  bike: Bike,
  wallet: Wallet,
  gift: Gift,
  support: HelpCircle,
  'circle-help': CircleHelp,
  
  // Actions
  plus: Plus,
  minus: Minus,
  play: Play,
  stop: Square,
  
  // Status
  check: Check,
  'check-circle': CheckCircle,
  warning: AlertTriangle,
  info: Info,
  'info-circle': AlertCircle,
  x: X,
  'x-circle': XCircle,
  
  // Navigation arrows
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  
  // User
  user: User,
  users: Users,
  
  // Settings & Security
  settings: Settings,
  lock: Lock,
  unlock: Unlock,
  shield: Shield,
  'log-out': LogOut,
  
  // Location & Time
  location: MapPin,
  route: Route,
  clock: Clock,
  calendar: Calendar,
  
  // Battery
  battery: Battery,
  'battery-low': BatteryLow,
  
  // Menu & UI
  menu: Menu,
  search: Search,
  copy: Copy,
  edit: Edit,
  edit2: Edit2,
  trash: Trash,
  trash2: Trash2,
  
  // Visibility
  eye: Eye,
  'eye-off': EyeOff,
  
  // Communication
  bell: Bell,
  'bell-off': BellOff,
  mail: Mail,
  phone: Phone,
  message: MessageCircle,
  
  // File & Media
  file: File,
  'file-text': FileText,
  folder: Folder,
  image: Image,
  video: Video,
  music: Music,
  headphones: Headphones,
  mic: Mic,
  camera: Camera,
  
  // Actions & Transfers
  download: Download,
  upload: Upload,
  send: Send,
  share: Share2,
  link: Link,
  'external-link': ExternalLink,
  
  // Social & Favorites
  heart: Heart,
  star: Star,
  bookmark: Bookmark,
  
  // Data & Analytics
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'bar-chart': BarChart,
  'pie-chart': PieChart,
  activity: Activity,
  
  // Utility
  refresh: RefreshCw,
  rotate: RotateCw,
  maximize: Maximize,
  minimize: Minimize,
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut,
  power: Power,
  filter: Filter,
  sliders: SlidersHorizontal,
  more: MoreVertical,
  'more-horizontal': MoreHorizontal,
  ticket: Ticket,
  bolt: Bolt,
  
  // Commerce
  'credit-card': CreditCard,
  dollar: DollarSign,
  cart: ShoppingCart,
  bag: ShoppingBag,
  package: Package,
  truck: Truck,
  
  // Navigation & Location
  navigation: Navigation,
  compass: Compass,
  map: Map,
  
  // Business & Work
  briefcase: Briefcase,
  building: Building,
  award: Award,
  target: Target,
  flag: Flag,
  zap: Zap,
  
  // Symbols
  hash: Hash,
  at: AtSign,
  
  // Weather & Environment
  cloud: Cloud,
  'cloud-off': CloudOff,
  sun: Sun,
  moon: Moon,
  
  // Connectivity
  wifi: Wifi,
  'wifi-off': WifiOff,
  volume: Volume2,
  'volume-off': VolumeX,
  
  // Social Media
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  
  // Effects
  sparkles: Sparkles,
};

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  className = '', 
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  ...props 
}) => {
  // Try to find icon with original name first, then try kebab-case version
  let IconComponent = iconMap[name];
  
  // If not found and name is camelCase, convert to kebab-case
  if (!IconComponent && /[A-Z]/.test(name)) {
    const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    IconComponent = iconMap[kebabName];
  }
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide React icon map`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      aria-label={ariaLabel || name}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

export default Icon;
