import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Building2, Shield } from "lucide-react";
import { useAuth } from '@/core/providers/AuthProvider';
import { useToast } from "@/hooks/use-toast";
import w3Logo from "@/assets/w3c-logo.png";
import windtreLogo from "@/assets/windtre-logo.png";

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { user, login, isLoading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  // Redirect if already logged in
  if (user && !isLoading) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Inserisci email e password');
      return;
    }
    
    try {
      const success = await login({ email, password });
      
      if (success) {
        toast({
          title: "Login effettuato",
          description: "Benvenuto in W3 Suite",
        });
      } else {
        setError('Credenziali non valide');
      }
    } catch (err) {
      setError('Errore durante il login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center glass">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="w-full max-w-md">
        <Card className="glass-subtle border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <img src={w3Logo} alt="W3" className="h-12 w-12" />
              <img src={windtreLogo} alt="WindTre" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl text-white">W3 Suite</CardTitle>
            <CardDescription className="text-white/70">
              Accedi alla piattaforma gestionale enterprise
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <Shield className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@w3.org"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-white/70" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/70" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Accesso...</span>
                  </div>
                ) : (
                  'Accedi'
                )}
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-white/70">Credenziali di test:</p>
                <div className="text-xs text-white/60 space-y-1">
                  <div>👑 Admin: admin@w3.org / admin123</div>
                  <div>🏪 Manager: manager@store1.w3.org / manager123</div>
                  <div>💰 Cassiere: cashier@store1.w3.org / cashier123</div>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};