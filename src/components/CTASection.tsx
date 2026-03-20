import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';
import TrustIndicators from './TrustIndicators';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ 
  title = "Secure Your Digital Enterprise", 
  subtitle = "Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations." 
}) => {
  return (
    <section
      style={{
        position: 'relative',
        background: GRADIENTS.HERO_BG,
        padding: '120px 2.5em',
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Upper CTA Content */}
        <div style={{ maxWidth: '800px' }}>
          <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.teal, marginBottom: '20px' }}>
            READY TO BEGIN?
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              ...TYPOGRAPHY.sectionTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            <span style={{ color: COLORS.gold }}>Secure</span> Your Digital<br />Enterprise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              marginBottom: '40px',
            }}
          >
            Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <Link
              to="/contact"
              style={{
                ...TYPOGRAPHY.buttonLarge,
                background: COLORS.burgundy,
                color: '#FFFFFF',
                padding: '16px 36px',
                borderRadius: '4px',
                textDecoration: 'none',
                boxShadow: '0 8px 16px rgba(107, 21, 48, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Talk to a Security Expert
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/capabilities"
              style={{
                ...TYPOGRAPHY.buttonLarge,
                background: 'transparent',
                border: `1px solid ${COLORS.gold}`,
                color: COLORS.gold,
                padding: '16px 36px',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Explore Capabilities
            </Link>
          </motion.div>
        </div>

        {/* Lower Trust Metrics */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
          <TrustIndicators isDark />
        </div>
      </div>

    </section>
  );
};

export default CTASection;
