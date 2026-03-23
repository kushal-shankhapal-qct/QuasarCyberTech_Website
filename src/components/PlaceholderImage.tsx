import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ALPHAS } from '../config/themeConfig';

interface PlaceholderImageProps {
  Icon?: LucideIcon;
  label?: string;
  height?: string;
  opacity?: number;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  Icon, 
  label = "Illustration / Photography", 
  height = '380px',
  opacity = 1
}) => {
  return (
    <div style={{
      width: '100%',
      height,
      background: 'linear-gradient(135deg, rgba(11,31,59,0.5) 0%, rgba(4,11,29,0.7) 100%)',
      border: `1px solid ${ALPHAS.teal15}`,
      borderRadius: '0 0 24px 24px',
      borderTop: `2px solid ${ALPHAS.teal20}`,
      backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.06) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      opacity
    }}>
      {Icon && (
        <Icon size={80} strokeWidth={0.8} color="#D6B05C" style={{ opacity: 0.25, marginBottom: '20px' }} />
      )}
      <div style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.15em'
      }}>
        {label}
      </div>
      
      {/* Subtle corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40px',
        height: '40px',
        borderRight: '1px solid rgba(43,196,182,0.2)',
        borderTop: '1px solid rgba(43,196,182,0.2)',
        opacity: 0.5
      }} />
    </div>
  );
};

export default PlaceholderImage;
