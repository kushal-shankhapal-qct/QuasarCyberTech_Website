import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

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
        minHeight: isOverview ? '85vh' : '100vh',
        background: GRADIENTS.HERO_BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Anchor content to bottom
        alignItems: 'flex-start',
        paddingLeft: '2.5em',
        paddingRight: '2em',
        paddingBottom: '3em',
        paddingTop: '0em',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody,
      }}
    >
      <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        {/* Left Column Content */}
        <div style={{ width: '100%' }}>
          
          {/* Breadcrumb - SIT INSIDE hero content at top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'absolute',
            top: LAYOUT_CONTROLS.breadcrumbs.top,
            left: LAYOUT_CONTROLS.breadcrumbs.left,
            fontSize: '12px',
            fontFamily: TYPOGRAPHY.fontBody,
            zIndex: 10,
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
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark, 
            marginBottom: '28px', 
          }}>
            {title} <span style={{ color: COLORS.teal }}>{highlight}</span>
          </h1>
          
          <p style={{ 
            ...TYPOGRAPHY.bodyLarge,
            color: 'rgba(255,255,255,0.76)', 
            textAlign: 'justify',
            maxWidth: '100%', 
            marginBottom: '42px',
          }}>
            {subtitle}
          </p>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <Link to={isOverview ? "#pillars" : categoryHref} style={{ 
              ...TYPOGRAPHY.buttonLarge,
              background: 'transparent', 
              color: '#FFFFFF',
              border: `1px solid #6B1530`, 
              borderRadius: '4px', 
              padding: '14px 34px', 
              textDecoration: 'none', 
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)', 
            }}>
              {isOverview ? "Explore Services" : "Explore Related"}
            </Link>
            <Link to="/contact" style={{ 
              ...TYPOGRAPHY.buttonLarge,
              background: '#6B1530', 
              color: '#FFFFFF', 
              border: '1px solid transparent',
              padding: '14px 34px', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)', 
            }}>
              Talk to an Expert
            </Link>
          </div>
        </div>

      </div>

      {/* Right-side Graphic Zone (Floating absolute to keep text aligned to left margin) */}
      {imageKeyword && (
        <div
          style={{
            position: 'absolute',
            right: '2em',
            bottom: '3em',
            width: 'min(40vw, 420px)',
            height: isOverview ? '360px' : '380px',
            borderRadius: '0 0 24px 24px',
            borderTop: `4px solid #6B1530`,
            background: 'rgba(255,255,255,0.03)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            zIndex: 0
          }}
        >
          <div style={{ 
            textAlign: 'center', 
            color: 'rgba(255,255,255,0.15)', 
            fontSize: '11px', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            padding: '40px',
            position: 'relative',
            zIndex: 2
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
            mixBlendMode: 'multiply',
            zIndex: 1
          }} />
        </div>
      )}
    </section>
  );
};

export default PageHero;
