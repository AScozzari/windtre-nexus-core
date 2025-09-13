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
  BarChart3
} from "lucide-react";
import { useAuth } from '@/core/providers/AuthProvider';
import { useRBAC } from '@/core/providers/RBACProvider';

export const DashboardPage = () => {
  const { user, tenant } = useAuth();
  const { hasRole } = useRBAC();
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Buongiorno' : currentHour < 18 ? 'Buon pomeriggio' : 'Buonasera';
  
  // Mock KPI data
  const kpis = [
    {
      title: "Vendite Oggi",
      value: "€12.450",
      change: "+8.2%",
      trend: "up",
      icon: Euro,
      color: "text-green-500"
    },
    {
      title: "Ordini Attivi", 
      value: "47",
      change: "+12",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500"
    },
    {
      title: "Lead CRM",
      value: "156",
      change: "+24",
      trend: "up", 
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Stock Items",
      value: "1.249",
      change: "-15",
      trend: "down",
      icon: Package,
      color: "text-orange-500"
    }
  ];

  const activities = [
    {
      id: 1,
      type: "order",
      message: "Nuovo ordine #ORD-2024-001 creato",
      time: "2 minuti fa",
      status: "success"
    },
    {
      id: 2,
      type: "stock",
      message: "Giacenza bassa per iPhone 15 Pro",
      time: "15 minuti fa",
      status: "warning"
    },
    {
      id: 3,
      type: "lead",
      message: "Nuovo lead da campagna WindTre",
      time: "32 minuti fa",
      status: "info"
    },
    {
      id: 4,
      type: "payment",
      message: "Pagamento €850 elaborato",
      time: "1 ora fa",
      status: "success"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart;
      case 'stock': return Package;
      case 'lead': return Users;
      case 'payment': return Euro;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass-subtle rounded-lg p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {greeting}, {user?.name}! 👋
            </h1>
            <p className="text-white/70">
              Ecco una panoramica delle tue attività su <span className="font-semibold">{tenant}</span>
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              Tutto OK
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Clock className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="glass-subtle border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">{kpi.title}</p>
                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-white/10`}>
                    <IconComponent className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="glass-subtle border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Attività Recenti</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              Ultimi eventi dal tuo sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`p-2 rounded-full bg-white/10`}>
                    <IconComponent className={`w-4 h-4 ${getStatusColor(activity.status)}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-white/50 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Vedi tutte le attività
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Azioni Rapide</CardTitle>
            <CardDescription className="text-white/70">
              Funzioni più utilizzate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-primary/20 hover:bg-primary/30 text-primary border-primary/30">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nuovo Ordine
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
              <Users className="w-4 h-4 mr-2" />
              Aggiungi Lead
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
              <Package className="w-4 h-4 mr-2" />
              Verifica Stock
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Report Vendite
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
              <Target className="w-4 h-4 mr-2" />
              Nuova Gara
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};