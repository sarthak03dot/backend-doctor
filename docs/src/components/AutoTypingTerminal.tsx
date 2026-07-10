import React, { useState, useEffect } from 'react';

const lines = [
  { text: '> npm start', type: 'cmd' },
  { text: 'Starting backend-doctor checks...', type: 'info' },
  { text: '[PORT] Port 4000 is available.', type: 'success' },
  { text: '[DNS] DNS resolution is working.', type: 'success' },
  { text: '[DB] Connected to PostgreSQL at localhost:5432', type: 'success' },
  { text: '[CORS] FATAL: Origin is "*" but credentials are true.', type: 'error' },
  { text: '[CORS] This will cause your frontend to fail in production.', type: 'error' },
  { text: 'backend-doctor aborted the startup to prevent an outage.', type: 'info' }
];

const AutoTypingTerminal: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, Math.random() * 30 + 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line.type === 'cmd' ? 600 : 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  return (
    <div className="typing-terminal">
      <div className="term-header">
        <div className="dot red" />
        <div className="dot yellow" />
        <div className="dot green" />
      </div>
      <div className="term-content">
        {lines.slice(0, currentLine).map((line, i) => (
          <div key={i} style={getStyle(line.type)}>
            {line.text}
          </div>
        ))}
        {currentLine < lines.length && (
          <div style={getStyle(lines[currentLine].type)}>
            {lines[currentLine].text.substring(0, currentChar)}
            <span className="cursor-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

function getStyle(type: string) {
  switch (type) {
    case 'cmd': return { color: '#fafafa', marginBottom: '0.5rem' };
    case 'info': return { color: '#a1a1aa' };
    case 'success': return { color: '#10b981' };
    case 'error': return { color: '#ef4444', fontWeight: 600 };
    default: return { color: '#fafafa' };
  }
}

export default AutoTypingTerminal;
