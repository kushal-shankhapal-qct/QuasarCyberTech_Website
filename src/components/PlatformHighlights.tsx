import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { ALPHAS, COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

import SectionHeader from './SectionHeader';

const platforms = [
  {
    name: 'QStellar',
    badge: 'ASSET INTELLIGENCE',
    subtitle: 'AI-powered asset intelligence and vulnerability management platform',
    logo: ASSETS.logos.platforms.qstellarLight,
    screenshot: ASSETS.platforms.screenshots.qstellar,
    highlights: ['Asset discovery and visibility', 'Vulnerability intelligence and prioritization', 'Risk-based security decision support', 'AI-assisted security operations visibility'],
    ctaText: 'Visit QStellar Website',
    link: 'https://qstellar.co',
    external: true,
    styles: {
      logoHeight: '2.25rem', // 36px
      logoWidth: 'auto',
      logoNudgeX: '0rem',
      logoNudgeY: '-0.0625rem', // -1px
      screenshotFit: 'cover' as const
    }
  },
  {
    name: 'QPulse',
    badge: 'THREAT INTELLIGENCE',
    subtitle: 'Enterprise-grade threat intelligence and security research portal',
    logo: ASSETS.logos.platforms.qpulseLight,
    screenshot: ASSETS.platforms.screenshots.qpulse,
    showTextLabel: false,
    highlights: ['Real-time threat analytics', 'Global threat feed ingestion', 'Vulnerability research and analysis', 'Strategic security intelligence'],
    ctaText: 'Explore QPulse Portal',
    link: 'https://qpulse.quasarcybertech.com',
    external: true,
    styles: {
      logoHeight: '3.125rem', // 50px
      logoWidth: 'auto',
      logoNudgeX: '0rem',
      logoNudgeY: '0.0625rem', // 1px
      screenshotFit: 'cover' as const
    }
  },
  {
    name: 'QRGT',
    badge: 'PTAAS PLATFORM',
    subtitle: 'Continuous, governed Penetration Testing as a Service (PTaaS) platform',
    logo: ASSETS.logos.platforms.qrgtDark,
    screenshot: ASSETS.platforms.screenshots.qrgt,
    highlights: ['Continuous testing visibility', 'Governed remediation tracking', 'Risk and findings management', 'Supports lifecycle-driven application security programs'],
    ctaText: 'Explore QRGT Platform',
    link: '/contact',
    styles: {
      logoHeight: '4.75rem', // 76px
      logoWidth: 'auto',   
      logoScale: 1.0,
      logoNudgeX: '0rem',
      logoNudgeY: '0.125rem', // 2px
      logoTranslateX: '0rem',
      screenshotFit: 'cover' as const,
      screenshotPosition: 'left center'
    }
  },
];

export default function PlatformHighlights() {
  return (
    <section 
      className="home-platforms-section"
      style={{
        background: GRADIENTS.HOME_PLATFORMS_BG,
        padding: `clamp(2rem, 5vh, 4rem) ${LAYOUT_CONTROLS.global.paddingX} clamp(2rem, 5vh, 4rem)`,
        fontFamily: TYPOGRAPHY.fontBody
      }}>
      <SectionHeader
        isDark
        eyebrow=""
        title=""
        highlight="Security"
        suffix="Platforms & Ecosystem"
        highlightColor={COLORS.gold}
        subtitle="Platforms and initiatives within the QuasarCyberTech ecosystem that support continuous security operations, visibility, and cyber resilience."
        maxWidth="46.25rem"
        subtitleStyle={{ 
          color: 'rgba(255,255,255,0.78)',
          textAlign: 'justify',
          lineHeight: '1.7'
        }}
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', 
        gap: '1.25rem' 
      }}>
        {platforms.map((platform) => (
          <article
            key={platform.name}
            style={{
              borderRadius: '0 0 1rem 1rem',
              borderTop: `0.1875rem solid ${COLORS.burgundy}`,
              background: COLORS.cardOnDark,
              border: `0.0625rem solid rgba(214, 176, 92, 0.3)`,
              borderTopWidth: '0.1875rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, border-top-color 0.25s ease',
              overflow: 'hidden',
              boxShadow: '0 1.25rem 2.5rem rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-0.375rem)';
              event.currentTarget.style.borderTopColor = COLORS.burgundy;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.borderTopColor = COLORS.gold;
            }}
          >
            {/* ─── PLACEMENT 4: SCREENSHOT ZONE ─── */}
            <div style={{
              height: '13.75rem',
              background: 'transparent',
              borderBottom: `0.0625rem solid ${ALPHAS.gold12}`,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {platform.screenshot ? (
                  <img
                    src={platform.screenshot}
                    alt={`QuasarCyberTech | ${platform.name} Platform Screenshot`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: platform.styles?.screenshotFit || 'cover',
                      objectPosition: platform.styles?.screenshotPosition || 'top',
                      opacity: 0.8
                    }}
                  />
              ) : (
                /* Mock UI Lines */
                <div style={{ padding: '1.25rem', opacity: 0.25 }}>
                  <div style={{ height: '0.5rem', width: '60%', background: COLORS.gold, borderRadius: '0.25rem', marginBottom: '0.75rem' }} />
                  <div style={{ height: '0.375rem', width: '85%', background: 'rgba(255,255,255,0.3)', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />
                  <div style={{ height: '0.375rem', width: '45%', background: 'rgba(255,255,255,0.2)', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', background: 'rgba(43,196,182,0.1)' }} />
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', background: 'rgba(43,196,182,0.1)' }} />
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', background: 'rgba(43,196,182,0.1)' }} />
                  </div>
                </div>
              )}
            </div>
            <div style={{
              width: '100%',
              minHeight: '5rem',
              background: 'rgba(4,11,29,0.98)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.5rem', 
              borderTop: `0.0625rem solid ${COLORS.burgundy}`,
              borderBottom: '0.0625rem solid rgba(255,255,255,0.03)',
              gap: '1.25rem'
            }}>
              {platform.logo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <img
                    src={platform.logo}
                    alt={`QuasarCyberTech | ${platform.name} Platform Logo`}
                    style={{
                      maxHeight: platform.styles?.logoHeight || '2.25rem',
                      maxWidth: platform.name === 'QRGT' ? 'none' : '8.125rem',
                      width: platform.styles?.logoWidth || 'auto',
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      transform: `translate(${platform.styles?.logoNudgeX || '0rem'}, ${platform.styles?.logoNudgeY || '0rem'}) scale(${platform.styles?.logoScale || 1}) translateX(${platform.styles?.logoTranslateX || '0rem'})`
                    }}
                  />
                </div>
              ) : (
                <span style={{
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: TYPOGRAPHY.fontHeading,
                  flexShrink: 0
                }}>
                  {platform.name}
                </span>
              )}

              {/* High-Tech Subtitle in Strip */}
              <div style={{
                flex: 1,
                textAlign: 'left', 
                borderLeft: '0.0625rem solid rgba(255,255,255,0.1)',
                paddingLeft: '1rem'
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.4,
                  fontWeight: 500,
                  display: 'block', 
                  fontFamily: TYPOGRAPHY.fontBody
                }}>
                  {platform.subtitle}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ul style={{ listStyle: 'none', margin: '0 0 1.5rem 0', padding: 0, display: 'grid', gap: '0.75rem', flexGrow: 1 }}>
                {platform.highlights.map((highlight) => (
                  <li key={highlight}
                    className="platform-highlight-item"
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      color: 'rgba(255,255,255,0.9)',
                      ...TYPOGRAPHY.bodySmall,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      className="highlight-icon"
                      style={{
                        flexShrink: 0,
                        marginTop: '0.125rem',
                        transition: 'color 0.2s ease, opacity 0.2s ease',
                        color: COLORS.gold,
                        opacity: 0.75
                      }}
                    />
                    <span style={{ opacity: 1 }}>{highlight}</span>
                  </li>
                ))}
              </ul>

              <a
                href={platform.link}
                target={platform.external ? '_blank' : undefined}
                rel={platform.external ? 'noopener noreferrer' : undefined}
                className="platform-cta"
                style={{
                  color: '#FFFFFF', 
                  opacity: 0.85,
                  ...TYPOGRAPHY.navLink,
                  fontSize: '0.8125rem', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.625rem',
                  borderTop: `0.0625rem solid ${ALPHAS.white06}`,
                  paddingTop: '1.25rem',
                  marginTop: 'auto',
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                {platform.ctaText}
                <ArrowRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        article:hover .highlight-icon { opacity: 1 !important; transform: scale(1.1); }
        article:hover .platform-cta { opacity: 1 !important; color: ${COLORS.gold} !important; border-top-color: rgba(214, 176, 92, 0.4) !important; }
        .platform-cta:hover { color: ${COLORS.gold} !important; }

        @media (max-width: 64rem) {
          .home-platforms-section {
            padding-left: 3rem !important;
            padding-right: 3rem !important;
          }
        }

        @media (max-width: 40rem) {
          .home-platforms-section img {
            object-position: left center !important;
          }
        }
      `}} />
    </section>
  );
}
