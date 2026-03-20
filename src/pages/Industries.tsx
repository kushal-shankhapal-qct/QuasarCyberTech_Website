import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldAlert, Bug, Eye, Cloud, Zap, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS, TYPOGRAPHY } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const IndustriesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />

      {/* ─── SECTION 1: HERO (Two Column) ─── */}
      <section
        style={{
          background: GRADIENTS.HERO_BG,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Anchor content to bottom
          alignItems: 'flex-start',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          paddingBottom: '3em',
          paddingTop: '0em',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100%',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
          boxSizing: 'border-box',
          zIndex: 2
        }} className="hero-columns-container">
          <style>{`
            @media (max-width: 1024px) {
              .hero-columns-container { flex-direction: column !important; align-items: flex-start !important; }
              .constellation-wrapper { margin-top: 100px !important; margin-left: 0 !important; transform: scale(0.8) !important; align-self: center !important; }
            }
          `}</style>

          {/* Left Column */}
          <div style={{ maxWidth: '720px' }}>
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
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Industries We Secure</span>
            </div>

            <h1 style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              marginBottom: '28px',
            }}>
              Industries We <span style={{ color: COLORS.gold }}>Secure</span>
            </h1>
            <p style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px',
            }}>
              QuasarCyberTech provides deep cybersecurity expertise tailored to the unique risk landscape of modern digital industries, from BFSI to Industrial OT.
            </p>

            <div style={{ display: 'flex', gap: '18px' }}>
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
                Talk to a Security Expert
              </Link>
            </div>
          </div>

          {/* Right Column — Industry Grid (Refined) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 170px)',
            gap: '12px',
            paddingTop: '32px'
          }}>
            {industriesData.map((ind) => (
              <div key={ind.slug} style={{
                width: '170px',
                position: 'relative',
                overflow: 'hidden',
                borderLeft: `3px solid ${COLORS.gold}`,
                borderRadius: '0 12px 12px 0',
                background: '#040B1D',
                cursor: 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                  e.currentTarget.style.borderLeftColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.borderLeftColor = COLORS.gold;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Image Top */}
                <div style={{ height: '90px', width: '100%', overflow: 'hidden' }}>
                  <img src={ind.image} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Name Below */}
                <div style={{
                  background: COLORS.burgundy,
                  padding: '10px 12px',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {ind.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INDUSTRIES GRID (LIGHT) ─── */}
      <section id="grid" style={{
        background: SECTION_BACKGROUNDS.LIGHT,
        backgroundImage: `
          linear-gradient(rgba(11, 31, 59, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(11, 31, 59, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        padding: '120px 2.5em'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="SECTORS WE SERVE"
            title="Across Every Industry"
            highlight="Cybersecurity"
            subtitle="Deep domain knowledge in securing complex digital ecosystems."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
                style={{
                  borderRadius: '0 0 16px 16px',
                  borderTop: `3px solid ${COLORS.teal}`,
                  background: COLORS.cardOnLight,
                  boxShadow: SHADOWS.lightCard,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
                  e.currentTarget.style.borderTopColor = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  
                  const explore = e.currentTarget.querySelector('.ind-explore') as HTMLAnchorElement;
                  if (explore) explore.style.color = COLORS.burgundy;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.lightCard;
                  e.currentTarget.style.borderTopColor = COLORS.teal;
                  e.currentTarget.style.transform = 'translateY(0)';
                  
                  const explore = e.currentTarget.querySelector('.ind-explore') as HTMLAnchorElement;
                  if (explore) explore.style.color = COLORS.teal;
                }}
              >
                {/* Image Zone */}
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={ind.image}
                    alt={ind.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  {/* Brand tint overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, rgba(107,15,43,0.15) 0%, rgba(11,31,59,0.25) 100%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '20px', marginBottom: '12px', fontFamily: TYPOGRAPHY.fontHeading }}>
                    {ind.name}
                  </h3>
                  <p style={{ color: COLORS.textSub, fontSize: '15.5px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {ind.description}
                  </p>
                  
                  {/* Action at the bottom */}
                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(11,31,59,0.05)' }}>
                    <Link 
                      className="ind-explore"
                      to={`/industries/${ind.slug}`} 
                      style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 600, 
                        color: COLORS.teal, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.04em',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        textDecoration: 'none',
                        width: 'fit-content',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.transform = 'translateX(0)';
                      }}
                    >
                      Explore Industry <ArrowRight size={16} style={{ transition: 'transform 0.3s ease' }} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <CTASection showMetrics={false} showEyebrow={false} />
      <Footer />
    </div>
  );
};

export default IndustriesOverview;
