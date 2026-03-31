import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight: string;
  suffix?: string | React.ReactNode;
  subtitle?: string;
  isDark?: boolean;
  maxWidth?: string;
  highlightColor?: string;
  subtitleStyle?: React.CSSProperties;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  title, 
  highlight, 
  suffix,
  subtitle, 
  isDark = false,
  maxWidth = '560px',
  highlightColor,
  subtitleStyle
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
          ...TYPOGRAPHY.bodyLarge,
          color: isDark ? 'rgba(255,255,255,0.6)' : COLORS.textSub, 
          lineHeight: '1.7',
          margin: 0,
          maxWidth,
          ...subtitleStyle
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
