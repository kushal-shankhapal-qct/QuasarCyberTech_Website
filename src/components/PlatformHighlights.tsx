import React from 'react';
import { ArrowRight, CheckCircle2, Target } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { ALPHAS, COLORS, GRADIENTS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

import SectionHeader from './SectionHeader';

const platforms = [
  {
    name: 'QStellar',
    badge: 'ASSET INTELLIGENCE',
    subtitle: 'AI-powered asset intelligence and vulnerability management platform',
    logo: ASSETS.logos.platforms.qstellar,
    screenshot: ASSETS.platforms.screenshots.qstellar,
    highlights: ['Asset discovery and visibility', 'Vulnerability intelligence and prioritization', 'Risk-based security decision support', 'AI-assisted security operations visibility'],
    ctaText: 'Visit QStellar Website',
    link: 'https://qstellar.co',
    external: true,
    styles: {
      logoHeight: '36px',
      logoWidth: 'auto',
      logoNudgeX: '0px',
      logoNudgeY: '-1px',
      screenshotFit: 'cover' as const
    }
  },
  {
    name: 'QPulse',
    badge: 'THREAT INTELLIGENCE',
    subtitle: 'Enterprise-grade threat intelligence and security research portal',
    logo: ASSETS.logos.platforms.qpulse,
    screenshot: ASSETS.platforms.screenshots.qpulse,
    showTextLabel: true,
    highlights: ['Real-time threat analytics', 'Global threat feed ingestion', 'Vulnerability research and analysis', 'Strategic security intelligence'],
    ctaText: 'Explore QPulse Portal',
    link: 'https://qpulse.quasarcybertech.com',
    external: true,
    styles: {
      logoHeight: '50px',
      logoWidth: 'auto',
      logoNudgeX: '0px',
      logoNudgeY: '1px',
      screenshotFit: 'cover' as const
    }
  },
  {
    name: 'QRGT',
    badge: 'PTAAS PLATFORM',
    subtitle: 'Continuous, governed Penetration Testing as a Service (PTaaS) platform',
    logo: ASSETS.logos.platforms.qrgt,
    highlights: ['Continuous testing visibility', 'Governed remediation tracking', 'Risk and findings management', 'Supports lifecycle-driven application security programs'],
    ctaText: 'Explore QRGT Platform',
    link: '/platforms/qrgt',
    styles: {
      logoHeight: '50px',
      logoWidth: 'auto',
      logoNudgeX: '0px',
      logoNudgeY: '0px',
      screenshotFit: 'cover' as const
    }
  },
];

export default function PlatformHighlights() {
  return (
    <section style={{
      background: GRADIENTS.DARK_SECTION_BG_PLATFORMS,
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
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
        maxWidth="740px"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {platforms.map((platform) => (
          <article
            key={platform.name}
            style={{
              borderRadius: '0 0 16px 16px',
              borderTop: `3px solid ${COLORS.burgundy}`,
              background: COLORS.cardOnDark,
              border: `1px solid rgba(214, 176, 92, 0.3)`,
              borderTopWidth: '3px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, border-top-color 0.25s ease',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-6px)';
              event.currentTarget.style.borderTopColor = COLORS.burgundy;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.borderTopColor = COLORS.gold;
            }}
          >
            {/* ─── PLACEMENT 4: SCREENSHOT ZONE ─── */}
            <div style={{
              height: '160px',
              background: 'linear-gradient(180deg, rgba(8,20,48,0.95) 0%, rgba(4,12,32,0.98) 100%)',
              borderBottom: `1px solid ${ALPHAS.teal12}`,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {platform.screenshot ? (
                <img
                  src={platform.screenshot}
                  alt={platform.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: platform.styles?.screenshotFit || 'cover',
                    objectPosition: 'top',
                    opacity: 0.8
                  }}
                />
              ) : (
                /* Mock UI Lines */
                <div style={{ padding: '20px', opacity: 0.25 }}>
                  <div style={{ height: '8px', width: '60%', background: COLORS.gold, borderRadius: '4px', marginBottom: '12px' }} />
                  <div style={{ height: '6px', width: '85%', background: 'rgba(255,255,255,0.3)', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ height: '6px', width: '45%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                    <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                    <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                  </div>
                </div>
              )}
            </div>
            <div style={{
              width: '100%',
              height: '72px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '32px',
              borderBottom: '1px solid rgba(11,31,59,0.08)',
            }}>
              {platform.logo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    style={{
                      maxHeight: platform.styles?.logoHeight || '36px',
                      maxWidth: '160px',
                      width: platform.styles?.logoWidth || 'auto',
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      transform: `translate(${platform.styles?.logoNudgeX || '0px'}, ${platform.styles?.logoNudgeY || '0px'})`
                    }}
                  />
                  {platform.showTextLabel && (
                    <span style={{
                      color: '#040B1D',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      fontFamily: TYPOGRAPHY.fontHeading,
                      opacity: 0.9
                    }}>
                      {platform.name}
                    </span>
                  )}
                </div>
              ) : (
                <span style={{
                  color: '#040B1D',
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: TYPOGRAPHY.fontHeading,
                }}>
                  {platform.name}
                </span>
              )}
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>


              <p style={{
                ...TYPOGRAPHY.bodyBase,
                color: COLORS.textMuted,
                lineHeight: 1.65,
                marginBottom: '22px'
              }}>{platform.subtitle}</p>

              <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'grid', gap: '12px', flexGrow: 1 }}>
                {platform.highlights.map((highlight) => (
                  <li key={highlight}
                    className="platform-highlight-item"
                    style={{
                      display: 'flex',
                      gap: '12px',
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
                        marginTop: '2px',
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
                  color: COLORS.gold,
                  opacity: 0.75,
                  ...TYPOGRAPHY.navLink,
                  fontSize: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  borderTop: `1px solid ${ALPHAS.white06}`,
                  paddingTop: '20px',
                  marginTop: 'auto',
                  transition: 'all 0.2s ease',
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
        article:hover .highlight-icon { opacity: 1 !important; }
        article:hover .platform-cta { opacity: 1 !important; }
      `}} />
    </section>
  );
}
