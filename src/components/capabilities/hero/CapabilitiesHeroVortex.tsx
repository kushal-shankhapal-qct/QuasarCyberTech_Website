import React from 'react';
import { COLORS } from '../../../config/themeConfig';
import { svcImagesLabels } from './svcData';

export default function CapabilitiesHeroVortex() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 170px)', gap: '12px', paddingTop: '32px'
    }}>
      {svcImagesLabels.map((svc) => (
        <div key={svc.code} style={{
          width: '170px', position: 'relative', overflow: 'hidden', borderLeft: `3px solid ${COLORS.gold}`,
          borderRadius: '0 12px 12px 0', background: '#040B1D', cursor: 'default', transition: 'all 0.3s ease',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.borderLeftColor = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.borderLeftColor = COLORS.gold;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Image Top */}
          <div style={{ height: '84px', overflow: 'hidden' }}>
            <img src={svc.img} alt={svc.code} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          </div>
          {/* Name Below */}
          <div style={{
            background: COLORS.burgundy, padding: '8px 10px', minHeight: '44px', display: 'flex', alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span style={{
              fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2,
              textTransform: 'uppercase', letterSpacing: '0.02em', overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
            }}>
              {svc.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
