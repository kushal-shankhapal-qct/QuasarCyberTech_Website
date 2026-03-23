import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS, TYPOGRAPHY } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const IndustryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find(i => i.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" />;
  }

  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />
      
      {/* ─── SECTION 1: HERO (DARK) ─── */}
      <section
        style={{
          minHeight: '100vh',
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
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
          {/* Left Column Content */}
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '13px', color: COLORS.textMuted, marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <Link to="/industries" style={{ color: 'inherit', textDecoration: 'none' }}>Industries</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{industry.name}</span>
            </div>

            <h1 style={{ 
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark, 
              marginBottom: '28px' 
            }}>
              {industry.title} <br /><span style={{ color: COLORS.gold }}>{industry.highlight}</span>
            </h1>
            <p style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px' 
            }}>
              {industry.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '18px' }}>
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
            </div>
          </div>
        </div>

        {/* Right-side Graphic Zone (Floating absolute to keep text aligned to left margin) */}
        <div style={{ 
          position: 'absolute', 
          right: '60px', // Site standard buffer
          bottom: '3em',
          width: 'min(40vw, 420px)',
          height: '400px',
          zIndex: 0
        }}>
          <div style={{ 
              height: '100%',
              borderRadius: '0 0 24px 24px',
              borderTop: `4px solid ${COLORS.burgundy}`,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
            }}>
              <img 
                src={industry.image} 
                alt={industry.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'brightness(0.75) saturate(0.9)'
                }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(4, 11, 29, 0.35)',
                mixBlendMode: 'multiply'
              }} />
            </div>
        </div>
      </section>

      {/* ─── SECTION 2: SECTOR OVERVIEW (LIGHT) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 60%' }}>
            <SectionHeader 
              eyebrow="SECTOR OVERVIEW"
              title={industry.overview.heading}
              highlight={industry.overview.highlight}
            />
            {industry.overview.body.map((p, i) => (
              <p key={i} style={{ color: COLORS.textSub, fontSize: '16px', lineHeight: 1.7, marginBottom: '20px' }}>{p}</p>
            ))}
          </div>

          <div style={{ flex: '0 0 35%' }}>
             <div style={{ borderTop: `4px solid ${COLORS.burgundy}`, background: COLORS.cardOnLight, borderRadius: '0 0 16px 16px', boxShadow: SHADOWS.lightCard, padding: '40px 32px' }}>
              <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>CRITICAL CAPABILITIES</p>
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
                      background: '#FFFFFF', 
                      border: `1px solid ${ALPHAS.teal08}`, 
                      borderRadius: '8px', 
                      color: COLORS.textOnLight,
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.teal; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = ALPHAS.teal08; e.currentTarget.style.transform = 'none'; }}
                  >
                    {cap.name}
                    <ArrowRight size={14} color={COLORS.teal} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SECTOR CHALLENGES (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            eyebrow="SECTOR CHALLENGES"
            title="Navigating"
            highlight="Risk"
            subtitle="The specialized cybersecurity challenges facing your organization."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '64px' }}>
            {industry.challenges.map(ch => (
              <div key={ch.title} style={{ borderTop: `3px solid ${COLORS.teal}`, borderRadius: '0 0 12px 12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${ALPHAS.teal12}`, padding: '32px' }}>
                <div style={{ width: '44px', height: '44px', background: ALPHAS.teal08, border: `1px solid ${ALPHAS.teal20}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <ch.icon size={22} color={COLORS.teal} strokeWidth={1.5} />
                </div>
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '18px', marginBottom: '12px' }}>{ch.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.65 }}>{ch.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHY QCT (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 45%' }}>
              {industry.slug === 'banking' ? (
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '380px', boxShadow: SHADOWS.lightCard }}>
                  <img 
                    src="https://images.pexels.com/photos/5497951/pexels-photo-5497951.jpeg" 
                    alt="Banking Security" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              ) : (
                <PlaceholderImage label="Industry Delivery Photography" height="380px" />
              )}
            </div>
            <div style={{ flex: '0 0 50%' }}>
              <SectionHeader 
                eyebrow="QUASARCYBERTECH ADVANTAGE"
                title="Deep Security"
                highlight="Expertise"
                subtitle={`Why enterprise ${industry.name} leaders partner with QuasarCyberTech.`}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '48px' }}>
                {industry.whyQCT.map(item => (
                  <div key={item.title}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                      <CheckCircle2 size={20} color={COLORS.teal} />
                      <h4 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '17px' }}>{item.title}</h4>
                    </div>
                    <p style={{ color: COLORS.textSub, fontSize: '14.5px', lineHeight: 1.6, paddingLeft: '32px' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default IndustryPage;
