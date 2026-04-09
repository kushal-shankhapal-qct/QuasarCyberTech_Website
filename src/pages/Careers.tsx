import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Code2, Globe, Globe2, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import Seo from '../components/seo/Seo';
import { COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema, createCareersPageSchema } from '../seo/schema';

// ─── DATA ───────────────────────────────────────────────────────────────────

const roles = [
  {
    title: "Security Consultant",
    applyUrl: "https://forms.gle/JHBjAqYvjpvTthip8",
    description: "Lead client-facing engagements across advisory, assessments, and enterprise security programs.",
    icon: Shield,
  },
  {
    title: "Product Development Engineer",
    applyUrl: "https://forms.gle/XiKeCpAN5S4sSUcw6",
    description: "Build and ship product capabilities across QRGT, QStellar, and QPulse ecosystems.",
    icon: Code2,
  },
  {
    title: "HR Executive",
    applyUrl: "https://forms.gle/T2tsbASiPWiguDNE6",
    description: "Drive hiring operations, people processes, and culture-building across growing teams.",
    icon: Target,
  },
  {
    title: "SOC Analyst",
    applyUrl: "https://forms.gle/5JW3RjVefc7qnFSJ9",
    description: "Monitor, investigate, and respond to security events across managed enterprise environments.",
    icon: TrendingUp,
  },
  {
    title: "Internship",
    applyUrl: "https://forms.gle/ZqnMXRnjSQzFmbnX8",
    description: "Get hands-on exposure to real delivery projects, research, and platform engineering workflows.",
    icon: Globe,
  },
  {
    title: "Sales and Business Development",
    applyUrl: "https://forms.gle/VW1TzpADkVVx2Nca6",
    description: "Grow enterprise pipeline and strategic partnerships by mapping capabilities to client outcomes.",
    icon: Globe2,
  },
];

const values = [
  { icon: Target, title: "Ownership", desc: "Work on real enterprise engagements from your first week. No bench time, no busywork." },
  { icon: TrendingUp, title: "Learning", desc: "Exposure to cutting-edge offensive security, AI threat testing, and SOC operations." },
  { icon: Code2, title: "Engineering", desc: "Build internal platforms — QRGT, QStellar, QPulse — alongside client delivery." },
  { icon: Globe, title: "Network", desc: "Join India's leading tech industry body memberships and global partnerships." },
  { icon: Globe2, title: "Cross-Industry Exposure", desc: "Work with clients across banking, FinTech, healthcare, SaaS, and enterprise manufacturing across 15+ countries." },
  { icon: Shield, title: "Mission-Driven Work", desc: "Protecting the organizations that run the digital economy is not abstract here — it is Tuesday morning." }
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sidebarMargin = "clamp(1rem, 5vw, 3rem)";
  const sectionPad = {
    paddingLeft: sidebarMargin,
    paddingRight: sidebarMargin,
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: TYPOGRAPHY.fontBody }}>
      <Seo
        title="Cybersecurity Careers — Join India's Leading Cybersecurity Firm"
        description="Join QuasarCyberTech — India's leading cybersecurity consulting firm. Open roles in penetration testing, SOC analysis, cloud security consulting, security engineering, and cyber research across Nashik, Mumbai, and remote."
        path="/careers"
        image={ASSETS.backdrops.careersHero}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
          createCareersPageSchema(),
        ]}
      />
      <Navbar />

      {/* ── 1: THE HERO SECTION (Standardized) ── */}
      <PageHero
        title={<>Build the Future of <br />Cybersecurity with Us</>}
        highlight=""
        subtitle="Join one of the fastest-growing cybersecurity consulting and engineering firms where ownership, learning, and innovation come together to create real enterprise impact."
        currentName="Careers"
        breadcrumbPaths={["Home"]}
        scrollTargetId="open-roles"
        scrollButtonText="See Open Roles"
        backgroundOverride={GRADIENTS.CAREERS_HERO_BG}
        image={ASSETS.backdrops.careersHero}
        imageOpacity={1}
        imageScale={1}
        imagePositionX="center"
        imagePositionY="center"
        imageBlendStart = "0%"
        imageBlendEnd = "100%"
        imageBlendSoftness="100%"
        imageBlendStartPercent="0%"
      />

      {/* ── 2: GROWTH STORY SECTION (Light Mode) ── */}
      <section
        style={{
          background: '#F5F7FA',
          paddingTop: 'var(--careers-section-pt)',
          paddingBottom: 'var(--careers-section-pb)',
          ...sectionPad,
        }}
      >
        <div style={{ width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ height: '1.5px', width: '48px', background: COLORS.gold }} />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>COMPANY MILESTONES</span>
          </div>

          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: '#000000', marginBottom: '24px', fontWeight: 800, lineHeight: 1.1 }}>
            Our <span style={{ color: COLORS.burgundy }}>Growth</span> Story
          </h2>

          <p style={{ ...TYPOGRAPHY.bodyLarge, color: '#64748B', lineHeight: 1.8, maxWidth: '42rem' }}>
            At QuasarCyberTech, we are building more than a cybersecurity company. We are building a high-performance consulting, engineering, and security platform ecosystem serving enterprises across industries. As we scale, we are looking for ambitious professionals and emerging talent who want to grow with us.
          </p>
        </div>
      </section>

      {/* ── 3: WHY JOIN (Dark Mode) ── */}
      <section
        style={{
          background: '#0A0A0F',
          backgroundImage: GRADIENTS.CAREERS_WHY_JOIN_BG,
          paddingTop: 'var(--careers-section-pt)',
          paddingBottom: 'var(--careers-section-pb)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          ...sectionPad,
        }}
      >
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ height: '1.5px', width: '48px', background: COLORS.gold }} />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>LIFE AT QCT</span>
          </div>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: '#FFFFFF', marginBottom: '24px', fontWeight: 800 }}>
            Why Join <span style={{ color: COLORS.gold }}>QuasarCyberTech</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', maxWidth: '42rem', marginBottom: '64px', lineHeight: 1.6 }}>
            We are building a high-performance team where ownership, learning, and real enterprise impact come standard.
          </p>

          <div className="careers-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.04)',
                  borderTop: `3px solid ${COLORS.gold}`,
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  padding: '28px',
                  borderRadius: '0 0 12px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '160px',
                  justifyContent: 'center',
                  transition: 'border 0.3s ease'
                }}
              >
                <div style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: COLORS.gold,
                  opacity: 0.2,
                }}>
                  <v.icon size={64} strokeWidth={1} />
                </div>
                <h4 style={{ color: COLORS.gold, fontSize: '1.1rem', fontWeight: 600, position: 'relative', zIndex: 2, paddingRight: '60px' }}>{v.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, position: 'relative', zIndex: 2, paddingRight: '60px' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4: OPEN POSITIONS (Light Mode) ── */}
      <section
        id="open-roles"
        style={{
          background: '#FFFFFF',
          paddingTop: 'var(--careers-section-pt)',
          paddingBottom: 'var(--careers-section-pb)',
          ...sectionPad,
        }}
      >
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ height: '1.5px', width: '48px', background: COLORS.gold }} />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>CAREERS OPENINGS</span>
          </div>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: '#000000', marginBottom: '16px', fontWeight: 800 }}>
            Open <span style={{ color: COLORS.burgundy }}>Positions</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.125rem', maxWidth: '42rem', marginBottom: '64px', lineHeight: 1.6 }}>
            We are hiring across consulting, engineering, and operations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }} className="roles-grid">
            {roles.map((role, i) => {
              const RoleIcon = role.icon;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#F5F7FA',
                    borderLeft: `4px solid ${COLORS.burgundy}`,
                    borderTop: '1px solid #E2E8F0',
                    borderRight: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    borderRadius: '0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    minHeight: '220px',
                    transition: 'transform 0.3s ease, border-left-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = COLORS.gold;
                    const iconDiv = e.currentTarget.querySelector('div[style*="position: absolute"]');
                    if (iconDiv) (iconDiv as HTMLElement).style.opacity = '0.4';
                    const applyLink = e.currentTarget.querySelector('a');
                    if (applyLink) applyLink.style.color = COLORS.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = COLORS.burgundy;
                    const iconDiv = e.currentTarget.querySelector('div[style*="position: absolute"]');
                    if (iconDiv) (iconDiv as HTMLElement).style.opacity = '0.2';
                    const applyLink = e.currentTarget.querySelector('a');
                    if (applyLink) applyLink.style.color = COLORS.burgundy;
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: COLORS.gold,
                    opacity: 0.2,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                  }}>
                    <RoleIcon size={64} strokeWidth={1} />
                  </div>

                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3, margin: 0, position: 'relative', zIndex: 2 }}>{role.title}</h4>

                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.55, margin: 0, position: 'relative', zIndex: 2 }}>
                    {role.description}
                  </p>

                  <a
                    href={role.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'transparent',
                      color: COLORS.burgundy,
                      border: 'none',
                      padding: '0',
                      borderRadius: '0',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      marginTop: 'auto',
                      position: 'relative',
                      zIndex: 2,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#8B1E3F';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = COLORS.burgundy;
                    }}
                  >
                    Apply Now
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5: QLEAP INTERNSHIP PATHWAY (Dark Mode) ── */}
      <section
        style={{
          background: '#0A0A0F',
          backgroundImage: GRADIENTS.CAREERS_QLEAP_BG,
          paddingTop: 'clamp(32px, 3vw, 48px)',
          paddingBottom: 'clamp(32px, 3vw, 48px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          ...sectionPad,
        }}
      >
        <div className="qleap-container" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)', gap: '64px', alignItems: 'stretch' }}>
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ height: '1.5px', width: '48px', background: COLORS.gold }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>QLEAP PATHWAY</span>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', marginBottom: '24px' }}>
              Internship to <span style={{ color: COLORS.gold }}>Excellence</span>
            </h3>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '48px' }}>
              Through QLeap, we identify, train, and nurture cybersecurity talent through structured learning, hands-on projects, and internship opportunities. High-performing candidates may be considered for full-time roles within QuasarCyberTech.
            </p>

            <div style={{ display: 'flex' }}>
              <a
                href="https://qleap-ed.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  background: COLORS.burgundy,
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#8B1E3F'}
                onMouseOut={(e) => e.currentTarget.style.background = COLORS.burgundy}
              >
                Explore QLeap
              </a>
            </div>
          </div>

          {/* Right Image Container - Adjust marginLeft to move it further left/right */}
          <div style={{
            borderRadius: '16px 0 0 16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRight: 'none',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '-32px' // ← Increase/decrease this to move screenshot horizontally
          }}>
            <img
              src={ASSETS.screenshots.qleap}
              alt="QuasarCyberTech | QLeap Learning Pathway"
              style={{
                width: '100%',
                flexGrow: 1,
                objectFit: 'cover',
                objectPosition: '40% center', // ← Change 10% to move the image content inside the frame
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 6: CTA SECTION (Light) ── */}
      <CTASection
        theme="light"
        eyebrowText="READY TO APPLY?"
        title={<>Ready to Join the <span style={{ color: COLORS.burgundy }}>Team</span>?</>}
        subtitle="We review applications on a rolling basis. Apply today and our team will be in touch within 5 business days."
        primaryAction={{ label: "Apply Now", link: "#open-roles" }}
        secondaryAction={{ label: "View Open Roles", link: "#open-roles" }}
      />

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --careers-section-pt: clamp(40px, 5vw, 80px);
          --careers-section-pb: clamp(40px, 5vw, 80px);
        }
        @media (max-width: 1024px) {
          .careers-values-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .roles-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .qleap-container {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .careers-values-grid {
            grid-template-columns: 1fr !important;
          }
          .roles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};

export default Careers;
