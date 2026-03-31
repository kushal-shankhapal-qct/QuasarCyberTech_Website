import React from 'react';
import { ASSETS } from '@/constants/assets';

const AccreditationBar: React.FC = () => {
  const toPctNumber = (value: string) => Number.parseFloat(value.replace('%', ''));

  // --- VISUAL + CONTENT CONTROLS ---
  const CONFIG = {
    // --- COPY ---
    headlinePrefix: 'We Are',
    headlineEmphasis: 'CERT-In',
    headlineSuffix: 'Empanelled',

    // --- SPACING (Outer) ---
    marginTop: '0px',
    marginBottom: '15px',
    
    // --- SPACING (Inner padding - usually dont need this) ---
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '20px',
    paddingRight: '20px',

    // --- SIZING ---
    minHeight: '160px',
    
    // --- LOGO CONTROLS ---
    logoHeightMobile: '70px',
    logoHeightDesktop: '80px',
    logoAspectRatio: 'auto', // 'auto' to stretch, or set like '3/2'
    
    // --- CONTENT GAP (between logo and text) ---
    contentGapMobile: '1.5em',
    contentGapDesktop: '16px',

    // --- TEXT CONTROLS ---
    textColor: '#F5EED8',
    emphasisColor: '#FFD16A',
    textSizeMobile: '16px',
    textSizeDesktop: '20px',
    textLetterSpacing: '0.16em',
    
    // --- BACKGROUND (slanted moving middle band) ---
    backgroundBaseColor: 'rgba(0, 1, 18, 1)',
    stripeBandColor: 'rgba(56, 8, 26, 1)',
    stripeBaseColor: 'rgba(0, 1, 18, 1)',
    stripeOpacity: 0.88,
    stripeAngle: '238deg',
    stripeStartFrom: '135%',
    stripeEndFrom: '138%',
    stripeStartTo: '-38%',
    stripeEndTo: '-18%',
    stripeSpeed: '1.5s',
    stripeCloneDelay: '-1s',
    stripeFeatherWidth: '30%',
  };

  // Normalize stop order so user can type either side first and motion remains predictable.
  const stripeFromA = toPctNumber(CONFIG.stripeStartFrom);
  const stripeFromB = toPctNumber(CONFIG.stripeEndFrom);
  const stripeToA = toPctNumber(CONFIG.stripeStartTo);
  const stripeToB = toPctNumber(CONFIG.stripeEndTo);

  const stripeFromLow = `${Math.min(stripeFromA, stripeFromB)}%`;
  const stripeFromHigh = `${Math.max(stripeFromA, stripeFromB)}%`;
  const stripeToLow = `${Math.min(stripeToA, stripeToB)}%`;
  const stripeToHigh = `${Math.max(stripeToA, stripeToB)}%`;

  return (
    <div 
      className="w-full relative overflow-hidden flex items-center justify-center"
      style={{
        background: CONFIG.backgroundBaseColor,
        marginTop: CONFIG.marginTop,
        marginBottom: CONFIG.marginBottom,
        minHeight: CONFIG.minHeight,
        paddingTop: CONFIG.paddingTop,
        paddingBottom: CONFIG.paddingBottom,
        paddingLeft: CONFIG.paddingLeft,
        paddingRight: CONFIG.paddingRight,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none accreditation-moving-stripe accreditation-moving-stripe-a"
        style={
          {
            opacity: CONFIG.stripeOpacity,
            background: `linear-gradient(${CONFIG.stripeAngle}, ${CONFIG.stripeBaseColor} 0%, ${CONFIG.stripeBaseColor} calc(var(--stripe-low) - ${CONFIG.stripeFeatherWidth}), ${CONFIG.stripeBandColor} var(--stripe-low), ${CONFIG.stripeBandColor} var(--stripe-high), ${CONFIG.stripeBaseColor} calc(var(--stripe-high) + ${CONFIG.stripeFeatherWidth}), ${CONFIG.stripeBaseColor} 100%)`,
            animationDuration: CONFIG.stripeSpeed,
            zIndex: 0,
            ['--stripe-low' as any]: stripeFromLow,
            ['--stripe-high' as any]: stripeFromHigh,
            ['--stripe-low-from' as any]: stripeFromLow,
            ['--stripe-high-from' as any]: stripeFromHigh,
            ['--stripe-low-to' as any]: stripeToLow,
            ['--stripe-high-to' as any]: stripeToHigh,
          } as React.CSSProperties
        }
      />

      <div
        className="absolute inset-0 pointer-events-none accreditation-moving-stripe accreditation-moving-stripe-b"
        style={
          {
            opacity: CONFIG.stripeOpacity,
            background: `linear-gradient(${CONFIG.stripeAngle}, ${CONFIG.stripeBaseColor} 0%, ${CONFIG.stripeBaseColor} calc(var(--stripe-low) - ${CONFIG.stripeFeatherWidth}), ${CONFIG.stripeBandColor} var(--stripe-low), ${CONFIG.stripeBandColor} var(--stripe-high), ${CONFIG.stripeBaseColor} calc(var(--stripe-high) + ${CONFIG.stripeFeatherWidth}), ${CONFIG.stripeBaseColor} 100%)`,
            animationDuration: CONFIG.stripeSpeed,
            animationDelay: CONFIG.stripeCloneDelay,
            zIndex: 0,
            ['--stripe-low' as any]: stripeFromLow,
            ['--stripe-high' as any]: stripeFromHigh,
            ['--stripe-low-from' as any]: stripeFromLow,
            ['--stripe-high-from' as any]: stripeFromHigh,
            ['--stripe-low-to' as any]: stripeToLow,
            ['--stripe-high-to' as any]: stripeToHigh,
          } as React.CSSProperties
        }
      />

      {/* Content Wrapper */}
      <div 
        className="accreditation-wrapper flex flex-col md:flex-row items-center relative z-10 px-6"
        style={{
          gap: CONFIG.contentGapMobile,
        }}
      >
        <img
          src={ASSETS.certifications.certin}
          alt="CERT-In Logo"
          className="accreditation-logo w-auto object-contain"
          style={{
            height: CONFIG.logoHeightMobile,
            aspectRatio: CONFIG.logoAspectRatio,
            filter: 'none',
            opacity: 1,
          }}
        />
        <span
          className="accreditation-text font-bold uppercase text-center md:text-left"
          style={{
            color: CONFIG.textColor,
            fontSize: CONFIG.textSizeMobile,
            letterSpacing: CONFIG.textLetterSpacing,
          }}
        >
          {CONFIG.headlinePrefix}{' '}
          <span style={{ color: CONFIG.emphasisColor }}>{CONFIG.headlineEmphasis}</span>{' '}
          {CONFIG.headlineSuffix}
        </span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .accreditation-logo {
            height: ${CONFIG.logoHeightDesktop};
            aspectRatio: ${CONFIG.logoAspectRatio};
          }
          .accreditation-text {
            font-size: ${CONFIG.textSizeDesktop};
          }
          .accreditation-wrapper {
            gap: ${CONFIG.contentGapDesktop};
          }
        }

        @property --stripe-low {
          syntax: '<percentage>';
          inherits: false;
          initial-value: -50%;
        }

        @property --stripe-high {
          syntax: '<percentage>';
          inherits: false;
          initial-value: -10%;
        }

        @keyframes accreditation-moving-stripe-motion {
          0% {
            --stripe-low: var(--stripe-low-from);
            --stripe-high: var(--stripe-high-from);
          }
          100% {
            --stripe-low: var(--stripe-low-to);
            --stripe-high: var(--stripe-high-to);
          }
        }

        .accreditation-moving-stripe {
          will-change: auto;
          animation-name: accreditation-moving-stripe-motion;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .accreditation-moving-stripe-a {
          animation-delay: 0s;
        }
      `}</style>
    </div>
  );
};

export default AccreditationBar;
