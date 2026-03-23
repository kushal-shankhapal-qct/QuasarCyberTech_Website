import React, { useState } from 'react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

const TICKER_CONFIG = {
  gapBetweenRows: '2px',        // gap between each of the 5 rows
  verticalOffset: '-15px',      // move entire strip up (negative) or down (positive)
  rowHeight: '34px',           // height of each row
  fontSize: '0.84rem',          // all rows same size
  binaryOpacity: 0.26,          // rgba alpha for binary rows
  cveOpacity: 0.26,             // rgba alpha for CVE rows
  binarySpeed1: '45s',
  binarySpeed2: '45s',
  cveSpeed1: '80s',
  cveSpeed2: '80s',
  cveSpeed3: '80s',
};

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
        background: GRADIENTS.DARK_SECTION_BG_FRAMEWORK,
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} 360px`,
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
        highlightColor={COLORS.gold}
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
        zIndex: 2,
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
                background: activeCard === i ? 'rgba(8, 16, 38, 1)' : 'rgba(6, 12, 28, 1)',
                borderLeft: '1px solid rgba(214, 176, 92, 0.3)',
                borderRight: '1px solid rgba(214, 176, 92, 0.3)',
                borderTop: activeCard === i ? `3px solid ${COLORS.gold}` : `3px solid ${COLORS.burgundy}`,
                borderBottom: activeCard === i ? 'none' : '1px solid rgba(214, 176, 92, 0.3)',
                padding: LAYOUT_CONTROLS.card.frameworkCardPadding,
                textAlign: 'center',
                transition: 'background 0.2s ease, border-top 0.2s ease, border-radius 0.1s ease',
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
                  color: activeCard === i ? COLORS.gold : COLORS.burgundy,
                  lineHeight: 1,
                  userSelect: 'none',
                  transition: 'color 0.2s ease',
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
                  color: COLORS.gold,
                  opacity: activeCard === i ? 1 : 0.45,
                  transform: activeCard === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease, opacity 0.2s ease',
                }}>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* DROPDOWN — absolute, outside card flow entirely */}
              <div style={{
                position: 'absolute',    // float over content below
                top: 'calc(100% - 1.5px)', // attach to bottom of card
                left: 0,                 // match card border exactly
                right: 0,                // match card border exactly
                zIndex: 50,

                background: 'rgba(8, 16, 38, 1)',
                borderLeft: '1px solid rgba(214, 176, 92, 0.3)',
                borderRight: '1px solid rgba(214, 176, 92, 0.3)',
                borderBottom: '1px solid rgba(214, 176, 92, 0.3)',
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
                <div style={{
                  color: COLORS.gold,
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'center',
                  paddingTop: '12px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(214, 176, 92, 0.12)',
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
                        borderLeft: `2px solid ${COLORS.burgundy}`,
                        marginBottom: '8px',
                        lineHeight: 1.5,
                        textDecoration: 'none',
                        transition: 'color 0.15s ease, padding-left 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = COLORS.gold;
                        e.currentTarget.style.borderLeftColor = COLORS.gold;
                        e.currentTarget.style.paddingLeft = '16px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.72)';
                        e.currentTarget.style.borderLeftColor = COLORS.burgundy;
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
                  ? COLORS.gold                  // brighten when left card is active
                  : 'rgba(214, 176, 92, 0.3)',   // dim default
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

      <div style={{
        position: 'absolute',
        top: 'calc(100% - 180px)',
        left: 0,
        right: 0,
        transform: `translateY(calc(-50% + ${TICKER_CONFIG.verticalOffset}))`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: TICKER_CONFIG.gapBetweenRows,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
        opacity: 1,
      }}>

        {/* CSS Keyframes injected here for new rows */}
        <style>{`
          @keyframes tickerScrollRight2 {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          @keyframes tickerScrollLeft3 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes tickerScrollRight3 {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* ROW A — CVE, scrolls RIGHT, cveSpeed1 */}
        <div style={{ height: TICKER_CONFIG.rowHeight, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            display: 'inline-block', whiteSpace: 'nowrap', fontFamily: 'monospace',
            fontSize: TICKER_CONFIG.fontSize, color: `rgba(214, 176, 92, ${TICKER_CONFIG.cveOpacity})`,
            letterSpacing: '0.06em', willChange: 'transform',
            animation: `secureTickerRight ${TICKER_CONFIG.cveSpeed1} linear infinite`,
          }}>
            CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) ·
          </span>
        </div>

        {/* ROW B — Binary, scrolls LEFT, binarySpeed1 */}
        <div style={{ height: TICKER_CONFIG.rowHeight, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            display: 'inline-block', whiteSpace: 'nowrap', fontFamily: 'monospace',
            fontSize: TICKER_CONFIG.fontSize, color: `rgba(214, 176, 92, ${TICKER_CONFIG.binaryOpacity})`,
            letterSpacing: '0.12em', willChange: 'transform',
            animation: `secureTickerLeft1 ${TICKER_CONFIG.binarySpeed1} linear infinite`,
          }}>
            0100110100110100101100100111000111001010001011011010101001010101111100000000111110011001011001101110001100011100100000010111111000111100110000110100110100110100101100100111000111001010001011011010101001010101111100000000111110011001011001101110001100011100100000010111111000111100110000110100110100110100101100100111000111001010001011011010101001010101111100000000111110011001011001101110001100011100100000010111111000111100110000110100110100110100101100100111000111001010001011011010101001010101111100000000111110011001011001101110001100011100100000010111111000111100
          </span>
        </div>

        {/* ROW C — CVE, scrolls RIGHT, cveSpeed2 */}
        <div style={{ height: TICKER_CONFIG.rowHeight, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            display: 'inline-block', whiteSpace: 'nowrap', fontFamily: 'monospace',
            fontSize: TICKER_CONFIG.fontSize, color: `rgba(214, 176, 92, ${TICKER_CONFIG.cveOpacity})`,
            letterSpacing: '0.06em', willChange: 'transform',
            animation: `tickerScrollRight3 ${TICKER_CONFIG.cveSpeed2} linear infinite`,
          }}>
            CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) ·
          </span>
        </div>

        {/* ROW D — Binary, scrolls LEFT, binarySpeed2 */}
        <div style={{ height: TICKER_CONFIG.rowHeight, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            display: 'inline-block', whiteSpace: 'nowrap', fontFamily: 'monospace',
            fontSize: TICKER_CONFIG.fontSize, color: `rgba(214, 176, 92, ${TICKER_CONFIG.binaryOpacity})`,
            letterSpacing: '0.12em', willChange: 'transform',
            animation: `secureTickerLeft2 ${TICKER_CONFIG.binarySpeed2} linear infinite`,
          }}>
            1100101001110001001011011010101001010101111100001001100101100110111000110001110001001101000011000110100110100110100101100100111000110100110100110100101100100111000111001010001011011010101001010101111100001001100101100110111000110001110001001101000011000111001010001011011010101001010101111100001001100101100110111000110001110001001101000011000111001010001011011010101001010101111100001001100101100110111000110001110001001101000011000110100110100110100101100100111000110100110100110100101100100111000111001010001011011010101
          </span>
        </div>

        {/* ROW E — CVE, scrolls RIGHT, cveSpeed3 */}
        <div style={{ height: TICKER_CONFIG.rowHeight, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            display: 'inline-block', whiteSpace: 'nowrap', fontFamily: 'monospace',
            fontSize: TICKER_CONFIG.fontSize, color: `rgba(214, 176, 92, ${TICKER_CONFIG.cveOpacity})`,
            letterSpacing: '0.06em', willChange: 'transform',
            animation: `tickerScrollRight3 ${TICKER_CONFIG.cveSpeed3} linear infinite`,
          }}>
            CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) · CVE-2021-44228 (Log4Shell) · CVE-2021-34527 (PrintNightmare) · CVE-2022-30190 (Follina) · CVE-2023-44487 (HTTP/2 Rapid Reset) · CVE-2024-3400 (PAN-OS RCE) · CVE-2023-23397 (Outlook Zero-Day) · CVE-2022-22965 (Spring4Shell) · CVE-2023-20198 (Cisco IOS XE) · CVE-2024-21762 (FortiOS SSL) · CVE-2021-26855 (ProxyLogon) · CVE-2022-1388 (F5 BIG-IP) · CVE-2023-4966 (Citrix Bleed) ·
          </span>
        </div>

      </div>
    </section>
  );
}
