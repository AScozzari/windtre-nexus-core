import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { Permission } from '@/core/types/auth';

interface RBACContextType {
  hasPermission: (permission: string, scopeType?: 'TENANT' | 'RS' | 'STORE', scopeIds?: string[]) => boolean;
  hasRole: (roleCode: string) => boolean;
  getUserPermissions: () => string[];
  canAccessModule: (module: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

// Permission definitions by module
const MODULE_PERMISSIONS = {
  dashboard: ['dashboard.view'],
  cassa: ['cassa.view', 'cassa.create_order', 'cassa.process_payment', 'cassa.refund', 'cassa.void'],
  magazzino: ['magazzino.view', 'magazzino.manage_stock', 'magazzino.transfer', 'magazzino.adjust'],
  crm: ['crm.view', 'crm.manage_leads', 'crm.manage_customers', 'crm.manage_campaigns'],
  gare: ['gare.view', 'gare.participate', 'gare.manage', 'gare.simulate'],
  report: ['report.view', 'report.export', 'report.advanced'],
  hr: ['hr.view', 'hr.manage_courses', 'hr.assign_training'],
  cms: ['cms.view', 'cms.edit_store_site', 'cms.manage_forms'],
  settings: ['settings.view', 'settings.manage_users', 'settings.manage_roles', 'settings.manage_rs', 'settings.manage_stores', 'settings.billing']
};

// Role permissions mapping
const ROLE_PERMISSIONS = {
  TENANT_OWNER: Object.values(MODULE_PERMISSIONS).flat(),
  TENANT_ADMIN: Object.values(MODULE_PERMISSIONS).flat(),
  RS_MANAGER: [
    ...MODULE_PERMISSIONS.dashboard,
    ...MODULE_PERMISSIONS.cassa,
    ...MODULE_PERMISSIONS.magazzino,
    ...MODULE_PERMISSIONS.crm,
    ...MODULE_PERMISSIONS.gare,
    ...MODULE_PERMISSIONS.report,
    ...MODULE_PERMISSIONS.hr,
    ...MODULE_PERMISSIONS.cms,
    'settings.view', 'settings.manage_users', 'settings.manage_stores'
  ],
  STORE_MANAGER: [
    ...MODULE_PERMISSIONS.dashboard,
    ...MODULE_PERMISSIONS.cassa,
    ...MODULE_PERMISSIONS.magazzino,
    ...MODULE_PERMISSIONS.crm,
    ...MODULE_PERMISSIONS.report,
    ...MODULE_PERMISSIONS.hr,
    ...MODULE_PERMISSIONS.cms,
    'settings.view'
  ],
  CASHIER: [
    'dashboard.view',
    ...MODULE_PERMISSIONS.cassa,
    'magazzino.view',
    'crm.view',
    'crm.manage_leads'
  ],
  WAREHOUSE_OPERATOR: [
    'dashboard.view',
    ...MODULE_PERMISSIONS.magazzino,
    'crm.view'
  ],
  ANALYST: [
    'dashboard.view',
    ...MODULE_PERMISSIONS.report,
    'crm.view',
    'magazzino.view',
    'cassa.view'
  ]
};

export const RBACProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const getUserPermissions = (): string[] => {
    if (!user) return [];
    
    const rolePermissions = user.roles.reduce((acc, role) => {
      const permissions = ROLE_PERMISSIONS[role.role_code as keyof typeof ROLE_PERMISSIONS] || [];
      return [...acc, ...permissions];
    }, [] as string[]);
    
    // Apply extra permissions (grants/revokes)
    const extraPerms = user.extra_permissions.reduce((acc, perm) => {
      if (perm.granted && !perm.expires_at || (perm.expires_at && new Date(perm.expires_at) > new Date())) {
        acc.push(perm.permission);
      }
      return acc;
    }, [] as string[]);
    
    // Remove revoked permissions
    const revokedPerms = user.extra_permissions
      .filter(perm => !perm.granted)
      .map(perm => perm.permission);
    
    const allPermissions = [...new Set([...rolePermissions, ...extraPerms])];
    return allPermissions.filter(perm => !revokedPerms.includes(perm));
  };

  const hasPermission = (
    permission: string, 
    scopeType?: 'TENANT' | 'RS' | 'STORE', 
    scopeIds?: string[]
  ): boolean => {
    if (!user) return false;
    
    const userPermissions = getUserPermissions();
    const hasBasicPermission = userPermissions.includes(permission);
    
    if (!hasBasicPermission) return false;
    
    // If no scope checking required, return true
    if (!scopeType || !scopeIds) return true;
    
    // Check if user has appropriate scope
    return user.roles.some(role => {
      // Tenant scope can access everything
      if (role.scope_type === 'TENANT') return true;
      
      // RS scope can access RS and stores under those RS
      if (role.scope_type === 'RS' && (scopeType === 'RS' || scopeType === 'STORE')) {
        return scopeIds.some(id => role.scope_ids.includes(id));
      }
      
      // Store scope can only access specific stores
      if (role.scope_type === 'STORE' && scopeType === 'STORE') {
        return scopeIds.some(id => role.scope_ids.includes(id));
      }
      
      return false;
    });
  };

  const hasRole = (roleCode: string): boolean => {
    if (!user) return false;
    return user.roles.some(role => role.role_code === roleCode);
  };

  const canAccessModule = (module: string): boolean => {
    if (!user) return false;
    
    const modulePermissions = MODULE_PERMISSIONS[module as keyof typeof MODULE_PERMISSIONS] || [];
    const userPermissions = getUserPermissions();
    
    return modulePermissions.some(perm => userPermissions.includes(perm));
  };

  return (
    <RBACContext.Provider value={{
      hasPermission,
      hasRole,
      getUserPermissions,
      canAccessModule
    }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};