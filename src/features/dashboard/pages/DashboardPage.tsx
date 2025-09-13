import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  Euro,
  Target,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Plus,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  Smartphone,
  Wifi,
  Globe
} from "lucide-react";
import { useAuth } from '@/core/providers/AuthProvider';
import { useRBAC } from '@/core/providers/RBACProvider';
import heroImage from '@/assets/hero-dashboard.jpg';

export const DashboardPage = () => {
  const { user, tenant } = useAuth();
  const { hasRole } = useRBAC();
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Buongiorno' : currentHour < 18 ? 'Buon pomeriggio' : 'Buonasera';
  
  // WindTre Enterprise KPIs
  const kpis = [
    {
      title: "Fatturato Mensile",
      value: "€1.2M",
      change: "+15.3%",
      trend: "up",
      icon: Euro,
      description: "vs mese precedente"
    },
    {
      title: "Nuove Attivazioni", 
      value: "2.847",
      change: "+22%",
      trend: "up",
      icon: Smartphone,
      description: "linee attivate"
    },
    {
      title: "Copertura 5G",
      value: "94.2%",
      change: "+2.1%",
      trend: "up", 
      icon: Wifi,
      description: "territorio coperto"
    },
    {
      title: "Clienti Enterprise",
      value: "156",
      change: "+8",
      trend: "up",
      icon: Globe,
      description: "aziende attive"
    }
  ];

  const quickActions = [
    { 
      title: 'Ricerca Cliente', 
      desc: 'Trova per telefono o codice fiscale', 
      icon: Search, 
      action: 'Cerca',
      variant: 'glass-orange' 
    },
    { 
      title: 'Nuovo Contratto', 
      desc: 'Attiva nuova linea o servizio', 
      icon: Plus, 
      action: 'Attiva',
      variant: 'glass-purple' 
    },
    { 
      title: 'Report Vendite', 
      desc: 'Visualizza performance e analytics', 
      icon: BarChart3, 
      action: 'Apri',
      variant: 'glass' 
    },
    { 
      title: 'Gestione Gare', 
      desc: 'Partecipa a nuove gare pubbliche', 
      icon: Target, 
      action: 'Gestisci',
      variant: 'glass' 
    },
  ];

  const activities = [
    {
      id: 1,
      type: "Attivazione",
      message: "Nuova linea Business attivata",
      client: "Acme Corp S.r.l.",
      time: "5 min fa",
      status: "success",
      value: "€850/mese"
    },
    {
      id: 2,
      type: "Gara",
      message: "Proposta inviata per gara CONSIP",
      client: "Ministero della Salute",
      time: "1 ora fa", 
      status: "info",
      value: "€2.4M"
    },
    {
      id: 3,
      type: "Contratto",
      message: "Rinnovo contratto fibra aziendale",
      client: "TechStart S.p.A.",
      time: "2 ore fa",
      status: "success",
      value: "€1.200/mese"
    },
    {
      id: 4,
      type: "Alert",
      message: "Scadenza contratto in 30 giorni",
      client: "Global Solutions Ltd",
      time: "4 ore fa",
      status: "warning",
      value: "€3.500/mese"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section with WindTre Branding */}
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-windtre-orange/90 to-windtre-purple/90" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-8 h-full">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                {greeting}, {user?.name}! 
              </h1>
              <p className="text-white/90 text-lg mb-3">
                Dashboard Executive - {tenant}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Sistema Operativo
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Aggiornato ora
                </Badge>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto md:justify-end">
              <Button variant="glass" className="bg-white/20 text-white border-white/30 hover:bg-white/30 w-full md:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Dati
              </Button>
              <Button variant="enterprise" className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Cliente
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="glass-strong border-border/50 hover:glass transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          {kpi.change}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {kpi.description}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-primary group-hover:shadow-glow-orange transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Azioni Rapide</h2>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtri
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="glass-strong border-border/50 hover:glass transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="enterprise" size="sm" className="w-full">
                    {item.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <Card className="glass-strong border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Attività Recenti</span>
              </CardTitle>
              <CardDescription>
                Operazioni e transazioni più recenti
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Vedi tutte
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg glass hover:glass-strong transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success/20' :
                    activity.status === 'warning' ? 'bg-warning/20' :
                    activity.status === 'info' ? 'bg-info/20' : 'bg-muted/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' :
                      activity.status === 'info' ? 'bg-info' : 'bg-muted'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{activity.value}</p>
                  <Button variant="ghost" size="sm" className="mt-1">
                    Dettagli
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};