import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import PlaceholderImage from '../components/PlaceholderImage';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, ALPHAS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const capability = capabilitiesData.find(c => c.slug === slug);
  const navigate = useNavigate();

  if (!capability) {
    return <Navigate to="/capabilities" />;
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
              <Link to="/capabilities" style={{ color: 'inherit', textDecoration: 'none' }}>Capabilities</Link>
              <span style={{ color: COLORS.teal }}>›</span>
              <span style={{ color: '#FFFFFF' }}>{capability.name}</span>
            </div>

            <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              {capability.eyebrow}
            </p>
            <h1 style={{ color: COLORS.textOnDark, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.03em' }}>
              {capability.title} <span style={{ color: COLORS.teal }}>{capability.highlight}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.6, maxWidth: '520px', marginBottom: '42px' }}>
              {capability.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '18px' }}>
              <Link to="/contact" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Talk to an Expert
              </Link>
              <Link to="/capabilities" style={{ background: 'transparent', border: `1px solid ${COLORS.gold}`, color: COLORS.gold, padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Explore Related
              </Link>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div style={{ flex: '0 0 45%' }}>
            <PlaceholderImage Icon={capability.icon} height="400px" label={capability.name} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: OVERVIEW / VALUE (LIGHT) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px' }}>
          <div style={{ flex: '0 0 60%' }}>
            <SectionHeader 
              eyebrow="BUSINESS VALUE"
              title={capability.overview.heading}
              highlight={capability.overview.highlight}
            />
            {capability.overview.body.map((p, i) => (
              <p key={i} style={{ color: COLORS.textSub, fontSize: '16px', lineHeight: 1.7, marginBottom: '20px' }}>{p}</p>
            ))}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '32px', flexWrap: 'wrap' }}>
              {capability.overview.outcomes.map(o => (
                <span key={o} style={{ border: `1px solid ${ALPHAS.teal20}`, color: COLORS.teal, background: ALPHAS.teal04, fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '4px', letterSpacing: '0.04em' }}>{o}</span>
              ))}
            </div>
          </div>

          <div style={{ flex: '0 0 35%' }}>
            <div style={{ borderTop: `4px solid ${COLORS.burgundy}`, background: COLORS.cardOnLight, borderRadius: '0 0 16px 16px', boxShadow: SHADOWS.lightCard, padding: '40px 32px' }}>
              <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>PROOF POINTS</p>
              {capability.overview.metrics.map((m, i) => (
                <div key={i} style={{ marginBottom: i === capability.overview.metrics.length - 1 ? 0 : '32px' }}>
                  <div style={{ color: COLORS.burgundy, fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}>{m.value}</div>
                  <div style={{ color: COLORS.textSub, fontSize: '14px', fontWeight: 500 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: CORE SERVICES (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            eyebrow="CORE SERVICES"
            title="Service"
            highlight="Areas"
            subtitle="Specialized services delivered within this capability pillar."
          />

          <div style={{ display: 'grid', gridTemplateColumns: capability.services.length > 3 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: '24px', marginTop: '64px' }}>
            {capability.services.map(svc => (
              <div key={svc.name} style={{ borderTop: `3px solid ${COLORS.teal}`, borderRadius: '0 0 12px 12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${ALPHAS.teal12}`, padding: '24px' }}>
                <div style={{ width: '40px', height: '40px', background: ALPHAS.teal08, border: `1px solid ${ALPHAS.teal20}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svc.icon size={20} color={COLORS.teal} strokeWidth={1.5} />
                </div>
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '17px', marginBottom: '10px' }}>{svc.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', lineHeight: 1.65 }}>{svc.description}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', textAlign: 'center', marginTop: '64px', fontStyle: 'italic' }}>
            All services delivered within the QCT SECURE Framework
          </p>
        </div>
      </section>

      {/* ─── SECTION 4: DELIVERY APPROACH (LIGHT) ─── */}
      <section style={{ background: '#FFFFFF', padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionHeader 
            eyebrow="METHODOLOGY"
            title="Delivery"
            highlight="Approach"
            subtitle="How QuasarCyberTech ensures operational excellence within this capability."
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '80px', position: 'relative' }}>
            {/* Connector Line */}
            <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '1px', background: COLORS.teal, opacity: 0.15, zIndex: 0 }} />
            
            {capability.delivery.map((step, idx) => (
              <div key={step.step} style={{ textAlign: 'center', width: '20%', zIndex: 1, background: '#FFFFFF' }}>
                <div style={{ color: COLORS.teal, fontSize: '48px', fontWeight: 800, lineHeight: 1, marginBottom: '20px' }}>{step.step}</div>
                <h4 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '16px', marginBottom: '10px' }}>{step.title}</h4>
                <p style={{ color: COLORS.textSub, fontSize: '13px', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: INDUSTRIES (DARK) ─── */}
      <section style={{ background: SECTION_BACKGROUNDS.DARK, padding: '120px 2.5em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeader 
            isDark
            eyebrow="INDUSTRIES"
            title="Industry"
            highlight="Applications"
            subtitle={`QuasarCyberTech delivers ${capability.name} across enterprise sectors.`}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '64px' }}>
            {capability.industries.map(ind => (
              <div key={ind.slug} style={{ borderTop: `3px solid ${COLORS.teal}`, borderRadius: '0 0 14px 14px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${ALPHAS.teal12}`, padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '17px', marginBottom: '12px' }}>{ind.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>{ind.useCase}</p>
                <Link to={`/industries/${ind.slug}`} style={{ color: COLORS.teal, fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
                  Explore Industry →
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
              eyebrow="ECOSYSTEM"
              title="Powered by the"
              highlight="QCT Platform"
              subtitle="Innovation engineered to extend consulting into continuous visibility."
            />
            
            <div style={{ borderTop: `3px solid ${COLORS.burgundy}`, background: '#FFFFFF', borderRadius: '0 0 16px 16px', boxShadow: SHADOWS.lightCard, padding: '40px', marginTop: '40px' }}>
              <h3 style={{ color: COLORS.textOnLight, fontWeight: 800, fontSize: '24px', marginBottom: '8px' }}>{capability.platformLink.name}</h3>
              <p style={{ color: COLORS.textSub, fontSize: '14px', marginBottom: '32px' }}>{capability.platformLink.subtitle}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px', textAlign: 'left' }}>
                {capability.platformLink.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <CheckCircle2 size={18} color={COLORS.teal} />
                    <span style={{ color: COLORS.textOnLight, fontSize: '14px', fontWeight: 500 }}>{h}</span>
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
                  gap: '10px', 
                  background: COLORS.burgundy, 
                  color: '#FFFFFF', 
                  padding: '16px 36px', 
                  borderRadius: '4px', 
                  fontWeight: 700, 
                  fontSize: '13px', 
                  textDecoration: 'none', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
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
