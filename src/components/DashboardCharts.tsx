import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Download, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartPlaceholderProps {
  title: string;
  description: string;
  value: string;
  trend: string;
  height?: string;
  variant?: 'default' | 'orange' | 'purple';
}

const ChartPlaceholder = ({ 
  title, 
  description, 
  value, 
  trend, 
  height = 'h-64',
  variant = 'default' 
}: ChartPlaceholderProps) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'orange':
        return 'bg-gradient-to-br from-windtre-orange/20 to-windtre-orange/5';
      case 'purple':
        return 'bg-gradient-to-br from-windtre-purple/20 to-windtre-purple/5';
      default:
        return 'bg-gradient-to-br from-muted/50 to-muted/10';
    }
  };

  return (
    <Card className="glass-strong border-border/50 hover:glass transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border-border/50">
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Esporta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="h-4 w-4 mr-2" />
              Aggiorna
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">{value}</div>
          <Badge variant="secondary" className="text-xs">
            {trend}
          </Badge>
        </div>
        <div className={`${height} rounded-lg flex items-center justify-center ${getGradientClasses()}`}>
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">Grafico in sviluppo</p>
            <p className="text-xs">I dati verranno visualizzati qui</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardCharts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ChartPlaceholder
          title="Andamento Ricavi"
          description="Fatturato mensile per servizio"
          value="€2.4M"
          trend="+15.2% vs mese scorso"
          height="h-80"
          variant="orange"
        />
      </div>
      
      <ChartPlaceholder
        title="Distribuzione Clienti"
        description="Per tipologia di servizio"
        value="12,483"
        trend="Clienti totali"
        variant="purple"
      />
      
      <ChartPlaceholder
        title="Performance Rete"
        description="Uptime e velocità media"
        value="99.9%"
        trend="Uptime medio"
        variant="default"
      />
      
      <ChartPlaceholder
        title="Nuove Attivazioni"
        description="Trend settimanale"
        value="284"
        trend="+12% questa settimana"
        variant="orange"
      />
      
      <ChartPlaceholder
        title="Ticket Support"
        description="Stato delle richieste"
        value="42"
        trend="Aperti: 12, Risolti: 30"
        variant="purple"
      />
    </div>
  );
};