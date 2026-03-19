import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS } from '../config/themeConfig';
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
          alignItems: 'center',
          padding: '140px 2.5em 80px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
          {/* Left Column (55%) */}
          <div style={{ flex: '0 0 55%' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <Link to="/industries" style={{ color: 'inherit', textDecoration: 'none' }}>Industries</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <span style={{ color: '#FFFFFF' }}>{industry.name}</span>
            </div>

            <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              {industry.eyebrow}
            </p>
            <h1 style={{ color: COLORS.textOnDark, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.03em' }}>
              {industry.title} <br /><span style={{ color: COLORS.teal }}>{industry.highlight}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '520px', marginBottom: '42px' }}>
              {industry.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '18px' }}>
              <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Talk to an Expert
              </Link>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div style={{ flex: '0 0 45%' }}>
            <PlaceholderImage Icon={industry.icon} height="400px" label={industry.name} />
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
              <PlaceholderImage label="Industry Delivery Photography" height="380px" />
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
