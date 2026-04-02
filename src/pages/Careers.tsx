import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Code2, Globe, Globe2, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import Seo from '../components/seo/Seo';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema, createCareersPageSchema } from '../seo/schema';

// ─── DATA ───────────────────────────────────────────────────────────────────

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfshcNxujjrPu2rXQlWk1Mup2DH1dP6fIgPL_98lStWw1zckg/viewform";

const roles = [
  { title: "Cybersecurity Consultant", location: "Nashik / Remote", experience: "2–5 yrs", type: "Full-Time", description: "Lead client-facing security engagements across VAPT, compliance, and advisory programs." },
  { title: "SOC Analyst", location: "Nashik", experience: "1–3 yrs", type: "Full-Time", description: "Monitor, detect, and respond to threats across managed client environments." },
  { title: "Security Engineer", location: "Remote", experience: "2–4 yrs", type: "Full-Time", description: "Build and maintain internal security platforms including QRGT and QStellar." },
  { title: "Cloud Security Consultant", location: "Remote / Hybrid", experience: "3–6 yrs", type: "Full-Time", description: "Deliver cloud security assessments, CSPM implementations, and AWS/Azure reviews." },
  { title: "Pre-Sales & Business Development", location: "Nashik / Mumbai", experience: "2–4 yrs", type: "Full-Time", description: "Drive enterprise pipeline by translating security capabilities into client proposals." },
  { title: "Full Stack Developer", location: "Nashik / Remote", experience: "2–5 yrs", type: "Full-Time", description: "Build features across the QuasarCyberTech platform ecosystem — QRGT, QStellar, QPulse." },
  { title: "Security Research Intern", location: "Remote", experience: "0–1 yr", type: "Internship", description: "Contribute to vulnerability research, threat intelligence, and security advisory content." },
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

  const sectionPad = {
    paddingLeft: LAYOUT_CONTROLS.section.paddingX,
    paddingRight: LAYOUT_CONTROLS.section.paddingX,
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: TYPOGRAPHY.fontBody }}>
      <Seo
        title="Cybersecurity Careers at QuasarCyberTech"
        description="Explore cybersecurity consulting, engineering, SOC, cloud security, and research career opportunities at QuasarCyberTech. Join India's leading cybersecurity firm."
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
      />

      {/* ── 2: GROWTH STORY SECTION (Light Mode) ── */}
      <section
        style={{
          background: '#F5F7FA',
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'left' }}>
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
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, borderColor: 'rgba(214,176,92,0.2)' }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '28px',
                  borderRadius: '12px',
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
                  opacity: 0.08,
                }}>
                  <v.icon size={64} strokeWidth={1} />
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600, position: 'relative', zIndex: 2, paddingRight: '60px' }}>{v.title}</h4>
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
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="roles-grid">
            {roles.map((role, i) => {

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.04)' }}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '24px',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                  }}
                >
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{role.title}</h4>

                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      background: 'transparent',
                      color: COLORS.burgundy,
                      border: `1.5px solid ${COLORS.burgundy}`,
                      padding: '10px 16px',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(107, 21, 48, 0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
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
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          ...sectionPad,
        }}
      >
        <div className="qleap-container" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)', gap: '64px', alignItems: 'stretch' }}>
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
              alt="QLeap Pathway"
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
        title={<>Ready to Join the <span style={{ color: COLORS.gold }}>Team?</span></>}
        subtitle="We review applications on a rolling basis. Apply today and our team will be in touch within 5 business days."
        primaryAction={{ label: "Apply Now", link: GOOGLE_FORM_URL, isExternal: true }}
        secondaryAction={{ label: "View Open Roles", link: "#open-roles" }}
      />

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .roles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .qleap-container {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .roles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};

export default Careers;
