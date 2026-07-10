import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'relative',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
    }}>
      {/* Mac Terminal Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        {language && (
          <div style={{ 
            marginLeft: 'auto', 
            marginRight: '2rem',
            fontSize: '0.75rem', 
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language}
          </div>
        )}
      </div>
      <button 
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '0.65rem',
          right: '0.75rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.25rem',
          transition: 'color 0.2s'
        }}
        title="Copy code"
      >
        {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
      </button>
      
      <Highlight
        theme={themes.nightOwl}
        code={code}
        language={language as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={className} 
            style={{ 
              ...style, 
              margin: 0, 
              border: 'none',
              borderRadius: 0,
              backgroundColor: 'transparent',
              padding: '1.25rem',
              marginBottom: 0,
              overflowX: 'auto',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.9rem'
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
