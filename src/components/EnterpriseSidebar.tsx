import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  CreditCard,
  UserCheck,
  UserPlus,
  Calendar,
  Settings,
  Shield,
  Database,
  DollarSign,
  Receipt,
  Calculator,
  Bot,
  Sparkles,
  Brain,
  ChevronDown
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
  { title: "Presenze", url: "/hr/presenze", icon: Calendar },
  { title: "Reclutamento", url: "/hr/reclutamento", icon: UserPlus },
  { title: "Formazione", url: "/hr/formazione", icon: FileText },
];

const amministrazioneNavigation = [
  { title: "Configurazione", url: "/admin/config", icon: Settings },
  { title: "Sicurezza", url: "/admin/sicurezza", icon: Shield },
  { title: "Database", url: "/admin/database", icon: Database },
  { title: "Utenti & Ruoli", url: "/admin/utenti", icon: Users },
];

const cassaNavigation = [
  { title: "POS", url: "/cassa/pos", icon: Calculator },
  { title: "Transazioni", url: "/cassa/transazioni", icon: DollarSign },
  { title: "Riconciliazioni", url: "/cassa/riconciliazioni", icon: Receipt },
];

const aiToolsNavigation = [
  { title: "Assistant", url: "/ai/assistant", icon: Bot },
  { title: "Analytics AI", url: "/ai/analytics", icon: Brain },
  { title: "Automazioni", url: "/ai/automazioni", icon: Sparkles },
];

export function EnterpriseSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [hrOpen, setHrOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cassaOpen, setCassaOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);

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
                {!isCollapsed && "Human Resources"}
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

        {/* Amministrazione Navigation */}
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
                  {amministrazioneNavigation.map((item) => (
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
          <Collapsible open={aiToolsOpen} onOpenChange={setAiToolsOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-accent font-semibold hover:text-accent/80 transition-colors">
                {!isCollapsed && "AI Tools"}
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    aiToolsOpen && "rotate-180"
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