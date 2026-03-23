import React from 'react';
import { useNavigate } from 'react-router-dom';
import { svcImagesLabels } from './svcData';

export default function CapabilitiesHeroStaggered() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxHeight: '100%', overflow: 'hidden' }}>
      <style>{`
        .staggered-card:hover {
          background: rgba(107,21,48,0.20) !important;
          border-top-color: #D6B05C !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.4) !important;
        }
        .staggered-card:hover .watermark {
          color: rgba(214,176,92,0.12) !important;
        }
      `}</style>
      
      {/* Column 1 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', transform: 'translateY(0)' }}>
        {[0, 2, 4].map(i => {
          const svc = svcImagesLabels[i];
          return (
            <div key={svc.code} className="staggered-card" onClick={() => navigate(svc.link)}
              style={{
                position: 'relative', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderTop: '3px solid #6B1530', borderRadius: '0 0 8px 8px', padding: '16px', cursor: 'pointer',
                overflow: 'hidden', transition: 'all 0.25s ease'
              }}>
              <div className="watermark" style={{
                position: 'absolute', top: -8, right: 8, fontSize: '5rem', fontWeight: 900,
                color: 'rgba(214,176,92,0.06)', lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-heading)',
                transition: 'color 0.25s ease'
              }}>
                0{i+1}
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(214,176,92,0.55)', fontFamily: 'monospace' }}>{svc.code}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3, marginTop: 4 }}>{svc.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{svc.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Column 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', transform: 'translateY(48px)' }}>
        {[1, 3, 5].map(i => {
          const svc = svcImagesLabels[i];
          return (
            <div key={svc.code} className="staggered-card" onClick={() => navigate(svc.link)}
              style={{
                position: 'relative', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderTop: '3px solid #6B1530', borderRadius: '0 0 8px 8px', padding: '16px', cursor: 'pointer',
                overflow: 'hidden', transition: 'all 0.25s ease'
              }}>
              <div className="watermark" style={{
                position: 'absolute', top: -8, right: 8, fontSize: '5rem', fontWeight: 900,
                color: 'rgba(214,176,92,0.06)', lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-heading)',
                transition: 'color 0.25s ease'
              }}>
                0{i+1}
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(214,176,92,0.55)', fontFamily: 'monospace' }}>{svc.code}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3, marginTop: 4 }}>{svc.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{svc.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
