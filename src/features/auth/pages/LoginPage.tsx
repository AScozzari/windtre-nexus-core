import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Building2, Shield, Zap } from "lucide-react";
import { useAuth } from '@/core/providers/AuthProvider';
import { useToast } from "@/hooks/use-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { user, login, isLoading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
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
        const from = location.state?.from?.pathname || '/';
        toast({
          title: "Login effettuato",
          description: "Benvenuto in W3 Suite",
        });
        // Navigate immediately to avoid visual flicker
        navigate(from, { replace: true });
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-windtre-orange/20 via-background to-windtre-purple/20">
      <div className="w-full max-w-md">
        <Card className="glass-strong border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="p-3 rounded-xl bg-gradient-secondary">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              W3 Suite Enterprise
            </CardTitle>
            <CardDescription>
              Piattaforma gestionale WindTre Partner
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Aziendale</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@w3.org"
                  required
                  className="glass border-border/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="glass border-border/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                variant="enterprise"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Accesso in corso...</span>
                  </div>
                ) : (
                  'Accedi alla Piattaforma'
                )}
              </Button>
              
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Credenziali Demo:</p>
                <div className="glass p-3 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">👑 Super Admin:</span>
                    <code className="text-primary">admin@w3.org</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">🏪 Store Manager:</span>
                    <code className="text-primary">manager@store1.w3.org</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">💰 Cassiere:</span>
                    <code className="text-primary">cashier@store1.w3.org</code>
                  </div>
                  <div className="border-t border-border/50 pt-2 mt-2">
                    <p className="text-muted-foreground">Password per tutti: <code className="text-primary">admin123</code> / <code className="text-primary">manager123</code> / <code className="text-primary">cashier123</code></p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};