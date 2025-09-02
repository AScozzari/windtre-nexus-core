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
  Pin,
  PinOff
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EnterpriseSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Clienti", url: "/clienti", icon: Users, badge: "2.1k" },
  { title: "Contratti", url: "/contratti", icon: FileText },
  { title: "Fatturazione", url: "/fatturazione", icon: CreditCard },
  { title: "Human Resources", url: "/hr", icon: UserCheck },
  { title: "Amministrazione", url: "/amministrazione", icon: Settings },
  { title: "Cassa", url: "/cassa", icon: Calculator },
  { title: "AI Tools", url: "/ai", icon: Bot },
];

export function EnterpriseSidebar({ onCollapseChange }: EnterpriseSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Auto-collapse logic
  const [isPinned, setIsPinned] = useState(false);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);

  const isCollapsed = state === "collapsed" && !isPinned;
  
  const togglePin = () => {
    setIsPinned(!isPinned);
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  const handleMouseEnter = () => {
    if (!isPinned && isCollapsed) {
      // Forza l'apertura della sidebar
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
      if (sidebarTrigger) {
        sidebarTrigger.click();
      }
    }
    
    // Cancella timeout esistente
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      // Inizia countdown per auto-collapse
      const timeout = setTimeout(() => {
        const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
        if (sidebarTrigger && !isPinned) {
          sidebarTrigger.click();
        }
        setAutoCollapseTimeout(null);
      }, 2000); // 2 secondi di delay
      
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
  const getNavClasses = (path: string) =>
    cn(
      "transition-all duration-200",
      isActive(path) 
        ? "bg-gradient-primary text-white shadow-glow-orange" 
        : "hover:glass-strong hover:text-windtre-orange"
    );

  return (
    <Sidebar
      className={cn(
        "glass-strong border-r border-border/50 transition-all duration-300 mt-20 h-[calc(100vh-5rem)]",
        isCollapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pin Button */}
      {!isCollapsed && (
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePin}
          className={cn(
            "absolute top-3 right-3 z-50 h-8 w-8 rounded-md transition-all duration-200",
            "hover:bg-windtre-orange/10 hover:scale-110",
            isPinned 
              ? "bg-windtre-orange/20 text-windtre-orange shadow-sm" 
              : "text-muted-foreground hover:text-windtre-orange"
          )}
          title={isPinned ? "Sblocca sidebar" : "Blocca sidebar"}
        >
          {isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
        </Button>
      )}

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                    <NavLink to={item.url} end={item.url === "/"} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex items-center gap-2 flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}