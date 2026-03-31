import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RoleGateway from './pages/RoleGateway';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import GuardLogin from './pages/guard/GuardLogin';
import GuardLayout from './pages/guard/GuardLayout';
import ResidentLogin from './pages/resident/ResidentLogin';
import ResidentLayout from './pages/resident/ResidentLayout';
import './App.css';

const SESSION_KEY = 'sentra-session';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    } catch {
      // storage unavailable
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // storage unavailable
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Gateway — role selector */}
        <Route path="/" element={<RoleGateway />} />
        <Route path="/gateway" element={<Navigate to="/" replace />} />

        {/* ===== Admin Domain ===== */}
        <Route
          path="/admin/login"
          element={
            user?.role === 'admin'
              ? <Navigate to="/admin/dashboard" replace />
              : <AdminLogin onLogin={handleLogin} />
          }
        />
        <Route
          path="/admin/*"
          element={
            user?.role === 'admin'
              ? <AdminLayout user={user} onLogout={handleLogout} />
              : <Navigate to="/admin/login" replace />
          }
        />

        {/* ===== Guard Domain ===== */}
        <Route
          path="/guard/login"
          element={
            user?.role === 'guard'
              ? <Navigate to="/guard/dashboard" replace />
              : <GuardLogin onLogin={handleLogin} />
          }
        />
        <Route
          path="/guard/*"
          element={
            user?.role === 'guard'
              ? <GuardLayout user={user} onLogout={handleLogout} />
              : <Navigate to="/guard/login" replace />
          }
        />

        {/* ===== Resident Domain ===== */}
        <Route
          path="/resident/login"
          element={
            user?.role === 'resident'
              ? <Navigate to="/resident/dashboard" replace />
              : <ResidentLogin onLogin={handleLogin} />
          }
        />
        <Route
          path="/resident/*"
          element={
            user?.role === 'resident'
              ? <ResidentLayout user={user} onLogout={handleLogout} />
              : <Navigate to="/resident/login" replace />
          }
        />

        {/* Fallback — redirect old routes to gateway */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
