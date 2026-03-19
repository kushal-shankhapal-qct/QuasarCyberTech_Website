import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

const ServicesOverview: React.FC = () => {
  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />
      
      {/* ─── SECTION 1: HERO (DARK) ─── */}
      <section
        style={{
          minHeight: '100vh',
          background: GRADIENTS.HERO_BG,
          display: 'flex',
          alignItems: 'center',
          padding: '140px 2.5em 80px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
          {/* Left Column (60%) */}
          <div style={{ flex: '0 0 60%' }}>
            <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SERVICES
            </p>
            <h1 style={{ color: COLORS.textOnDark, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.03em' }}>
              Our Core <span style={{ color: COLORS.teal }}>Capabilities</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '520px', marginBottom: '32px' }}>
              QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
            </p>
            
            {/* Breadcrumb */}
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '48px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <span style={{ color: '#FFFFFF' }}>Capabilities</span>
            </div>

            <div style={{ display: 'flex', gap: '18px' }}>
              <Link to="#pillars" style={{ background: 'transparent', border: `1px solid ${COLORS.burgundy}`, color: COLORS.gold, padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Explore Services
              </Link>
              <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Talk to an Expert
              </Link>
            </div>
          </div>

          {/* Right Column (40%) */}
          <div style={{ flex: '0 0 40%' }}>
            <PlaceholderImage Icon={Shield} height="400px" />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
      <section id="pillars" style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            eyebrow="CORE PILLARS"
            title="Cybersecurity"
            highlight="Capabilities"
            subtitle="Full-spectrum protection designed for the modern digital enterprise."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {capabilitiesData.map((cap, i) => (
              <motion.div
                key={cap.slug}
                whileHover={{ y: -8 }}
                style={{
                  borderRadius: '0 0 16px 16px',
                  borderTop: `3px solid ${COLORS.burgundy}`,
                  background: COLORS.cardOnLight,
                  boxShadow: SHADOWS.lightCard,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image Zone */}
                <div style={{ 
                  height: '140px', 
                  background: `linear-gradient(135deg, ${COLORS.deepCyberBlue} 0%, #0d2a50 100%)`,
                  backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.07) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <cap.icon size={44} strokeWidth={1} color={COLORS.teal} style={{ opacity: 0.8 }} />
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                  <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    SVC.0{i + 1}
                  </p>
                  <h3 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '18px', marginBottom: '12px' }}>
                    {cap.name}
                  </h3>
                  <p style={{ color: COLORS.textSub, fontSize: '14.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {cap.description}
                  </p>
                  <Link to={`/capabilities/${cap.slug}`} style={{ color: COLORS.teal, fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHY QCT (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 50%' }}>
              <SectionHeader 
                isDark
                eyebrow="WHY QUASARCYBERTECH"
                title="Enterprise Security,"
                highlight="Consulting-Led"
                subtitle="Every engagement focuses on business outcomes, not just technical checkboxes."
              />
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['Strategic', 'Outcome-Focused', 'Platform-Accelerated'].map(chip => (
                   <span key={chip} style={{ border: `1px solid rgba(43,196,182,0.2)`, color: COLORS.teal, padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>{chip}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: '0 0 45%' }}>
              <PlaceholderImage label="Consulting Methodology Illustration" height="300px" opacity={0.6} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}>
            {[
              { label: 'Consulting-Led Approach', icon: Shield, desc: 'Every engagement begins with understanding your business context, not selling tools.' },
              { label: 'Full-Spectrum Coverage', icon: Shield, desc: 'Advisory to offensive to managed defense — all delivered through the QCT SECURE Framework.' },
              { label: 'Platform-Powered Delivery', icon: Shield, desc: 'QRGT, QStellar, and QPulse extend consulting into continuous operations and intelligence.' }
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderTop: `3px solid ${COLORS.teal}`, padding: '32px 28px', borderRadius: '0 0 12px 12px' }}>
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '17px', marginBottom: '12px' }}>{item.label}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SECURE FRAMEWORK REF (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader 
            eyebrow="METHODOLOGY"
            title="The QCT"
            highlight="SECURE Framework"
            subtitle="Every capability is delivered through a structured cybersecurity lifecycle designed for enterprise resilience."
            maxWidth="700px"
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '64px 0' }}>
            {['S', 'E', 'C', 'U', 'R', 'E'].map((letter, idx) => (
              <div key={letter} style={{ padding: '20px', border: `1px solid rgba(43,196,182,0.15)`, borderRadius: '12px', width: '100px', textAlign: 'center' }}>
                <div style={{ color: COLORS.teal, fontSize: '28px', fontWeight: 900 }}>{letter}</div>
                <div style={{ fontSize: '11px', color: COLORS.textOnLight, fontWeight: 700, marginTop: '4px' }}>
                  {['Strategize', 'Evaluate', 'Challenge', 'Upgrade', 'Respond', 'Evolve'][idx]}
                </div>
              </div>
            ))}
          </div>

          <Link to="/#framework" style={{ color: COLORS.teal, fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Explore the Framework <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServicesOverview;