import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY, LAYOUT_CONTROLS } from '../../../config/themeConfig';

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

export interface CapabilityCardSimpleProps {
  title: string;
  desc: string;
  img: string;
  href: string;
}

export default function CapabilityCardSimple({ title, desc, img, href }: CapabilityCardSimpleProps) {
  const [isHovered, setIsHovered] = useState(false);

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
        borderLeft: `4px solid ${isHovered ? '#D6B05C' : '#6B1530'}`,
        boxShadow: isHovered ? '0 12px 32px rgba(11,31,59,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.22s ease',
        overflow: 'hidden',
        zIndex: isHovered ? 1 : 0,
        position: 'relative',
        // removed minHeight per user request
      }}
    >
      <div style={{ height: '210px', overflow: 'hidden', borderRadius: `0 ${CARD_ROUNDNESS} 0 0` }}>
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
        padding: '18px 20px 16px', 
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
          margin: '0 0 8px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {title}
          <ArrowRight 
            size={14} 
            color={isHovered ? '#D6B05C' : '#6B1530'}
            style={{ 
              transform: isHovered ? 'translateX(5px)' : 'translateX(0)', 
              transition: 'color 0.2s ease, transform 0.2s ease',
              marginLeft: '8px',
              flexShrink: 0
            }} 
          />
        </h3>
        <p style={{
          color: '#4a5568',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          fontFamily: TYPOGRAPHY.fontBody,
          margin: 0,
          paddingBottom: 0
        }}>
          {desc}
        </p>
      </div>
    </Link>
  );
}
