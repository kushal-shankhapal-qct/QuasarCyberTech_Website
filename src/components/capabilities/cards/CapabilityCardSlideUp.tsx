import React from 'react';
import { Link } from 'react-router-dom';
import { CapabilityCardShell } from './CapabilityCardShell';
import { COLORS, SHADOWS, LAYOUT_CONTROLS } from '../../../config/themeConfig';
import type { UnifiedCapabilityCardProps } from './CapabilityCardSwitcher';
import { capabilitiesData } from '../../../data/capabilitiesData';

const CARD_ROUNDNESS = '20px';

export default function CapabilityCardSlideUp(props: UnifiedCapabilityCardProps) {
  const accentColor = props.theme === 'burgundy' ? COLORS.burgundy : COLORS.teal;
  
  // Lookup sub-services dynamically from capabilitiesData
  const slug = props.href.split('/').pop();
  const fullData = capabilitiesData.find(c => c.slug === slug);
  const bullets = fullData?.services.slice(0, 3).map(s => s.name) || ['Service 1', 'Service 2', 'Service 3'];

  return (
    <Link
      to={props.href}
      className="capability-card group slide-up-triggers"
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transform: `scale(${LAYOUT_CONTROLS.card.capabilityCardScale})`,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        height: '100%',
        minHeight: '400px',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.0)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
        
        const shell = e.currentTarget.querySelector('.card-shell-container') as HTMLElement;
        if (shell) {
          shell.style.borderLeftColor = '#D6B05C';
          shell.style.borderTopColor = '#D6B05C';
        }

        const arrow = e.currentTarget.querySelector('.inline-arrow-icon') as HTMLElement;
        if (arrow) {
          arrow.style.transform = 'translateX(5px)';
          arrow.style.color = '#D6B05C';
        }

        const slidePanel = e.currentTarget.querySelector('.card-slide-panel') as HTMLElement;
        if (slidePanel) {
          slidePanel.style.maxHeight = '120px';
          slidePanel.style.opacity = '1';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `translateY(0) scale(${LAYOUT_CONTROLS.card.capabilityCardScale})`;
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        
        const shell = e.currentTarget.querySelector('.card-shell-container') as HTMLElement;
        if (shell) {
          shell.style.borderLeftColor = accentColor;
          shell.style.borderTopColor = accentColor;
        }

        const arrow = e.currentTarget.querySelector('.inline-arrow-icon') as HTMLElement;
        if (arrow) {
          arrow.style.transform = 'translateX(0px)';
          arrow.style.color = accentColor; // Wait, arrow default color should match the border accent
        }

        const slidePanel = e.currentTarget.querySelector('.card-slide-panel') as HTMLElement;
        if (slidePanel) {
          slidePanel.style.maxHeight = '0px';
          slidePanel.style.opacity = '0';
        }
      }}
    >
      <CapabilityCardShell {...props}>
        {/* Slide-Up Panel explicit DOM */}
        <div className="card-slide-panel" style={{
          maxHeight: 0,
          overflow: 'hidden',
          opacity: 0,
          transition: 'max-height 0.35s ease, opacity 0.25s ease',
          margin: '0 -20px 0 -20px',  // stretch across the card horizontal padding (which is 20px)
          background: 'rgba(107, 21, 48, 0.08)',
          borderTop: '1px solid rgba(107, 21, 48, 0.15)',
        }}>
          <div style={{ padding: '10px 0 4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '2px 0' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6B1530', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </CapabilityCardShell>
    </Link>
  );
}
