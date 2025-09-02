import { useState } from "react";
import { 
  Calculator, 
  DollarSign, 
  Receipt,
  CreditCard,
  Coins,
  TrendingUp,
  BarChart3,
  PieChart,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

export default function CassaSection() {
  const [posOpen, setPosOpen] = useState(true);
  const [transazioniOpen, setTransazioniOpen] = useState(false);
  const [riconciliazioniOpen, setRiconciliazioniOpen] = useState(false);

  const posItems = [
    { title: "Cassa Principale", description: "Terminale POS principale negozio", amount: "€ 2,450.80", status: "active", location: "Cassa 1" },
    { title: "Cassa Mobile", description: "POS mobile per assistenza clienti", amount: "€ 780.30", status: "active", location: "Mobile" },
    { title: "Self Service", description: "Terminale automatico self-service", amount: "€ 1,235.60", status: "warning", location: "Area Self" },
    { title: "E-Commerce", description: "Vendite online integrate", amount: "€ 3,890.45", status: "active", location: "Online" }
  ];

  const transazioniItems = [
    { title: "Vendite Oggi", description: "Transazioni completate oggi", count: 147, amount: "€ 8,356.15", status: "completed" },
    { title: "Resi & Rimborsi", description: "Transazioni di rimborso", count: 8, amount: "€ 234.70", status: "refund" },
    { title: "Transazioni Pending", description: "Pagamenti in elaborazione", count: 3, amount: "€ 156.30", status: "pending" },
    { title: "Carte Fedeltà", description: "Punti e sconti applicati", count: 45, amount: "€ 445.20", status: "loyalty" }
  ];

  const riconciliazioniItems = [
    { title: "Banca UniCredit", description: "Riconciliazione conto principale", date: "Oggi", status: "completed", variance: "€ 0.00" },
    { title: "PayPal", description: "Pagamenti digitali PayPal", date: "Oggi", status: "pending", variance: "€ 12.45" },
    { title: "Carte di Credito", description: "Circuiti Visa/Mastercard", date: "Ieri", status: "completed", variance: "€ 0.00" },
    { title: "Contanti", description: "Riconciliazione cassa contanti", date: "Oggi", status: "review", variance: "€ -5.20" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": 
      case "completed": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "warning":
      case "review": return "bg-warning/10 text-warning border-warning/20";
      case "refund": return "bg-info/10 text-info border-info/20";
      case "loyalty": return "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": 
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "warning":
      case "review": return <AlertTriangle className="h-4 w-4" />;
      case "refund": return <Receipt className="h-4 w-4" />;
      case "loyalty": return <Coins className="h-4 w-4" />;
      default: return <Calculator className="h-4 w-4" />;
    }
  };

  const renderPosSection = () => (
    <Card className="glass-strong">
      <Collapsible open={posOpen} onOpenChange={setPosOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Terminali POS</CardTitle>
                  <CardDescription>
                    4 terminali attivi - Totale: € 8,356.15
                  </CardDescription>
                </div>
              </div>
              {posOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {posItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {item.location}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.amount}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  const renderTransazioniSection = () => (
    <Card className="glass-strong">
      <Collapsible open={transazioniOpen} onOpenChange={setTransazioniOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Transazioni</CardTitle>
                  <CardDescription>
                    203 transazioni oggi - Volume: € 8,792.35
                  </CardDescription>
                </div>
              </div>
              {transazioniOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {transazioniItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {item.count}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.amount}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  const renderRiconciliazioniSection = () => (
    <Card className="glass-strong">
      <Collapsible open={riconciliazioniOpen} onOpenChange={setRiconciliazioniOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Riconciliazioni</CardTitle>
                  <CardDescription>
                    Allineamento conti bancari e metodi pagamento
                  </CardDescription>
                </div>
              </div>
              {riconciliazioniOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {riconciliazioniItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {item.date}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.variance}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Sistema Cassa</h1>
          <p className="text-muted-foreground mt-2">
            Gestione POS, transazioni e riconciliazioni bancarie
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Calculator className="h-4 w-4 mr-2" />
          Nuovo POS
        </Button>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendite Oggi</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">€ 8,356</div>
            <p className="text-xs text-muted-foreground">
              +12% rispetto a ieri
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transazioni</CardTitle>
            <BarChart3 className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">203</div>
            <p className="text-xs text-muted-foreground">
              Media: € 41.17
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carte/Contanti</CardTitle>
            <PieChart className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">78/22%</div>
            <p className="text-xs text-muted-foreground">
              Split pagamenti
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riconciliazioni</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">3/4</div>
            <p className="text-xs text-muted-foreground">
              1 in attesa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cascading Sections */}
      <div className="grid gap-4">
        {renderPosSection()}
        {renderTransazioniSection()}
        {renderRiconciliazioniSection()}
      </div>
    </div>
  );
}