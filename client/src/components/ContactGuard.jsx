import { useState } from 'react';
import { Phone, MessageCircle, X, ShieldCheck, Clock } from 'lucide-react';
import './ContactGuard.css';

export default function ContactGuard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB */}
      <button
        className={`contact-guard-fab ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        id="contact-guard-fab"
        title="Contact Guard"
      >
        {open ? <X size={22} /> : <Phone size={22} />}
      </button>

      {/* Modal */}
      {open && (
        <>
          <div className="contact-guard-overlay" onClick={() => setOpen(false)} />
          <div className="contact-guard-modal animate-fade-in-up">
            <div className="contact-guard-header">
              <ShieldCheck size={20} />
              <div>
                <h3>Contact Guard</h3>
                <p>Reach the security team on duty</p>
              </div>
            </div>

            <div className="guard-on-duty">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="Guard on duty"
                className="guard-duty-avatar"
              />
              <div className="guard-duty-info">
                <span className="guard-duty-name">Rajesh Kumar</span>
                <span className="guard-duty-status">
                  <span className="duty-dot" />
                  On Duty — Main Gate
                </span>
              </div>
            </div>

            <div className="contact-guard-actions">
              <a
                href="tel:+919876543210"
                className="contact-action-btn call"
                id="contact-guard-call"
              >
                <Phone size={18} />
                <div>
                  <span className="action-label">Call Guard</span>
                  <span className="action-sub">+91 98765 43210</span>
                </div>
              </a>

              <button className="contact-action-btn message" id="contact-guard-message" disabled>
                <MessageCircle size={18} />
                <div>
                  <span className="action-label">In-App Message</span>
                  <span className="action-sub coming-soon">Coming Soon</span>
                </div>
              </button>
            </div>

            <div className="guard-duty-schedule">
              <Clock size={14} />
              <span>Current shift: 6:00 AM — 6:00 PM</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
