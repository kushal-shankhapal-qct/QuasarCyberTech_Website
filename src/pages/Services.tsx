import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, TYPOGRAPHY, themeConfig, LAYOUT_CONTROLS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

import svc1 from '../assets/logos copy/SVCs_Set_2/SVC_1.png';
import svc2 from '../assets/logos copy/SVCs_Set_2/SVC_2.png';
import svc3 from '../assets/logos copy/SVCs_Set_2/SVC_3.png';
import svc4 from '../assets/logos copy/SVCs_Set_2/SVC_4.png';
import svc5 from '../assets/logos copy/SVCs_Set_2/SVC_5.png';
import svc6 from '../assets/logos copy/SVCs_Set_2/SVC_6.png';

const svcImages = [svc1, svc2, svc3, svc4, svc5, svc6];

const ServicesOverview: React.FC = () => {
  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />
      
      {/* ─── SECTION 1: HERO (DARK) ─── */}
      <section
        style={{
          background: '#0B1F3B',
          backgroundImage: `
            linear-gradient(rgba(43, 196, 182, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43, 196, 182, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          padding: '160px 2.5em 100px',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          {/* Left Column / Single Column */}
          <div style={{ maxWidth: '680px' }}>
            {/* Breadcrumb — sits INSIDE hero, ABOVE h1 */}
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
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Capabilities</span>
            </div>

            <h1 style={{ 
              color: COLORS.textOnDark, 
              fontWeight: 800, 
              fontSize: 'clamp(36px, 6vw, 56px)', 
              lineHeight: 1.05, 
              marginBottom: '28px', 
              letterSpacing: '-0.03em',
              fontFamily: TYPOGRAPHY.fontHeading
            }}>
              Our Core <span style={{ color: COLORS.teal }}>Capabilities</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '560px', marginBottom: '42px' }}>
              QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
            </p>
            
            <div style={{ display: 'flex', gap: '18px' }}>
              <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Talk to a Security Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
        <section id="pillars" style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeader 
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
                    height: '160px', 
                    position: 'relative',
                    overflow: 'hidden',
                    background: themeConfig.services.imageBg,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: themeConfig.services.imagePadding,
                  }}>
                    <img 
                      src={svcImages[i]} 
                      alt={cap.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        transform: `scale(${themeConfig.services.imageScale})`,
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ 
                      color: COLORS.teal, 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase', 
                      marginBottom: '8px' 
                    }}>
                      SVC.0{i + 1}
                    </p>
                    <h3 style={{ 
                      color: COLORS.textOnLight, 
                      fontWeight: 700, 
                      fontSize: '16px', 
                      lineHeight: 1.3,
                      marginBottom: '10px' 
                    }}>
                      {cap.name}
                    </h3>
                    <p style={{ 
                      color: COLORS.textSub, 
                      fontSize: '14px', 
                      lineHeight: 1.65, 
                      marginBottom: '18px', 
                      flex: 1 
                    }}>
                      {cap.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                      <Link to={`/capabilities/${cap.slug}`} style={{ color: COLORS.teal }}>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: WHY QCT (DARK) ─── */}
        <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 55%' }}>
                <SectionHeader 
                  isDark
                  title="Enterprise Security,"
                  highlight="Consulting-Led"
                  highlightColor={COLORS.gold}
                  subtitle="Every engagement focuses on business outcomes, not just technical checkboxes."
                />

                {/* Trust Metrics — replaces pills */}
                <div style={{ display: 'flex', gap: '48px', marginTop: '32px' }}>
                  {[
                    { value: '120', symbol: '+', label: 'Engagements' },
                    { value: '15', symbol: '+', label: 'Countries' },
                    { value: '6', symbol: '', label: 'Capability Pillars' },
                  ].map(metric => (
                    <div key={metric.label}>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ color: COLORS.textOnDark, fontSize: '36px', fontWeight: 800, fontFamily: TYPOGRAPHY.fontHeading }}>{metric.value}</span>
                        {metric.symbol && <span style={{ color: COLORS.gold, fontSize: '24px', fontWeight: 800 }}>{metric.symbol}</span>}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Right Column — Placeholder Image */}
            <div style={{ 
              flex: '0 0 40%', 
              height: '320px',
              position: 'relative',
              borderRadius: '0 0 24px 24px',
              borderTop: `4px solid ${COLORS.burgundy}`,
              background: 'linear-gradient(135deg, rgba(11,31,59,0.5) 0%, rgba(4,11,29,0.7) 100%)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ 
                textAlign: 'center', 
                color: 'rgba(255,255,255,0.15)', 
                fontSize: '11px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                padding: '40px'
              }}>
                [CISO executive presentation security strategy boardroom dark]
                <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.5 }}>PLACEHOLDER IMAGE ZONE</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}>
            {[
              { label: 'Consulting-Led Approach', desc: 'Every engagement begins with understanding your business context, not selling tools.' },
              { label: 'Full-Spectrum Coverage', desc: 'Advisory to offensive to managed defense — all delivered through the QCT SECURE Framework.' },
              { label: 'Platform-Powered Delivery', desc: 'QRGT, QStellar, and QPulse extend consulting into continuous operations and intelligence.' }
            ].map(item => (
              <div key={item.label} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                borderTop: `3px solid ${COLORS.teal}`, 
                padding: '32px 28px', 
                borderRadius: '0 0 12px 12px' 
              }}>
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '17px', marginBottom: '12px' }}>{item.label}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SECURE FRAMEWORK REF (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '100px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader 
            title="The QCT"
            highlight="SECURE Framework"
            highlightColor={COLORS.teal}
            subtitle="Every capability is delivered through a structured cybersecurity lifecycle designed for enterprise resilience."
            maxWidth="700px"
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '48px 0' }}>
            {['S', 'E', 'C', 'U', 'R', 'E'].map((letter, idx) => (
              <div key={letter+idx} style={{ padding: '16px', border: `1px solid rgba(43,196,182,0.15)`, borderRadius: '12px', width: '90px', textAlign: 'center' }}>
                <div style={{ color: COLORS.teal, fontSize: '40px', fontWeight: 900, fontFamily: TYPOGRAPHY.fontHeading }}>{letter}</div>
                <div style={{ fontSize: '10px', color: COLORS.textOnLight, fontWeight: 700, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
    </div>
  );
};

export default ServicesOverview;