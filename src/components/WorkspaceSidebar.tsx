import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare, Calendar, MessageCircle, Clock, Bell, AlertCircle, User, Phone, Mail, MapPin, TrendingUp, Zap, Star, CalendarIcon, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isWithinInterval, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

interface WorkspaceSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const WorkspaceSidebar = ({ onCollapseChange }: WorkspaceSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [manualToggle, setManualToggle] = useState(false);
  const [eventDaysFilter, setEventDaysFilter] = useState(7); // 7 o 15 giorni
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

  const [eventiCalendario, setEventiCalendario] = useState(() => {
    const oggi = new Date();
    return [
      { 
        id: 1,
        titolo: 'Riunione Team Vendite Q1', 
        ora: '14:30', 
        dataCompleta: new Date(oggi.getTime() + 1 * 24 * 60 * 60 * 1000), // Domani
        tipo: 'meeting',
        partecipanti: 8,
        location: 'Sala Conferenze A',
        colore: 'blue',
        descrizione: 'Revisione obiettivi Q1 e pianificazione strategie commerciali'
      },
      { 
        id: 2,
        titolo: 'Presentazione Risultati Trimestrali', 
        ora: '16:00', 
        dataCompleta: new Date(oggi.getTime() + 1 * 24 * 60 * 60 * 1000), // Domani
        tipo: 'presentation',
        partecipanti: 15,
        location: 'Auditorium Principale',
        colore: 'purple',
        descrizione: 'Presentazione KPI e risultati del trimestre agli stakeholder'
      },
      { 
        id: 3,
        titolo: 'Training Nuovo Personale Vendite', 
        ora: '09:00', 
        dataCompleta: new Date(oggi.getTime() + 2 * 24 * 60 * 60 * 1000), // Dopodomani
        tipo: 'training',
        partecipanti: 6,
        location: 'Aula Formazione B',
        colore: 'green',
        descrizione: 'Formazione su prodotti WindTre Business e tecniche di vendita'
      },
      { 
        id: 4,
        titolo: 'Demo Enterprise per Fortune 500', 
        ora: '11:30', 
        dataCompleta: new Date(oggi.getTime() + 2 * 24 * 60 * 60 * 1000), // Dopodomani
        tipo: 'client',
        partecipanti: 5,
        location: 'Ufficio Direzione',
        colore: 'orange',
        descrizione: 'Presentazione soluzioni enterprise per cliente multinazionale'
      },
      { 
        id: 5,
        titolo: 'Revisione Budget Marketing', 
        ora: '15:00', 
        dataCompleta: new Date(oggi.getTime() + 3 * 24 * 60 * 60 * 1000), // Tra 3 giorni
        tipo: 'meeting',
        partecipanti: 4,
        location: 'Sala Riunioni C',
        colore: 'red',
        descrizione: 'Analisi ROI campagne pubblicitarie e allocazione budget 2025'
      },
      { 
        id: 6,
        titolo: 'Call con Cliente Premium', 
        ora: '10:00', 
        dataCompleta: new Date(oggi.getTime() + 4 * 24 * 60 * 60 * 1000), // Tra 4 giorni
        tipo: 'client',
        partecipanti: 3,
        location: 'Online - Teams',
        colore: 'blue',
        descrizione: 'Follow-up contratto renewal e upselling servizi aggiuntivi'
      },
      { 
        id: 7,
        titolo: 'Workshop Innovazione Digitale', 
        ora: '14:00', 
        dataCompleta: new Date(oggi.getTime() + 5 * 24 * 60 * 60 * 1000), // Tra 5 giorni
        tipo: 'training',
        partecipanti: 12,
        location: 'Sala Magna',
        colore: 'green',
        descrizione: 'Esplorazione nuove tecnologie 5G e IoT per il business'
      },
      { 
        id: 8,
        titolo: 'Negoziazione Contratto Globale', 
        ora: '09:30', 
        dataCompleta: new Date(oggi.getTime() + 6 * 24 * 60 * 60 * 1000), // Tra 6 giorni
        tipo: 'client',
        partecipanti: 7,
        location: 'Sala Contratti',
        colore: 'orange',
        descrizione: 'Finalizzazione accordo per servizi enterprise multinazionali'
      },
      { 
        id: 9,
        titolo: 'All Hands Meeting Dicembre', 
        ora: '11:00', 
        dataCompleta: new Date(oggi.getTime() + 8 * 24 * 60 * 60 * 1000), // Tra 8 giorni
        tipo: 'meeting',
        partecipanti: 45,
        location: 'Auditorium Principale',
        colore: 'purple',
        descrizione: 'Riunione generale mensile con tutti i dipendenti'
      },
      { 
        id: 10,
        titolo: 'Formazione Cybersecurity', 
        ora: '13:30', 
        dataCompleta: new Date(oggi.getTime() + 9 * 24 * 60 * 60 * 1000), // Tra 9 giorni
        tipo: 'training',
        partecipanti: 20,
        location: 'Lab Sicurezza IT',
        colore: 'green',
        descrizione: 'Training obbligatorio su sicurezza informatica e best practices'
      },
      { 
        id: 11,
        titolo: 'Pitch Nuovo Prodotto 5G+', 
        ora: '16:30', 
        dataCompleta: new Date(oggi.getTime() + 10 * 24 * 60 * 60 * 1000), // Tra 10 giorni
        tipo: 'presentation',
        partecipanti: 25,
        location: 'Innovation Hub',
        colore: 'purple',
        descrizione: 'Presentazione lancio nuova gamma prodotti 5G avanzati'
      },
      { 
        id: 12,
        titolo: 'Onboarding Clienti Enterprise', 
        ora: '10:30', 
        dataCompleta: new Date(oggi.getTime() + 11 * 24 * 60 * 60 * 1000), // Tra 11 giorni
        tipo: 'client',
        partecipanti: 8,
        location: 'Centro Assistenza Premium',
        colore: 'blue',
        descrizione: 'Sessione di onboarding per nuovi clienti corporate'
      },
      { 
        id: 13,
        titolo: 'Planning Strategico 2025', 
        ora: '09:00', 
        dataCompleta: new Date(oggi.getTime() + 12 * 24 * 60 * 60 * 1000), // Tra 12 giorni
        tipo: 'meeting',
        partecipanti: 12,
        location: 'Sala Strategia',
        colore: 'red',
        descrizione: 'Definizione obiettivi e roadmap per il prossimo anno fiscale'
      },
      { 
        id: 14,
        titolo: 'Demo Soluzioni IoT Business', 
        ora: '15:15', 
        dataCompleta: new Date(oggi.getTime() + 14 * 24 * 60 * 60 * 1000), // Tra 14 giorni
        tipo: 'client',
        partecipanti: 6,
        location: 'Showroom Tecnologie',
        colore: 'orange',
        descrizione: 'Dimostrazione pratica soluzioni IoT per settore manifatturiero'
      },
      { 
        id: 15,
        titolo: 'Team Building Fine Anno', 
        ora: '18:00', 
        dataCompleta: new Date(oggi.getTime() + 16 * 24 * 60 * 60 * 1000), // Tra 16 giorni
        tipo: 'meeting',
        partecipanti: 35,
        location: 'Terrazza Aziendale',
        colore: 'green',
        descrizione: 'Evento sociale di fine anno con il team commerciale'
      },
      { 
        id: 16,
        titolo: 'Review Performance Q4', 
        ora: '14:45', 
        dataCompleta: new Date(oggi.getTime() + 17 * 24 * 60 * 60 * 1000), // Tra 17 giorni
        tipo: 'meeting',
        partecipanti: 10,
        location: 'Sala Direzione',
        colore: 'red',
        descrizione: 'Valutazione risultati ultimo trimestre e bonus allocation'
      },
      { 
        id: 17,
        titolo: 'Webinar Cloud Solutions', 
        ora: '11:45', 
        dataCompleta: new Date(oggi.getTime() + 18 * 24 * 60 * 60 * 1000), // Tra 18 giorni
        tipo: 'training',
        partecipanti: 50,
        location: 'Online - Webex',
        colore: 'purple',
        descrizione: 'Seminario su nuove soluzioni cloud per il business'
      },
      { 
        id: 18,
        titolo: 'Chiusura Deals Fine Anno', 
        ora: '16:00', 
        dataCompleta: new Date(oggi.getTime() + 20 * 24 * 60 * 60 * 1000), // Tra 20 giorni
        tipo: 'client',
        partecipanti: 4,
        location: 'Ufficio Contratti',
        colore: 'orange',
        descrizione: 'Finalizzazione ultimi contratti prima delle festività'
      }
    ];
  });

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

            <ScrollArea className="flex-1 pr-2">
              {/* TASKS TAB */}
              <TabsContent value="tasks" className="space-y-4 mt-0 px-1 pb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Le mie attività</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tasks.filter(t => !t.completato).length} attive
                  </Badge>
                </div>
                
                <div className="space-y-3 min-h-[600px]">
                  {tasks.map((task, index) => (
                    <Card key={task.id} className={cn(
                      "border-border/30 bg-background/50 transition-all duration-300 cursor-pointer group",
                      "hover:bg-background/80 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1",
                      !task.completato && "bg-orange-50/30",
                      task.completato && "opacity-60"
                    )}
                    onClick={() => toggleTask(task.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          {/* Status Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300",
                            "group-hover:scale-110 group-hover:rotate-3",
                            task.completato 
                              ? "bg-green-50 text-green-600 border border-green-200" 
                              : "bg-muted text-muted-foreground border border-border"
                          )}>
                            <CheckSquare className="w-5 h-5" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={cn(
                              "text-sm font-medium mb-1 transition-all duration-300",
                              "group-hover:text-primary group-hover:translate-x-1",
                              task.completato && "line-through text-muted-foreground"
                            )}>
                              {task.titolo}
                            </h4>
                            
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-foreground/80">
                              {task.descrizione}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant={
                                  task.priorita === 'Alta' ? 'destructive' : 
                                  task.priorita === 'Media' ? 'default' : 'secondary'
                                } className="text-xs transition-all duration-300 group-hover:scale-105">
                                  {task.priorita}
                                </Badge>
                              </div>
                              
                              <span className="text-xs text-muted-foreground flex items-center gap-1 transition-all duration-300 group-hover:text-primary">
                                <Clock className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
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
              <TabsContent value="calendar" className="space-y-4 mt-0 px-1 pb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Calendario</h3>
                  <Badge variant="secondary" className="text-xs">
                    {eventiCalendario.length} eventi totali
                  </Badge>
                </div>
                
                {/* Calendario interattivo migliorato */}
                <Card className="border-border/30 bg-background/50 mb-4">
                  <CardContent className="p-3">
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
                        nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-xs",
                        row: "flex w-full mt-0.5",
                        cell: "text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-8 w-8 p-0 font-normal text-xs aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground font-bold",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </CardContent>
                </Card>
                
                {/* Eventi per la data selezionata */}
                {selectedDate && (
                  <Card className="border-border/30 bg-blue-50/30 mb-4">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">
                          Eventi per {selectedDate.toLocaleDateString('it-IT', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {eventiCalendario.filter(evento => 
                            evento.dataCompleta.toDateString() === selectedDate.toDateString()
                          ).length} eventi
                        </Badge>
                      </div>
                      
                      {eventiCalendario.filter(evento => 
                        evento.dataCompleta.toDateString() === selectedDate.toDateString()
                      ).length === 0 ? (
                        <p className="text-xs text-muted-foreground">Nessun evento programmato per questa data</p>
                      ) : (
                        <div className="space-y-2">
                          {eventiCalendario
                            .filter(evento => evento.dataCompleta.toDateString() === selectedDate.toDateString())
                            .sort((a, b) => a.ora.localeCompare(b.ora))
                            .map((evento) => (
                               <Card key={evento.id} className="w-full border-border/30 bg-background/50 hover:bg-background/80 transition-all duration-200 cursor-pointer group">
                                 <CardContent className="p-2">
                                   <div className="flex items-start gap-2">
                                     {/* Compact Time Badge */}
                                     <div className={cn(
                                       "w-8 h-8 rounded-md flex flex-col items-center justify-center text-white text-xs font-bold transition-all duration-200 group-hover:scale-105 flex-shrink-0",
                                       evento.colore === 'blue' && "bg-blue-500",
                                       evento.colore === 'purple' && "bg-purple-500",
                                       evento.colore === 'green' && "bg-green-500",
                                       evento.colore === 'orange' && "bg-orange-500",
                                       evento.colore === 'red' && "bg-red-500"
                                     )}>
                                       <span className="text-xs leading-none">{evento.ora.split(':')[0]}</span>
                                       <span className="text-xs leading-none opacity-80">{evento.ora.split(':')[1]}</span>
                                     </div>
                                     
                                     {/* Compact Event Details */}
                                     <div className="flex-1 min-w-0">
                                       <div className="flex items-start justify-between mb-1">
                                         <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 pr-1">
                                           {evento.titolo}
                                         </h4>
                                         <Badge variant="outline" className="text-xs px-1 py-0 h-4 flex-shrink-0">
                                           {evento.tipo === 'meeting' && '🤝'}
                                           {evento.tipo === 'presentation' && '🎯'}
                                           {evento.tipo === 'training' && '📚'}
                                           {evento.tipo === 'client' && '👥'}
                                         </Badge>
                                       </div>
                                       
                                       {/* Compact Description */}
                                       <p className="text-xs text-muted-foreground mb-2 line-clamp-1 leading-tight">
                                         {evento.descrizione}
                                       </p>
                                       
                                       {/* Compact Info Row */}
                                       <div className="flex items-center justify-between text-xs text-muted-foreground">
                                         <div className="flex items-center gap-1 flex-1 min-w-0">
                                           <MapPin className="h-3 w-3 flex-shrink-0" />
                                           <span className="truncate">{evento.location}</span>
                                         </div>
                                         <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                                           <User className="h-3 w-3" />
                                           <span>{evento.partecipanti}</span>
                                         </div>
                                       </div>
                                       
                                       {/* Compact Duration */}
                                       <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                         <Clock className="h-3 w-3" />
                                         <span>
                                           {evento.ora} - {(() => {
                                             const [hours, minutes] = evento.ora.split(':').map(Number);
                                             const endTime = new Date();
                                             endTime.setHours(hours + 1, minutes);
                                             return endTime.toTimeString().slice(0, 5);
                                           })()}
                                         </span>
                                       </div>
                                       
                                       {/* Compact Actions */}
                                       <div className="flex items-center gap-1 mt-2 pt-1 border-t border-border/30">
                                         <Button variant="outline" size="sm" className="h-5 text-xs px-2 flex-1 min-w-0">
                                           📅 Dettaglio
                                         </Button>
                                         <Button variant="ghost" size="sm" className="h-5 text-xs px-1 flex-shrink-0">
                                           ✏️
                                         </Button>
                                         <Button variant="ghost" size="sm" className="h-5 text-xs px-1 flex-shrink-0">
                                           📧
                                         </Button>
                                       </div>
                                     </div>
                                   </div>
                                 </CardContent>
                               </Card>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Prossimi eventi</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-6 text-xs px-2 gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {dateRange?.from && dateRange?.to ? (
                          `${format(dateRange.from, "dd/MM")} - ${format(dateRange.to, "dd/MM")}`
                        ) : (
                          "Seleziona periodo"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className={cn("p-3 pointer-events-auto")}
                      />
                      <div className="flex items-center gap-2 p-3 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 text-xs px-2 flex-1"
                          onClick={() => setDateRange({
                            from: new Date(),
                            to: addDays(new Date(), 7)
                          })}
                        >
                          7 giorni
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 text-xs px-2 flex-1"
                          onClick={() => setDateRange({
                            from: new Date(),
                            to: addDays(new Date(), 15)
                          })}
                        >
                          15 giorni
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-3">
                  {(() => {
                    const eventiFiltered = eventiCalendario
                      .filter(evento => {
                        const eventoDate = new Date(evento.dataCompleta);
                        if (dateRange?.from && dateRange?.to) {
                          return isWithinInterval(eventoDate, { 
                            start: dateRange.from, 
                            end: dateRange.to 
                          });
                        }
                        return true;
                      })
                      .sort((a, b) => a.dataCompleta.getTime() - b.dataCompleta.getTime());
                      
                    return eventiFiltered.length === 0 ? (
                      <Card className="border-border/30 bg-muted/20">
                        <CardContent className="p-4 text-center">
                          <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            Nessun evento nel periodo selezionato
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      eventiFiltered.slice(0, 6).map((evento, index) => (
                        <Card key={evento.id} className={cn(
                          "w-full border-border/30 bg-background/50 transition-all duration-300 cursor-pointer group",
                          "hover:bg-background/80 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1",
                          index < 2 && "bg-orange-50/30"
                        )}>
                          <CardContent className="p-2">
                            <div className="flex items-start gap-2">
                              {/* Compact Time Badge with Date */}
                              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                <div className={cn(
                                  "w-9 h-9 rounded-lg flex flex-col items-center justify-center text-white transition-all duration-200 group-hover:scale-105",
                                  evento.colore === 'blue' && "bg-blue-500",
                                  evento.colore === 'purple' && "bg-purple-500", 
                                  evento.colore === 'green' && "bg-green-500",
                                  evento.colore === 'orange' && "bg-orange-500",
                                  evento.colore === 'red' && "bg-red-500"
                                )}>
                                  <span className="text-xs font-bold leading-none">{evento.ora.split(':')[0]}</span>
                                  <span className="text-xs leading-none opacity-80">{evento.ora.split(':')[1]}</span>
                                </div>
                                <span className="text-xs font-medium text-center text-muted-foreground leading-none">
                                  {evento.dataCompleta.toLocaleDateString('it-IT', { 
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                              </div>
                              
                              {/* Compact Event Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 pr-1">
                                    {evento.titolo}
                                  </h4>
                                  {index < 2 && (
                                    <Badge variant="default" className="text-xs px-1 py-0 h-4 bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                                      ⭐
                                    </Badge>
                                  )}
                                </div>
                                
                                {/* Compact Description */}
                                <p className="text-xs text-muted-foreground mb-2 line-clamp-1 leading-tight">
                                  {evento.descrizione}
                                </p>
                                
                                {/* Compact Metadata Row */}
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-1 min-w-0 flex-1">
                                    <Badge variant="outline" className="text-xs px-1 py-0 h-4 flex-shrink-0">
                                      {evento.tipo === 'meeting' && '🤝'}
                                      {evento.tipo === 'presentation' && '🎯'}
                                      {evento.tipo === 'training' && '📚'}
                                      {evento.tipo === 'client' && '👥'}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 text-muted-foreground ml-2 flex-shrink-0">
                                    <User className="h-3 w-3" />
                                    <span>{evento.partecipanti}</span>
                                  </div>
                                </div>
                                
                                {/* Compact Location Row */}
                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate" title={evento.location}>
                                    {evento.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    );
                  })()}
                  
                  {/* Statistiche eventi nel periodo selezionato */}
                  {dateRange?.from && dateRange?.to && (
                    <Card className="border-border/30 bg-gradient-to-r from-blue-50/50 to-purple-50/50 mt-4">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <span className="font-medium text-foreground">
                              {eventiCalendario.filter(evento => {
                                const eventoDate = new Date(evento.dataCompleta);
                                return isWithinInterval(eventoDate, { 
                                  start: dateRange.from!, 
                                  end: dateRange.to! 
                                });
                              }).length}
                            </span>
                            <span className="text-muted-foreground ml-1">eventi nel periodo</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">+12%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                
                <div className="space-y-3 min-h-[400px]">
                  {leads.map((lead, index) => (
                    <Card key={lead.id} className={cn(
                      "border-border/30 bg-background/50 transition-all duration-300 cursor-pointer group",
                      "hover:bg-background/80 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1",
                      !lead.letto && "bg-orange-50/30"
                    )}
                    onClick={() => markLeadAsRead(lead.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          {/* Status Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 border",
                            "group-hover:scale-110 group-hover:rotate-3",
                            lead.tipo === 'nuovo_lead' ? "bg-blue-50 text-blue-600 border-blue-200" :
                            lead.tipo === 'lead_qualificato' ? "bg-green-50 text-green-600 border-green-200" :
                            lead.tipo === 'appuntamento_fissato' ? "bg-purple-50 text-purple-600 border-purple-200" :
                            lead.tipo === 'contratto_in_chiusura' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                            "bg-orange-50 text-orange-600 border-orange-200"
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
                            <h4 className="text-sm font-medium mb-1 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                              {lead.messaggio}
                            </h4>
                            
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-foreground/80">
                              {lead.cliente} • {lead.azienda}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant={lead.priorita === 'Alta' ? 'destructive' : 'secondary'} className="text-xs transition-all duration-300 group-hover:scale-105">
                                  {lead.priorita}
                                </Badge>
                              </div>
                              
                              <span className="text-xs text-muted-foreground flex items-center gap-1 transition-all duration-300 group-hover:text-primary">
                                <Clock className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
                                {lead.tempo}
                              </span>
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