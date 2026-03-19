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
        alignItems: 'flex-start', // Move down
        background: GRADIENTS.HERO_BG,
        overflow: 'hidden',
        padding: '14em 2em 2em 2em', // 2.5em gap from edges
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-23.5%',
          top: '44%',
          transform: 'translateY(-45%)',
          width: 'min(52vw, 560px)',
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
            fontWeight: 500,
            fontSize: 'clamp(40px, 6.5vw, 42px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '28px',
          }}
        >
          Engineering <span style={{ color: COLORS.gold }}>Cyber Resilience</span> for Modern Enterprises
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '18px',
            lineHeight: 1.4,
            letterSpacing: '-0.03em',
            maxWidth: '680px',
            marginBottom: '42px',
            fontWeight: 400,
          }}
        >
          QuasarCyberTech delivers cybersecurity consulting and engineering designed for enterprise scale - from advisory and offensive security to managed defense and advanced security platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}
        >
          <Link
            to="/capabilities"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(107, 21, 48, 0.12)';
              e.currentTarget.style.borderColor = '#8B1E3F';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#6B1530';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: `1px solid #6B1530`,
              borderRadius: '4px',
              padding: '14px 34px',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            Explore Capabilities
          </Link>
          <Link
            to="/contact"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8B1E3F';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#6B1530';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            style={{
              background: '#6B1530',
              color: '#FFFFFF',
              border: '1px solid transparent',
              borderRadius: '4px',
              padding: '14px 34px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
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
