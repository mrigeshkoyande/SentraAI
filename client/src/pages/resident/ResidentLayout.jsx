import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import ContactGuard from '../../components/ContactGuard';
import ResidentDashboard from './ResidentDashboard';
import Approval from '../Approval';
import Alerts from '../Alerts';
import Settings from '../Settings';
import About from '../About';
import useTheme from '../../hooks/useTheme';
import {
  LayoutDashboard, Shield, Bell, Settings as SettingsIcon, Info
} from 'lucide-react';

const RESIDENT_NAV_ITEMS = [
  { path: '/resident/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/resident/approval', label: 'Approvals', icon: Shield },
  { path: '/resident/alerts', label: 'Alerts', icon: Bell, badge: 5 },
  { path: '/resident/settings', label: 'Settings', icon: SettingsIcon },
  { path: '/resident/about', label: 'About', icon: Info },
];

const RESIDENT_PAGE_TITLES = {
  '/resident/dashboard': { title: 'Dashboard', subtitle: 'Your Overview' },
  '/resident/approval': { title: 'Approvals', subtitle: 'Manage Visitor Access' },
  '/resident/alerts': { title: 'Alerts', subtitle: 'Security Notifications' },
  '/resident/settings': { title: 'Settings', subtitle: 'Preferences & Configuration' },
  '/resident/about': { title: 'About', subtitle: 'Application Information' },
};

export default function ResidentLayout({ user, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme('resident');

  // Resident sees only their unit data
  const userUnit = user?.unit || 'A-202';

  const pageInfo = RESIDENT_PAGE_TITLES[location.pathname] || { title: 'SentraAI', subtitle: '' };

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={RESIDENT_NAV_ITEMS}
        user={user}
        onLogout={onLogout}
        roleAccent="green"
        dashboardPath="/resident/dashboard"
      />
      <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          onMenuClick={() => setMobileOpen(true)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          user={user}
          role="resident"
        />
        <main className="app-content">
          <Routes>
            <Route path="/dashboard" element={<ResidentDashboard user={user} />} />
            <Route path="/approval" element={<Approval userUnit={userUnit} />} />
            <Route path="/alerts" element={<Alerts userUnit={userUnit} />} />
            <Route path="/settings" element={<Settings theme={theme} toggleTheme={toggleTheme} user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/resident/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      {/* Resident Contact Guard FAB */}
      <ContactGuard />
    </div>
  );
}
