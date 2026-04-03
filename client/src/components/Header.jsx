import { Search, Shield, Menu, X, AlertTriangle, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { generateAlerts, generateVisitors } from '../data/mockData';
import NotificationPanel from './NotificationPanel';
import './Header.css';

const mockAlerts   = generateAlerts(8);
const mockVisitors = generateVisitors(10);

export default function Header({ onMenuClick, title, subtitle, role }) {
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !e.target.closest('#search-toggle')
      ) setSearchResults([]);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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

    setSearchResults(role === 'resident' ? alertResults : [...visitorResults, ...alertResults]);
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
        {/* Search */}
        <div className={`header-search ${searchOpen ? 'open' : ''}`} ref={searchRef}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search visitors, alerts..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="search-input"
            id="global-search"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => { setSearchQuery(''); setSearchResults([]); }}>
              <X size={14} />
            </button>
          )}
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

        <button className="header-icon-btn" onClick={() => setSearchOpen(!searchOpen)} id="search-toggle" title="Search">
          <Search size={18} />
        </button>

        {/* Real-time notification panel (Supabase-backed) */}
        <NotificationPanel />

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
