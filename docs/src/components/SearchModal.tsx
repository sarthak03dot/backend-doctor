import React, { useState, useEffect, useRef } from 'react';
import { Search, CornerDownLeft, ArrowDown, ArrowUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_INDEX = [
  { id: 'intro', title: 'Introduction', path: '/', category: 'Overview', desc: 'Backend Doctor overview and features' },
  { id: 'getting-started', title: 'Getting Started', path: '/getting-started', category: 'Overview', desc: 'Installation and production-ready setup guide' },
  { id: 'health-checks', title: 'Health Checks', path: '/diagnostics', category: 'Core Documentation', desc: 'Available diagnostic modules (Redis, DB, etc.)' },
  { id: 'api-reference', title: 'API Reference', path: '/api-reference', category: 'Core Documentation', desc: 'runDiagnostics API and configuration options' },
  { id: 'api-security', title: 'Security Configuration', path: '/api-reference', category: 'Configuration', desc: 'JWT secrets, AWS keys, and Helmet options' },
  { id: 'api-smtp', title: 'SMTP Mail Testing', path: '/api-reference', category: 'Configuration', desc: 'Verify your mail server credentials via TCP' },
  { id: 'api-cors', title: 'CORS Validation', path: '/api-reference', category: 'Configuration', desc: 'Prevent dangerous CORS patterns' },
  { id: 'api-standalone', title: 'Standalone Modules', path: '/api-reference', category: 'API', desc: 'Import and use specific diagnostic checks independently' },
  { id: 'api-middlewares', title: 'Express Middlewares', path: '/api-reference', category: 'API', desc: 'Slow Query Profiler and Rate Limiter' },
  { id: 'ecosystem', title: 'Ecosystem Checks', path: '/diagnostics', category: 'System & Environment', desc: 'Validates Node.js version and timezone' },
  { id: 'db-redis', title: 'Database & Redis Reachability', path: '/diagnostics', category: 'Network & External Services', desc: 'Opens TCP sockets to verify connectivity' }
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query
    ? SEARCH_INDEX.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.desc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].path);
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={22} color="#a1a1aa" />
          <input
            ref={inputRef}
            className="search-modal-input"
            placeholder="Search docs"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button className="icon-button" style={{ padding: '0.25rem' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="search-modal-body">
          {!query && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No recent searches
            </div>
          )}
          {query && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No results for "{query}"
            </div>
          )}
          {query && results.length > 0 && (
            <div style={{ paddingBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', marginBottom: '0.5rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Documentation
              </div>
              {results.map((res, idx) => (
                <div 
                  key={res.id} 
                  className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    navigate(res.path);
                    onClose();
                  }}
                >
                  <div className="search-result-title">{res.title}</div>
                  <div className="search-result-desc">{res.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <div className="search-shortcut">
            <span><kbd><CornerDownLeft size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> to select</kbd></span>
            <span><kbd><ArrowDown size={10} style={{ display: 'inline', verticalAlign: 'middle' }}/><ArrowUp size={10} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }}/></kbd> to navigate</span>
            <span><kbd style={{ fontSize: '0.65rem' }}>esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
