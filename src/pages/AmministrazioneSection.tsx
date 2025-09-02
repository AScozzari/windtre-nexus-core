import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Database, 
  Users,
  Server,
  Lock,
  Key,
  Monitor,
  HardDrive,
  UserCog,
  Activity,
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

export default function AmministrazioneSection() {
  const [configOpen, setConfigOpen] = useState(true);
  const [sicurezzaOpen, setSicurezzaOpen] = useState(false);
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const [utentiOpen, setUtentiOpen] = useState(false);

  const configItems = [
    { title: "Impostazioni Generali", description: "Configurazioni base del sistema", count: null, status: "active", severity: "low" },
    { title: "Parametri Azienda", description: "Dati e configurazioni aziendali", count: 15, status: "active", severity: "low" },
    { title: "Integr. Esterne", description: "API e servizi di terze parti", count: 8, status: "warning", severity: "medium" },
    { title: "Notifiche Sistema", description: "Gestione alerting e messaggistica", count: 23, status: "active", severity: "low" }
  ];

  const sicurezzaItems = [
    { title: "Audit Logs", description: "Registrazione attività utenti", count: 1247, status: "active", severity: "high" },
    { title: "Controllo Accessi", description: "Gestione permessi e autorizzazioni", count: 5, status: "critical", severity: "high" },
    { title: "Certificati SSL", description: "Gestione certificati sicurezza", count: 3, status: "warning", severity: "medium" },
    { title: "Backup Sicurezza", description: "Copie di backup crittografate", count: null, status: "active", severity: "high" }
  ];

  const databaseItems = [
    { title: "Performance DB", description: "Monitoraggio prestazioni database", count: null, status: "active", severity: "medium" },
    { title: "Backup & Restore", description: "Gestione backup automatici", count: 7, status: "active", severity: "high" },
    { title: "Ottimizzazione", description: "Tuning query e indici", count: 12, status: "warning", severity: "medium" },
    { title: "Manutenzione", description: "Pulizia e compattazione dati", count: null, status: "active", severity: "low" }
  ];

  const utentiItems = [
    { title: "Gestione Utenti", description: "Creazione e modifica account", count: 47, status: "active", severity: "low" },
    { title: "Ruoli & Permessi", description: "Definizione autorizzazioni", count: 8, status: "active", severity: "medium" },
    { title: "Sessioni Attive", description: "Monitoring sessioni correnti", count: 23, status: "active", severity: "low" },
    { title: "Politiche Password", description: "Regole sicurezza password", count: null, status: "warning", severity: "medium" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Activity className="h-4 w-4" />;
      case "warning": return <Monitor className="h-4 w-4" />;
      case "critical": return <Lock className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
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
                      {items.length} componenti di sistema
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
                      <Badge variant="outline" className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
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
          <h1 className="text-3xl font-bold gradient-text">Amministrazione Sistema</h1>
          <p className="text-muted-foreground mt-2">
            Configurazione, sicurezza e gestione del sistema aziendale
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Settings className="h-4 w-4 mr-2" />
          Configurazioni
        </Button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistema</CardTitle>
            <Server className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Online</div>
            <p className="text-xs text-muted-foreground">
              Uptime: 99.9%
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sicurezza</CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Avvisi</div>
            <p className="text-xs text-muted-foreground">
              5 richieste attenzione
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <HardDrive className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Stabile</div>
            <p className="text-xs text-muted-foreground">
              Utilizzo: 67%
            </p>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utenti Attivi</CardTitle>
            <UserCog className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">23</div>
            <p className="text-xs text-muted-foreground">
              Sessioni correnti
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cascading Sections */}
      <div className="grid gap-4">
        {renderSection("Configurazione Sistema", Settings, configItems, configOpen, setConfigOpen)}
        {renderSection("Sicurezza & Audit", Shield, sicurezzaItems, sicurezzaOpen, setSicurezzaOpen)}
        {renderSection("Database Management", Database, databaseItems, databaseOpen, setDatabaseOpen)}
        {renderSection("Utenti & Ruoli", Users, utentiItems, utentiOpen, setUtentiOpen)}
      </div>
    </div>
  );
}