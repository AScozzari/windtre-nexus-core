import { useState } from "react";
import { 
  Bot, 
  Brain, 
  Sparkles,
  Zap,
  MessageSquare,
  BarChart3,
  Workflow,
  Target,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
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

export default function AISection() {
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [automazioniOpen, setAutomazioniOpen] = useState(false);

  const assistantItems = [
    { title: "Chat Assistant", description: "Assistente virtuale per clienti", sessions: 156, status: "active", satisfaction: "94%" },
    { title: "Knowledge Base", description: "Database FAQ e risposte", articles: 234, status: "active", satisfaction: "89%" },
    { title: "Voice Assistant", description: "Assistente vocale telefonia", calls: 87, status: "beta", satisfaction: "76%" },
    { title: "Support Tickets", description: "Gestione automatica ticket", tickets: 23, status: "active", satisfaction: "92%" }
  ];

  const analyticsItems = [
    { title: "Vendite Predittive", description: "Previsioni basate su AI", accuracy: "87%", trend: "+5%", status: "active" },
    { title: "Customer Insights", description: "Analisi comportamento clienti", segments: 12, trend: "+8%", status: "active" },
    { title: "Inventory AI", description: "Ottimizzazione stock intelligente", savings: "€ 12.4k", trend: "+15%", status: "active" },
    { title: "Fraud Detection", description: "Rilevamento anomalie pagamenti", alerts: 3, trend: "-23%", status: "monitoring" }
  ];

  const automazioniItems = [
    { title: "Email Marketing", description: "Campagne automatizzate personalizzate", campaigns: 8, open_rate: "34%", status: "active" },
    { title: "Lead Scoring", description: "Punteggio automatico opportunità", leads: 145, conversion: "23%", status: "active" },
    { title: "Inventory Reorder", description: "Riordino automatico prodotti", rules: 15, savings: "€ 8.2k", status: "active" },
    { title: "Price Optimization", description: "Ottimizzazione prezzi dinamica", products: 89, margin: "+7%", status: "beta" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "beta": return "bg-warning/10 text-warning border-warning/20";
      case "monitoring": return "bg-info/10 text-info border-info/20";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "beta": return <Clock className="h-4 w-4" />;
      case "monitoring": return <AlertCircle className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const renderAssistantSection = () => (
    <Card className="glass-strong">
      <Collapsible open={assistantOpen} onOpenChange={setAssistantOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <CardDescription>
                    Assistenza clienti automatizzata - 156 sessioni attive
                  </CardDescription>
                </div>
              </div>
              {assistantOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {assistantItems.map((item, index) => (
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
                      {item.sessions || item.articles || item.calls || item.tickets}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.satisfaction}
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

  const renderAnalyticsSection = () => (
    <Card className="glass-strong">
      <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Analytics AI</CardTitle>
                  <CardDescription>
                    Analisi predittive e insights intelligenti
                  </CardDescription>
                </div>
              </div>
              {analyticsOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {analyticsItems.map((item, index) => (
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
                      {item.accuracy || item.segments || item.savings || item.alerts}
                    </Badge>
                    <Badge variant="outline" className={
                      item.trend.startsWith('+') ? 'bg-success/10 text-success border-success/20' : 
                      item.trend.startsWith('-') ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      'bg-muted/10 text-muted-foreground'
                    }>
                      {item.trend}
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

  const renderAutomazioniSection = () => (
    <Card className="glass-strong">
      <Collapsible open={automazioniOpen} onOpenChange={setAutomazioniOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Automazioni</CardTitle>
                  <CardDescription>
                    Workflow automatizzati e ottimizzazioni AI
                  </CardDescription>
                </div>
              </div>
              {automazioniOpen ? 
                <ChevronDown className="h-5 w-5 transition-transform" /> : 
                <ChevronRight className="h-5 w-5 transition-transform" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3">
              {automazioniItems.map((item, index) => (
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
                      {item.campaigns || item.leads || item.rules || item.products}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.open_rate || item.conversion || item.savings || item.margin}
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
          <h1 className="text-3xl font-bold gradient-text">AI Tools</h1>
          <p className="text-muted-foreground mt-2">
            Intelligenza artificiale per automazione e insights avanzati
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Sparkles className="h-4 w-4 mr-2" />
          Nuova Automazione
        </Button>
      </div>

      {/* AI Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessioni AI</CardTitle>
            <MessageSquare className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">156</div>
            <p className="text-xs text-muted-foreground">
              94% soddisfazione
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automazioni</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">23</div>
            <p className="text-xs text-muted-foreground">
              Attive e funzionanti
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risparmi AI</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">€ 20.6k</div>
            <p className="text-xs text-muted-foreground">
              Questo mese
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisione</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">87%</div>
            <p className="text-xs text-muted-foreground">
              Predizioni accurate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cascading Sections */}
      <div className="grid gap-4">
        {renderAssistantSection()}
        {renderAnalyticsSection()}
        {renderAutomazioniSection()}
      </div>
    </div>
  );
}