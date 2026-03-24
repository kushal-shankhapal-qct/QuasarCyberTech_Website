import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight: string;
  suffix?: string;
  subtitle?: string;
  isDark?: boolean;
  maxWidth?: string;
  highlightColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  title, 
  highlight, 
  suffix,
  subtitle, 
  isDark = false,
  maxWidth = '560px',
  highlightColor
}) => {
  return (
    <div style={{ textAlign: 'left', marginBottom: '42px', fontFamily: TYPOGRAPHY.fontBody }}>
      {eyebrow && (
        <p style={{ 
          ...TYPOGRAPHY.eyebrow,
          color: COLORS.burgundy, 
          marginBottom: '12px'
        }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ 
        ...TYPOGRAPHY.sectionTitle,
        fontFamily: TYPOGRAPHY.fontHeading,
        color: isDark ? COLORS.textOnDark : COLORS.textOnLight, 
        marginBottom: '18px',
        maxWidth: '800px'
      }}>
        {title} <span style={{ color: highlightColor || (isDark ? COLORS.gold : COLORS.burgundy) }}>{highlight}</span> {suffix}
      </h2>
      {subtitle && (
        <p style={{ 
          ...TYPOGRAPHY.bodyBase,
          color: isDark ? 'rgba(255,255,255,0.6)' : COLORS.textSub, 
          maxWidth,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
