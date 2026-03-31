import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Shield, Lock, Mail, ArrowRight, Fingerprint, Scan, Radio } from 'lucide-react';
import './GuardLogin.css';

export default function GuardLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badgeId, setBadgeId] = useState('');
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
    onLogin({ email, role: 'guard', name: 'Security Guard' });
    navigate('/guard/dashboard');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onLogin({ email: 'guard@sentraai.com', role: 'guard', name: 'Security Guard' });
    navigate('/guard/dashboard');
  };

  return (
    <div className="guard-login-page">
      {/* Animated background */}
      <div className="guard-login-bg">
        <div className="guard-login-grid" />
        <div className="guard-orb guard-orb-1" />
        <div className="guard-orb guard-orb-2" />
        <div className="guard-orb guard-orb-3" />
        <div className="guard-scanline" />
      </div>

      <div className="guard-login-container">
        {/* Left panel — Branding */}
        <div className="guard-branding">
          <div className="guard-branding-content">
            <div className="guard-brand-logo">
              <div className="guard-brand-icon">
                <Zap size={32} />
              </div>
              <div>
                <h1>SentraAI</h1>
                <span className="guard-brand-badge">Guard Station</span>
              </div>
            </div>
            <p className="guard-brand-tagline">
              Verify visitors & control access points
            </p>
            <div className="guard-brand-features">
              <div className="guard-brand-feature">
                <Fingerprint size={20} />
                <span>Face Verification</span>
              </div>
              <div className="guard-brand-feature">
                <Scan size={20} />
                <span>Gate Control</span>
              </div>
              <div className="guard-brand-feature">
                <Radio size={20} />
                <span>Instant Alerts</span>
              </div>
            </div>
            <div className="guard-brand-stats">
              <div className="guard-brand-stat">
                <span className="guard-stat-number">99.7%</span>
                <span className="guard-stat-label">Face Match</span>
              </div>
              <div className="guard-brand-stat">
                <span className="guard-stat-number">{'< 2s'}</span>
                <span className="guard-stat-label">Verify</span>
              </div>
              <div className="guard-brand-stat">
                <span className="guard-stat-number">Live</span>
                <span className="guard-stat-label">Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — Login Form */}
        <div className="guard-form-panel">
          <div className="guard-form-container">
            <div className="guard-form-header">
              <h2>Guard Sign In</h2>
              <p>Access the security station</p>
            </div>

            {error && (
              <div className="guard-login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="guard-login-form">
              <div className="guard-form-group">
                <label htmlFor="guard-login-email">Email Address</label>
                <div className="guard-input-wrapper">
                  <Mail size={16} />
                  <input
                    id="guard-login-email"
                    type="email"
                    placeholder="guard@sentraai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="guard-form-group">
                <label htmlFor="guard-login-password">Password</label>
                <div className="guard-input-wrapper">
                  <Lock size={16} />
                  <input
                    id="guard-login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="guard-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    id="guard-toggle-password-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="guard-form-group">
                <label htmlFor="guard-badge-id">Badge ID <span className="guard-optional">(optional)</span></label>
                <div className="guard-input-wrapper">
                  <Shield size={16} />
                  <input
                    id="guard-badge-id"
                    type="text"
                    placeholder="e.g. GRD-0042"
                    value={badgeId}
                    onChange={(e) => setBadgeId(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`guard-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                id="guard-login-submit"
              >
                {loading ? (
                  <div className="guard-btn-spinner" />
                ) : (
                  <>
                    Sign In to Guard Station
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="guard-login-divider">
              <span>Quick Demo Access</span>
            </div>

            <button
              className="guard-demo-btn"
              onClick={handleDemoLogin}
              disabled={loading}
              id="guard-demo-login"
            >
              <Fingerprint size={16} />
              Launch Guard Demo
            </button>

            <div className="guard-back-link">
              <button onClick={() => navigate('/')} className="guard-back-btn" id="guard-back-gateway">
                ← Back to portal selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
