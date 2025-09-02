import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Sparkles, Zap, Brain, TrendingUp } from "lucide-react";
import { useState } from "react";

const AIAssistant = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);

  const assistants = [
    {
      id: "customer-service",
      nome: "Customer Service AI",
      descrizione: "Assistente per gestione clienti e supporto",
      icona: MessageSquare,
      attivo: true,
      utilizzi: 234
    },
    {
      id: "sales-optimizer",
      nome: "Sales Optimizer",
      descrizione: "Ottimizzazione vendite e cross-selling",
      icona: TrendingUp,
      attivo: true,
      utilizzi: 156
    },
    {
      id: "analytics-ai",
      nome: "Analytics Intelligence",
      descrizione: "Analisi predittive e insights",
      icona: Brain,
      attivo: false,
      utilizzi: 89
    },
    {
      id: "workflow-automation",
      nome: "Workflow Automation",
      descrizione: "Automazione processi aziendali",
      icona: Zap,
      attivo: true,
      utilizzi: 312
    }
  ];

  const suggerimenti = [
    "Analizza le vendite dell'ultimo mese per identificare trend",
    "Crea un piano di follow-up per clienti inattivi",
    "Suggerisci offerte personalizzate per il cliente Mario Rossi",
    "Genera report sulle performance del negozio Milano Centro",
    "Automatizza l'invio di promemoria per scadenze contratti"
  ];

  return (
    <EnterpriseLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Intelligenza artificiale per il business WindTre</p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Nuova Automazione
            </Button>
            <Button variant="enterprise">
              <Bot className="h-4 w-4 mr-2" />
              Configura AI
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Assistenti Attivi</CardDescription>
              <CardTitle className="text-2xl">3</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Query Oggi</CardDescription>
              <CardTitle className="text-2xl text-info">127</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Automazioni</CardDescription>
              <CardTitle className="text-2xl text-success">8</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Risparmio Tempo</CardDescription>
              <CardTitle className="text-2xl text-accent">4.2h</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lista Assistenti */}
          <div className="lg:col-span-2">
            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Assistenti AI Disponibili</CardTitle>
                <CardDescription>Seleziona un assistente per interagire</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assistants.map((assistant) => {
                  const IconComponent = assistant.icona;
                  return (
                    <div 
                      key={assistant.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAssistant === assistant.id 
                          ? 'glass-strong border border-primary/50' 
                          : 'glass hover:glass-strong'
                      }`}
                      onClick={() => setSelectedAssistant(assistant.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{assistant.nome}</h4>
                            <p className="text-sm text-muted-foreground">{assistant.descrizione}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={assistant.attivo ? "default" : "secondary"}>
                            {assistant.attivo ? "Attivo" : "Disattivo"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{assistant.utilizzi} usi</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Pannello Interazione */}
          <div className="space-y-4">
            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Chat AI</CardTitle>
                <CardDescription>
                  {selectedAssistant ? "Assistente selezionato" : "Seleziona un assistente"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAssistant ? (
                  <div className="space-y-3">
                    <div className="h-32 bg-muted/20 rounded-lg p-3 text-sm">
                      Ciao! Sono il tuo assistente AI. Come posso aiutarti oggi?
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Scrivi qui la tua richiesta..."
                        className="flex-1 px-3 py-2 bg-background/50 border border-border rounded-lg text-sm"
                      />
                      <Button size="sm">Invia</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-sm">
                    Seleziona un assistente dalla lista per iniziare
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Suggerimenti Rapidi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggerimenti.slice(0, 3).map((suggerimento, index) => (
                  <Button
                    key={index}
                    variant="glass"
                    size="sm"
                    className="w-full text-left text-xs h-auto py-2 px-3"
                    onClick={() => setSelectedAssistant(assistants[0].id)}
                  >
                    {suggerimento}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default AIAssistant;