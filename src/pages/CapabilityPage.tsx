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
  ChevronRight,
  Layers
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

// Industry image mapping
const industryImages: Record<string, string> = {
  'banking': "/src/assets/industries/Banking_and_Financial Services.jpg",
  'fintech': "/src/assets/industries/FinTech & Digital Payments.jpg",
  'saas': "/src/assets/industries/SaaS_and_Technology Platforms.jpg",
  'ecommerce': "/src/assets/industries/E-commerce & Digital Platforms.jpg",
  'healthcare': "/src/assets/industries/Healthcare & HealthTech.png",
  'enterprise': "/src/assets/industries/Enterprise_and_Manufacturing.jpg",
};

const deliveryIcons = [Compass, ClipboardList, PenTool, ShieldCheck];

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const capability = capabilitiesData.find(c => c.slug === slug);

  // 1. Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

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
          minHeight: '100vh',
          background: GRADIENTS.HERO_BG,
          display: 'flex',
          alignItems: 'stretch', // Fill vertical space
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          flex: 1, 
          paddingLeft: '2.5em', 
          paddingBottom: '3em', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          zIndex: 1 
        }}>
          {/* Left Column Content */}
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
              <Link to="/capabilities" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Capabilities</Link>
              <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{capability.name}</span>
            </div>

            <h1 style={{ 
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark, 
              marginBottom: '28px' 
            }}>
              {capability.title.split(' ').map((word, i) => (
                <span key={i}>
                  {word.toLowerCase() === 'cyber' ? <span style={{ color: COLORS.gold }}>{word}</span> : word}
                  {' '}
                </span>
              ))} 
              <span style={{ color: COLORS.teal }}>{capability.highlight}</span>
            </h1>
            <p style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px',
            }}>
              {capability.subtitle}
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
        </div>

        {/* Right-side Graphic Zone (Now part of regular flex flow) */}
        <div style={{ 
          flex: '0 0 min(45vw, 600px)', 
          paddingRight: '60px', // Site standard padding
          paddingBottom: '3em',
          paddingTop: '160px', // Nudge down to start below breadcrumb line level roughly
          display: 'flex',
          alignItems: 'stretch',
          zIndex: 0
        }}>
          <div style={{ 
            width: '100%',
            height: '100%', 
            borderRadius: '0 0 10px 10px', 
            overflow: 'hidden', 
            boxShadow: SHADOWS.darkCard,
            position: 'relative',
            background: '#0B1F3B',
            // User requested gold top accent
            borderTop: '4px solid #D6B05C'
          }}>
            {heroImage && (
              <img 
                src={heroImage} 
                alt={capability.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(135deg, rgba(11,31,59,0.3) 0%, rgba(4,11,29,0.1) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>
      </section>

      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        {/* ─── SECTION 2: CAPABILITY OVERVIEW (LIGHT) ─── */}
        <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <div>
              <p style={{ 
                color: '#2BC4B6', 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.12em', 
                marginBottom: '24px'
              }}>
                CAPABILITY OVERVIEW
              </p>
              {capability.overview.body.map((p, i) => (
                <p key={i} style={{ color: COLORS.textSub, fontSize: '17px', lineHeight: 1.8, marginBottom: '24px', textAlign: 'justify' }}>{p}</p>
              ))}
            </div>

            {/* Proof Point Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {capability.overview.proofPoints.map((point, i) => (
                <div key={i} style={{ 
                  background: '#0B1F3B', 
                  padding: '20px 24px', 
                  borderRadius: '0 4px 4px 0', 
                  borderLeft: `4px solid #2BC4B6`,
                  boxShadow: SHADOWS.darkCard
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>{point.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: SERVICE AREAS (DARK) ─── */}
        <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '72px 2.5em' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '32px', margin: 0, fontFamily: TYPOGRAPHY.fontHeading }}>
                <span style={{ color: COLORS.teal }}>Service</span> Areas
              </h2>
            </div>
            <ServiceAreaPanel services={capability.services} />
          </div>
        </section>

        {/* ─── SECTION 4: DELIVERY APPROACH (LIGHT) ─── */}
        <section style={{ background: '#FFFFFF', padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeader 
              title="Delivery"
              highlight="Approach"
              subtitle="A structured methodology ensuring predictive security outcomes."
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '52px', 
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
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      {Icon && <Icon size={24} color={COLORS.teal} strokeWidth={1.5} />}
                    </div>
                    <div style={{ color: COLORS.burgundy, fontSize: '32px', fontWeight: 800, lineHeight: 1, marginBottom: '16px', fontFamily: TYPOGRAPHY.fontHeading }}>{step.step}</div>
                    <h4 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '17px', marginBottom: '12px' }}>{step.title}</h4>
                    <p style={{ color: 'rgba(8,16,38,0.7)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>{step.description}</p>
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

        {/* ─── SECTION 5: PLATFORM LINKAGE (DARK) ─── */}
        <section style={{ background: '#0B1F3B', padding: '120px 2.5em', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
            <div style={{ flex: '0 0 50%' }}>
              <p style={{ color: COLORS.teal, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>PLATFORM SUPPORT</p>
              <h2 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '32px', marginBottom: '20px', fontFamily: TYPOGRAPHY.fontHeading }}>{capability.platformLink.heading}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>{capability.platformLink.body}</p>
              <a 
                href={capability.platformLink.ctaLink}
                target={capability.platformLink.isExternal ? "_blank" : "_self"}
                rel={capability.platformLink.isExternal ? "noopener noreferrer" : ""}
                style={{ 
                  color: COLORS.teal, 
                  fontWeight: 700, 
                  textDecoration: 'none', 
                  fontSize: '15px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  borderBottom: `2px solid ${COLORS.teal}`,
                  paddingBottom: '4px'
                }}
              >
                {capability.platformLink.ctaLabel} <ArrowRight size={16} />
              </a>
            </div>
            {/* Visual Placeholder for Platform Card */}
            <div style={{ 
              flex: '1', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '20px', 
              padding: '40px', 
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(43,196,182,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: COLORS.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Layers color="#0B1F3B" size={24} />
                 </div>
                 <div>
                   <h4 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: 0 }}>{capability.platformLink.name}</h4>
                   <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>Enterprise Security Intelligence</p>
                 </div>
               </div>
               <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {["Continuous Asset Visibility", "AI-Driven Risk Scoring", "Automated Remediation Workflows"].map(item => (
                   <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                     <CheckCircle2 size={16} color={COLORS.teal} />
                     <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{item}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: INDUSTRIES (LIGHT) ─── */}
        <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader 
              title="Industry"
              highlight="Applications"
              highlightColor={COLORS.teal}
              subtitle={`Proven sector-specific expertise in delivering ${capability.name}.`}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', marginTop: '64px' }}>
              {capability.industries.map(ind => (
                <div key={ind.slug} style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '0 16px 16px 0', 
                  overflow: 'hidden',
                  borderLeft: `4px solid ${COLORS.teal}`,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderLeftWidth: '4px'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderLeftColor = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderLeftColor = COLORS.teal;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img src={industryImages[ind.slug]} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ color: '#0B1F3B', fontWeight: 700, fontSize: '17px', marginBottom: '12px', fontFamily: TYPOGRAPHY.fontHeading }}>{ind.name}</h4>
                    <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>{ind.useCase}</p>
                    <Link to={`/industries/${ind.slug}`} style={{ color: COLORS.teal, fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Explore Industry <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: FINAL ENTERPRISE CTA ─── */}
        <section style={{ 
          background: '#040B1D', 
          padding: '80px 60px',
          backgroundImage: `radial-gradient(rgba(43,196,182,0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          textAlign: 'left'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              color: '#FFFFFF', 
              fontWeight: 700, 
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', 
              lineHeight: 1.2,
              marginBottom: '24px', 
              fontFamily: TYPOGRAPHY.fontHeading 
            }}>
              Strengthen Your <span style={{ color: '#D6B05C' }}>Cyber Advisory</span> Program
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: '17px', lineHeight: 1.6, maxWidth: '520px', margin: '0 0 48px' }}>
              {capability.finalCTA?.subtext || "Partner with QuasarCyberTech to align security strategy with your business objectives and build long-term cyber resilience."}
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start' }}>
              <Link to="/contact" style={{ background: '#6B1530', color: '#FFFFFF', padding: '16px 40px', borderRadius: '4px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 4px 14px rgba(107,21,48,0.3)' }}>
                Talk to a Security Expert
              </Link>
              <Link to="/capabilities" style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', padding: '16px 40px', borderRadius: '4px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                Explore All Capabilities
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default CapabilityPage;
