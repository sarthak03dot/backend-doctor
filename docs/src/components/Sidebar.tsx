import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Rocket, Code2, Stethoscope } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const handleLinkClick = () => {
    if (closeSidebar && window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
          Overview
        </h4>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleLinkClick}>
          <Home size={18} style={{ marginRight: '0.5rem' }} /> Introduction
        </NavLink>
        <NavLink to="/getting-started" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
          <Rocket size={18} style={{ marginRight: '0.5rem' }} /> Getting Started
        </NavLink>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
          Core Documentation
        </h4>
        <NavLink to="/diagnostics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
          <Stethoscope size={18} style={{ marginRight: '0.5rem' }} /> Health Checks
        </NavLink>
        <NavLink to="/api-reference" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
          <Code2 size={18} style={{ marginRight: '0.5rem' }} /> API Reference
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
