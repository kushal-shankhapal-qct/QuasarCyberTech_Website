import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';
import Seo from '../components/seo/Seo';

export default function Forbidden() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: GRADIENTS.HERO_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody,
      }}
    >
      <Seo
        title="Access Forbidden"
        description="You do not have permission to access this QuasarCyberTech resource."
        path="/403"
        robots="noindex,nofollow"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: 'center', maxWidth: '640px', position: 'relative', zIndex: 1 }}
      >
        <span
          style={{
            ...TYPOGRAPHY.eyebrow,
            color: COLORS.gold,
            marginBottom: '1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <ShieldAlert size={16} />
          403 ERROR
        </span>

        <h1
          style={{
            ...TYPOGRAPHY.heroTitle,
            color: '#FFFFFF',
            marginBottom: '1.2rem',
            fontSize: 'clamp(2.4rem, 5.8vw, 3.8rem)',
            fontWeight: 800,
          }}
        >
          Access <span style={{ color: COLORS.gold }}>Forbidden</span>
        </h1>

        <p
          style={{
            ...TYPOGRAPHY.bodyLarge,
            color: 'rgba(255,255,255,0.74)',
            marginBottom: '2.4rem',
            lineHeight: 1.8,
          }}
        >
          This resource is restricted or unavailable. If you believe this is an error, please contact
          the QuasarCyberTech team.
        </p>

        <Link
          to="/"
          style={{
            ...TYPOGRAPHY.buttonLarge,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '1rem 2.25rem',
            background: COLORS.burgundy,
            color: '#FFFFFF',
            borderRadius: '0.25rem',
            textDecoration: 'none',
            boxShadow: '0 0.5rem 1.5rem rgba(107, 21, 48, 0.26)',
            transition: 'all 0.3s ease',
            fontWeight: 800,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0.8rem 2rem rgba(107, 21, 48, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0.5rem 1.5rem rgba(107, 21, 48, 0.26)';
          }}
        >
          Return to Home
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
