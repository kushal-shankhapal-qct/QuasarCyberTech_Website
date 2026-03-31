import React, { useState } from 'react';
import { Compass, ClipboardCheck, Crosshair, ShieldCheck, Radio, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS, COLORS } from '../config/themeConfig';

type GhostIconProps = {
  size: number;
  opacity: number;
};

// ─── Ghost Icon components (SVG, 1.5px stroke, atmospheric) ─────────────────
function GhostCompass({ size, opacity }: GhostIconProps) {
  return (
    <Compass
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}
function GhostClipboard({ size, opacity }: GhostIconProps) {
  return (
    <ClipboardCheck
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}
function GhostCrosshair({ size, opacity }: GhostIconProps) {
  return (
    <Crosshair
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}
function GhostShield({ size, opacity }: GhostIconProps) {
  return (
    <ShieldCheck
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}
function GhostRadar({ size, opacity }: GhostIconProps) {
  return (
    <Radio
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}
function GhostTrend({ size, opacity }: GhostIconProps) {
  return (
    <TrendingUp
      size={size}
      strokeWidth={1.5}
      style={{ opacity, color: '#FFFFFF', pointerEvents: 'none', userSelect: 'none' }}
    />
  );
}

const stages = [
  {
    letter: 'S',
    name: 'Strategize',
    descriptor: 'Governance & Security Strategy',
    capabilityLink: '/capabilities/cyber-advisory-risk-governance',
    services: ['Cybersecurity Strategy Consulting', 'Security Architecture Review', 'Virtual CISO (vCISO)', 'Zero Trust Architecture Design'],
    GhostIcon: GhostCompass,
  },
  {
    letter: 'E',
    name: 'Evaluate',
    descriptor: 'Risk, Compliance & Maturity',
    capabilityLink: '/capabilities/compliance-regulatory-assurance',
    services: ['Cyber Risk Assessment', 'Regulatory Gap Assessment', 'Security Maturity Assessment', 'Compliance Readiness'],
    GhostIcon: GhostClipboard,
  },
  {
    letter: 'C',
    name: 'Challenge',
    descriptor: 'Offensive Security Validation',
    capabilityLink: '/capabilities/offensive-security-engineering',
    services: ['Web Application VAPT', 'Mobile & API Security Testing', 'Red Team Assessments', 'LLM Penetration Testing'],
    GhostIcon: GhostCrosshair,
  },
  {
    letter: 'U',
    name: 'Upgrade',
    descriptor: 'Cloud & Security Engineering',
    capabilityLink: '/capabilities/cloud-infrastructure-security',
    services: ['Cloud Security Assessments', 'Kubernetes / Container Security', 'Cloud Security Posture Management (CSPM)', 'Infrastructure Hardening'],
    GhostIcon: GhostShield,
  },
  {
    letter: 'R',
    name: 'Respond',
    descriptor: 'Detection, Monitoring & Response',
    capabilityLink: '/capabilities/managed-defense-operations',
    services: ['Managed SOC', 'Threat Detection & Monitoring', 'Incident Response', 'Threat Hunting'],
    GhostIcon: GhostRadar,
  },
  {
    letter: 'E',
    name: 'Evolve',
    descriptor: 'Continuous Improvement & Platforms',
    capabilityLink: '/capabilities/cyber-intelligence-security-research',
    services: ['QRGT PTaaS Platform', 'QStellar Platform', 'Security Intelligence via QPulse', 'Continuous Security Evolution'],
    GhostIcon: GhostTrend,
  },
];

export default function QCTSecureFramework() {
  const [activeIdx, setActiveIdx] = useState(0);
  const FRAMEWORK_LAYOUT = {
    activePanelFlex: '4.4 0 0%',
    inactivePanelFlex: '1.32 0 0%',
    activeWatermarkOpacity: 0.13,
    inactiveWatermarkOpacity: 0.07,
    watermarkEdgeInset: '2.5rem',
    activeWatermarkGlyphSizePx: 176,
    inactiveWatermarkLetterSizePx: 160,
    activeWatermarkLetterOffsetYPx: -12,
    inactiveWatermarkLetterOffsetYPx: -8,
    activeWatermarkIconOffsetYPx: -22,
    activeWatermarkShadow: '0 0 8px rgba(255,255,255,0.14)',
    inactiveWatermarkShadow: '0 0 4px rgba(255,255,255,0.1)',
  };

  return (
    <section
      id="secure-framework"
      className="home-framework-section"
      style={{
        background: GRADIENTS.HOME_FRAMEWORK_BG,
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: TYPOGRAPHY.fontBody,
        zIndex: 1,
      }}
    >
      <div className="home-framework-header" style={{ marginBottom: '48px', maxWidth: '720px' }}>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          The QCT <span style={{ color: COLORS.gold }}>SECURE</span> Framework
        </h2>
        <p
          style={{
            ...TYPOGRAPHY.bodyLarge,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '100%',
            lineHeight: '1.7',
            textAlign: 'justify',
            margin: 0,
            paddingBottom: '0em',
          }}
        >
          QuasarCyberTech delivers cybersecurity programs through a structured lifecycle designed to strengthen enterprise cyber resilience.
        </p>
      </div>

      {/* ACCORDION CHASSIS */}
      <div
        className="framework-chassis flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto h-auto lg:h-[330px] overflow-hidden rounded-xl border border-white/10 bg-transparent relative"
        style={{ marginTop: LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapDesktop }}
      >
        {stages.map((stage, i) => {
          const restOfWord = stage.name.slice(1).toUpperCase();
          const isActive = activeIdx === i;
          const { GhostIcon } = stage;

          return (
            <div
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              className={`framework-panel group/panel relative flex flex-col h-auto lg:h-[420px] border-b lg:border-b-0 lg:border-r last:lg:border-r-0 border-white/10 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden w-full 
                ${isActive ? 'bg-gradient-to-br from-[#6B1530]/90 to-black/90 backdrop-blur-lg shadow-[-4px_0_15px_-2px_rgba(214,176,92,0.4)]' : 'bg-black/40 backdrop-blur-md hover:bg-black/60'}`}
              style={{
                flex: isActive ? FRAMEWORK_LAYOUT.activePanelFlex : FRAMEWORK_LAYOUT.inactivePanelFlex,
              }}
            >
              {/* Watermark — balanced letter (left) and icon (right) */}
              <div
                className="absolute inset-0 flex items-center overflow-hidden pointer-events-none transition-all duration-700 z-0"
                style={{
                  justifyContent: isActive ? 'space-between' : 'center',
                  paddingLeft: isActive ? FRAMEWORK_LAYOUT.watermarkEdgeInset : '0px',
                  paddingRight: isActive ? FRAMEWORK_LAYOUT.watermarkEdgeInset : '0px',
                }}
              >
                <span
                  className="font-black transition-all duration-700 select-none"
                  style={{
                    lineHeight: 1,
                    fontSize: `${isActive ? FRAMEWORK_LAYOUT.activeWatermarkGlyphSizePx : FRAMEWORK_LAYOUT.inactiveWatermarkLetterSizePx}px`,
                    transform: `translateY(${isActive ? FRAMEWORK_LAYOUT.activeWatermarkLetterOffsetYPx : FRAMEWORK_LAYOUT.inactiveWatermarkLetterOffsetYPx}px)`,
                    color: '#FFFFFF',
                    opacity: isActive ? FRAMEWORK_LAYOUT.activeWatermarkOpacity : FRAMEWORK_LAYOUT.inactiveWatermarkOpacity,
                    textShadow: isActive ? FRAMEWORK_LAYOUT.activeWatermarkShadow : FRAMEWORK_LAYOUT.inactiveWatermarkShadow,
                  }}
                >
                  {stage.letter}
                </span>

                {isActive && (
                  <div
                    className="transition-all duration-700"
                    style={{
                      opacity: FRAMEWORK_LAYOUT.activeWatermarkOpacity,
                      transform: `translateY(${FRAMEWORK_LAYOUT.activeWatermarkIconOffsetYPx}px)`,
                      color: '#FFFFFF',
                    }}
                  >
                    <GhostIcon size={FRAMEWORK_LAYOUT.activeWatermarkGlyphSizePx} opacity={1} />
                  </div>
                )}
              </div>

              {/* Header — Absolute Anchor (Stationary Relative to Panel) */}
              <div
                className={`absolute top-10 left-0 w-full flex items-center transition-all duration-700 z-20 pointer-events-none
                           ${isActive ? 'px-6 lg:px-10 justify-start' : 'px-0 justify-center'}`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-[0.15em] flex items-center pointer-events-auto whitespace-nowrap">
                  <span className={`transition-colors duration-300 ${isActive ? 'text-[#D6B05C]' : 'text-white/60'}`}>{stage.letter}</span><span className={`text-[#D6B05C] transition-all duration-500 delay-300 ease-in-out overflow-hidden ${isActive ? 'max-w-xs opacity-100 ml-[1px]' : 'max-w-0 opacity-0 ml-0'}`}>{restOfWord}</span>
                </h3>
              </div>

              {/* CONTENT — Clear spacing avoids the absolute header */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`content-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.2, delay: 0 } }}
                    transition={{ duration: 0.4, delay: 0.25 }} // Wait for panel to expand
                    className="framework-panel-content w-full h-full pt-28 lg:pt-28 px-6 lg:px-10 pb-8 flex flex-col relative z-10"
                  >
                    {/* Left-aligned restricted text width */}
                    <div className="relative z-20 w-full lg:w-[85%] text-left">
                      <div className="text-[#D6B05C] text-[13px] uppercase tracking-[0.2em] mb-4 font-bold opacity-90">
                        {stage.descriptor}
                      </div>

                      <div className="w-12 h-[1px] bg-white/20 mb-6" />

                      <div className="grid gap-4">
                        {stage.services.map((service, si) => (
                          <div key={si} className="relative flex items-center group/point">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B05C] mr-3 flex-shrink-0" />
                            <span className="text-white text-[14px] lg:text-[15px] font-medium leading-tight tracking-wide opacity-90 group-hover/point:opacity-100 transition-opacity">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 1024px) {
            .home-framework-section {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
            .framework-chassis {
              margin-top: ${LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapTablet} !important;
            }
          }

          @media (max-width: 768px) {
            .home-framework-header {
              margin-bottom: 32px !important;
            }
            .framework-chassis {
              margin-top: ${LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapMobile} !important;
            }
            .framework-panel {
              min-height: 116px;
            }
            .framework-panel-content {
              padding-top: 82px !important;
              padding-bottom: 22px !important;
            }
          }
        `,
        }}
      />
    </section>
  );
}
