import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { ContactsPanel } from './ContactsPanel';
import { CalendarPanel } from './CalendarPanel';
import { RecentActivitiesPanel } from './RecentActivitiesPanel';
import { cn } from '@/lib/utils';

type PanelType = 'contacts' | 'calendar' | 'activities';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const RightSidebar = ({ isOpen, onToggle }: RightSidebarProps) => {
  const [activePanel, setActivePanel] = useState<PanelType>('activities');

  const panels = [
    {
      id: 'contacts' as PanelType,
      icon: Users,
      title: 'Contatti',
      badge: '12',
      component: ContactsPanel
    },
    {
      id: 'calendar' as PanelType,
      icon: Calendar,
      title: 'Calendario',
      badge: '4',
      component: CalendarPanel
    },
    {
      id: 'activities' as PanelType,
      icon: Activity,
      title: 'Attività',
      badge: '7',
      component: RecentActivitiesPanel
    }
  ];

  const activeComponent = panels.find(p => p.id === activePanel)?.component;
  const ActiveComponent = activeComponent || RecentActivitiesPanel;

  return (
    <>
      {/* Backdrop per mobile con blur dinamico */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar con effetti glassmorfismo avanzati */}
      <div className={cn(
        "fixed right-0 top-0 h-full z-40 flex transition-all duration-700 ease-out transform-gpu will-change-transform",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-[calc(100%-3rem)]"
      )}>
        {/* Toggle Button con effetti hover */}
        <div className="flex flex-col justify-center">
          <Button
            variant="secondary"
            size="icon"
            onClick={onToggle}
            className={cn(
              "h-12 w-8 rounded-l-xl rounded-r-none border-r-0 shadow-xl transition-all duration-500",
              "glass-strong backdrop-blur-xl border border-border/30",
              "hover:shadow-glow-orange hover:scale-110 hover:border-windtre-orange/40",
              "active:scale-95 group"
            )}
          >
            {isOpen ? (
              <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5" />
            ) : (
              <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-0.5" />
            )}
          </Button>
        </div>

        {/* Sidebar Content con glassmorfismo avanzato */}
        <div className={cn(
          "relative h-full flex flex-col shadow-2xl transition-all duration-700",
          "w-80 lg:w-96 backdrop-blur-2xl",
          "bg-gradient-to-b from-background/80 via-background/60 to-background/80",
          "border-l border-t border-b border-border/40",
          "before:absolute before:inset-0 before:rounded-l-xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-0 after:rounded-l-xl after:bg-noise after:opacity-[0.02] after:pointer-events-none"
        )}>
          {/* Header with Tabs - Glassmorfismo */}
          <div className="border-b border-border/40 p-4 flex-shrink-0 bg-gradient-to-r from-windtre-orange/5 to-windtre-purple/5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent drop-shadow-sm">
                Workspace
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggle}
                className="h-6 w-6 lg:hidden hover:bg-windtre-orange/10 transition-all duration-300 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {panels.map((panel) => (
                <Button
                  key={panel.id}
                  variant={activePanel === panel.id ? 'glass-orange' : 'ghost'}
                  size="sm"
                  onClick={() => setActivePanel(panel.id)}
                  className={cn(
                    "flex flex-col gap-1 h-auto py-3 px-2 relative transition-all duration-300",
                    "hover:scale-105 hover:shadow-lg group",
                    activePanel === panel.id 
                      ? "shadow-glow-orange border border-windtre-orange/30" 
                      : "hover:bg-windtre-orange/10 hover:border-windtre-orange/20 border border-transparent"
                  )}
                >
                  <panel.icon className={cn(
                    "h-4 w-4 transition-all duration-300",
                    activePanel === panel.id ? "text-windtre-orange" : "group-hover:text-windtre-orange"
                  )} />
                  <span className={cn(
                    "text-xs font-medium transition-all duration-300",
                    activePanel === panel.id ? "text-windtre-orange" : "group-hover:text-windtre-orange"
                  )}>
                    {panel.title}
                  </span>
                  {panel.badge && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center",
                        "transition-all duration-300 group-hover:scale-110",
                        activePanel === panel.id 
                          ? "bg-windtre-orange text-white shadow-glow-orange" 
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {panel.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Panel Content con scroll condizionale */}
          <div className={cn(
            "flex-1 transition-all duration-500",
            isOpen ? "overflow-y-auto" : "overflow-hidden"
          )}>
            <div className={cn(
              "h-full transition-all duration-500",
              isOpen ? "opacity-100" : "opacity-0"
            )}>
              <ActiveComponent />
            </div>
          </div>

          {/* Decorative gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
};