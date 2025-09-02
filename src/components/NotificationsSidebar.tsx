import { useState } from 'react';
import { X, Bell, Calendar, CheckSquare, Users, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsSidebar = ({ isOpen, onClose }: NotificationsSidebarProps) => {
  const [activeTab, setActiveTab] = useState('activities');

  const attivita = [
    { id: 1, tipo: 'vendita', messaggio: 'Nuovo contratto mobile attivato per Mario Rossi', tempo: '5 min fa', letto: false },
    { id: 2, tipo: 'sistema', messaggio: 'Backup database completato con successo', tempo: '15 min fa', letto: true },
    { id: 3, tipo: 'cliente', messaggio: 'Richiesta assistenza da cliente Premium', tempo: '1h fa', letto: false },
    { id: 4, tipo: 'pagamento', messaggio: 'Pagamento fattura ricevuto - €89.99', tempo: '2h fa', letto: true },
  ];

  const leads = [
    { id: 1, nome: 'Laura Bianchi', fonte: 'Website', interesse: 'Fibra Casa', priorita: 'alta', tempo: '10 min fa' },
    { id: 2, nome: 'Giuseppe Verde', fonte: 'Telefono', interesse: 'Piano Business', priorita: 'media', tempo: '30 min fa' },
    { id: 3, nome: 'Anna Neri', fonte: 'Email', interesse: 'Mobile + Fibra', priorita: 'alta', tempo: '1h fa' },
  ];

  const eventi = [
    { id: 1, titolo: 'Riunione Team Vendite', ora: '14:30', tipo: 'meeting' },
    { id: 2, titolo: 'Scadenza contratto - Cliente XYZ', ora: '16:00', tipo: 'scadenza' },
    { id: 3, titolo: 'Formazione nuovo personale', ora: '09:00', tipo: 'formazione' },
    { id: 4, titolo: 'Report mensile vendite', ora: '18:00', tipo: 'report' },
  ];

  const tasks = [
    { id: 1, titolo: 'Contattare cliente per rinnovo', priorita: 'alta', completato: false, scadenza: 'Oggi' },
    { id: 2, titolo: 'Preparare presentazione Q1', priorita: 'media', completato: false, scadenza: 'Domani' },
    { id: 3, titolo: 'Aggiornare database clienti', priorita: 'bassa', completato: true, scadenza: 'Ieri' },
    { id: 4, titolo: 'Verificare documentazione contratti', priorita: 'media', completato: false, scadenza: 'Venerdì' },
  ];

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'vendita': return '💰';
      case 'sistema': return '⚙️';
      case 'cliente': return '👤';
      case 'pagamento': return '💳';
      default: return '📄';
    }
  };

  const getPrioritaColor = (priorita: string) => {
    switch(priorita) {
      case 'alta': return 'destructive';
      case 'media': return 'warning';
      case 'bassa': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 glass-strong border-l border-border/50 z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-windtre-orange" />
            <h2 className="text-lg font-semibold">Notifiche</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4 mb-2">
            <TabsTrigger value="activities" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Attività
            </TabsTrigger>
            <TabsTrigger value="leads" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Eventi
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              <CheckSquare className="h-3 w-3 mr-1" />
              Task
            </TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="flex-1 px-4 pb-4">
            <ScrollArea className="h-full">
              <TabsContent value="activities" className="space-y-3 mt-0">
                {attivita.map((attivita) => (
                  <Card key={attivita.id} className={cn(
                    "glass border-border/50 transition-all duration-200 hover:glass-strong cursor-pointer",
                    !attivita.letto && "border-windtre-orange/30"
                  )}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{getTipoIcon(attivita.tipo)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-tight">{attivita.messaggio}</p>
                          <p className="text-xs text-muted-foreground mt-1">{attivita.tempo}</p>
                        </div>
                        {!attivita.letto && (
                          <div className="w-2 h-2 bg-windtre-orange rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="leads" className="space-y-3 mt-0">
                {leads.map((lead) => (
                  <Card key={lead.id} className="glass border-border/50 hover:glass-strong cursor-pointer transition-all duration-200">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{lead.nome}</h4>
                          <p className="text-xs text-muted-foreground">{lead.interesse}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Da {lead.fonte} • {lead.tempo}
                          </p>
                        </div>
                        <Badge variant={getPrioritaColor(lead.priorita) as any} className="text-xs">
                          {lead.priorita}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="calendar" className="space-y-3 mt-0">
                {eventi.map((evento) => (
                  <Card key={evento.id} className="glass border-border/50 hover:glass-strong cursor-pointer transition-all duration-200">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {evento.ora.split(':')[0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{evento.titolo}</h4>
                          <p className="text-xs text-muted-foreground">Oggi alle {evento.ora}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-3 mt-0">
                {tasks.map((task) => (
                  <Card key={task.id} className="glass border-border/50 hover:glass-strong cursor-pointer transition-all duration-200">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5",
                          task.completato 
                            ? "bg-success border-success" 
                            : "border-muted-foreground"
                        )}>
                          {task.completato && (
                            <CheckSquare className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            "text-sm font-medium",
                            task.completato && "line-through text-muted-foreground"
                          )}>
                            {task.titolo}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getPrioritaColor(task.priorita) as any} className="text-xs">
                              {task.priorita}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.scadenza}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </>
  );
};