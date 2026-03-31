import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, Mail, ArrowRight, Home, Bell, CheckCircle, Clock } from 'lucide-react';
import './ResidentLogin.css';

export default function ResidentLogin({ onLogin }) {
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
    onLogin({ email, role: 'resident', name: 'Resident User', unit: 'A-202' });
    navigate('/resident/dashboard');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onLogin({ email: 'resident@sentraai.com', role: 'resident', name: 'Resident User', unit: 'A-202' });
    navigate('/resident/dashboard');
  };

  return (
    <div className="resident-login-page">
      {/* Animated background */}
      <div className="resident-login-bg">
        <div className="resident-login-grid" />
        <div className="resident-orb resident-orb-1" />
        <div className="resident-orb resident-orb-2" />
        <div className="resident-orb resident-orb-3" />
      </div>

      <div className="resident-login-container">
        {/* Left panel — Branding */}
        <div className="resident-branding">
          <div className="resident-branding-content">
            <div className="resident-brand-logo">
              <div className="resident-brand-icon">
                <Zap size={32} />
              </div>
              <div>
                <h1>SentraAI</h1>
                <span className="resident-brand-badge">Resident Portal</span>
              </div>
            </div>
            <p className="resident-brand-tagline">
              Manage your visitor approvals with ease
            </p>
            <div className="resident-brand-features">
              <div className="resident-brand-feature">
                <CheckCircle size={20} />
                <span>Approve Visitors</span>
              </div>
              <div className="resident-brand-feature">
                <Bell size={20} />
                <span>Real-time Alerts</span>
              </div>
              <div className="resident-brand-feature">
                <Clock size={20} />
                <span>Entry History</span>
              </div>
            </div>
            <div className="resident-brand-stats">
              <div className="resident-brand-stat">
                <span className="resident-stat-number">Instant</span>
                <span className="resident-stat-label">Approve</span>
              </div>
              <div className="resident-brand-stat">
                <span className="resident-stat-number">Real-time</span>
                <span className="resident-stat-label">Alerts</span>
              </div>
              <div className="resident-brand-stat">
                <span className="resident-stat-number">Secure</span>
                <span className="resident-stat-label">Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — Login Form */}
        <div className="resident-form-panel">
          <div className="resident-form-container">
            <div className="resident-form-header">
              <h2>Resident Sign In</h2>
              <p>Access your visitor management portal</p>
            </div>

            {error && (
              <div className="resident-login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="resident-login-form">
              <div className="resident-form-group">
                <label htmlFor="resident-login-email">Email Address</label>
                <div className="resident-input-wrapper">
                  <Mail size={16} />
                  <input
                    id="resident-login-email"
                    type="email"
                    placeholder="resident@sentraai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="resident-form-group">
                <label htmlFor="resident-login-password">Password</label>
                <div className="resident-input-wrapper">
                  <Lock size={16} />
                  <input
                    id="resident-login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="resident-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    id="resident-toggle-password-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`resident-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                id="resident-login-submit"
              >
                {loading ? (
                  <div className="resident-btn-spinner" />
                ) : (
                  <>
                    Sign In to Resident Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="resident-login-divider">
              <span>Quick Demo Access</span>
            </div>

            <button
              className="resident-demo-btn"
              onClick={handleDemoLogin}
              disabled={loading}
              id="resident-demo-login"
            >
              <Home size={16} />
              Launch Resident Demo
            </button>

            <div className="resident-back-link">
              <button onClick={() => navigate('/')} className="resident-back-btn" id="resident-back-gateway">
                ← Back to portal selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
