import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoSymbol from '../assets/logos copy/QuasarCyberTech/icononly_transparent_nobuffer.png';
import { ALPHAS, COLORS, GRADIENTS } from '../config/themeConfig';

const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: GRADIENTS.HERO_BG,
        overflow: 'hidden',
        padding: '68px max(24px, calc((100vw - 1200px) / 2)) 60px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-8%',
          top: '44%',
          transform: 'translateY(-50%)',
          width: 'min(52vw, 680px)',
          aspectRatio: '1 / 1',
          pointerEvents: 'none',
          opacity: 0.88,
        }}
      >
        <motion.img
          src={logoSymbol}
          alt=""
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 160, ease: 'linear' }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            color: COLORS.textOnDark,
            fontWeight: 800,
            fontSize: 'clamp(34px, 5vw, 58px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Engineering <span style={{ color: COLORS.gold }}>Cyber Resilience</span> for Modern Enterprises
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            color: COLORS.textMuted,
            fontSize: '17px',
            lineHeight: 1.7,
            maxWidth: '640px',
            marginBottom: '34px',
          }}
        >
          QuasarCyberTech delivers cybersecurity consulting and engineering designed for enterprise scale - from advisory and offensive security to managed defense and advanced security platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
        >
          <Link
            to="/capabilities"
            style={{
              background: 'transparent',
              color: COLORS.gold,
              border: `1px solid ${ALPHAS.burgundy50}`,
              borderTop: `2px solid ${COLORS.gold}`,
              borderRadius: '0 0 10px 10px',
              padding: '13px 28px',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Explore Capabilities
          </Link>
          <Link
            to="/contact"
            style={{
              background: COLORS.burgundy,
              color: COLORS.textOnDark,
              borderRadius: '0 0 10px 10px',
              borderTop: `2px solid ${ALPHAS.gold40}`,
              padding: '13px 28px',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
