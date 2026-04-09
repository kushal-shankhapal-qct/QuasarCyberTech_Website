import * as React from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';
import Seo from '../components/seo/Seo';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { COLORS, GRADIENTS, LAYOUT_CONTROLS } from '../config/themeConfig';

import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema, createSoftwareApplicationSchema } from '../seo/schema';

type PlatformSection = {
  id: string;
  name: string;
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  logo: string;
  logoHeight: string;
  screenshot: string;
  screenshotAlt: string;
  screenshotBg: string;
  mediaPadding: string;
  ribbonTheme: 'burgundy' | 'white';
  titleColor: string;
  bodyColor: string;
  reverse?: boolean;
  borderTop?: string;
  sectionBg: string;
};

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
  mobileSectionPadY: '3rem',
  qPulseLogoHeight: '98px',
};

const platformSections: PlatformSection[] = [
  {
    id: 'platform-highlights',
    name: 'QStellar',
    title: 'AI-Powered Asset Intelligence & Vulnerability Management',
    description:
      'QStellar gives security teams continuous visibility into their asset landscape, automatically discovering, prioritizing, and tracking vulnerabilities with AI-assisted intelligence.',
    bullets: [
      'Continuous asset discovery',
      'Vulnerability prioritization',
      'Unified risk visibility',
      'AI-assisted decision support',
    ],
    ctaText: 'Visit QStellar Website',
    ctaHref: 'https://qstellar.co',
    ctaExternal: true,
    logo: qStellarLogo,
    logoHeight: '48px',
    screenshot: qStellarScreenshot,
    screenshotAlt: 'QuasarCyberTech | QStellar Asset Intelligence Dashboard',
    screenshotBg: '#6B1530',
    mediaPadding: '36px 36px 36px',
    ribbonTheme: 'burgundy',
    titleColor: '#0B1F3B',
    bodyColor: '#64748B',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    sectionBg: '#FCFAF8',
  },
  {
    id: 'qpulse',
    name: 'QPulse',
    title: 'Cybersecurity Intelligence & Insights Portal',
    description:
      'QPulse delivers curated cybersecurity intelligence, threat landscape updates, and security research to enterprise teams and practitioners.',
    bullets: [
      'Real-time threat intelligence',
      'Security research insights',
      'Regulatory and risk updates',
      'Enterprise-ready analysis',
    ],
    ctaText: 'Explore QPulse Portal',
    ctaHref: 'https://qpulse.quasarcybertech.com',
    ctaExternal: true,
    logo: qPulseLogo,
    logoHeight: PF.qPulseLogoHeight,
    screenshot: qPulseScreenshot,
    screenshotAlt: 'QuasarCyberTech | QPulse Threat Intelligence Portal',
    screenshotBg: '#ffffff',
    mediaPadding: '44px',
    ribbonTheme: 'white',
    titleColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.7)',
    reverse: true,
    sectionBg: GRADIENTS.PLATFORMS_QPULSE_SECTION_BG,
  },
  {
    id: 'qrgt',
    name: 'QRGT',
    title: 'Penetration Testing as a Service (PTaaS) Platform',
    description:
      'QRGT transforms traditional penetration testing into a continuous, governed program. Track findings and manage remediation workflows in one platform.',
    bullets: [
      'Continuous testing visibility',
      'Governed remediation workflows',
      'Findings and risk management',
      'Audit-ready reporting',
    ],
    ctaText: 'Explore QRGT Platform',
    ctaHref: '/contact',
    logo: ASSETS.logos.platforms.qrgtLight,
    logoHeight: '82px',
    screenshot: qrgtScreenshot,
    screenshotAlt: 'QuasarCyberTech | QRGT Penetration Testing Platform',
    screenshotBg: '#6B1530',
    mediaPadding: '36px 36px 36px',
    ribbonTheme: 'burgundy',
    titleColor: '#0B1F3B',
    bodyColor: '#64748B',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    sectionBg: '#FCFAF8',
  },
  {
    id: 'qleap',
    name: 'QLeap',
    title: 'Cybersecurity Training & Talent',
    description:
      'Building the next generation of cybersecurity practitioners through immersive, real-world simulations and hands-on laboratory environments.',
    bullets: [
      'Skill-first learning pathways',
      'Hands-on lab environments',
      'Industry-aligned curriculum',
      'Career readiness outcomes',
    ],
    ctaText: 'Explore QLeap',
    ctaHref: 'https://qleap-ed.com',
    ctaExternal: true,
    logo: qLeapLogo,
    logoHeight: '56px',
    screenshot: qLeapScreenshot,
    screenshotAlt: 'QuasarCyberTech | QLeap Cybersecurity Training Simulations',
    screenshotBg: '#ffffff',
    mediaPadding: '44px',
    ribbonTheme: 'white',
    titleColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.7)',
    reverse: true,
    sectionBg: GRADIENTS.PLATFORMS_QLEAP_SECTION_BG,
  },
];

const BrowserFrame: React.FC<{
  children: React.ReactNode,
  bgColor?: string,
  isDark?: boolean,
  ribbonTheme?: 'burgundy' | 'white',
  width?: string,
  maxWidth?: string,
  mobileNoRadius?: boolean
}> = ({ children, bgColor = '#eef2f6', isDark = false, ribbonTheme, width = '100%', maxWidth = '720px', mobileNoRadius = false }) => {
  // --- Styling Variables ---
  const ribbonHeight = '24px';
  const darkRibbonBg = 'rgb(107, 21, 48)'; // Translucent brand burgundy
  const lightRibbonBg = 'rgba(255,255,255,0.9)';
  const effectiveRibbonTheme = ribbonTheme ?? (isDark ? 'burgundy' : 'white');
  const screenshotEdgeColor = effectiveRibbonTheme === 'burgundy' ? darkRibbonBg : lightRibbonBg;

  return (
    <div className={mobileNoRadius ? 'browser-frame-mobile-no-radius' : ''} style={{
      width: width,
      maxWidth: maxWidth,
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Mac Control Dots Bar */}
      <div style={{
        height: ribbonHeight,
        background: effectiveRibbonTheme === 'burgundy' ? darkRibbonBg : lightRibbonBg,
        backdropFilter: effectiveRibbonTheme === 'burgundy' ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: effectiveRibbonTheme === 'burgundy' ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 9px',
        gap: '5px',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: '24px', height: '3px', borderRadius: '999px', background: effectiveRibbonTheme === 'burgundy' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }} />
      </div>

      <div style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: bgColor,
        lineHeight: 0,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        boxShadow: `inset 1px 0 0 ${screenshotEdgeColor}, inset -1px 0 0 ${screenshotEdgeColor}, inset 0 -1px 0 ${screenshotEdgeColor}`,
      }}>
        {children}
      </div>
    </div>
  );
};

function PlatformShowcase({ platform }: { platform: PlatformSection }) {
  const isDark = platform.ribbonTheme === 'burgundy';
  const textOrder = platform.reverse ? 2 : 1;
  const mediaOrder = platform.reverse ? 1 : 2;
  const bulletTextColor = isDark ? 'rgba(27,51,86,0.8)' : 'rgba(255,255,255,0.88)';
  const ctaIcon = platform.ctaExternal ? <ExternalLink size={18} style={{ marginLeft: '10px' }} /> : <ArrowRight size={18} style={{ marginLeft: '10px' }} />;

  return (
    <section
      id={platform.id}
      className="platform-section"
      style={{
        background: platform.sectionBg,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        borderTop: platform.borderTop,
        alignItems: 'stretch',
        minHeight: '560px',
        scrollMarginTop: '100px',
      }}
    >
      <div
        className="platform-text-col"
        style={{
          order: textOrder,
          padding: `80px ${LAYOUT_CONTROLS.global.paddingX}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div
          className="platform-text-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            paddingBottom: platform.name === 'QRGT' ? '20px' : '0',
          }}
        >
          <img
            src={platform.logo}
            alt={`${platform.name} Platform Logo`}
            style={{
              height: platform.logoHeight,
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
          />
          <h2
            style={{
              fontSize: platform.name === 'QStellar' || platform.name === 'QRGT' ? '1.8rem' : '1.6rem',
              fontWeight: platform.name === 'QStellar' || platform.name === 'QRGT' ? 800 : 700,
              margin: 0,
              color: platform.titleColor,
              lineHeight: 1.28,
            }}
          >
            {platform.title}
          </h2>
          <div className="platform-mobile-shot" style={{ display: 'none' }}>
            <BrowserFrame
              bgColor={platform.screenshotBg}
              isDark={isDark}
              ribbonTheme={platform.ribbonTheme}
              width="100%"
              maxWidth="720px"
              mobileNoRadius={true}
            >
              <img
                src={platform.screenshot}
                alt={platform.screenshotAlt}
                className="platform-shot"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </BrowserFrame>
          </div>
          <p
            style={{
              fontSize: '1rem',
              color: bulletTextColor,
              lineHeight: 1.8,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            {platform.description}
          </p>
          <ul
            className="platform-bullets"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '0.75rem 1.25rem',
              maxWidth: '560px',
            }}
          >
            {platform.bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.55rem',
                  color: bulletTextColor,
                  lineHeight: 1.45,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '999px',
                    background: COLORS.gold,
                    marginTop: '0.42rem',
                    flexShrink: 0,
                  }}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={platform.ctaHref}
          target={platform.ctaExternal ? '_blank' : undefined}
          rel={platform.ctaExternal ? 'noopener noreferrer' : undefined}
          style={{
            background: COLORS.burgundy,
            color: 'white',
            padding: '14px 32px',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
            width: 'fit-content',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            marginTop: 'auto',
          }}
        >
          {platform.ctaText}
          {ctaIcon}
        </a>
      </div>

      <div
        className="platform-media-col"
        style={{
          order: mediaOrder,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: platform.mediaPadding,
        }}
      >
        <BrowserFrame
          bgColor={platform.screenshotBg}
          isDark={isDark}
          ribbonTheme={platform.ribbonTheme}
          width="100%"
          maxWidth="720px"
          mobileNoRadius={true}
        >
          <img
            src={platform.screenshot}
            alt={platform.screenshotAlt}
            className="platform-shot"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </BrowserFrame>
      </div>
    </section>
  );
}

export default function Platforms() {
  useEffect(() => {
    // Get scroll target from URL params
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    
    if (scrollTarget) {
      // Use setTimeout to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

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
          imagePositionX="78%"
          imagePositionY="50%"
          imagePositionXMobile="85%"
          imagePositionYMobile="100%"
          imageScaleMobile={1}
          imageOpacityMobile={0.62}
          maskStartMobile="22%"
          maskEndMobile="88%"
          visualHeightMobile="50%"
          imageBlendSoftness="70%"
          imageBlendStartPercent="0%"
          breadcrumbPaths={['Home']}
          currentName="Platforms"
          scrollTargetId="platform-highlights"
          scrollButtonText="Explore Platforms"
          scrollMethod="motion"
        />

        {platformSections.map((platform) => (
          <PlatformShowcase key={platform.id} platform={platform} />
        ))}

        <CTASection theme="light" />
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .platform-section {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .platform-section .platform-text-col {
            order: 1 !important;
          }

          .platform-section .platform-media-col {
            order: 2 !important;
          }
        }

        @media (max-width: 768px) {
          .platform-text-col,
          .platform-media-col {
            width: 100% !important;
            min-width: 100% !important;
            padding: ${PF.mobileSectionPadY} ${LAYOUT_CONTROLS.global.paddingX} !important;
          }

          .platform-text-col {
            justify-content: flex-start !important;
            height: auto !important;
            gap: 1.5rem !important;
          }

          .platform-text-col > a {
            margin-top: 0 !important;
          }

          .platform-media-col {
            display: none !important;
          }

          .platform-mobile-shot {
            display: block !important;
            margin: 0.2rem 0 0.3rem;
          }

          .platform-bullets {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }

          .browser-frame-mobile-no-radius {
            border-radius: 8px !important;
          }
        }
      `}} />
    </div>
  );
}
