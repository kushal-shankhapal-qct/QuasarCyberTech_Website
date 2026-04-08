import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SECTION_BACKGROUNDS, LAYOUT_CONTROLS } from '../config/themeConfig';

interface CTASectionProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  showEyebrow?: boolean;
  theme?: 'light' | 'dark';
  primaryAction?: { label: string; link: string; isExternal?: boolean };
  secondaryAction?: { label: string; link: string; isExternal?: boolean };
  eyebrowText?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle = "Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations.",
  showEyebrow = true,
  theme = 'light',
  primaryAction = { label: 'Talk to a Security Expert', link: '/contact' },
  secondaryAction = { label: 'Explore Capabilities', link: '/capabilities' },
  eyebrowText = "READY TO BEGIN?"
}) => {
  const isDark = theme === 'dark';
  const CTA_ACTION_WIDTH = 'min(17.875rem, 100%)';
  const CTA_CONTENT_MAX_WIDTH = '100%';

  return (
    <section
      style={{
        position: 'relative',
        background: isDark ? 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)' : SECTION_BACKGROUNDS.LIGHT,
        borderTop: isDark ? '0.0625rem solid rgba(214,176,92,0.15)' : 'none',
        paddingTop: LAYOUT_CONTROLS.section.paddingTop,
        paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        overflow: 'hidden',
        fontFamily: TYPOGRAPHY.fontBody,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        maxWidth: CTA_CONTENT_MAX_WIDTH,
        width: '100%',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem', // 80px
        textAlign: 'left',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 10
      }}>

        {/* Upper CTA Content */}
        <div style={{ maxWidth: '50rem' }}>
          {showEyebrow && (
            <p style={{
              ...TYPOGRAPHY.eyebrow,
              color: isDark ? (LAYOUT_CONTROLS.section.ctaEyebrowDark || '#FFFFFF') : COLORS.burgundy,
              marginBottom: '1.25rem', // 20px
              letterSpacing: '0.15em',
              fontWeight: 800
            }}>
              {eyebrowText}
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
              marginBottom: '1.5rem', // 24px
              fontWeight: 800,
            }}
          >
            {title ?? (
              <><span style={{ color: isDark ? COLORS.gold : COLORS.burgundy }}>Secure</span> Your Digital<br />Enterprise</>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              ...TYPOGRAPHY.bodyLarge,
              color: isDark ? 'rgba(255,255,255,0.80)' : 'rgba(8, 16, 38, 0.85)',
              maxWidth: '37.5rem', // 600px
              marginBottom: '2.5rem', // 40px
              textAlign: 'left'
            }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              gap: '1.25rem', // 20px
              flexWrap: 'wrap',
              justifyContent: 'flex-start'
            }}
            className="cta-actions-container"
          >
            {primaryAction.isExternal ? (
              <a
                href={primaryAction.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...TYPOGRAPHY.buttonLarge,
                  background: COLORS.burgundy,
                  color: '#FFFFFF',
                  padding: '1rem 2.25rem', // 16px 36px
                  width: CTA_ACTION_WIDTH,
                  minWidth: CTA_ACTION_WIDTH,
                  maxWidth: '100%',
                  justifyContent: 'center',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  boxShadow: '0 0.5rem 1rem rgba(107, 21, 48, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 800,
                  fontSize: '0.875rem', // 14px
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.burgundyHover;
                  e.currentTarget.style.transform = 'translateY(-0.125rem)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {primaryAction.label}
                <ArrowRight size={18} />
              </a>
            ) : (
              <Link
                to={primaryAction.link}
                style={{
                  ...TYPOGRAPHY.buttonLarge,
                  background: COLORS.burgundy,
                  color: '#FFFFFF',
                  padding: '1rem 2.25rem', // 16px 36px
                  width: CTA_ACTION_WIDTH,
                  minWidth: CTA_ACTION_WIDTH,
                  maxWidth: '100%',
                  justifyContent: 'center',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  boxShadow: '0 0.5rem 1rem rgba(107, 21, 48, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem', // 8px
                  fontWeight: 800,
                  fontSize: '0.875rem', // 14px
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.burgundyHover;
                  e.currentTarget.style.transform = 'translateY(-0.125rem)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {primaryAction.label}
                <ArrowRight size={18} />
              </Link>
            )}

            {secondaryAction.isExternal ? (
              <a
                href={secondaryAction.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...TYPOGRAPHY.buttonLarge,
                  background: 'transparent',
                  border: isDark ? '0.09375rem solid rgba(255,255,255,0.35)' : `0.09375rem solid ${COLORS.burgundy}`,
                  color: isDark ? '#FFFFFF' : COLORS.burgundy,
                  padding: '1rem 2.25rem', // 16px 36px
                  width: CTA_ACTION_WIDTH,
                  minWidth: CTA_ACTION_WIDTH,
                  maxWidth: '100%',
                  justifyContent: 'center',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 800,
                  fontSize: '0.875rem', // 14px
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(107, 21, 48, 0.05)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.6)' : COLORS.burgundyHover;
                  e.currentTarget.style.color = isDark ? '#FFFFFF' : COLORS.burgundyHover;
                  e.currentTarget.style.transform = 'translateY(-0.125rem)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : COLORS.burgundy;
                  e.currentTarget.style.color = isDark ? '#FFFFFF' : COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {secondaryAction.label}
              </a>
            ) : (
              <a
                href={secondaryAction.link}
                onClick={(e) => {
                  if (secondaryAction.link.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(secondaryAction.link)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  ...TYPOGRAPHY.buttonLarge,
                  background: 'transparent',
                  border: isDark ? '0.09375rem solid rgba(255,255,255,0.35)' : `0.09375rem solid ${COLORS.burgundy}`,
                  color: isDark ? '#FFFFFF' : COLORS.burgundy,
                  padding: '1rem 2.25rem', // 16px 36px
                  width: CTA_ACTION_WIDTH,
                  minWidth: CTA_ACTION_WIDTH,
                  maxWidth: '100%',
                  justifyContent: 'center',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 800,
                  fontSize: '0.875rem', // 14px
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(107, 21, 48, 0.05)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.6)' : COLORS.burgundyHover;
                  e.currentTarget.style.color = isDark ? '#FFFFFF' : COLORS.burgundyHover;
                  e.currentTarget.style.transform = 'translateY(-0.125rem)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : COLORS.burgundy;
                  e.currentTarget.style.color = isDark ? '#FFFFFF' : COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {secondaryAction.label}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              .cta-actions-container a {
                justify-content: flex-start !important;
              }
            }
          `,
        }}
      />
    </section>
  );
};

export default CTASection;
