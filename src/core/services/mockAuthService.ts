import { User, LoginCredentials, UserRole } from '@/core/types/auth';

// Mock tenant and user data
const MOCK_TENANT = 'windtre-partner-001';

const MOCK_USERS: Record<string, User> = {
  'admin@w3.org': {
    id: '1',
    email: 'admin@w3.org',
    name: 'Super Admin W3',
    status: 'active',
    mfa_enabled: true,
    last_login_at: new Date().toISOString(),
    roles: [
      {
        role_id: 'role_tenant_owner',
        role_name: 'Tenant Owner',
        role_code: 'TENANT_OWNER',
        scope_type: 'TENANT',
        scope_ids: [],
        assigned_at: '2024-01-01T00:00:00Z',
        assigned_by: 'system'
      }
    ],
    extra_permissions: []
  },
  'manager@store1.w3.org': {
    id: '2',
    email: 'manager@store1.w3.org',
    name: 'Store Manager Milano Centro',
    status: 'active',
    mfa_enabled: true,
    roles: [
      {
        role_id: 'role_store_manager',
        role_name: 'Store Manager',
        role_code: 'STORE_MANAGER',
        scope_type: 'STORE',
        scope_ids: ['store_milano_centro'],
        assigned_at: '2024-01-01T00:00:00Z',
        assigned_by: 'admin@w3.org'
      }
    ],
    extra_permissions: []
  },
  'cashier@store1.w3.org': {
    id: '3',
    email: 'cashier@store1.w3.org',
    name: 'Cassiere Milano Centro',
    status: 'active',
    mfa_enabled: false,
    roles: [
      {
        role_id: 'role_cashier',
        role_name: 'Cashier',
        role_code: 'CASHIER',
        scope_type: 'STORE',
        scope_ids: ['store_milano_centro'],
        assigned_at: '2024-01-01T00:00:00Z',
        assigned_by: 'manager@store1.w3.org'
      }
    ],
    extra_permissions: []
  }
};

// Mock credentials
const MOCK_CREDENTIALS = {
  'admin@w3.org': 'admin123',
  'manager@store1.w3.org': 'manager123',
  'cashier@store1.w3.org': 'cashier123'
};

export const mockAuthService = {
  async login(credentials: LoginCredentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { email, password } = credentials;
    
    // Check credentials
    if (MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS] === password) {
      const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      return {
        success: true,
        user,
        tenant: MOCK_TENANT,
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token'
      };
    }
    
    return {
      success: false,
      error: 'Credenziali non valide'
    };
  },

  async refreshUser(userId: string, tenant: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by ID
    const user = Object.values(MOCK_USERS).find(u => u.id === userId);
    return user || null;
  },

  async validateToken(token: string): Promise<boolean> {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 200));
    return token === 'mock_access_token';
  }
};