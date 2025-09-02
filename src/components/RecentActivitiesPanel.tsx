import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Activity,
  Phone,
  FileText,
  CreditCard,
  UserPlus,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw
} from 'lucide-react';

const mockActivities = [
  {
    id: '1',
    type: 'customer_added',
    icon: UserPlus,
    title: 'Nuovo cliente aggiunto',
    description: 'Mario Rossi registrato con piano Mobile',
    user: 'Sistema',
    timestamp: '2 min fa',
    priority: 'normal',
    metadata: {
      customer: 'Mario Rossi',
      plan: 'MIA Unlimited'
    }
  },
  {
    id: '2',
    type: 'call_completed',
    icon: Phone,
    title: 'Chiamata completata',
    description: 'Call con Anna Bianchi - Supporto tecnico',
    user: 'Operatore Luigi',
    timestamp: '5 min fa',
    priority: 'normal',
    metadata: {
      duration: '12 min',
      outcome: 'Risolta'
    }
  },
  {
    id: '3',
    type: 'invoice_generated',
    icon: FileText,
    title: 'Fattura generata',
    description: 'FAT-2024-106 per €29.90',
    user: 'Sistema Billing',
    timestamp: '8 min fa',
    priority: 'normal',
    metadata: {
      amount: '€29.90',
      customer: 'Luigi Verdi'
    }
  },
  {
    id: '4',
    type: 'payment_received',
    icon: CreditCard,
    title: 'Pagamento ricevuto',
    description: 'Giulia Neri - Fattura FAT-2024-105',
    user: 'Gateway Pagamento',
    timestamp: '15 min fa',
    priority: 'high',
    metadata: {
      amount: '€199.90',
      method: 'Carta di Credito'
    }
  },
  {
    id: '5',
    type: 'contract_expired',
    icon: AlertTriangle,
    title: 'Contratto in scadenza',
    description: 'CTR-003 scade tra 5 giorni',
    user: 'Sistema Monitoraggio',
    timestamp: '20 min fa',
    priority: 'high',
    metadata: {
      contract: 'CTR-003',
      customer: 'Marco Ferrari',
      daysLeft: 5
    }
  },
  {
    id: '6',
    type: 'email_sent',
    icon: Mail,
    title: 'Email di benvenuto inviata',
    description: 'Inviata a nuovo cliente Sofia Russo',
    user: 'Sistema Marketing',
    timestamp: '25 min fa',
    priority: 'normal',
    metadata: {
      template: 'Welcome Email',
      customer: 'Sofia Russo'
    }
  },
  {
    id: '7',
    type: 'task_completed',
    icon: CheckCircle2,
    title: 'Task completato',
    description: 'Configurazione SIM per cliente Premium',
    user: 'Tecnico Mario',
    timestamp: '30 min fa',
    priority: 'normal',
    metadata: {
      task: 'SIM Configuration',
      customer: 'Business Account'
    }
  }
];

export const RecentActivitiesPanel = () => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'customer_added': return 'text-windtre-orange bg-windtre-orange/10';
      case 'call_completed': return 'text-windtre-purple bg-windtre-purple/10';
      case 'invoice_generated': return 'text-info bg-info/10';
      case 'payment_received': return 'text-success bg-success/10';
      case 'contract_expired': return 'text-destructive bg-destructive/10';
      case 'email_sent': return 'text-warning bg-warning/10';
      case 'task_completed': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="h-4 text-xs">Alto</Badge>;
      case 'medium':
        return <Badge variant="outline" className="h-4 text-xs border-warning text-warning">Medio</Badge>;
      case 'normal':
        return <Badge variant="secondary" className="h-4 text-xs">Normale</Badge>;
      default:
        return null;
    }
  };

  const recentActivities = mockActivities.slice(0, 10);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/30 flex-shrink-0 bg-gradient-to-r from-windtre-orange/5 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-windtre-orange/20 backdrop-blur-sm">
              <Activity className="h-4 w-4 text-windtre-orange" />
            </div>
            <h3 className="font-semibold text-sm">Attività Recenti</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-windtre-orange/10 transition-all duration-300 hover:scale-110 hover:rotate-180 group">
            <RefreshCw className="h-3 w-3 transition-all duration-300" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-5 text-xs bg-windtre-orange/10 text-windtre-orange border-windtre-orange/30 animate-pulse">
            Live
          </Badge>
          <span className="text-xs text-muted-foreground">
            {recentActivities.length} eventi recenti
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-windtre-orange/30 scrollbar-track-transparent hover:scrollbar-thumb-windtre-orange/50">
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <Card 
              key={activity.id} 
              className={cn(
                "glass border-border/30 transition-all duration-300 group cursor-pointer",
                "hover:shadow-lg hover:border-windtre-orange/20 hover:-translate-y-0.5",
                "hover:bg-gradient-to-r hover:from-windtre-orange/5 hover:to-transparent"
              )}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: "fade-in 0.3s ease-out forwards"
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-1.5 rounded-full transition-all duration-300 group-hover:scale-110",
                    getActivityColor(activity.type)
                  )}>
                    <activity.icon className="h-3 w-3" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-medium truncate group-hover:text-windtre-orange transition-colors">
                        {activity.title}
                      </h4>
                      {getPriorityBadge(activity.priority)}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4 ring-1 ring-windtre-orange/20">
                          <AvatarFallback className="text-xs bg-gradient-primary text-white">
                            {activity.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground truncate">
                          {activity.user}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                    
                    {/* Metadata con glassmorfismo */}
                    {activity.metadata && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <div key={key} className="truncate">
                              <span className="text-muted-foreground">{key}:</span>
                              <span className="ml-1 font-medium text-windtre-orange/80">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-border/30 flex-shrink-0 bg-gradient-to-r from-transparent to-windtre-orange/5">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm" className="text-xs h-7 hover:bg-windtre-orange/10 transition-all duration-300 hover:scale-105 group">
            <Activity className="h-3 w-3 mr-1 group-hover:rotate-12 transition-transform" />
            Log Completo
          </Button>
          <Button variant="glass-orange" size="sm" className="text-xs h-7 hover:shadow-glow-orange transition-all duration-300 hover:scale-105 group">
            <RefreshCw className="h-3 w-3 mr-1 group-hover:rotate-180 transition-transform duration-500" />
            Aggiorna
          </Button>
        </div>
      </div>
    </div>
  );
};