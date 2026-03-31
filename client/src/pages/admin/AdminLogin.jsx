import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Shield, Lock, Mail, ArrowRight, BarChart3, Users, Settings } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    onLogin({ email, role: 'admin', name: 'Admin User' });
    navigate('/admin/dashboard');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onLogin({ email: 'admin@sentraai.com', role: 'admin', name: 'Admin User' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-page">
      {/* Animated background */}
      <div className="admin-login-bg">
        <div className="admin-login-grid" />
        <div className="admin-orb admin-orb-1" />
        <div className="admin-orb admin-orb-2" />
        <div className="admin-orb admin-orb-3" />
      </div>

      <div className="admin-login-container">
        {/* Left panel — Branding */}
        <div className="admin-branding">
          <div className="admin-branding-content">
            <div className="admin-brand-logo">
              <div className="admin-brand-icon">
                <Zap size={32} />
              </div>
              <div>
                <h1>SentraAI</h1>
                <span className="admin-brand-badge">Command Center</span>
              </div>
            </div>
            <p className="admin-brand-tagline">
              Full system control & security management
            </p>
            <div className="admin-brand-features">
              <div className="admin-brand-feature">
                <Settings size={20} />
                <span>System Management</span>
              </div>
              <div className="admin-brand-feature">
                <BarChart3 size={20} />
                <span>Analytics Dashboard</span>
              </div>
              <div className="admin-brand-feature">
                <Users size={20} />
                <span>User Administration</span>
              </div>
            </div>
            <div className="admin-brand-stats">
              <div className="admin-brand-stat">
                <span className="admin-stat-number">99.7%</span>
                <span className="admin-stat-label">Uptime</span>
              </div>
              <div className="admin-brand-stat">
                <span className="admin-stat-number">{'< 2s'}</span>
                <span className="admin-stat-label">Response</span>
              </div>
              <div className="admin-brand-stat">
                <span className="admin-stat-number">24/7</span>
                <span className="admin-stat-label">Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — Login Form */}
        <div className="admin-form-panel">
          <div className="admin-form-container">
            <div className="admin-form-header">
              <h2>Admin Sign In</h2>
              <p>Access the command center dashboard</p>
            </div>

            {error && (
              <div className="admin-login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="admin-form-group">
                <label htmlFor="admin-login-email">Email Address</label>
                <div className="admin-input-wrapper">
                  <Mail size={16} />
                  <input
                    id="admin-login-email"
                    type="email"
                    placeholder="admin@sentraai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="admin-login-password">Password</label>
                <div className="admin-input-wrapper">
                  <Lock size={16} />
                  <input
                    id="admin-login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="admin-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    id="admin-toggle-password-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`admin-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                id="admin-login-submit"
              >
                {loading ? (
                  <div className="admin-btn-spinner" />
                ) : (
                  <>
                    Sign In to Command Center
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="admin-login-divider">
              <span>Quick Demo Access</span>
            </div>

            <button
              className="admin-demo-btn"
              onClick={handleDemoLogin}
              disabled={loading}
              id="admin-demo-login"
            >
              <Shield size={16} />
              Launch Admin Demo
            </button>

            <div className="admin-back-link">
              <button onClick={() => navigate('/')} className="admin-back-btn" id="admin-back-gateway">
                ← Back to portal selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
