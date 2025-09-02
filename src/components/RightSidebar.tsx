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
      {/* Backdrop per mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 h-full z-50 flex transition-transform duration-500 ease-out",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-[calc(100%-3rem)]"
      )}>
        {/* Toggle Button */}
        <div className="flex flex-col justify-center">
          <Button
            variant="secondary"
            size="icon"
            onClick={onToggle}
            className="h-12 w-8 rounded-l-lg rounded-r-none border-r-0 shadow-lg glass-strong transition-all duration-300 hover:scale-105"
          >
            {isOpen ? (
              <ChevronRight className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
            )}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className={cn(
          "glass-strong border-l border-border/50 h-full flex flex-col shadow-2xl transition-all duration-500",
          "w-80 lg:w-96",
          isOpen ? "opacity-100" : "opacity-95"
        )}>
          {/* Header with Tabs */}
          <div className="border-b border-border/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Workspace
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggle}
                className="h-6 w-6 lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              {panels.map((panel) => (
                <Button
                  key={panel.id}
                  variant={activePanel === panel.id ? 'glass-orange' : 'ghost'}
                  size="sm"
                  onClick={() => setActivePanel(panel.id)}
                  className="flex flex-col gap-1 h-auto py-2 relative"
                >
                  <panel.icon className="h-4 w-4" />
                  <span className="text-xs">{panel.title}</span>
                  {panel.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                    >
                      {panel.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </>
  );
};