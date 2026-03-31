import { Bell, Menu, Search, Shield, X, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { generateAlerts, generateVisitors } from '../data/mockData';
import './Header.css';

const mockAlerts = generateAlerts(8);
const mockVisitors = generateVisitors(10);

export default function Header({ onMenuClick, title, subtitle, user, role }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState(mockAlerts.slice(0, 6));
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (searchRef.current && !searchRef.current.contains(e.target) && !e.target.closest('#search-toggle')) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search handler — filters by role
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();

    const visitorResults = mockVisitors
      .filter(v => v.name.toLowerCase().includes(q) || v.purpose.toLowerCase().includes(q))
      .slice(0, 3)
      .map(v => ({ type: 'visitor', label: v.name, sub: v.purpose, id: v.id }));

    const alertResults = mockAlerts
      .filter(a => a.title.toLowerCase().includes(q) || a.visitor.toLowerCase().includes(q))
      .slice(0, 3)
      .map(a => ({ type: 'alert', label: a.title, sub: a.visitor, id: a.id }));

    // Resident can't see visitor entry or logs
    if (role === 'resident') {
      setSearchResults([...alertResults]);
    } else {
      setSearchResults([...visitorResults, ...alertResults]);
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick} id="mobile-menu-btn">
          <Menu size={20} />
        </button>
        <div className="header-title-group">
          <h1 className="header-title">{title || 'Dashboard'}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        {/* Search bar */}
        <div className={`header-search ${searchOpen ? 'open' : ''}`} ref={searchRef}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search visitors, alerts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            id="global-search"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => { setSearchQuery(''); setSearchResults([]); }}>
              <X size={14} />
            </button>
          )}

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((r, i) => (
                <div key={r.id + i} className="search-result-item">
                  <div className={`search-result-icon ${r.type}`}>
                    {r.type === 'visitor' ? <User size={13} /> : <AlertTriangle size={13} />}
                  </div>
                  <div className="search-result-content">
                    <span className="search-result-label">{r.label}</span>
                    <span className="search-result-sub">{r.sub}</span>
                  </div>
                  <span className="search-result-type">{r.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="header-icon-btn"
          onClick={() => setSearchOpen(!searchOpen)}
          id="search-toggle"
          title="Search"
        >
          <Search size={18} />
        </button>

        {/* Notification Bell */}
        <div className="notification-wrapper" ref={notifRef}>
          <button
            className="header-icon-btn notification-btn"
            id="notification-btn"
            title="Notifications"
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifs && (
            <div className="notif-dropdown animate-fade-in">
              <div className="notif-dropdown-header">
                <h4>Notifications</h4>
                {unreadCount > 0 && (
                  <button className="notif-mark-all" onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notif-dropdown-list">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item ${!n.read ? 'unread' : ''}`}
                    onClick={() => {
                      setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
                    }}
                  >
                    <span className="notif-icon-sm">{n.icon}</span>
                    <div className="notif-content">
                      <span className="notif-title">{n.title}</span>
                      <span className="notif-time">
                        <Clock size={10} />
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!n.read && <span className="notif-unread-dot" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="header-divider" />

        <div className="header-status">
          <Shield size={14} />
          <span>System Active</span>
          <span className="status-pulse" />
        </div>
      </div>
    </header>
  );
}
