import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
  Users
} from 'lucide-react';

const mockEvents = [
  {
    id: '1',
    title: 'Call con Mario Rossi',
    time: '09:30',
    duration: '30 min',
    type: 'call',
    status: 'upcoming',
    participants: ['Mario Rossi'],
    location: 'Telefono'
  },
  {
    id: '2',
    title: 'Meeting Team Vendite',
    time: '14:00',
    duration: '1 ora',
    type: 'meeting',
    status: 'upcoming',
    participants: ['Anna Bianchi', 'Luigi Verdi', '+3 altri'],
    location: 'Sala Conferenze A'
  },
  {
    id: '3',
    title: 'Demo Prodotto Giulia Neri',
    time: '16:30',
    duration: '45 min',
    type: 'demo',
    status: 'upcoming',
    participants: ['Giulia Neri'],
    location: 'Microsoft Teams'
  },
  {
    id: '4',
    title: 'Review Contratti Q1',
    time: '18:00',
    duration: '30 min',
    type: 'review',
    status: 'completed',
    participants: ['Team Legale'],
    location: 'Online'
  }
];

const mockTasks = [
  {
    id: '1',
    title: 'Contattare clienti in scadenza',
    priority: 'high',
    dueTime: '10:00',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Preparare report mensile',
    priority: 'medium',
    dueTime: '15:00',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Aggiornare CRM',
    priority: 'low',
    dueTime: '17:00',
    status: 'pending'
  }
];

export const CalendarPanel = () => {
  const [currentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'today' | 'week'>('today');

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-windtre-orange/20 text-windtre-orange border-windtre-orange/30';
      case 'meeting': return 'bg-windtre-purple/20 text-windtre-purple border-windtre-purple/30';
      case 'demo': return 'bg-success/20 text-success border-success/30';
      case 'review': return 'bg-info/20 text-info border-info/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'call': return <CalendarIcon className="h-3 w-3" />;
      case 'meeting': return <Users className="h-3 w-3" />;
      case 'demo': return <Video className="h-3 w-3" />;
      case 'review': return <CalendarIcon className="h-3 w-3" />;
      default: return <CalendarIcon className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const todayEvents = mockEvents.filter(event => event.status === 'upcoming');
  const completedEvents = mockEvents.filter(event => event.status === 'completed');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Calendario</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span className="text-xs font-medium">
            {currentDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <Button
            variant={selectedView === 'today' ? 'glass-orange' : 'ghost'}
            size="sm"
            className="text-xs h-7"
            onClick={() => setSelectedView('today')}
          >
            Oggi
          </Button>
          <Button
            variant={selectedView === 'week' ? 'glass-orange' : 'ghost'}
            size="sm"
            className="text-xs h-7"
            onClick={() => setSelectedView('week')}
          >
            Settimana
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Today's Events */}
        <div className="p-3 border-b border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="h-3 w-3 text-windtre-orange" />
            <span className="text-xs font-medium">Eventi di Oggi</span>
            <Badge variant="secondary" className="h-4 text-xs">
              {todayEvents.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {todayEvents.map((event) => (
              <Card key={event.id} className="glass-strong border-border/30 hover:glass transition-all duration-200">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </Badge>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium truncate mb-1">{event.title}</h4>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span className="truncate">{event.participants.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="p-3 border-b border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-3 w-3 text-windtre-purple" />
            <span className="text-xs font-medium">Task di Oggi</span>
            <Badge variant="secondary" className="h-4 text-xs">
              {mockTasks.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {mockTasks.map((task) => (
              <Card key={task.id} className="glass-strong border-border/30 hover:glass transition-all duration-200">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </Badge>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium truncate mb-1">{task.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Scadenza: {task.dueTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Events */}
        {completedEvents.length > 0 && (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-success/20 text-success h-4 text-xs">
                ✓ Completati
              </Badge>
            </div>
            
            <div className="space-y-2">
              {completedEvents.map((event) => (
                <Card key={event.id} className="glass-strong border-border/30 opacity-60">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium truncate">{event.title}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{event.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border/50">
        <Button variant="glass-purple" size="sm" className="w-full text-xs h-7">
          <Plus className="h-3 w-3 mr-1" />
          Nuovo Evento
        </Button>
      </div>
    </div>
  );
};