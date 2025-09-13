import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/core/components/ProtectedRoute';
import { AppShell } from '@/layout/AppShell';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { CassaPage } from '@/features/cassa/pages/CassaPage';
import { MagazzinoPage } from '@/features/magazzino/pages/MagazzinoPage';
import { CRMPage } from '@/features/crm/pages/CRMPage';
import { GarePage } from '@/features/gare/pages/GarePage';
import { ReportPage } from '@/features/report/pages/ReportPage';
import { HRPage } from '@/features/hr/pages/HRPage';
import { CMSPage } from '@/features/cms/pages/CMSPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';
import { NotFoundPage } from '@/core/pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="cassa" element={<CassaPage />} />
        <Route path="magazzino" element={<MagazzinoPage />} />
        <Route path="crm/*" element={<CRMPage />} />
        <Route path="gare" element={<GarePage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="hr" element={<HRPage />} />
        <Route path="cms" element={<CMSPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};