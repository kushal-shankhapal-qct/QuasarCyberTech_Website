import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS, ALPHAS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';
import CapabilitiesHeroRight from '../components/capabilities/hero/CapabilitiesHeroRight';
import CapabilityCardSwitcher from '../components/capabilities/cards/CapabilityCardSwitcher';

// Capability Photos
import imgAdvisory from "../assets/capabilities/Cyber Advisory & Risk Governance.jpg";
import imgCompliance from "../assets/capabilities/Compliance & Regulatory Assurance.jpg";
import imgOffensive from "../assets/capabilities/Offensive Security Engineering.jpg";
import imgCloud from "../assets/capabilities/Cloud & Infrastructure Security.jpg";
import imgManagedDefense from "../assets/capabilities/Managed Defense Operations_2.jpeg";
import imgIntelligence from "../assets/capabilities/Cyber Intelligence & Security Research.webp";


// 
const capPhotos = [imgAdvisory, imgCompliance, imgOffensive, imgCloud, imgManagedDefense, imgIntelligence];

const ServicesOverview: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />

      {/* ─── SECTION 1: HERO (Two Column) ─── */}
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
          alignItems: 'flex-end',
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
              position: 'absolute',
              top: LAYOUT_CONTROLS.breadcrumbs.top,
              left: LAYOUT_CONTROLS.breadcrumbs.left,
              fontSize: '12px',
              fontFamily: TYPOGRAPHY.fontBody,
              zIndex: 10,
            }}>
              <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
              <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Capabilities</span>
            </div>

            <h1 style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              marginBottom: '28px',
            }}>
              Our Core <span style={{ color: COLORS.gold }}>Capabilities</span>
            </h1>
            <p style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px',
            }}>
              QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
            </p>

            <div style={{ display: 'flex' }}>
              <Link to="/contact" style={{ 
                ...TYPOGRAPHY.buttonLarge,
                background: COLORS.burgundy, 
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

          {/* Right Column — SVC Variants (Controlled by Dev Toggles) */}
          <CapabilitiesHeroRight />
        </div>
      </section>

      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
        <section id="pillars" style={{
          background: '#F5F7FA',
          backgroundImage: `repeating-linear-gradient(
            135deg,
            rgba(107, 21, 48, 0.04) 0px,
            rgba(107, 21, 48, 0.04) 1px,
            transparent 1px,
            transparent 56px
          )`,
          padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: TYPOGRAPHY.fontHeading,
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                color: '#0B1F3B',
                marginBottom: '16px',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}>
                Cybersecurity <span style={{ color: '#6B1530' }}>Capabilities</span>
              </h2>
              <p style={{
                color: COLORS.textSub,
                fontSize: '1.125rem',
                maxWidth: '600px',
                lineHeight: 1.6,
                fontFamily: TYPOGRAPHY.fontBody
              }}>
                Full-spectrum protection designed for the modern digital enterprise.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginTop: '64px' }}>
              {capabilitiesData.map((cap, i) => {
                return (
                  <CapabilityCardSwitcher 
                    key={cap.slug}
                    title={cap.name}
                    desc={cap.description}
                    href={`/capabilities/${cap.slug}`}
                    img={capPhotos[i]}
                    index={i}
                    theme="burgundy"
                  />
                );
              })}
            </div>
          </div>
        </section>

        <CTASection showMetrics={false} theme="dark" />
        <Footer />
      </div>
    </div>
  );
};

export default ServicesOverview;