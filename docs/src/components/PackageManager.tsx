import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

const PackageManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');

  const commands = {
    npm: 'npm install backend-doctor',
    yarn: 'yarn add backend-doctor',
    pnpm: 'pnpm add backend-doctor',
    bun: 'bun add backend-doctor'
  };

  return (
    <div className="package-manager" style={{ marginBottom: '2rem' }}>
      <div className="pm-tabs" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        {(['npm', 'yarn', 'pnpm', 'bun'] as const).map(pm => (
          <button 
            key={pm} 
            className={`pm-tab ${activeTab === pm ? 'active' : ''}`}
            onClick={() => setActiveTab(pm)}
            style={{ 
              background: activeTab === pm ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === pm ? '#ffffff' : '#a1a1aa',
              border: '1px solid',
              borderColor: activeTab === pm ? 'var(--accent-color)' : 'var(--border-color)',
              padding: '0.4rem 1.2rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="pm-content">
        <CodeBlock code={commands[activeTab]} language="bash" />
      </div>
    </div>
  );
};

export default PackageManager;
