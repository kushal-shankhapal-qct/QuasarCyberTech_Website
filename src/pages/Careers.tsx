import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import Seo from '../components/seo/Seo';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema, createCareersPageSchema } from '../seo/schema';

// ─── DATA ───────────────────────────────────────────────────────────────────

const openRoles = [
  "Cybersecurity Consultant",
  "SOC Analyst",
  "Security Engineer",
  "Cloud Security Consultant",
  "Pre-Sales & Business Development",
  "Full Stack Developer",
  "Security Research Intern"
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
        title={<>Build the Future of <span style={{ color: COLORS.gold }}>Cybersecurity</span> with QuasarCyberTech</>}
        highlight=""
        subtitle="Join one of the fastest-growing cybersecurity consulting and engineering firms where ownership, learning, and innovation come together to create real enterprise impact."
        currentName="Careers"
        breadcrumbPaths={["Home"]}
        scrollTargetId="growth-story"
        scrollButtonText="See Open Roles"
        image={ASSETS.backdrops.careersHero}
        imageOpacity={0.6}
        rightContent={<div style={{ width: '100%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle at center, rgba(107,21,48,0.2) 0%, transparent 70%)' }} />}
      >
        <div style={{ marginTop: '24px' }}>
          <a
            href="https://qleap-ed.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: COLORS.burgundy,
              color: '#FFFFFF',
              padding: '16px 32px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background 0.3s'
            }}
          >
            Apply via QLeap Pathway
          </a>
        </div>
      </PageHero>

      {/* ── 2: GROWTH STORY SECTION (Light Mode) ── */}
      <section
        id="growth-story"
        style={{
          background: '#FFFFFF',
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
          
          <p style={{ ...TYPOGRAPHY.bodyLarge, color: '#4A5568', lineHeight: 1.8, maxWidth: '900px' }}>
            At QuasarCyberTech, we are building more than a cybersecurity company. We are building a high-performance consulting, engineering, and security platform ecosystem serving enterprises across industries. As we scale, we are looking for ambitious professionals and emerging talent who want to grow with us.
          </p>
        </div>
      </section>

      {/* ── 3: EXPERTISE & LEADERSHIP (Light Mode) ── */}
      <section
        style={{
          background: '#F8FAFC',
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          borderTop: '1px solid #E2E8F0',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '64px' }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', marginBottom: '24px' }}>Expertise & Leadership</h3>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.8 }}>
              Executive Cyber Advisory helps leadership teams convert cyber uncertainty into a clear decision agenda. We align business priorities, threat exposure, and governance accountability so strategic programs move faster with controlled risk.
            </p>
          </div>
          
          {/* Right Column Grid */}
          <div style={{ flex: '1 1 600px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: "Ownership", desc: "Work on real enterprise engagements from your first week. No bench time, no busywork." },
              { title: "Learning", desc: "Exposure to cutting-edge offensive security, AI threat testing, and SOC operations." },
              { title: "Engineering", desc: "Build internal platforms — QRGT, QStellar, QPulse — alongside client delivery." },
              { title: "Network", desc: "Join India's leading tech industry body memberships and global partnerships." }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  padding: '32px',
                  borderRadius: '0 12px 12px 0', // Sharp corners on the left
                  border: '1px solid #E2E8F0',
                  borderLeft: `3.5px solid ${COLORS.burgundy}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#000', marginBottom: '12px' }}>{item.title}</h4>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4: OPEN POSITIONS SECTION (Dark Mode with Radial Gradient) ── */}
      <section
        id="open-positions"
        style={{
          background: GRADIENTS.DARK_SECTION_BG, // Proper radial gradient from theme
          borderTop: '1px solid rgba(214,176,92,0.15)',
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: '#FFFFFF', marginBottom: '64px', fontWeight: 800 }}>Open Positions</h2>
          
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '20px' 
            }}
            className="positions-grid"
          >
            {openRoles.map((role, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, background: 'rgba(255,255,255,0.06)' }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: `3.5px solid ${COLORS.burgundy}`,
                  padding: '32px 24px',
                  borderRadius: '0 0 12px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  justifyContent: 'space-between',
                  minHeight: '180px',
                  transition: 'background 0.3s'
                }}
              >
                <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>{role}</h4>
                <Link
                  to={`/careers/apply?role=${encodeURIComponent(role)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: COLORS.gold,
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em'
                  }}
                >
                  Apply Now <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5: QLEAP INTERNSHIP PATHWAY (Light Mode) ── */}
      <section
        style={{
          background: '#FFFFFF', // Light mode as requested
          paddingTop: 'clamp(80px, 8vw, 120px)',
          paddingBottom: 'clamp(80px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #E2E8F0',
          ...sectionPad,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
          {/* Left Text */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: COLORS.burgundy, textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>QLEAP PATHWAY</span>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', marginBottom: '24px' }}>Internship to Excellence</h3>
            <p style={{ fontSize: '17px', color: '#4A5568', lineHeight: 1.8 }}>
              Through QLeap, we identify, train, and nurture cybersecurity talent through structured learning, hands-on projects, and internship opportunities. High-performing candidates may be considered for full-time roles within QuasarCyberTech.
            </p>
          </div>
          
          {/* Right Image (No Roundness) */}
          <div style={{ overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}>
            <img 
              src={ASSETS.screenshots.qleap} 
              alt="QLeap Pathway" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 0 }} 
            />
          </div>
        </div>
      </section>

      {/* ── 6: CTA SECTION (Dark) ── */}
      <CTASection 
        theme="dark" 
        eyebrowText="READY TO APPLY?"
        title={<>Secure Your Future <span style={{ color: COLORS.gold }}>with Us</span></>}
        subtitle="Join our mission to defend the digital frontier and build your career in a high-performance environment."
        primaryAction={{ label: "Go to Application Form", link: "/careers/apply" }}
        secondaryAction={{ label: "Back to Roles", link: "#open-positions" }}
      />

      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1100px) {
          .positions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .positions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};

export default Careers;
