import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Phone,
  Wifi,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  Globe,
  MessageSquare,
  FileText,
  Activity,
  Database,
  Zap,
  ChevronDown,
  Building2
} from "lucide-react";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Clienti", url: "/clienti", icon: Users, badge: "2.1k" },
  { title: "Contratti", url: "/contratti", icon: FileText },
  { title: "Fatturazione", url: "/fatturazione", icon: CreditCard },
];

const serviceNavigation = [
  { title: "Mobile", url: "/servizi/mobile", icon: Phone },
  { title: "Fibra & WiFi", url: "/servizi/fibra", icon: Wifi },
  { title: "Energia", url: "/servizi/energia", icon: Zap },
  { title: "Business", url: "/servizi/business", icon: Building2 },
];

const analyticsNavigation = [
  { title: "Metriche", url: "/analytics/metriche", icon: BarChart3 },
  { title: "Performance", url: "/analytics/performance", icon: Activity },
  { title: "Reports", url: "/analytics/reports", icon: FileText },
];

const systemNavigation = [
  { title: "Configurazione", url: "/sistema/config", icon: Settings },
  { title: "Sicurezza", url: "/sistema/sicurezza", icon: Shield },
  { title: "Database", url: "/sistema/database", icon: Database },
  { title: "API", url: "/sistema/api", icon: Globe },
  { title: "Support", url: "/sistema/support", icon: MessageSquare },
];

export function EnterpriseSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [servicesOpen, setServicesOpen] = useState(true);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  const isCollapsed = state === "collapsed";
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
        "glass-strong border-r border-border/50 transition-all duration-300",
        isCollapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-windtre-orange font-semibold">
            {!isCollapsed && "Principale"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                    <NavLink to={item.url} end className="flex items-center gap-3">
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

        {/* Services Navigation */}
        <SidebarGroup>
          <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-windtre-purple font-semibold hover:text-windtre-purple-light transition-colors">
                {!isCollapsed && "Servizi"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {serviceNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Analytics Navigation */}
        <SidebarGroup>
          <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-info font-semibold hover:text-info/80 transition-colors">
                {!isCollapsed && "Analytics"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    analyticsOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {analyticsNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* System Navigation */}
        <SidebarGroup>
          <Collapsible open={systemOpen} onOpenChange={setSystemOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-muted-foreground font-semibold hover:text-foreground transition-colors">
                {!isCollapsed && "Sistema"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    systemOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}