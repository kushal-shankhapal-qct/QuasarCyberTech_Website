import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

interface BreadcrumbProps {
  customPaths?: string[]; // Manual override for pages like Blogs
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customPaths }) => {
  const location = useLocation();
  const pathnames = customPaths || location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  };

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      marginBottom: '12px', // Standardized gap above title
      fontFamily: TYPOGRAPHY.fontBody 
    }}>
      <Link 
        to="/" 
        style={{ ...breadcrumbStyle, color: 'rgba(255,255,255,0.4)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = COLORS.gold}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
      >
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        // If customPaths is used, we might not have 'to' logic easily, 
        // but for now we assume it's just for display on those few pages.
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = value.replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <span style={{ color: 'rgba(214,176,92,0.6)', fontSize: '10px', marginTop: '-1px' }}>›</span>
            {last ? (
              <span style={{ ...breadcrumbStyle, color: COLORS.gold }}>
                {label}
              </span>
            ) : (
              <Link 
                to={to}
                style={{ ...breadcrumbStyle, color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.gold}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
