export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'inactive';
  mfa_enabled: boolean;
  last_login_at?: string;
  roles: UserRole[];
  extra_permissions: UserExtraPermission[];
}

export interface UserRole {
  role_id: string;
  role_name: string;
  role_code: string;
  scope_type: 'TENANT' | 'RS' | 'STORE';
  scope_ids: string[]; // array of RS or Store IDs based on scope_type
  assigned_at: string;
  assigned_by: string;
}

export interface UserExtraPermission {
  permission: string;
  granted: boolean; // true for grant, false for revoke
  scope_type: 'TENANT' | 'RS' | 'STORE';
  scope_ids: string[];
  expires_at?: string;
  granted_at: string;
  granted_by: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenant_slug?: string;
}

export interface AuthContextType {
  user: User | null;
  tenant: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<boolean>;
  isLoading: boolean;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  module: string;
  description?: string;
}

export interface Role {
  id: string;
  tenant_id: string;
  code: string;
  name: string;
  description?: string;
  permissions: string[];
  is_system: boolean;
  created_at: string;
}