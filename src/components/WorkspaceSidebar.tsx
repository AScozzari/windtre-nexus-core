import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare, Calendar, MessageCircle, Clock, Bell, AlertCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface WorkspaceSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const WorkspaceSidebar = ({ onCollapseChange }: WorkspaceSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [manualToggle, setManualToggle] = useState(false); // Flag per distinguere toggle manuale

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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveTab('tasks');
              if (isCollapsed && !manualToggle) {
                setIsCollapsed(false);
                onCollapseChange?.(false);
              }
            }}
            className={cn(
              "w-8 h-8 p-0 transition-colors",
              activeTab === 'tasks' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
            title="Tasks"
          >
            <CheckSquare className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveTab('calendar');
              if (isCollapsed && !manualToggle) {
                setIsCollapsed(false);
                onCollapseChange?.(false);
              }
            }}
            className={cn(
              "w-8 h-8 p-0 transition-colors",
              activeTab === 'calendar' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
            title="Calendario"
          >
            <Calendar className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveTab('leads');
              if (isCollapsed && !manualToggle) {
                setIsCollapsed(false);
                onCollapseChange?.(false);
              }
            }}
            className={cn(
              "w-8 h-8 p-0 transition-colors",
              activeTab === 'leads' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
            title="Leads"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          {/* Badge notifiche quando collassato */}
          {notificheLeads.filter(n => !n.letto).length > 0 && (
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          )}
        </div>
      )}

      {!isCollapsed && (
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-purple-600">Workspace</h2>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-4 h-8">
              <TabsTrigger value="tasks" className="text-xs">
                <CheckSquare className="h-3 w-3 mr-1" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Calendario
              </TabsTrigger>
              <TabsTrigger value="leads" className="text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                Leads
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {/* TASKS TAB */}
              <TabsContent value="tasks" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Le mie attività</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tasks.filter(t => !t.completato).length} attive
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card key={task.id} className={cn(
                      "border-border/30 transition-all duration-200 hover:shadow-sm",
                      task.completato ? "bg-muted/30" : "bg-background/50",
                      task.urgente && !task.completato && "border-orange-200"
                    )}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 cursor-pointer",
                            task.completato 
                              ? "bg-success border-success" 
                              : "border-muted-foreground hover:border-primary"
                          )}>
                            {task.completato && (
                              <CheckSquare className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={cn(
                                "text-sm font-medium leading-tight",
                                task.completato && "line-through text-muted-foreground"
                              )}>
                                {task.titolo}
                              </h4>
                              {task.urgente && !task.completato && (
                                <AlertCircle className="h-3 w-3 text-orange-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{task.descrizione}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                task.priorita === 'Alta' ? 'destructive' : 
                                task.priorita === 'Media' ? 'secondary' : 'outline'
                              } className="text-xs">
                                {task.priorita}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.scadenza}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* CALENDAR TAB */}
              <TabsContent value="calendar" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Calendario</h3>
                  <Badge variant="secondary" className="text-xs">
                    {eventiCalendario.length} eventi
                  </Badge>
                </div>
                
                {/* Calendario interattivo */}
                <Card className="border-border/30 bg-background/50 mb-4">
                  <CardContent className="p-2">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className={cn("p-0 pointer-events-auto")}
                      classNames={{
                        months: "space-y-0",
                        month: "space-y-2",
                        caption: "flex justify-center pt-1 relative items-center text-sm",
                        caption_label: "font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-xs",
                        row: "flex w-full mt-0.5",
                        cell: "text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-8 w-8 p-0 font-normal text-xs aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </CardContent>
                </Card>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium">Prossimi eventi</h4>
                </div>
                
                <div className="space-y-3">
                  {eventiCalendario.map((evento) => (
                    <Card key={evento.id} className="border-border/30 bg-background/50 hover:shadow-sm transition-all duration-200">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex flex-col items-center justify-center text-white">
                            <span className="text-xs font-bold leading-none">
                              {evento.ora.split(':')[0]}
                            </span>
                            <span className="text-xs leading-none">
                              {evento.ora.split(':')[1]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium leading-tight mb-1">{evento.titolo}</h4>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {evento.data} alle {evento.ora}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {evento.partecipanti} partecipanti
                              </p>
                              <p className="text-xs text-muted-foreground">{evento.location}</p>
                            </div>
                            <Badge variant="outline" className="text-xs mt-2">
                              {evento.tipo === 'meeting' ? 'Riunione' :
                               evento.tipo === 'presentation' ? 'Presentazione' :
                               evento.tipo === 'training' ? 'Formazione' : 'Cliente'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* LEADS TAB */}
              <TabsContent value="leads" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Comunicazioni Leads</h3>
                  <Badge variant="destructive" className="text-xs">
                    {notificheLeads.filter(n => !n.letto).length} nuove
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {notificheLeads.map((notifica) => (
                    <Card key={notifica.id} className={cn(
                      "border-border/30 transition-all duration-200 hover:shadow-sm cursor-pointer",
                      !notifica.letto ? "bg-orange-50/50 border-orange-200" : "bg-background/50"
                    )}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            notifica.tipo === 'nuovo_lead' ? "bg-blue-100 text-blue-600" :
                            notifica.tipo === 'lead_qualificato' ? "bg-green-100 text-green-600" :
                            notifica.tipo === 'appuntamento_fissato' ? "bg-purple-100 text-purple-600" :
                            "bg-orange-100 text-orange-600"
                          )}>
                            {notifica.tipo === 'nuovo_lead' ? '🆕' :
                             notifica.tipo === 'lead_qualificato' ? '✅' :
                             notifica.tipo === 'appuntamento_fissato' ? '📅' : '📞'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-sm font-medium leading-tight">{notifica.messaggio}</h4>
                              {!notifica.letto && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-sm font-medium text-primary mb-1">{notifica.cliente}</p>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={notifica.priorita === 'Alta' ? 'destructive' : 'secondary'} className="text-xs">
                                {notifica.priorita}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{notifica.fonte}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{notifica.tempo}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      )}
    </div>
  );
};