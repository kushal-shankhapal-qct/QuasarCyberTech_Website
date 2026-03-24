import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../../../config/themeConfig';
import { capabilitiesData } from '../../../data/capabilitiesData';
import type { UnifiedCapabilityCardProps } from './CapabilityCardSwitcher';
import { CapabilityCardShell } from './CapabilityCardShell';

const CARD_CONFIG = {
  flipDuration: '0.45s', 
  flipTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
  roundness: LAYOUT_CONTROLS.card.capabilityCardRadius
};

export default function CapabilityCardFlip(props: UnifiedCapabilityCardProps) {
  const { title, href, theme = 'burgundy' } = props;
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = theme === 'burgundy' ? COLORS.burgundy : COLORS.teal;
  
  // Hover color: Gold (Yellow)
  const activeColor = isHovered ? COLORS.gold : accentColor;

  const slug = href.split('/').pop();
  const fullData = capabilitiesData.find(c => c.slug === slug);
  const bullets = fullData?.services.slice(0, 3).map(s => s.name) || ['Service 1', 'Service 2', 'Service 3'];

  return (
    <div
      className="flip-card-container"
      style={{ 
        perspective: '1200px', 
        height: '100%', 
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: `transform ${CARD_CONFIG.flipDuration} ${CARD_CONFIG.flipTiming}`,
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT FACE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          zIndex: 2,
          background: '#FFFFFF',
          borderRadius: `0 ${CARD_CONFIG.roundness} ${CARD_CONFIG.roundness} 0`,
          boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          {/* Accent Line front */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: activeColor, zIndex: 10, transition: 'background 0.3s ease' }} />
          <CapabilityCardShell {...props} theme={isHovered ? 'burgundy' : theme} isHovered={isHovered} />
        </div>

        {/* BACK FACE */}
        <Link to={href} style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          background: COLORS.darkBase,
          // ROUND LEFT, SQUARE RIGHT (on mirror side)
          borderRadius: `${CARD_CONFIG.roundness} 0 0 ${CARD_CONFIG.roundness}`,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          transform: 'rotateY(180deg)',
          padding: '18px 20px 16px', 
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}>
          {/* Accent Line back (Right side on flip) */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', background: activeColor, zIndex: 10, transition: 'background 0.3s ease' }} />

          <h3 style={{ 
            color: '#ffffff', 
            fontWeight: 700, 
            fontSize: '17px', 
            lineHeight: 1.3, 
            marginBottom: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontFamily: TYPOGRAPHY.fontHeading
          }}>
            {title}
            <ArrowRight size={14} style={{ color: COLORS.gold, transform: isHovered ? 'translateX(5px)' : 'translateX(0)', transition: 'transform 0.22s ease' }} />
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: activeColor, marginTop: '7px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, fontFamily: TYPOGRAPHY.fontBody }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: COLORS.gold, 
            fontSize: '0.8rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            Explore Capability <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
}
