import { useState } from "react";
import { 
  UserCheck, 
  Calendar, 
  UserPlus, 
  FileText, 
  Clock, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  PlusCircle,
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

export default function HRSection() {
  const [dipendentiOpen, setDipendentiOpen] = useState(true);
  const [presenzeOpen, setPresenzeOpen] = useState(false);
  const [reclutamentoOpen, setReclutamentoOpen] = useState(false);
  const [formazioneOpen, setFormazioneOpen] = useState(false);

  const dipendentiItems = [
    { title: "Gestione Dipendenti", description: "Visualizza e modifica i profili dipendenti", count: 47, status: "active" },
    { title: "Organigramma", description: "Struttura organizzativa aziendale", count: null, status: "active" },
    { title: "Contratti", description: "Gestione contratti di lavoro", count: 12, status: "pending" },
    { title: "Performance", description: "Valutazioni e obiettivi", count: 8, status: "review" }
  ];

  const presenzeItems = [
    { title: "Timbrature", description: "Registrazione entrate/uscite", count: 156, status: "active" },
    { title: "Ferie & Permessi", description: "Gestione assenze", count: 23, status: "pending" },
    { title: "Straordinari", description: "Ore extra e compensi", count: 7, status: "review" },
    { title: "Report Presenze", description: "Analisi e statistiche", count: null, status: "active" }
  ];

  const reclutamentoItems = [
    { title: "Posizioni Aperte", description: "Annunci di lavoro attivi", count: 5, status: "active" },
    { title: "Candidature", description: "CV e applicazioni ricevute", count: 34, status: "pending" },
    { title: "Colloqui", description: "Programmazione interviste", count: 12, status: "review" },
    { title: "Processo Selezione", description: "Workflow di assunzione", count: null, status: "active" }
  ];

  const formazioneItems = [
    { title: "Corsi Attivi", description: "Programmi formativi in corso", count: 8, status: "active" },
    { title: "Certificazioni", description: "Qualifiche e attestati", count: 15, status: "review" },
    { title: "Budget Formazione", description: "Gestione costi e budget", count: null, status: "active" },
    { title: "Piani Sviluppo", description: "Percorsi di crescita personale", count: 23, status: "pending" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "review": return "bg-info/10 text-info border-info/20";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "review": return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const renderSection = (title: string, icon: any, items: any[], isOpen: boolean, setOpen: (open: boolean) => void) => {
    const Icon = icon;
    return (
      <Card className="glass-strong">
        <Collapsible open={isOpen} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>
                      {items.length} funzionalità disponibili
                    </CardDescription>
                  </div>
                </div>
                {isOpen ? 
                  <ChevronDown className="h-5 w-5 transition-transform" /> : 
                  <ChevronRight className="h-5 w-5 transition-transform" />
                }
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid gap-3">
                {items.map((item, index) => (
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
                      {item.count !== null && (
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.count}
                        </Badge>
                      )}
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Human Resources</h1>
          <p className="text-muted-foreground mt-2">
            Gestione completa delle risorse umane e processi aziendali
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuovo Dipendente
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dipendenti Attivi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2</span> dall'ultimo mese
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presenti Oggi</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              89% presenza
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posizioni Aperte</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              34 candidature ricevute
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corsi Attivi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              23 partecipanti totali
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cascading Sections */}
      <div className="grid gap-4">
        {renderSection("Gestione Dipendenti", UserCheck, dipendentiItems, dipendentiOpen, setDipendentiOpen)}
        {renderSection("Presenze & Orari", Calendar, presenzeItems, presenzeOpen, setPresenzeOpen)}
        {renderSection("Reclutamento", UserPlus, reclutamentoItems, reclutamentoOpen, setReclutamentoOpen)}
        {renderSection("Formazione", FileText, formazioneItems, formazioneOpen, setFormazioneOpen)}
      </div>
    </div>
  );
}