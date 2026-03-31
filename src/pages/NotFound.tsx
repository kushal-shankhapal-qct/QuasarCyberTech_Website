import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';
import Seo from '../components/seo/Seo';

export default function NotFound() {
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: GRADIENTS.HERO_BG, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingLeft: '2em',
        paddingRight: '2em',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody
      }}
    >
      <Seo
        title="Page Not Found"
        description="The requested QuasarCyberTech page could not be found."
        path="/404"
        robots="noindex,nofollow"
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{ 
          textAlign: 'center', 
          maxWidth: '600px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <span style={{ 
          ...TYPOGRAPHY.eyebrow, 
          color: COLORS.gold, 
          marginBottom: '20px', 
          display: 'block' 
        }}>
          404 ERROR
        </span>
        
        <h1 style={{ 
          ...TYPOGRAPHY.heroTitle, 
          color: '#FFFFFF', 
          marginBottom: '24px',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800
        }}>
           Page <span style={{ color: COLORS.gold }}>Not Found</span>
        </h1>
        
        <p style={{ 
          ...TYPOGRAPHY.bodyLarge, 
          color: 'rgba(255,255,255,0.7)', 
          marginBottom: '42px',
          lineHeight: 1.8 
        }}>
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          style={{
            ...TYPOGRAPHY.buttonLarge,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 36px',
            background: COLORS.burgundy,
            color: '#FFFFFF',
            borderRadius: '4px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(107, 21, 48, 0.25)',
            transition: 'all 0.3s ease',
            fontWeight: 800
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(107, 21, 48, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(107, 21, 48, 0.25)';
          }}
        >
          Return to Home
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
