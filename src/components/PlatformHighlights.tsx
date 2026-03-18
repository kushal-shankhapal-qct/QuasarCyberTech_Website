import React from 'react';
import { ArrowRight, CheckCircle2, Target } from 'lucide-react';
import qStellarLogoImg from '../assets/Logos/Cropped_QStelllar_fulllogo_transparent.png';
import qLeapLogoImg from '../assets/logos copy/Platforms/QLeap_Logo.png';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS } from '../config/themeConfig';

const platforms = [
  {
    name: 'QRGT',
    subtitle: 'Penetration Testing as a Service (PTaaS) platform',
    highlights: ['Continuous testing visibility', 'Governed remediation tracking', 'Risk and findings management', 'Supports lifecycle-driven application security programs'],
    ctaText: 'Explore QRGT Platform',
    link: '/platforms/qrgt',
  },
  {
    name: 'QStellar',
    subtitle: 'AI-powered asset intelligence and vulnerability management platform',
    logo: qStellarLogoImg,
    highlights: ['Asset discovery and visibility', 'Vulnerability intelligence and prioritization', 'Risk-based security decision support', 'AI-assisted security operations visibility'],
    ctaText: 'Visit QStellar Website',
    link: 'https://qstellar.co',
    external: true,
  },
  {
    name: 'QLeap',
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
    <section style={{ background: SECTION_BACKGROUNDS.DARK_ALT, padding: '100px max(24px, calc((100vw - 1200px) / 2))' }}>
      <h2 style={{ color: COLORS.textOnDark, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px' }}>
        <span style={{ color: COLORS.teal }}>Security</span> Platforms & Ecosystem
      </h2>
      <p style={{ color: COLORS.textMuted, maxWidth: '740px', fontSize: '15px', lineHeight: 1.7, marginBottom: '34px' }}>
        Platforms and initiatives within the QuasarCyberTech ecosystem that support continuous security operations, visibility, and cyber resilience.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
        {platforms.map((platform) => (
          <article
            key={platform.name}
            style={{
              borderRadius: '0 0 16px 16px',
              borderTop: `3px solid ${COLORS.teal}`,
              background: COLORS.cardOnDark,
              border: `1px solid ${ALPHAS.teal12}`,
              borderTopWidth: '3px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, border-top-color 0.25s ease',
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
            <div style={{ minHeight: '52px', display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
              {platform.logo ? (
                <div style={{ background: COLORS.cardOnLight, borderRadius: '6px', padding: '8px 10px' }}>
                  <img src={platform.logo} alt={platform.name} style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={24} color={COLORS.teal} />
                  <h3 style={{ color: COLORS.textOnDark, fontSize: '24px', fontWeight: 800, margin: 0 }}>{platform.name}</h3>
                </div>
              )}
            </div>

            <p style={{ color: COLORS.textMuted, fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>{platform.subtitle}</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '10px', marginBottom: '18px', flexGrow: 1 }}>
              {platform.highlights.map((highlight) => (
                <li key={highlight} style={{ display: 'flex', gap: '10px', color: COLORS.textMuted, fontSize: '13px', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color={COLORS.gold} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <a
              href={platform.link}
              target={platform.external ? '_blank' : undefined}
              rel={platform.external ? 'noopener noreferrer' : undefined}
              style={{
                color: COLORS.teal,
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                borderTop: `1px solid ${ALPHAS.white06}`,
                paddingTop: '16px',
              }}
            >
              {platform.ctaText}
              <ArrowRight size={16} color={COLORS.teal} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
