import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Shield, Database, Activity, Target, ExternalLink } from 'lucide-react';
import { COLORS, TYPOGRAPHY, ALPHAS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS } from '../config/themeConfig';

import { ASSETS } from '@/constants/assets';

// Import Logos & Screenshots removed - now using ASSETS constant
const qStellarLogo = ASSETS.logos.platforms.qstellar;
const qPulseLogo = ASSETS.logos.platforms.qpulse;
const qrgtLogo = ASSETS.logos.platforms.qrgt;
const qLeapLogo = ASSETS.logos.platforms.qleap;

// Screenshots (I'll map them to the new paths)
const qStellarScreenshot = ASSETS.screenshots.qstellar;
const qPulseScreenshot = ASSETS.screenshots.qpulse;

export default function Platforms() {
  return (
    <div className="min-h-screen bg-[#040B1D] text-white selection:bg-[#6B1530] selection:text-white">
      <Header />
      
      <main>
        {/* ─── HERO SECTION (Standardized Architecture) ─── */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
            background: GRADIENTS.HERO_BG,
            overflow: 'hidden',
            fontFamily: TYPOGRAPHY.fontBody,
          }}
        >
          {/* Left Content (60%) */}
          <div style={{ 
            flex: '0 0 60%', 
            paddingLeft: '2.5rem', 
            paddingRight: '4rem', 
            paddingBottom: '3rem', 
            position: 'relative', 
            zIndex: 10 
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                ...TYPOGRAPHY.heroTitle,
                fontFamily: TYPOGRAPHY.fontHeading,
                color: COLORS.textOnDark,
                marginBottom: '28px',
                lineHeight: 1.05
              }}
            >
              Security <span style={{ color: COLORS.gold }}>Platforms</span> &<br />
              Ecosystem
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                ...TYPOGRAPHY.bodyLarge,
                color: 'rgba(255,255,255,0.76)',
                textAlign: 'left',
                maxWidth: '100%',
                marginBottom: '42px',
                lineHeight: 1.8
              }}
            >
              QuasarCyberTech combines cybersecurity consulting expertise with platform innovation — delivering continuous visibility, accelerated remediation, and intelligence-driven security operations.
            </motion.p>
          </div>

          {/* Right Visual (40%) with Standard Masking */}
          <div style={{ 
            flex: '0 0 40%', 
            height: '100vh', 
            position: 'relative',
            maskImage: `
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
              linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskImage: `
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
              linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskComposite: 'destination-in',
            maskComposite: 'intersect'
          }}>
            <img 
              src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg" // Modern server room/code
              alt="Security Platforms" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'brightness(0.9)' }} 
            />
          </div>
        </section>

        {/* ─── PLATFORM 01: QStellar (LIGHT) ─── */}
        <section style={{ 
          background: SECTION_BACKGROUNDS.LIGHT, 
          minHeight: '520px', 
          display: 'flex', 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          flexWrap: 'wrap'
        }}>
          {/* Text Column */}
          <div style={{ flex: '1 1 500px', padding: '80px 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.burgundy, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>01</span>
            <img src={qStellarLogo} alt="QStellar" style={{ height: '48px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: '#0B1F3B', lineHeight: 1.3 }}>AI-Powered Asset Intelligence & Vulnerability Management</h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QStellar gives security teams continuous visibility into their asset landscape — automatically discovering, prioritizing, and tracking vulnerabilities with AI-assisted intelligence.
            </p>
            <a href="https://qstellar.co" target="_blank" rel="noopener noreferrer" style={{
              background: COLORS.burgundy, color: 'white', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              Visit QStellar Website <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
          <div style={{ flex: '1 1 500px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
             <div style={{ 
               width: '100%', 
               maxWidth: '520px', 
               borderRadius: '4px', 
               overflow: 'hidden', 
               boxShadow: SHADOWS.lightCard,
               border: '1px solid rgba(0,0,0,0.08)'
             }}>
               <img src={qStellarScreenshot} alt="QStellar Dashboard" style={{ width: '100%', display: 'block' }} />
             </div>
          </div>
        </section>

        {/* ─── PLATFORM 02: QPulse (DARK) ─── */}
        <section style={{ 
          background: GRADIENTS.HERO_BG, 
          minHeight: '520px', 
          display: 'flex', 
          flexWrap: 'wrap-reverse'
        }}>
          <div style={{ flex: '1 1 500px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
             <div style={{ 
               width: '100%', 
               maxWidth: '520px', 
               borderRadius: '4px', 
               overflow: 'hidden', 
               boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
               border: '1px solid rgba(255,255,255,0.08)'
             }}>
               <img src={qPulseScreenshot} alt="QPulse Screenshot" style={{ width: '100%', display: 'block' }} />
             </div>
          </div>
          <div style={{ flex: '1 1 500px', padding: '80px 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.gold, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>02</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
               <img src={qPulseLogo} alt="QPulse" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
               <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>QPulse</h3>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', lineHeight: 1.3, opacity: 0.9 }}>Cybersecurity Intelligence & Insights Portal</h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QPulse delivers curated cybersecurity intelligence, threat landscape updates, and security research to enterprise teams and practitioners.
            </p>
            <a href="https://qpulse.quasarcybertech.com" target="_blank" rel="noopener noreferrer" style={{
              background: COLORS.burgundy, color: 'white', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              Explore QPulse Portal <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
        </section>

        {/* ─── PLATFORM 03: QRGT (LIGHT) ─── */}
        <section style={{ 
          background: SECTION_BACKGROUNDS.LIGHT, 
          minHeight: '520px', 
          display: 'flex', 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 500px', padding: '80px 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.burgundy, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>03</span>
            <img src={qrgtLogo} alt="QRGT" style={{ height: '42px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: '#0B1F3B', lineHeight: 1.3 }}>Penetration Testing as a Service (PTaaS) Platform</h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QRGT transforms traditional penetration testing into a continuous, governed program. Track findings and manage remediation workflows in one platform.
            </p>
            <a href="/platforms/qrgt" style={{
              background: COLORS.burgundy, color: 'white', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              Explore QRGT Platform <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
          <div style={{ flex: '1 1 500px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
             <div style={{ width: '100%', maxWidth: '480px', height: '280px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', background: '#F8FAFC', padding: '40px', boxShadow: SHADOWS.lightCard }}>
               <div style={{ height: '3px', width: '40px', background: COLORS.burgundy, marginBottom: '24px' }} />
               {/* QRGT Text removed per user request */}
             </div>
          </div>
        </section>

        {/* ─── PLATFORM 04: QLeap (DARK - SMALL STRIP) ─── */}
        <section style={{ 
          background: GRADIENTS.HERO_BG, 
          padding: '60px 0',
          display: 'flex', 
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ width: '100%', maxWidth: '1280px', padding: '0 2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px' }}>
            <div style={{ flex: '1' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.gold, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700, display: 'block' }}>04</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
                 <img src={qLeapLogo} alt="QLeap Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain' }} />
                 <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: COLORS.gold, letterSpacing: '-0.02em', margin: 0 }}>QLeap</h3>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3 }}>Cybersecurity Training & Talent</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '800px' }}>
                Building the next generation of cybersecurity practitioners through immersive, real-world simulations and hands-on laboratory environments.
              </p>
              <a href="https://qleap-ed.com" target="_blank" rel="noopener noreferrer" style={{
                background: 'transparent', border: `2px solid #FFFFFF`, color: '#ffffff', padding: '12px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = COLORS.burgundy; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
              >
                Visit QLeap Platform <ExternalLink size={18} style={{ marginLeft: '10px' }} />
              </a>
            </div>
          </div>
        </section>

        <CTASection theme="light" showMetrics={false} />
      </main>

      <Footer />
    </div>
  );
}
