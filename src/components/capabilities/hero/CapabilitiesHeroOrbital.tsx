import React from 'react';
import { useNavigate } from 'react-router-dom';
import { svcImagesLabels } from './svcData';
import { COLORS, TYPOGRAPHY } from '../../../config/themeConfig';
import { ASSETS } from '@/constants/assets';

// Controls for easy tuning
const ORBITAL_CONFIG = {
  radius: 175,
  cardWidth: 100,
  cardHeight: 105,
  animationDuration: '6s',
  lineColor: 'rgba(214,176,92,0.18)',
  accentLineHeight: '3px',
  centerNodeSize: 90,
  logoSize: 32,
  logoMaxHeight: '40px'
};

export default function CapabilitiesHeroOrbital() {
  const navigate = useNavigate();
  // Angles: 270, 330, 30, 90, 150, 210
  const angles = [270, 330, 30, 90, 150, 210];
  const { radius, cardWidth, cardHeight, centerNodeSize, logoSize } = ORBITAL_CONFIG;
  
  return (
    <div style={{ 
      width: 500, 
      height: 500, 
      position: 'relative', 
      flexShrink: 0, 
      maxWidth: '100%', 
      transform: 'scale(0.95)', 
      transformOrigin: 'center center',
    }}>
        {/* Connector lines SVG - Centered properly */}
        <svg width="500" height="500" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {angles.map((ang, i) => {
          const rad = ang * (Math.PI / 180);
          const x2 = 250 + radius * Math.cos(rad);
          const y2 = 250 + radius * Math.sin(rad);
          return (
            <line key={`line-${i}`} x1="250" y1="250" x2={x2} y2={y2} stroke={ORBITAL_CONFIG.lineColor} strokeWidth="1" />
          );
        })}
      </svg>
      
      {/* Orbit Ring */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: radius * 2, height: radius * 2, borderRadius: '50%', border: '1px solid rgba(214,176,92,0.15)',
        pointerEvents: 'none',
        animation: 'orbitRingPulse 4s ease-in-out infinite'
      }} />
      <style>{`
        @keyframes orbitRingPulse {
          0%, 100% { opacity: 0.6 }
          50% { opacity: 1 }
        }
        .orbital-card:hover {
          background: rgba(107,21,48,0.4) !important;
          border-color: rgba(214,176,92,0.5) !important;
          transform: translate(-50%, -50%) scale(1.08) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.6) !important;
        }
        .orbital-card:hover .svc-name { color: #ffffff !important; }
        .orbital-card:hover .svc-logo { opacity: 1 !important; transform: scale(1.05) !important; }
      `}</style>
      
      {/* Center Node */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2,
        width: centerNodeSize, height: centerNodeSize, borderRadius: '50%', background: 'rgba(107,21,48,0.4)',
        border: '1.5px solid rgba(214,176,92,0.5)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 30px rgba(107,21,48,0.2)'
      }}>
        <img src={ASSETS.logos.qct.icon} alt="QCT" style={{ width: logoSize, opacity: 0.95, marginBottom: 4 }} />
        <span style={{ fontSize: '0.42rem', letterSpacing: '0.18em', color: 'rgba(214,176,92,0.7)', fontFamily: TYPOGRAPHY.fontBody, fontWeight: 700 }}>CORE</span>
      </div>
      
      {/* Orbiting Cards */}
      {svcImagesLabels.map((svc, i) => {
        const rad = angles[i] * (Math.PI / 180);
        // Position card center at the line end
        const x = 250 + radius * Math.cos(rad);
        const y = 250 + radius * Math.sin(rad);

        return (
          <div key={svc.code} className="orbital-card" onClick={() => navigate(svc.link)}
            style={{
              position: 'absolute', 
              left: x, 
              top: y, 
              transform: 'translate(-50%, -50%)', 
              zIndex: 1,
              width: cardWidth, 
              height: cardHeight,
              background: 'rgba(4,11,29,0.7)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `${ORBITAL_CONFIG.accentLineHeight} solid ${COLORS.burgundy}`, 
              borderRadius: '0 0 8px 8px', 
              padding: '12px 8px 10px',
              cursor: 'pointer', 
              transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(8px)'
            }}>
            
            <img 
              src={svc.img} 
              className="svc-logo"
              alt="" 
              style={{ 
                maxHeight: ORBITAL_CONFIG.logoMaxHeight, 
                maxWidth: '80%', 
                marginBottom: '10px',
                opacity: 0.8,
                transition: 'all 0.25s ease',
                objectFit: 'contain'
              }} 
            />

            <div className="svc-name" style={{ 
              fontSize: '0.62rem', 
              fontWeight: 700, 
              color: 'rgba(255,255,255,0.8)', 
              lineHeight: 1.25, 
              transition: 'color 0.22s ease',
              fontFamily: TYPOGRAPHY.fontBody,
              letterSpacing: '0.01em'
            }}>
              {svc.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
