import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../config/themeConfig';

interface ScrollIndicatorButtonProps {
  targetId: string;
  text: string;
}

const ScrollIndicatorButton: React.FC<ScrollIndicatorButtonProps> = ({ text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0px 0px',
        background: 'transparent',
        border: 'none',
        color: COLORS.gold,
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        opacity: 0.9,
      }}
    >
      {/* ─── MOUSE / PILL INDICATOR (Matching User Screenshot) ─── */}
      <div style={{
        width: '20px',
        height: '32px',
        borderRadius: '20px',
        border: `1.5px solid ${COLORS.gold}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4px',
        position: 'relative',
        flexShrink: 0,
        opacity: 0.8
      }}>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.8, 
            ease: "easeInOut" 
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Arrow stem */}
          <div style={{ width: '1.5px', height: '10px', background: COLORS.gold }} />
          {/* Arrow tip (V-shape) */}
          <div style={{ 
            width: '6px', 
            height: '6px', 
            borderRight: `1.5px solid ${COLORS.gold}`,
            borderBottom: `1.5px solid ${COLORS.gold}`,
            transform: 'rotate(45deg)',
            marginTop: '-4px'
          }} />
        </motion.div>
      </div>

      <span style={{ marginTop: '1px' }}>{text}</span>
    </div>
  );
};

export default ScrollIndicatorButton;
