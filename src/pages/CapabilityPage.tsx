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

import { ASSETS } from '@/constants/assets';

// Photo Imports for Hero removed - now using ASSETS constant
const qStellarLogo = ASSETS.logos.platforms.qstellar;
import qStellarScreenshot from '@/assets/Platforms_Screenshots/QStellar/Screenshot 2026-03-03 124533.png';


const heroImages: Record<string, string> = {
  'cyber-advisory-risk-governance': ASSETS.capabilities.advisory,
  'compliance-regulatory-assurance': ASSETS.capabilities.compliance,
  'offensive-security-engineering': ASSETS.capabilities.offensive,
  'cloud-infrastructure-security': ASSETS.capabilities.cloud,
  'managed-defense-operations': ASSETS.capabilities.defense,
  'cyber-intelligence-security-research': ASSETS.capabilities.intelligence,
};

// Industry image mapping
const industryImages: Record<string, string> = {
  'banking': ASSETS.industries.banking,
  'fintech': ASSETS.industries.fintech,
  'saas': ASSETS.industries.saas,
  'ecommerce': ASSETS.industries.ecommerce,
  'healthcare': ASSETS.industries.healthcare,
  'enterprise': ASSETS.industries.enterprise,
};

// Keywords for Freepik Search (Fallback for missing images)
const serviceKeywords: Record<string, string> = {
  'RBI Cyber Security Framework Compliance': 'Banking regulation compliance dashboard security illustration',
  'ISO 27001 Consulting': 'ISO 27001 certification standard document security audit',
  'SOC2 Readiness': 'SOC2 compliance report security trust abstract illustration',
  'Regulatory Gap Assessment': 'Security audit checklist gap analysis compliance',
  'Risk & Compliance Monitoring': 'Real-time security compliance monitoring dashboard',
  'Web Application VAPT': 'Web application security testing hacker penetration testing',
  'Mobile & API Security Testing': 'Mobile app security API endpoint testing illustration',
  'Red Team Assessments': 'Red team adversary simulation cyber attack operation',
  'Secure Code Review': 'Software source code security review developer illustration',
  'LLM Penetration Testing': 'AI large language model security testing prompt injection',
  'Agentic AI Security Review': 'Autonomous AI agents security workflow governance',
  'Cloud Security Assessment': 'Cloud infrastructure security assessment AWS Azure GCP',
  'AWS / Azure Security Assessment': 'AWS Azure cloud platform security configuration',
  'Kubernetes / Container Security': 'Kubernetes container security orchestration hardening',
  'Cloud Security Posture Management (CSPM)': 'CSPM cloud security posture management dashboard',
  'Cloud Compliance Review': 'Cloud regulatory compliance data sovereignty security',
  'Managed SOC': 'Cyber security operations center SOC team monitoring',
  'Threat Detection & Monitoring': 'Advanced threat detection network security monitoring',
  'Incident Response': 'Cyber incident response plan emergency forensics',
  'Threat Hunting': 'Proactive threat hunting cyber investigator dashboard',
  'Social Engineering & Phishing Simulations': 'Phishing simulation social engineering awareness training',
  'Cyber Threat Intelligence (CTI) as a Service': 'Actionable threat intelligence feeds security researcher',
  'Dark Web Brand Intelligence': 'Dark web monitoring brand protection cyber crime',
  'Brand Reputation Monitoring': 'Online brand reputation protection impersonation detection',
  'Vulnerability Research': 'Cyber security research vulnerability disclosure zero-day',
  'Security Advisories': 'Security advisory technical notification vulnerability alert',
};

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const capability = capabilitiesData.find(c => c.slug === slug);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    if (!capability) return;

    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const index = capability.services.findIndex(s => 
        s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
      );
      if (index !== -1) {
        setActiveServiceIndex(index);
        setTimeout(() => {
          const element = document.getElementById('service-area-grid');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug, capability?.services]);

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
          display: 'grid',
          gridTemplateColumns: '52% 48%',
          alignItems: 'end',
          background: GRADIENTS.HERO_BG,
          fontFamily: TYPOGRAPHY.fontBody,
        }}
      >
        {/* Left Column (Text Content) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: '2.5rem',
          paddingBottom: '3rem',
        }}>
          {/* Breadcrumbs - Absolute Positioning Match */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'absolute',
            top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY} - 100vh + 3rem + 100%)`, // Adjusted so it sits at the absolute top of the viewport even from the bottom-anchored content. Actually, let's just use fixed top absolute positioning relative to SECION.
            // Wait, the parent section is position: relative. The left column is also position: relative, so absolute here is relative to left column. Let's position it to the section instead.
          }}></div>
          {/* Breadcrumbs positioned relative to SECTION by breaking it out of this relative div, or setting this div to static top. Wait. Let's just break it out below. */}

          <div style={{ position: 'relative', zIndex: 10 }}>
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
                textAlign: 'left',
                width: '100%',
                maxWidth: '95%',
                marginTop: '16px',
                marginBottom: '28px',
                lineHeight: 1.7
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
        </div>

        {/* Right Column (Hero Image Integration - Pure CSS Mask) */}
        <div style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          zIndex: 1,
          overflow: 'hidden',
          WebkitMaskImage: `
            linear-gradient(to bottom, transparent 0%, black 8%),
            linear-gradient(to right, transparent 0%, black 18%),
            linear-gradient(to top, black 85%, transparent 100%)
          `,
          maskImage: `
            linear-gradient(to bottom, transparent 0%, black 8%),
            linear-gradient(to right, transparent 0%, black 18%),
            linear-gradient(to top, black 85%, transparent 100%)
          `,
          WebkitMaskComposite: 'destination-in',
          maskComposite: 'intersect'
        }}>
          {heroImage && (
            <img
              src={heroImage}
              alt={capability.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.82,
                display: 'block'
              }}
            />
          )}
        </div>

        {/* Breadcrumbs - Absolute Positioning Match (Positioned relative to the section) */}
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
      </section>

      {/* ─── SECTION 2: STRATEGIC SCOPE (ALIGNED PANEL) ─── */}
      <section style={{
        background: '#FFFFFF',
        paddingTop: '64px',
        paddingBottom: '64px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
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
        paddingTop: '64px',
        paddingBottom: '64px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
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

          <div id="service-area-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '64px' }}>
            {/* Left Menu (Span 5) */}
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {capability.services.map((svc, i) => (
                <div
                  key={i}
                  id={svc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  onMouseEnter={() => setActiveServiceIndex(i)}
                  style={{
                    flex: 1,
                    padding: '12px 0', // Further reduced per user request
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
                    fontSize: '0.9rem', // Scaled down further to keep menu compact
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
                  {capability.services[activeServiceIndex]?.image ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={capability.services[activeServiceIndex].image}
                        alt=""
                        style={{ width: '100%', height: '260px', objectFit: 'cover', objectPosition: 'center center', opacity: 0.9 }}
                      />
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        height: '3px', 
                        width: '60px', 
                        background: COLORS.gold, 
                        zIndex: 10 
                      }} />
                    </div>
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '260px', 
                      background: 'linear-gradient(135deg, #1A0B12 0%, #0B1F3B 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '40px',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <div style={{ color: COLORS.gold, marginBottom: '12px', opacity: 0.8 }}>
                        <Zap size={32} />
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '16px', textTransform: 'uppercase' }}>
                        Image Asset Pending
                      </p>
                      <div style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px dashed rgba(255,255,255,0.1)', 
                        padding: '12px 20px',
                        borderRadius: '4px',
                        maxWidth: '80%'
                      }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '4px' }}>
                          Freepik Search:
                        </p>
                        <p style={{ color: COLORS.gold, fontSize: '0.85rem', fontWeight: 700 }}>
                          "{serviceKeywords[capability.services[activeServiceIndex].name] || 'Cybersecurity visual illustration'}"
                        </p>
                      </div>
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        height: '3px', 
                        width: '60px', 
                        background: COLORS.gold, 
                        zIndex: 10 
                      }} />
                    </div>
                  )}
                  <div style={{ padding: '40px 32px', flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.75)', 
                      fontSize: '1rem', 
                      lineHeight: 1.7, // Increased line-height for better filling
                      margin: 0,
                      whiteSpace: 'pre-line' // Preserve newlines from data
                    }}>
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
      <section style={{ 
        backgroundColor: '#F5F7FA', 
        backgroundImage: 'radial-gradient(circle, rgba(107, 21, 48, 0.10) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        paddingTop: '56px',
        paddingBottom: '56px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX
      }}>
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
                    fontWeight: 800,
                    color: '#6B1530',
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
                  <div style={{ paddingTop: '110px', color: '#D6B05C' }}>
                    <MoveRight size={32} strokeWidth={1} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: PLATFORM INTEGRATION ─── */}
      <section style={{ 
        background: GRADIENTS.HERO_BG, 
        paddingTop: '56px',
        paddingBottom: '56px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        overflow: 'hidden' 
      }}>
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
                width: '100%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
      <section style={{ 
        background: '#F8FAFC', 
        paddingTop: '56px',
        paddingBottom: '56px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX
      }}>
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
                transition: 'border-color 0.4s ease, box-shadow 0.35s ease, transform 0.4s ease',
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
          background: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
          paddingTop: '72px',
          paddingBottom: '72px',
          fontFamily: TYPOGRAPHY.fontBody
        }}>

        <div className="w-full relative z-10"
          style={{
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
          }}>

          <h2
            className="font-[900] mb-8 tracking-tighter leading-[1.05] max-w-4xl"
            style={{
              fontFamily: TYPOGRAPHY.fontHeading,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Strengthen Your <span style={{ color: COLORS.gold }}>{capability.name}</span> Program
          </h2>

          <p
            className="mb-14 max-w-2xl font-medium leading-relaxed"
            style={{
              fontFamily: TYPOGRAPHY.fontBody,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.60)',
            }}
          >
            Discuss Your {capability.name} Strategy
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
