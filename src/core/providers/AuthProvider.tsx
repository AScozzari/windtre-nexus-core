import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginCredentials } from '@/core/types/auth';
import { mockAuthService } from '@/core/services/mockAuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tenant, setTenant] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored session
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('w3_user');
        const storedTenant = localStorage.getItem('w3_tenant');
        
        if (storedUser && storedTenant) {
          setUser(JSON.parse(storedUser));
          setTenant(storedTenant);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const result = await mockAuthService.login(credentials);
      
      if (result.success && result.user && result.tenant) {
        setUser(result.user);
        setTenant(result.tenant);
        localStorage.setItem('w3_user', JSON.stringify(result.user));
        localStorage.setItem('w3_tenant', result.tenant);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    localStorage.removeItem('w3_user');
    localStorage.removeItem('w3_tenant');
  };

  const refreshUser = async (): Promise<boolean> => {
    if (!user || !tenant) return false;
    
    try {
      const updatedUser = await mockAuthService.refreshUser(user.id, tenant);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('w3_user', JSON.stringify(updatedUser));
        return true;
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      tenant,
      login,
      logout,
      refreshUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};