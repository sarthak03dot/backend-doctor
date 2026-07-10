import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon, color = '#3b82f6' }) => {
  return (
    <div className="feature-card animate-fade-in">
      <h3 style={{ color: 'var(--text-primary)' }}>
        <Icon size={24} color={color} />
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
