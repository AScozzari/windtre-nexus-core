import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Plus, Filter, Calendar, Clock, AlertCircle, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const WorkspaceTasks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openSections, setOpenSections] = useState({
    pending: true,
    inProgress: true,
    completed: false,
    urgent: true
  });

  const tasks = [
    { 
      id: 1, 
      titolo: 'Follow-up cliente Premium', 
      descrizione: 'Chiamare Mario Rossi per rinnovo contratto fibra casa',
      priorita: 'Alta', 
      scadenza: 'Oggi 15:00',
      categoria: 'Vendite',
      completato: false,
      urgente: true,
      assegnatoa: 'Marco Bianchi'
    },
    { 
      id: 2, 
      titolo: 'Preparare documentazione', 
      descrizione: 'Contratto fibra per Laura Bianchi - documenti KYC',
      priorita: 'Media', 
      scadenza: 'Domani 10:00',
      categoria: 'Amministrazione',
      completato: false,
      urgente: false,
      assegnatoa: 'Anna Verde'
    },
    { 
      id: 3, 
      titolo: 'Verifica pagamento', 
      descrizione: 'Controllo fattura cliente Giuseppe Verde - Piano Business',
      priorita: 'Bassa', 
      scadenza: 'Venerdì 16:00',
      categoria: 'Finanza',
      completato: true,
      urgente: false,
      assegnatoa: 'Luigi Rossi'
    },
    { 
      id: 4, 
      titolo: 'Attivazione servizi', 
      descrizione: 'Nuovo contratto mobile + fibra cliente Enterprise',
      priorita: 'Alta', 
      scadenza: 'Oggi 17:30',
      categoria: 'Tecnico',
      completato: false,
      urgente: true,
      assegnatoa: 'Giuseppe Neri'
    },
    { 
      id: 5, 
      titolo: 'Training nuovo personale', 
      descrizione: 'Formazione sistema CRM per nuovo consulente',
      priorita: 'Media', 
      scadenza: 'Lunedì 9:00',
      categoria: 'HR',
      completato: false,
      urgente: false,
      assegnatoa: 'Maria Ferretti'
    }
  ];

  const categories = ['all', 'Vendite', 'Amministrazione', 'Finanza', 'Tecnico', 'HR'];
  
  const filteredTasks = activeCategory === 'all' ? tasks : tasks.filter(task => task.categoria === activeCategory);
  
  const pendingTasks = filteredTasks.filter(task => !task.completato && !task.urgente);
  const urgentTasks = filteredTasks.filter(task => !task.completato && task.urgente);
  const completedTasks = filteredTasks.filter(task => task.completato);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className={cn(
      "border-border/30 transition-all duration-200 hover:shadow-sm cursor-pointer",
      task.completato ? "bg-muted/30" : "bg-background/50",
      task.urgente && !task.completato && "border-orange-200"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 cursor-pointer flex items-center justify-center",
            task.completato 
              ? "bg-success border-success" 
              : "border-muted-foreground hover:border-primary"
          )}>
            {task.completato && (
              <CheckSquare className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className={cn(
                "text-sm font-medium leading-tight",
                task.completato && "line-through text-muted-foreground"
              )}>
                {task.titolo}
              </h4>
              <div className="flex items-center gap-2">
                {task.urgente && !task.completato && (
                  <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                )}
                <Badge variant={
                  task.priorita === 'Alta' ? 'destructive' : 
                  task.priorita === 'Media' ? 'secondary' : 'outline'
                } className="text-xs">
                  {task.priorita}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{task.descrizione}</p>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{task.scadenza}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{task.assegnatoa}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">
                  {task.categoria}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <EnterpriseLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestione Tasks</h1>
            <p className="text-muted-foreground">Organizza e monitora tutte le attività del team</p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtri avanzati
            </Button>
            <Button variant="enterprise">
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Task Totali</CardDescription>
              <CardTitle className="text-2xl">{tasks.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Urgenti</CardDescription>
              <CardTitle className="text-2xl text-destructive">{urgentTasks.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>In Corso</CardDescription>
              <CardTitle className="text-2xl text-warning">{pendingTasks.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Completati</CardDescription>
              <CardTitle className="text-2xl text-success">{completedTasks.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Filtra per Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "glass"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'Tutte' : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Sections with Cascading Menu */}
        <div className="space-y-4">
          {/* Urgent Tasks */}
          <Card className="glass-strong border-border/50">
            <Collapsible 
              open={openSections.urgent} 
              onOpenChange={() => toggleSection('urgent')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-lg text-destructive">Task Urgenti</CardTitle>
                      <Badge variant="destructive">{urgentTasks.length}</Badge>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections.urgent && "rotate-180"
                    )} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3">
                  {urgentTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Pending Tasks */}
          <Card className="glass-strong border-border/50">
            <Collapsible 
              open={openSections.pending} 
              onOpenChange={() => toggleSection('pending')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-warning" />
                      <CardTitle className="text-lg">Task in Corso</CardTitle>
                      <Badge variant="secondary">{pendingTasks.length}</Badge>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections.pending && "rotate-180"
                    )} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3">
                  {pendingTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Completed Tasks */}
          <Card className="glass-strong border-border/50">
            <Collapsible 
              open={openSections.completed} 
              onOpenChange={() => toggleSection('completed')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="h-5 w-5 text-success" />
                      <CardTitle className="text-lg text-success">Task Completati</CardTitle>
                      <Badge variant="outline">{completedTasks.length}</Badge>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections.completed && "rotate-180"
                    )} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default WorkspaceTasks;