import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import ServiceAreaPanel from '../components/ServiceAreaPanel';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ClipboardList, 
  PenTool, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  COLORS, 
  GRADIENTS, 
  SHADOWS, 
  SECTION_BACKGROUNDS, 
  ALPHAS, 
  TYPOGRAPHY, 
  LAYOUT_CONTROLS 
} from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

// Photo Imports for Hero (Specific overrides)
import imgAdvisory from "../assets/capabilities/Cyber Advisory & Risk Governance.jpg";
import imgCompliance from "../assets/capabilities/Compliance & Regulatory Assurance.jpg";
import imgOffensive from "../assets/capabilities/Offensive Security Engineering.jpg";
import imgCloud from "../assets/capabilities/Cloud & Infrastructure Security.jpg";
import imgManagedDefense from "../assets/capabilities/Managed Defense Operations_2.jpeg";
import imgIntelligence from "../assets/capabilities/Cyber Intelligence & Security Research.webp";

const heroImages: Record<string, string> = {
  'cyber-advisory-risk-governance': imgAdvisory,
  'compliance-regulatory-assurance': imgCompliance,
  'offensive-security-engineering': imgOffensive,
  'cloud-infrastructure-security': imgCloud,
  'managed-defense-operations': imgManagedDefense,
  'cyber-intelligence-security-research': imgIntelligence,
};

const deliveryIcons = [Compass, ClipboardList, PenTool, ShieldCheck];

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const capability = capabilitiesData.find(c => c.slug === slug);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const metricsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(metricsRef, { once: true, amount: 0.3 });

  // 1. Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // 7. Trust Metrics Animation Logic
  useEffect(() => {
    if (isInView && capability) {
      capability.overview.metrics.forEach((metric, idx) => {
        // Only animate if it's a number ending in +
        if (metric.value.includes('+') && metric.value !== '24/7') {
          const target = parseInt(metric.value.replace('+', ''));
          let current = 0;
          const duration = 2000; // 2 seconds
          const stepTime = Math.abs(Math.floor(duration / target));
          
          const timer = setInterval(() => {
            current += 1;
            setCounts(prev => ({ ...prev, [idx]: current }));
            if (current >= target) clearInterval(timer);
          }, stepTime);
        } else {
          // Static text like "24/7"
          setCounts(prev => ({ ...prev, [idx]: -1 })); // Flag for static
        }
      });
    }
  }, [isInView, capability]);

  if (!capability) {
    return <Navigate to="/capabilities" />;
  }

  const handleFrameworkNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('secure-framework');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const heroImage = heroImages[capability.slug];

  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />
      
      {/* ─── SECTION 1: HERO (DARK) ─── */}
      <section
        style={{
          minHeight: '85vh', // Slightly reduced height
          background: GRADIENTS.HERO_BG,
          display: 'flex',
          alignItems: 'center',
          padding: `180px ${LAYOUT_CONTROLS.section.paddingX} 80px`, // Increased top, using standard X
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', gap: '80px', alignItems: 'center' }}>
          {/* Left Column (55%) */}
          <div style={{ flex: '0 0 55%' }}>
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
              <Link to="/capabilities" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Capabilities</Link>
              <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{capability.name}</span>
            </div>

            <h1 style={{ color: COLORS.textOnDark, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.03em', fontFamily: TYPOGRAPHY.fontHeading }}>
              {capability.title} <span style={{ color: COLORS.teal }}>{capability.highlight}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '520px', marginBottom: '42px' }}>
              {capability.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '18px' }}>
              <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Talk to an Expert
              </Link>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div style={{ 
            flex: '0 0 45%', 
            height: '420px',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: SHADOWS.darkCard,
            paddingRight: LAYOUT_CONTROLS.section.paddingX // Added as requested
          }}>
            {heroImage && (
              <img 
                src={heroImage} 
                alt={capability.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              background: 'linear-gradient(135deg, rgba(11,31,59,0.4) 0%, rgba(4,11,29,0.2) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: OVERVIEW / TRUST (LIGHT) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '100px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 60%' }}>
            <SectionHeader 
              title={capability.overview.heading}
              highlight={capability.overview.highlight}
            />
            {capability.overview.body.map((p, i) => (
              <p key={i} style={{ color: COLORS.textSub, fontSize: '17px', lineHeight: 1.75, marginBottom: '24px' }}>{p}</p>
            ))}
          </div>

          {/* Metrics Panel */}
          <div ref={metricsRef} style={{ flex: '0 0 35%' }}>
            <div style={{ 
              borderLeft: `4px solid ${COLORS.burgundy}`, 
              background: COLORS.cardOnLight, 
              borderRadius: '0 12px 12px 0', 
              boxShadow: SHADOWS.lightCard, 
              padding: '48px' 
            }}>
              <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '40px' }}>TRUST METRICS</p>
              {capability.overview.metrics.map((m, i) => (
                <div key={i} style={{ marginBottom: i === capability.overview.metrics.length - 1 ? 0 : '40px' }}>
                  <div style={{ color: COLORS.burgundy, fontSize: '36px', fontWeight: 800, marginBottom: '4px', fontFamily: TYPOGRAPHY.fontHeading }}>
                    {counts[i] === -1 ? m.value : (counts[i] ? `${counts[i]}+` : (m.value.includes('+') ? '0+' : m.value))}
                  </div>
                  <div style={{ color: COLORS.textSub, fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SERVICE AREAS (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '100px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            title="Service"
            highlight="Areas"
            highlightColor={COLORS.teal}
            subtitle="Deeply specialized security services tailored for absolute defense."
          />
          
          <ServiceAreaPanel services={capability.services} />
        </div>
      </section>

      {/* ─── SECTION 4: DELIVERY APPROACH (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '100px 2.5em' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionHeader 
            title="Delivery"
            highlight="Approach"
            subtitle="A structured methodology ensuring predictive security outcomes."
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', position: 'relative' }}>
            {/* 5c. Horizontal Connecting Line */}
            <div style={{ 
              position: 'absolute', 
              top: '52px', // Vertical offset to hit center of icon+number area
              left: '12.5%', 
              right: '12.5%', 
              height: '1px', 
              borderTop: '1px dashed rgba(43, 196, 182, 0.3)', 
              zIndex: 0 
            }} />
            
            {capability.delivery.map((step, idx) => {
              const Icon = deliveryIcons[idx];
              return (
                <div key={step.step} style={{ textAlign: 'center', width: '22%', zIndex: 1, background: '#FFFFFF', padding: '0 10px' }}>
                  {/* 5a. Lucide Icon */}
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    {Icon && <Icon size={22} color={COLORS.teal} strokeWidth={1.5} />}
                  </div>
                  <div style={{ color: COLORS.burgundy, fontSize: '32px', fontWeight: 800, lineHeight: 1, marginBottom: '16px', fontFamily: TYPOGRAPHY.fontHeading }}>{step.step}</div>
                  <h4 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '16px', marginBottom: '12px' }}>{step.title}</h4>
                  {/* 5b. Descriptions style */}
                  <p style={{ color: 'rgba(8,16,38,0.75)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{step.description}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <Link 
              to="/" 
              onClick={handleFrameworkNavigation}
              style={{ 
                color: COLORS.teal, 
                fontWeight: 700, 
                textDecoration: 'none', 
                fontSize: '15px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              Delivered within the QCT SECURE Framework <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: INDUSTRIES (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '100px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            title="Industry"
            highlight="Applications"
            highlightColor={COLORS.teal}
            subtitle={`Proven sector-specific expertise in delivering ${capability.name}.`}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {capability.industries.map(ind => (
              <div key={ind.slug} style={{ 
                borderRadius: '0 16px 16px 0', 
                background: 'rgba(255,255,255,0.02)', 
                borderLeft: `4px solid ${COLORS.teal}`,
                padding: '32px', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderLeftColor = COLORS.burgundy; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderLeftColor = COLORS.teal; }}
              >
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>{ind.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px', flex: 1 }}>{ind.useCase}</p>
                <Link to={`/industries/${ind.slug}`} style={{ color: COLORS.teal, fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Explore Industry <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: PLATFORM LINKAGE (LIGHT) ─── */}
      {capability.platformLink && (
        <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <SectionHeader 
              title="Powered by the QCT"
              highlight="Platform Ecosystem"
              subtitle="Innovation engineered to extend consulting into continuous visibility."
            />
            
            <div style={{ borderLeft: `6px solid ${COLORS.burgundy}`, background: '#FFFFFF', borderRadius: '0 16px 16px 0', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', padding: '48px', marginTop: '48px' }}>
              <h3 style={{ color: COLORS.textOnLight, fontWeight: 800, fontSize: '26px', marginBottom: '12px', fontFamily: TYPOGRAPHY.fontHeading }}>{capability.platformLink.name}</h3>
              <p style={{ color: COLORS.textSub, fontSize: '15px', marginBottom: '32px', fontWeight: 500 }}>{capability.platformLink.subtitle}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', textAlign: 'left' }}>
                {capability.platformLink.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={20} color={COLORS.teal} />
                    <span style={{ color: COLORS.textOnLight, fontSize: '15px', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>

              <a 
                href={capability.platformLink.ctaLink} 
                target={capability.platformLink.isExternal ? "_blank" : "_self"}
                rel={capability.platformLink.isExternal ? "noopener noreferrer" : ""}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px', 
                  background: COLORS.burgundy, 
                  color: '#FFFFFF', 
                  padding: '16px 36px', 
                  borderRadius: '4px', 
                  fontWeight: 700, 
                  fontSize: '13px', 
                  textDecoration: 'none', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.12em' 
                }}
              >
                {capability.platformLink.ctaLabel}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default CapabilityPage;
