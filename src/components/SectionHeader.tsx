import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle?: string;
  isDark?: boolean;
  maxWidth?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  title, 
  highlight, 
  subtitle, 
  isDark = false,
  maxWidth = '560px'
}) => {
  return (
    <div style={{ textAlign: 'left', marginBottom: '42px', fontFamily: TYPOGRAPHY.fontBody }}>
      <p style={{ 
        ...TYPOGRAPHY.eyebrow,
        color: COLORS.teal, 
        marginBottom: '12px'
      }}>
        {eyebrow}
      </p>
      <h2 style={{ 
        ...TYPOGRAPHY.sectionTitle,
        fontFamily: TYPOGRAPHY.fontHeading,
        color: isDark ? COLORS.textOnDark : COLORS.textOnLight, 
        marginBottom: '18px',
        maxWidth: '800px'
      }}>
        {title} <span style={{ color: isDark ? COLORS.gold : COLORS.teal }}>{highlight}</span>
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
