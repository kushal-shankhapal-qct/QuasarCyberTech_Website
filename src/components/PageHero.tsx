import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';

interface PageHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  category: string;
  categoryHref: string;
  currentName?: string;
  imageKeyword?: string;
  isOverview?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  highlight,
  subtitle,
  category,
  categoryHref,
  currentName,
  imageKeyword,
  isOverview = false,
}) => {
  return (
    <section
      style={{
        minHeight: isOverview ? '80vh' : '100vh',
        background: GRADIENTS.HERO_BG,
        display: 'flex',
        alignItems: 'center',
        padding: '160px 2.5em 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', gap: '80px', alignItems: 'center' }}>
        {/* Left Column (60%) */}
        <div style={{ flex: imageKeyword ? '0 0 60%' : '1 1 auto', maxWidth: imageKeyword ? 'auto' : '800px' }}>
          
          {/* Breadcrumb - SIT INSIDE hero content at top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontSize: '12px',
            fontFamily: TYPOGRAPHY.fontBody,
          }}>
            <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
            <Link to={categoryHref} style={{ color: COLORS.textMuted, textDecoration: 'none' }}>{category}</Link>
            {currentName && (
              <>
                <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{currentName}</span>
              </>
            )}
          </div>

          <h1 style={{ 
            color: COLORS.textOnDark, 
            fontWeight: 800, 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            lineHeight: 1.05, 
            marginBottom: '28px', 
            letterSpacing: '-0.03em',
            fontFamily: TYPOGRAPHY.fontHeading
          }}>
            {title} <span style={{ color: COLORS.teal }}>{highlight}</span>
          </h1>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.75)', 
            fontSize: '18px', 
            lineHeight: 1.6, 
            maxWidth: '560px', 
            marginBottom: '48px',
            fontFamily: TYPOGRAPHY.fontBody
          }}>
            {subtitle}
          </p>

          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to={isOverview ? "#pillars" : categoryHref} style={{ 
              background: 'transparent', 
              border: `1px solid ${COLORS.burgundy}`, 
              color: COLORS.gold, 
              padding: '14px 34px', 
              borderRadius: '4px', 
              fontWeight: 700, 
              fontSize: '12px', 
              textDecoration: 'none', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em' 
            }}>
              {isOverview ? "Explore Services" : "Explore Related"}
            </Link>
            <Link to="/contact" style={{ 
              background: COLORS.burgundy, 
              color: '#FFFFFF', 
              padding: '14px 34px', 
              borderRadius: '4px', 
              fontWeight: 700, 
              fontSize: '12px', 
              textDecoration: 'none', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em' 
            }}>
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Right Column (Placeholder Image Zone) */}
        {imageKeyword && (
          <div style={{ 
            flex: '0 0 40%', 
            height: isOverview ? '360px' : '380px',
            position: 'relative',
            borderRadius: '0 0 24px 24px',
            borderTop: `4px solid ${COLORS.burgundy}`,
            background: 'rgba(255,255,255,0.03)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.15)', 
              fontSize: '11px', 
              fontWeight: 600, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              padding: '40px'
            }}>
              [{imageKeyword}]
              <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.5 }}>
                TREATMENT: BRIGHTNESS(0.6) SATURATE(0.65) + RGBA(4,11,29,0.4) OVERLAY
              </div>
            </div>
            
            {/* Scrim Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(4, 11, 29, 0.4)',
              mixBlendMode: 'multiply'
            }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
