import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, FileText, Calculator, Award } from "lucide-react";

export const GarePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <Trophy className="w-8 h-8" />
          <span>Gare</span>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">SIM Contest</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Gare Attive</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Contest e competizioni</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Lotti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Suddivisione gare</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Simulatore</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">AI commissioni e incentivi</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Partecipazioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Registrazione risultati</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};