import React, { useState } from 'react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, BRAND_CONTROLS } from '../config/themeConfig';

const stages = [
  {
    letter: 'S',
    name: 'Strategize',
    descriptor: 'Governance & Security Strategy',
    services: ['Cybersecurity Strategy Consulting', 'Security Architecture Review', 'Virtual CISO (vCISO)', 'Zero Trust Architecture Design'],
  },
  {
    letter: 'E',
    name: 'Evaluate',
    descriptor: 'Risk, Compliance & Maturity',
    services: ['Cyber Risk Assessment', 'Regulatory Gap Assessment', 'Security Maturity Assessment', 'Compliance Readiness'],
  },
  {
    letter: 'C',
    name: 'Challenge',
    descriptor: 'Offensive Security Validation',
    services: ['Web Application VAPT', 'Mobile & API Security Testing', 'Red Team Assessments', 'LLM Penetration Testing'],
  },
  {
    letter: 'U',
    name: 'Upgrade',
    descriptor: 'Cloud & Security Engineering',
    services: ['Cloud Security Assessments', 'Kubernetes / Container Security', 'Cloud Security Posture Management (CSPM)', 'Infrastructure Hardening'],
  },
  {
    letter: 'R',
    name: 'Respond',
    descriptor: 'Detection, Monitoring & Response',
    services: ['Managed SOC', 'Threat Detection & Monitoring', 'Incident Response', 'Threat Hunting'],
  },
  {
    letter: 'E',
    name: 'Evolve',
    descriptor: 'Continuous Improvement & Platforms',
    services: ['QRGT PTaaS Platform', 'QStellar Platform', 'Security Intelligence via QPulse', 'Continuous Security Evolution'],
  },
];

export default function QCTSecureFramework() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      style={{
        background: SECTION_BACKGROUNDS.DARK,
        padding: '100px max(24px, calc((100vw - 1200px) / 2))',
      }}
    >
      <h2
        style={{
          color: COLORS.textOnDark,
          fontFamily: BRAND_CONTROLS.frameworkTitleFont,
          fontWeight: 800,
          fontSize: 'clamp(28px, 3.8vw, 38px)',
          lineHeight: 1.15,
          marginBottom: '16px',
        }}
      >
        THE QCT <br /> <span style={{ color: COLORS.teal }}>SECURE</span> FRAMEWORK
      </h2>
      <p style={{ color: COLORS.textMuted, maxWidth: '760px', fontSize: '15px', lineHeight: 1.7, marginBottom: '34px' }}>
        QuasarCyberTech delivers cybersecurity programs through a structured lifecycle designed to strengthen enterprise cyber resilience.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', 
        gap: '10px',
        alignItems: 'start',
        minHeight: '480px' // Section length stable for expansion
      }}>
        {stages.map((stage, i) => {
          const expanded = active === i;
          return (
            <React.Fragment key={stage.name}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderRadius: '0 0 16px 16px',
                  borderTop: `3px solid ${COLORS.teal}`,
                  border: `1px solid ${ALPHAS.teal12}`,
                  borderTopWidth: '3px',
                  background: expanded ? ALPHAS.teal08 : ALPHAS.white03,
                  padding: '24px 18px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  height: '100%',
                }}
              >
                <div style={{ color: COLORS.teal, fontSize: '56px', fontWeight: 900, lineHeight: 1, opacity: 1 }}>{stage.letter}</div>
                <div style={{ color: COLORS.textOnDark, fontWeight: 700, fontSize: '16px', marginTop: '10px' }}>{stage.name}</div>
                <div style={{ color: COLORS.teal, fontSize: '12px', fontWeight: 600, marginTop: '6px', opacity: 0.9 }}>{stage.descriptor}</div>
                <div
                  style={{
                    maxHeight: expanded ? '220px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    marginTop: expanded ? '18px' : 0,
                  }}
                >
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {stage.services.map((service) => (
                      <li
                        key={service}
                        style={{
                          color: COLORS.textMuted,
                          fontSize: '12px',
                          padding: '4px 0 4px 10px',
                          borderLeft: `2px solid ${COLORS.teal}`,
                          marginBottom: '6px',
                        }}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div
                  className="hidden xl:flex"
                  style={{ color: COLORS.teal, fontSize: '18px', opacity: 0.5, alignSelf: 'flex-start', marginTop: '28px' }}
                >
                  {'›'}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
