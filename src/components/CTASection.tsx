import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, GRADIENTS, TYPOGRAPHY, SECTION_BACKGROUNDS } from '../config/themeConfig';
import TrustIndicators from './TrustIndicators';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  showMetrics?: boolean;
  showEyebrow?: boolean;
  theme?: 'light' | 'dark';
}

const CTASection: React.FC<CTASectionProps> = ({ 
  title = "Secure Your Digital Enterprise", 
  subtitle = "Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations.",
  showMetrics = true,
  showEyebrow = true,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <section
      style={{
        position: 'relative',
        background: isDark ? 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)' : SECTION_BACKGROUNDS.LIGHT,
        borderTop: isDark ? '1px solid rgba(214,176,92,0.15)' : 'none',
        padding: '120px 2.5em 60px', // Reduced bottom padding
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Upper CTA Content */}
        <div style={{ maxWidth: '800px' }}>
          {showEyebrow && !isDark && (
            <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.teal, marginBottom: '20px' }}>
              READY TO BEGIN?
            </p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              ...TYPOGRAPHY.sectionTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: isDark ? '#ffffff' : COLORS.deepCyberBlue,
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            <span style={{ color: isDark ? COLORS.gold : COLORS.burgundy }}>Secure</span> Your Digital<br />Enterprise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              ...TYPOGRAPHY.bodyLarge,
              color: isDark ? 'rgba(255,255,255,0.60)' : 'rgba(8, 16, 38, 0.7)',
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
                border: isDark ? '1.5px solid rgba(255,255,255,0.35)' : `1px solid ${COLORS.burgundy}`,
                color: isDark ? 'rgba(255,255,255,0.80)' : COLORS.burgundy,
                padding: '16px 36px',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (isDark) {
                  e.currentTarget.style.borderColor = COLORS.gold;
                  e.currentTarget.style.color = COLORS.gold;
                }
              }}
              onMouseLeave={(e) => {
                if (isDark) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.80)';
                }
              }}
            >
              Explore Capabilities
            </Link>
          </motion.div>
        </div>

        {/* Lower Trust Metrics */}
        {showMetrics && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
            <TrustIndicators isDark={false} />
          </div>
        )}
      </div>

    </section>
  );
};

export default CTASection;
