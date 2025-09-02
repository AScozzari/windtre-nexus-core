import { useState, useEffect } from "react";
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
  Zap,
  Pin,
  PinOff,
  Target,
  Briefcase,
  Cpu,
  DollarSign,
  Cog
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
  SidebarHeader
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Clienti", url: "/clienti", icon: Users, badge: "2.1k" },
  { title: "Contratti", url: "/contratti", icon: FileText },
  { title: "Fatturazione", url: "/fatturazione", icon: CreditCard },
];

const crmNavigation = [
  { title: "Lead Management", url: "/crm/leads", icon: Users },
  { title: "Centro Comunicazioni", url: "/crm/comunicazione", icon: MessageSquare },
  { title: "Pipeline Vendite", url: "/crm/pipeline", icon: BarChart3 },
  { title: "GTM Analytics", url: "/crm/analytics", icon: Activity },
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

// Icone per le categorie di menu padre
const menuCategories = {
  crm: { icon: Target, color: "text-windtre-orange" },
  hr: { icon: Users, color: "text-windtre-purple" },
  admin: { icon: Cog, color: "text-info" },
  cassa: { icon: DollarSign, color: "text-success" },
  ai: { icon: Cpu, color: "text-warning" }
};

export function EnterpriseSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hrOpen, setHrOpen] = useState(currentPath.startsWith('/hr'));
  const [crmOpen, setCrmOpen] = useState(currentPath.startsWith('/crm'));
  const [adminOpen, setAdminOpen] = useState(currentPath.startsWith('/admin'));
  const [cassaOpen, setCassaOpen] = useState(currentPath.startsWith('/cassa'));
  const [aiOpen, setAiOpen] = useState(currentPath.startsWith('/ai'));

  const isCollapsed = state === "collapsed";
  const shouldShowExpanded = isPinned || isHovered;

  // Auto-collapse quando non è pinnata e mouse leave
  useEffect(() => {
    if (!isPinned && !isHovered && !isCollapsed) {
      const timer = setTimeout(() => {
        if (!isHovered) {
          toggleSidebar();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHovered, isPinned, isCollapsed, toggleSidebar]);

  // Auto-expand quando hover e collassata
  useEffect(() => {
    if (!isPinned && isHovered && isCollapsed) {
      toggleSidebar();
    }
  }, [isHovered, isCollapsed, isPinned, toggleSidebar]);

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) =>
    cn(
      "transition-all duration-300 group relative overflow-hidden",
      isActive(path) 
        ? "bg-gradient-primary text-white shadow-glow-orange border border-windtre-orange/30" 
        : "hover:glass-strong hover:text-windtre-orange hover:border-windtre-orange/20 hover:shadow-lg"
    );

  const getSectionClasses = (paths: string[]) => {
    const isAnyActive = paths.some(path => currentPath.startsWith(path));
    return isAnyActive ? "ring-2 ring-windtre-orange/20 bg-windtre-orange/5" : "";
  };

  return (
    <Sidebar
      className={cn(
        "glass-strong border-r border-border/50 transition-all duration-500 relative z-30",
        isCollapsed ? "w-16" : "w-72"
      )}
      collapsible="icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header con Pin Toggle */}
      <SidebarHeader className="p-4 border-b border-border/30 bg-gradient-to-r from-windtre-orange/10 to-transparent">
        <div className="flex items-center justify-between">
          {(!isCollapsed || shouldShowExpanded) && (
            <h2 className="text-sm font-bold bg-gradient-primary bg-clip-text text-transparent">
              Menu Principale
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPinned(!isPinned)}
            className={cn(
              "h-8 w-8 transition-all duration-300",
              isPinned ? "text-windtre-orange hover:bg-windtre-orange/10" : "text-muted-foreground hover:text-windtre-orange",
              isCollapsed && !shouldShowExpanded && "mx-auto"
            )}
          >
            {isPinned ? (
              <Pin className="h-4 w-4" />
            ) : (
              <PinOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        {(!isCollapsed || shouldShowExpanded) && (
          <p className="text-xs text-muted-foreground mt-1">
            {isPinned ? "Menu bloccato" : "Auto-collapse attivo"}
          </p>
        )}
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto">
        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="text-windtre-orange font-semibold px-2 py-1">
            {(!isCollapsed || shouldShowExpanded) && "Principale"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                    <NavLink to={item.url} end className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {(!isCollapsed || shouldShowExpanded) && (
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs bg-windtre-orange/20 text-windtre-orange">
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

        {/* CRM Navigation */}
        <SidebarGroup className={cn("px-3 py-2 mx-2 rounded-lg transition-all duration-300", getSectionClasses(['/crm']))}>
          <Collapsible open={crmOpen} onOpenChange={setCrmOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-windtre-orange font-semibold hover:text-windtre-orange-light transition-colors px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <menuCategories.crm.icon className={cn("h-4 w-4", menuCategories.crm.color)} />
                  {(!isCollapsed || shouldShowExpanded) && "CRM & Vendite"}
                </div>
                {(!isCollapsed || shouldShowExpanded) && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    crmOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 mt-2">
                  {crmNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg ml-4">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {(!isCollapsed || shouldShowExpanded) && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* HR Navigation */}
        <SidebarGroup className={cn("px-3 py-2 mx-2 rounded-lg transition-all duration-300", getSectionClasses(['/hr']))}>
          <Collapsible open={hrOpen} onOpenChange={setHrOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-windtre-purple font-semibold hover:text-windtre-purple-light transition-colors px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <menuCategories.hr.icon className={cn("h-4 w-4", menuCategories.hr.color)} />
                  {(!isCollapsed || shouldShowExpanded) && "Risorse Umane"}
                </div>
                {(!isCollapsed || shouldShowExpanded) && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    hrOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 mt-2">
                  {hrNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg ml-4">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {(!isCollapsed || shouldShowExpanded) && <span>{item.title}</span>}
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
        <SidebarGroup className={cn("px-3 py-2 mx-2 rounded-lg transition-all duration-300", getSectionClasses(['/admin']))}>
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-info font-semibold hover:text-info/80 transition-colors px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <menuCategories.admin.icon className={cn("h-4 w-4", menuCategories.admin.color)} />
                  {(!isCollapsed || shouldShowExpanded) && "Amministrazione"}
                </div>
                {(!isCollapsed || shouldShowExpanded) && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    adminOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 mt-2">
                  {adminNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg ml-4">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {(!isCollapsed || shouldShowExpanded) && <span>{item.title}</span>}
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
        <SidebarGroup className={cn("px-3 py-2 mx-2 rounded-lg transition-all duration-300", getSectionClasses(['/cassa']))}>
          <Collapsible open={cassaOpen} onOpenChange={setCassaOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-success font-semibold hover:text-success/80 transition-colors px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <menuCategories.cassa.icon className={cn("h-4 w-4", menuCategories.cassa.color)} />
                  {(!isCollapsed || shouldShowExpanded) && "Cassa"}
                </div>
                {(!isCollapsed || shouldShowExpanded) && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    cassaOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 mt-2">
                  {cassaNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg ml-4">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {(!isCollapsed || shouldShowExpanded) && <span>{item.title}</span>}
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
        <SidebarGroup className={cn("px-3 py-2 mx-2 rounded-lg transition-all duration-300", getSectionClasses(['/ai']))}>
          <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-warning font-semibold hover:text-warning/80 transition-colors px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <menuCategories.ai.icon className={cn("h-4 w-4", menuCategories.ai.color)} />
                  {(!isCollapsed || shouldShowExpanded) && "AI Tools"}
                </div>
                {(!isCollapsed || shouldShowExpanded) && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    aiOpen && "rotate-180"
                  )} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 mt-2">
                  {aiToolsNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={getNavClasses(item.url)}>
                        <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg ml-4">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {(!isCollapsed || shouldShowExpanded) && <span>{item.title}</span>}
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