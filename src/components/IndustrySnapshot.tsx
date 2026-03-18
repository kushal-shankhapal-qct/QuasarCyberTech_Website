import React from 'react';
import { Activity, Factory, Globe, Landmark, Layers, Smartphone } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, SHADOWS } from '../config/themeConfig';

const industries = [
  { name: 'Banking & Financial Services', desc: 'Cybersecurity, compliance, and risk governance for banks, NBFCs, and financial institutions.', Icon: Landmark },
  { name: 'FinTech & Digital Payments', desc: 'Application security, cloud protection, and compliance for digital financial platforms.', Icon: Smartphone },
  { name: 'SaaS & Technology', desc: 'Secure development, application testing, and cloud security for modern SaaS companies.', Icon: Layers },
  { name: 'E-commerce & Digital Platforms', desc: 'Protection of customer-facing applications, APIs, and payment infrastructure.', Icon: Globe },
  { name: 'Healthcare & HealthTech', desc: 'Security and compliance support for healthcare systems and patient data platforms.', Icon: Activity },
  { name: 'Enterprise & Manufacturing', desc: 'Cyber risk governance, infrastructure security, and operational resilience.', Icon: Factory },
];

export default function IndustrySnapshot() {
  return (
    <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '100px max(24px, calc((100vw - 1200px) / 2))' }}>
      <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px' }}>
        Industries We <span style={{ color: COLORS.teal }}>Secure</span>
      </h2>
      <p style={{ color: COLORS.textSub, maxWidth: '680px', fontSize: '15px', lineHeight: 1.7, marginBottom: '34px' }}>
        Cybersecurity expertise tailored to the risk landscape of modern digital industries.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
        {industries.map((industry) => (
          <article
            key={industry.name}
            style={{
              borderRadius: '0 0 16px 16px',
              borderTop: `3px solid ${COLORS.burgundy}`,
              background: COLORS.cardOnLight,
              boxShadow: SHADOWS.lightCard,
              overflow: 'hidden',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-6px)';
              event.currentTarget.style.boxShadow = SHADOWS.lightCardHover;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.boxShadow = SHADOWS.lightCard;
            }}
          >
            <div style={{ height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: SECTION_BACKGROUNDS.SOFT }}>
              <industry.Icon size={24} strokeWidth={1} color={COLORS.teal} />
            </div>
            <div style={{ padding: '20px 22px 24px' }}>
              <h3 style={{ color: COLORS.textOnLight, fontSize: '19px', fontWeight: 700, marginBottom: '9px' }}>{industry.name}</h3>
              <p style={{ color: COLORS.textSub, fontSize: '14px', lineHeight: 1.65 }}>{industry.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
