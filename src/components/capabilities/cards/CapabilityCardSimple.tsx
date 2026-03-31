import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../../../config/themeConfig';

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

export interface CapabilityCardSimpleProps {
  title: string;
  desc: string;
  img: string;
  href: string;
  bullets?: string[];
}

export default function CapabilityCardSimple({ title, desc, img, href, bullets }: CapabilityCardSimpleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = isHovered ? COLORS.gold : COLORS.burgundy;

  return (
    <Link 
      to={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: '#ffffff',
        borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
        boxShadow: isHovered ? '0 12px 32px rgba(11,31,59,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        overflow: 'hidden',
        zIndex: isHovered ? 1 : 0,
        position: 'relative',
        height: '100%',
      }}
    >
      {/* ─── ACCENT LINE (Full height) ─── */}
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

      <div style={{ height: '210px', overflow: 'hidden', borderRadius: `0 ${CARD_ROUNDNESS} 0 0`, flexShrink: 0 }}>
        <img 
          src={img} 
          alt={title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: isHovered ? 'scale(1.04)' : 'scale(1.0)',
            transition: 'transform 0.4s ease'
          }} 
        />
      </div>
      <div style={{ 
        padding: LAYOUT_CONTROLS.card.capabilityBodyPadding,
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        background: '#ffffff',
        borderRadius: `0 0 ${CARD_ROUNDNESS} 0`
      }}>
        <h3 style={{
          color: '#0B1F3B',
          fontWeight: 700,
          fontSize: '17px',
          lineHeight: 1.3,
          fontFamily: TYPOGRAPHY.fontHeading,
          margin: '0 0 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {title}
          <ArrowRight 
            size={14} 
            color={accentColor}
            style={{ 
              transform: isHovered ? 'translateX(5px)' : 'translateX(0)', 
              transition: 'color 0.2s ease, transform 0.2s ease',
              marginLeft: '8px',
              flexShrink: 0
            }} 
          />
        </h3>
        <p style={{
          color: '#475569',
          fontSize: '0.875rem',
          lineHeight: 1.55,
          fontFamily: TYPOGRAPHY.fontBody,
          margin: '0 0 10px 0',
        }}>
          {desc}
        </p>

        {bullets && bullets.length > 0 && (
          <div style={{ 
            marginTop: 'auto',
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}>
            {bullets.slice(0, 4).map((bullet, i) => (
              <span key={i} style={{
                fontSize: '11px',
                fontWeight: 600,
                color: COLORS.burgundy,
                background: 'rgba(107,21,48,0.05)',
                padding: '4px 10px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}>
                {bullet}
              </span>
            ))}
            {bullets.length > 4 && (
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center' }}>
                +{bullets.length - 4} more
              </span>
            )}
          </div>
        )}

      </div>
    </Link>
  );
}
