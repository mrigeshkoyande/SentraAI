import { useState, useEffect } from 'react';
import {
  Users, Bell, Shield, Clock, CheckCircle, XCircle, Eye,
  Phone, MessageSquare, Key, Home, ArrowUpRight, Zap,
  UserPlus, QrCode, RefreshCw, AlertTriangle, ChevronRight,
  Star, Package, Wrench, Coffee
} from 'lucide-react';
import { generateVisitors, generateAlerts, getTrustColor, VISITOR_PHOTOS, PURPOSES } from '../../data/mockData';
import './ResidentDashboard.css';

const PURPOSE_ICONS = {
  'Package Delivery': Package,
  'Meeting': Users,
  'Maintenance': Wrench,
  'Guest Visit': Coffee,
  'Food Delivery': Package,
  'Service Request': Wrench,
  'House Help': Home,
  'Medical Visit': Shield,
};

export default function ResidentDashboard({ user }) {
  const userUnit = user?.unit || 'A-202';

  // Generate unit-specific visitors
  const [allVisitors] = useState(() => generateVisitors(60));
  const [allAlerts] = useState(() => generateAlerts(15));
  const [pendingVisitors, setPendingVisitors] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [unitAlerts, setUnitAlerts] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', purpose: 'Guest Visit', date: '', phone: '' });
  const [sentInvites, setSentInvites] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({ total: 0, pending: 0, approved: 0, alerts: 0 });
  const [otpTarget, setOtpTarget] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  useEffect(() => {
    const unitVisitors = allVisitors.filter(v => v.unit === userUnit);
    const unitPending = unitVisitors.filter(v => v.status === 'pending').slice(0, 5);
    const unitRecent = unitVisitors.filter(v => v.status === 'approved').slice(0, 6);
    const relevantAlerts = allAlerts.filter(a => !a.resolved).slice(0, 4);

    setPendingVisitors(unitPending);
    setRecentVisitors(unitRecent);
    setUnitAlerts(relevantAlerts);

    const targets = {
      total: unitVisitors.length,
      pending: unitPending.length,
      approved: unitRecent.length,
      alerts: relevantAlerts.length,
    };

    let step = 0;
    const steps = 35;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedStats({
        total: Math.round(targets.total * eased),
        pending: Math.round(targets.pending * eased),
        approved: Math.round(targets.approved * eased),
        alerts: Math.round(targets.alerts * eased),
      });
      if (step >= steps) clearInterval(interval);
    }, 1200 / steps);

    return () => clearInterval(interval);
  }, [allVisitors, allAlerts, userUnit]);

  const approveVisitor = (id) => {
    setPendingVisitors(prev => prev.filter(v => v.id !== id));
  };

  const denyVisitor = (id) => {
    setPendingVisitors(prev => prev.filter(v => v.id !== id));
  };

  const sendInvite = () => {
    if (!inviteForm.name || !inviteForm.date) return;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentInvites(prev => [{
      id: 'INV-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      ...inviteForm,
      otp,
      status: 'pending',
      sentAt: new Date().toISOString(),
    }, ...prev]);
    setInviteForm({ name: '', purpose: 'Guest Visit', date: '', phone: '' });
    setShowInviteModal(false);
  };

  const generateOtp = (visitor) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpTarget(visitor);
    setGeneratedOtp(otp);
  };

  const severityColor = {
    critical: '#ef4444',
    high: '#f87171',
    medium: '#fbbf24',
    low: '#60a5fa',
  };

  return (
    <div className="resident-dashboard">
      {/* Welcome Banner */}
      <div className="resident-welcome">
        <div className="welcome-text">
          <div className="welcome-unit-badge">
            <Home size={14} />
            Unit {userUnit}
          </div>
          <h2>Welcome back, <span>{user?.name?.split(' ')[0] || 'Resident'}</span></h2>
          <p>Here's your security overview for today</p>
        </div>
        <div className="welcome-actions">
          <button className="invite-btn" onClick={() => setShowInviteModal(true)} id="invite-visitor-btn">
            <UserPlus size={16} />
            Invite Visitor
          </button>
          <button className="otp-quick-btn" onClick={() => generateOtp({ name: 'Quick OTP', id: 'quick' })} id="quick-otp-btn">
            <Key size={16} />
            Generate OTP
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="resident-stats">
        <div className="res-stat-card blue">
          <div className="res-stat-icon"><Users size={18} /></div>
          <div className="res-stat-body">
            <span className="res-stat-val">{animatedStats.total}</span>
            <span className="res-stat-label">Total Visitors</span>
          </div>
          <ArrowUpRight size={14} className="res-stat-arrow" />
        </div>
        <div className="res-stat-card amber">
          <div className="res-stat-icon"><Clock size={18} /></div>
          <div className="res-stat-body">
            <span className="res-stat-val">{animatedStats.pending}</span>
            <span className="res-stat-label">Awaiting Approval</span>
          </div>
          {animatedStats.pending > 0 && <span className="res-stat-pulse" />}
        </div>
        <div className="res-stat-card green">
          <div className="res-stat-icon"><CheckCircle size={18} /></div>
          <div className="res-stat-body">
            <span className="res-stat-val">{animatedStats.approved}</span>
            <span className="res-stat-label">Approved</span>
          </div>
        </div>
        <div className="res-stat-card red">
          <div className="res-stat-icon"><Bell size={18} /></div>
          <div className="res-stat-body">
            <span className="res-stat-val">{animatedStats.alerts}</span>
            <span className="res-stat-label">Active Alerts</span>
          </div>
          {animatedStats.alerts > 0 && <span className="res-stat-pulse red" />}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="resident-grid">
        {/* Pending Approvals — Full Width */}
        <div className="res-card pending-card">
          <div className="res-card-header">
            <div>
              <h3>Pending Approvals</h3>
              <p>Visitors waiting for your confirmation</p>
            </div>
            {pendingVisitors.length > 0 && (
              <span className="pending-count-badge">{pendingVisitors.length}</span>
            )}
          </div>

          {pendingVisitors.length === 0 ? (
            <div className="res-empty-state">
              <Shield size={32} />
              <p>No pending approvals</p>
              <span>All visitors have been processed</span>
            </div>
          ) : (
            <div className="pending-list">
              {pendingVisitors.map((v, i) => {
                const trust = getTrustColor(v.trustLevel);
                const Icon = PURPOSE_ICONS[v.purpose] || Users;
                return (
                  <div key={v.id} className="pending-item" style={{ animationDelay: `${i * 0.07}s` }}>
                    <img src={v.photo} alt={v.name} className="pending-photo" />
                    <div className="pending-info">
                      <span className="pending-name">{v.name}</span>
                      <div className="pending-meta">
                        <Icon size={12} />
                        <span>{v.purpose}</span>
                        <span className="meta-dot">•</span>
                        <Clock size={11} />
                        <span>{new Date(v.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="trust-chip" style={{ color: trust.color, background: trust.bg }}>
                      {v.trustScore}
                    </div>
                    <div className="pending-actions">
                      <button
                        className="quick-approve"
                        onClick={() => approveVisitor(v.id)}
                        id={`approve-${v.id}`}
                        title="Approve"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button
                        className="quick-deny"
                        onClick={() => denyVisitor(v.id)}
                        id={`deny-${v.id}`}
                        title="Deny"
                      >
                        <XCircle size={16} />
                      </button>
                      <button
                        className="quick-otp"
                        onClick={() => generateOtp(v)}
                        id={`otp-${v.id}`}
                        title="Send OTP"
                      >
                        <Key size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Visitor History */}
        <div className="res-card">
          <div className="res-card-header">
            <div>
              <h3>Recent Visitors</h3>
              <p>Past entries to Unit {userUnit}</p>
            </div>
            <button className="res-view-all" id="view-all-history">
              All <ChevronRight size={14} />
            </button>
          </div>
          <div className="recent-visitor-list">
            {recentVisitors.map((v, i) => {
              const trust = getTrustColor(v.trustLevel);
              return (
                <div key={v.id} className="recent-visitor-item" style={{ animationDelay: `${i * 0.06}s` }}>
                  <img src={v.photo} alt={v.name} />
                  <div className="rv-info">
                    <span className="rv-name">{v.name}</span>
                    <span className="rv-purpose">{v.purpose}</span>
                  </div>
                  <div className="rv-time">
                    {new Date(v.entryTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="rv-trust" style={{ color: trust.color, background: trust.bg }}>
                    {v.trustScore}
                  </div>
                </div>
              );
            })}
            {recentVisitors.length === 0 && (
              <div className="res-empty-state small">
                <Eye size={24} />
                <p>No recent visitors</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Alerts for Resident */}
        <div className="res-card alerts-card">
          <div className="res-card-header">
            <div>
              <h3>Security Alerts</h3>
              <p>Recent alerts near your unit</p>
            </div>
            <div className="live-badge-sm">
              <span className="live-dot-sm" />
              Live
            </div>
          </div>
          <div className="res-alerts-list">
            {unitAlerts.map((a, i) => (
              <div key={a.id} className="res-alert-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="res-alert-icon">{a.icon}</span>
                <div className="res-alert-content">
                  <span className="res-alert-title">{a.title}</span>
                  <span className="res-alert-meta">{a.location} • {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div
                  className="res-alert-severity"
                  style={{ color: severityColor[a.severity] }}
                >
                  {a.severity}
                </div>
              </div>
            ))}
            {unitAlerts.length === 0 && (
              <div className="res-empty-state small">
                <Shield size={24} />
                <p>All clear — no active alerts</p>
              </div>
            )}
          </div>
        </div>

        {/* Sent Invites */}
        <div className="res-card invites-card">
          <div className="res-card-header">
            <div>
              <h3>Sent Invites</h3>
              <p>Pre-approved visitor passes</p>
            </div>
            <button className="invite-btn-sm" onClick={() => setShowInviteModal(true)} id="new-invite-btn">
              <UserPlus size={14} />
              New
            </button>
          </div>

          {sentInvites.length === 0 ? (
            <div className="res-empty-state">
              <QrCode size={32} />
              <p>No invites sent yet</p>
              <span>Invite a visitor to pre-generate their pass</span>
            </div>
          ) : (
            <div className="invites-list">
              {sentInvites.map((inv, i) => (
                <div key={inv.id} className="invite-item" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="invite-info">
                    <span className="invite-name">{inv.name}</span>
                    <span className="invite-purpose">{inv.purpose}</span>
                    <span className="invite-date">{inv.date}</span>
                  </div>
                  <div className="invite-otp">
                    <Key size={12} />
                    {inv.otp}
                  </div>
                  <span className="invite-status pending">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="res-modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="res-modal animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="res-modal-header">
              <h3><UserPlus size={18} /> Invite a Visitor</h3>
              <button className="res-modal-close" onClick={() => setShowInviteModal(false)}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="res-modal-body">
              <div className="res-form-group">
                <label>Visitor Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  id="invite-name"
                />
              </div>
              <div className="res-form-group">
                <label>Purpose</label>
                <select
                  value={inviteForm.purpose}
                  onChange={e => setInviteForm({ ...inviteForm, purpose: e.target.value })}
                  id="invite-purpose"
                >
                  {['Guest Visit', 'Package Delivery', 'Maintenance', 'Food Delivery', 'House Help', 'Medical Visit', 'Meeting'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="res-form-row">
                <div className="res-form-group">
                  <label>Expected Date *</label>
                  <input
                    type="date"
                    value={inviteForm.date}
                    onChange={e => setInviteForm({ ...inviteForm, date: e.target.value })}
                    id="invite-date"
                  />
                </div>
                <div className="res-form-group">
                  <label>Phone (optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={inviteForm.phone}
                    onChange={e => setInviteForm({ ...inviteForm, phone: e.target.value })}
                    id="invite-phone"
                  />
                </div>
              </div>
            </div>
            <div className="res-modal-footer">
              <button className="res-cancel-btn" onClick={() => setShowInviteModal(false)}>Cancel</button>
              <button className="res-submit-btn" onClick={sendInvite} id="submit-invite-btn">
                <Key size={14} />
                Send Invite & Generate OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {generatedOtp && (
        <div className="res-modal-overlay" onClick={() => { setGeneratedOtp(null); setOtpTarget(null); }}>
          <div className="res-modal otp-modal animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="res-modal-header">
              <h3><Key size={18} /> One-Time Password</h3>
              <button className="res-modal-close" onClick={() => { setGeneratedOtp(null); setOtpTarget(null); }}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="otp-display">
              <p className="otp-for">OTP for <strong>{otpTarget?.name}</strong></p>
              <div className="otp-code">
                {generatedOtp.split('').map((digit, i) => (
                  <span key={i} className="otp-digit">{digit}</span>
                ))}
              </div>
              <p className="otp-note">
                <Shield size={12} />
                Valid for 10 minutes. Share only with your visitor.
              </p>
            </div>
            <div className="res-modal-footer">
              <button
                className="res-submit-btn"
                onClick={() => { setGeneratedOtp(null); setOtpTarget(null); }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
