import React from 'react';
import { useNavigate } from 'react-router-dom';
import { svcImagesLabels } from './svcData';
import { COLORS } from '../../../config/themeConfig';
import logoIcon from '../../../assets/logos copy/QuasarCyberTech/icononly_transparent_nobuffer.png';

export default function CapabilitiesHeroOrbital() {
  const navigate = useNavigate();
  // Angles: 270, 330, 30, 90, 150, 210
  const angles = [270, 330, 30, 90, 150, 210];
  const radius = 190;
  
  return (
    <div style={{ width: 500, height: 500, position: 'relative', flexShrink: 0, maxWidth: '100%', transform: 'scale(0.85)', transformOrigin: 'center center' }}>
        {/* Connector lines SVG */}
        <svg width="500" height="500" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {angles.map((ang, i) => {
          const rad = ang * (Math.PI / 180);
          const x2 = 250 + radius * Math.cos(rad);
          const y2 = 250 + radius * Math.sin(rad);
          return (
            <line key={`line-${i}`} x1="250" y1="250" x2={x2} y2={y2} stroke="rgba(214,176,92,0.12)" strokeWidth="1" />
          );
        })}
      </svg>
      
      {/* Orbit Ring */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(214,176,92,0.15)',
        pointerEvents: 'none',
        animation: 'orbitRingPulse 4s ease-in-out infinite'
      }} />
      <style>{`
        @keyframes orbitRingPulse {
          0%, 100% { opacity: 0.6 }
          50% { opacity: 1 }
        }
        .orbital-card:hover {
          background: rgba(107,21,48,0.25) !important;
          border-color: rgba(214,176,92,0.4) !important;
          transform: translate(-50%, -50%) scale(1.06) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
        }
        .orbital-card:hover .svc-name { color: #ffffff !important; }
      `}</style>
      
      {/* Center Node */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2,
        width: 100, height: 100, borderRadius: '50%', background: 'rgba(107,21,48,0.3)',
        border: '1.5px solid rgba(214,176,92,0.4)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <img src={logoIcon} alt="QCT" style={{ width: 36, opacity: 0.9, marginBottom: 4 }} />
        <span style={{ fontSize: '0.45rem', letterSpacing: '0.15em', color: 'rgba(214,176,92,0.6)', fontFamily: 'monospace' }}>CAPABILITIES</span>
      </div>
      
      {/* Orbiting Cards */}
      {svcImagesLabels.map((svc, i) => {
        const rad = angles[i] * (Math.PI / 180);
        const left = 50 + (radius / 250) * 50 * Math.cos(rad);
        const top = 50 + (radius / 250) * 50 * Math.sin(rad);
        return (
          <div key={svc.code} className="orbital-card" onClick={() => navigate(svc.link)}
            style={{
              position: 'absolute', left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)', zIndex: 1,
              width: 110, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)',
              borderTop: '2px solid #6B1530', borderRadius: '0 0 6px 6px', padding: '10px 10px 8px',
              cursor: 'pointer', transition: 'all 0.22s ease'
            }}>
            <div style={{ fontSize: '0.55rem', color: 'rgba(214,176,92,0.5)', fontFamily: 'monospace', marginBottom: 3 }}>
              {svc.code}
            </div>
            <div className="svc-name" style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3, transition: 'color 0.22s ease' }}>
              {svc.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
