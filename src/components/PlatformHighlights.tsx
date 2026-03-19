import React from 'react';
import { ArrowRight, CheckCircle2, Target } from 'lucide-react';
import qStellarLogoImg from '../assets/Logos/Cropped_QStelllar_fulllogo_transparent.png';
import qLeapLogoImg from '../assets/logos copy/Platforms/QLeap_Logo.png';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';

import SectionHeader from './SectionHeader';

const platforms = [
  {
    name: 'QRGT',
    badge: 'PTAAS PLATFORM',
    subtitle: 'Penetration Testing as a Service (PTaaS) platform',
    highlights: ['Continuous testing visibility', 'Governed remediation tracking', 'Risk and findings management', 'Supports lifecycle-driven application security programs'],
    ctaText: 'Explore QRGT Platform',
    link: '/platforms/qrgt',
  },
  {
    name: 'QStellar',
    badge: 'ASSET INTELLIGENCE',
    subtitle: 'AI-powered asset intelligence and vulnerability management platform',
    logo: qStellarLogoImg,
    highlights: ['Asset discovery and visibility', 'Vulnerability intelligence and prioritization', 'Risk-based security decision support', 'AI-assisted security operations visibility'],
    ctaText: 'Visit QStellar Website',
    link: 'https://qstellar.co',
    external: true,
  },
  {
    name: 'QLeap',
    badge: 'TRAINING',
    subtitle: 'Cybersecurity training and talent development initiative from QuasarCyberTech',
    logo: qLeapLogoImg,
    highlights: ['SOC analyst training programs', 'Enterprise cybersecurity education', 'Certification and talent development programs', 'Industry-ready cybersecurity workforce training'],
    ctaText: 'Visit QLeap',
    link: 'https://qleap-ed.com',
    external: true,
  },
];

export default function PlatformHighlights() {
  return (
    <section style={{ 
      background: SECTION_BACKGROUNDS.DARK_ALT, 
      padding: '120px max(24px, calc((100vw - 1200px) / 2))',
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <SectionHeader 
        isDark 
        eyebrow="ECOSYSTEM & TOOLS"
        title="SECURITY"
        highlight="PLATFORMS & ECOSYSTEM"
        subtitle="Platforms and initiatives within the QuasarCyberTech ecosystem that support continuous security operations, visibility, and cyber resilience."
        maxWidth="740px"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {platforms.map((platform) => (
          <article
            key={platform.name}
            style={{
              borderRadius: '0 0 16px 16px',
              borderTop: `3px solid ${COLORS.teal}`,
              background: COLORS.cardOnDark,
              border: `1px solid ${ALPHAS.teal12}`,
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
              event.currentTarget.style.borderTopColor = COLORS.teal;
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
              {/* Mock UI Lines */}
              <div style={{ padding: '20px', opacity: 0.25 }}>
                <div style={{ height: '8px', width: '60%', background: COLORS.teal, borderRadius: '4px', marginBottom: '12px' }} />
                <div style={{ height: '6px', width: '85%', background: 'rgba(255,255,255,0.3)', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '6px', width: '45%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                  <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                  <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(43,196,182,0.1)' }} />
                </div>
              </div>
              
              {/* Platform name badge — bottom left */}
              <div style={{
                position: 'absolute', bottom: '16px', left: '20px',
                background: 'rgba(43,196,182,0.15)',
                border: `1px solid ${ALPHAS.teal20}`,
                color: COLORS.teal,
                ...TYPOGRAPHY.eyebrow,
                fontSize: '10px',
                padding: '4px 12px', borderRadius: '4px',
                backdropFilter: 'blur(4px)',
              }}>
                {platform.badge}
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ minHeight: '52px', display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                {platform.logo ? (
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={platform.logo} alt={platform.name} style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Target size={24} color={COLORS.teal} />
                    <h3 style={{ 
                      ...TYPOGRAPHY.cardTitle,
                      color: COLORS.textOnDark, 
                      fontSize: '24px', 
                      margin: 0, 
                      letterSpacing: '-0.02em' 
                    }}>{platform.name}</h3>
                  </div>
                )}
              </div>

              <p style={{ 
                ...TYPOGRAPHY.bodyBase,
                color: COLORS.textMuted, 
                lineHeight: 1.65, 
                marginBottom: '22px' 
              }}>{platform.subtitle}</p>
              
              <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'grid', gap: '12px', flexGrow: 1 }}>
                {platform.highlights.map((highlight) => (
                  <li key={highlight} style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    color: COLORS.textMuted, 
                    ...TYPOGRAPHY.bodySmall,
                    lineHeight: 1.5 
                  }}>
                    <CheckCircle2 size={16} color={COLORS.gold} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ opacity: 0.85 }}>{highlight}</span>
                  </li>
                ))}
              </ul>

              <a
                href={platform.link}
                target={platform.external ? '_blank' : undefined}
                rel={platform.external ? 'noopener noreferrer' : undefined}
                style={{
                  color: COLORS.teal,
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
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textOnDark}
                onMouseLeave={(e) => e.currentTarget.style.color = COLORS.teal}
              >
                {platform.ctaText}
                <ArrowRight size={16} color={COLORS.teal} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
