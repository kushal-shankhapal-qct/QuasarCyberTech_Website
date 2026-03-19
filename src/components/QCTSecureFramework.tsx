import React, { useState } from 'react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';
import SectionHeader from './SectionHeader';

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
        padding: '120px max(24px, calc((100vw - 1200px) / 2))',
        fontFamily: TYPOGRAPHY.fontBody
      }}
    >
      <SectionHeader 
        isDark 
        eyebrow="OUR METHODOLOGY"
        title="THE QCT"
        highlight="SECURE FRAMEWORK"
        subtitle="QuasarCyberTech delivers cybersecurity programs through a structured lifecycle designed to strengthen enterprise cyber resilience."
        maxWidth="760px"
      />

      {/* ─── PLACEMENT 2: IMAGE ZONE — Wide background image strip ─── */}
      <div style={{
        width: '100%',
        height: '260px',
        margin: '40px 0 60px',
        background: `linear-gradient(135deg, ${COLORS.deepCyberBlue} 0%, rgba(4,11,29,0.9) 100%)`,
        borderRadius: '0 0 16px 16px',
        borderTop: `2px solid ${ALPHAS.teal20}`,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Placeholder Pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', color: COLORS.teal, opacity: 0.3 }}>
            {/* Visual indicator (optional placeholder text/icon) */}
          </div>
          <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.textMuted, fontSize: '11px', marginTop: '12px' }}>
            SOC Operations / Cyber Command Center
          </p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 1fr)', 
        gap: '12px',
        alignItems: 'flex-start', // Independent card heights
      }}>
        {stages.map((stage, i) => {
          const expanded = active === i;
          return (
            <div
              key={stage.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                borderRadius: '0 0 14px 14px',
                height: 'auto',
                borderTop: `3px solid ${expanded ? COLORS.burgundy : COLORS.teal}`,
                background: expanded ? ALPHAS.teal07 : ALPHAS.white03,
                border: `1px solid ${expanded ? ALPHAS.teal20 : ALPHAS.teal12}`,
                borderTopWidth: '3px',
                padding: '24px 20px',
                transition: 'all 0.3s ease',
                alignSelf: 'flex-start', // Allows internal growth without affecting siblings
              }}
            >
              {/* ALWAYS VISIBLE — centered */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  color: COLORS.teal,
                  fontSize: '64px',
                  fontWeight: 900,
                  lineHeight: 1,
                  opacity: 1,
                }}>
                  {stage.letter}
                </div>
                <div style={{
                  ...TYPOGRAPHY.cardTitle,
                  color: COLORS.textOnDark,
                  fontSize: '15px',
                  marginTop: '12px',
                }}>
                  {stage.name}
                </div>
                <div style={{
                  ...TYPOGRAPHY.bodySmall,
                  color: COLORS.gold,
                  fontSize: '11px',
                  marginTop: '6px',
                  letterSpacing: '0.02em',
                }}>
                  {stage.descriptor}
                </div>
              </div>

              {/* EXPANDABLE — only renders height when active */}
              <div
                style={{
                  maxHeight: expanded ? '220px' : '0px',
                  overflow: 'hidden',
                  marginTop: expanded ? '18px' : '0px',
                  transition: 'max-height 0.38s cubic-bezier(0.23, 1, 0.32, 1), margin-top 0.2s ease',
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {stage.services.map((s) => (
                    <li
                      key={s}
                      style={{
                        color: COLORS.textMuted,
                        ...TYPOGRAPHY.bodySmall,
                        fontSize: '12px',
                        padding: '4px 0 4px 10px',
                        borderLeft: `2px solid ${COLORS.teal}`,
                        marginBottom: '6px',
                        lineHeight: 1.5,
                        textAlign: 'left',
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
