import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';
import Seo from '../components/seo/Seo';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { COLORS, GRADIENTS, LAYOUT_CONTROLS } from '../config/themeConfig';

import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema, createSoftwareApplicationSchema } from '../seo/schema';

// Import Logos & Screenshots
const qStellarLogo = ASSETS.logos.platforms.qstellarDark;
const qPulseLogo = ASSETS.logos.platforms.qpulseLight;
const qLeapLogo = ASSETS.logos.platforms.qleap;

// Screenshots
const qStellarScreenshot = ASSETS.platforms.screenshots.qstellar;
const qPulseScreenshot = ASSETS.platforms.screenshots.qpulse;
const qrgtScreenshot = ASSETS.platforms.screenshots.qrgt;
const qLeapScreenshot = ASSETS.platforms.screenshots.qleap;

const PF = {
  mobileImageScale: 1.1,
  mobileSectionPadY: '3rem',
  mobileScreenshotPad: '0',
  qPulseLogoHeight: '98px',
};

const BrowserFrame: React.FC<{
  children: React.ReactNode,
  bgColor?: string,
  isDark?: boolean,
  width?: string,
  maxWidth?: string
}> = ({ children, bgColor = '#eef2f6', isDark = false, width = '100%', maxWidth = '720px' }) => {
  // --- Styling Variables ---
  const ribbonHeight = '42px';
  const darkRibbonBg = 'rgba(107, 21, 48, 0.25)'; // Translucent brand burgundy
  const lightRibbonBg = 'rgba(0,0,0,0.04)';

  return (
    <div style={{
      width: width,
      maxWidth: maxWidth,
      borderRadius: '12px',
      overflow: 'hidden',
      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Mac Control Dots Bar */}
      <div style={{
        height: ribbonHeight,
        background: isDark ? darkRibbonBg : lightRibbonBg,
        backdropFilter: isDark ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: isDark ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '8px',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }} />
      </div>

      <div style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        background: bgColor
      }}>
        {children}
      </div>
    </div>
  );
};

export default function Platforms() {
  return (
    <div className="min-h-screen text-white selection:bg-[#6B1530] selection:text-white" style={{ background: GRADIENTS.PLATFORMS_PAGE_BG }}>
      <Seo
        title="Cybersecurity Platforms — QStellar, QPulse, QRGT & QLeap | India"
        description="Explore QuasarCyberTech's cybersecurity platform ecosystem. QStellar for AI-powered asset intelligence, QPulse for threat intelligence, QRGT for penetration testing as a service, and QLeap for cybersecurity training in India."
        path="/platforms"
        image={ASSETS.backdrops.platformsHero}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Platforms', path: '/platforms' },
          ]),
          createSoftwareApplicationSchema({
            name: 'QStellar',
            description: 'AI-powered asset intelligence and vulnerability management platform for continuous security visibility, asset discovery, and risk prioritization.',
            url: 'https://qstellar.co',
            applicationCategory: 'SecurityApplication',
          }),
          createSoftwareApplicationSchema({
            name: 'QPulse',
            description: 'Cybersecurity intelligence and insights portal delivering curated threat intelligence, vulnerability research, and security updates for enterprise teams.',
            url: 'https://qpulse.quasarcybertech.com',
            applicationCategory: 'SecurityApplication',
          }),
          createSoftwareApplicationSchema({
            name: 'QRGT',
            description: 'Penetration Testing as a Service (PTaaS) platform for continuous, governed penetration testing programs with remediation tracking and workflow management.',
            url: 'https://quasarcybertech.com/platforms',
            applicationCategory: 'SecurityApplication',
          }),
          createSoftwareApplicationSchema({
            name: 'QLeap',
            description: 'Cybersecurity training and talent development platform offering immersive, real-world simulations and hands-on lab environments for security practitioners.',
            url: 'https://qleap-ed.com',
            applicationCategory: 'EducationalApplication',
          }),
        ]}
      />
      <Navbar />

      <main>
        <PageHero
          title="Security"
          highlight="Platforms & Ecosystem"
          subtitle="QuasarCyberTech develops and maintains an ecosystem of proprietary platforms designed to provide visibility, continuous testing, and asset intelligence for the modern enterprise."
          image={ASSETS.backdrops.platformsHero}
          imageScale={1}
          imageFit="cover"
          imageOpacity={0.9}
          visualWidth="58%"
          maskStart="0%"
          maskEnd="80%"
          imagePositionX="83%"
          imagePositionY="50%"
          imageBlendSoftness="70%"
          imageBlendStartPercent="0%"
          breadcrumbPaths={['Home']}
          currentName="Platforms"
          scrollTargetId="platform-highlights"
          scrollButtonText="Explore Platforms"
          scrollMethod="motion"
        />

        {/* ─── PLATFORM 01: QStellar (LIGHT) ─── */}
        <section
          id="platform-highlights"
          className="platform-section"
          style={{
            background: '#FCFAF8',
            display: 'flex',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            flexWrap: 'wrap',
            alignItems: 'center', // Align both columns naturally
            scrollMarginTop: '100px'
          }}>
          {/* Text Column */}
          <div className="platform-text-col" style={{ flex: '1 1 min(100%, 480px)', padding: `80px ${LAYOUT_CONTROLS.global.paddingX}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.burgundy, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>01</span>
            <img src={qStellarLogo} alt="QuasarCyberTech | QStellar Platform Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
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
          <div className="platform-media-col" style={{ flex: '1 1 min(100%, 480px)', background: '#FCFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <BrowserFrame bgColor="#eef2f6" width="100%" maxWidth="720px">
              <img
                src={qStellarScreenshot}
                alt="QuasarCyberTech | QStellar Asset Intelligence Dashboard"
                className="platform-shot"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </BrowserFrame>
          </div>
        </section>

        {/* ─── PLATFORM 02: QPulse (DARK) ─── */}
        <section className="platform-section" style={{
          background: GRADIENTS.HERO_BG,
          display: 'flex',
          flexWrap: 'wrap-reverse',
          alignItems: 'center'
        }}>
          <div className="platform-media-col" style={{ flex: '1 1 min(100%, 480px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
            <BrowserFrame bgColor="#081026" isDark={true} width="100%" maxWidth="720px">
              <img src={qPulseScreenshot} alt="QuasarCyberTech | QPulse Threat Intelligence Portal" className="platform-shot" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </BrowserFrame>
          </div>
          <div className="platform-text-col" style={{ flex: '1 1 min(100%, 480px)', padding: `80px ${LAYOUT_CONTROLS.global.paddingX}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.gold, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>02</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <img src={qPulseLogo} alt="QuasarCyberTech | QPulse Platform Logo" style={{ height: PF.qPulseLogoHeight, width: 'auto', objectFit: 'contain' }} />
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
        <section id="qrgt" className="platform-section" style={{
          background: '#FCFAF8',
          display: 'flex',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div className="platform-text-col" style={{ flex: '1 1 min(100%, 480px)', padding: `80px ${LAYOUT_CONTROLS.global.paddingX}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.burgundy, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>03</span>
            <img src={ASSETS.logos.platforms.qrgtLight} alt="QuasarCyberTech | QRGT Platform Logo" style={{ height: '82px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px', marginLeft: '-2px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: '#0B1F3B', lineHeight: 1.3 }}>Penetration Testing as a Service (PTaaS) Platform</h2>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QRGT transforms traditional penetration testing into a continuous, governed program. Track findings and manage remediation workflows in one platform.
            </p>
            <a href="/contact" style={{
              background: COLORS.burgundy, color: 'white', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              Explore QRGT Platform <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
          <div className="platform-media-col" style={{ flex: '1 1 500px', background: '#FCFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
            <BrowserFrame bgColor="#f8fafc" width="100%" maxWidth="720px">
              <img src={qrgtScreenshot} alt="QuasarCyberTech | QRGT Penetration Testing Platform" className="platform-shot" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </BrowserFrame>
          </div>
        </section>

        {/* ─── PLATFORM 04: QLeap (DARK - SYNCED RHYTHM) ─── */}
        <section className="platform-section" style={{
          background: GRADIENTS.HERO_BG,
          display: 'flex',
          flexWrap: 'wrap-reverse',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          alignItems: 'center'
        }}>
          <div className="platform-media-col" style={{ flex: '1 1 min(100%, 480px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
            <BrowserFrame bgColor="#040b1d" isDark={true} width="100%" maxWidth="720px">
              <img
                src={qLeapScreenshot}
                alt="QuasarCyberTech | QLeap Cybersecurity Training Simulations"
                className="platform-shot"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </BrowserFrame>
          </div>
          <div className="platform-text-col" style={{ flex: '1 1 min(100%, 480px)', padding: `80px ${LAYOUT_CONTROLS.global.paddingX}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: COLORS.gold, letterSpacing: '0.2em', marginBottom: '12px', fontWeight: 700 }}>04</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
              <img src={qLeapLogo} alt="QuasarCyberTech | QLeap Platform Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', lineHeight: 1.3 }}>Cybersecurity Training & Talent</h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              Building the next generation of cybersecurity practitioners through immersive, real-world simulations and hands-on laboratory environments.
            </p>
            <a href="https://qleap-ed.com" target="_blank" rel="noopener noreferrer" style={{
              background: COLORS.burgundy, color: 'white', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              Explore QLeap Platform <ExternalLink size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
        </section>

        <CTASection theme="light" />
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .platform-section {
            gap: 1rem !important;
          }

          .platform-text-col,
          .platform-media-col {
            padding: ${PF.mobileSectionPadY} ${LAYOUT_CONTROLS.global.paddingX} !important;
          }

          .platform-media-col {
            padding-top: 0 !important;
          }

          .platform-shot {
            transform: scale(${PF.mobileImageScale});
            transform-origin: center center;
          }

          .platform-media-col img[alt='Dashboard'],
          .platform-media-col img[alt='Portal'],
          .platform-media-col img[alt='Platform'],
          .platform-media-col img[alt='Simulations'] {
            padding: ${PF.mobileScreenshotPad} !important;
          }
        }
      `}} />
    </div>
  );
}
