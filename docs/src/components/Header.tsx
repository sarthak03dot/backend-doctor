import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Package, Syringe } from 'lucide-react';

import { GithubIcon } from './icons';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <button 
          onClick={toggleSidebar} 
          className="icon-button"
          title="Toggle Sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/" className="logo-text">
          <Syringe size={26} color="#3b82f6" />
          Backend Doctor
        </Link>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Terminal size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa' }} />
          <input 
            type="text" 
            placeholder="Search docs... (Ctrl+K)" 
            onClick={() => setIsSearchOpen(true)}
            readOnly
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 1rem 0.45rem 2.5rem',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              cursor: 'pointer'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--text-secondary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'flex-end' }}>
        <a href="https://www.npmjs.com/package/backend-doctor" target="_blank" rel="noreferrer" className="icon-button" title="NPM">
          <Package size={20} />
        </a>
        <a href="https://github.com/your-username/backend-doctor" target="_blank" rel="noreferrer" className="icon-button" title="GitHub">
          <GithubIcon size={20} />
        </a>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
