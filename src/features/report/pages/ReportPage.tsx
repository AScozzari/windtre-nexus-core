import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileSpreadsheet, TrendingUp, PieChart } from "lucide-react";

export const ReportPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <BarChart3 className="w-8 h-8" />
          <span>Report & Analytics</span>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Business Intelligence</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>KPI Operativi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Dashboard metriche chiave</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Vendite</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Analisi performance vendite</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Conversioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Funnel e conversion rate</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5" />
              <span>Esportazioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Export CSV/PDF</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};