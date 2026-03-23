import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS } from '../../../config/themeConfig';
import { capabilitiesData } from '../../../data/capabilitiesData';
import type { UnifiedCapabilityCardProps } from './CapabilityCardSwitcher';
import { CapabilityCardShell } from './CapabilityCardShell';

const CARD_ROUNDNESS = '20px';

export default function CapabilityCardFlip(props: UnifiedCapabilityCardProps) {
  const { title, href, index, theme = 'teal' } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const accentColor = theme === 'burgundy' ? COLORS.burgundy : COLORS.teal;

  const slug = href.split('/').pop();
  const fullData = capabilitiesData.find(c => c.slug === slug);
  const bullets = fullData?.services.slice(0, 3).map(s => s.name) || ['Service 1', 'Service 2', 'Service 3'];

  return (
    <div
      className="flip-card-container"
      style={{ perspective: '1200px', height: '100%', minHeight: '400px', cursor: 'pointer' }}
      onMouseEnter={e => {
        setIsFlipped(true);
        const arrow = e.currentTarget.querySelector('.inline-arrow-icon') as HTMLElement;
        if (arrow) {
          arrow.style.transform = 'translateX(5px)';
          arrow.style.color = '#D6B05C';
        }
        const shell = e.currentTarget.querySelector('.card-shell-container') as HTMLElement;
        if (shell) {
          shell.style.borderLeftColor = '#D6B05C';
          shell.style.borderTopColor = '#D6B05C';
        }
      }}
      onMouseLeave={e => {
        setIsFlipped(false);
        const arrow = e.currentTarget.querySelector('.inline-arrow-icon') as HTMLElement;
        if (arrow) {
          arrow.style.transform = 'translateX(0px)';
          arrow.style.color = accentColor;
        }
        const shell = e.currentTarget.querySelector('.card-shell-container') as HTMLElement;
        if (shell) {
          shell.style.borderLeftColor = accentColor;
          shell.style.borderTopColor = accentColor;
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT FACE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
        }}>
          <CapabilityCardShell {...props} />
        </div>

        {/* BACK FACE */}
        <Link to={href} style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          background: '#1A0A10',
          border: '1px solid rgba(214, 176, 92, 0.20)',
          borderLeft: isFlipped ? '4px solid #D6B05C' : `4px solid #6B1530`,
          borderTop: '3px solid #6B1530',
          borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
          transform: 'rotateY(180deg)',
          padding: '28px 24px 24px',
          textDecoration: 'none',
          transition: 'border-left-color 0.22s ease'
        }}>
          <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '17px', lineHeight: 1.3, marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {title}
            <ArrowRight size={14} style={{ color: '#D6B05C', transform: isFlipped ? 'translateX(5px)' : 'translateX(0)', transition: 'transform 0.22s ease' }} />
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid rgba(214, 176, 92, 0.08)' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6B1530', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#D6B05C', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Explore Capability <ArrowRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
