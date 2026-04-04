import { Search, Shield, Menu, X, AlertTriangle, User } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from './NotificationPanel';
import './Header.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Header({ onMenuClick, title, subtitle, role }) {
  const { getIdToken } = useAuth();
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching]       = useState(false);
  const searchRef  = useRef(null);
  const debounceId = useRef(null);

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

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults([]); return; }

    // Debounce backend search by 350ms
    clearTimeout(debounceId.current);
    debounceId.current = setTimeout(async () => {
      setSearching(true);
      try {
        const token = await getIdToken();
        const res = await fetch(
          `${API}/api/visitors?search=${encodeURIComponent(query)}&limit=5`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        const visitors = (data.visitors || []).map(v => ({
          type: 'visitor',
          label: v.name,
          sub: `${v.purpose || '—'} → ${v.target_flat || '—'}`,
          id: v.id,
        }));
        setSearchResults(visitors);
      } catch {
        // Fallback: show nothing if server is unreachable
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
  }, [getIdToken]);

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
          <Search size={16} className="search-icon" style={{ opacity: searching ? 0.5 : 1, transition: 'opacity 0.2s' }} />
          <input
            type="text"
            placeholder="Search visitors..."
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
          {searching && searchQuery && searchResults.length === 0 && (
            <div className="search-results-dropdown">
              <div className="search-result-item" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', padding: '0.75rem 1rem' }}>
                Searching…
              </div>
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
