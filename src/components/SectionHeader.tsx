import React from 'react';
import { COLORS } from '../config/themeConfig';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle?: string;
  isDark?: boolean;
  maxWidth?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  title, 
  highlight, 
  subtitle, 
  isDark = false,
  maxWidth = '560px'
}) => {
  return (
    <div style={{ textAlign: 'left', marginBottom: '42px' }}>
      <p style={{ 
        color: COLORS.teal, 
        fontSize: '11px', 
        fontWeight: 700, 
        letterSpacing: '0.15em', 
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        {eyebrow}
      </p>
      <h2 style={{ 
        color: isDark ? COLORS.textOnDark : COLORS.textOnLight, 
        fontWeight: 800, 
        fontSize: 'clamp(28px, 4.2vw, 38px)', 
        lineHeight: 1.15, 
        marginBottom: '18px',
        maxWidth: '800px'
      }}>
        {title} <span style={{ color: isDark ? COLORS.gold : COLORS.teal }}>{highlight}</span>
      </h2>
      {subtitle && (
        <p style={{ 
          color: isDark ? 'rgba(255,255,255,0.6)' : COLORS.textSub, 
          fontSize: '15.5px', 
          lineHeight: 1.65, 
          maxWidth,
          fontWeight: 400
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
