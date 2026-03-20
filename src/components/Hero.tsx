import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoSymbol from '../assets/logos copy/QuasarCyberTech/icononly_transparent_nobuffer.png';
import { ALPHAS, COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';

const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Anchor content to bottom
        alignItems: 'flex-start',
        background: GRADIENTS.HERO_BG,
        overflow: 'hidden',
        paddingLeft: '2.5em',
        paddingRight: '2em',
        paddingBottom: '3em', // Giving some breathing room above the 2em bottom line for buttons
        paddingTop: '0em',
        fontFamily: TYPOGRAPHY.fontBody,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-24%',
          top: '44%',
          transform: 'translateY(-45%)',
          width: 'min(52vw, 580px)',
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
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark,
            marginBottom: '28px',
          }}
        >
          Engineering <span style={{ color: COLORS.gold }}>Cyber Resilience</span><br />for Modern Enterprises
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            ...TYPOGRAPHY.bodyLarge,
            color: 'rgba(255,255,255,0.76)',
            textAlign: 'justify',
            maxWidth: '100%',
            marginBottom: '42px',
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
              ...TYPOGRAPHY.buttonLarge,
              background: 'transparent',
              color: '#FFFFFF',
              border: `1px solid #6B1530`,
              borderRadius: '4px',
              padding: '14px 34px',
              textDecoration: 'none',
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
              ...TYPOGRAPHY.buttonLarge,
              background: '#6B1530',
              color: '#FFFFFF',
              border: '1px solid transparent',
              borderRadius: '4px',
              padding: '14px 34px',
              textDecoration: 'none',
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
