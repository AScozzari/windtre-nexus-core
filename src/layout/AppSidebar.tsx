import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  BarChart3, 
  GraduationCap,
  Globe,
  Settings,
  Trophy
} from "lucide-react";
import { useRBAC } from '@/core/providers/RBACProvider';
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    module: "dashboard"
  },
  {
    title: "Cassa",
    url: "/cassa",
    icon: ShoppingCart,
    module: "cassa",
    badge: "POS"
  },
  {
    title: "Magazzino", 
    url: "/magazzino",
    icon: Package,
    module: "magazzino"
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    module: "crm",
    badge: "AI"
  },
  {
    title: "Gare",
    url: "/gare", 
    icon: Trophy,
    module: "gare",
    badge: "SIM"
  },
  {
    title: "Report",
    url: "/report",
    icon: BarChart3,
    module: "report"
  },
  {
    title: "HR",
    url: "/hr",
    icon: GraduationCap,
    module: "hr"
  },
  {
    title: "CMS Store",
    url: "/cms",
    icon: Globe,
    module: "cms",
    badge: "NEW"
  },
  {
    title: "Impostazioni",
    url: "/settings",
    icon: Settings,
    module: "settings"
  }
];

export const AppSidebar = () => {
  const sidebar = useSidebar();
  const collapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const { canAccessModule } = useRBAC();
  
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };
  
  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary/20 text-primary hover:bg-primary/30 border-r-2 border-primary" 
      : "hover:bg-white/10 text-white/80 hover:text-white";
  };

  // Filter items based on user permissions
  const accessibleItems = navigationItems.filter(item => canAccessModule(item.module));

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} glass-subtle border-r border-white/10`}>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 text-xs font-medium px-2 mb-2">
            {!collapsed && "Applicazioni"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accessibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`${getNavClassName(item.url)} flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                          {item.title}
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2 text-xs">
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
};