import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

export const HRPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <GraduationCap className="w-8 h-8" />
          <span>HR & Formazione</span>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">Learning</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Corsi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Catalogo formazione</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Moduli</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Unità didattiche</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Iscrizioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione partecipanti</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Certificazioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Esiti e attestati</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};