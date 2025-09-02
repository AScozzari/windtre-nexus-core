import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Calendar, CheckSquare, TrendingUp, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const WorkspaceSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('activity');

  const attivitaRecenti = [
    { id: 1, tipo: 'Nuovo cliente', descrizione: 'Mario Rossi - Milano Centro', tempo: '2 ore fa', colore: 'bg-orange-500' },
    { id: 2, tipo: 'Contratto firmato', descrizione: 'Fibra Casa - Laura Bianchi', tempo: '3 ore fa', colore: 'bg-purple-500' },
    { id: 3, tipo: 'Pagamento ricevuto', descrizione: 'Fattura #12345 - €89,99', tempo: '4 ore fa', colore: 'bg-green-500' },
    { id: 4, tipo: 'Task completato', descrizione: 'Follow-up cliente Premium', tempo: '5 ore fa', colore: 'bg-blue-500' },
  ];

  const nuoviClienti = [
    { nome: 'Giuseppe Verde', interesse: 'Piano Business', priorita: 'Alta', tempo: '15 min fa' },
    { nome: 'Anna Neri', interesse: 'Fibra + Mobile', priorita: 'Media', tempo: '30 min fa' },
    { nome: 'Paolo Rossi', interesse: 'Solo Mobile', priorita: 'Bassa', tempo: '1 ora fa' },
  ];

  const taskImportanti = [
    { titolo: 'Chiamata follow-up', cliente: 'Mario Bianchi', scadenza: 'Oggi 15:00', urgente: true },
    { titolo: 'Preparare contratto', cliente: 'Laura Verde', scadenza: 'Domani 10:00', urgente: false },
    { titolo: 'Rinnovo servizi', cliente: 'Giuseppe Neri', scadenza: 'Venerdì', urgente: false },
  ];

  const eventiCalendario = [
    { titolo: 'Riunione Team', ora: '14:30', tipo: 'meeting' },
    { titolo: 'Presentazione Q1', ora: '16:00', tipo: 'presentation' },
    { titolo: 'Training nuovo staff', ora: '09:00 Dom', tipo: 'training' },
  ];

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full bg-background/95 backdrop-blur-sm border-l border-border/50 transition-all duration-300 z-30",
      isCollapsed ? "w-12" : "w-80"
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-6 top-20 z-40 bg-background border border-border/50 rounded-full p-1 h-6 w-6"
      >
        {isCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>

      {!isCollapsed && (
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-purple-600">Workspace</h2>
            <div className="flex gap-2 mt-2">
              <Button variant="ghost" size="sm" className="bg-purple-100 text-purple-700 h-7">
                <Bell className="h-3 w-3 mr-1" />
                Report
              </Button>
              <Button variant="ghost" size="sm" className="bg-orange-100 text-orange-700 h-7">
                Nuovo Cliente
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4 h-8">
              <TabsTrigger value="activity" className="text-xs">
                Attività
              </TabsTrigger>
              <TabsTrigger value="workspace" className="text-xs">
                Dashboard
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="activity" className="space-y-4 mt-0">
                {/* Attività Recenti */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Attività Recenti
                  </h3>
                  <div className="space-y-2">
                    {attivitaRecenti.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", item.colore)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium leading-tight">{item.tipo}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.descrizione}</p>
                          <p className="text-xs text-muted-foreground">{item.tempo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nuovi Clienti */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Nuovi clienti aggiunti
                  </h3>
                  <div className="space-y-2">
                    {nuoviClienti.map((cliente, index) => (
                      <div key={index} className="p-2 rounded-lg border border-border/30 bg-muted/20">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium">{cliente.nome}</p>
                          <Badge variant={cliente.priorita === 'Alta' ? 'destructive' : cliente.priorita === 'Media' ? 'secondary' : 'outline'} className="text-xs h-5">
                            {cliente.priorita}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{cliente.interesse}</p>
                        <p className="text-xs text-muted-foreground">{cliente.tempo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="workspace" className="space-y-4 mt-0">
                {/* Task Importanti */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-500" />
                    Task completati
                  </h3>
                  <div className="space-y-2">
                    {taskImportanti.map((task, index) => (
                      <div key={index} className="p-2 rounded-lg border border-border/30 bg-muted/20">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium">{task.titolo}</p>
                          {task.urgente && (
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{task.cliente}</p>
                        <p className="text-xs text-muted-foreground">{task.scadenza}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eventi Calendario */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    Prossimi eventi
                  </h3>
                  <div className="space-y-2">
                    {eventiCalendario.map((evento, index) => (
                      <div key={index} className="p-2 rounded-lg border border-border/30 bg-muted/20">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {evento.ora.split(':')[0]}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">{evento.titolo}</p>
                            <p className="text-xs text-muted-foreground">{evento.ora}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fattura generata */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500" />
                    Fattura generata
                  </h3>
                  <Card className="border-border/30 bg-muted/20">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium">Nuova fattura creata</p>
                        <Badge variant="secondary" className="text-xs">NEW</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Cliente: WindTre Business</p>
                      <p className="text-xs text-muted-foreground">Importo: €1,250.00</p>
                      <p className="text-xs text-muted-foreground">10 min fa</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      )}
    </div>
  );
};