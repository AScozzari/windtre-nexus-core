import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare, Calendar, MessageCircle, Clock, Bell, AlertCircle, User, Phone, Mail, MapPin, TrendingUp, Zap, Star } from 'lucide-react';
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
  const [manualToggle, setManualToggle] = useState(false);
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      titolo: 'Follow-up cliente Premium', 
      descrizione: 'Chiamare Mario Rossi per rinnovo contratto Enterprise',
      priorita: 'Alta', 
      scadenza: 'Oggi 15:00',
      completato: false,
      urgente: true,
      categoria: 'vendite'
    },
    { 
      id: 2, 
      titolo: 'Preparare documentazione', 
      descrizione: 'Contratto fibra ottica per Laura Bianchi',
      priorita: 'Media', 
      scadenza: 'Domani 10:00',
      completato: false,
      urgente: false,
      categoria: 'documentazione'
    },
    { 
      id: 3, 
      titolo: 'Verifica pagamento', 
      descrizione: 'Controllo fattura cliente Giuseppe Verde - €2.300',
      priorita: 'Bassa', 
      scadenza: 'Venerdì 16:00',
      completato: true,
      urgente: false,
      categoria: 'amministrativo'
    },
    { 
      id: 4, 
      titolo: 'Attivazione servizi', 
      descrizione: 'Nuovo contratto mobile 5G + fibra 1GB/s',
      priorita: 'Alta', 
      scadenza: 'Oggi 17:30',
      completato: false,
      urgente: true,
      categoria: 'tecnico'
    },
    { 
      id: 5, 
      titolo: 'Demo prodotto WindTre Business', 
      descrizione: 'Presentazione soluzioni per PMI - Azienda Tecno Solutions',
      priorita: 'Alta', 
      scadenza: 'Lunedì 09:30',
      completato: false,
      urgente: false,
      categoria: 'vendite'
    }
  ]);

  const [leads, setLeads] = useState([
    {
      id: 1,
      tipo: 'nuovo_lead',
      messaggio: 'Lead interessato a Piano Business Pro',
      cliente: 'Alessandro Martini',
      azienda: 'Digital Marketing SRL',
      fonte: 'LinkedIn Ads',
      priorita: 'Alta',
      tempo: '2 min fa',
      letto: false,
      potenziale: '€15.000/anno',
      telefono: '+39 349 123 4567'
    },
    {
      id: 2,
      tipo: 'lead_qualificato',
      messaggio: 'Lead qualificato pronto per chiamata',
      cliente: 'Francesca Lombardi',
      azienda: 'Consulting Express',
      fonte: 'Campagna Email',
      priorita: 'Alta',
      tempo: '8 min fa',
      letto: false,
      potenziale: '€25.000/anno',
      telefono: '+39 335 987 6543'
    },
    {
      id: 3,
      tipo: 'appuntamento_fissato',
      messaggio: 'Demo confermata per martedì',
      cliente: 'Roberto Conti',
      azienda: 'Startup Innovation Hub',
      fonte: 'Chiamata diretta',
      priorita: 'Media',
      tempo: '45 min fa',
      letto: true,
      potenziale: '€8.500/anno',
      telefono: '+39 347 456 7890'
    },
    {
      id: 4,
      tipo: 'contratto_in_chiusura',
      messaggio: 'Contratto in fase di finalizzazione',
      cliente: 'Maria Ferretti',
      azienda: 'E-commerce Plus',
      fonte: 'Referral Partner',
      priorita: 'Alta',
      tempo: '1 ora fa',
      letto: false,
      potenziale: '€32.000/anno',
      telefono: '+39 366 234 5678'
    },
    {
      id: 5,
      tipo: 'follow_up_richiesto',
      messaggio: 'Richieste info su soluzioni Cloud',
      cliente: 'Giuseppe Bianchi',
      azienda: 'Manufacturing Co.',
      fonte: 'Website Form',
      priorita: 'Media',
      tempo: '2 ore fa',
      letto: true,
      potenziale: '€18.000/anno',
      telefono: '+39 328 876 5432'
    }
  ]);

  const [eventiCalendario] = useState([
    { 
      id: 1,
      titolo: 'Riunione Team Vendite Q1', 
      ora: '14:30', 
      data: 'Oggi',
      tipo: 'meeting',
      partecipanti: 8,
      location: 'Sala Conferenze A',
      colore: 'blue'
    },
    { 
      id: 2,
      titolo: 'Presentazione Risultati Trimestrali', 
      ora: '16:00', 
      data: 'Oggi',
      tipo: 'presentation',
      partecipanti: 15,
      location: 'Auditorium Principale',
      colore: 'purple'
    },
    { 
      id: 3,
      titolo: 'Training Nuovo Personale Vendite', 
      ora: '09:00', 
      data: 'Domani',
      tipo: 'training',
      partecipanti: 6,
      location: 'Aula Formazione B',
      colore: 'green'
    },
    { 
      id: 4,
      titolo: 'Demo Enterprise per Fortune 500', 
      ora: '11:30', 
      data: 'Domani',
      tipo: 'client',
      partecipanti: 5,
      location: 'Ufficio Direzione',
      colore: 'orange'
    },
    { 
      id: 5,
      titolo: 'Revisione Budget Marketing', 
      ora: '15:00', 
      data: 'Mercoledì',
      tipo: 'meeting',
      partecipanti: 4,
      location: 'Sala Riunioni C',
      colore: 'red'
    }
  ]);

  // Simula notifiche in tempo reale
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% di probabilità ogni 10 secondi
        const newLead = {
          id: Date.now(),
          tipo: ['nuovo_lead', 'lead_qualificato', 'follow_up_richiesto'][Math.floor(Math.random() * 3)] as any,
          messaggio: [
            'Nuovo lead interessato a soluzioni Enterprise',
            'Lead qualificato da campagna Google Ads',
            'Richiesta demo per soluzioni Cloud'
          ][Math.floor(Math.random() * 3)],
          cliente: ['Andrea Rossi', 'Giulia Verdi', 'Marco Neri', 'Elena Blu'][Math.floor(Math.random() * 4)],
          azienda: ['Tech Solutions SRL', 'Digital Hub', 'Innovation Co.', 'Future Corp'][Math.floor(Math.random() * 4)],
          fonte: ['Website', 'LinkedIn', 'Google Ads', 'Referral'][Math.floor(Math.random() * 4)],
          priorita: ['Alta', 'Media'][Math.floor(Math.random() * 2)] as any,
          tempo: 'Ora',
          letto: false,
          potenziale: `€${(Math.random() * 30000 + 5000).toFixed(0)}/anno`,
          telefono: `+39 3${Math.floor(Math.random() * 90000000 + 10000000)}`
        };
        
        setLeads(prev => [newLead, ...prev.slice(0, 7)]); // Mantieni solo le ultime 8
      }
    }, 10000); // Ogni 10 secondi

    return () => clearInterval(interval);
  }, []);

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completato: !task.completato } : task
    ));
  };

  const markLeadAsRead = (leadId: number) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, letto: true } : lead
    ));
  };

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
              // Apri sempre il pannello quando clicco un'icona
              setIsCollapsed(false);
              onCollapseChange?.(false);
              // Resetta il flag manualToggle per permettere auto-collapse successivo
              setManualToggle(false);
              // Cancella eventuali timeout
              if (autoCollapseTimeout) {
                clearTimeout(autoCollapseTimeout);
                setAutoCollapseTimeout(null);
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
              // Apri sempre il pannello quando clicco un'icona
              setIsCollapsed(false);
              onCollapseChange?.(false);
              // Resetta il flag manualToggle per permettere auto-collapse successivo
              setManualToggle(false);
              // Cancella eventuali timeout
              if (autoCollapseTimeout) {
                clearTimeout(autoCollapseTimeout);
                setAutoCollapseTimeout(null);
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
              // Apri sempre il pannello quando clicco un'icona
              setIsCollapsed(false);
              onCollapseChange?.(false);
              // Resetta il flag manualToggle per permettere auto-collapse successivo
              setManualToggle(false);
              // Cancella eventuali timeout
              if (autoCollapseTimeout) {
                clearTimeout(autoCollapseTimeout);
                setAutoCollapseTimeout(null);
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
          {leads.filter(n => !n.letto).length > 0 && (
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
                  {tasks.map((task, index) => (
                    <Card key={task.id} className={cn(
                      "border-border/30 transition-all duration-300 hover:shadow-lg hover-scale cursor-pointer animate-fade-in group",
                      task.completato ? "bg-muted/30 opacity-70" : "bg-background/50",
                      task.urgente && !task.completato && "border-orange-200 shadow-sm",
                      "hover:bg-background/80"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => toggleTask(task.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          {/* Status Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110",
                            task.completato 
                              ? "bg-success/20 text-success border-2 border-success/30" 
                              : "bg-muted/30 border-2 border-muted-foreground/30 hover:border-primary/50"
                          )}>
                            {task.completato ? (
                              <CheckSquare className="w-5 h-5 animate-scale-in" />
                            ) : (
                              <CheckSquare className="w-5 h-5 opacity-50" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={cn(
                                "text-sm font-medium leading-tight transition-all duration-200 group-hover:text-primary",
                                task.completato && "line-through text-muted-foreground"
                              )}>
                                {task.titolo}
                              </h4>
                              {task.urgente && !task.completato && (
                                <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0 animate-pulse" />
                              )}
                            </div>
                            
                            {/* Subtitle */}
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                              {task.descrizione}
                            </p>
                            
                            {/* Metadata */}
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={
                                task.priorita === 'Alta' ? 'destructive' : 
                                task.priorita === 'Media' ? 'secondary' : 'outline'
                              } className="text-xs">
                                {task.priorita}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {task.categoria}
                              </Badge>
                            </div>
                            
                            {/* Footer info */}
                            <div className="flex items-center justify-between">
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
                  {eventiCalendario.map((evento, index) => (
                    <Card key={evento.id} className={cn(
                      "border-border/30 bg-background/50 hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer animate-fade-in group",
                      "hover:bg-background/80"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          {/* Time Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex flex-col items-center justify-center text-white transition-all duration-200 group-hover:scale-110",
                            evento.colore === 'blue' && "bg-blue-500",
                            evento.colore === 'purple' && "bg-purple-500", 
                            evento.colore === 'green' && "bg-green-500",
                            evento.colore === 'orange' && "bg-orange-500",
                            evento.colore === 'red' && "bg-red-500"
                          )}>
                            <span className="text-xs font-bold leading-none">
                              {evento.ora.split(':')[0]}
                            </span>
                            <span className="text-xs leading-none">
                              {evento.ora.split(':')[1]}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                                {evento.titolo}
                              </h4>
                            </div>
                            
                            {/* Subtitle */}
                            <p className="text-xs text-muted-foreground mb-3 group-hover:text-foreground/80 transition-colors">
                              {evento.data} • {evento.location}
                            </p>
                            
                            {/* Metadata */}
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {evento.tipo === 'meeting' && '🤝 Riunione'}
                                {evento.tipo === 'presentation' && '🎯 Presentazione'}
                                {evento.tipo === 'training' && '📚 Formazione'}
                                {evento.tipo === 'client' && '👥 Cliente'}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {evento.partecipanti} persone
                              </Badge>
                            </div>
                            
                            {/* Footer info */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {evento.ora}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Sala riunioni
                              </span>
                            </div>
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
                  <Badge variant="destructive" className="text-xs animate-pulse">
                    {leads.filter(n => !n.letto).length} nuove
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {leads.map((lead, index) => (
                    <Card key={lead.id} className={cn(
                      "border-border/30 transition-all duration-300 hover:shadow-lg hover-scale cursor-pointer animate-fade-in group",
                      !lead.letto ? "bg-orange-50/50 border-orange-200 shadow-sm" : "bg-background/50",
                      "hover:bg-background/80"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => markLeadAsRead(lead.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          {/* Status Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110",
                            lead.tipo === 'nuovo_lead' ? "bg-blue-500/20 text-blue-600 border-2 border-blue-500/30" :
                            lead.tipo === 'lead_qualificato' ? "bg-green-500/20 text-green-600 border-2 border-green-500/30" :
                            lead.tipo === 'appuntamento_fissato' ? "bg-purple-500/20 text-purple-600 border-2 border-purple-500/30" :
                            lead.tipo === 'contratto_in_chiusura' ? "bg-emerald-500/20 text-emerald-600 border-2 border-emerald-500/30" :
                            "bg-orange-500/20 text-orange-600 border-2 border-orange-500/30"
                          )}>
                            {lead.tipo === 'nuovo_lead' ? <Star className="h-5 w-5" /> :
                             lead.tipo === 'lead_qualificato' ? <TrendingUp className="h-5 w-5" /> :
                             lead.tipo === 'appuntamento_fissato' ? <Calendar className="h-5 w-5" /> :
                             lead.tipo === 'contratto_in_chiusura' ? <Zap className="h-5 w-5" /> :
                             <Phone className="h-5 w-5" />}
                            {!lead.letto && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                                {lead.messaggio}
                              </h4>
                            </div>
                            
                            {/* Subtitle */}
                            <p className="text-xs text-muted-foreground mb-3 group-hover:text-foreground/80 transition-colors">
                              {lead.cliente} • {lead.azienda}
                            </p>
                            
                            {/* Metadata */}
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={lead.priorita === 'Alta' ? 'destructive' : 'secondary'} className="text-xs">
                                {lead.priorita}
                              </Badge>
                              <Badge variant="outline" className="text-xs text-green-600">
                                {lead.potenziale}
                              </Badge>
                            </div>
                            
                            {/* Footer info */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lead.tempo} • {lead.fonte}
                              </span>
                              <Button variant="ghost" size="sm" className="h-6 text-xs px-2 hover:bg-primary hover:text-primary-foreground">
                                <Phone className="h-3 w-3 mr-1" />
                                Chiama
                              </Button>
                            </div>
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