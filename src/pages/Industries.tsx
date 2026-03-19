import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldAlert, Bug, Eye, Cloud, Zap, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';

const IndustriesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            INDUSTRIES
          </p>
          <h1 style={{ color: COLORS.textOnDark, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.03em' }}>
            Industries We <span style={{ color: COLORS.teal }}>Secure</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '640px', marginBottom: '32px' }}>
            Cybersecurity expertise tailored to the risk landscape of modern digital industries.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {industriesData.map(i => (
              <span key={i.slug} style={{ border: `1px solid ${ALPHAS.teal15}`, color: 'rgba(255,255,255,0.6)', fontSize: '12px', padding: '5px 14px', borderRadius: '4px' }}>
                {i.name}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to="#grid" style={{ background: 'transparent', border: `1px solid ${COLORS.burgundy}`, color: COLORS.gold, padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Explore All Industries
            </Link>
            <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INDUSTRIES GRID (LIGHT) ─── */}
      <section id="grid" style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            eyebrow="SECTORS WE SERVE"
            title="Cybersecurity Across"
            highlight="Every Industry"
            subtitle="Deep domain knowledge in securing complex digital ecosystems."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
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
                  height: '100px', 
                  background: `linear-gradient(135deg, ${COLORS.deepCyberBlue} 0%, #0d2a50 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <ind.icon size={32} strokeWidth={1} color={COLORS.teal} />
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '18px', marginBottom: '12px' }}>
                    {ind.name}
                  </h3>
                  <p style={{ color: COLORS.textSub, fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {ind.description}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {ind.tags.map(tag => (
                      <span key={tag} style={{ background: ALPHAS.teal08, border: `1px solid ${ALPHAS.teal20}`, color: COLORS.teal, fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '4px' }}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/industries/${ind.slug}`} style={{ color: COLORS.teal, fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Explore Industry <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SECTOR CHALLENGES (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 55%' }}>
              <SectionHeader 
                isDark
                eyebrow="THREAT LANDSCAPE"
                title="Common Challenges Across"
                highlight="Sectors"
                subtitle="The cyber threat landscape is evolving rapidly, with sector-specific vectors emerging daily."
              />
            </div>
            <div style={{ flex: '0 0 45%' }}>
              <PlaceholderImage label="Threat Landscape Illustration" height="320px" opacity={0.6} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}>
            {[
              { icon: ShieldAlert, title: 'Regulatory Pressure', desc: 'Meeting evolving RBI and global financial cybersecurity frameworks.' },
              { icon: Bug, title: 'Application & API Vulns', desc: 'Preventing broken authorization and logic flaws in modern cloud-native apps.' },
              { icon: Eye, title: 'Insider Threats', desc: 'Detecting and preventing unauthorized data access or accidental exposure.' },
              { icon: Cloud, title: 'Cloud Misconfiguration', description: 'Securing serverless and containerized deployment pipelines.' },
              { icon: Zap, title: 'Advanced Persistent Threats', description: 'Simulating full-scale adversary attacks against people, process, and tech.' },
              { icon: AlertTriangle, title: 'Supply Chain Risk', description: 'Managing the security posture of third-party vendors and partnerships.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.02)', borderTop: `3px solid ${COLORS.teal}`, padding: '24px', borderRadius: '0 0 12px 12px', border: `1px solid ${ALPHAS.teal12}` }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <item.icon size={28} color={COLORS.teal} strokeWidth={1.5} />
                  <div>
                    <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CAPABILITIES MAPPED (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionHeader 
            eyebrow="OUR APPROACH"
            title="Capabilities Mapped to Your"
            highlight="Sector"
            subtitle="How we tailor our core pillars to the specific risk profiles of your industry."
          />

          <div style={{ display: 'flex', gap: '60px', marginTop: '64px' }}>
            {/* Left Nav */}
            <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {industriesData.map((ind, idx) => (
                <button
                  key={ind.slug}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '20px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeTab === idx ? 'rgba(107,21,48,0.04)' : 'transparent',
                    borderLeft: `4px solid ${activeTab === idx ? COLORS.burgundy : 'transparent'}`,
                    color: activeTab === idx ? COLORS.textOnLight : COLORS.textSub,
                    fontWeight: activeTab === idx ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '15px'
                  }}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, minHeight: '400px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
                    {industriesData[activeTab].name} APPROACH
                  </p>
                  <p style={{ color: COLORS.textSub, fontSize: '17px', lineHeight: 1.65, marginBottom: '32px' }}>
                    {industriesData[activeTab].overview.body[0]}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {industriesData[activeTab].overview.capabilities.map(cap => (
                      <Link 
                        key={cap.slug}
                        to={`/capabilities/${cap.slug}`}
                        style={{ border: `1px solid ${ALPHAS.teal20}`, color: COLORS.teal, padding: '8px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {cap.name} →
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default IndustriesOverview;
