import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  CreditCard,
  UserCheck,
  Settings,
  Calculator,
  Bot,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnterpriseSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const navigation = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    status: "active",
    description: "Panoramica generale"
  },
  { 
    title: "Clienti", 
    url: "/clienti", 
    icon: Users, 
    badge: "2.1k",
    status: "active",
    description: "Gestione clienti",
    activity: true
  },
  { 
    title: "Contratti", 
    url: "/contratti", 
    icon: FileText,
    badge: "127",
    status: "pending",
    description: "Contratti in gestione"
  },
  { 
    title: "Fatturazione", 
    url: "/fatturazione", 
    icon: CreditCard,
    badge: "€12.5k",
    status: "success",
    description: "Fatture del mese",
    activity: true
  },
  { 
    title: "Human Resources", 
    url: "/hr", 
    icon: UserCheck,
    badge: "47",
    status: "active",
    description: "Gestione dipendenti"
  },
  { 
    title: "Amministrazione", 
    url: "/amministrazione", 
    icon: Settings,
    status: "active",
    description: "Configurazioni"
  },
  { 
    title: "Cassa", 
    url: "/cassa", 
    icon: Calculator,
    badge: "€1.2k",
    status: "success",
    description: "Incassi giornalieri",
    activity: true
  },
  { 
    title: "AI Tools", 
    url: "/ai", 
    icon: Bot,
    badge: "NEW",
    status: "highlight",
    description: "Strumenti AI"
  },
];

export function EnterpriseSidebar({ onCollapseChange }: EnterpriseSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Auto-collapse logic e stati dinamici
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [manualToggle, setManualToggle] = useState(false);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [dynamicData, setDynamicData] = useState({
    clienti: 2143,
    contratti: 127,
    fatturazione: 12547,
    dipendenti: 47,
    cassa: 1247,
    notifications: 3
  });

  // Simula aggiornamenti real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicData(prev => ({
        ...prev,
        clienti: prev.clienti + Math.floor(Math.random() * 3),
        fatturazione: prev.fatturazione + Math.floor(Math.random() * 50),
        cassa: prev.cassa + Math.floor(Math.random() * 25),
        notifications: Math.floor(Math.random() * 5)
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Aggiorna i badge dinamicamente
  const getUpdatedNavigation = () => {
    return navigation.map(item => {
      switch (item.url) {
        case "/clienti":
          return { ...item, badge: `${(dynamicData.clienti / 1000).toFixed(1)}k` };
        case "/contratti":
          return { ...item, badge: dynamicData.contratti.toString() };
        case "/fatturazione":
          return { ...item, badge: `€${(dynamicData.fatturazione / 1000).toFixed(1)}k` };
        case "/hr":
          return { ...item, badge: dynamicData.dipendenti.toString() };
        case "/cassa":
          return { ...item, badge: `€${(dynamicData.cassa / 1000).toFixed(1)}k` };
        default:
          return item;
      }
    });
  };

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    
    // Cancella il timeout se esiste
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    if (!manualToggle) {
      // Auto-collapse dopo 2 secondi
      const timeout = setTimeout(() => {
        setIsCollapsed(true);
        setAutoCollapseTimeout(null);
      }, 2000);
      
      setAutoCollapseTimeout(timeout);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimeout) {
        clearTimeout(autoCollapseTimeout);
      }
    };
  }, [autoCollapseTimeout]);

  // Notifica il parent del cambio stato
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);
  const isActive = (path: string) => currentPath === path;
  
  const getNavClasses = (item: any) => {
    const isItemActive = isActive(item.url);
    const baseClasses = "group relative overflow-hidden transition-all duration-300 hover-scale";
    
    if (isItemActive) {
      return cn(baseClasses, "bg-gradient-primary text-white shadow-glow-orange animate-fade-in");
    }
    
    // Status-based styling
    switch (item.status) {
      case "success":
        return cn(baseClasses, "hover:bg-gradient-to-r hover:from-green-500/10 hover:to-green-400/10 hover:text-green-400 hover:shadow-lg");
      case "pending":
        return cn(baseClasses, "hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-400/10 hover:text-yellow-400 hover:shadow-lg");
      case "highlight":
        return cn(baseClasses, "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-purple-400/10 hover:text-purple-400 hover:shadow-lg animate-pulse");
      default:
        return cn(baseClasses, "hover:glass-strong hover:text-windtre-orange hover:shadow-lg");
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default";
      case "pending":
        return "secondary";
      case "highlight":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const updatedNavigation = getUpdatedNavigation();

  return (
    <Sidebar
      className={cn(
        "glass-strong border-r border-border/50 transition-all duration-500 mt-20 h-[calc(100vh-5rem)] overflow-hidden",
        isCollapsed ? "w-14" : "w-72",
        "animate-slide-in-right"
      )}
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent className="pt-6 px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {updatedNavigation.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SidebarMenuButton asChild className={getNavClasses(item)}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className="flex items-center gap-3 p-3 rounded-lg relative group"
                    >
                      <div className="relative">
                        <item.icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                        {item.activity && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{item.title}</span>
                            <span className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-2">
                            {item.badge && (
                              <Badge 
                                variant={getBadgeVariant(item.status)} 
                                className="text-xs px-2 py-1 animate-scale-in font-semibold"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            {item.activity && (
                              <Activity className="h-3 w-3 text-green-400 animate-pulse" />
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Status indicator in expanded mode */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-border/30 animate-fade-in">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Sistema operativo</span>
              <TrendingUp className="h-3 w-3 ml-auto" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}