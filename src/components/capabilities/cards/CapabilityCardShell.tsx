import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../../../config/themeConfig';

export interface CapabilityCardShellProps {
  title: string;
  desc: string;
  img: string;
  index?: number;
  theme?: 'teal' | 'burgundy';
  children?: React.ReactNode;
  isHovered?: boolean;
}

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

export function CapabilityCardShell({ title, desc, img, theme = 'teal', children, isHovered }: CapabilityCardShellProps) {
  const accentColor = isHovered ? COLORS.gold : (theme === 'burgundy' ? COLORS.burgundy : COLORS.teal);

  return (
    <div 
      className="card-shell-container"
      style={{
        borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
        background: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        transition: 'all 0.4s ease',
        position: 'relative'
      }}
    >
      {/* ─── ACCENT LINE (Fully covering height) ─── */}
      <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: accentColor,
          zIndex: 10,
          transition: 'background 0.3s ease'
      }} />

      <div style={{
        height: '210px', 
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        background: '#0B1F3B',
        borderRadius: `0 ${CARD_ROUNDNESS} 0 0`
      }}>
        <img
          className="photo-element"
          src={img}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(107, 15, 43, 0.15) 0%, rgba(11, 31, 59, 0.25) 100%)', pointerEvents: 'none' }} />
      </div>

      <div className="card-body-content" style={{ 
        padding: '18px 20px 16px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        background: '#ffffff', 
        position: 'relative',
        borderRadius: `0 0 ${CARD_ROUNDNESS} 0`
      }}>
        <h3 style={{
          color: '#0B1F3B', fontWeight: 700, fontSize: '17px', lineHeight: 1.3, fontFamily: TYPOGRAPHY.fontHeading, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          {title} 
          <ArrowRight className="inline-arrow-icon" size={14} style={{ color: accentColor, marginLeft: 8, transition: 'all 0.22s ease', flexShrink: 0 }} />
        </h3>
        
        <p style={{
          color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.6, fontFamily: TYPOGRAPHY.fontBody, margin: 0, paddingBottom: 0
        }}>
          {desc}
        </p>

        {children}
      </div>
    </div>
  );
}
