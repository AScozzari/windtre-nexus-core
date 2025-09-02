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
  Bot
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
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Clienti", url: "/clienti", icon: Users, badge: "2.1k" },
  { title: "Contratti", url: "/contratti", icon: FileText },
  { title: "Fatturazione", url: "/fatturazione", icon: CreditCard },
  { title: "Human Resources", url: "/hr", icon: UserCheck },
  { title: "Amministrazione", url: "/amministrazione", icon: Settings },
  { title: "Cassa", url: "/cassa", icon: Calculator },
  { title: "AI Tools", url: "/ai", icon: Bot, badge: "NEW" },
];

export function EnterpriseSidebar({ onCollapseChange }: EnterpriseSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Auto-collapse logic semplificato
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [manualToggle, setManualToggle] = useState(false);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    if (!manualToggle) {
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
  
  const getNavClasses = (path: string) => {
    return cn(
      "transition-all duration-200",
      isActive(path) 
        ? "bg-gradient-primary text-white shadow-glow-orange" 
        : "hover:bg-muted/50 hover:text-foreground"
    );
  };

  return (
    <Sidebar
      className={cn(
        "bg-background/95 backdrop-blur-sm border-r border-border/50 transition-all duration-300 mt-20 h-[calc(100vh-5rem)]",
        isCollapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-auto">
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