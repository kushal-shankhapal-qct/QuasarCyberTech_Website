import React, { useState } from 'react';
import { Compass, ClipboardCheck, Crosshair, ShieldCheck, Radio, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS, COLORS } from '../config/themeConfig';
import { ASSETS } from '../constants/assets';

type GhostIconProps = {
  size: number;
  opacity: number;
};

// ─── FRAMEWORK BACKDROP CONTROLS ────────────────────────────────────────
const FRAMEWORK_BACKDROP_CONTROLS = {
  imageUrl: 'https://res.cloudinary.com/dmdpzphcz/image/upload/QCT_Framework_Backdrop_Circuit_liimgh.png',
  opacity: 0.3,              // Backdrop image opacity (0-1)
  blendMaskStart: '0%',       // Mask gradient start position
  blendMaskEnd: '50%',        // Mask gradient end position (width %)
  widthPercent: '100%',        // Width of backdrop relative to section
  objectPosition: 'right 90%', // x/y positioning
  scale: '1',               // Image scale multiplier
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
    watermarkEdgeInset: 'clamp(2rem, 4vw, 4rem)',
    activeWatermarkGlyphSizeRem: 12.5, // 200px
    inactiveWatermarkLetterSizeRem: 10,  // 160px
    activeWatermarkLetterOffsetYRem: -0.75, // -12px
    inactiveWatermarkLetterOffsetYRem: -0.5,  // -8px
    activeWatermarkIconOffsetYRem: -1.375, // -22px
    activeWatermarkShadow: '0 0 0.75rem rgba(255,255,255,0.18)',
    inactiveWatermarkShadow: '0 0 0.25rem rgba(255,255,255,0.1)',
    panelTransitionDurationSec: 0.55,
    panelTransitionEase: [0.22, 1, 0.36, 1] as const,
    mobileInactiveHeaderTop: '1rem',
    mobileInactiveHeaderPadX: '1rem',
    mobileInactiveHeaderPadY: '0rem',
  };

  return (
    <section
      id="secure-framework"
      className="home-framework-section"
      style={{
        background: GRADIENTS.HOME_FRAMEWORK_BG,
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.global.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: TYPOGRAPHY.fontBody,
        zIndex: 1,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: FRAMEWORK_BACKDROP_CONTROLS.widthPercent,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: FRAMEWORK_BACKDROP_CONTROLS.opacity,
          maskImage: `linear-gradient(to right, transparent ${FRAMEWORK_BACKDROP_CONTROLS.blendMaskStart}, black ${FRAMEWORK_BACKDROP_CONTROLS.blendMaskEnd})`,
          WebkitMaskImage: `linear-gradient(to right, transparent ${FRAMEWORK_BACKDROP_CONTROLS.blendMaskStart}, black ${FRAMEWORK_BACKDROP_CONTROLS.blendMaskEnd})`,
        }}
      >
        <img
          src={FRAMEWORK_BACKDROP_CONTROLS.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: FRAMEWORK_BACKDROP_CONTROLS.objectPosition,
            opacity: 1,
            scale: FRAMEWORK_BACKDROP_CONTROLS.scale,
          }}
        />
      </div>

      <div className="home-framework-header" style={{ marginBottom: '3rem', maxWidth: '45rem' }}>
        <h2
          style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '1rem',
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
        className="framework-chassis flex flex-col lg:flex-row w-full max-w-[87.5rem] ml-0 mr-auto h-auto lg:h-[20.625rem] overflow-hidden rounded-xl border border-white/10 bg-transparent relative"
        style={{ marginTop: LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapDesktop, zIndex: 1 }}
      >
        {stages.map((stage, i) => {
          const restOfWord = stage.name.slice(1).toUpperCase();
          const isActive = activeIdx === i;
          const { GhostIcon } = stage;

          return (
            <motion.div
              layout
              transition={{
                layout: {
                  duration: FRAMEWORK_LAYOUT.panelTransitionDurationSec,
                  ease: FRAMEWORK_LAYOUT.panelTransitionEase,
                },
              }}
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              className={`framework-panel group/panel relative flex flex-col h-auto lg:h-[26.25rem] border-b lg:border-b-0 lg:border-r last:lg:border-r-0 border-white/10 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden w-full 
                ${isActive ? 'bg-gradient-to-br from-[#6B1530]/90 to-black/90 backdrop-blur-lg shadow-[-0.25rem_0_0.9375rem_-0.125rem_rgba(214,176,92,0.4)]' : 'bg-black/40 backdrop-blur-md hover:bg-black/60'}`}
              style={{
                flex: isActive ? FRAMEWORK_LAYOUT.activePanelFlex : FRAMEWORK_LAYOUT.inactivePanelFlex,
              }}
            >
              {/* Watermark — balanced letter (left) and icon (right) */}
              <div
                className="absolute inset-0 flex items-center overflow-hidden pointer-events-none transition-all duration-700 z-0"
                style={{
                  justifyContent: isActive ? 'space-between' : 'center',
                  paddingLeft: isActive ? FRAMEWORK_LAYOUT.watermarkEdgeInset : '0rem',
                  paddingRight: isActive ? FRAMEWORK_LAYOUT.watermarkEdgeInset : '0rem',
                }}
              >
                <span
                  className="font-black transition-all duration-700 select-none watermark-text"
                  style={{
                    lineHeight: 1,
                    fontSize: `${isActive ? FRAMEWORK_LAYOUT.activeWatermarkGlyphSizeRem : FRAMEWORK_LAYOUT.inactiveWatermarkLetterSizeRem}rem`,
                    transform: `translateY(${isActive ? FRAMEWORK_LAYOUT.activeWatermarkLetterOffsetYRem : FRAMEWORK_LAYOUT.inactiveWatermarkLetterOffsetYRem}rem)`,
                    color: '#FFFFFF',
                    opacity: isActive ? FRAMEWORK_LAYOUT.activeWatermarkOpacity : FRAMEWORK_LAYOUT.inactiveWatermarkOpacity,
                    textShadow: isActive ? FRAMEWORK_LAYOUT.activeWatermarkShadow : FRAMEWORK_LAYOUT.inactiveWatermarkShadow,
                  }}
                >
                  {stage.letter}
                </span>

                {isActive && (
                  <div
                    className="transition-all duration-700 watermark-icon"
                    style={{
                      opacity: FRAMEWORK_LAYOUT.activeWatermarkOpacity,
                      transform: `translateY(${FRAMEWORK_LAYOUT.activeWatermarkIconOffsetYRem}rem)`,
                      color: '#FFFFFF',
                    }}
                  >
                    <GhostIcon size={FRAMEWORK_LAYOUT.activeWatermarkGlyphSizeRem * 16} opacity={1} />
                  </div>
                )}
              </div>

              {/* Header — Absolute Anchor (Stationary Relative to Panel) */}
              <div
                className={`framework-panel-header ${isActive ? 'is-active' : 'is-inactive'} absolute top-[2.5rem] left-0 w-full flex items-center transition-all duration-700 z-20 pointer-events-none
                           ${isActive ? 'px-[1.5rem] lg:px-[2.5rem] justify-start' : 'px-0 justify-center'}`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-[0.15em] flex items-center pointer-events-auto whitespace-nowrap">
                  <span className={`transition-colors duration-300 ${isActive ? 'text-[#D6B05C]' : 'text-white/60'}`}>{stage.letter}</span><span className={`text-[#D6B05C] transition-all duration-500 delay-300 ease-in-out overflow-hidden ${isActive ? 'max-w-xs opacity-100 ml-[0.0625rem]' : 'max-w-0 opacity-0 ml-0'}`}>{restOfWord}</span>
                </h3>
              </div>

              {/* CONTENT — Clear spacing avoids the absolute header */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`content-${i}`}
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0, transition: { duration: 0.28, delay: 0 } }}
                    transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                    className="framework-panel-content w-full h-full pt-[7rem] lg:pt-[7rem] px-[1.5rem] lg:px-[2.5rem] pb-8 flex flex-col relative z-10"
                  >
                    {/* Left-aligned restricted text width */}
                    <div className="relative z-20 w-full lg:w-[85%] text-left">
                      <div className="text-[#D6B05C] text-[0.8125rem] uppercase tracking-[0.2em] mb-4 font-bold opacity-90">
                        {stage.descriptor}
                      </div>

                      <div className="w-12 h-[0.0625rem] bg-white/20 mb-6" />

                      <div className="grid gap-4">
                        {stage.services.map((service, si) => (
                          <div key={si} className="relative flex items-center group/point">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B05C] mr-3 flex-shrink-0" />
                            <span className="text-white text-[0.875rem] lg:text-[0.9375rem] font-medium leading-tight tracking-wide opacity-90 group-hover/point:opacity-100 transition-opacity">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 64rem) { /* 1024px */
            .home-framework-section {
              padding-left: 3rem !important;
              padding-right: 3rem !important;
            }
            .framework-chassis {
              margin-top: ${LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapTablet} !important;
            }
          }

          @media (max-width: 48rem) { /* 768px */
            .home-framework-header {
              margin-bottom: 2rem !important;
            }
            .home-framework-header p {
              text-align: left !important;
            }
            .framework-chassis {
              margin-top: ${LAYOUT_CONTROLS.section.frameworkHeaderToChassisGapMobile} !important;
            }
            .framework-panel {
              min-height: 9rem;
              transition-duration: ${FRAMEWORK_LAYOUT.panelTransitionDurationSec}s !important;
            }
            .framework-panel-content {
              padding-top: 5.125rem !important;
              padding-bottom: 1.375rem !important;
            }
            .framework-panel-header.is-inactive {
              justify-content: flex-start !important;
              top: ${FRAMEWORK_LAYOUT.mobileInactiveHeaderTop} !important;
              padding-left: ${FRAMEWORK_LAYOUT.mobileInactiveHeaderPadX} !important;
              padding-right: ${FRAMEWORK_LAYOUT.mobileInactiveHeaderPadX} !important;
              padding-top: ${FRAMEWORK_LAYOUT.mobileInactiveHeaderPadY} !important;
              padding-bottom: ${FRAMEWORK_LAYOUT.mobileInactiveHeaderPadY} !important;
            }
            .watermark-text {
              font-size: 6.875rem !important;
            }
            .watermark-icon svg {
              width: 6.875rem !important;
              height: 6.875rem !important;
            }
          }        `,
        }}
      />
    </section>
  );
}
