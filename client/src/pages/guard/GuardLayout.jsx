import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import GuardMobileNav from '../../components/GuardMobileNav';
import Dashboard from '../Dashboard';
import VisitorEntry from '../VisitorEntry';
import Approval from '../Approval';
import Logs from '../Logs';
import Alerts from '../Alerts';
import Settings from '../Settings';
import About from '../About';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Camera, Shield, ScrollText, Bell,
  Settings as SettingsIcon, Info
} from 'lucide-react';

const GUARD_NAV_ITEMS = [
  { path: '/guard/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/guard/visitors',  label: 'Visitor Entry', icon: Camera },
  { path: '/guard/approval',  label: 'Approvals',    icon: Shield },
  { path: '/guard/logs',      label: 'Visitor Logs', icon: ScrollText },
  { path: '/guard/alerts',    label: 'Alerts',        icon: Bell },
  { path: '/guard/settings',  label: 'Settings',     icon: SettingsIcon },
  { path: '/guard/about',     label: 'About',         icon: Info },
];

const GUARD_PAGE_TITLES = {
  '/guard/dashboard': { title: 'Dashboard',    subtitle: 'Security Overview' },
  '/guard/visitors':  { title: 'Visitor Entry', subtitle: 'Register & Verify Visitors' },
  '/guard/approval':  { title: 'Approvals',    subtitle: 'Manage Visitor Access' },
  '/guard/logs':      { title: 'Visitor Logs', subtitle: 'Entry & Exit History' },
  '/guard/alerts':    { title: 'Alerts',        subtitle: 'Security Notifications' },
  '/guard/settings':  { title: 'Settings',     subtitle: 'Preferences & Configuration' },
  '/guard/about':     { title: 'About',         subtitle: 'Application Information' },
};

export default function GuardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen]             = useState(false);
  const location                                = useLocation();
  const { theme, toggleTheme }                  = useTheme('guard');
  const { user, logout }                        = useAuth();

  const pageInfo = GUARD_PAGE_TITLES[location.pathname] || { title: 'SentraAI', subtitle: '' };

  return (
    <div className="app-layout guard-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={GUARD_NAV_ITEMS}
        user={user}
        onLogout={logout}
        roleAccent="cyan"
        dashboardPath="/guard/dashboard"
      />
      <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          onMenuClick={() => setMobileOpen(true)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          role="guard"
        />
        <main className="app-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visitors"  element={<VisitorEntry role="guard" />} />
            <Route path="/approval"  element={<Approval />} />
            <Route path="/logs"      element={<Logs />} />
            <Route path="/alerts"    element={<Alerts />} />
            <Route path="/settings"  element={<Settings theme={theme} toggleTheme={toggleTheme} user={user} />} />
            <Route path="/about"     element={<About />} />
            <Route path="*"          element={<Navigate to="/guard/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <GuardMobileNav />
    </div>
  );
}
