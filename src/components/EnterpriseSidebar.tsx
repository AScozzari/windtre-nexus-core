import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  MessageSquare,
  Activity,
  Database,
  ChevronDown,
  Building2,
  UserCheck,
  ClipboardList,
  Calculator,
  Bot,
  Calendar,
  Award,
  FolderOpen,
  Receipt,
  Zap
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

const hrNavigation = [
  { title: "Dipendenti", url: "/hr/dipendenti", icon: UserCheck },
  { title: "Turni & Orari", url: "/hr/turni", icon: Calendar },
  { title: "Ferie & Permessi", url: "/hr/ferie", icon: ClipboardList },
  { title: "Valutazioni", url: "/hr/valutazioni", icon: Award },
  { title: "Formazione", url: "/hr/formazione", icon: Activity },
];

const adminNavigation = [
  { title: "Documenti", url: "/admin/documenti", icon: FolderOpen },
  { title: "Procedure", url: "/admin/procedure", icon: ClipboardList },
  { title: "Audit & Log", url: "/admin/audit", icon: Shield },
  { title: "Configurazioni", url: "/admin/config", icon: Settings },
  { title: "Backup", url: "/admin/backup", icon: Database },
];

const cassaNavigation = [
  { title: "POS & Vendite", url: "/cassa/pos", icon: Receipt },
  { title: "Incassi", url: "/cassa/incassi", icon: Calculator },
  { title: "Chiusure", url: "/cassa/chiusure", icon: CreditCard },
  { title: "Prodotti", url: "/cassa/prodotti", icon: Building2 },
];

const aiToolsNavigation = [
  { title: "Analytics AI", url: "/ai/analytics", icon: BarChart3 },
  { title: "Chat Bot", url: "/ai/chatbot", icon: MessageSquare },
  { title: "Automazioni", url: "/ai/automazioni", icon: Zap },
  { title: "Predizioni", url: "/ai/predizioni", icon: Bot },
];

export function EnterpriseSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [hrOpen, setHrOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cassaOpen, setCassaOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

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

        {/* HR Navigation */}
        <SidebarGroup>
          <Collapsible open={hrOpen} onOpenChange={setHrOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-windtre-purple font-semibold hover:text-windtre-purple-light transition-colors">
                {!isCollapsed && "Risorse Umane"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    hrOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {hrNavigation.map((item) => (
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

        {/* Admin Navigation */}
        <SidebarGroup>
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-info font-semibold hover:text-info/80 transition-colors">
                {!isCollapsed && "Amministrazione"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    adminOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavigation.map((item) => (
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

        {/* Cassa Navigation */}
        <SidebarGroup>
          <Collapsible open={cassaOpen} onOpenChange={setCassaOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-success font-semibold hover:text-success/80 transition-colors">
                {!isCollapsed && "Cassa"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    cassaOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {cassaNavigation.map((item) => (
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

        {/* AI Tools Navigation */}
        <SidebarGroup>
          <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-warning font-semibold hover:text-warning/80 transition-colors">
                {!isCollapsed && "AI Tools"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    aiOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {aiToolsNavigation.map((item) => (
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