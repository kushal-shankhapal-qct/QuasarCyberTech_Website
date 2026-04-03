import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../../../config/themeConfig';

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

export interface CapabilityCardSimpleProps {
  title: string;
  mobileTitle?: string;
  desc: string;
  img: string;
  href: string;
  bullets?: string[];
}

export default function CapabilityCardSimple({ title, mobileTitle, desc, img, href, bullets }: CapabilityCardSimpleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = isHovered ? COLORS.gold : COLORS.burgundy;

  return (
    <Link 
      to={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="capability-card-simple"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: '#ffffff',
        borderRadius: `0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS} 0`,
        boxShadow: isHovered ? '0 0.75rem 2rem rgba(11,31,59,0.12)' : '0 0.25rem 0.75rem rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-0.25rem)' : 'translateY(0)',
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
        width: '0.25rem', // 4px
        background: accentColor,
        zIndex: 10,
        transition: 'background 0.3s ease'
      }} />

      <div
        className="capability-card-media"
        style={{ height: '13.125rem', overflow: 'hidden', borderRadius: `0 ${CARD_ROUNDNESS} 0 0`, flexShrink: 0 }}
      >
        <img 
          src={img} 
          alt={`QuasarCyberTech | ${title}`} 
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
      <div
        className="capability-card-content"
        style={{ 
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
          fontSize: '1.0625rem', // 17px
          lineHeight: 1.3,
          fontFamily: TYPOGRAPHY.fontHeading,
          margin: '0 0 0.625rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <>
            <span className="capability-card-title-desktop">{title}</span>
            <span className="capability-card-title-mobile">{mobileTitle || title}</span>
          </>
          <ArrowRight 
            size={14} 
            color={accentColor}
            style={{ 
              transform: isHovered ? 'translateX(0.3125rem)' : 'translateX(0)', 
              transition: 'color 0.2s ease, transform 0.2s ease',
              marginLeft: '0.5rem',
              flexShrink: 0
            }} 
          />
        </h3>
        <p 
          className="capability-card-desc"
          style={{
            color: '#475569',
            fontSize: '0.875rem',
            lineHeight: 1.55,
            fontFamily: TYPOGRAPHY.fontBody,
            margin: '0 0 0.625rem 0',
          }}>
          {desc}
        </p>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .capability-card-title-mobile {
              display: none;
            }

            @media (max-width: 640px) {
              .capability-card-simple {
                height: 16rem !important;
              }

              .capability-card-media {
                height: 50% !important;
              }

              .capability-card-content {
                height: 50% !important;
                justify-content: center !important;
              }

              .capability-card-title-desktop {
                display: none !important;
              }

              .capability-card-title-mobile {
                display: inline !important;
              }

              .capability-card-desc {
                display: none !important;
              }
            }
          `,
          }}
        />

        {bullets && bullets.length > 0 && (
          <div style={{ 
            marginTop: 'auto',
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem',
            paddingTop: '0.75rem',
            borderTop: '0.0625rem solid rgba(0,0,0,0.05)'
          }}>
            {bullets.slice(0, 4).map((bullet, i) => (
              <span key={i} style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: COLORS.burgundy,
                background: 'rgba(107,21,48,0.05)',
                padding: '0.25rem 0.625rem',
                borderRadius: '0.25rem',
                whiteSpace: 'nowrap'
              }}>
                {bullet}
              </span>
            ))}
            {bullets.length > 4 && (
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center' }}>
                +{bullets.length - 4} more
              </span>
            )}
          </div>
        )}

      </div>
    </Link>
  );
}
