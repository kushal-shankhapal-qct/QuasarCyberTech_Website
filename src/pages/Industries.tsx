import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const CARD_ROUNDNESS = LAYOUT_CONTROLS.card.capabilityCardRadius;

const IndustriesOverview: React.FC = () => {
  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />

      {/* ─── SECTION 1: HERO (Dark System) ─── */}
      <section
        style={{
          background: GRADIENTS.HERO_BG,
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '52% 48%',
          alignItems: 'end',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: TYPOGRAPHY.fontBody
        }}
      >
        {/* Breadcrumbs - Relative to section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'absolute',
          top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY})`,
          left: `calc(${LAYOUT_CONTROLS.breadcrumbs.left} + ${LAYOUT_CONTROLS.breadcrumbs.offsetX})`,
          fontSize: '12px',
          fontFamily: TYPOGRAPHY.fontBody,
          zIndex: 10,
        }}>
          <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
          <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Industries We Secure</span>
        </div>

        {/* Left Column (Text Content) */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10,
          paddingLeft: '2.5em',
          paddingBottom: '3em'
        }}>
          <motion.h1 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              marginBottom: '28px',
            }}
          >
            Industries We <span style={{ color: COLORS.gold }}>Secure</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'left',
              maxWidth: '100%', 
              marginBottom: '42px',
              lineHeight: 1.8
            }}
          >
            QuasarCyberTech provides deep cybersecurity expertise tailored to the unique risk landscape of modern digital industries, from BFSI to Industrial OT.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: 'flex', gap: '18px' }}
          >
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
          </motion.div>
        </div>

        {/* Right Column (Visual) */}
        <div style={{
            position: 'relative',
            height: '100vh',
            maskImage: `
                linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
                linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskImage: `
                linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
                linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskComposite: 'destination-in',
            maskComposite: 'intersect'
        }}>
            <img
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                alt="Industries We Secure"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8,
                    filter: 'brightness(0.9)'
                }}
            />
        </div>
      </section>

      {/* ─── SECTION 2: INDUSTRIES GRID (LIGHT) ─── */}
      <section id="grid" style={{
        background: SECTION_BACKGROUNDS.LIGHT,
        padding: '120px 2.5em'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader
            title="Across Every"
            highlight="Industry"
            subtitle="Deep domain knowledge in securing complex digital ecosystems."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {industriesData.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                style={{
                  borderRadius: `0 0 4px 4px`,
                  borderTop: `4px solid ${COLORS.burgundy}`,
                  background: '#ffffff',
                  boxShadow: SHADOWS.lightCard,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
                  e.currentTarget.style.borderTopColor = COLORS.gold;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.lightCard;
                  e.currentTarget.style.borderTopColor = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Photo area */}
                <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={ind.image}
                    alt={ind.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Body */}
                <div style={{ 
                  padding: '24px 24px 20px', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  <h3 style={{ 
                    color: '#0B1F3B', 
                    fontWeight: 700, 
                    fontSize: '17px', 
                    marginBottom: '8px', 
                    fontFamily: TYPOGRAPHY.fontHeading,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {ind.name}
                    <ArrowRight size={14} color={COLORS.burgundy} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {ind.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      <CTASection theme="dark" showMetrics={false} showEyebrow={false} />
      <Footer />
    </div>
  );
};

export default IndustriesOverview;
