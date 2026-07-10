import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Pagination from '../components/Pagination';
import { useScrollSpy } from '../hooks/useScrollSpy';

const Diagnostics: React.FC = () => {
  const activeId = useScrollSpy(['system', 'network', 'security']);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
    <div className="animate-fade-in" style={{ flex: 1, maxWidth: '800px', minWidth: 0 }}>
      <h1>Health Checks</h1>
      <p>Backend Doctor runs a comprehensive suite of tests across your environment when initialized.</p>

      <div style={{ marginTop: '3rem' }}>
        <h2 id="system" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', scrollMarginTop: '80px' }}>
          <CheckCircle2 color="#10b981" /> System & Environment
        </h2>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginTop: '1rem', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-primary)' }}>Ecosystem & Dependencies</h4>
          <p>Validates that you are running a modern version of Node.js (v18+) and that your server timezone is correctly configured to UTC. Also scans your <code>package.json</code> for notoriously old or deprecated dependencies (like <code>request</code> or <code>moment</code>).</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Lockfile Conflict Prevention</h4>
          <p>Checks your repository for the presence of multiple lockfiles (e.g., both <code>yarn.lock</code> and <code>package-lock.json</code>). CI/CD platforms like Render or Vercel often fail or exhibit non-deterministic behavior when multiple lockfiles are present.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Memory & CPU Usage</h4>
          <p>Automatically checks V8 heap usage and system CPU load averages. If your application is starting with dangerously high memory consumption or blocking the CPU, Backend Doctor will warn you before production traffic hits.</p>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 id="network" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', scrollMarginTop: '80px' }}>
          <AlertTriangle color="#f59e0b" /> Network & External Services
        </h2>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginTop: '1rem', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-primary)' }}>DNS Resolution</h4>
          <p>Many managed platforms experience temporary outbound DNS failures. Backend Doctor attempts to resolve external domains to ensure APIs like Stripe or AWS S3 won't fail silently.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>Database & Redis Reachability</h4>
          <p>Instead of waiting for your ORM to timeout after 30 seconds, Backend Doctor opens a direct TCP socket to your Database/Redis URIs to verify network connectivity instantly.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>SMTP Testing</h4>
          <p>Verifies your mail server credentials by establishing an authenticated SMTP connection, guaranteeing that critical OTP and welcome emails will send successfully.</p>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 id="security" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', scrollMarginTop: '80px' }}>
          <XCircle color="#ef4444" /> Security & FS
        </h2>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginTop: '1rem', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-primary)' }}>File System Permissions</h4>
          <p>If your application relies on local file uploads, Backend Doctor ensures the specified directories exist and are both readable and writable.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem' }}>CORS Anti-patterns</h4>
          <p>Flags fatal security flaws, such as setting <code>origin: '*'</code> while simultaneously allowing <code>credentials: true</code>, which most browsers will block.</p>
        </div>
      </div>
      <Pagination 
        prev={{ title: 'Getting Started', path: '/getting-started' }} 
        next={{ title: 'API Reference', path: '/api-reference' }}
      />
    </div>
    {/* Right Sidebar - On This Page */}
    <div className="toc-sidebar" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px' }}>
      <h5 style={{ textTransform: 'uppercase', color: 'var(--text-primary)', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>On this page</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <li><a href="#system" className={`toc-link ${activeId === 'system' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>System & Environment</a></li>
        <li><a href="#network" className={`toc-link ${activeId === 'network' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>Network & Services</a></li>
        <li><a href="#security" className={`toc-link ${activeId === 'security' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>Security & FS</a></li>
      </ul>
    </div>
    </div>
  );
};

export default Diagnostics;
