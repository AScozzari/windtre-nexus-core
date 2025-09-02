import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface WorkspaceSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const WorkspaceSidebar = ({ onCollapseChange }: WorkspaceSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [manualToggle, setManualToggle] = useState(false);
  const navigate = useNavigate();

  const workspaceItems = [
    {
      id: 'tasks',
      title: 'Tasks',
      icon: CheckSquare,
      route: '/workspace/tasks',
      description: 'Gestione attività',
      badge: '8'
    },
    {
      id: 'calendar', 
      title: 'Calendario',
      icon: Calendar,
      route: '/workspace/calendar',
      description: 'Eventi e appuntamenti',
      badge: '4'
    },
    {
      id: 'leads',
      title: 'Leads',
      icon: MessageCircle, 
      route: '/workspace/leads',
      description: 'Comunicazioni clienti',
      badge: '12'
    }
  ];

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
    
    // Segna come toggle manuale e disabilita temporaneamente auto-collapse
    setManualToggle(true);
    
    // Resetta il timeout
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
    
    // Riabilita auto-collapse dopo 5 secondi dal toggle manuale
    setTimeout(() => {
      setManualToggle(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    // Non aprire automaticamente se è stato chiuso manualmente di recente
    if (isCollapsed && !manualToggle) {
      setIsCollapsed(false);
      onCollapseChange?.(false);
    }
    
    // Cancella timeout esistente quando mouse entra
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    // Non iniziare auto-collapse se è stato fatto toggle manuale di recente
    if (manualToggle) return;
    
    // Inizia countdown per auto-collapse quando mouse esce
    const timeout = setTimeout(() => {
      if (!manualToggle) { // Doppio controllo
        setIsCollapsed(true);
        onCollapseChange?.(true);
      }
      setAutoCollapseTimeout(null);
    }, 3000);
    
    setAutoCollapseTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimeout) {
        clearTimeout(autoCollapseTimeout);
      }
    };
  }, [autoCollapseTimeout]);

  // Notifica il parent del stato iniziale
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [onCollapseChange]);

  const tasks = [
    { 
      id: 1, 
      titolo: 'Follow-up cliente Premium', 
      descrizione: 'Chiamare Mario Rossi per rinnovo contratto',
      priorita: 'Alta', 
      scadenza: 'Oggi 15:00',
      completato: false,
      urgente: true
    },
    { 
      id: 2, 
      titolo: 'Preparare documentazione', 
      descrizione: 'Contratto fibra per Laura Bianchi',
      priorita: 'Media', 
      scadenza: 'Domani 10:00',
      completato: false,
      urgente: false
    },
    { 
      id: 3, 
      titolo: 'Verifica pagamento', 
      descrizione: 'Controllo fattura cliente Giuseppe Verde',
      priorita: 'Bassa', 
      scadenza: 'Venerdì 16:00',
      completato: true,
      urgente: false
    },
    { 
      id: 4, 
      titolo: 'Attivazione servizi', 
      descrizione: 'Nuovo contratto mobile + fibra',
      priorita: 'Alta', 
      scadenza: 'Oggi 17:30',
      completato: false,
      urgente: true
    },
  ];

  const eventiCalendario = [
    { 
      id: 1,
      titolo: 'Riunione Team Vendite', 
      ora: '14:30', 
      data: 'Oggi',
      tipo: 'meeting',
      partecipanti: 8,
      location: 'Sala Conferenze A'
    },
    { 
      id: 2,
      titolo: 'Presentazione Q1 Results', 
      ora: '16:00', 
      data: 'Oggi',
      tipo: 'presentation',
      partecipanti: 15,
      location: 'Auditorium'
    },
    { 
      id: 3,
      titolo: 'Training nuovo personale', 
      ora: '09:00', 
      data: 'Domani',
      tipo: 'training',
      partecipanti: 6,
      location: 'Aula Formazione'
    },
    { 
      id: 4,
      titolo: 'Incontro con cliente Enterprise', 
      ora: '11:30', 
      data: 'Domani',
      tipo: 'client',
      partecipanti: 3,
      location: 'Ufficio Direzione'
    },
  ];

  const notificheLeads = [
    {
      id: 1,
      tipo: 'nuovo_lead',
      messaggio: 'Nuovo lead interessato a Piano Business',
      cliente: 'Alessandro Martini',
      fonte: 'Website Form',
      priorita: 'Alta',
      tempo: '5 min fa',
      letto: false
    },
    {
      id: 2,
      tipo: 'lead_qualificato',
      messaggio: 'Lead qualificato pronto per chiamata',
      cliente: 'Francesca Lombardi',
      fonte: 'Campagna Email',
      priorita: 'Alta',
      tempo: '15 min fa',
      letto: false
    },
    {
      id: 3,
      tipo: 'appuntamento_fissato',
      messaggio: 'Appuntamento confermato per demo',
      cliente: 'Roberto Conti',
      fonte: 'Chiamata diretta',
      priorita: 'Media',
      tempo: '1 ora fa',
      letto: true
    },
    {
      id: 4,
      tipo: 'follow_up_richiesto',
      messaggio: 'Cliente richiede informazioni aggiuntive',
      cliente: 'Maria Ferretti',
      fonte: 'Chat supporto',
      priorita: 'Media',
      tempo: '2 ore fa',
      letto: true
    },
  ];

  return (
    <div 
      className={cn(
        "fixed right-0 top-20 h-[calc(100vh-5rem)] bg-background/95 backdrop-blur-sm border-l border-border/50 transition-all duration-300 z-30",
        isCollapsed ? "w-12" : "w-80"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCollapse}
        className="absolute -left-6 top-4 z-40 bg-background border border-border/50 rounded-full p-1 h-6 w-6"
      >
        {isCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>

      {isCollapsed && (
        <div className="flex flex-col items-center gap-3 pt-4">
          {/* Icone dei tool quando collassato */}
          {workspaceItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate(item.route);
                  // Apri sempre il pannello quando clicco un'icona
                  setIsCollapsed(false);
                  onCollapseChange?.(false);
                  setManualToggle(false);
                  if (autoCollapseTimeout) {
                    clearTimeout(autoCollapseTimeout);
                    setAutoCollapseTimeout(null);
                  }
                }}
                className="w-8 h-8 p-0 transition-colors hover:bg-muted relative"
                title={item.title}
              >
                <IconComponent className="h-4 w-4" />
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {!isCollapsed && (
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-purple-600">Workspace</h2>
          </div>

          {/* Workspace Items */}
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {workspaceItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={item.id}
                    className="border-border/30 bg-background/50 hover:shadow-sm transition-all duration-200 cursor-pointer hover:border-primary/50"
                    onClick={() => navigate(item.route)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold">{item.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};