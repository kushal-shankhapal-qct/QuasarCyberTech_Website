import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Zap,
  MoveRight,
  ArrowRight
} from 'lucide-react';
import {
  COLORS,
  GRADIENTS,
  TYPOGRAPHY,
  LAYOUT_CONTROLS
} from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

// Photo Imports for Hero
import imgAdvisory from "../assets/capabilities/Cyber Advisory & Risk Governance.jpg";
import imgCompliance from "../assets/capabilities/Compliance & Regulatory Assurance.jpg";
import imgOffensive from "../assets/capabilities/Offensive Security Engineering.jpg";
import imgCloud from "../assets/capabilities/Cloud & Infrastructure Security.jpg";
import imgManagedDefense from "../assets/capabilities/Managed Defense Operations_2.jpeg";
import imgIntelligence from "../assets/capabilities/Cyber Intelligence & Security Research.webp";

// SVG/PNG Logos
import qStellarLogo from "../assets/logos copy/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png";
import qStellarScreenshot from "../assets/Logos/Screenshots/QStellar/Screenshot 2026-03-03 124533.png";


const heroImages: Record<string, string> = {
  'cyber-advisory-risk-governance': imgAdvisory,
  'compliance-regulatory-assurance': imgCompliance,
  'offensive-security-engineering': imgOffensive,
  'cloud-infrastructure-security': imgCloud,
  'managed-defense-operations': imgManagedDefense,
  'cyber-intelligence-security-research': imgIntelligence,
};

// Industry image mapping
const industryImages: Record<string, string> = {
  'banking': "/src/assets/industries/Banking_and_Financial Services.jpg",
  'fintech': "/src/assets/industries/FinTech & Digital Payments.jpg",
  'saas': "/src/assets/industries/SaaS_and_Technology Platforms.jpg",
  'ecommerce': "/src/assets/industries/E-commerce & Digital Platforms.jpg",
  'healthcare': "/src/assets/industries/Healthcare & HealthTech.png",
  'enterprise': "/src/assets/industries/Enterprise_and_Manufacturing.jpg",
};

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const capability = capabilitiesData.find(c => c.slug === slug);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!capability) {
    return <Navigate to="/capabilities" />;
  }

  const heroImage = heroImages[capability.slug];

  return (
    <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      <Header />

      {/* ─── SECTION 1: HERO (HOMEPAGE SYSTEM MATCH) ─── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          background: GRADIENTS.HERO_BG,
          overflow: 'hidden',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          paddingBottom: '3em',
          paddingTop: '0em',
          fontFamily: TYPOGRAPHY.fontBody,
        }}
      >
        {/* Breadcrumbs - Absolute Positioning Match */}
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
          <Link to="/capabilities" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Capabilities</Link>
          <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{capability.name}</span>
        </div>

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 10 }}>


          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              marginBottom: '28px',
            }}
          >
            {capability.name.split(' ').map((word, i) => (
              <span key={i}>
                {word.toLowerCase().startsWith('cyber') ? <span style={{ color: COLORS.gold }}>{word}</span> : word}
                {' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)',
              textAlign: 'left', // Hero text warp exactly 50 percent max
              maxWidth: '50%',
              marginBottom: '42px',
              lineHeight: 1.8
            }}
          >
            {capability.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}
          >
            <Link
              to="/contact"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#8B1E3F';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6B1530';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              style={{
                ...TYPOGRAPHY.buttonLarge,
                background: '#6B1530',
                color: '#FFFFFF',
                border: '1px solid transparent',
                borderRadius: '4px',
                padding: '14px 34px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              Connect with an Expert
            </Link>
          </motion.div>
        </div>

        {/* Hero Image Integration - Clean Sharp Mask */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50.5%', // Slightly more than half to cover enough space
          zIndex: 1,
          overflow: 'hidden'
        }}>
          {heroImage && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={heroImage}
                alt={capability.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95)' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 2: STRATEGIC SCOPE (ALIGNED PANEL) ─── */}
      <section style={{
        background: '#FFFFFF',
        padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'flex-start' }}>
            {/* Left Content (7-col) */}
            <div style={{ gridColumn: 'span 7' }}>
              <SectionHeader
                title="Strategic"
                highlight="Scope"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '10px' }}>
                {capability.overview.body.map((paragraph, i) => (
                  <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#475569' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>

            {/* Right Data Panel (5-col) - Moved Up */}
            <div style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '0px', // Removed 100px gap per user request
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
            }}>
              {capability.overview.proofPoints.map((point, i) => (
                <div key={i} style={{
                  background: '#F8FAFC',
                  padding: '28px 32px',
                  borderBottom: i < capability.overview.proofPoints.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                }}>
                  <div style={{ color: COLORS.gold, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {point.label}
                  </div>
                  <div style={{ color: '#040B1D', fontSize: '1.05rem', fontWeight: 700, marginTop: '8px', lineHeight: 1.4 }}>
                    {point.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SERVICE AREAS ─── */}
      <section style={{
        background: GRADIENTS.HERO_BG,
        padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px', textAlign: 'left' }}>
            <SectionHeader
              title="Service"
              highlight="Areas"
              isDark={true}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '64px', minHeight: '520px' }}>
            {/* Left Menu (Span 5) */}
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {capability.services.map((svc, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveServiceIndex(i)}
                  style={{
                    flex: 1,
                    padding: '16px 0', // Reduced from 24px
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'all 0.3s ease',
                    opacity: activeServiceIndex === i ? 1 : 0.35,
                    borderLeft: activeServiceIndex === i ? `2px solid ${COLORS.gold}` : '2px solid transparent',
                    paddingLeft: activeServiceIndex === i ? '20px' : '0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      color: activeServiceIndex === i ? COLORS.gold : 'rgba(255,255,255,0.5)',
                      fontWeight: 700
                    }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '0.95rem', // Scaled down further
                    fontWeight: 700,
                    textTransform: activeServiceIndex === i ? 'uppercase' : 'none',
                    letterSpacing: activeServiceIndex === i ? '0.05em' : 'normal',
                    margin: 0
                  }}>
                    {svc.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Right Visual Container */}
            <div style={{ gridColumn: 'span 7', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '2px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '420px' // Slightly reduced
                  }}
                >
                  {capability.services[activeServiceIndex]?.image && (
                    <img
                      src={capability.services[activeServiceIndex].image}
                      alt=""
                      style={{ width: '100%', height: '280px', objectFit: 'cover', opacity: 0.9 }} // Scaled down
                    />
                  )}
                  <div style={{ padding: '32px', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                      {capability.services[activeServiceIndex]?.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: DELIVERY APPROACH ─── */}
      <section style={{ background: '#FFFFFF', padding: `120px ${LAYOUT_CONTROLS.section.paddingX}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px', textAlign: 'left' }}>
            <SectionHeader title="Delivery" highlight="Approach" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '48px' }}>
            {capability.delivery.map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{ flex: 1, position: 'relative', textAlign: 'left' }}>
                  <div style={{
                    fontSize: '6rem', // Scaled down from 8rem
                    fontWeight: 900,
                    color: 'rgba(0,0,0,0.03)',
                    lineHeight: 1,
                    marginBottom: '24px',
                    fontFamily: TYPOGRAPHY.fontHeading
                  }}>
                    0{idx + 1}
                  </div>
                  <h4 style={{ color: '#0B1F3B', fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
                {idx < capability.delivery.length - 1 && (
                  <div style={{ paddingTop: '110px', color: 'rgba(0,0,0,0.08)' }}>
                    <MoveRight size={32} strokeWidth={1} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: PLATFORM INTEGRATION ─── */}
      <section style={{ background: GRADIENTS.HERO_BG, padding: `140px ${LAYOUT_CONTROLS.section.paddingX}`, overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 6' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                background: '#FFFFFF', 
                padding: '12px 24px', 
                borderRadius: '4px', 
                marginBottom: '40px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <img
                  src={qStellarLogo}
                  alt="QStellar"
                  style={{ height: '24px', display: 'block' }}
                />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '48px', maxWidth: '520px' }}>
                {capability.platformLink.body}
              </p>
              <Link to="/platforms#qstellar" style={{
                color: '#FFFFFF',
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: COLORS.burgundy,
                padding: '16px 42px',
                borderRadius: '4px',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B1F40';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore Platform
              </Link>
            </div>

            {/* Single Tilted Screenshot */}
            <div style={{ gridColumn: 'span 6', position: 'relative' }}>
              <div style={{
                width: '120%',
                marginLeft: '-10%',
                transform: 'perspective(1500px) rotateY(-15deg) rotateX(10deg) scale(1.1)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img src={qStellarScreenshot} alt="QStellar Platform UI" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: INDUSTRY APPLICATION ─── */}
      <section style={{ background: '#F8FAFC', padding: `120px ${LAYOUT_CONTROLS.section.paddingX}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px', textAlign: 'left' }}>
            <SectionHeader title="Industry" highlight="Application" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {capability.industries.map(ind => (
              <div key={ind.slug} style={{
                background: '#FFFFFF',
                borderRadius: `0 0 4px 4px`,
                borderTop: `4px solid ${COLORS.burgundy}`,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                position: 'relative'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
                  e.currentTarget.style.borderTopColor = COLORS.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderTopColor = COLORS.burgundy;
                }}
              >
                <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{
                    color: '#0B1F3B',
                    fontWeight: 700,
                    fontSize: '17px',
                    margin: '0 0 12px 0',
                    fontFamily: TYPOGRAPHY.fontHeading,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {ind.name}
                    <ArrowRight size={14} color={COLORS.burgundy} />
                  </h4>
                  <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {ind.useCase}
                  </p>
                </div>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={industryImages[ind.slug]} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden text-left"
        style={{
          background: '#F8FAFC',
          paddingTop: LAYOUT_CONTROLS.section.paddingTop,
          paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
          borderTop: '1px solid rgba(0,0,0,0.05)',
          fontFamily: TYPOGRAPHY.fontBody
        }}>

        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6B1530 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="w-full relative z-10"
          style={{
            paddingLeft: '2.5em',
            paddingRight: '2.5em',
          }}>

          <h2
            className="font-[900] mb-8 tracking-tighter leading-[1.05] max-w-4xl"
            style={{
              fontFamily: TYPOGRAPHY.fontHeading,
              fontSize: ' clamp(36px, 6vw, 56px)',
              color: COLORS.deepCyberBlue,
            }}
          >
            <span style={{ color: COLORS.burgundy }}>{capability.finalCTA?.heading.split(' ')[0]}</span> {capability.finalCTA?.heading.split(' ').slice(1).join(' ')}
          </h2>

          <p
            className="mb-14 max-w-2xl font-medium leading-relaxed"
            style={{
              fontFamily: TYPOGRAPHY.fontBody,
              fontSize: '18px',
              color: 'rgba(8, 16, 38, 0.7)',
            }}
          >
            {capability.finalCTA?.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button style={{
                background: COLORS.burgundy,
                color: '#FFFFFF',
                padding: '16px 40px',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(107, 21, 48, 0.2)',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B1F40';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(107, 21, 48, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(107, 21, 48, 0.2)';
                }}
              >
                Talk to a Security Expert
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CapabilityPage;
