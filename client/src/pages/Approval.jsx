import { useState } from 'react';
import {
  CheckCircle, XCircle, Clock, Shield, Phone, MapPin, User,
  ThumbsUp, ThumbsDown, Send, Eye
} from 'lucide-react';
import { generateVisitors, getTrustColor, VISITOR_PHOTOS } from '../data/mockData';
import './Approval.css';

export default function Approval({ userUnit }) {
  const [visitors, setVisitors] = useState(() => {
    let all = generateVisitors(15).filter(v => v.status === 'pending').slice(0, 6).concat(
      generateVisitors(15).filter(v => v.status !== 'pending').slice(0, 4)
    );
    if (userUnit) all = all.filter(v => v.unit === userUnit);
    return all;
  });
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [otpSent, setOtpSent] = useState({});
  const [otpValues, setOtpValues] = useState({});

  const pendingCount = visitors.filter(v => v.status === 'pending').length;

  const handleApprove = (id) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    setSelectedVisitor(null);
  };

  const handleDeny = (id) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'denied' } : v));
    setSelectedVisitor(null);
  };

  const sendOTP = (id) => {
    setOtpSent(prev => ({ ...prev, [id]: true }));
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOtpValues(prev => ({ ...prev, [id]: otp }));
  };

  return (
    <div className="approval-page">
      <div className="approval-header">
        <div>
          <h2>{userUnit ? 'Your Visitor Approvals' : 'Visitor Approvals'}</h2>
          <p>{pendingCount} pending approval{pendingCount !== 1 ? 's' : ''}{userUnit ? ` for Unit ${userUnit}` : ''}</p>
        </div>
        <div className="approval-filter-pills">
          <button className="filter-pill active" id="filter-all">All</button>
          <button className="filter-pill" id="filter-pending">Pending ({pendingCount})</button>
          <button className="filter-pill" id="filter-approved">Approved</button>
          <button className="filter-pill" id="filter-denied">Denied</button>
        </div>
      </div>

      <div className="approval-layout">
        <div className="approval-list">
          {visitors.map((v, i) => {
            const trust = getTrustColor(v.trustLevel);
            return (
              <div
                key={v.id}
                className={`approval-card ${v.status} ${selectedVisitor?.id === v.id ? 'selected' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setSelectedVisitor(v)}
              >
                <div className="approval-card-left">
                  <div className="approval-avatar">
                    <img src={v.photo} alt={v.name} />
                    <span className={`status-indicator ${v.status}`} />
                  </div>
                  <div className="approval-info">
                    <span className="approval-name">{v.name}</span>
                    <span className="approval-purpose">{v.purpose} → {v.unit}</span>
                    <span className="approval-time">{new Date(v.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className="approval-card-right">
                  <div className="trust-badge" style={{ color: trust.color, background: trust.bg }}>
                    {v.trustScore}
                  </div>
                  {v.status === 'pending' && (
                    <div className="quick-actions">
                      <button
                        className="quick-btn approve"
                        onClick={(e) => { e.stopPropagation(); handleApprove(v.id); }}
                        title="Approve"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        className="quick-btn deny"
                        onClick={(e) => { e.stopPropagation(); handleDeny(v.id); }}
                        title="Deny"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  )}
                  {v.status === 'approved' && (
                    <span className="status-pill approved"><CheckCircle size={12} /> Approved</span>
                  )}
                  {v.status === 'denied' && (
                    <span className="status-pill denied"><XCircle size={12} /> Denied</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        {selectedVisitor && (
          <div className="approval-detail animate-fade-in">
            <div className="detail-header">
              <img src={selectedVisitor.photo} alt={selectedVisitor.name} className="detail-photo" />
              <h3>{selectedVisitor.name}</h3>
              <p>{selectedVisitor.purpose}</p>
            </div>

            <div className="detail-fields">
              <div className="detail-field">
                <User size={14} />
                <span className="detail-label">ID</span>
                <span className="detail-value">{selectedVisitor.id}</span>
              </div>
              <div className="detail-field">
                <Phone size={14} />
                <span className="detail-label">Phone</span>
                <span className="detail-value">{selectedVisitor.phone}</span>
              </div>
              <div className="detail-field">
                <MapPin size={14} />
                <span className="detail-label">Unit</span>
                <span className="detail-value">{selectedVisitor.unit}</span>
              </div>
              <div className="detail-field">
                <Shield size={14} />
                <span className="detail-label">Trust Score</span>
                <span className="detail-value" style={{ color: getTrustColor(selectedVisitor.trustLevel).color }}>
                  {selectedVisitor.trustScore}/100 ({selectedVisitor.trustLevel})
                </span>
              </div>
              <div className="detail-field">
                <Eye size={14} />
                <span className="detail-label">Face Match</span>
                <span className="detail-value">{selectedVisitor.faceMatch}%</span>
              </div>
              <div className="detail-field">
                <Clock size={14} />
                <span className="detail-label">Entry Time</span>
                <span className="detail-value">{new Date(selectedVisitor.entryTime).toLocaleString()}</span>
              </div>
            </div>

            {/* OTP Section */}
            <div className="otp-section">
              {!otpSent[selectedVisitor.id] ? (
                <button
                  className="send-otp-btn"
                  onClick={() => sendOTP(selectedVisitor.id)}
                  id="send-otp-btn"
                >
                  <Send size={16} />
                  Send OTP to Resident
                </button>
              ) : (
                <div className="otp-sent-display">
                  <CheckCircle size={16} />
                  <span>OTP Sent: <strong>{otpValues[selectedVisitor.id]}</strong></span>
                </div>
              )}
            </div>

            {selectedVisitor.status === 'pending' && (
              <div className="detail-actions">
                <button
                  className="detail-action-btn approve"
                  onClick={() => handleApprove(selectedVisitor.id)}
                  id="approve-visitor"
                >
                  <ThumbsUp size={16} />
                  Approve Entry
                </button>
                <button
                  className="detail-action-btn deny"
                  onClick={() => handleDeny(selectedVisitor.id)}
                  id="deny-visitor"
                >
                  <ThumbsDown size={16} />
                  Deny Entry
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
