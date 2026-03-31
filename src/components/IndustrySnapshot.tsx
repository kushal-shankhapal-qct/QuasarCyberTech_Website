import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

export default function IndustrySnapshot() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ 
      background: '#F5F7FA', 
      backgroundImage: `repeating-linear-gradient(135deg, rgba(43,196,182,0.035) 0px, rgba(43,196,182,0.035) 1px, transparent 1px, transparent 56px)`,
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px', fontFamily: TYPOGRAPHY.fontHeading }}>
          Industries We <span style={{ color: COLORS.burgundy }}>Secure</span>
        </h2>
        <p style={{ ...TYPOGRAPHY.bodyLarge, color: COLORS.textSub, maxWidth: '760px', lineHeight: '1.7', textAlign: 'justify', margin: '0 0 48px 0' }}>
          Cybersecurity expertise tailored to the risk landscape of modern digital industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesData.map((industry, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <Link 
                key={industry.name} 
                to={`/industries/${industry.slug}`}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  borderRadius: `0 0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS}`,
                  borderTop: `4px solid ${isHovered ? COLORS.gold : COLORS.burgundy}`,
                  boxShadow: isHovered ? '0 12px 32px rgba(11,31,59,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                  overflow: 'hidden',
                  zIndex: isHovered ? 1 : 0,
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card body (Now on Top) */}
                <div style={{ padding: '24px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
                  <h3 style={{
                    color: '#0B1F3B',
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: 1.3,
                    fontFamily: TYPOGRAPHY.fontHeading,
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {industry.name}
                    <ArrowRight 
                      size={14} 
                      color={isHovered ? COLORS.gold : COLORS.burgundy}
                      style={{ 
                        transform: isHovered ? 'translateX(5px)' : 'translateX(0)', 
                        transition: 'all 0.22s ease',
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
                    flex: 1
                  }}>
                    {industry.description}
                  </p>
                </div>

                {/* Photo area (Now on Bottom) */}
                <div style={{ height: '210px', overflow: 'hidden', position: 'relative', borderRadius: `0 0 ${CARD_ROUNDNESS} ${CARD_ROUNDNESS}` }}>
                  <img 
                    src={industry.image} 
                    alt={industry.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.4s ease',
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)'
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link 
            to="/industries"
            style={{
              background: COLORS.burgundy,
              color: '#FFFFFF',
              padding: '12px 28px', 
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px', 
              transition: 'background 0.2s ease',
              boxShadow: '0 4px 12px rgba(107,15,43,0.2)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#8B1439'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.burgundy; }}
          >
            Explore All Industry Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
