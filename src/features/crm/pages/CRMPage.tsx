import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Target, Inbox } from "lucide-react";

export const CRMPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <Users className="w-8 h-8" />
          <span>CRM</span>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">AI Powered</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Leads</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione potenziali clienti</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Clienti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Database clienti esistenti</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Campagne</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Marketing automation</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Inbox className="w-5 h-5" />
              <span>Inbox</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Comunicazioni omnicanale</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};