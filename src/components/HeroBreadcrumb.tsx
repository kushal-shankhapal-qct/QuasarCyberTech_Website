import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../config/themeConfig';

interface HeroBreadcrumbProps {
  paths?: string[]; // e.g., ["HOME", "CAPABILITIES"]
  current: string; // e.g., "CYBER SECURITY ADVISORY"
}

const HeroBreadcrumb: React.FC<HeroBreadcrumbProps> = ({ paths = ["HOME"], current }) => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'none',
      letterSpacing: '0.02em',
    }}>
      {paths.map((path, idx) => (
        <React.Fragment key={idx}>
          <Link
            to={path.toUpperCase() === "HOME" ? "/" : `/${path.toLowerCase()}`}
            style={{
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            {path}
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px' }}>›</span>
        </React.Fragment>
      ))}
      <span style={{ color: COLORS.gold }}>{current}</span>
    </nav>
  );
};

export default HeroBreadcrumb;
