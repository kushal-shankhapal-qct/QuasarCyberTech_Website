import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const IndustryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find(i => i.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!industry) {
    return <Navigate to="/industries" />;
  }

  return (
    <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      <Header />
      
      {/* ─── SECTION 1: HERO (SYSTEM MATCH) ─── */}
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
            <Link to="/industries" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Industries</Link>
            <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{industry.name}</span>
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
              marginBottom: '28px' 
            }}>
              {industry.title} <br /><span style={{ color: COLORS.gold }}>{industry.highlight}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'left', // Exactly 50% max
              maxWidth: '50%', 
              marginBottom: '42px',
              lineHeight: 1.8
            }}>
              {industry.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: 'flex', gap: '18px' }}
          >
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
              Talk to an Expert
            </Link>
          </motion.div>
        </div>

        {/* Hero Image Integration - Clean Sharp Mask */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          bottom: 0, 
          width: '50.5%', 
          zIndex: 1,
          overflow: 'hidden'
        }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={industry.image} 
              alt={industry.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.95)' }} 
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, ${COLORS.darkBase} 0%, ${COLORS.darkBase} 40%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 2
            }} />
          </div>
        </div>
      </section>

      <section style={{ 
        background: GRADIENTS.HERO_BG, 
        padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'flex-start' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <SectionHeader 
                isDark
                eyebrow="SECTOR OVERVIEW"
                title={industry.overview.heading}
                highlight={industry.overview.highlight}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '10px' }}>
                {industry.overview.body.map((p, i) => (
                  <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)' }}>{p}</p>
                ))}
              </div>
            </div>

            <div style={{ 
              gridColumn: 'span 5',
              borderTop: `4px solid ${COLORS.gold}`, 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '0 0 2px 2px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)', 
              padding: '40px 32px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <p style={{ color: COLORS.gold, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>
                CRITICAL CAPABILITIES
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {industry.overview.capabilities.map(cap => (
                  <Link 
                    key={cap.slug}
                    to={`/capabilities/${cap.slug}`}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '16px 20px', 
                      background: 'rgba(255,255,255,0.05)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '4px', 
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    {cap.name}
                    <ArrowRight size={14} color={COLORS.gold} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SECTOR CHALLENGES (DARK) ─── */}
      <section style={{ 
        background: GRADIENTS.HERO_BG, 
        padding: `120px ${LAYOUT_CONTROLS.section.paddingX}` 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            eyebrow="SECTOR CHALLENGES"
            title="Navigating"
            highlight="Risk"
            subtitle="The specialized cybersecurity challenges facing your organization."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {industry.challenges.map(ch => (
              <div key={ch.title} style={{ 
                borderRadius: '4px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                padding: '40px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <div style={{ width: '48px', height: '48px', background: 'rgba(214, 176, 92, 0.1)', border: `1px solid ${COLORS.gold}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <ch.icon size={22} color={COLORS.gold} />
                </div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem', marginBottom: '16px', fontFamily: TYPOGRAPHY.fontHeading }}>{ch.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7 }}>{ch.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHY QCT (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: `120px ${LAYOUT_CONTROLS.section.paddingX}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 5' }}>
              <div style={{ borderRadius: '4px', overflow: 'hidden', height: '420px', boxShadow: SHADOWS.lightCard, border: '1px solid rgba(0,0,0,0.05)' }}>
                <img 
                  src={industry.slug === 'banking' ? "https://images.pexels.com/photos/5497951/pexels-photo-5497951.jpeg" : industry.image} 
                  alt={industry.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            </div>
            <div style={{ gridColumn: 'span 7' }}>
              <SectionHeader 
                eyebrow="QUASARCYBERTECH ADVANTAGE"
                title="Deep Security"
                highlight="Expertise"
                subtitle={`Why enterprise ${industry.name} leaders partner with QuasarCyberTech.`}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '48px' }}>
                {industry.whyQCT.map(item => (
                  <div key={item.title}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                      <CheckCircle2 size={24} color={COLORS.burgundy} />
                      <h4 style={{ color: '#040B1D', fontWeight: 800, fontSize: '1.2rem', fontFamily: TYPOGRAPHY.fontHeading }}>{item.title}</h4>
                    </div>
                    <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.8, paddingLeft: '40px' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryPage;
