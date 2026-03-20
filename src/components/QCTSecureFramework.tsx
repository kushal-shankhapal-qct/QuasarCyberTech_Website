import React, { useState } from 'react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

const stages = [
  {
    letter: 'S',
    name: 'Strategize',
    descriptor: 'Governance & Security Strategy',
    capabilityLink: '/capabilities/cyber-advisory-risk-governance',
    services: ['Cybersecurity Strategy Consulting', 'Security Architecture Review', 'Virtual CISO (vCISO)', 'Zero Trust Architecture Design'],
  },
  {
    letter: 'E',
    name: 'Evaluate',
    descriptor: 'Risk, Compliance & Maturity',
    capabilityLink: '/capabilities/compliance-regulatory-assurance',
    services: ['Cyber Risk Assessment', 'Regulatory Gap Assessment', 'Security Maturity Assessment', 'Compliance Readiness'],
  },
  {
    letter: 'C',
    name: 'Challenge',
    descriptor: 'Offensive Security Validation',
    capabilityLink: '/capabilities/offensive-security-engineering',
    services: ['Web Application VAPT', 'Mobile & API Security Testing', 'Red Team Assessments', 'LLM Penetration Testing'],
  },
  {
    letter: 'U',
    name: 'Upgrade',
    descriptor: 'Cloud & Security Engineering',
    capabilityLink: '/capabilities/cloud-infrastructure-security',
    services: ['Cloud Security Assessments', 'Kubernetes / Container Security', 'Cloud Security Posture Management (CSPM)', 'Infrastructure Hardening'],
  },
  {
    letter: 'R',
    name: 'Respond',
    descriptor: 'Detection, Monitoring & Response',
    capabilityLink: '/capabilities/managed-defense-operations',
    services: ['Managed SOC', 'Threat Detection & Monitoring', 'Incident Response', 'Threat Hunting'],
  },
  {
    letter: 'E',
    name: 'Evolve',
    descriptor: 'Continuous Improvement & Platforms',
    capabilityLink: '/capabilities/cyber-intelligence-security-research',
    services: ['QRGT PTaaS Platform', 'QStellar Platform', 'Security Intelligence via QPulse', 'Continuous Security Evolution'],
  },
];

export default function QCTSecureFramework() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section 
      id="secure-framework"
      style={{
      background: COLORS.darkBase,
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} 360px`, // Synchronized rhythm
      overflow: 'visible',          // MUST be visible — never hidden
      position: 'relative',
      fontFamily: TYPOGRAPHY.fontBody,
      zIndex: 1,
    }}>
      <SectionHeader 
        isDark 
        title="The QCT"
        highlight="SECURE"
        suffix="Framework"
        highlightColor={COLORS.teal}
        subtitle="QuasarCyberTech delivers cybersecurity programs through a structured lifecycle designed to strengthen enterprise cyber resilience."
        maxWidth="760px"
      />

      {/* Flex container wrapper */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0px',                  // remove gap — arrows handle spacing
        overflow: 'visible',         // critical — allows dropdown to extend below
        position: 'relative',        // establishes stacking context
        zIndex: 1,
        marginTop: '64px',
      }}>
        {stages.map((stage, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                flex: 1, minWidth: 0,
                position: 'relative',    // dropdown positions relative to THIS
                overflow: 'visible',     // NOT hidden — never hidden
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveCard(prev => prev === i ? null : i);
              }}
              onMouseEnter={() => {
                setActiveCard(i);
              }}
            >
              {/* VISIBLE CARD — fixed height, never changes */}
              <div style={{
                borderRadius: activeCard === i ? '0' : '0 0 18px 18px',
                background: activeCard === i ? 'rgba(8, 16, 38, 1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid rgba(43,196,182,${activeCard === i ? '0.25' : '0.12'})`,
                borderTop: activeCard === i ? `3px solid ${COLORS.burgundy}` : `3px solid ${COLORS.teal}`,
                borderBottom: activeCard === i ? '1px solid rgba(8, 16, 38, 1)' : `1px solid rgba(43,196,182,0.12)`,
                padding: LAYOUT_CONTROLS.card.frameworkCardPadding,
                textAlign: 'center',
                transition: 'all 0.2s ease',
                minHeight: '220px', // Standard height across all cards
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: activeCard === i
                  ? 'none' // Remove shadow when expanded so it doesn't cast over the dropdown
                  : 'none',
                zIndex: activeCard === i ? 60 : 1,
              }}>
                
                {/* Stage Number */}
                <div style={{
                  color: 'rgba(255, 255, 255, 0.18)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textAlign: 'center',
                  marginBottom: '6px',
                  fontFamily: TYPOGRAPHY.fontBody,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Letter */}
                <div style={{
                  fontSize: LAYOUT_CONTROLS.card.frameworkLetterSize,
                  fontWeight: 900,
                  fontFamily: TYPOGRAPHY.fontHeading,
                  color: COLORS.teal,
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {stage.letter}
                </div>
                
                {/* Stage name */}
                <div style={{
                  color: COLORS.textOnDark,
                  fontWeight: 700,
                  fontSize: LAYOUT_CONTROLS.card.frameworkStageNameSize,
                  marginTop: '14px',
                  fontFamily: TYPOGRAPHY.fontHeading,
                }}>
                  {stage.name}
                </div>
                
                {/* Chevron */}
                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  color: COLORS.teal,
                  opacity: activeCard === i ? 1 : 0.35,
                  transform: activeCard === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease, opacity 0.2s ease',
                }}>
                  <ChevronDown size={14} />
                </div>
              </div>
              
              {/* DROPDOWN — absolute, outside card flow entirely */}
              <div style={{
                position: 'absolute',    // float over content below
                top: '100%',             // attach to bottom of card
                left: 0,                 // match card border exactly
                right: 0,                // match card border exactly
                zIndex: 50,
                
                background: 'rgba(8, 16, 38, 1)',
                borderLeft: '1px solid rgba(43,196,182,0.25)',
                borderRight: '1px solid rgba(43,196,182,0.25)',
                borderBottom: '1px solid rgba(43,196,182,0.25)',
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                
                maxHeight: activeCard === i ? '320px' : '0px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                
                paddingTop: activeCard === i ? '0px' : '0',  // Controlled by internal element paddings when expanded
                paddingBottom: activeCard === i ? '20px' : '0',
                paddingLeft: '16px',
                paddingRight: '16px',
                opacity: activeCard === i ? 1 : 0,
              }}>
                {/* Descriptor appears first inside expanded zone */}
                <div style={{
                  color: 'rgba(43, 196, 182, 0.65)',
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center',
                  paddingTop: '12px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(43,196,182,0.12)',
                  marginBottom: '14px',
                  lineHeight: 1.4,
                  opacity: activeCard === i ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  transitionDelay: activeCard === i ? '0.1s' : '0s'
                }}>
                  {stage.descriptor}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {stage.services.map((service, si) => (
                    <a
                      key={si}
                      href={stage.capabilityLink}
                      style={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        minHeight: '2.8rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.72)',
                        fontSize: '12px',
                        fontFamily: TYPOGRAPHY.fontBody,
                        padding: '5px 0 5px 12px',
                        borderLeft: `2px solid ${COLORS.teal}`,
                        marginBottom: '8px',
                        lineHeight: 1.5,
                        textDecoration: 'none',
                        transition: 'color 0.15s ease, padding-left 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = COLORS.teal;
                        e.currentTarget.style.paddingLeft = '16px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.72)';
                        e.currentTarget.style.paddingLeft = '12px';
                      }}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow between cards — not after the last one */}
            {i < stages.length - 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                flexShrink: 0,
                paddingTop: '40px',              // vertically align with letter zone
                color: activeCard === i
                  ? COLORS.teal                  // brighten when left card is active
                  : 'rgba(43, 196, 182, 0.3)',   // dim default
                fontSize: '18px',
                transition: 'color 0.25s ease',
                userSelect: 'none',
              }}>
                ›
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
