import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, X, Bell, Settings, User, Globe, Search,
  Users, Calendar, Activity, ChevronLeft, ChevronRight,
  Home, FileText, CreditCard, Smartphone, Building, ShoppingCart, MessageSquare
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ProfessionalLayoutProps {
  children: ReactNode;
}

const windtreLogo = '/lovable-uploads/0729be2a-b1da-4ecc-a1d4-321013db32d6.png';

// Menu items for left sidebar
const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/', active: true },
  { icon: Users, label: 'Clienti', path: '/clienti' },
  { icon: FileText, label: 'Contratti', path: '/contratti' },
  { icon: CreditCard, label: 'Fatturazione', path: '/fatturazione' },
  { icon: Smartphone, label: 'Servizi Mobile', path: '/servizi/mobile' },
  { icon: Building, label: 'HR Dipendenti', path: '/hr/dipendenti' },
  { icon: ShoppingCart, label: 'Cassa POS', path: '/cassa/pos' },
  { icon: MessageSquare, label: 'CRM Leads', path: '/crm/leads' },
];

// Right sidebar panels
const rightPanels = [
  { id: 'contacts', icon: Users, label: 'Contatti', badge: '12' },
  { id: 'calendar', icon: Calendar, label: 'Calendario', badge: '4' },
  { id: 'activities', icon: Activity, label: 'Attività', badge: '7' },
];

export const ProfessionalLayout = ({ children }: ProfessionalLayoutProps) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [activeRightPanel, setActiveRightPanel] = useState('activities');

  return (
    <div className="layout-container">
      {/* 1. HEADER - Fixed Transparent */}
      <header className="layout-header">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-3">
              <img 
                src={windtreLogo} 
                alt="WindTre Logo" 
                className="h-8 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  WindTre Enterprise
                </h1>
                <p className="text-xs text-muted-foreground">Dashboard Unificato</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca clienti, contratti, fatture..."
                className="pl-10 glass border-border/50 focus:border-windtre-orange/50"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Milano Centro</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-windtre-orange text-white">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="layout-body">
        {/* 2. LEFT SIDEBAR - Full Height Menu */}
        <aside className={cn(
          "layout-sidebar-left transition-transform duration-300",
          isLeftSidebarOpen && "open"
        )}>
          <div className="h-full flex flex-col p-4">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Menu Principale
              </h2>
            </div>
            
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={item.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    item.active && "bg-gradient-primary text-white shadow-lg"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                © 2024 WindTre Enterprise
              </p>
            </div>
          </div>
        </aside>

        {/* 3. MAIN CONTENT - Own Scroll */}
        <main className="layout-main bg-gradient-to-br from-background to-muted/30">
          <div className="p-6 min-h-full">
            {children}
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR - Notifications with Internal Scroll */}
        <aside className={cn(
          "layout-sidebar-right transition-all duration-300",
          !isRightSidebarOpen && "translate-x-full lg:translate-x-[calc(100%-3rem)]"
        )}>
          {/* Toggle button */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="h-12 w-8 rounded-l-lg rounded-r-none glass-strong border-r-0"
            >
              {isRightSidebarOpen ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border/30 bg-gradient-to-r from-windtre-orange/5 to-windtre-purple/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  Workspace
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRightSidebarOpen(false)}
                  className="lg:hidden h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {rightPanels.map((panel) => (
                  <Button
                    key={panel.id}
                    variant={activeRightPanel === panel.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveRightPanel(panel.id)}
                    className={cn(
                      "flex flex-col gap-1 h-auto py-3 px-2 relative",
                      activeRightPanel === panel.id && "bg-gradient-primary text-white"
                    )}
                  >
                    <panel.icon className="h-4 w-4" />
                    <span className="text-xs">{panel.label}</span>
                    {panel.badge && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                        {panel.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content with internal scroll */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="glass p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Attività {i + 1}</p>
                        <p className="text-xs text-muted-foreground">
                          {activeRightPanel === 'contacts' ? 'Contatto cliente' : 
                           activeRightPanel === 'calendar' ? 'Evento calendario' : 
                           'Attività recente'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};