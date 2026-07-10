import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

const Pagination: React.FC<PaginationProps> = ({ prev, next }) => {
  return (
    <div className="pagination-container" style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
      {prev ? (
        <Link to={prev.path} className="pagination-card prev" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'rgba(24, 24, 27, 0.4)', border: '1px solid var(--border-color)', textDecoration: 'none', transition: 'all 0.2s ease' }}>
          <span className="pagination-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}><ChevronLeft size={16} /> Previous</span>
          <span className="pagination-title" style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 600 }}>{prev.title}</span>
        </Link>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      
      {next ? (
        <Link to={next.path} className="pagination-card next" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'rgba(24, 24, 27, 0.4)', border: '1px solid var(--border-color)', textDecoration: 'none', transition: 'all 0.2s ease' }}>
          <span className="pagination-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>Next <ChevronRight size={16} /></span>
          <span className="pagination-title" style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 600 }}>{next.title}</span>
        </Link>
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
};

export default Pagination;
