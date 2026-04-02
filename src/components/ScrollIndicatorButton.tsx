import React from 'react';
import { motion } from 'framer-motion';
import { CircleArrowDown } from 'lucide-react';
import { TYPOGRAPHY } from '../config/themeConfig';
import { scrollToTarget, type ScrollMethod } from '@/utils/scrollToTarget';

interface ScrollIndicatorButtonProps {
  targetId: string;
  text: string;
  method?: ScrollMethod;
  offsetPx?: number;
}

const ScrollIndicatorButton: React.FC<ScrollIndicatorButtonProps> = ({
  targetId,
  text,
  method = 'native',
  offsetPx = 20,
}) => {
  return (
    <motion.button
      type="button"
      onClick={() =>
        scrollToTarget({
          targetId,
          method,
          extraOffsetPx: offsetPx,
        })
      }
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem 2.25rem',
        background: 'transparent',
        border: '0.09375rem solid rgba(255,255,255,0.78)',
        borderRadius: '0.25rem',
        color: '#FFFFFF',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: 800,
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        ...TYPOGRAPHY.buttonLarge,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.96)';
        e.currentTarget.style.color = '#FFFFFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.78)';
        e.currentTarget.style.color = '#FFFFFF';
      }}
    >
      <span>{text}</span>
      <motion.span
        animate={{ y: [-1.4, 1.6, -1.4], opacity: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 1.35, ease: 'easeInOut' }}
        style={{
        display: 'flex',
        alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CircleArrowDown size={19} strokeWidth={2.15} />
      </motion.span>
    </motion.button>
  );
};

export default ScrollIndicatorButton;
